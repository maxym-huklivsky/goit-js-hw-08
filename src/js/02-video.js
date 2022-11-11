import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

setTime();

const onPlay = function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

function setTime() {
  const message = localStorage.getItem('videoplayer-current-time');

  if (message) {
    player.setCurrentTime(message);
  }
}
