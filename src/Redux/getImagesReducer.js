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
        const {searchValue, results, isRefreshing} = action.payload
        return {
            ...state,
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