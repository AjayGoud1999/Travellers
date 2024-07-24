export const removeDuplicatesFromArray = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};
