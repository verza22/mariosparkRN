import React, { Component  } from 'react';
import messaging from '@react-native-firebase/messaging';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';

import { DataFailure } from '../redux/actions/dataRequest'

class NotificationManager extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.requestUserPermission();
      this.createChannel();
        
      this.unsubscribeBg = messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', JSON.stringify(remoteMessage));
    
        PushNotification.localNotification({
          channelId: "mariosPark",
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body
        });
      });

      // Manejar mensajes en primer plano
      this.unsubscribe = messaging().onMessage(async remoteMessage => {
          console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

          PushNotification.localNotification({
            channelId: "mariosPark",
            title: remoteMessage.notification.title,
            message: remoteMessage.notification.body
          });
            
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

    createChannel(){
      PushNotification.createChannel(
        {
            channelId: "mariosPark",
            channelName: "mariosPark channel",
            channelDescription: "mariosPark Notification",
            playSound: true,
            soundName: "default",
            importance: 4, // Default: 4. Max: 5
            vibrate: true, // Default: true
        },
        (created) => console.log(`createChannel returned '${created}'`)
    );
    }

    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      if (this.unsubscribeBg) {
        this.unsubscribeBg();
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