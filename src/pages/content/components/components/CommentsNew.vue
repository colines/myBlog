<template>
  <div class="leave-words">
    <div class="words-header">
      <span>最新留言</span>
    </div>
    <div class="words-list">
      <a-comment v-for="(item,index) in commentsList" :key="item.guestbookId" v-if="index < 7" class="comment">
        <a slot="author">{{Utils.html_decode(item.userName)}}</a>
        <a-avatar
          :src="item.imageUrl"
          alt="Han Solo" slot="avatar" />
        <a-tooltip slot="content" :title="Utils.html_decode(item.guestbookContent)">
          <span class="user-words">
            {{Utils.html_decode(item.guestbookContent)}}
          </span>
        </a-tooltip>
        <a-tooltip slot="datetime" :title="moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')">
          <span>{{moment(item.updateTime).fromNow()}}</span>
        </a-tooltip>
      </a-comment>
      <!-- <ul>
        <li v-for="(item,index) in commentsList" :key="item.guestbookId" v-if="index < 8">
          <p class="nick-name">{{Utils.html_decode(item.userName)}}</p>
          <a-tooltip slot="content" :title="Utils.html_decode(item.guestbookContent)">
            <p class="word">{{Utils.html_decode(item.guestbookContent)}}</p>
          </a-tooltip>
          <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')" class="date">
            <span>{{moment(item.updateTime).fromNow()}}</span>
          </a-tooltip>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.getCommentsList();
    },
    data() {
      return {
        commentsList: [],
      }
    },
    methods: {
      getCommentsList() {
        this.axios.get('/user/guestBook?pageNum=1').then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.commentsList = res.data.data.list;
          }
        })
      }
    },

  }

</script>

<style scoped>
  .leave-words {
    width: 20rem;
    box-shadow: 0px 2px 5px rgb(199, 198, 198);
    margin: 2rem 0;
    background: #fff;
    overflow: hidden;
    border-radius: 2px;
  }

  .words-header {
    width: 100%;
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: left;
    color: #646668;
    font-size: 1.16rem;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
  }

  .words-header span {
    padding-left: 2rem;
  }

  .words-list ul li {
    float: left;
    width: 100%;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
    position: relative;
  }

  .words-list ul li p {
    padding: .5rem 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .words-list ul li span {
    position: absolute;
    top: .5rem;
    right: 2rem;
    color: #999;
  }

  .nick-name {
    color: #888;
    font-size: 1.16rem;
  }

  .word {
    color: #666;
    font-weight: 600;
  }

  .words-list ul li .word:hover {
    color: rgb(69, 167, 212);
    cursor: pointer;
  }
  .comment{
    margin-left: 1rem;
  }

</style>
