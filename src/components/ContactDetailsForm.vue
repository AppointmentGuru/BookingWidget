<template>
<el-form
  ref="form"
  :model="formData"
  :rules='formRules'
  class='contact-details-form'
  label-position='top' >
  <el-form-item label="Your full name" prop="fullName" >
    <el-input v-model="formData.fullName"></el-input>
  </el-form-item>
  <el-form-item label="Your contact phone number" prop="phone" >
    <el-input v-model="formData.phone" type='tel' ></el-input>
  </el-form-item>
  <el-form-item label="Your e-mail address" prop="email" >
    <el-input v-model="formData.email" type='email' ></el-input>
  </el-form-item>
</el-form>
</template>
<script>
export default {
  name: 'ContactDetailsForm',
  props: {
    value: { type: Object, required: true }
  },
  data () {
    let fullNameValidator = (rule, value, callback) => {
      if (value.trim().split(' ').length <= 1) {
        callback(new Error('Please provide your full name (first name and surname'))
      } else {
        callback()
      }
    }
    return {
      formData: this.value,
      formRules: {
        fullName: [
          {
            required: true,
            message: 'Please provide your full name',
            trigger: 'change'
          },
          {
            validator: fullNameValidator,
            trigger: 'change',
            message: 'Please provide your full name (first name and surname)' }
        ],
        email: [
          { type: 'email', required: true, message: 'Please provide a valid e-mail address', trigger: 'change' }
        ],
        phone: [
          {
            required: true,
            message: 'Please provide a valid phone number',
            trigger: 'change'
          }
        ]
      }
    }
  }
}
</script>
<style >
.contact-details-form {
  padding:20px;
}
</style>
