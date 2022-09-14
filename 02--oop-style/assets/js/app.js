'use strict'

class vPlayer {
    constructor(){
        console.log('loaded');
        // let's initialize the video controls and contents after page load
        this.video = document.getElementById('video');
        this.playPause = document.getElementById('play-pause-button');
        this.currentTime = document.getElementById('current-time');
        this.mute = document.getElementById('mute-button');
        // disable default controls because we have better
        this.video.controls = false;
    
        // add default contents
        this.playPause.innerHTML = '<i class="fa fa-play-circle"></i>';
        this.mute.innerHTML = '<div class="eq"><div class="eq-line"></div><div class="eq-line"></div><div class="eq-line"></div><div class="eq-line"></div><div class="eq-line"></div><div class="eq-line"></div></div>';
        this.currentTime.innerHTML = '00:00';
    }
    init(){
        // add listeners to controllers
        this.video.addEventListener('timeupdate', (e)=>{
            // if there is playback, update the timestamp and animate the equalizer (it's sad, but we have only fake eq)
            this.currentTime.innerHTML = this.toMMSS(video.currentTime);
            this.eqAnim();
        });
        this.playPause.addEventListener('click', (e)=>{
            if(this.video.paused || this.video.ended){
                this.video.play();
                this.playPause.innerHTML = '<i class="fa fa-pause-circle"></i>';
            } else {
                this.video.pause();
                this.playPause.innerHTML = '<i class="fa fa-play-circle"></i>';
            }
        });
        this.mute.addEventListener('click', (e)=>{
            this.video.muted = !this.video.muted;
        });
    }
    eqAnim() {
        // add fake equalizer effect to mute / unmute button
        let brickNum = Math.floor(Math.random() * 5) + 1;
        let heigth = Math.floor(Math.random() * 30) + 1.5;
        let brick = document.querySelector('.eq :nth-child('+brickNum+')');
        let allBricks = document.querySelectorAll('.eq-line');
        if(!this.video.muted){
            setTimeout(()=>{
                brick.style.height = heigth+'px';
            }, 1);
        } else {
            allBricks.forEach((item)=>{
                item.style.height = '2px';
            })
        }
    }
    toMMSS(timestamp) {
        if(typeof timestamp === 'number'){
            let hh = Math.floor(timestamp / 3600);
            let mm = Math.floor((timestamp - (hh * 3600)) / 60);
            let ss = Math.floor(timestamp - (hh * 3600) - (mm * 60));
            hh = (hh < 10) ? '0' + hh : hh;
            mm = (mm < 10) ? '0' + mm : mm;
            ss = (ss < 10) ? '0' + ss : ss;
            return hh + ':' + mm + ':' + ss;
        } else {
            return '00:00:00';
        }
    }
}
