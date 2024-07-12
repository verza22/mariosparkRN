
import React, { Component  } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import { GetWidgets } from '../../redux/actions/widgets'

class HomeScreen extends Component {
    constructor(props) {
      super(props);
      this.colors = props.theme.colors;

      this.state = {
      };
    }

    componentDidMount(){
        this.props.GetWidgets(this.props.userID);
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Text>Home {JSON.stringify(this.props.widgets)}</Text>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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