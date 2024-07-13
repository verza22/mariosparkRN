import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import { GetWidgets } from '../../redux/actions/widgets'
import Widget from './widget';

class HomeScreen extends Component {
    constructor(props) {
      super(props);
      this.colors = props.theme.colors;

      this.state = {};
    }

    componentDidMount(){
        this.props.GetWidgets(this.props.userID);
        console.log(this.props.widgets)
    }
  
    render() {
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.innerContainer}>
              {this.props.widgets.map(x => <Widget key={x.id} widget={x} />)}
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
  innerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Asegura que las tarjetas se distribuyan uniformemente
    paddingVertical: 10,
    paddingHorizontal: 0,
  }
});

const mapStateToProps = state => ({
    userID: state.appConfigReducer.user.id,
    widgets: state.widgetReducer.widgets
});

const mapDispatchToProps = {
    GetWidgets
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(HomeScreen));
