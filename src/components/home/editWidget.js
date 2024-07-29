import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar  } from 'react-native-tab-view';
import ConfigWidget from './configWidget';
import { withTheme } from 'react-native-paper';

import { UpdateWidget } from '../../redux/actions/widgets';

class EditWidgetFormScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
    this.handleState = this.handleState.bind(this);
    this.saveWidget = this.saveWidget.bind(this);

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
      dateTo: widget.dateTo,
      position: widget.position,
      sizeX: widget.sizeX,
      sizeY: widget.sizeY,
      bgColor: widget.bgColor,
      index: 0,
      routes: [
        { key: 'first', title: 'Datos' },
        { key: 'second', title: 'Second d' },
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
                dateTo: widget.dateTo,
                position: widget.position,
                sizeX: widget.sizeX,
                sizeY: widget.sizeY,
                bgColor: widget.bgColor
            })
        }
    }

  saveWidget() {
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
            return <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;
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
