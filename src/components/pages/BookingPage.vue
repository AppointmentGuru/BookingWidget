<!--
todo:

Slotpicker:
* exclude closed parts of day
-->
<template>
  <div >

    <!--<div >
    {{selectedDate}}<br/>
    <pre>{{appointment}}</pre>
    <pre>{{slotOptions}}</pre>
    </div>
    -->
    <el-steps
      v-show='showSteps'
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
      indicator-position='none'
      v-loading="loading"
      element-loading-text="Creating appointment..." >

      <el-carousel-item >
        <choose-appointment-type
          id='appointment-type'
          @bookingwidget:productselected='appointmentTypeSelected' >
        </choose-appointment-type>
      </el-carousel-item>
      <el-carousel-item >
        <br/>
        <date-picker
          @datepicker:rangechanged='updateActiveDateRange'
          v-model='selectedDate' >
        </date-picker>
        <div style='padding: 10px; 5px; text-align:center;font-weight:bold;'>
          {{naturalday(selectedDate)}}
        </div>
        <el-row
          v-loading="loadingAppointments"
          element-loading-text="checking availability..." >
          <slot-picker
            v-if='selectedProduct'
            :operation-hours='slotOptions.operationHours'
            :slot-duration='slotOptions.duration'
            :day='slotOptions.day'
            :appointments='selectedDayAppointments'
            @slotpicker:slotselected='slotSelected' >
          </slot-picker>
        </el-row>
      </el-carousel-item>

      <el-carousel-item >
        <contact-details-form v-model='contactDetails' >
        </contact-details-form>
      </el-carousel-item>

      <el-carousel-item >
        <confirmation-page ></confirmation-page>
      </el-carousel-item>

    </el-carousel>
    <toolbar
      :disabled='!appointmentIsValid'
      @toolbar:click='toolbarClicked'
      :text='toolbarBtnText'></toolbar>
  </div>
</template>

<script>
import ChooseAppointmentType from '../ChooseAppointmentType'
import DatePicker from 'gurucomponents/src/components/client/appointment/DatePicker'
import SlotPicker from 'gurucomponents/src/components/client/appointment/SlotPicker'
// import ContactDetailsForm from '../ContactDetailsForm'
import ContactDetailsForm from 'gurucomponents/src/components/ui/forms/ContactDetailsForm'
import ConfirmationPage from '../ConfirmationPage'
import Toolbar from '../Toolbar'
import moment from 'moment'

import Mixins from 'gurucomponents/src/mixins/Mixins'

export default {
  name: 'BookingPage',
  mixins: [Mixins],
  components: {
    SlotPicker,
    ChooseAppointmentType,
    DatePicker,
    ContactDetailsForm,
    Toolbar,
    ConfirmationPage
  },
  data () {
    return {
      showSteps: true,
      currentStep: 0,
      loading: false,
      loadingAppointments: false,
      appointmentComplete: false,
      selectedDate: moment().add(1, 'day').format('YYYY-MM-DD'),
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
  mounted () {
    this.$gurustore.dispatch(
      'FETCH_PRACTITIONER_ACTION',
      window.practitioner
    ).then(() => {
      this.$gurustore.dispatch('FETCH_APPOINTMENTS_ACTION')
    })
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
    appointmentIsValid () {
      return (this.appointment.start_time &&
        this.appointment.end_time &&
        this.appointment.product &&
        this.appointment.full_name &&
        this.appointment.contact_phone &&
        this.appointment.contact_email &&
        this.appointment.practitioner &&
        this.appointment.source)
    },
    toolbarBtnText () {
      if (this.appointmentComplete) {
        return 'Download the app'
      } else {
        return 'Create appointment'
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
      if (this.currentStep >= step) {
        this.currentStep = step
      }
    },
    updateActiveDateRange (daterange) {
      let vm = this
      vm.loadingAppointments = true
      this.selectedDate = daterange.toDate
      this.$gurustore.dispatch('SET_DATE_RANGE_ACTION', daterange)
        .then(() => {
          vm.loadingAppointments = false
        })
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
    toolbarClicked () {
      if (this.appointmentComplete) {
        window.location = 'http://www.getapp.guru/'
      } else {
        this.createAppointment()
      }
    },
    createAppointment () {
      this.loading = true
      this.showSteps = false
      this.$gurustore.dispatch(
        'CREATE_APPOINTMENT_ACTION',
        this.appointment)
          .then((response) => {
            this.appointmentComplete = true
            this.next()
            this.loading = false
          })
          .catch((response) => {
            window.alert('There was an error submitting your appointment. Please try again')

            this.showSteps = true
            this.loading = false
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
.el-input-group__prepend .el-input__inner {
  min-width: 60px;
  background: transparent !important;
  border: 0px;
  height: 34px;
}
</style>
