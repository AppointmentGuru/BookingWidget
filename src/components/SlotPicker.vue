<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">Pick a date</span>
    </div>
    <div style='text-align:center;' >
      <Flatpickr
        v-model='selectedDate'
        :options="options" ></Flatpickr>
      <div style='clear:both;' ></div>
    </div>
  </el-card>
</div>
</template>
<script type="text/javascript">
import moment from 'moment'
export default {
  name: 'SlotPicker',
  data () {
    return {
      selectedDate: moment().format('YYYY-MM-DD'),
      options: {
        inline: true,
        altFormat: 'F j, Y'
      }
    }
  },
  watch: {
    selectedDate (date) {
      this.$emit('bookingwidget:dateselected', date)
    }
  }
}
</script>
<style >
.flatpickr-calendar.inline {
    display: block;
    position: relative;
    margin-left: auto;
    margin-right: auto;
}
</style>
