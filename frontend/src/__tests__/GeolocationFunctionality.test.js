import '@testing-library/jest-dom';
import convertMetersPerSecondToKnots from "../services/convertMetersPerSecondToKnots";

test('should convert [m/s] to to knots(nautical miles per hour) [kn] if speed is provided ', () => {
  // GIVEN
  const mps1 = 0;
  const mps2 = 1;
  const mps3 = 3.999;
  const approximately = 1.9438;

  // WHEN
  const kn1 = convertMetersPerSecondToKnots(mps1);
  const kn2 = convertMetersPerSecondToKnots(mps2);
  const kn3 = convertMetersPerSecondToKnots(mps3);

  // THEN
  expect(typeof kn1).toBe('number');
  expect(kn1).toBe(0);

  expect(typeof kn2).toBe('number');
  expect(kn2).toBe(mps2 * approximately);

  expect(typeof kn3).toBe('number');
  expect(kn3).toBe(mps3 * approximately);
});

test('convert from [m/s] to knots(nautical miles per hour): should return null if no speed as parameter is provided', () => {
  // WHEN
  const result = convertMetersPerSecondToKnots();

  // THEN
  expect(result).toBe(null);
});

test('convert from [m/s] to knots(nautical miles per hour): should return null if speed is not a number', () => {
  // GIVEN
  const param1 = "aaa";
  const param2 = NaN;
  const param3 = null;
  const param4 = undefined;

  // WHEN
  const result1 = convertMetersPerSecondToKnots(param1);
  const result2 = convertMetersPerSecondToKnots(param2);
  const result3 = convertMetersPerSecondToKnots(param3);
  const result4 = convertMetersPerSecondToKnots(param4);

  // THEN
  expect(result1).toBe(null);
  expect(result2).toBe(null);
  expect(result3).toBe(null);
  expect(result4).toBe(null);
});
