import { Navigation } from 'react-native-navigation';

import Root from './Root';
import MessageThread from './MessageThread';
import Inbox from './Inbox';
import Settings from './Settings';
import NewConvo from './NewConvo';
import ProfileSwiper from './ProfileSwiper';
import SideMenu from './SideMenu';
import ChooseNetwork from './ChooseNetwork';

// register all screens of the app (including internal ones)
export function registerScreens() {
    Navigation.registerComponent('Root', () => Root);
    Navigation.registerComponent('Inbox', () => Inbox);
    Navigation.registerComponent('MessageThread', () => MessageThread);
    Navigation.registerComponent('Settings', () => Settings);
    Navigation.registerComponent('NewConvo', () => NewConvo);
    Navigation.registerComponent('ProfileSwiper', () => ProfileSwiper);
    Navigation.registerComponent('SideMenu', () => SideMenu);
    Navigation.registerComponent('ChooseNetwork', () => ChooseNetwork);
};
