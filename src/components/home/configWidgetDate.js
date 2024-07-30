import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import CustomPicker from '../lib/customPicker'
import DatePicker from 'react-native-date-picker';

class ConfigWidgetDate extends Component {
  constructor(props) {
    super(props);

    this.dateList = [
      { value: -90, label: '@Dias -90' },
      { value: -60, label: '@Dias -60' },
      { value: -30, label: '@Dias -30' },
      { value: -15, label: '@Dias -15' },
      { value: -7, label: '@Dias -7' },
      { value: -1, label: '@Ayer' },
      { value: 0, label: '@Hoy' }
    ]

    this.state = {
      dateFrom: -90,
      dateFromType: 0,
      dateFrom2: new Date(),
      open: false,
      dateTo: 0,
      dateToType: 0,
      dateTo2: new Date(),
      open2: false
    }
  }

  setDate = (property, date) => {
    this.setState({ [property]: date });
  };

  setOpen = (property, open) => {
    this.setState({ [property]: open });
  };

  render() {

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.view}>
              {
                this.state.dateFromType === 0 ? 
                <View style={styles.pickerView}>
                  <CustomPicker
                    label="Fecha inicio"
                    value={this.state.dateFrom}
                    onValueChange={(itemValue) => this.setState({dateFrom: itemValue})}
                    items={this.dateList}
                    cLabel='label'
                    cValue='value'
                  />
                </View> :
                <View style={{ padding: 20, flex: 1 }}>
                  <Text style={{ marginBottom: 10 }}>Fecha inicio: {this.state.dateFrom2.toLocaleDateString()}</Text>
                  <Button mode="contained" onPress={() => this.setOpen('open', true)}>
                    Seleccionar fecha
                  </Button>
                  <DatePicker
                    modal
                    mode="date"
                    open={this.state.open}
                    date={this.state.dateFrom2}
                    onConfirm={(date) => {
                      this.setOpen('open', false);
                      this.setDate('dateFrom2', date);
                    }}
                    onCancel={() => {
                      this.setOpen('open', false);
                    }}
                  />
                </View>
              }
              <View style={styles.checkView}>
                <Checkbox.Item
                  status={this.state.dateFromType === 1 ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({dateFromType: this.state.dateFromType === 1 ? 0 : 1})}
                />
              </View>
            </View>
            <View style={styles.view}>
              {
                this.state.dateToType === 0 ? 
                <View style={styles.pickerView}>
                  <CustomPicker
                    label="Fecha fin"
                    value={this.state.dateTo}
                    onValueChange={(itemValue) => this.setState({dateTo: itemValue})}
                    items={this.dateList}
                    cLabel='label'
                    cValue='value'
                  />
                </View> :
                <View style={{ padding: 20, flex: 1 }}>
                  <Text style={{ marginBottom: 10 }}>Fecha fin: {this.state.dateTo2.toLocaleDateString()}</Text>
                  <Button mode="contained" onPress={() => this.setOpen('open2', true)}>
                    Seleccionar fecha
                  </Button>
                  <DatePicker
                    modal
                    mode="date"
                    open={this.state.open2}
                    date={this.state.dateTo2}
                    onConfirm={(date) => {
                      this.setOpen('open2', false);
                      this.setDate('dateTo2', date);
                    }}
                    onCancel={() => {
                      this.setOpen('open2', false);
                    }}
                  />
                </View>
              }
              <View style={styles.checkView}>
                <Checkbox.Item
                  status={this.state.dateToType === 1 ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({dateToType: this.state.dateToType === 1 ? 0 : 1})}
                />
              </View>
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
  view: {
    flex: 1,
    flexDirection: 'row',
    
  },
  pickerView: {
    flex: 1
  },
  checkView: {
    justifyContent: 'center',
    alignSelf: 'center',
  }
});

const mapStateToProps = state => ({
  widgetTypeList: state.widgetReducer.widgetTypeList,
  widgetInfoTypeList: state.widgetReducer.widgetInfoTypeList,
  sizeXList: state.widgetReducer.sizeXList,
  sizeYList: state.widgetReducer.sizeYList
});

export default connect(mapStateToProps, null)(ConfigWidgetDate);
