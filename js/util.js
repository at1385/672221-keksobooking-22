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

const showIncomingError = (message) => {
  const alertBlock = document.createElement('div');

  alertBlock.style.position = 'absolute';
  alertBlock.style.top = 0;
  alertBlock.style.right = 0;
  alertBlock.style.left = 0;
  alertBlock.style.zIndex = 100;
  alertBlock.style.padding = '10px 3px';
  alertBlock.style.fontSize = '30px';
  alertBlock.style.color = 'white';
  alertBlock.style.textAlign = 'center';
  alertBlock.style.background = 'red';

  alertBlock.textContent = message;

  document.body.appendChild(alertBlock);
};

export {getCorrectEndingWord, hideNode, showAlert};
