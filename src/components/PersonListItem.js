import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
export class PersonListItem extends Component {
  
  render = () => {
    const {imageInfo, onPress} = this.props;
    const { id, alt_description, user: {name}, urls: {thumb, regular} } = imageInfo

    return (
        <View style={styles.container} key={id}>
            <TouchableOpacity onPress={onPress}>
                <View>
                    <Image
                      style={styles.avatar}
                      source={{
                          uri: thumb,
                          width: 50,
                          height: 50,
                      }}
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.itemInfo}>
                <Text style={styles.name}>{alt_description}</Text>
                <Text style={styles.email}>{name}</Text>
            </View>
        </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: '#b0b0b0',
    borderBottomWidth: 0.4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemInfo: {
    marginLeft: 15,
    marginRight: 50,
  },
  name: {
    fontSize: 16,
    color: '#2e2e2e',
  },
  email: {
    marginTop: 10,
    fontSize: 13,
    color: '#b0b0b0',
  },
});
