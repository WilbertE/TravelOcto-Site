import seedrandom from "seedrandom";

const seedToNumber = function (seed, pickSeedCharAt, maxOutputValue) {
  while (seed.length < pickSeedCharAt) seed += seed;
  const rng = seedrandom(seed[pickSeedCharAt]);
  return Math.floor(rng() * maxOutputValue);
};

export {seedToNumber};
