# forecast-io


### About
A dead simple forecast.io API wrapper for Nodejs using method chaining and promises.

### Install forecast-io

```Javascript
npm install forecast-io --save
```

### API Documentation
[Please refer to the forecast.io developer website.](https://developer.forecast.io/docs/v2)

### Script Example
```Javascript
'use strict';
const ForecastIO = require('forecast-io')
const forecast = new ForecastIO('<< Your API Key >>')

forecast
    .latitude('37.8267')            \\ required: latitude, string.
    .longitude('-122.423')          \\ required: longitude, string.
    .time('2016-01-28')             \\ optional: date, string 'YYYY-MM-DD'.
    .units('ca')                    \\ optional: units, string, refer to API documentation.
    .language('en')                 \\ optional: language, string, refer to API documentation.
    .exclude('minutely,daily')      \\ optional: exclude, string, refer to API documentation.
    .extendHourly(true)             \\ optional: extend, boolean, refer to API documentation.
    .get()                          \\ execute your get request.
    .then(res => {                  \\ handle your success response.
        console.log(res)
    })
    .catch(err => {                 \\ handle your error response.
        console.log(err)
    })
```

####License
MIT License
Copyright (c) 2016 Elias Hussary

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.