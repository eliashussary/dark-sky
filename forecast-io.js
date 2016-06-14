'use strict';
const req = require('request');
const moment = require('moment');

class ForecastIO {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.long = null;
        this.lat = null;
        this.t = null;
    }

    longitude(long) {
        !long ? Error('long value not provided.') : long;
        this.long = long;
        return this;
    }

    latitude(lat) {
        !lat ? Error('lat value not provided.') : lat;
        this.lat = lat;
        return this;
    }

    time(time) {
        !time ? '' : time;
        this.t = moment(time).format('YYYY-MM-DDThh:mm:ss');
        return this;
    }

    generateReqUrl() {
        this.url = `https://api.forecast.io/forecast/${this.apiKey}/${this.lat},${this.long}`;
        this.t ? this.url += `,${this.t}` : this.url;
    }

    get() {
         return new Promise((resolve, reject) => {
            this.generateReqUrl();
            req(this.url, (err, res, body) => {
                err ? reject(err): null;
                resolve(body)
            })
        })
    }
}

module.exports = ForecastIO