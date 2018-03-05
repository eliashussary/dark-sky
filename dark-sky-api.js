'use strict'
const req = require('request')
const moment = require('moment')
const queryString = require('query-string')

const truthyOrZero = value => !!value || parseFloat(value) === 0

class DarkSky {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.long = null
    this.lat = null
    this.t = null
    this.query = {}
    this.timeout = 20000
  }

  longitude(long) {
    !truthyOrZero(long) ? null : (this.long = long)
    return this
  }

  latitude(lat) {
    !truthyOrZero(lat) ? null : (this.lat = lat)
    return this
  }

  coordinates({ lat, lng }) {
    this.lat = parseFloat(lat)
    this.long = parseFloat(lng)
    return this
  }

  time(time) {
    !truthyOrZero(time)
      ? (this.t = null)
      : (this.t = moment(new Date(time)).format('YYYY-MM-DDTHH:mm:ss'))
    return this
  }

  units(unit) {
    !unit ? null : (this.query.units = unit)
    return this
  }

  language(lang) {
    !lang ? null : (this.query.lang = lang)
    return this
  }

  exclude(blocks) {
    blocks = Array.isArray(blocks) ? blocks.join(',') : blocks
    !blocks ? null : (this.query.exclude = blocks)
    return this
  }

  extendHourly(param) {
    !param ? null : (this.query.extend = 'hourly')
    return this
  }
  
  timeout(milliseconds) {
    !milliseconds ? null : (this.timeout = milliseconds)
    return this
  }

  options(options) {
    // get methods of "this" to invoke later
    let methods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this)
    ).filter(
      method =>
        method !== 'constructor' &&
        method !== 'get' &&
        method !== 'options' &&
        method.indexOf('_') === -1
    )
    // get keys of options object passed
    return Object.keys(options).reduce((acc, val) => {
      // ignore methods that do not exist
      if (methods.indexOf(val) > -1) {
        //  invoke setter methods with values of option
        return this[val](options[val])
      }
    }, this)
  }

  _generateReqUrl() {
    this.url = `https://api.darksky.net/forecast/${this.apiKey}/${this
      .lat},${this.long}`
    this.t ? (this.url += `,${this.t}`) : this.url
    this.query
      ? (this.url += `?${queryString.stringify(this.query)}`)
      : this.url
  }

  get() {
    return new Promise((resolve, reject) => {
      if (!truthyOrZero(this.lat) || !truthyOrZero(this.long))
        reject('Request not sent. ERROR: Longitute or Latitude is missing.')
      this._generateReqUrl()

      req({ url: this.url, json: true, timeout: this.timeout }, (err, res, body) => {
        if (err) {
          reject(`Forecast cannot be retrieved. ERROR: ${err}`)
          return
        }
        res.statusCode !== 200
          ? reject(
              `Forecast cannot be retrieved. Response: ${res.statusCode} ${res.statusMessage}`
            )
          : null
        resolve(body)
      })
    })
  }
}

module.exports = DarkSky
