import { Navigation } from 'react-native-navigation';

import Swiper from './swiper';
import MessageThread from './MessageThread';
import Inbox from './Inbox';
import FirstTabScreen from './FirstTabScreen';
import SecondTabScreen from './SecondTabScreen';
import ThirdTabScreen from './ThirdTabScreen';
import PushedScreen from './PushedScreen';
import StyledScreen from './StyledScreen';
import NewConvo from './NewConvo';
import LightBoxScreen from './LightBoxScreen';
import NotificationScreen from './NotificationScreen'
import SideMenu from './SideMenu';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => Swiper);
  Navigation.registerComponent('example.inbox', () => Inbox);
  Navigation.registerComponent('example.MessageThread', () => MessageThread);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen);
  Navigation.registerComponent('example.ThirdTabScreen', () => ThirdTabScreen);
  Navigation.registerComponent('example.PushedScreen', () => PushedScreen);
  Navigation.registerComponent('example.StyledScreen', () => StyledScreen);
  Navigation.registerComponent('example.NewConvo', () => NewConvo);
  Navigation.registerComponent('example.LightBoxScreen', () => LightBoxScreen);
  Navigation.registerComponent('example.NotificationScreen', () => NotificationScreen);
  Navigation.registerComponent('example.SideMenu', () => SideMenu);
}
