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

const deleteAttribute = (element, attribute) => {
  if (element.hasAttribute(attribute)) {
    element.removeAttribute(attribute);
  }
}

const isEscKeydown = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

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

const main = document.querySelector('main');

const showOutcomingMessage = (templateId, templateContent) => {
  const messageTemplate = document.querySelector(templateId).content.querySelector(templateContent);
  const message = messageTemplate.cloneNode(true);

  message.style.zIndex = 1000;

  main.appendChild(message);

  const hideOutcomingMessage = () => {
    main.removeChild(message);
    document.removeEventListener('keydown', onOutcomingMessageEscKeydown);
  };

  const onOutcomingMessageEscKeydown = (evt) => {
    if (isEscKeydown(evt)) {
      evt.preventDefault();
      hideOutcomingMessage();
    }
  };

  message.addEventListener('click', () => {
    hideOutcomingMessage(templateContent);
  });

  document.addEventListener('keydown', onOutcomingMessageEscKeydown);
};

export {getCorrectEndingWord, hideNode, deleteAttribute, showIncomingError, showOutcomingMessage};
