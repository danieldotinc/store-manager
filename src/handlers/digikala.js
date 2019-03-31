function getSize(length, width, height) {
  if (length <= 20 && width <= 15 && height <= 10) return 1;
  if (length <= 35 && width <= 25 && height <= 15) return 2;
  if (length <= 50 && width <= 35 && height <= 35) return 3;
  if (length <= 90 && width <= 65 && height <= 65) return 4;
  if (length > 90 && width > 65 && height > 65) return 5;
}

function getWeight(weight, sizeUnit) {
  if (weight <= 0.5 && sizeUnit === 1) return 1;
  if (weight <= 1 && sizeUnit === 2) return 1;
  if (weight <= 3 && sizeUnit === 3) return 1;
  if (weight <= 10 && sizeUnit === 4) return 1;
  if (weight > 10 && weight < 25 && sizeUnit === 5) return 1;

  if (weight <= 1 && sizeUnit === 1) return 2;
  if (weight <= 3 && sizeUnit === 2) return 2;
  if (weight <= 8 && sizeUnit === 3) return 2;
  if (weight <= 25 && sizeUnit === 4) return 2;
  if (weight > 25 && sizeUnit === 5) return 2;

  if (weight > 1 && sizeUnit === 1) return 3;
  if (weight > 3 && sizeUnit === 2) return 3;
  if (weight > 8 && sizeUnit === 3) return 3;
  if (weight > 25 && sizeUnit === 4) return 3;
  if (weight > 25 && sizeUnit === 5) return 3;
}

export function getDigiKalaShipping(length, width, height, weight) {
  const sizeUnit = getSize(parseInt(length), parseInt(width), parseInt(height));
  const weightUnit = getWeight(weight, sizeUnit);

  if (sizeUnit === 1 && weightUnit === 1) return 900 + 800;
  if (sizeUnit === 1 && weightUnit === 2) return 1200 + 1400;
  if (sizeUnit === 1 && weightUnit === 3) return 1500 + 1900;

  if (sizeUnit === 2 && weightUnit === 1) return 1500 + 1900;
  if (sizeUnit === 2 && weightUnit === 2) return 1800 + 2100;
  if (sizeUnit === 2 && weightUnit === 3) return 2100 + 2400;

  if (sizeUnit === 3 && weightUnit === 1) return 1900 + 2300;
  if (sizeUnit === 3 && weightUnit === 2) return 2700 + 2700;
  if (sizeUnit === 3 && weightUnit === 3) return 3900 + 3400;

  if (sizeUnit === 4 && weightUnit === 1) return 4900 + 4900;
  if (sizeUnit === 4 && weightUnit === 2) return 9000 + 7900;
  if (sizeUnit === 4 && weightUnit === 3) return 21000 + 9900;

  if (sizeUnit === 5 && weightUnit === 1) return 11000 + 7900;
  if (sizeUnit === 5 && weightUnit === 2) return 19000 + 10900;
  if (sizeUnit === 5 && weightUnit === 3) return 39000 + 15900;
}
