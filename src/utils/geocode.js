const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoib21hcjIwMjAwIiwiYSI6ImNrZDR0ZTcyNjBhZnIycW56Z2RjamI2OXMifQ.SUmLDIGwBgPOgR137jR0FA'
    

    request({ url}, (error, response) => {
        let  data;
        if(response) 
        {
            data  = JSON.parse(response.body);
        }
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (data.features.length==0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                
            })
        }
    })
}

module.exports = geocode