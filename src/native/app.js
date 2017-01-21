import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import * as appActions from './reducers/app/actions';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// screen related book keeping
import {registerScreens} from './screens';
registerScreens(store, Provider);

export default class App {
    constructor() {
        // since react-redux only works on components, we need to subscribe this class manually
        this.currentRoot = undefined;
        this.currentNetwork = undefined;
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appActions.appInitialized());
    }

    onStoreUpdate() {
        const {root, currentNetwork} = store.getState().app;
        // handle a root change
        // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether

        if(this.currentRoot != root || (this.currentNetwork != currentNetwork && this.currentRoot !== undefined)) {
            this.currentNetwork = currentNetwork;
            this.currentRoot = root;
            this.startApp(this.currentRoot);
        }
    }

    startApp(root) {
        switch (root) {
            case 'login':
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'Login',
                        title: 'Convos'
                    }
                });
                return;
            case 'after-login':
                if(typeof this.currentNetwork.name == 'undefined') {
                    Navigation.startSingleScreenApp({
                        screen: {
                            title: 'Networks',
                            screen: 'ChooseNetwork'
                        },
                        passProps: {
                            isRoot: true
                        }
                    });
                    return;
                }
                else {
                    Navigation.startTabBasedApp({
                        tabs: [
                            {
                                screen: 'ConvoSwiper',
                                title: 'Convos',
                                label: 'Swipe',
                                titleImage: require('../../img/logo-small.png'),
                                icon: require('../../img/three_selected.png'),
                                navigatorStyle: {
                                    navBarBackgroundColor: '#eee',
                                    navBarTextColor: '#666',
                                    navBarButtonColor: '#666',
                                    navBarNoBorder: true,
                                    navBarHidden: true
                                }
                            },
                            {
                                screen: 'Connect',
                                title: 'Connect',
                                label: 'Connect',
                                icon: require('../../img/bolt.png'),
                                navigatorStyle: {
                                    navBarBackgroundColor: '#fff',
                                    navBarTextColor: '#666',
                                    navBarButtonColor: '#666',
                                    navBarHidden: true
                                }
                            },
                            {
                                screen: 'NewConvo',
                                title: 'New',
                                label: '',
                                icon: require('../../img/add_square.png'),
                                navigatorStyle: {
                                    navBarBackgroundColor: '#fff',
                                    navBarTextColor: '#666',
                                    navBarButtonColor: '#666'
                                }
                            },
                            {
                                screen: 'Inbox',
                                title: 'Messages',
                                label: 'Chat',
                                icon: require('../../img/chat.png'),
                                navigatorStyle: {
                                    navBarBackgroundColor: '#fff',
                                    navBarTextColor: '#666',
                                    navBarButtonColor: '#666',
                                    navBarHidden: true
                                }
                            },
                            {
                                screen: 'Settings',
                                title: 'Settings',
                                label: 'Settings',
                                icon: require('../../img/settings.png'),
                                navigatorStyle: {
                                    navBarBackgroundColor: '#fff',
                                    navBarTextColor: '#666',
                                    navBarButtonColor: '#666'
                                }
                            }
                        ],
                        tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
                            //tabBarButtonColor: null,
                            tabBarSelectedButtonColor: '#3498db',
                            tabBarBackgroundColor: '#fff'

                        }
                    });
                    return;
                }
            default:
                console.error('Unknown app root');
        }
    }
}

