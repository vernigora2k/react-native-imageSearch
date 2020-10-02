import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Button } from 'react-native';
import { PersonListItem } from '../components/PersonListItem';
import { toJson } from "unsplash-js";
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getData } from '../Redux/getImagesActions'

const APP_ACCESS_KEY = 'axNBnsOWS9a1Joggi1L8-3LGqkfuxjrXubhs26DMQy0'
const Unsplash = require('unsplash-js').default
export const unsplash = new Unsplash({
  accessKey: APP_ACCESS_KEY
})
export const toJsonUnsplash = require('unsplash-js').toJson

class PersonListScreen extends Component {
  state = {
    searchValue: 'dog',
  };

  componentDidMount = () => {
    this.onRefresh();
  };

  getPageNumber = (isRefreshing) => {
    const limit = 15
    const offset = isRefreshing ? 0 : this.props.list.length
    return (Math.ceil(offset / limit) + 1)
  }

  onRefresh = () => {
    this.props.getData({
      searchValue: this.state.searchValue, 
      pageNumger: this.getPageNumber(),
      isRefreshing: true,
    })
  };

  onScrollToEnd = ({distanceFromEnd}) => {
    this.props.getData({
      searchValue: this.state.searchValue, 
      pageNumger: this.getPageNumber(),
      isRefreshing: false,
    })
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
    const { list, isLoading } = this.props

    return (
      <View style={styles.container}>
        <TextInput
          placeholder='input some word for search'
          autoFocus={true}
          style={styles.searchInput}
          onChangeText={(value) => {this.setState({
            searchValue: value
          })}}
          onSubmitEditing={() => {
            this.props.getData({
              searchValue: this.state.searchValue, 
              pageNumger: this.getPageNumber(),
              isRefreshing: true,
            })
          }}
        />
        <Button
          title='Search Photo'
          onPress={() => {
            this.props.getData({
              searchValue: this.state.searchValue, 
              pageNumger: this.getPageNumber(),
              isRefreshing: true,
            })
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
  return state.images
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getData
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(PersonListScreen)