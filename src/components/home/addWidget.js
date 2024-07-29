import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import { TabView, TabBar  } from 'react-native-tab-view';
import ConfigWidget from './configWidget';
import ConfigWidgetDate from './configWidgetDate';

import { withTheme } from 'react-native-paper';

import { AddWidget } from '../../redux/actions/widgets';

class AddWidgetFormScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
    this.handleState = this.handleState.bind(this);
    this.saveWidget = this.saveWidget.bind(this);

    this.colors = props.theme.colors;

    this.state = {
      title: '',
      symbol: '',
      isLeading: false,
      infoType: 1,
      type: 1,
      dateFrom: '',
      dateTo: '',
      position: 0,
      sizeX: 100,
      sizeY: 100,
      bgColor: '',
      index: 0,
      routes: [
        { key: 'first', title: 'Datos' },
        { key: 'second', title: 'Fechas' },
      ]
    };
  }

  handleState(property, value){
    this.setState({ [property]: value });
  }

  saveWidget(){
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
    return <TabView
      navigationState={{
        index: this.state.index,
        routes: this.state.routes,
      }}
      renderScene={({ route }) => {
        switch (route.key) {
          case 'first':
            return <ConfigWidget
              type={this.state.type}
              title={this.state.title}
              symbol={this.state.symbol}
              isLeading={this.state.isLeading}
              infoType={this.state.infoType}
              sizeX={this.state.sizeX}
              sizeY={this.state.sizeY}
              handleState={this.handleState}
              saveWidget={this.saveWidget}
              titleBtn="Guardar Widget"
          />
          case 'second':
            return <ConfigWidgetDate />;
          default:
            return null;
        }
      }}
      onIndexChange={(index) => this.setState({ index })}
      initialLayout={{ width: '100%' }}
      renderTabBar={props => <TabBar {...props}
      indicatorStyle={{ backgroundColor: this.colors.primary }}
      style={{ backgroundColor: 'white' }}
      labelStyle={{ color: 'black' }} 
      inactiveColor='gray'
      />}
    />
  }
}

const mapStateToProps = state => ({
  userID: state.appConfigReducer.user.id
});

const mapDispatchToProps = {
  AddWidget,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(AddWidgetFormScreen));
