<template>
<div class='confirmation'>
  <el-progress type="circle" :percentage="100" status="success"></el-progress>
  <h3>Appointment created</h3>
  <p>Your appointment is set up and has been added to {{practitioner.first_name}}'s diary. You're all set!</p>
  <p>
    <a href='http://www.getapp.guru/' >Download</a> the AppointmentGuru mobile app to keep track of this appointment and book further appointments from the comfort of your mobile phone
  </p>

  <el-tabs value='first' >
    <el-tab-pane label="What's next" name="first">
      <ul>
        <li>We've sent you an appointment confirmation with the details you need.</li>
        <li>We'll also send you a reminder before your appointment.</li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="Further actions" name="second">
      <div style='text-align: justify'>
        <tile>
          <span slot='tile-inner' >
            Add a note for the practitioner
          </span>
        </tile>
        <tile>
          <span slot='tile-inner' >
            <a href='http://www.getapp.guru' target='_blank' >
              Download the mobile app</a>
          </span>
        </tile>
      </div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<style scoped >
.confirmation {
  text-align: center;
  padding: 10px;
  padding-top: 30px;
}
ul { text-align: left; }
</style>
<script type="text/javascript">
import Tile from 'gurucomponents/src/components/ui/Tile'

export default {
  components: { Tile },
  data () {
    return {
      activeTab: 'first'
    }
  },
  computed: {
    practitioner () {
      return this.$gurustore.state.practitioner.practitioner
    }
  }
}
</script>
