import { Navigation } from 'react-native-navigation';

import ConvoSwiper from './ConvoSwiper';
import MessageThread from './MessageThread';
import Inbox from './Inbox';
import MyConvos from './MyConvos';
import NewConvo from './NewConvo';
import ProfileSwiper from './ProfileSwiper';
import SideMenu from './SideMenu';

// register all screens of the app (including internal ones)
export function registerScreens() {
    Navigation.registerComponent('ConvoSwiper', () => ConvoSwiper);
    Navigation.registerComponent('Inbox', () => Inbox);
    Navigation.registerComponent('MessageThread', () => MessageThread);
    Navigation.registerComponent('MyConvos', () => MyConvos);
    Navigation.registerComponent('NewConvo', () => NewConvo);
    Navigation.registerComponent('ProfileSwiper', () => ProfileSwiper);
    Navigation.registerComponent('SideMenu', () => SideMenu);
};
