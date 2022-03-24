export const getImage = id => {
  return `https://picsum.photos/id/${id}0/300/200/`;
};

export const getName = id => {
  let names = [
    'Harry',
    'Kevin',
    'Lance',
    'Phil',
    'Jake',
    'Larry',
    'Nicole',
    'Janice',
    'Mona',
    'Carol',
    'Theo',
  ];

  return names[id];
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
