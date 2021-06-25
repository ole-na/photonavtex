/**
 * Calculate distance between warning position and current location with Haversine formula
 *
 * Quelle: https://www.geodatasource.com/developers/javascript
 * The sample code is licensed under LGPLv3.
 *
 * This routine calculates the distance between two points
 * (given the latitude/longitude of those points)
 * using GeoDataSource (TM) prodducts.
 *
 * Definitions:
 *      South latitudes are negative, east longitudes are positive
 *
 * Passed to function:
 *      lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)
 *      lat2, lon2 = Latitude and Longitude of
 *      where:  'M' is statute miles (default)
 *              'K' is kilometers
 *              'N' is nautical miles
 *
 * @param {number} lat1: warning's latitude
 * @param {number} lon1: warning's longitude
 * @param {number} lat2: current position's latitude
 * @param {number} lon2: current position's longitude
 * @returns {number} spherical distance (shortest distance between two points) in nautical miles
 */
export default function calculateDistance(lat1, lon1, lat2, lon2) {
    const unit = "N";
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        const radLat1 = Math.PI * lat1/180;
        const radLat2 = Math.PI * lat2/180;
        const theta = lon1-lon2;
        const radTheta = Math.PI * theta/180;
        let dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") { dist = dist * 1.609344 }
        if (unit === "N") { dist = dist * 0.8684 }
        return dist;
    }
}
