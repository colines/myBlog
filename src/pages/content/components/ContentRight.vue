<template>
  <div class="content-right">
    <about-author></about-author>
    <leave-words></leave-words>
    <links></links>
  </div>
  </div>
</template>

<script>
  import AboutAuthor from './components/AboutAuthor'
  import LeaveWords from './components/LeaveWords'
  import Links from './components/Links'
  export default {
    components: {
      AboutAuthor,
      LeaveWords,
      Links
    }

  }

</script>

<style scoped>
  .content-right {
    position: absolute;
    top: 0;
    right: 0;
  }

  .author {
    width: 240px;
    height: 100px;
  }

</style>
