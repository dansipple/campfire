import { Navigation } from 'react-native-navigation';

import Root from './Root';
import MessageThread from './MessageThread';
import Inbox from './Inbox';
import Settings from './Settings';
import NewConvo from './NewConvo';
import ProfileSwiper from './ProfileSwiper';
import Login from './Login';
import ChooseNetwork from './ChooseNetwork';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
    Navigation.registerComponent('Root', () => Root, store, Provider);
    Navigation.registerComponent('Inbox', () => Inbox, store, Provider);
    Navigation.registerComponent('MessageThread', () => MessageThread, store, Provider);
    Navigation.registerComponent('Settings', () => Settings, store, Provider);
    Navigation.registerComponent('NewConvo', () => NewConvo, store, Provider);
    Navigation.registerComponent('ProfileSwiper', () => ProfileSwiper, store, Provider);
    Navigation.registerComponent('Login', () => Login, store, Provider);
    Navigation.registerComponent('ChooseNetwork', () => ChooseNetwork, store, Provider);
}
