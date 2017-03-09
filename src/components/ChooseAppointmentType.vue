<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">What type of appointment?</span>
    </div>
    <div v-for='service in services' >
      <h5>{{service.address.name}}</h5>
      <div
        v-for='product in service.products'
        @click='productSelected(service, product)' class='item' >
        <i class='el-icon-arrow-right pull-right' ></i>
        {{product.title}}
      </div>
    </div>
  </el-card>
</div>
</template>
<script type="text/javascript">
export default {
  name: 'ChooseAppointmentType',
  computed: {
    services () {
      try {
        return this.$gurustore.state.practitioner.practitioner.profile.services
      } catch (err) {
        return []
      }
    }
  },
  methods: {
    productSelected (service, product) {
      let data = {
        service: service,
        product: product
      }
      this.$emit('bookingwidget:productselected', data)
    }
  }
}
</script>
<style scoped>
.item {
  padding: 20px 0px;
  line-height: 16px;
  cursor: pointer;
}
.pull-right {
  float:right;
}
</style>
