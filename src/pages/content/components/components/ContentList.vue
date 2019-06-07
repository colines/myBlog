<template>
  <div class="content-list">
    <ul>
      <li v-for="(item,index) in list" :key="item.articleId" @click="getArticle(item.articleId)">
        <div class="content-box">
          <div class="info-box">
            <div class="meta-info">
              <span class="time">{{moment(item.updateTime).fromNow()}}</span>
              <span>{{item.tags[0].tagName}}</span>
            </div>
            <div class="title-info">
              <span>{{item.articleTitle}}</span>
            </div>
            <div class="action-info">
              <ul>
                <li @click.stop="addAgreeNum(item.articleId,index)"><span class="iconfont"
                    :class="isLiked(item.articleId) ? iconfontColor : ''">&#xe60c;</span>
                  <span>{{item.thumbupCount}}</span>
                </li>
                <li class="action-item" @click.stop="clickComment(item.articleId)"><span
                    class="iconfont">&#xe684;</span>
                  <span>{{item.commentCount}}</span>
                </li>
                <li class="action-item"><span class="iconfont">&#xe605;</span>
                  <span>{{item.visitCount}}</span>
                </li>
                <li @click.stop="shareArticle(item.articleId,item.articleTitle)" class="action-item">
                  <span class="iconfont">&#xe61d;</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <a-modal title="文章分享" v-model="shareModalVisible" :footer='null'>
      <a-input :value="shareLink" id="link" spellcheck="false">
        <a-icon type="copy" slot="addonAfter" id="btn-share" data-clipboard-target="#link" style="cursor: pointer;"
          title="copy" />
      </a-input>
    </a-modal>
  </div>
</template>

<script>
  export default {
    props: ['contentList'],
    created() {
      window.onbeforeunload = function (e) { //清空缓存
        var storage = window.localStorage;
        storage.clear()
      }
      new ClipboardJS('#btn-share');
    },
    data() {
      return {
        list: this.contentList,
        articleIdList:[],//保存文章id
        thumbupListStatus:[],///文章id对应的状态（是否点赞）
        iconfontColor: 'iconfontColor',
        articleId: 0,
        shareModalVisible: false, //分享文章的模态框
        shareLink: '',
      }
    },
    watch: {
      contentList: function (newVal, oldVal) {
        this.list = newVal;
        this.saveEveArticleStatus(newVal);
      }
    },
    methods: {
      isLiked(id){//判断某个id是否点赞
       let index = this.articleIdList.indexOf(id);
      //  console.log(id+" -- " +this.thumbupListStatus[index])
       return this.thumbupListStatus[index];
      },
      saveEveArticleStatus(list){//保存每个id的状态（点赞或者取消点赞）
        for(let i=0;i<list.length;i++){
          if(this.articleIdList.indexOf(list[i].articleId) == -1){
            this.articleIdList.push(list[i].articleId)
            this.thumbupListStatus.push(0);
          }
        }
        // console.log(this.articleIdList)
        // console.log(this.thumbupListStatus)
      },
      changeArticleStatus(id){
        let index = this.articleIdList.indexOf(id);
        this.thumbupListStatus[index] = !this.thumbupListStatus[index];
        // console.log(id+"**"+this.thumbupListStatus[index])
      },
      getArticle(id) {
        sessionStorage.setItem('categoryType', -1);
        let routeData = this.$router.resolve({
          path: "/article",
          query: {
            aid: id
          }
        });
        window.open(routeData.href, '_blank');
      },
      addAgreeNum(articleId, index) {
        this.changeArticleStatus(articleId);
        // this.$set(this.book, index, !this.book[index]); //需要更新标记数组，使用Vue.set();
        this.axios.post('/user/thumbup/' + articleId + '?ip=' + this.$ip).then(res => {
          if (res.data.code == 0) {
            if (this.isLiked(articleId)){
              this.list[index].thumbupCount++;
              this.list[index].isLiked = true;
            }
            else{
              this.list[index].thumbupCount--;
              this.list[index].isLiked = false;

            }
          }
          localStorage.setItem('list', JSON.stringify(this.list));
        })
      },
      clickComment(articleId) {
        sessionStorage.setItem('isClickComment', 1);
        this.getArticle(articleId);
        setTimeout(() => {
          sessionStorage.setItem('isClickComment', 0);
        }, 1000)
      },
      shareArticle(id, title) {
        this.shareLink = title + '：' + this.home + 'article?aid=' + id;
        this.shareModalVisible = true;
      },
      handleThumbupCount(isLiked, articleId) {
        for (let i = 0; i < this.list.length; i++) {
          if (articleId == this.list[i].articleId) {
            this.$set(this.book, index, !this.book[i])
            this.list[i].thumbupCount++;
          }
        }
      }
    },
  }

</script>

<style scoped>
  .content-list {
    width: 100%;
    background: #fff;
  }

  .content-list ul li {
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
    cursor: pointer;
  }

  .content-list ul li:hover {
    background: rgb(250, 249, 249);
  }

  .content-box {
    display: flex;
    padding: 1.5rem 2.4rem;
    align-items: center;
  }

  .info-box {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .meta-info {
    font-size: 1rem;
    color: #b2bac2;
  }

  .time::after {
    content: "·";
    color: rgb(178, 186, 194);
    margin: 0px 0.4em;
  }

  .title-info {
    margin: .8rem 0 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title-info span {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
  }

  .title-info span:hover {
    text-decoration: underline;
  }

  .action-info ul li {
    float: left;
    padding: 0 .8rem;
    height: 2rem;
    font-size: 1.083rem;
    line-height: 2rem;
    white-space: nowrap;
    color: #b2bac2;
    border-radius: 1px;
    border: 1px solid #edeeef;
  }

  .action-info ul li span {
    margin-right: .5rem;
  }

  .action-item {
    margin-left: -1px;
  }

  .iconfontColor {
    color: #45A7D4;
  }

  @media screen and (max-width:980px) {
    .title-info span {
      font-size: 1.4rem;
    }
  }

</style>
