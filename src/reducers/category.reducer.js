import {get} from '../Utils/AppUtill'
import {
  ADD_USER_CATEGORY,
  CREATE_TRAIL_FOLLOW,
  DELETE_TOUR,
  DELETE_USER_CATEGORY,
  DO_CATEGORY_EXIST,
  GET_ALL_CATEGORY,
  GET_TRAILS_LIST,
  UPDATE_TOUR_INFO,
} from '../action/reducer.types'

export default function (state = {}, action) {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return {
        ...state,
        getAllCategory: action.payload,
      }

    case GET_TRAILS_LIST: {
      const temp = {
        ...state,
        trailList: action.extraParam
          ? {
              ...(state.trailList || {}),
              [action.extraParam]: [
                ...get(['trailList', [action.extraParam]], state, []),
                ...get(['payload'], action, []),
              ],
            }
          : [...get(['payload'], action, [])],
        trailTotalPages: action.totalPages,
      }
      return temp
    }

    case CREATE_TRAIL_FOLLOW:
      if (action.status === 200) {
        let updatedList = null
        if (Array.isArray(state.trailList)) {
          updatedList = [...state.trailList]
          const index = updatedList.findIndex(trail => trail.trail_id === Number(get(['payload', 'trail_id'], action)))
          if (index !== -1) {
            updatedList[index].isFollowing = get(['payload', 'isFollowing'], action)
          }
        } else {
          updatedList = {...state.trailList}
          const keys = Object.keys(updatedList)

          keys.forEach(cat => {
            const index = updatedList[cat].findIndex(
              trail => trail.trail_id === Number(get(['payload', 'trail_id'], action))
            )

            if (index !== -1) {
              updatedList[cat][index].isFollowing = get(['payload', 'isFollowing'], action)
            }
          })
        }

        return {...state, trailList: updatedList}
      }
      return state

    case DELETE_TOUR:
      if (action.status === 200) {
        let updatedList = null
        if (Array.isArray(state.trailList)) {
          updatedList = [...state.trailList]
          updatedList = updatedList.filter(trail => trail.trail_id !== Number(get(['payload', 'trail_id'], action)))
        } else {
          updatedList = {...state.trailList}
          const keys = Object.keys(updatedList)

          keys.forEach(cat => {
            updatedList[cat] = updatedList[cat].filter(
              trail => trail.trail_id !== Number(get(['payload', 'trail_id'], action))
            )
          })
        }

        return {...state, trailList: updatedList}
      }
      return state

    case UPDATE_TOUR_INFO:
      if (action.status === 200) {
        let updatedList = null
        if (Array.isArray(state.trailList)) {
          updatedList = [...state.trailList]
          const index = updatedList.findIndex(trail => trail.trail_id === Number(get(['payload', 'trail_id'], action)))
          if (index !== -1) {
            updatedList[index].trail_user_status = get(['payload', 'trail_user_status'], action)
          }
        } else {
          updatedList = {...state.trailList}
          const keys = Object.keys(updatedList)

          keys.forEach(cat => {
            const index = updatedList[cat].findIndex(
              trail => trail.trail_id === Number(get(['payload', 'trail_id'], action))
            )

            if (index !== -1) {
              updatedList[cat][index].trail_user_status = get(['payload', 'trail_user_status'], action)
            }
          })
        }

        return {...state, trailList: updatedList}
      }
      return state

    case 'CLEAR_TRAIL_LIST':
      return {...state, trailList: undefined, trailTotalPages: undefined}
    case DO_CATEGORY_EXIST:
      return {
        ...state,
        doCategoryExistData: action.payload,
      }

    case ADD_USER_CATEGORY:
      return {
        ...state,
        doCategoryExistData: {
          ...get(['doCategoryExistData'], state, {}),
          categories_list: get(
            ['payload', 'categories_list'],
            action,
            get(['doCategoryExistData', 'categories_list'], state)
          ),
        },
      }

    case DELETE_USER_CATEGORY:
      return {
        ...state,
        doCategoryExistData: {
          ...get(['doCategoryExistData'], state, {}),
          categories_list: get(
            ['payload', 'categories_list'],
            action,
            get(['doCategoryExistData', 'categories_list'], state)
          ),
        },
      }

    default:
      return state
  }
}
