import React, {Component} from 'react';
import {AppState, StyleSheet} from 'react-native';
import moment from 'moment';
import * as TotoEventBus from '../event/TotoEventBus';

/**
 * Defines the theme of Toto.
 * This class will notify through a "themeChanged" event if the theme has changed due to, for example, change of time
 * and change to dark or light mode
 */
class TotoTheme { 

  constructor() {
    // Initializes the current theme
    this.refreshMode();

    // Initializes the current state
    this.currentState = 'active';

    // Bind
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.refreshMode = this.refreshMode.bind(this);

    // Register to see the changes in the App State
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  /**
   * This method handles the changes in the App State.
   * Basically if the app has been in the background for a long time, it will refresh the mode,
   * rechecking if the mode should still be the same (light or dark)
   */
  handleAppStateChange(nextAppState) {

    // If the app went to 'active' from 'background', refresh the mode
    if (this.currentState == 'background' && nextAppState == 'active') {
      this.refreshMode();
    }

    this.currentState = nextAppState;
  }

  /**
   * This method checks the time and eventually refreshes the mode (dark or light).
   * The typical use of this method is when the app has been in background for a long time and there's a need to check
   * if the mode should still be the same or if the time has changed
   */
  refreshMode() {

    var hour = moment().format('H');

    if (hour < 7 || hour > 18) newTheme = lightMode;
    else newTheme = lightMode;

    // If the new theme is different than the old theme, fire an event
    if (this.theme != null && newTheme.name != this.theme.name) TotoEventBus.bus.publishEvent({name: 'themeChanged', context: {newTheme: newTheme}});

    // Set the new theme as current theme
    this.theme = newTheme;

  }

}

/**
* The themes
*/
const lightMode = {
  name: 'light',
  COLOR_THEME : '#00acc1',
  COLOR_THEME_LIGHT : '#5ddef4',
  COLOR_THEME_DARK : '#007c91',
  COLOR_ACCENT : '#ffeb3b',
  COLOR_ACCENT_LIGHT : '#ffff72',
  COLOR_ACCENT_DARK : '#c8b900',
  COLOR_TEXT: 'rgba(0,0,0,0.7)',
  COLOR_TEXT_ACCENT: 'rgba(0,0,0,0.7)',
  COLOR_TEXT_LIGHT: 'rgba(255,255,255,0.7)',
  COLOR_DISABLED: '#878888',
}

const darkMode = {
  name: 'dark',
  COLOR_THEME : '#00838f',
  COLOR_THEME_LIGHT : '#4fb3bf',
  COLOR_THEME_DARK : '#005662',
  COLOR_ACCENT : '#fff176',
  COLOR_ACCENT_LIGHT : '#ffffa8',
  COLOR_ACCENT_DARK : '#cabf45',
  COLOR_TEXT: 'rgba(255,255,255,0.7)',
  COLOR_TEXT_ACCENT: 'rgba(0,0,0,0.7)',
  COLOR_TEXT_LIGHT: 'rgba(255,255,255,0.7)',
  COLOR_DISABLED: '#878888',
}

export default new TotoTheme();
