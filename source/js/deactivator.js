const deactivateBlock = (block, className) => {
  block.classList.add(className);
};

const deactivateElement = (element) => {
  element.setAttribute('disabled', true);
};

export {deactivateBlock, deactivateElement};
