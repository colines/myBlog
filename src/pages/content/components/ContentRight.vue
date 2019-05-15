<template>
  <div class="content-right">
    <about-author></about-author>
    <comments-new></comments-new>
    <links></links>
  </div>
  </div>
</template>

<script>
  import AboutAuthor from './components/AboutAuthor'
  import CommentsNew from './components/CommentsNew'
  import Links from './components/Links'
  export default {
    components: {
      AboutAuthor,
      CommentsNew,
      Links
    }

  }

</script>

<style scoped>
  .content-right {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
  }

  .author {
    width: 240px;
    height: 100px;
  }

  @media screen and (max-width:980px) {
    .content-right{
      display:none;
    }
  }

</style>
