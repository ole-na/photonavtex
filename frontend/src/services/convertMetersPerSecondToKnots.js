/**
 * Convert speed in metres per second [m/s] to knots(nautical miles per hour) [kn]
 *
 * @returns {number}
 * @throws {InvalidArgumentException}
 */
export default function convertMetersPerSecondToKnots(speed) {
    console.log("hier");
    try {
        switch (speed) {
            case "":
                throw new Error("Speed is empty");
                break;
            case (null || undefined):
                throw new Error("Speed is null if the implementation is not able to measure it");
                break;
            case (isNaN(speed) || typeof speed !== "number"):
                throw new Error("Speed is not a number");
                break;
            default:
                break;
        }
    } catch(err) {
        console.error("Error: param for speed value is not available or correct");
    } finally {
        const approximately = 1.9438;
        const knotsResult = speed * approximately;
        return knotsResult;
    }
}
