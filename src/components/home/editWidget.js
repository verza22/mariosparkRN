import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import CustomPicker from '../lib/customPicker'

import { UpdateWidget } from '../../redux/actions/widgets';

class EditWidgetFormScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackPressHandler = this.handleBackPressHandler.bind(this);

    this.typeList = [
        {value: 0, label: "Kpi"},
        {value: 1, label: "List"},
        {value: 2, label: "Pie"},
        {value: 3, label: "Column"}
    ];

    this.infoList = [
        {value: 0, label: "OrderTotal"},
        {value: 1, label: "OrderCount"},
        {value: 2, label: "HotelOrderTotal"},
        {value: 3, label: "HotelOrderCount"},
        {value: 4, label: "WaiterOrderTotal"},
        {value: 5, label: "WaiterOrderCount"},
        {value: 6, label: "CustomerCount"},
        {value: 7, label: "ProductCount"},
        {value: 8, label: "CategoryCount"},
        {value: 9, label: "OtherCustomerCount"},
        {value: 10, label: "OtherProductCount"},
    ];

    let widget = this.props.route.params.widget;

    this.state = {
      id: widget.id,
      title: widget.title,
      symbol: widget.symbol,
      isLeading: widget.isLeading,
      infoType: widget.infoType,
      type: widget.type,
      dateFrom: widget.dateFrom,
      dateTo: widget.dateTo,
      position: widget.position,
      sizeX: widget.sizeX,
      sizeY: widget.sizeY,
      bgColor: widget.bgColor
    };
  }

  componentDidUpdate(prevProps) {
        if (this.props.route.params.widget !== prevProps.route.params.widget) {
            let widget = this.props.route.params.widget;
            this.setState({
                id: widget.id,
                title: widget.title,
                symbol: widget.symbol,
                isLeading: widget.isLeading,
                infoType: widget.infoType,
                type: widget.type,
                dateFrom: widget.dateFrom,
                dateTo: widget.dateTo,
                position: widget.position,
                sizeX: widget.sizeX,
                sizeY: widget.sizeY,
                bgColor: widget.bgColor
            })
        }
    }

  saveWidget = () => {
    const {
      id, title, symbol, isLeading, infoType, type, dateFrom, dateTo,
      position, sizeX, sizeY, bgColor
    } = this.state;

    const newWidget = {
        id: id,
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

    this.props.UpdateWidget(newWidget, () => {
      this.props.navigation.navigate('Home', { editedWidget: Date.now() });
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
          <TextInput
            label="Symbol"
            value={symbol}
            onChangeText={(text) => this.setState({ symbol: text })}
            style={styles.input}
          />
          <Checkbox.Item
            label="Is Leading"
            status={isLeading ? 'checked' : 'unchecked'}
            onPress={() => this.setState({ isLeading: !isLeading })}
          />
          <CustomPicker
            label="Selecciona un dato"
            value={infoType}
            onValueChange={(itemValue) => this.setState({ infoType: itemValue })}
            items={this.infoList}
            cLabel='label'
            cValue='value'
          />
          <CustomPicker
            label="Selecciona un tipo"
            value={type}
            onValueChange={(itemValue) => this.setState({ type: itemValue })}
            items={this.typeList}
            cLabel='label'
            cValue='value'
          />
          <TextInput
            label="Size X"
            keyboardType="numeric"
            value={sizeX.toString()}
            onChangeText={(text) => this.setState({ sizeX: text === "" ? 0 : parseInt(text) })}
            style={styles.input}
          />
          <TextInput
            label="Size Y"
            keyboardType="numeric"
            value={sizeY.toString()}
            onChangeText={(text) => this.setState({ sizeY: text === "" ? 0 : parseInt(text) })}
            style={styles.input}
          />
          <Button mode="contained" onPress={this.saveWidget} style={styles.saveButton}>
            Editar Widget
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
  },
  saveButton: {
    marginBottom: 20,
  },
});

const mapStateToProps = state => ({
  userID: state.appConfigReducer.user.id,
});

const mapDispatchToProps = {
    UpdateWidget
};

export default connect(mapStateToProps, mapDispatchToProps)(EditWidgetFormScreen);
