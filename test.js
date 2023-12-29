const { generateRandomNumber } = require('./index');

test('generates a random number in a given range', () => {
  const randomNumber = generateRandomNumber(1, 10);
  expect(randomNumber).toBeGreaterThanOrEqual(1);
  expect(randomNumber).toBeLessThanOrEqual(10);
});