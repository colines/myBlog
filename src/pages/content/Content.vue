<template>
  <div class="content">
    <content-nav></content-nav>
    <content-right></content-right>
  </div>
</template>

<script>
  import ContentNav from './components/ContentNav'
  import ContentRight from './components/ContentRight'
  export default {
    components: {
      'content-nav':ContentNav,
      'content-right':ContentRight
    }

  }

</script>

<style scoped>
    .content{
        z-index: 1;
        margin-top: 11rem;
        display: flex;
        max-width: 960px;
    }

</style>
