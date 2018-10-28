import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { NativeAudio } from '@ionic-native/native-audio';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private nativeAudio: NativeAudio
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      splashScreen.hide();
      this.nativeAudio.preloadSimple('alarm', 'assets/sound/alarm.mp3');
      this.nativeAudio.setVolumeForComplexAsset('alarm', 1.0);
    });
  }
}

