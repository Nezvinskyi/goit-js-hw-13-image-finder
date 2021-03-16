import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

export default function onNotFoundError() {
  error({
    text: 'No images were found. Please try another search!',
    delay: 4000,
  });
}
