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
  default:
    return state
  }
};

export default combineReducers({
  images: getImagesReducer
});