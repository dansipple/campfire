const API_URL = "https://fcm.googleapis.com/fcm/send";

class FirebaseClient {

    constructor() {
        this.sendData = this.sendData.bind(this);
        this.sendNotification = this.sendNotification.bind(this);
        this.sendNotificationWithData = this.sendNotificationWithData.bind(this);
    }

    sendNotification(token) {
        let body = {
            "to": token,
            "notification":{
                "title": "Simple FCM Client",
                "body": "This is a notification with only NOTIFICATION.",
                "sound": "default",
                "click_action": "fcm.ACTION.HELLO"
            },
            "priority": 10
        };

        this._send(JSON.stringify(body), "notification");
    }

    sendData(token) {
        let body = {
            "to": token,
            "data":{
                "title": "Simple FCM Client",
                "body": "This is a notification with only DATA.",
                "sound": "default",
                "click_action": "fcm.ACTION.HELLO",
                "remote": true
            },
            "priority": "normal"
        };

        this._send(JSON.stringify(body), "data");
    }
    
    sendMessageNotification(token, message, userName, networkId) {
        let messageBody = message;
        if(messageBody.length > 30) {
            messageBody = message.substring(0, 30);
            messageBody = messageBody + "...";
        }

        let body = {
            "to": token,
            "notification":{
                "title": userName,
                "body": messageBody,
                "sound": "default",
                "click_action": "fcm.ACTION.MESSAGE"
            },
            "data":{
                "title": userName,
                "body": messageBody,
                "click_action": "fcm.ACTION.MESSAGE",
                "remote": true
            },
            "priority": "high"
        };

        this._send(JSON.stringify(body), "notification-message");
    }

    sendPotentialNotification(token, userName, networkId) {
        let body = {
            "to": token,
            "notification":{
                "body": userName+" is interested in your convo!",
                "sound": "default",
                "click_action": "fcm.ACTION.SWIPE"
            },
            "data":{
                "body": userName+" is interested in your convo!",
                "click_action": "fcm.ACTION.SWIPE",
                "remote": true
            },
            "priority": "high"
        };

        this._send(JSON.stringify(body), "notification-potential");
    }

    sendConnectionNotification(token, networkId) {
        let body = {
            "to": token,
            "notification":{
                "body": "You have a new connection!",
                "sound": "default",
                "click_action": "fcm.ACTION.Connection"
            },
            "data":{
                "body": "You have a new connection!",
                "click_action": "fcm.ACTION.Connection",
                "remote": true
            },
            "priority": "high"
        };

        this._send(JSON.stringify(body), "notification-connection");
    }

    sendNotificationWithData(token) {
        let body = {
            "to": token,
            "notification":{
                "title": "Dan Sipple sent you a message!",
                "body": "I want to go to the movies",
                "sound": "default",
                "click_action": "fcm.ACTION.HELLO"
            },
            "data":{
                "title": "Dan Sipple sent you a message!",
                "body": "I want to go to the movies",
                "click_action": "fcm.ACTION.HELLO",
                "remote": true
            },
            "priority": "high"
        };

        this._send(JSON.stringify(body), "notification-data");
    }

    _send(body, type) {
        let headers = new Headers({
            "Content-Type": "application/json",
            "Content-Length": parseInt(body.length),
            "Authorization": "key=AAAA4uI1Qfw:APA91bFerwin7K3R7F0pgOgYsL7eoA63aQa4s7R4ny9gmYDaANa76xdUuGVCjYs0pa-2gkz9_wTQ7ubFfrrRwZdGcbRUIg-JOrbOcPViOal3TSMvgR2iEdwX2_sBA6zlcapeDCetimO_R3JzUgeQBIAD555WZatkSQ"
        });

        fetch(API_URL, { method: "POST", headers, body })
            .then(response => console.log("Send " + type + " response", response))
            .catch(error => console.log("Error sending " + type, error));
    }

}

let firebaseClient = new FirebaseClient();
export default firebaseClient;