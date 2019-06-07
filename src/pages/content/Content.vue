<template>
  <div class="content" :class=" this.$store.state.categoryType ? item :''">
    <content-nav></content-nav>
    <content-right></content-right>
  </div>
</template>

<script>
  import ContentNav from './components/ContentNav'
  import ContentRight from './components/ContentRight'
  export default {
    components: {
      'content-nav': ContentNav,
      'content-right': ContentRight
    },
    data(){
      return{
        item:'item',
      }
    }

  }

</script>

<style scoped>
  .content {
    z-index: 1;
    margin-top: 6rem;
    display: flex;
    max-width: 960px;
  }
  .item{
    margin-top: 11rem;
  }

</style>
