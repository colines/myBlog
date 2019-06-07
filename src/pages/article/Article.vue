<template>
  <div class="container">
    <div class="article-box">
      <div class="article-area">
        <article-content :article="article"></article-content>
        <post-comments v-on:getComments="getComments"></post-comments>
        <comments-list :commentsList="commentsList" v-on:getComments="getComments"></comments-list>
      </div>
    </div>
  </div>
</template>

<script>
  import ArticleContent from './components/ArticleContent'
  import PostComments from './components/PostComments'
  import CommentsList from './components/CommentsList'
  export default {
    components: {
      ArticleContent,
      PostComments,
      CommentsList
    },
    created() {
      this.getArticleById();
      this.getComments();
    },
    data(){
      return{
        articltContent: '',
        articleId: '',
        article: {},
        commentsList: [],
      }
    },
    methods: {
      getArticleById() {
        this.articleId = this.$route.query.aid;
        this.$store.commit('setArticleId',this.articleId);
        this.axios('/user/article/' + this.articleId + '?ip=' + this.$ip).then(res => {
          let data = res.data;
          if (data.code == 0) {
            this.article = data.data;
          }
        })
      },
      getComments() {
        this.axios.get('/user/review?articleId=' + this.articleId + '&sort=1').then(res => {
          if (res.data.code == 0) {
            this.commentsList = res.data.data;
          }
        })
      },
    },
  }

</script>

<style scoped>
 .article-box {
    z-index: 1;
    margin-top: 4rem;
    display: flex;
    max-width: 960px;
  }
  .article-area {
    display: block;
    background: #fff;
    width: 700px;
    max-width: 100%;
    border-radius: 2px;
    margin-bottom: 2rem;
    padding: 0 2rem;
    box-shadow: 0px 2px 5px rgb(199, 198, 198);
    box-sizing: border-box;
  }
  @media screen and (max-width:980px) {
    .article-box{
      margin:.5rem;
    }
    .article-area {
      width: 100%;
    }
  }
</style>
