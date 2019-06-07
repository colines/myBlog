<template>
  <div id="app">
    <router-view></router-view>
    <go-top></go-top>
  </div>
</template>

<script>
  import GoTop from './pages/common/components/GoTop'
  export default {
    name: 'App',
    components: {
      GoTop
    }
  }

</script>

<style>
  .ant-avatar {
    width: 35px;
    height: 35px;
  }

  .ant-comment-inner {
    padding: 8px 0;
  }

  .review .ant-modal-content {
    width: 70%;
    margin-left: 15%;
  }
  .comment .ant-comment-content-detail{
    line-height: 1.5;
  }

</style>
