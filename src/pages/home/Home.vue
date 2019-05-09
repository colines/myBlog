<template>
  <div class="container">
    <Header></Header>
  </div>
</template>

<script>
  import Header from '@/pages/header/Header'
  export default {
    components: {
      Header,
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
