'use strict'

const getRandomIntInclusive = (min, max) => {
  if (max < min || max === min) {
    return;
  }

  if (min >= 0 && max >= 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

getRandomIntInclusive(1, 10);

const getRandomFloatInclusive = (min, max, precision) => {
  if (max < min || max === min) {
    return;
  }

  if (min >= 0 && max >= 0) {
    return +(Math.random() * (max - min) + min).toFixed(precision);
  }
}

getRandomFloatInclusive(1.1, 1.2, 5);
