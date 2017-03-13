<style scoped>
.toolbar {
  position: relative;
  bottom: 0px;left:0px;right:0px;
  width:100%;
  background: #ccc;
}
.btn-block {
  width: 100%;
  border-radius: 0px;
}
</style>
<template>
<div class='toolbar'>
  <el-button
    @click='$emit("toolbar:click")'
    :disabled='this.disabled'
    class='btn-block' type="primary" size="large">{{text}}</el-button>
</div>
</template>
<script type="text/javascript">
export default {
  name: 'Toolbar',
  props: {
    text: { type: String, required: true },
    disabled: { type: Boolean, default: false }
  }
}
</script>
