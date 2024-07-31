import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar  } from 'react-native-tab-view';
import { withTheme } from 'react-native-paper';
import moment from 'moment';

import ConfigWidget from './configWidget';
import ConfigWidgetDate from './configWidgetDate';
import { UpdateWidget } from '../../redux/actions/widgets';

class EditWidgetFormScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
    this.handleState = this.handleState.bind(this);
    this.saveWidget = this.saveWidget.bind(this);
    this.handleDate = this.handleDate.bind(this);

    this.colors = props.theme.colors;

    let widget = this.props.route.params.widget;

    this.state = {
      id: widget.id,
      title: widget.title,
      symbol: widget.symbol,
      isLeading: widget.isLeading,
      infoType: widget.infoType,
      type: widget.type,
      dateFrom: widget.dateFrom,
      dateFromType: widget.dateFromType,
      dateTo: widget.dateTo,
      dateToType: widget.dateToType,
      position: widget.position,
      sizeX: widget.sizeX,
      sizeY: widget.sizeY,
      bgColor: widget.bgColor,
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
                dateFromType: widget.dateFromType,
                dateTo: widget.dateTo,
                dateToType: widget.dateToType,
                position: widget.position,
                sizeX: widget.sizeX,
                sizeY: widget.sizeY,
                bgColor: widget.bgColor
            })
        }
    }

  saveWidget() {
    const { id, title, symbol, isLeading, infoType, type, dateFrom, dateFromType, dateTo, dateToType, position, sizeX, sizeY, bgColor} = this.state;

    const newWidget = {
        id: id,
        userID: this.props.userID,
        title,
        symbol,
        isLeading,
        infoType,
        type,
        dateFrom: dateFrom,
        dateTo: dateTo,
        dateFromType: dateFromType,
        dateToType: dateToType,
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

  handleDate(property, value){
    if(property === "dateFromType"){
      let aux = value === 1 ? moment().subtract(90, 'days').format('YYYY-MM-DD') : "-90";
      this.setState({ dateFrom: aux });
    }
    if(property === "dateToType"){
      let aux = value === 1 ? moment().format('YYYY-MM-DD') : "0";
      this.setState({ dateTo: aux });
    }
    if(property === "dateFrom" && this.state.dateFromType === 1)
      value = moment(value).format('YYYY-MM-DD');
    if(property === "dateTo" && this.state.dateToType === 1)
      value = moment(value).format('YYYY-MM-DD');

    this.setState({ [property]: value });
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
              titleBtn="Editar Widget"
          />
          case 'second':
            return <ConfigWidgetDate 
              dateFrom={this.state.dateFrom}
              dateTo={this.state.dateTo}
              dateFromType={this.state.dateFromType}
              dateToType={this.state.dateToType}
              handleDate={this.handleDate}
          />;
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
    UpdateWidget
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(EditWidgetFormScreen));
