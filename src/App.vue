<template>
  <div id="appointmentguru-booking-widget">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'appointmentguru-booking-widget',
  computed: {
    practitioner () { return window.practitioner },
    store () { return this.$gurustore.state }
  },
  mounted () {
    this.$gurustore.dispatch(
      'FETCH_PRACTITIONER_ACTION',
      this.practitioner
    )
    this.$gurustore.dispatch('FETCH_APPOINTMENTS_ACTION')
  },
  methods: {
    incr () {
      this.$gurustore.commit('increment')
    }
  }
}
</script>

<style>
#appointmentguru-booking-widget {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: transparent;
  color: #2c3e50;
  margin-top: 60px;
  width: 375px;
  height: 100%;
  margin-left: auto; margin-right: auto;
  border: solid 1px;
  padding: 0px;
}
</style>
