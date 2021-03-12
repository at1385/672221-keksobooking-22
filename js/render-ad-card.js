import {hideNode} from './util.js';

const renderAdCard = (ad) => {
  const adCardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const adCard = adCardTemplate.cloneNode(true);

  const adTitle = adCard.querySelector('.popup__title');
  ad.title ? adTitle.textContent = ad.title : hideNode(adTitle);

  const adAddress = adCard.querySelector('.popup__text--address');
  ad.address ? adAddress.textContent = ad.address : hideNode(adAddress);

  const adPrice = adCard.querySelector('.popup__text--price');
  ad.price >= 0 ? adPrice.textContent = `${ad.price} ₽/ночь` : hideNode(adPrice);

  const adType = adCard.querySelector('.popup__type');
  ad.type ? adType.textContent = ad.type : hideNode(adType);

  const adCapacity = adCard.querySelector('.popup__text--capacity');
  ad.rooms >= 0 && ad.guests > 0 ? adCapacity.textContent = `${ad.rooms} комнаты для ${ad.guests} гостей` : hideNode(adCapacity);

  const adCheckTime = adCard.querySelector('.popup__text--time');
  ad.checkin && ad.checkout ? adCheckTime.textContent = `Заезд после ${ad.checkin}, выезд до ${ad.checkout}` : hideNode(adCheckTime);

  const adFeaturesBlock = adCard.querySelector('.popup__features');
  const adFeatures = adFeaturesBlock.querySelectorAll('.popup__feature');

  ad.features.forEach((element) => {
    for (let i = 0; i < adFeatures.length; i++) {
      if (adFeatures[i].className.includes(`--${element}`)) {
        adFeatures[i].textContent = element;
        break;
      }
    }
  });

  adFeatures.forEach((element) => {
    if (!element.textContent) {
      adFeaturesBlock.removeChild(element);
    }
  });

  if (!adFeaturesBlock.querySelector('.popup__feature')) {
    hideNode(adFeaturesBlock);
  }

  const adDescription = adCard.querySelector('.popup__description');
  ad.description ? adDescription.textContent = ad.description : hideNode(adDescription);

  const adPhotosBlock = adCard.querySelector('.popup__photos');
  const adPhoto = adPhotosBlock.querySelector('.popup__photo');

  adPhotosBlock.removeChild(adPhoto);

  ad.photos.forEach((element) => {
    const photo = adPhoto.cloneNode(true);
    photo.src = element;
    adPhotosBlock.appendChild(photo);
  });

  if (!adPhotosBlock.querySelector('.popup__photo')) {
    hideNode(adPhotosBlock);
  }

  const adAvatar = adCard.querySelector('.popup__avatar');
  ad.avatar ? adAvatar.src = ad.avatar : hideNode(adAvatar);

  return adCard;
};

export {renderAdCard};
