export const calculateBMI = (weight, height) => {
  return Number((weight / (height * height)).toFixed(2));
};
