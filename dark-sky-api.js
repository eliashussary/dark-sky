const req = require("request")
const moment = require("moment")
const queryString = require("query-string")

class DarkSky {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.long = null
    this.lat = null
    this.timeVal = null
    this.query = {}
    this.timeoutVal = 20000
    this.gzip = false
  }

  static truthyOrZero(value) {
    return !!value || parseFloat(value) === 0
  }

  compression(val) {
    if (DarkSky.truthyOrZero(val)) {
      this.gzip = val
    }
    return this
  }

  longitude(long) {
    if (DarkSky.truthyOrZero(long)) {
      this.long = long
    }
    return this
  }

  latitude(lat) {
    if (DarkSky.truthyOrZero(lat)) {
      this.lat = lat
    }
    return this
  }

  coordinates({ lat, lng }) {
    this.lat = parseFloat(lat)
    this.long = parseFloat(lng)
    return this
  }

  time(time) {
    if (DarkSky.truthyOrZero(time)) {
      this.timeVal = moment(new Date(time)).format("YYYY-MM-DDTHH:mm:ss")
    } else {
      this.timeVal = null
    }
    return this
  }

  units(unit) {
    if (unit) {
      this.query.units = unit
    } else {
      this.query.units = null
    }
    return this
  }

  language(lang) {
    if (lang) {
      this.query.lang = lang
    } else {
      this.query.lang = null
    }
    return this
  }

  exclude(blocks) {
    blocks = Array.isArray(blocks) ? blocks.join(",") : blocks
    if (blocks) {
      this.query.exclude = blocks
    } else {
      this.query.exclude = null
    }
    return this
  }

  extendHourly(param) {
    if (param) {
      this.query.extend = "hourly"
    } else {
      this.query.extend = null
    }
    return this
  }

  timeout(milliseconds) {
    if (milliseconds) {
      this.timeoutVal = milliseconds
    } else {
      this.timeoutVal = null
    }
    return this
  }

  options(options) {
    // get methods of "this" to invoke later
    let methods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this)
    ).filter(
      method =>
        method !== "constructor" &&
        method !== "get" &&
        method !== "options" &&
        method !== "truthyOrZero" &&
        method.indexOf("_") === -1
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
    this.url = `https://api.darksky.net/forecast/${this.apiKey}/${this.lat},${
      this.long
    }`
    if (this.timeVal) {
      this.url += `,${this.timeVal}`
    }
    if (this.query) {
      this.url += `?${queryString.stringify(this.query)}`
    }
    return true
  }

  get() {
    return new Promise((resolve, reject) => {
      if (!DarkSky.truthyOrZero(this.lat) || !DarkSky.truthyOrZero(this.long)) {
        reject("Request not sent. ERROR: Longitute or Latitude is missing.")
      }

      this._generateReqUrl()

      req(
        { url: this.url, json: true, timeout: this.timeoutVal, gzip: this.gzip },
        (err, res, body) => {
          if (err) {
            reject(`Forecast cannot be retrieved. ERROR: ${err}`)
            return
          }

          if (res.statusCode !== 200) {
            reject(
              `Forecast cannot be retrieved. Response: ${res.statusCode} ${
                res.statusMessage
              }`
            )
            return
          }

          resolve(body)
        }
      )
    })
  }
}

module.exports = DarkSky
