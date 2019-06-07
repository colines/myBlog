<template>
  <div>
    <div class="article-meta">
      <div class="meta" @click="handleThumbupCount(article.articleId)">
        <span class="iconfont" :class="isLiked ? iconfontColor : ''">&#xe60c;</span>
        <span class="badge">{{article.thumbupCount}}</span>
      </div>
      <div class="meta" @click="handleCommentClick">
        <span class="iconfont">&#xe684;</span>
        <span class="badge">{{article.commentCount}}</span>
      </div>
      <div class="meta">
        <span class="iconfont">&#xe605;</span>
        <span class="badge">{{article.visitCount}}</span>
      </div>

      <div class="meta" @click.stop="shareArticle(article.articleId,article.articleTitle)">
        <span class="iconfont">&#xe61d;</span>
      </div>
      <a-modal title="文章分享" v-model="shareModalVisible" :footer='null'>
        <a-input :value="shareLink" id="link" spellcheck="false">
          <a-icon type="copy" slot="addonAfter" id="btn-share" data-clipboard-target="#link" style="cursor: pointer;"
            title="copy" />
        </a-input>
      </a-modal>
    </div>
    <div class="article-info">
      <div class="author-img">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558847245158&di=7d375f370cd1fa2eab45a3b59b0baa1c&imgtype=0&src=http%3A%2F%2Flkker-10041312.file.myqcloud.com%2FImages%2F201902%2FgVaG15512595824319.jpg"
          alt="">
      </div>
      <div class="author-info">
        <h1>Darcy</h1>
        <p>
          <span>{{moment(article.updateTime).format('YYYY-MM-DD')}} 发表</span>
        </p>
      </div>
    </div>
    <div class="clear-fix"></div>
    <h1 class="article-title" v-text="article.articleTitle"></h1>
    <div class="article-content markdown-body" v-html="article.articleHtml" id="article-content">
    </div>
    <div class="side-bar">
      <article-new :list="articleNewList"></article-new>
      <article-hot :list="articleHotList"></article-hot>
      <div class="article-nav">
        <h3><span>目录</span></h3>
        <div id="article-nav">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ArticleList from '@/pages/common/components/ArticleList'
  import Catalog from '@/assets/js/catalog.js'

  export default {
    props: ['article'],
    components: {
      'article-hot': ArticleList,
      'article-new': ArticleList,
    },
    created() {
      this.getArticleNewList();
      this.getArticleHotList();
    },
    mounted() {
      new Catalog({
        contentEl: 'article-content',
        catalogEl: 'article-nav',
        selector: ['h1', 'h2', 'h3'],
      })
      new ClipboardJS('#btn-share');

    },
    watch: {
      article: function (newVal, oldVal) {
        this.article = newVal;
        if (!this.flag) {
          this.flag = true;;
          this.handleThumbup();
        }
      }
    },
    data() {
      return {
        articleNewList: null,
        articleHotList: null,
        isLiked: false, //是否点赞
        flag: false,
        iconfontColor: 'iconfontColor',
        shareModalVisible:false,
        shareLink:'',
      }
    },
    methods: {
      getArticleHotList() {
        this.articleHotList = JSON.parse(sessionStorage.getItem('hotList') || '[]')
        if (!this.articleHotList.list)
          this.axios.get('/author/articleDto?states=1&sort=1').then((res) => {
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
      handleThumbupCount(articleId) {
        if (this.isLiked)
          this.article.thumbupCount--;
        else
          this.article.thumbupCount++;
        this.isLiked = !this.isLiked;
        this.axios.post('/user/thumbup/' + articleId + '?ip=' + this.$ip).then(res => {})

      },
      handleCommentClick() {
        let offsetTop = document.getElementById('comments-list').offsetTop;
        window.scrollTo(0, offsetTop + 30);
      },
      handleThumbup() {
        let list = JSON.parse(localStorage.getItem('list') || '[]');
        console.log(list)
        console.log(this.article)
        for (let i = 0; i < list.length; i++) {
          if (this.article.articleId == list[i].articleId) {
            this.article.thumbupCount = list[i].thumbupCount;
            this.isLiked = list[i].isLiked;
          }
        }
      },
      shareArticle(id, title) {
        this.shareLink = title + '：' + this.home + 'article?aid=' + id;
        this.shareModalVisible = true;
      },
    }
  }

</script>

<style scoped>
  .article-meta {
    position: fixed;
    margin-left: -7rem;
    top: 16rem;
    width: 40px;
  }

  .article-meta .iconfont {
    font-size: 1.6rem;
    color: rgb(174, 178, 182);
  }

  .meta {
    position: relative;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    background: #fff;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .meta:hover {
    transform: scale(1.06);
  }

  .badge {
    position: absolute;
    top: -5px;
    left: 50%;
    font-size: 1.16rem;
    padding: .1rem .5rem;
    border-radius: .5rem;
    white-space: nowrap;
    line-height: 1.2;
    text-align: center;
    transform: scale(.8);
    color: #fff;
    background: rgb(174, 178, 182);
  }



  .article-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1.5rem 0 1rem 0;
  }

  .author-img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1rem;
  }

  .author-img img {
    width: 100%;
  }

  .author-info h1 {
    font-size: 1.33rem;
    font-weight: bold;
    margin-top: -1rem;
    height: 3.5rem;
    line-height: 3.5rem;
    color: #666;
  }

  .author-info p span {
    color: #999;
    font-size: 1.13rem;
  }

  .article-title {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.5;
    margin: 1rem .5rem;
  }

  .article-content {
    width: 100%;
    word-break: break-word;
    line-height: 1.75;
    font-weight: 400;
    font-size: 1.25rem;
    background: #fff;
    overflow-x: hidden;
  }

  .article-nav {
    width: 20rem;
    margin-top: 2rem;
    font-weight: bold;
    background: #fff;
    padding-bottom: 1.5rem;
    border-radius: 2px;
  }

  .article-nav h3 {
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: left;
    color: #222;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .article-nav h3 span {
    padding-left: 2.5rem;
  }

  .article-nav-fix {
    position: fixed;
    top: 5%;
    /* right: 194px; */
    transition: .5s ease-in-out;
  }

  .iconfontColor {
    color: #45A7D4 !important;
  }

  @media screen and (max-width:980px) {
    .side-bar {
      display: none;
    }

    .article-title {
      font-size: 2rem;
    }

    .article-content {
      font-size: 1rem;
    }
  }
  @media screen and (max-width:1025px){
    .article-meta{
      display: none;
    }
  }

</style>
