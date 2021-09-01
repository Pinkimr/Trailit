import {
  ADD_USER_CATEGORY,
  DELETE_USER_CATEGORY,
  DO_CATEGORY_EXIST,
  GET_ALL_CATEGORY,
  GET_TRAILS_LIST,
} from './reducer.types'
import {apiAction} from './api.action'
import {url, trailEndpoints} from './endpoint'
import {getQuery} from '../Utils/AppUtill'

export function getAllCategories(query) {

  const queryString = getQuery(query)

  return apiAction({
    url: `${url}${trailEndpoints.allPublicTrails}${queryString? `?${  queryString}`  : ''}`,
    method: 'GET',

    label: GET_ALL_CATEGORY,
    crossDomain: true,
    showLoader: true,
  })
}

export function getTrailsList(params, extraParam) {
  const query = getQuery(params)

  return apiAction({
    url: `${url + trailEndpoints.trailsList}?${query}`,
    method: 'get',
    label: GET_TRAILS_LIST,
    crossDomain: true,
    extraParam,
    showLoader: true,
  })
}

export function getTrailsListPublic(params, extraParam) {
  const query = getQuery(params)

  return apiAction({
    url: `${url + trailEndpoints.trailsListPublic}?${query}`,
    method: 'get',
    label: GET_TRAILS_LIST,
    crossDomain: true,
    extraParam,
    showLoader: true,
  })
}

export function doCategoriesExist() {
  return apiAction({
    url: url + trailEndpoints.checkCategoriesExist,
    method: 'GET',

    label: DO_CATEGORY_EXIST,
    crossDomain: true,
    showLoader: true,
  })
}

export function addUserCaetgories(data) {
  return apiAction({
    url: url + trailEndpoints.addUpdateUserCategories,
    method: 'POST',

    label: ADD_USER_CATEGORY,
    crossDomain: true,
    data,
    showToast: true,
  })
}

export function removeCategories(data) {
  return apiAction({
    url: url + trailEndpoints.addDeleteUserCategories,
    method: 'POST',

    label: DELETE_USER_CATEGORY,
    crossDomain: true,
    showToast: true,
    data,
  })
}
