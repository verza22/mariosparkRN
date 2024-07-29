import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { connect } from 'react-redux';

class ConfigWidgetDate extends Component {
  constructor(props) {
    super(props);

    this.state = {
        title: 'asd',
        checked: false
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.symbolView}>
              <TextInput
                label="Title"
                value={this.state.title}
                onChangeText={(text) => this.setState({title: text})}
                style={styles.input}
              />
              <Checkbox.Item
                status={this.state.checked ? 'checked' : 'unchecked'}
                onPress={() => this.setState({checked: !this.state.checked})}
              />
            </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 20,
    flex: 1
  },
  saveButton: {
    marginBottom: 20,
  },
  symbolView: {
    flex: 1,
    flexDirection: 'row'
  },
  sizeXView: {
    flex: 1,
    marginRight: 6
  },
  sizeYView: {
    flex: 1,
    marginLeft: 6
  }
});

const mapStateToProps = state => ({
  widgetTypeList: state.widgetReducer.widgetTypeList,
  widgetInfoTypeList: state.widgetReducer.widgetInfoTypeList,
  sizeXList: state.widgetReducer.sizeXList,
  sizeYList: state.widgetReducer.sizeYList
});

export default connect(mapStateToProps, null)(ConfigWidgetDate);
