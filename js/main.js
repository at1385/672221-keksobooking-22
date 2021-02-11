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

// module3-task1
const AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];

const APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APARTMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const CHECK_TIMES = ['12:00', '13:00', '14:00'];

const X_MIN = 35.65000;
const X_MAX = 35.70000;
const Y_MIN = 139.70000;
const Y_MAX = 139.80000;

const MAX_COUNT = 10;

const getRandomArrayElement = (array) => {
  return array[window._.random(0, array.length - 1)];
}

const checkDoubleArrayElement = (array, element) => {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] === element) {
      return true;
    }
  }
}

const getRandomArray = (length, values, unique = false) => {
  const array = [];

  new Array(window._.random(length)).fill(null).map((element) => {
    element = getRandomArrayElement(values);
    array.push(element);

    if (unique && array.length > 1) {
      while (checkDoubleArrayElement(array, element)) {
        array.pop();
        element = getRandomArrayElement(values);
        array.push(element);
      }
    }
  });

  return array;
}

const getRandomFloatNumber = (min, max, precision) => {
  return window._.random(min, max).toFixed(precision);
}

const createAd = () => {
  const coordinateX = getRandomFloatNumber(X_MIN, X_MAX, 5);
  const coordinateY = getRandomFloatNumber(Y_MIN, Y_MAX, 5);

  return {
    author: {
      avatar: `img/avatars/user0${getRandomArrayElement(AVATARS)}.png`,
    },
    offer: {
      title: 'Загаловок',
      address: `${coordinateX}, ${coordinateY}`,
      price: 100,
      type: getRandomArrayElement(APARTMENT_TYPES),
      rooms: 2,
      guests: 2,
      checkin: getRandomArrayElement(CHECK_TIMES),
      checkout: getRandomArrayElement(CHECK_TIMES),
      features: getRandomArray(APARTMENT_FEATURES.length, APARTMENT_FEATURES, true),
      description: 'Описание',
      photos: getRandomArray(MAX_COUNT, APARTMENT_PHOTOS),
    },
    location: {
      x: coordinateX,
      y: coordinateY,
    },
  }
};

const ads = new Array(MAX_COUNT).fill(null).map(() => createAd());

ads;
