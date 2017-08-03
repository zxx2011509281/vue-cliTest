<template>
  <div class="aaa">
      {{abc}}
     <router-link :to="{path:'/bbb'}">跳转首页</router-link>   
  </div>
</template>

<script>
export default {
  data () {
    return {
      abc: 'hello world'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
