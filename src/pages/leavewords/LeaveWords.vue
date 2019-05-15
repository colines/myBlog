<template>
  <div class="container">
    <Header></Header>
    <Message></Message>
  </div>
</template>

<script>
  import Header from '@/pages/header/Header'
  import Message from '@/pages/leavewords/components/Message'
  export default {
    components: {
      Header,
      Message,
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
