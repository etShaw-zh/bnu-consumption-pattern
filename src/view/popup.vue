<template>
  <div class="main_app">
    <h1>Hello {{msg}}</h1>
    <el-button type="primary" @click="close">关闭</el-button>
  </div>
</template>

<script>
export default {
  name: 'popupView',
  data () {
    return {
      msg: 'popup'
    }
  },
  methods: {
    close () {
      this.msg = 'click close button ~~~'
    }
  }
}

</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
