import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { withTheme, IconButton, MD3Colors } from 'react-native-paper';
import { connect } from 'react-redux';

import { GetWidgets } from '../../redux/actions/widgets'
import Widget from './widget';

class HomeScreen extends Component {
    constructor(props) {
      super(props);
      this.colors = props.theme.colors;

      this.updateWidgets = this.updateWidgets.bind(this);
      this.addWidget = this.addWidget.bind(this);
      this.editMode = this.editMode.bind(this);
      this.orderWidget = this.orderWidget.bind(this);

      this.state = {};
    }

    componentDidMount(){
        this.updateWidgets();
    }

    updateWidgets(){
      this.props.GetWidgets(this.props.userID);
    }

    addWidget(){
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'AddWidget' }]
      })
    }

    editMode(){

    }

    orderWidget(){

    }
  
    render() {
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.containerBtn}>
            <IconButton
                icon="sort"
                iconColor={this.colors.primary}
                size={24}
                onPress={this.orderWidget}
                mode="contained-tonal"
              />
              <IconButton
                icon="pencil"
                iconColor={this.colors.primary}
                size={24}
                onPress={this.editMode}
                mode="contained-tonal"
              />
              <IconButton
                icon="plus"
                iconColor={this.colors.primary}
                size={24}
                onPress={this.addWidget}
                mode="contained-tonal"
                style={[styles.iconButton]}
              />
            </View>
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
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  containerBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 0,
  },
  iconButton: {
    marginRight: 12,
  },
});

const mapStateToProps = state => ({
    userID: state.appConfigReducer.user.id,
    widgets: state.widgetReducer.widgets
});

const mapDispatchToProps = {
    GetWidgets
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(HomeScreen));
