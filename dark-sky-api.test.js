const DarkSky = require("./dark-sky-api")
let forecast

test("return instance of darksky class", async () => {
  const darksky = new DarkSky(process.env.DARK_SKY)
  expect(darksky).toBeInstanceOf(DarkSky)
})

test("return the forecast for Toronto on 1991-06-02 using options method", async () => {
  const darksky = new DarkSky(process.env.DARK_SKY)
  const result = await darksky
    .options({
      longitude: -79.411079,
      latitude: 43.761539,
      time: "1991-06-02",
      units: "ca",
      language: "en",
      exclude: ["minutely", "daily"],
      extendHourly: true
    })
    .get()
  expect(result.latitude).toBe(43.761539)
  expect(result.longitude).toBe(-79.411079)
  expect(result.minutely).toBeFalsy()
  expect(result.daily).toBeFalsy()
  expect(result.hourly).toBeTruthy()
  expect(result.currently.time).toBe(675817200)
  expect(result.timezone).toBe("America/Toronto")
})

test("return the current forecast for Toronto using coordinates method and method chaining", async () => {
  const darksky = new DarkSky(process.env.DARK_SKY)
  const result = await darksky
    .coordinates({
      lat: 43.761539,
      lng: -79.411079
    })
    .get()
  expect(result.latitude).toBe(43.761539)
  expect(result.longitude).toBe(-79.411079)
})

test("return the current forecast for Toronto using compression", async () => {
  const darksky = new DarkSky(process.env.DARK_SKY)
  const result = await darksky
    .coordinates({
      lat: 43.761539,
      lng: -79.411079
    })
    .compression(true)
    .get()
  expect(result.latitude).toBe(43.761539)
  expect(result.longitude).toBe(-79.411079)
})
