import { unsplash, toJsonUnsplash } from '../screens/PersonListScreen'
const GET_IMAGES_ACTIONS = 'GET_IMAGES_ACTIONS'

export const getImages = data => ({
    type: GET_IMAGES_ACTIONS,
    payload: data,
})

export const getData = (data) => (dispatch, getState) => {
    const { searchValue, isRefreshing, page } = data
    unsplash.search.photos(searchValue, {page})
    .then(toJsonUnsplash)
    .then(json => {
        dispatch(getImages({
            results: json.results,
            isRefreshing: isRefreshing,
            searchValue: searchValue,
        }))
    })
}