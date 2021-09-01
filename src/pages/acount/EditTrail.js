/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable global-require */
/* eslint-disable camelcase */
import React, {useContext, useEffect, useState, useRef} from 'react'
import {Row, Col, Button, Form, Image} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useForm, Controller} from 'react-hook-form'
import {joiResolver} from '@hookform/resolvers/joi'
import Joi from 'joi'
import Select from 'react-select'
import {getTrailTourDetails, updateTrailTour} from '../../action/trails.action'
import {UPDATE_TOUR_INFO, GET_TOUR_DETAILS, UPLOAD_MEDIA} from '../../action/reducer.types'
import {get, joiUpdatedMessage} from '../../Utils/AppUtill'
import {uploadMedia} from '../../action/auth.action'

import ErrorLabel from '../../components/Widgets/ErrorLabel'
import PageNotFound from '../PageNotFound'
import useIsLoading from '../../hooks/useIsLoading'
import {GlobalContext} from '../../context/globalContext'
import {getAllCategories} from '../../action/categories.action'
import trailItIc from '../../images/img_ic.png'
import trailEnClose from '../../images/en_close.svg'
import trailVdIC from '../../images/vd_ic.png'

const addBodyClass = className => document.body.classList.add('Profile')
const removeBodyClass = className => document.body.classList.remove('Profile')
const EditTrail = props => {
  const {userData} = useContext(GlobalContext)
  const {trailSlug} = props.match.params
  const {handleSubmit, errors, control, reset, watch} = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    submitFocusError: true,
    shouldUnregister: false,
    resolver: joiResolver(
      Joi.object({
        trail_name: Joi.string().required().max(200).label('title').messages(joiUpdatedMessage),
        trail_description: Joi.string().required().allow('').max(500).label('description').messages(joiUpdatedMessage),
        trail_categor_id: Joi.any().required().label('category').messages(joiUpdatedMessage),
      })
    ),
    defaultValues: {
      trail_categor_id: '',
      trail_description: '',
      trail_name: '',
    },
  })
  const [error, setError] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const history = useHistory()
  const isLoading = useIsLoading()
  const dispatch = useDispatch()

  const {trailTourData} = useSelector(state => state.trailReducer)
  const {successLabels = []} = useSelector(state => state.apiReducer)

  const watchedValue = watch()

  const {intro_url: {fileUrl: intro_url} = '', cover_image_url: {fileUrl: cover_image_url} = ''} = useSelector(
    state => state.authReducer
  )
  const {getAllCategory} = useSelector(state => state.categoryReducer)

  useEffect(() => {
    // Set up
    if (props instanceof Array) props.map(addBodyClass)
    else addBodyClass(props)

    // Clean up
    return () => {
      if (props instanceof Array) props.map(removeBodyClass)
      else removeBodyClass(props)
    }
  }, [props])

  const videoRef = useRef()
  const [file, setFile] = useState(null)
  const [Video, setVideo] = useState(null)
  const [coverImage, setCoverImage] = useState(null)

  const uploadCoverImage = e => {
    const files = e.target.files[0]
    const pattern = /image-*/
    if (!files.type.match(pattern)) {
      alert('Please select image -  jpg/png/gif/bmp/tiff')
    } else {
      const [file] = e.target.files
      const formData = new FormData()
      formData.append('media', file)
      dispatch(uploadMedia(formData, 'cover_image_url'))
    }
  }

  const uploadImage = e => {
    const files = e.target.files[0]
    const pattern = /image-*/
    if (!files.type.match(pattern)) {
      alert('Please select image - jpg/png/gif/bmp/tiff')
    } else {
      setError('')
      setVideo(null)
      const [file] = e.target.files
      const formData = new FormData()
      formData.append('media', file)
      dispatch(uploadMedia(formData, 'intro_url'))
    }
  }
  const uploadVideo = e => {
    const files = e.target.files[0]
    const pattern = /video-*/
    if (!files.type.match(pattern)) {
      alert('Please select video - mp4,mkv,mpeg,avi,mov,webm,wmv and less than 30 seconds')
    } else {
      setError('')
      // setVideo(URL.createObjectURL(e.target.files[0]));
      setFile(null)
      const [file] = e.target.files
      const formData = new FormData()
      formData.append('media', file)
      dispatch(uploadMedia(formData, 'intro_url'))
    }
  }

  const handleSaveIntro = data => {
    // let errorCheck = !(
    //   ((file || Video) && get(["cover_image_url"], trailTourData)) ||
    //   get(["current", "duration"], videoRef) < 31
    // );

    // if (errorCheck) {
    //   setError(
    //     "Please select valid file : Image - jpg/png, Video - mp4,mkv, less than or equal to 30 seconds"
    //   );
    //   return;
    // }

    const payload = {
      trail_id: get(['trail_id'], trailTourData),
      trail_intro_url: Video || file,
      cover_image_url: coverImage,
      trail_title: data.trail_name,
      trail_description: data.trail_description,
      trail_categor_id: data.trail_categor_id.value || data.trail_categor_id,
    }
    dispatch(updateTrailTour(get(['trail_id'], trailTourData), payload))
  }
  useEffect(() => {
    dispatch(getTrailTourDetails(trailSlug))
  }, [dispatch, trailSlug])

  useEffect(() => {
    if (getAllCategory) {
      setCategoryList(
        getAllCategory.map(cat => ({
          value: cat.trail_category_id,
          label: cat.trail_category_name,
        }))
      )
    }
  }, [getAllCategory])

  useEffect(() => {
    if (successLabels.includes(UPLOAD_MEDIA) && intro_url) {
      const arr = intro_url.split('.')

      if (['mp4', 'mkv', 'mpeg','avi','mov','webm','wmv'].includes(arr[arr.length - 1])) {
        setVideo(intro_url)
      }
      if (['jpeg', 'png', 'jpg','bmp','tiff','gif',].includes(arr[arr.length - 1])) {
        setFile(intro_url)
      }
    }
    if (successLabels.includes(UPLOAD_MEDIA) && cover_image_url) {
      setCoverImage(cover_image_url)
    }
    if (successLabels.includes(UPDATE_TOUR_INFO)) {
      history.goBack()
    }
  }, [
    cover_image_url,
    dispatch,
    history,
    intro_url,
    successLabels,
    trailTourData,
    watchedValue.trail_description,
    watchedValue.trail_name,
  ])

  useEffect(() => {
    if (successLabels.includes(GET_TOUR_DETAILS)) {
      reset({
        trail_name: get(['trail_name'], trailTourData),
        trail_description: get(['trail_description'], trailTourData),
        trail_categor_id: get(['trail_categor_id'], trailTourData),
      })
      const arr = get(['trail_intro_url'], trailTourData, '').split('.')

      if (['mp4', 'mkv', 'mpeg','avi','mov','webm','wmv'].includes(arr[arr.length - 1])) {
        setVideo(get(['trail_intro_url'], trailTourData, ''))
      }
      if (['jpeg', 'png', 'jpg','bmp','tiff','gif',].includes(arr[arr.length - 1])) {
        setFile(get(['trail_intro_url'], trailTourData))
      }
      setCoverImage(get(['cover_image_url'], trailTourData))
    }
  }, [reset, successLabels, trailTourData])

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  if (!isLoading && !(get(['userData', '_id'], trailTourData) === get(['_id'], userData))) {
    return <PageNotFound />
  }

  return (
    <>
      {/* ------section start---------- */}
      <section className="trailit_section mt-xl-5 pb-5">
        <div className="container-fluid">
          <Row className="justify-content-center">
            <Col lg={12} className="text-center mb-4">
              <h3 className="trailit_24_500 text-center mb-3">Edit Trail Intro</h3>
            </Col>
            <Col lg={6}>
              <div className="mx_630">
                <Form onSubmit={handleSubmit(handleSaveIntro)}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-4">
                        <Controller
                          name="trail_name"
                          control={control}
                          render={({value, onChange, onBlur}) => (
                            <>
                              {' '}
                              <Form.Control
                                type="text"
                                placeholder="Title"
                                className="trailit_12_400 frmht"
                                value={value}
                                onChange={onChange}
                              />
                              <ErrorLabel msg={errors.trail_name && errors.trail_name.message} />
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Controller
                          name="trail_description"
                          control={control}
                          render={({value, onChange, onBlur}) => (
                            <>
                              {' '}
                              <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Type Introduction here ..."
                                value={value}
                                onChange={onChange}
                              />
                              <ErrorLabel msg={errors.trail_description && errors.trail_description.message} />
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Controller
                          name="trail_categor_id"
                          control={control}
                          render={({value, onChange, onBlur}) => (
                            <>
                              {' '}
                              <label>Select Categories</label>
                              <Select
                                className="react-select-single-value"
                                classNamePrefix="react-select-single-value"
                                options={categoryList}
                                value={categoryList.find(cat => cat.value === value)}
                                onChange={value => onChange(value)}
                              />
                              <ErrorLabel msg={errors.trail_categor_id && errors.trail_categor_id.message} />
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <h4 className="trailit_14_700 mt-3">Cover Image</h4>

                      <Row>
                        <Col className="col-5 mt-3">
                          {!coverImage && (
                            <div className="upld_bx">
                              <img alt="" src={trailItIc} />

                              <h6 className="mt-2">Image</h6>
                              <input
                                type="file"
                                accept="image/x-png,image/gif,image/jpeg,image/bmp,image/tiff,image/jpg"
                                onChange={uploadCoverImage}
                              />
                            </div>
                          )}

                          {coverImage && (
                            <div className="enIconUploaded">
                              <button
                                type="button"
                                className="enCloseButton"
                                onClick={() => {
                                  setCoverImage(null)
                                }}
                              >
                                <Image src={trailEnClose} alt="uploadImg" title="uploadImg" fluid />
                              </button>
                              <Image src={coverImage} alt="icon" title="icon" className="" fluid />
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col md={12}>
                      <h4 className="trailit_14_700 mt-3">Intro Image/Video</h4>
                      <Row>
                        <Col className="col-5 mt-3">
                          {!file && (
                            <div className="upld_bx">
                              <img alt="" src={trailItIc} />
                              <h6 className="mt-2">Image</h6>
                              <input type="file" accept="image/x-png,image/gif,image/jpeg,image/bmp,image/tiff,image/jpg" onChange={uploadImage} />
                            </div>
                          )}

                          {file && (
                            <div className="enIconUploaded">
                              <button
                                type="button"
                                className="enCloseButton"
                                onClick={() => {
                                  setFile(null)
                                }}
                              >
                                <Image src={trailEnClose} alt="uploadImg" title="uploadImg" fluid />
                              </button>
                              <Image src={file} alt="icon" title="icon" className="" fluid />
                            </div>
                          )}
                        </Col>
                        <Col className="col-5 mt-3">
                          <div className="upld_bx">
                            <img alt="" src={trailVdIC} />
                            <h6 className="mt-2">Video</h6>
                            <input
                              type="file"
                              accept=".mp3,.mp4,.webm,.wmv,.mov,.avi"
                              onChange={uploadVideo}
                              onClick={e => {
                                e.target.value = null
                              }}
                            />
                          </div>

                          {Video && (
                            <div className="enIconUploaded">
                              <button
                                type="button"
                                className="enCloseButton"
                                onClick={() => {
                                  setVideo(null)
                                }}
                              >
                                <Image src={trailEnClose} alt="uploadImg" title="uploadImg" fluid />
                              </button>
                              <video ref={videoRef} width="100%" height="100%" controls src={Video} type="video/mp4" />
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col md={12}>
                      <hr />
                      <span className="text-pink">Recommended Size: 1200px X 500px</span>
                    </Col>
                    <span style={{color: 'red'}}>{error}</span>
                    <Col md={12} className="text-right">
                      <Button variant="pink" type="submit" className="py-2 px-3 btn-sm frmht mr-2">
                        Save
                      </Button>
                      <Button
                        variant="pink"
                        type="submit"
                        className="py-2 px-3 btn-sm frmht dltbtn"
                        onClick={() => history.push(`/profile`)}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      {/* ------section end---------- */}
    </>
  )
}
export default EditTrail
