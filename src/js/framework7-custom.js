
import Framework7, { utils, getDevice, createStore } from 'framework7/lite';
import Dialog from 'framework7/components/dialog';
import Popup from 'framework7/components/popup';
import Actions from 'framework7/components/actions';
import Sheet from 'framework7/components/sheet';
import Sortable from 'framework7/components/sortable';
import Swipeout from 'framework7/components/swipeout';
import ContactsList from 'framework7/components/contacts-list';
import VirtualList from 'framework7/components/virtual-list';
import ListIndex from 'framework7/components/list-index';
import Tabs from 'framework7/components/tabs';
import Panel from 'framework7/components/panel';
import Card from 'framework7/components/card';

import Fab from 'framework7/components/fab';
import Searchbar from 'framework7/components/searchbar';

Framework7.use([
  Dialog,
  Popup,
  Actions,
  Sheet,
  Sortable,
  Swipeout,
  ContactsList,
  VirtualList,
  ListIndex,
  Tabs,
  Panel,
  Card,
  Fab,
  Searchbar,

]);

export default Framework7;
export { utils, getDevice, createStore };
