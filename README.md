# bookingwidget

> The booking widget for AppointmentGuru

## Installation

### As POJS

**Add the css**

```
<!-- booking widget -->
<link href=https://rawgit.com/AppointmentGuru/BookingWidget/master/dist/static/css/app.7f579fee2a793577918ffa358df24afb.css rel=stylesheet>
```

**Add the js**

```
<script >window.practitioner = '6'</script>
<script type=text/javascript src=https://rawgit.com/AppointmentGuru/BookingWidget/master/dist/static/js/manifest.b2717fd3ba438a6c8b03.js></script>
<script type=text/javascript src=https://rawgit.com/AppointmentGuru/BookingWidget/master/dist/static/js/vendor.f50244fbe055d7c9b9e2.js></script>
<script type=text/javascript src=https://rawgit.com/AppointmentGuru/BookingWidget/master/dist/static/js/app.9292de40a7c3a29710ff.js></script>
```

**Add the widget:**

<div id="appointmentguru-booking-widget" ></div>

### In a VueJS app:

...

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
