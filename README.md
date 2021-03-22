GoIT-JS-HW-13-image-finder

TODO:
- button: scroll to the top
- spinner of fetch

Description:
Application for search and viewing of images by the keyword using Pixabay API

Features:

1. renders gallery in grid 3x4 cards (using Handlebars template). each card contains image preview (with alt property) and statistics 

2. shows notifications (using PNotify):
- error message - if no images found
- status message - if more than 12 messages found - "# images found, click or
  scroll down to show more"
- status message - if less than 12 messages found - "# images found, click or
  search new query"

3. infinite scroll: 
- observe 'sentinel' with intersectionObserver if more than 12 images found

4. when scrolled to the end of content:
- unobserve sentinel
- status message - "no more messages to show"

5. tags:
- collects first 30 popular tags (reads .tags property in every loaded image,flattens and trims tag values, sorts array of values by frequency, removes duplicates and slices first 30 values)
- renders tags into google-style carousel (using dCarousel)
- with every new fetch of data (on infinite scroll) values of tags are collected and rendered again

6.click on tag: 
-initiates new search with query from the tag (cleared from #symbol)

7.click on the preview opens a large-size image in modal window (using basicLightbox)
