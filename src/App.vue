<template>
  <div id="appointmentguru-booking-widget">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'appointmentguru-booking-widget'
}
</script>

<style>
#appointmentguru-booking-widget {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: transparent;
  color: #2c3e50;
  height: 100%
}
.tile {
  cursor: pointer;
}
</style>
