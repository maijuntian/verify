/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import getRouter from './app/router';
import {Provider} from 'react-redux';
import store from './app/store/'
import {changeLocale} from './app/style/i18n'

export default class App extends Component<{}> {

    constructor() {
        super();
        this.state = {
            store: store,
            show: false
        };
        changeLocale();
    }


    render() {
        return (
            <Provider store={this.state.store}>
                {getRouter()}
            </Provider>
        );
    }
}