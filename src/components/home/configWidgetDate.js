import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import CustomPicker from '../lib/customPicker'
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

class ConfigWidgetDate extends Component {
  constructor(props) {
    super(props);

    this.dateList = [
      { value: "-90", label: '@Hoy - 90' },
      { value: "-60", label: '@Hoy - 60' },
      { value: "-30", label: '@Hoy - 30' },
      { value: "-15", label: '@Hoy - 15' },
      { value: "-7", label: '@Hoy - 7' },
      { value: "-1", label: '@Ayer' },
      { value: "0", label: '@Hoy' }
    ]

    this.state = {
      open: false,
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
                this.props.dateFromType === 0 ? 
                <View style={styles.pickerView}>
                  <CustomPicker
                    label="Fecha inicio"
                    value={this.props.dateFrom}
                    onValueChange={(itemValue) => this.props.handleDate('dateFrom', itemValue)}
                    items={this.dateList}
                    cLabel='label'
                    cValue='value'
                  />
                </View> :
                <View style={{ padding: 20, flex: 1 }}>
                  <Text style={{ marginBottom: 10 }}>Fecha inicio: {this.props.dateFrom}</Text>
                  <Button mode="contained" onPress={() => this.setOpen('open', true)}>
                    Seleccionar fecha
                  </Button>
                  <DatePicker
                    modal
                    mode="date"
                    open={this.state.open}
                    date={moment(this.props.dateFrom, 'YYYY-MM-DD').toDate()}
                    onConfirm={(date) => {
                      this.setOpen('open', false);
                      this.props.handleDate('dateFrom', date);
                    }}
                    onCancel={() => {
                      this.setOpen('open', false);
                    }}
                  />
                </View>
              }
              <View style={styles.checkView}>
                <Checkbox.Item
                  status={this.props.dateFromType === 1 ? 'checked' : 'unchecked'}
                  onPress={() => this.props.handleDate('dateFromType', this.props.dateFromType === 1 ? 0 : 1)}
                />
              </View>
            </View>
            <View style={styles.view}>
              {
                this.props.dateToType === 0 ? 
                <View style={styles.pickerView}>
                  <CustomPicker
                    label="Fecha fin"
                    value={this.props.dateTo}
                    onValueChange={(itemValue) => this.props.handleDate('dateTo', itemValue)}
                    items={this.dateList}
                    cLabel='label'
                    cValue='value'
                  />
                </View> :
                <View style={{ padding: 20, flex: 1 }}>
                  <Text style={{ marginBottom: 10 }}>Fecha fin: {this.props.dateTo}</Text>
                  <Button mode="contained" onPress={() => this.setOpen('open2', true)}>
                    Seleccionar fecha
                  </Button>
                  <DatePicker
                    modal
                    mode="date"
                    open={this.state.open2}
                    date={moment(this.props.dateTo, 'YYYY-MM-DD').toDate()}
                    onConfirm={(date) => {
                      this.setOpen('open2', false);
                      this.props.handleDate('dateTo', date);
                    }}
                    onCancel={() => {
                      this.setOpen('open2', false);
                    }}
                  />
                </View>
              }
              <View style={styles.checkView}>
                <Checkbox.Item
                  status={this.props.dateToType === 1 ? 'checked' : 'unchecked'}
                  onPress={() => this.props.handleDate('dateToType', this.props.dateToType === 1 ? 0 : 1)}
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
