const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

let mouseDown = false;
// console.log(ranges);

const toggleIcons = {
  true: '►',
  false: '❚❚'
}

function toggleHandler() {
  console.dir(video);
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  toggle.textContent = toggleIcons[video.paused];
}

function toggleFullScreen() {  if (this.requestFullscreen) {
    this.requestFullscreen();
  } else if (this.mozRequestFullScreen) {
    this.mozRequestFullScreen();
  } else if (this.webkitRequestFullscreen) {
    this.webkitRequestFullscreen();
  }
}

function updateProgress() {
  const curProgress = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${curProgress}%`;
}

function rangesHandler() {
  const type = this.name;
  video[type] = this.value;
}

function scrollVideo(e) {
  const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = newTime;
  console.log(newTime);
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

toggle.addEventListener('click', toggleHandler);
video.addEventListener('click', toggleHandler);
video.addEventListener('dblclick', toggleFullScreen);
video.addEventListener('timeupdate', updateProgress);
ranges.forEach((range) => {
  range.addEventListener('change', rangesHandler);
  range.addEventListener('mousemove', rangesHandler);
});
progress.addEventListener('click', scrollVideo)
progress.addEventListener('mousemove', (e) => mouseDown &&scrollVideo(e));
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mousedown', () => mouseDown = true);
skipButtons.forEach((btn) => {
  btn.addEventListener('click', skip);
})