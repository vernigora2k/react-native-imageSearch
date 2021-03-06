import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux'

class PersonInfoScreen extends Component {
  
  render = () => {
    const {imageInfo: {urls: {regular}}} = this.props.route.params;

    return (
      <View style={styles.container}>
          <Image
            source={{
              uri: regular,
              width: '100%',
              height: '100%',
            }}
          />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return state.images
}

export default connect(mapStateToProps)(PersonInfoScreen)