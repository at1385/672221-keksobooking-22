import {createAds} from './create-ads.js';
import {hideNode} from './util.js'

const mapCanvas = document.querySelector('#map-canvas');

const adCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const ads = createAds();

const adCard = adCardTemplate.cloneNode(true);

const adTitle = adCard.querySelector('.popup__title');
ads[0].offer.title ? adTitle.textContent = ads[0].offer.title : hideNode(adTitle);

const adAddress = adCard.querySelector('.popup__text--address');
ads[0].offer.address ? adAddress.textContent = ads[0].offer.address : hideNode(adAddress);

const adPrice = adCard.querySelector('.popup__text--price');
ads[0].offer.price >= 0 ? adPrice.textContent = `${ads[0].offer.price} ₽/ночь` : hideNode(adPrice);

const adType = adCard.querySelector('.popup__type');
ads[0].offer.type ? adType.textContent = ads[0].offer.type : hideNode(adType);

const adCapacity = adCard.querySelector('.popup__text--capacity');
ads[0].offer.rooms >= 0 && ads[0].offer.guests > 0 ? adCapacity.textContent = `${ads[0].offer.rooms} комнаты для ${ads[0].offer.guests} гостей` : hideNode(adCapacity);

const adCheckTime = adCard.querySelector('.popup__text--time');
ads[0].offer.checkin && ads[0].offer.checkout ? adCheckTime.textContent = `Заезд после ${ads[0].offer.checkin}, выезд до ${ads[0].offer.checkout}` : hideNode(adCheckTime);

const adFeaturesBlock = adCard.querySelector('.popup__features');
const adFeatures = adFeaturesBlock.querySelectorAll('.popup__feature');

ads[0].offer.features.forEach((element) => {
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
ads[0].offer.description ? adDescription.textContent = ads[0].offer.description : hideNode(adDescription);

const adPhotosBlock = adCard.querySelector('.popup__photos');
const adPhoto = adPhotosBlock.querySelector('.popup__photo');

adPhotosBlock.removeChild(adPhoto);

ads[0].offer.photos.forEach((element) => {
  const photo = adPhoto.cloneNode(true);
  photo.src = element;
  adPhotosBlock.appendChild(photo);
});

if (!adPhotosBlock.querySelector('.popup__photo')) {
  hideNode(adPhotosBlock);
}

const adAvatar = adCard.querySelector('.popup__avatar');
ads[0].author.avatar ? adAvatar.src = ads[0].author.avatar : hideNode(adAvatar);

mapCanvas.appendChild(adCard);
