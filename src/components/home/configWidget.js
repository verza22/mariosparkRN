import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { connect } from 'react-redux';
import CustomPicker from '../lib/customPicker'

class ConfigWidget extends Component {
  constructor(props) {
    super(props);
  }

  getWidgetInfoTypeList(){
    switch(this.props.type){
      case 1:
      case 3:
      case 4:
        return this.props.widgetInfoTypeList.filter(x=> x.value < 5);
      case 2:
        return this.props.widgetInfoTypeList;
      default:
        return [];
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextInput
            label="Title"
            value={this.props.title}
            onChangeText={(text) => this.props.handleState('title', text )}
            style={styles.input}
          />
          {
            this.props.type === 1 &&
            <View style={styles.symbolView}>
              <TextInput
                label="Symbol"
                value={this.props.symbol}
                onChangeText={(text) => this.props.handleState('symbol', text )}
                style={styles.input}
              />
              <Checkbox.Item
                status={this.props.isLeading ? 'checked' : 'unchecked'}
                onPress={() => this.props.handleState('isLeading', !isLeading )}
              />
            </View>
          }
          <CustomPicker
            label="Selecciona un tipo"
            value={this.props.type}
            onValueChange={(itemValue) => this.props.handleState('type', itemValue )}
            items={this.props.widgetTypeList}
            cLabel='label'
            cValue='value'
          />
          <CustomPicker
            label="Selecciona un dato"
            value={this.props.infoType}
            onValueChange={(itemValue) => this.props.handleState('infoType', itemValue )}
            items={this.getWidgetInfoTypeList()}
            cLabel='label'
            cValue='value'
          />
          <View style={styles.symbolView}>
            <View style={styles.sizeXView}>
              <CustomPicker
                label="Tamaño horizontal"
                value={this.props.sizeX}
                onValueChange={(itemValue) => this.props.handleState('sizeX', itemValue )}
                items={this.props.sizeXList}
                cLabel='label'
                cValue='value'
              />
            </View>
            <View style={styles.sizeYView}>
              <CustomPicker
                label="Tamaño vertical"
                value={this.props.sizeY}
                onValueChange={(itemValue) => this.props.handleState('sizeY', itemValue )}
                items={this.props.sizeYList}
                cLabel='label'
                cValue='value'
              />
            </View>
          </View>
          <Button mode="contained" onPress={this.props.saveWidget} style={styles.saveButton}>
            { this.props.titleBtn }
          </Button>
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

export default connect(mapStateToProps, null)(ConfigWidget);
