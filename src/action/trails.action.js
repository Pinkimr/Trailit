import {
  ADD_EDIT_TRAIL_INTRO,
  CREATE_TRAIL_FOLLOW,
  DELETE_TOUR,
  GET_ALL_TRAILS,
  GET_FOLLOW_LIST_EACH_TRAIL,
  GET_TOUR_DETAILS,
  UPDATE_TOUR_INFO,
} from './reducer.types'
import {apiAction} from './api.action'
import {trailEndpoints, url} from './endpoint'

export function getAllTrailList(userId) {
  return apiAction({
    url: `${url + trailEndpoints.getAllTrails}/${userId}`,
    method: 'GET',
    label: GET_ALL_TRAILS,
  })
}

export function updateTrailFollow(data) {
  return apiAction({
    url: `${url + trailEndpoints.updateFollowTrail}/${data}`,
    method: 'POST',
    label: CREATE_TRAIL_FOLLOW,
    crossDomain: true,
  })
}

export function getTrailTourDetails(tourSlug) {
  return apiAction({
    url: url + trailEndpoints.tourDetails,
    method: 'post',
    label: GET_TOUR_DETAILS,
    crossDomain: true,
    data: {
      trail_name_slug: tourSlug,
    },
  })
}

export function getTrailTourDetailsPublic(tourSlug, steps) {
  const query = `${tourSlug}${steps ? `/${steps}` : ''}`
  return apiAction({
    url: `${url + trailEndpoints.tourDetailsPublic}/${query}`,
    method: 'get',
    label: GET_TOUR_DETAILS,
    crossDomain: true,
  })
}

export function updateTrailTour(tourId, data) {
  return apiAction({
    url: `${url + trailEndpoints.updateTrailTour}/${tourId}`,
    method: 'put',

    label: UPDATE_TOUR_INFO,
    showLoader: true,
    data,
  })
}

export function deleteTour(tourId) {
  return apiAction({
    url: `${url + trailEndpoints.deleteSingleTrail}/${tourId}`,
    method: 'delete',
    label: DELETE_TOUR,
    showLoader: true,
  })
}

export function addEditTrailIntro(data) {
  return apiAction({
    url: url + trailEndpoints.addEditTrailIntro,
    method: 'POST',
    showLoader: true,
    label: ADD_EDIT_TRAIL_INTRO,
    data,
  })
}

export function getFollowListForEachTrail(id) {
  return apiAction({
    url: `${url + trailEndpoints.followListEachTrail}/${id}`,
    method: 'GET',
    label: GET_FOLLOW_LIST_EACH_TRAIL,
  })
}
