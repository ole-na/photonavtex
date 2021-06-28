import '@testing-library/jest-dom';
import {render} from '@testing-library/react'
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
  expect(kn1.typeof).toBe('number');
  expect(kn1).toBe(0);

  expect(kn2.typeof).toBe('number');
  expect(kn2).toBe(mps2 * approximately);

  expect(kn3.typeof).toBe('number');
  expect(kn3).toBe(mps3 * approximately);
});

test('convert from [m/s] to knots(nautical miles per hour): should return error message if no speed as parameter is provided', () => {
  // WHEN
  const result = convertMetersPerSecondToKnots();

  // THEN
  expect(result).toThrow("Speed is empty");
});

test('convert from [m/s] to knots(nautical miles per hour): should return error message if speed is not a number', () => {
  // GIVEN
  const expectedError1 = "Speed is not a number";
  const expectedError2 = "Speed is null if the implementation is not able to measure it";
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
  expect(result1).toThrow(expectedError1);
  expect(result2).toThrow(expectedError1);
  expect(result3).toThrow(expectedError2);
  expect(result4).toThrow(expectedError2);
});
