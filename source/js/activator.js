const activateBlock = (block, className) => {
  block.classList.remove(className);
};

const activateElement = (element) => {
  element.removeAttribute('disabled');
};

export {activateBlock, activateElement};
