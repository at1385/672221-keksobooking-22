const getCorrectEndingWord = (value, firstWord, secondWord, thirdWord) => {
  if (value === 1) {
    return firstWord;
  } else if (value <= 4) {
    return secondWord;
  } else {
    return thirdWord;
  }
};

const hideNode = (node) => {
  node.style.display = 'none';
}



};

