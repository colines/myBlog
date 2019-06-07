<template>
  <div class="content">
    <div class="message-list">
      <a-comment v-for="(item,index) in messageList" :key="index" class="comment">
        <a slot="author">{{Utils.html_decode(item.userName)}}</a>
        <a-avatar
          :src="item.imageUrl"
          slot="avatar" />
        <a-tooltip slot="content" :title="item.guestbookContent">
          <span class="user-words">
            {{Utils.html_decode(item.guestbookContent)}}
          </span>
        </a-tooltip>
        <a-tooltip slot="datetime" :title="moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')">
          <span>{{moment(item.updateTime).fromNow()}}</span>
        </a-tooltip>
      </a-comment>
      <div class="comment-bottom">
        <div v-if="!isLastPage">
          <a-spin v-if="loadingMore" />
          <a-button v-else @click="onLoadMore" >加载更多</a-button>
        </div>
        <div v-else><p style="color: #666;margin-top: 4rem;">我是有底线的</p></div>
      </div>
    </div>
    <!-- <div class="pages">
      <ul>
        <li @click="pagePre">
          <span class="page-item" :class="currentPage == 1 ? disabled :''">pre</span>
        </li>
        <li v-for="(item,index) in endPage" @click="changeCurrent(item)" v-show="item >= startPage">
          <span class="page-item" :class="index == pageIndex ? activeClass : ''">{{item}}</span>
        </li>
        <li @click="pageNext">
          <span class="page-item" :class="currentPage == pages ? disabled :''">next</span>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
  export default {
    created() {
      this.getMessageList();
      this.$EventBus.$on('addGuestBook',(gusestBook)=>{
        this.addGuestBook(gusestBook);
      })
    },
    data() {
      return {
        pageIndex: 0,
        pages: 8,
        pageNum: 5,
        currentPage: 1,
        lastPage:'',
        startPage: 1,
        activeClass: 'active',
        disabled: 'disabled',
        loadingMore:false,
        messageList:[],
        isLastPage:false,
      }
    },
    computed: {
      endPage: function () {
        if (this.pageNum >= this.pages)
          return this.pages;
        if (this.startPage + this.pageNum - 1 >= this.pages) {
          return this.pages;
        }
        return this.startPage + this.pageNum - 1;
      }
    },
    methods: {
      addGuestBook(gusestBook){
        this.messageList.unshift(gusestBook);
      },
      onLoadMore(){
        this.loadingMore = true;
        if(this.currentPage == this.lastPage){
          this.isLastPage = true;
        }else{
          this.currentPage++;
          this.getMessageList();
        }
      },
      getMessageList(){
        this.axios.get('/user/guestBook?pageNum='+this.currentPage).then(res=>{
            if(res.data.code == 0){
              this.loadingMore = false;
              this.lastPage = res.data.data.lastPage;
              this.messageList = this.messageList.concat(res.data.data.list);
            }
          })
      },
      changeCurrent(item) {
        this.pageIndex = item - 1;
        this.currentPage = item;
      },
      pagePre() {
        if (this.currentPage > 1) {
          if (this.currentPage == this.startPage) {
            this.startPage--;
          }
          this.currentPage--;
          this.pageIndex = this.currentPage - 1;
        }
      },
      pageNext() {
        if (this.pages > this.currentPage) {
          this.currentPage++;
          this.pageIndex = this.currentPage - 1;
          if (this.currentPage > this.endPage) {
            this.startPage++;
          }
        } else {

        }
      },
    },

  }

</script>

<style scoped>
  .content {
    padding-bottom: 1.55rem;
  }

  .message-list ul li {
    width: 100%;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
  }

  .message-list ul li:hover {
    transition: .2s ease-in-out;
    transform: scale(1.02);
    box-shadow: 0 0 5px #666;
  }

  .message {
    padding: .8rem;
  }

  .message p {
    margin: .8rem;
    word-wrap: break-word;
    word-break: break-all;
  }

  .nickName {
    color: #666;
    font-size: 1.16rem;
  }

  .pages {
    margin-top: 1rem;
  }

  .pages ul li span:hover {
    color: #ffffff;
    background-color: rgb(54, 144, 207);
    border: 1px solid #3690cf;
  }

  .page-item {
    margin: 3px 5px 0 0;
    float: left;
    padding: 7px 10px;
    background-color: #FFF;
    border: 1px solid #ddd;
    font-size: 12px;
    color: #666;
    border-radius: 2px;
    cursor: pointer;
  }

  .active {
    color: #ffffff;
    background-color: rgb(54, 144, 207);
    border: 1px solid #3690cf;
  }

  .disabled {
    cursor: no-drop;
    background-color: #eee !important;
    color: #666 !important;
    border: 1px solid #eee !important;
  }
  .comment{
    margin: 1rem 0;
  }
  .comment-bottom{
    width: 100%;
    text-align: center;
  }

  @media screen and (max-width:980px) {
    .message p {
      width: 20rem;
    }
  }

</style>
