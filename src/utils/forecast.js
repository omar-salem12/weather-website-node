const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ce7be6eb07a970f4e829f9e7b4d876f4&query='
                 + latitude + ',' + longitude

    request({ url}, (error, response) => {
        let data;
        if(response) {
            data = JSON.parse(response.body);
        }

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (data.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {forecast:data.current.temperature + ' degress out.',address:data.location.region })
        }
    })
}

module.exports = forecast