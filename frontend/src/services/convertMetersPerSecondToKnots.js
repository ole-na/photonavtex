/**
 * Convert speed in metres per second [m/s] to knots(nautical miles per hour) [kn]
 *
 * @returns {number}
 * @throws {InvalidArgumentException}
 */
export default function convertMetersPerSecondToKnots(speed) {
    if(speed ==="" || speed === null || speed === undefined || isNaN(speed) || typeof speed !== "number") {
        return null;
    }

    const approximately = 1.9438
    const knotsResult = speed * approximately
    return knotsResult
}
