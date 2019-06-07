<template>
  <div class="side-bar">
    <article-new :list="articleNewList" v-if="articleNewList"></article-new>
    <article-hot :list="articleHotList" v-if="articleHotList"></article-hot>
    <article-comments :list="articleCommentsList" v-if="articleCommentsList"></article-comments>
  </div>
</template>

<script>
  import ArticleList from '@/pages/common/components/ArticleList'
  export default {
    components: {
      'ArticleNew': ArticleList,
      'ArticleHot': ArticleList,
      'ArticleComments': ArticleList,
    },
    created() {
      this.getArticleNewList();
      this.getArticleHotList();
      this.getArticleCommentsList();

    },
    data() {
      return {
        articleNewList: null,
        articleHotList: null,
        articleCommentsList:null,
      }
    },
    methods: {
      getArticleHotList() {
        this.articleHotList = JSON.parse(sessionStorage.getItem('hotList') || '[]')
        if (!this.articleHotList.list)
          this.axios.get('/author/articleDto?states=1&sort=1').then((res) => {
            console.log(res);
            if (res.data.code == 0) {
              this.articleHotList = {
                articleType: '热门文章',
                list: res.data.data.list
              };
              sessionStorage.setItem('hotList', JSON.stringify(this.articleHotList))
            }
          });
      },
      getArticleNewList() {
        this.articleNewList = JSON.parse(sessionStorage.getItem('newList') || '[]')
        if (!this.articleNewList.list) {
          this.axios.get('/author/articleDto?states=1&sort=2').then((res) => {
            if (res.data.code == 0) {
              this.articleNewList = {
                articleType: '最新文章',
                list: res.data.data.list
              };
              sessionStorage.setItem('newList', JSON.stringify(this.articleNewList));
            }
          });
        }
      },
      getArticleCommentsList() {
        this.articleCommentsList = JSON.parse(sessionStorage.getItem('commentsList') || '[]')
        if (!this.articleCommentsList.list) {
          this.axios.get('/author/articleDto?states=1&sort=3').then((res) => {
            console.log(res)
            if (res.data.code == 0) {
              this.articleCommentsList = {
                articleType: '评论最多',
                list: res.data.data.list
              };
              sessionStorage.setItem('commentsList', JSON.stringify(this.articleNewList));
            }
          });
        }
      },

    }
  }

</script>

<style scoped>
  @media screen and (max-width:980px) {
    .side-bar {
      display: none;
    }
  }

</style>
