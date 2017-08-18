# Dark Sky


### About
A dead simple Dark Sky API wrapper for Nodejs using method chaining and promises.

### Install Dark Sky

```Javascript
npm install dark-sky --save
```

### API Documentation
[Please refer to the Dark Sky developer website.](https://darksky.net/dev/docs)

### Usage Examples
```Javascript
const DarkSky = require('dark-sky')
const darksky = new DarkSky(process.env.DARK_SKY) // Your API KEY can be hardcoded, but I recommend setting it as an env variable.


// Example 1 - Method chaining, as promise.
darksky
    .latitude('37.8267')            \\ required: latitude, string || float.
    .longitude(-122.423)            \\ required: longitude, string || float.
    .time('2016-01-28')             \\ optional: date, string 'YYYY-MM-DD'.
    .units('ca')                    \\ optional: units, string, refer to API documentation.
    .language('en')                 \\ optional: language, string, refer to API documentation.
    .exclude('minutely,daily')      \\ optional: exclude, string || array, refer to API documentation.
    .extendHourly(true)             \\ optional: extend, boolean, refer to API documentation.
    .get()                          \\ execute your get request.
    .then(console.log)
    .catch(console.log)             \\ handle your error response.

// Example 2 - Setting coordinates shorthand, as promise.
darksky
    .coordinates({lat: 37.8267, lng: -122.423})
    .units('ca')
    .language('en')
    .exclude('minutely,daily')
    .get()
    .then(console.log)
    .catch(console.log)

// Example 3 - Setting options shorthand, as promise.
darksky
    .options({
        latitude: 37.8267,
        longitude: -122.423,
        time: '2017-08-10',
        language: 'en',
        exclude: ['minutely', 'daily'],
        extendHourly: true
    })
    .get()
    .then(console.log)

// Example 4 - Modern endpoint example, as async/await.

app.use('/a-week-ago', async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body
    const forecast = await darksky
      .options({
        latitude,
        longitude,
        time: moment().subtract(1, 'weeks')
      })
      .get()
    res.status(200).json(forecast)
  } catch (err) {
    next(err)
  }
})

```

### License
MIT License
Copyright (c) 2016 Elias Hussary

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.