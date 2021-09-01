import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import _ from 'lodash'

const useApiResponse = ({
  label,
  onSuccess = () => {},
  onError = () => {},
  storePath,
  action,
  dependency = [],
  enabled,
  payload,
}) => {
  const {successLabels = [], type = [], errorLabels = []} = useSelector(state => state.apiReducer)
  const data = useSelector(state => _.get(state, storePath))
  const dispatch = useDispatch()
  const isLoading = type.includes(label)

  useEffect(() => {
    if (successLabels.includes(label)) {
      onSuccess(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successLabels])

  useEffect(() => {
    if (errorLabels.includes(label)) {
      onError()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorLabels])

  useEffect(() => {
    if (enabled) {
      dispatch(action(payload))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependency, enabled, dispatch, action])

  return {isLoading, data}
}

export default useApiResponse
