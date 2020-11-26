export const sortImagesBySize = (images) => {
  return images
    .sort(function (a, b) {
      return a.width - b.width;
    })
    .reverse();
};

export const generateScrSet = (baseUlr, images) => {
  var scrSet = [];
  sortImagesBySize(images).forEach((image) => {
    scrSet.push(encodeURI(baseUlr + image.fileName) + " " + image.width + "w");
  });
  return scrSet.join(",");
};
