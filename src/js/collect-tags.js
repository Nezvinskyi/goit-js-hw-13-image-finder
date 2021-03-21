let tags = [];

export function collectTags(hits) {
  // collects all tags from data and trims spaces
  hits.forEach(item => {
    const arr = item.tags.split(',');
    tags = tags.concat(arr);
  });
  tags = tags.map(item => item.trim());

  // removes duplicate entries
  tags = tags.reduce((allItems, item) => {
    if (allItems.indexOf(item) === -1) {
      allItems.push(item);
    }
    return allItems;
  }, []);
  return tags;
}
