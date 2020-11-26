const textblockData = {
  id: 1,
  type: "variant",
  seed: Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5),
  content: ['{"time":1598221279729,"blocks":[{"type":"paragraph","data":{"text":"Nieuw tekst blok."}}],"version":"2.18.0"}'],
};

export {textblockData};
