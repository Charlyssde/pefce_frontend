import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-section',
  templateUrl: './welcome-section.component.html',
  styleUrls: ['./welcome-section.component.css']
})
export class WelcomeSectionComponent implements OnInit {
  @Input() video = null;
  @Input() logo = null;
  @Input() slogan = null

  // WelcomeVideo
  welcomePlay = true;
  welcomeVolume = true;

  constructor() { }

  ngOnInit() {
  }

  playPauseWelcome(){
    this.welcomePlay = !this.welcomePlay;
    let welcomeVideo:any = document.querySelector('#video');
    (this.welcomePlay) ? welcomeVideo.play() : welcomeVideo.pause();
  }

  muteUnmuteWelcome(){
    this.welcomeVolume = !this.welcomeVolume;
    let welcomeVideo:any = document.querySelector('#video');
  }

}
