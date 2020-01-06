const request = require('request');

const forecast = (lat, lng, callBack) => {
    const url = "https://api.darksky.net/forecast/b4aef012d46f96b9bd1c640f28417a02/" + encodeURIComponent(lat) + "," + encodeURIComponent(lng) + "?units=si";

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callBack("Unable to connect to Weather service.", undefined);
        } else if(body.error) {
            callBack("Unable to find location.", undefined);
        } else {
            callBack(undefined, "Timezone: " + body.timezone + ". " + body.daily.summary + "It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.");
        }
    })
}

module.exports = forecast;