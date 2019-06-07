<template>
  <div class="article">
    <div class="article-header">
      <span>{{articleType}}</span>
    </div>
    <div class="article-list">
      <ul>
        <li v-for="item in itemList" :key="item.articleId" @click="getArticle(item.articleId)">
          <div class="title" :title="item.articleTitle" v-text="item.articleTitle">
          </div>
          <div class="meta-box">
            <p><span class="iconfont">&#xe60c;</span><span v-text="item.thumbupCount" class="num-item"></span></p>
            <p><span class="iconfont">&#xe684;</span><span v-text="item.commentCount" class="num-item"></span></p>
            <p><span class="iconfont">&#xe605;</span><span v-text="item.visitCount" class="num-item"></span></p>
          </div>
          <div class="clear-fix"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['list'],
    mounted() {
      this.getData();
    },
    data() {
      return {
        articleType: '',
        itemList: [],
        commentsList: [],
      }
    },
    methods: {
      getArticle(articleId){
        let routeData = this.$router.resolve({
          path: "/article",
          query: {
            aid: articleId
          }
        });
        window.open(routeData.href, '_blank');
      },
      getCommentsList() {

      },
      getData() {
        if (this.list) {
          this.articleType = this.list.articleType;
          this.itemList = this.list.list;
        }
      }
    },
    watch: {
      list: function (newVal, oldVal) {
        this.articleType = this.list.articleType;
        this.itemList = newVal.list;
      }
    },

  }

</script>

<style scoped>
  .article {
    width: 20rem;
    box-shadow: 0px 2px 5px rgb(199, 198, 198);
    background: #fff;
    overflow: hidden;
    margin-bottom: 2rem;
  }

  .article-header {
    width: 100%;
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: left;
    color: #646668;
    font-size: 1.16rem;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
  }

  .article-header span {
    padding-left: 2rem;
  }

  .article-list ul li {
    padding: .8rem 1.3rem;
    cursor: pointer;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
  }

  .article-list ul li:hover {
    padding-left: 1.8rem;
    transition: .2s ease-in-out;
    background: rgb(252, 249, 249);
  }

  .title {
    font-size: 1.16rem;
    color: #333;
    width: 100%;
    margin-bottom: .2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta-box p {
    float: left;
    width: 22%;
    padding: .4rem .5rem;
    color: #666;
    margin-right: .5rem;
  }

  .meta-box p:first-child {
    padding-left: 0;
  }

  .meta-box p span {
    color: #B2BAC2;
  }

  .iconfont {
    margin-right: .2rem;
  }

</style>
