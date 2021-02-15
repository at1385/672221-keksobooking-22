import {getRandomArrayElement, getRandomArray, getRandomNumber} from './util.js'

const AVATAR_MAX_COUNT = 8;

const APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APARTMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const CHECK_TIMES = ['12:00', '13:00', '14:00'];

const X_MIN = 35.65000;
const X_MAX = 35.70000;
const Y_MIN = 139.70000;
const Y_MAX = 139.80000;
const COORDINATE_PRECISION = 5;

const MAX_COUNT = 10;

const createAd = () => {
  const coordinateX = getRandomNumber(X_MIN, X_MAX, true, COORDINATE_PRECISION);
  const coordinateY = getRandomNumber(Y_MIN, Y_MAX, true, COORDINATE_PRECISION);

  return {
    author: {
      avatar: `img/avatars/user0${window._.random(1, AVATAR_MAX_COUNT)}.png`,
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
