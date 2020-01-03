const request = require('request');

const geocode = (address, callBack) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYW1hcnJybmF0aCIsImEiOiJjazRmcDF1Z2EwcW90M21xZHhzenJhZmY3In0.IPxmv_qq8DLYRlOIg6Y4iA&limit=1";

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callBack("Unable to connect to Weather service.", undefined);
        } else if(body.features.length === 0) {
            callBack("Unable to find location");
        } else {
            callBack(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;