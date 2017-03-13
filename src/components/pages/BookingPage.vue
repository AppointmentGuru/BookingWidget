<!--
todo:

Slotpicker:
* exclude closed parts of day
-->
<template>
  <div >
    <div >
    {{selectedDate}}<br/>
    <pre>{{appointment}}</pre>
    <pre>{{slotOptions}}</pre>
    </div>
    <el-steps
      style='width:350px;margin-left:auto;margin-right:auto;'
      :active="currentStep"
      process-status='process'
      finish-status='success'
      :align-center='true'
      :space='150' >
      <el-step @click.native='goto(0)' title="Type" ></el-step>
      <el-step @click.native='goto(1)' title="Date" ></el-step>
      <el-step @click.native='goto(2)' title="Contacts" ></el-step>
    </el-steps>
    <el-carousel
      height="500px"
      ref="carousel"
      :autoplay='false'
      trigger='none'
      arrow='never'
      indicator-position='none' >

      <el-carousel-item >
        <choose-appointment-type
          @bookingwidget:productselected='appointmentTypeSelected' >
        </choose-appointment-type>
      </el-carousel-item>
      <el-carousel-item >
        <date-picker v-model='selectedDate' >
        </date-picker>
        <div style='padding: 10px; 5px; text-align:center;'>
          {{naturalday(selectedDate)}}
        </div>
        <slot-picker
          v-if='selectedProduct'
          :operation-hours='slotOptions.operationHours'
          :slot-duration='slotOptions.duration'
          :day='slotOptions.day'
          :appointments='selectedDayAppointments'
          @slotpicker:slotselected='slotSelected' >
        </slot-picker>
      </el-carousel-item>
      <el-carousel-item >
        <contact-details-form v-model='contactDetails' >
        </contact-details-form>
      </el-carousel-item>
    </el-carousel>
    <toolbar
      @toolbar:click='createAppointment'
      text='Create Appointment'></toolbar>
  </div>
</template>

<script>
import ChooseAppointmentType from '../ChooseAppointmentType'
import DatePicker from 'gurucomponents/src/components/client/appointment/DatePicker'
import SlotPicker from 'gurucomponents/src/components/client/appointment/SlotPicker'
// import ContactDetailsForm from '../ContactDetailsForm'
import ContactDetailsForm from 'gurucomponents/src/components/ui/forms/ContactDetailsForm'
import Toolbar from '../Toolbar'
import moment from 'moment'

import Mixins from 'gurucomponents/src/mixins/Mixins'

export default {
  name: 'BookingPage',
  mixins: [Mixins],
  components: {
    SlotPicker, ChooseAppointmentType, DatePicker, ContactDetailsForm, Toolbar
  },
  data () {
    return {
      currentStep: 0,
      selectedDate: moment().format('YYYY-MM-DD'),
      selectedProduct: {},
      selectedService: {},
      selectedSlot: {},
      contactDetails: {
        fullName: null,
        email: null,
        phone: null,
        countryCode: null,
        formattedNumber: null,
        country: {}
      }
    }
  },
  watch: {
    currentStep () {
      this.$refs.carousel.setActiveItem(this.currentStep)
    }
  },
  computed: {
    appointment () {
      return {
        start_time: this.selectedSlot.startTime,
        end_time: this.selectedSlot.endTime,
        product: this.selectedProduct.id || false,
        full_name: this.contactDetails.fullName,
        contact_phone: this.contactDetails.formattedNumber,
        contact_email: this.contactDetails.email,
        practitioner: window.practitioner,
        source: 'booking-widget'
      }
    },
    selectedDayAppointments () {
      if (this.selectedDate) {
        let selectedDate = this.selectedDate
        let appointments = this.$gurustore.state.appointments.appointments
        let result = appointments.filter((app) => {
          return moment(app.start_time).format('YYYY-MM-DD') === selectedDate
        })
        return result
      }
      return []
    },
    slotOptions () {
      let dt = moment(this.selectedDate).format('ddd')
      if (dt.toLowerCase() === 'tue') { dt = 'tues' }
      if (dt.toLowerCase() === 'thu') { dt = 'thurs' }
      let operationHours = '08:00-17:00'
      if (this.selectedService.hours) {
        operationHours = this.selectedService.hours[dt.toLowerCase()]
      }
      console.log(operationHours)
      return {
        operationHours: operationHours,
        duration: parseInt(this.selectedProduct.duration) || 60,
        day: this.selectedDate
      }
    }
  },
  methods: {
    next () {
      this.currentStep++
    },
    goto (step) {
      this.currentStep = step
    },
    appointmentTypeSelected (payload) {
      this.selectedService = payload.service
      this.selectedProduct = payload.product
      this.next()
    },
    slotSelected (slot) {
      this.selectedSlot = slot
      this.next()
    },
    createAppointment () {
      this.$gurustore.dispatch(
        'CREATE_APPOINTMENT_ACTION',
        this.appointment)
          .then((response) => {
            console.log(response.data)
            window.alert('Appointment created!!!11!!!11')
          })
    }
  }
}
</script>
<style >
.el-steps { margin-top:30px; }
.el-step { width: 32%; }
.el-carousel {
  overflow-y: scroll;
}
.el-carousel__item.is-active {
  overflow: scroll;
}
.el-card__header {
  font-weight: bold;
}
</style>
