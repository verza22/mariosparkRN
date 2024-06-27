import React, { Component  } from 'react';
import messaging from '@react-native-firebase/messaging';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

import { DataFailure } from '../redux/actions/dataRequest'

class NotificationManager extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
        this.requestUserPermission();

         // Manejar mensajes en primer plano
        this.unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
              
            Alert.alert(
                remoteMessage.notification.title,
                remoteMessage.notification.body,
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
              );
        });
  
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
          this.unsubscribe();
        }
    }
    
    requestUserPermission() {
        messaging().requestPermission()
        .then(authStatus => {
            const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);
            }
        })
        .catch(error => {
            this.props.DataFailure('Failed to request user permission');
            console.error('Failed to request user permission', error);
        });
    }


    render() {
      return null
    }
}

const mapDispatchToProps = {
    DataFailure
};


export default connect(null, mapDispatchToProps)(NotificationManager);