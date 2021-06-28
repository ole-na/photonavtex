/**
 * Convert speed in metres per second [m/s] to knots(nautical miles per hour) [kn]
 *
 * @returns {number}
 * @throws {InvalidArgumentException}
 */
export default function convertMetersPerSecondToKnots(speed) {
    try {
        let knotsResult = null;
        switch (speed) {
            case "":
                throw "Speed is empty";
                break;
            case (null || undefined || NaN):
                throw "Speed is null if the implementation is not able to measure it";
                break;
            case (isNaN(speed) || typeof speed !== "number"):
                throw "Speed is not a number";
                break;
            default:
                const approximately = 1.9438;
                let knotsResult = speed * approximately;
                break;
        }
        return knotsResult;
    } catch(err) {
        console.error("Error: param for speed value is not available or correct");
    }
}
