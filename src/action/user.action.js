import {
  UPDATE_PROFILE_DATA,
  GET_FOLLOW_USER,
  GET_PROFILE_DATA,
  SEARCH_BY,
  UPDATE_FOLLOW_USER,
  GET_PAYMENT_DETAILS,
  ADD_UPDATE_PAYMENT_DETAILS,
  REMOVE_CARD_DETAILS,
  ADD_EDIT_CARD_DETAILS,
  GET_CARD_DETAILS,
  CHANGE_USER_PICTURE,
  GET_FOLLOW_LIST_EACH_USER,
  UPDATE_NOTIFICATION,
  GET_ALL_NOTIFICATION,
  CLEAR_NOTIFICATION,
  MY_PROFILE_DATA,
} from './reducer.types'
import {apiAction} from './api.action'
import {platformUrl, trailEndpoints, url} from './endpoint'
import {getQuery} from '../Utils/AppUtill'

export function updateFollowUser(data) {
  return apiAction({
    url: `${url + trailEndpoints.updateFollowUser}/${data}`,
    method: 'POST',

    label: UPDATE_FOLLOW_USER,
  })
}

export function getFollowUser(data) {
  return apiAction({
    url: `${url + trailEndpoints.getFollowUser}/${data}`,
    method: 'POST',
    label: GET_FOLLOW_USER,
  })
}

export function searchBy(data) {
  const query = data.split(' ').join('+')

  return apiAction({
    url: `${url + trailEndpoints.searchBy}?query=${query}`,
    method: 'get',

    label: SEARCH_BY,
  })
}

export function getAuthorDetails(id) {
  return apiAction({
    url: `${url + trailEndpoints.authorDetails}/${id}`,
    method: 'get',
    label: GET_PROFILE_DATA,
  })
}

export function getMyProfileDetails(id) {
  return apiAction({
    url: `${url + trailEndpoints.authorDetails}/${id}`,
    method: 'get',
    label: MY_PROFILE_DATA,
  })
}

export function addUpdateProfile(data) {
  return apiAction({
    url: url + trailEndpoints.updateProfileData,
    method: 'post',
    label: UPDATE_PROFILE_DATA,
    data,
    showToast: true,
    successMessage: 'Your changes have been saved',
  })
}

export function getPaymentDetails(data) {
  return apiAction({
    url: `${url + trailEndpoints.getPaymentDetails}/${data}`,
    method: 'get',

    label: GET_PAYMENT_DETAILS,
  })
}

export function addUpdatePaymentDetails(data) {
  return apiAction({
    url: url + trailEndpoints.addUpdatePaymentDetails,
    method: 'post',
    label: ADD_UPDATE_PAYMENT_DETAILS,
    data,
    successMessage: 'Payment Details Updated',
    showToast: true,
  })
}

export function getCardDetails(data) {
  return apiAction({
    url: `${url + trailEndpoints.getCardDetails}/${data}`,
    method: 'get',
    label: GET_CARD_DETAILS,
  })
}

export function addEditCardDetails(data) {
  return apiAction({
    url: url + trailEndpoints.addEditCardDetails,
    method: 'post',

    label: ADD_EDIT_CARD_DETAILS,
    data,
    successMessage: 'Payment Details Updated',
    showToast: true,
  })
}

export function removeCardDetails(data) {
  return apiAction({
    url: url + trailEndpoints.removeCardDetails,
    method: 'delete',

    label: REMOVE_CARD_DETAILS,
    data,
    successMessage: 'Card Removed',
    showToast: true,
  })
}

export function changeUserPicture(data) {
  return apiAction({
    url: platformUrl + trailEndpoints.profileImage,
    method: 'post',

    label: CHANGE_USER_PICTURE,
    data,
    successMessage: 'Profile Picture Updated',
    showToast: true,
  })
}

export function getFollowListForEachUser(data) {
  const query = getQuery(data)
  return apiAction({
    url: `${url + trailEndpoints.followListEachUser}?${query}`,
    method: 'get',

    label: GET_FOLLOW_LIST_EACH_USER,
  })
}

export function getAllNotification() {
  return apiAction({
    url: url + trailEndpoints.getAllNotification,
    method: 'get',

    label: GET_ALL_NOTIFICATION,
  })
}

export function updateNotification(data) {
  const query = getQuery(data)
  return apiAction({
    url: `${url + trailEndpoints.updateNotification}?${query}`,
    method: 'post',

    label: UPDATE_NOTIFICATION,
  })
}

export function clearNotification() {
  return apiAction({
    url: url + trailEndpoints.clearNotifications,
    method: 'DELETE',

    label: CLEAR_NOTIFICATION,
  })
}
