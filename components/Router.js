import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';

const App = () => (
    <Router>
      <Stack key="root">
        <Scene key="app" component={App} title="App"/>
        <Scene key="map" component={Map} title="Map"/>
        <Scene key="home" component={Home}/>
      </Stack>
    </Router>
  );


class Router extends React.Component {

}