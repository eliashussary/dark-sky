# forecast-io
A dead simple forecast.io API wrapper for Nodejs using method chaining and promises.

```Javascript
'use strict';
const ForecastIO = require('forecast-io');

const forecast = new ForecastIO('<<Your API Key>>')

forecast
    .latitude('37.8267')
    .longitude('-122.423')
    .time('1991-06-02')
    .get()
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
```