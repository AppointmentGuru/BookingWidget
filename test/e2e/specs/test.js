// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Create Appointment': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#appointmentguru-booking-widget', 5000)
      .waitForElementVisible('.item', 2000)
      .click('.item')
      .pause(1000)
        // page 2: select date/time
        .click('.flatpickr-next-month')
        .pause(500)
        .click('.flatpickr-day')
      .end()
  }
}
