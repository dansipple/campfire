import React, { Component } from "react";

import FCM from "react-native-fcm";

import FCMController from '../controllers/fcm';

export default class PushController extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        FCM.requestPermissions();

        if(this.props.userId) {
            FCM.getFCMToken().then(token => {
                FCMController.setUserToken(this.props.userId, token);
            });
        }

        FCM.getInitialNotification().then(notif => {
            console.log("INITIAL NOTIFICATION", notif)
        });

        this.notificationUnsubscribe = FCM.on("notification", notif => {
            console.log("Notification", notif);
            if (notif && notif.local) {
                return;
            }
            if(notif.opened_from_tray){
                //app is open/resumed because user clicked banner
            }
            this.sendRemote(notif);
        });

        this.refreshUnsubscribe = FCM.on("refreshToken", token => {
            console.log("TOKEN (refreshUnsubscribe)", token);
        });
    }

    sendRemote(notif) {
        FCM.presentLocalNotification({
            title: notif.title,
            body: notif.body,
            priority: "high",
            click_action: notif.click_action,
            show_in_foreground: true,
            local: true
        });
    }

    componentWillUnmount() {
        this.refreshUnsubscribe();
        this.notificationUnsubscribe();
    }


    render() {
        return null;
    }
}