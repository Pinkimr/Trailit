import {
  GET_TOUR_DETAILS,
  ADD_EDIT_TRAIL_INTRO,
  GET_FOLLOW_LIST_EACH_TRAIL,
  UPDATE_TOUR_INFO,
} from '../action/reducer.types'

export default function (state = {}, action) {
  switch (action.type) {
    case GET_TOUR_DETAILS:
      return {
        ...state,
        trailTourData: action.payload,
      }
    case UPDATE_TOUR_INFO:
      return {
        ...state,
        trailTourData: {
          ...state.trailTourData,
          trail_user_status: action?.payload?.trail_user_status,
        },
      }
    case ADD_EDIT_TRAIL_INTRO:
      return {...state, addEditTrailIntroData: action.payload}
    case GET_FOLLOW_LIST_EACH_TRAIL:
      return {...state, followListEachTrailData: action.payload}
    case 'CLEAR_FOLLOWER_LIST':
      return {...state, followListEachTrailData: []}
    default:
      return state
  }
}
