'use strict';

import React, {
  Navigator,
  Component,
  StatusBar,
  Platform,
} from 'react-native';

import ExNavigator from '@exponent/react-native-navigator';
var Router = require('./Router');

class Navigation extends Component {
  render() {
    return (
      <ExNavigator
        initialRoute={Router.JoinRoomScene()}
        style={{flex: 1}}
        sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}
        showNavigationBar={true}
        navigationBarStyle={{
          backgroundColor: '#007aff',
          borderBottomWidth: 0,
        }}
        titleStyle={{
          color: '#ffffff',
        }}
      />
    );
  }
}

module.exports = Navigation;
