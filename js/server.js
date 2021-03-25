const getData = async () => {
  const response = await fetch('https://22.javascript.pages.academy/keksobooking/data');

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export {getData};
