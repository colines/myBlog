<template>
  <div class="container">
    <Header></Header>
    <Content></Content>
  </div>
</template>

<script>
  import Header from '@/pages/header/Header'
  import Content from '@/pages/content/Content'

  export default {
    components: {
      Header,
      Content,
    }

  }

</script>

<style scoped>
  .container {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 960px;
  }

</style>
