let tags = [];

function collectTags(hits) {
  // collects all tags from data and trims spaces
  hits.forEach(item => {
    const arr = item.tags.split(',');
    tags = tags.concat(arr);
  });
  tags = tags.map(item => item.trim());

  // // creates frequency object
  let frequency = {};
  tags.forEach(item => {
    frequency[item] = 0;
  });

  // //removes duplicates
  const uniques = tags.filter(item => {
    return ++frequency[item] == 1;
  });

  // //sort by frequency
  const sortedUniques = uniques.sort(function (a, b) {
    return frequency[b] - frequency[a];
  });

  const slicedSorted = sortedUniques.slice(0, 30);

  return slicedSorted;
}

function resetTags() {
  tags = [];
}

export default { resetTags, collectTags };
