<template>
  <div class="content-right">
    <article-new :list="articleNewList" v-if="articleNewList"></article-new>
    <article-hot :list="articleHotList" v-if="articleHotList"></article-hot>
  </div>
</template>

<script>
  import ArticleList from './components/ArticleList'
  export default {
    components: {
      'ArticleNew': ArticleList,
      'ArticleHot': ArticleList,
    },
    created() {
      this.articleNewList = {
        'articleType': '最新文章',
        list: [{
            id: 1,
            title: ' 基于 HTML5 WebGL 智能城市的模拟运行',
            agreeNum: 1024,
            commentsNum: 156,
            readNum: 2048
          },
          {
            id: 2,
            title: ' JavaScript原型链',
            agreeNum: 10,
            commentsNum: 25,
            readNum: 226
          },
          {
            id: 3,
            title: 'Vue源码解析',
            agreeNum: 66,
            commentsNum: 156,
            readNum: 456
          },
          {
            id: 4,
            title: ' webpack的大包原理',
            agreeNum: 55,
            commentsNum: 55,
            readNum: 55
          },
          {
            id: 5,
            title: ' css的层叠上下文',
            agreeNum: 66,
            commentsNum: 66,
            readNum: 66
          }
        ]
      }

    },
    data() {
      return {
        articleNewList: null,
        articleHotList: null,
      }
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

  @media screen and (max-width:980px) {
    .content-right {
      display: none;
    }
  }

</style>
