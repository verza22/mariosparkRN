import React from 'react';
import { View, ActivityIndicator, StyleSheet  } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';

class GlobalLoading extends React.Component {

  constructor(){
    super();

    this.state = {
    }
  }

  render () {
    return <View style={styles.container}>
        {
          this.props.loading &&
          <ActivityIndicator size="large" color="white" />
        }
        {this.props.error !== "" &&
          <Snackbar
            visible={true}
            onDismiss={() => { }}>
            {this.props.error}
          </Snackbar>
        }
      </View>
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color de fondo semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

const mapStateToProps = state => ({
    loading: state.dataRequestReducer.loading,
    error: state.dataRequestReducer.error
});

export default connect(mapStateToProps, null)(withTheme(GlobalLoading));