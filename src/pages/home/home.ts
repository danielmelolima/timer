import { Component } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';
import { Keyboard } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public running: boolean = false;
  public times: Times = new Times(0,0);
  public interval: any;
  public seconds: number = 0;
  public hundredths: number = 0;

  constructor(private nativeAudio: NativeAudio, private keyboard: Keyboard){
  }
  
  reset() {
    this.times = new Times(this.seconds, this.hundredths);
  }

  changeSeconds(event){
    setTimeout(() => {
      this.times = new Times(this.seconds, this.hundredths);
    })
  }

  changeHundredths(event){
    setTimeout(() => {
      if(this.hundredths > 99) this.hundredths = 99;
      if(this.hundredths < 0) this.hundredths = 0;
      this.times = new Times(this.seconds, this.hundredths);
    })
  }

  format() {
    return `${this.pad0(this.times.seconds)}:${this.pad0(Math.floor(this.times.hundredths))}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.interval = setInterval(() => this.calculate(), 10);
    }
  }

  calculate() {
    this.times.miliseconds += 10;
    if (this.times.miliseconds >= 10) {
      this.times.miliseconds = 0;
      if (this.times.hundredths != 0) {
        this.times.hundredths -= 1;
      }else{
        if(this.times.seconds == 0){
          this.stop();
          return;
        }
        this.times.hundredths = 99;
        this.times.seconds -= 1;
      }
    }
  }

  stop(forced: boolean = false) {
    this.running = false;
    clearInterval(this.interval);
    if(!forced){
      this.nativeAudio.play('alarm');
      this.times = new Times(this.seconds, this.hundredths);
      setTimeout( () => {
        this.nativeAudio.stop('alarm');
      }, 1000);
    }
  }
  
  pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }
}

class Times {
  seconds: number;
  hundredths: number;
  miliseconds: number;

  constructor(seconds: number, hundredths: number){
    this.seconds = seconds;
    this.hundredths = hundredths;
    this.miliseconds = 0;
  }
}
