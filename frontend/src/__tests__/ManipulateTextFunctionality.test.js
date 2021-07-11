import '@testing-library/jest-dom';
import * as textHelping from "../components/upload/manipulateText";

test('should convert coordinates in Grad/Minutes/Seconds to Decimal Grad', () => {
  // GIVEN
  const stringValue1 = "51-55N";
  const stringValue2 = "003-40E";
  const stringValue3 = "003-40.55S";
  const stringValue4 = "45-34W";
  const stringValue5 = "009-43S";

  // WHEN
  const result1 = textHelping.splitCoordsStringToParts(stringValue1);
  const result2 = textHelping.splitCoordsStringToParts(stringValue2);
  const result3 = textHelping.splitCoordsStringToParts(stringValue3);
  const result4 = textHelping.splitCoordsStringToParts(stringValue4);
  const result5 = textHelping.splitCoordsStringToParts(stringValue5);

  // THEN
  expect(result1).toBe(51.916667); // 51.916666666666664
  expect(result2).toBe(3.666667); // 3.6666666666666665
  expect(result3).toBe(-3.681944); // -3.6819444444444445
  expect(result4).toBe(-45.566667); // -45.56666666666667
  expect(result5).toBe(-9.716667); // -9.716666666666667
});
