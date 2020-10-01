import { combineReducers } from 'redux';

const INITIAL_STATE = {
    list: [],
    isLoading: false,
    searchValue: 'dog',
    isRefreshing: true,
};

const getImagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case 'GET_IMAGES_ACTIONS':
          
          console.log(action.payload)
          console.log('this is reducer')
        //   current.push(addedImage)
        //   const newState = { current, possible }
        //   return newState

        const {searchValue, results, isRefreshing} = action.payload
        console.log(searchValue + ' ' + isRefreshing)
        return {
            ...state,
            // list: state.list.concat(action.payload.results),
            list: isRefreshing
                ? results
                : state.list.concat(results),
            searchValue: searchValue,
            isRefreshing: isRefreshing,
        }

  default:
    return state
  }
};

export default combineReducers({
  images: getImagesReducer
});