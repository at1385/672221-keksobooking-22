import {deactivateBlock, deactivateElement} from './deactivator.js';

const mapFilterForm = document.querySelector('.map__filters');
const mapFilters = mapFilterForm.querySelectorAll('.map__filter');
const mapFeaturesBlock = mapFilterForm.querySelector('.map__features');

deactivateBlock(mapFilterForm, 'map__filters--disabled');

mapFilters.forEach((element) => {
  deactivateElement(element);
});

deactivateElement(mapFeaturesBlock);

export {mapFilterForm, mapFilters, mapFeaturesBlock};
