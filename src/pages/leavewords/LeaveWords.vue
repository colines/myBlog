<template>
  <div class="container">
    <Header></Header>
    <Message></Message>
    <ContentRight></ContentRight>

  </div>
</template>

<script>
  import Header from '@/pages/header/Header'
  import Message from '@/pages/leavewords/components/Message'
  import ContentRight from '@/pages/common/ContentRight'
  export default {
    components: {
      Header,
      Message,
      ContentRight,
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
