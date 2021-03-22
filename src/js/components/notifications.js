import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

function onNotFoundError() {
  error({
    text: 'No images were found. Please try another search!',
    delay: 4000,
  });
}
function onError() {
  notice({
    text: "Ooops! Something's wrong! Please try again later",
    delay: 4000,
  });
}

function fetchStatus(totalHits) {
  notice({
    text: `We found ${totalHits} images. Click on image to enlarge or scroll down to see more!`,
    delay: 4000,
  });
}

function notTooManyStatus(totalHits) {
  notice({
    text: `We found just ${totalHits} images. Click on image to enlarge or try another search!`,
    delay: 4000,
  });
}

function noMoreContent() {
  notice({
    text: 'We have nothing more to hide! Please try another search!',
    delay: 4000,
  });
}
export default {
  onNotFoundError,
  onError,
  fetchStatus,
  noMoreContent,
  notTooManyStatus,
};
