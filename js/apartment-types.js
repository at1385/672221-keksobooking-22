const APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalow'];

const translateApartmentType = (apartmentType) => {
  switch (apartmentType) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
  }
};

export {APARTMENT_TYPES, translateApartmentType};
