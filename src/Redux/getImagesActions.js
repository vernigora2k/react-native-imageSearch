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
        console.log(json)
    })
    // .then(json => {
    //   this.setState({
    //     list: isRefreshing 
    //       ? json.results 
    //       : this.state.list.concat(json.results)
    //   })
    // })
}