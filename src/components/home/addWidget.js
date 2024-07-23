import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import CustomPicker from '../lib/customPicker'

import { AddWidget } from '../../redux/actions/widgets';

class AddWidgetFormScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackPressHandler = this.handleBackPressHandler.bind(this);

    this.state = {
      title: '',
      symbol: '',
      isLeading: false,
      infoType: 0,
      type: 0,
      dateFrom: '',
      dateTo: '',
      position: 0,
      sizeX: 100,
      sizeY: 100,
      bgColor: '',
    };
  }

  saveWidget = () => {
    const {
      title, symbol, isLeading, infoType, type, dateFrom, dateTo,
      position, sizeX, sizeY, bgColor
    } = this.state;

    const newWidget = {
        userID: this.props.userID,
        title,
        symbol,
        isLeading,
        infoType,
        type,
        dateFrom: "2024-07-01",
        dateTo: "2024-07-30",
        dateFromType: 0,
        dateToType: 0,
        position,
        sizeX,
        sizeY,
        bgColor
    };

    this.props.AddWidget(newWidget, () => {
      this.props.navigation.navigate('Home');
    });
  };

  handleBackPressHandler() {
    this.props.navigation.navigate('Home');
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPressHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressHandler);
  }

  render() {
    const {
      title, symbol, isLeading, infoType, type, dateFrom, dateTo,
      position, sizeX, sizeY, bgColor
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TextInput
            label="Title"
            value={title}
            onChangeText={(text) => this.setState({ title: text })}
            style={styles.input}
          />
          <View style={styles.symbolView}>
            <TextInput
              label="Symbol"
              value={symbol}
              onChangeText={(text) => this.setState({ symbol: text })}
              style={styles.input}
            />
            <Checkbox.Item
              status={isLeading ? 'checked' : 'unchecked'}
              onPress={() => this.setState({ isLeading: !isLeading })}
            />
          </View>
          <CustomPicker
            label="Selecciona un tipo"
            value={type}
            onValueChange={(itemValue) => this.setState({ type: itemValue })}
            items={this.props.widgetTypeList}
            cLabel='label'
            cValue='value'
          />
          <CustomPicker
            label="Selecciona un dato"
            value={infoType}
            onValueChange={(itemValue) => this.setState({ infoType: itemValue })}
            items={this.props.widgetInfoTypeList}
            cLabel='label'
            cValue='value'
          />
          <View style={styles.symbolView}>
            <View style={styles.sizeXView}>
              <CustomPicker
                label="Tamaño horizontal"
                value={sizeX}
                onValueChange={(itemValue) => this.setState({ sizeX: itemValue })}
                items={this.props.sizeXList}
                cLabel='label'
                cValue='value'
              />
            </View>
            <View style={styles.sizeYView}>
              <CustomPicker
                label="Tamaño vertical"
                value={sizeY}
                onValueChange={(itemValue) => this.setState({ sizeY: itemValue })}
                items={this.props.sizeYList}
                cLabel='label'
                cValue='value'
              />
            </View>
          </View>
          <Button mode="contained" onPress={this.saveWidget} style={styles.saveButton}>
            Guardar Widget
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
  userID: state.appConfigReducer.user.id,
  widgetTypeList: state.widgetReducer.widgetTypeList,
  widgetInfoTypeList: state.widgetReducer.widgetInfoTypeList,
  sizeXList: state.widgetReducer.sizeXList,
  sizeYList: state.widgetReducer.sizeYList
});

const mapDispatchToProps = {
  AddWidget,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddWidgetFormScreen);
