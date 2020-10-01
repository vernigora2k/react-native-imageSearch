import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Button } from 'react-native';
import { PersonListItem } from '../components/PersonListItem';
import { toJson } from "unsplash-js";
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getImages, getData } from '../Redux/getImagesActions'

const APP_ACCESS_KEY = 'axNBnsOWS9a1Joggi1L8-3LGqkfuxjrXubhs26DMQy0'
const Unsplash = require('unsplash-js').default
export const unsplash = new Unsplash({
  accessKey: APP_ACCESS_KEY
})
export const toJsonUnsplash = require('unsplash-js').toJson

class PersonListScreen extends Component {
  state = {
    list: [],
    isLoading: false,
    searchValue: 'dog',
  };

  componentDidMount = () => {
    this.onRefresh();
  };

  getPageNumber = (isRefreshing) => {
    const limit = 15
    const offset = isRefreshing ? 0 : this.state.list.length
    const page = Math.ceil(offset / limit) + 1
    return page
  }

  getMoreData = (isRefreshing) => {
    const limit = 15
    const offset = isRefreshing ? 0 : this.state.list.length
    const page = Math.ceil(offset / limit) + 1
    unsplash.search.photos(this.state.searchValue, {page})
    .then(toJsonUnsplash)
    .then(json => {
      this.setState({
        list: isRefreshing 
          ? json.results 
          : this.state.list.concat(json.results)
      })
    })
  }

  onRefresh = () => {
    this.getMoreData(true);
  };

  onScrollToEnd = ({distanceFromEnd}) => {
    this.getMoreData(false);
  };

  onItemPress = (item) => {
    this.props.navigation.navigate('full image', {imageInfo: item});
  };

  keyExtractor = (imageInfo) => imageInfo + Math.random().toString()

  renderItem = ({item}) => {
    return (
      <PersonListItem
        imageInfo={item}
        onPress={this.onItemPress.bind(this, item)}
      />
    );
  };

  render = () => {
    const {isLoading, list} = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          placeholder='input some word for search'
          autoFocus={true}
          style={styles.searchInput}
          onChangeText={(value) => {this.setState({
            searchValue: value
          })}}
          onSubmitEditing={this.getMoreData}
        />
        <Button
          title='Search Photo'
          onPress={() => {
            this.getMoreData
            // this.props.getData()
            this.props.getData({
              searchValue: this.state.searchValue, 
              pageNumger: this.getPageNumber(),
              isRefreshing: true,
            })
            console.log(this.props)
          }}
        />
        <FlatList
          style={styles.list}
          data={list}
          renderItem={this.renderItem}
          refreshing={isLoading}
          onRefresh={this.onRefresh}
          onEndReached={this.onScrollToEnd}
          onEndReachedThreshold={0.2}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 1,
  }
});

const mapStateToProps = (state) => {
  const { images } = state
  return images
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getData
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(PersonListScreen)