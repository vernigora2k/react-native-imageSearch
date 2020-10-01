import { combineReducers } from 'redux';

const INITIAL_STATE = {
  current: [],
  possible: [
    'Alice',
    'Bob',
    'Sammy',
  ],
};

const getImagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case 'GET_IMAGES':
          const { current, possible } = state
          const addedImage = possible.splice(action.payload, 1)

          current.push(addedImage)
          const newState = { current, possible }
          return newState
  default:
    return state
  }
};

export default combineReducers({
  images: getImagesReducer
});