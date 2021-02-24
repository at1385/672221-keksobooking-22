const getRandomArrayElement = (array) => {
  return array[window._.random(0, array.length - 1)];
};

const checkDoubleArrayElement = (array, element) => {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] === element) {
      return true;
    }
  }
};

const getRandomArray = (length, values, isUnique = false) => {
  const array = [];

  new Array(window._.random(length)).fill(null).map((element) => {
    element = getRandomArrayElement(values);
    array.push(element);

    if (isUnique && array.length > 1) {
      while (checkDoubleArrayElement(array, element)) {
        array.pop();
        element = getRandomArrayElement(values);
        array.push(element);
      }
    }
  });

  return array;
};

const getRandomNumber = (min, max, isFloat = false, precision) => {
  return +window._.random(min, max, isFloat).toFixed(precision);
};

const hideNode = (node) => {
  node.style.display = 'none';
}

export {getRandomArrayElement, getRandomArray, getRandomNumber, hideNode};
