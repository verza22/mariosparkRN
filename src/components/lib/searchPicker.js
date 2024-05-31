import React, { Component, Fragment } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { View, StyleSheet } from 'react-native';

class SearchPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        text: this.props.text
    }
  }
  render() {
  return (
        <View style={styles.container}>
          <SearchableDropdown
           defaultIndex={this.props.defaultIndex}
            onItemSelect={(item) => {
                this.props.onItemSelect(item);
                this.setState({ text: item.name });
            }}
            containerStyle={{  width: '100%', }}
            itemStyle={{
            width: '100%',
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={this.props.items}
            resetValue={false}
            textInputProps={
              {
                placeholder: this.state.text,
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                }
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
      </View>
  );
  }
}

SearchPicker.defaultProps = {
    text: 'Buscar',
    items: [{id: 1, name: 'Prueba'}],
    onItemSelect: () => {},
    defaultIndex: null
 };

const styles = StyleSheet.create({
    container: {
        width: '100%',
    }
  });

export default SearchPicker;