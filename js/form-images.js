import {adForm, adFormHeader} from './form.js';

const IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const setImage = (imgChooser, imgPreview, isMultiple = false, imgBlock, imgWidth, imgHeight, imgAlt) => {
  const file = imgChooser.files[0];
  const fileName = file.name.toLowerCase();

  const match = IMAGE_TYPES.some((element) => fileName.endsWith(element));

  if (match) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (isMultiple) {
        if (!imgPreview.childNodes.length) {
          imgPreview.insertAdjacentHTML ('beforeend', `<img src="${reader.result}" alt="${imgAlt}" width="${imgWidth}" height="${imgHeight}">`);
        } else {
          imgBlock.insertAdjacentHTML ('beforeend', `<div class="${imgPreview.className}" style="overflow: hidden"><img src="${reader.result}" alt="${imgAlt}" width="${imgWidth}" height="${imgHeight}"></div>`);
        }
      } else {
        imgPreview.src = reader.result;
      }
    })

    reader.readAsDataURL(file);
  }
};

// avatar
const adFormAvatarPreview = adFormHeader.querySelector('.ad-form-header__preview img');
const adFormAvatarChooser = adFormHeader.querySelector('#avatar');

adFormAvatarChooser.setAttribute('accept', 'image/png, image/jpeg, image/gif');

adFormAvatarChooser.addEventListener('change', () => {
  setImage(adFormAvatarChooser, adFormAvatarPreview);
});

// photo
const adFormPhotoBlock = adForm.querySelector('.ad-form__photo-container');
const adFormPhotoChooser = adFormPhotoBlock.querySelector('#images');
const adFormPhotoPreview = adFormPhotoBlock.querySelector('.ad-form__photo');

adFormPhotoChooser.setAttribute('accept', 'image/png, image/jpeg, image/gif');
adFormPhotoPreview.style = 'overflow: hidden'

adFormPhotoChooser.addEventListener('change', () => {
  setImage(adFormPhotoChooser, adFormPhotoPreview, true, adFormPhotoBlock, 'auto', '100%', 'Фотография жилья');
});
