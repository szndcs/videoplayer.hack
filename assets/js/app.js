window.onload = (event) => {
    // let's initialize the video controls and contents after page load
    const video = document.getElementById('video');
    const playPause = document.getElementById('play-pause-button');
    const currentTime = document.getElementById('current-time');
    const mute = document.getElementById('mute-button');

    // disable default controls because we have better
    video.controls = false;

    // add default contents
    playPause.innerHTML = '<i class="fa fa-play-circle"></i>';
    mute.innerHTML = '<div class="eq"><div class="eq-line"></div><div class="eq-line"></div><div class="eq-line"></div><div class="eq-line"></div><div class="eq-line"></div><div class="eq-line"></div></div>';
    currentTime.innerHTML = '00:00';

    // add listeners to controllers
    video.addEventListener('timeupdate', (e)=>{
        // if there is playback, update the timestamp and animate the equalizer (it's sad, but we have only fake eq)
        currentTime.innerHTML = video.currentTime.toMMSS();
        eqAnim();
    });

    playPause.addEventListener('click', (e)=>{
        if(video.paused || video.ended){
            video.play();
            playPause.innerHTML = '<i class="fa fa-pause-circle"></i>';
        } else {
            video.pause();
            playPause.innerHTML = '<i class="fa fa-play-circle"></i>';
        }
    });

    mute.addEventListener('click', (e)=>{
        video.muted = !video.muted;
    });

};

// update a prototype to convert video timestamp into mm:ss format
Number.prototype.toMMSS = function(){
    const timestamp = this;
    let hh = Math.floor(timestamp / 3600);
    let mm = Math.floor((timestamp - (hh * 3600)) / 60);
    let ss = Math.floor(timestamp - (hh * 3600) - (mm * 60));
    hh = (hh < 10) ? '0' + hh : hh;
    mm = (mm < 10) ? '0' + mm : mm;
    ss = (ss < 10) ? '0' + ss : ss;
    return mm + ':' + ss;
}

// add fake equalizer effect to mute / unmute button
function eqAnim() {
    let brickNum = Math.floor(Math.random() * 5) + 1;
    let heigth = Math.floor(Math.random() * 30) + 1.5;
    let brick = document.querySelector('.eq :nth-child('+brickNum+')');
    let allBricks = document.querySelectorAll('.eq-line');
    if(!video.muted){
        setTimeout(()=>{
            brick.style.height = heigth+'px';
        }, 1);
    } else {
        allBricks.forEach((item)=>{
            item.style.height = '2px';
        })
    }
}
