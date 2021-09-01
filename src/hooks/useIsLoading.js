import {useSelector} from 'react-redux'

const useIsLoading = () => {
  const {isLoadingData} = useSelector(state => state.apiReducer)

  return isLoadingData
}

export default useIsLoading
