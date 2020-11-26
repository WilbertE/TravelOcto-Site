import seedrandom from "seedrandom";
const randomNumberWithSeed = function (min, max, seed) {
  var rng = seedrandom(seed);

  return Math.floor(rng() * (max - min + 1) + min);
};

export {randomNumberWithSeed};
