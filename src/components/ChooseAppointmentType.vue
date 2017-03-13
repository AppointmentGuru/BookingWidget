<template>
<div class='box'>
    <div v-for='service in services' >
      <h5>{{service.address.name}}</h5>
      <div
        v-for='product in service.products'
        @click='productSelected(service, product)' class='item' >
        <i class='el-icon-arrow-right pull-right' ></i>
        {{product.title}}
      </div>
    </div>
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
.box{
  padding: 20px;
}
.item {
  padding: 20px 0px;
  line-height: 16px;
  cursor: pointer;
}
.pull-right {
  float:right;
}
.header {
  padding: 18px 0px;
  border-bottom: 1px solid #d1dbe5;
  box-sizing: border-box;
  font-weight: bold;
}
</style>
