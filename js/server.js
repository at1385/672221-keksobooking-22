const ADS_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const AD_FORM_URL = 'https://22.javascript.pages.academy/keksobooking';

const getData = async (url) => {
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

const sendData = (body, url, onSuccess, onError) => {
  fetch(
    url,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
}

export {ADS_DATA_URL, AD_FORM_URL, getData, sendData};
