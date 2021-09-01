import {get} from '../Utils/AppUtill'
import {
  GET_FOLLOW_USER,
  GET_PROFILE_DATA,
  SEARCH_BY,
  UPDATE_FOLLOW_USER,
  GET_PAYMENT_DETAILS,
  GET_CARD_DETAILS,
  GET_FOLLOW_LIST_EACH_USER,
  CLEAR_GET_FOLLOW_LIST_EACH_USER,
  GET_ALL_NOTIFICATION,
  CLEAR_NOTIFICATION,
  UPDATE_NOTIFICATION_LIST,
  UPDATE_NOTIFICATION_LIVE,
  MY_PROFILE_DATA,
} from '../action/reducer.types'

export default function (state = {}, action) {
  switch (action.type) {
    case GET_FOLLOW_USER:
      return {
        ...state,
        getFollowUserData: action.payload,
      }

    case UPDATE_FOLLOW_USER: {
      const list = [...(state.getFollowListForEachUserData || [])]
      if (action.status === 200) {
        const index = list.findIndex(item => item._id === action.payload.followed_id)
        if (index !== -1) {
          list[index].isFollowing = action.payload.isFollowing
        }
      }
      return {
        ...state,
        getFollowListForEachUserData: list,
      }
    }

    case SEARCH_BY:
      return {
        ...state,
        searchData: action.payload || {},
      }
    case 'CLEAR_SEARCH_DATA':
      return {
        ...state,
        searchData: {},
      }

    case GET_PROFILE_DATA:
      return {
        ...state,
        getProfileData: action.payload,
      }

    case MY_PROFILE_DATA:
      return {
        ...state,
        myProfile: action.payload,
      }

    case 'CLEAR_PROFILE_DATA':
      return {...state, getProfileData: {}}

    case GET_PAYMENT_DETAILS:
      return {...state, getPaymentDetailsData: action.payload}

    case GET_CARD_DETAILS:
      return {...state, getCardDetailsData: action.payload}

    case GET_FOLLOW_LIST_EACH_USER:
      return {
        ...state,
        getFollowListForEachUserData: [...get(['getFollowListForEachUserData'], state, []), ...action.payload],
      }

    case CLEAR_GET_FOLLOW_LIST_EACH_USER:
      return {...state, getFollowListForEachUserData: []}

    case GET_ALL_NOTIFICATION:
      return {...state, notificationList: action.payload}

    case CLEAR_NOTIFICATION:
      return {...state, notificationList: []}

    case UPDATE_NOTIFICATION_LIST:
      return {
        ...state,
        notificationList: [action.payload, ...get(['notificationList'], state, [])],
      }
    case UPDATE_NOTIFICATION_LIVE: {
      const updatedList = [...get(['notificationList'], state, [])]
      const indexOfToBeUpdated = updatedList.findIndex(not => not.trail_notification_id === action.payload)
      if (indexOfToBeUpdated !== -1) {
        updatedList[indexOfToBeUpdated].flag = 'read'
      }

      return {...state, notificationList: updatedList}
    }

    default:
      return state
  }
}
