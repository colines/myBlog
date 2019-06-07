<template>
  <div class="comments-list" id="comments-list">
    <h1 v-if="commentsList.length">评论列表</h1>
    <h1 v-else>暂无评论</h1>
    <a-comment v-for="item in commentsList" :key="item.reviewId">
      <span slot="author">
        <span>{{Utils.html_decode(item.userName)}}</span>
      </span>
      <span slot="datetime">{{moment(item.updateTime).fromNow()}}</span>
      <a-avatar slot="avatar" :src="item.imageUrl" alt="item.userName" />
      <p slot="content">{{Utils.html_decode(item.reviewContent)}}</p>
      <span slot="actions" @click="showReviewModal(item.reviewId,item.userName)">回复</span>
      <a-comment v-for="review in item.reviewDtos" :key="review.reviewId">
        <span slot="author">
          <span>{{Utils.html_decode(review.userName)}}</span>
        </span>
        <span slot="datetime">{{moment(review.updateTime).fromNow()}}</span>
        <a-avatar slot="avatar" :src="review.imageUrl" alt="Han Solo" />
        <p slot="content" class="comment-content">
          <span>回复&nbsp;</span>
          <span style="color:#45A7D4;">{{Utils.html_decode(review.replierName)}}</span>
          <span classs="reply-content">：{{Utils.html_decode(review.reviewContent)}} </span>
        </p>
        <span slot="actions" @click="showReviewModal(review.reviewId,review.userName)">回复</span>
      </a-comment>
    </a-comment>
    <a-modal title="评论回复" v-model="reviewModalVisiable" @ok="review" cancelText="取消" okText="确认" class="review">
      <a-input placeholder="昵称" v-model="nickName" spellcheck="false" />
      <a-input placeholder="邮箱(选填)" v-model="email" style="margin: 15px 0;" spellcheck="false" />
      <a-textarea :placeholder="'回复'+commentsName" v-model="reviewContent" :rows="3" spellcheck="false" />
    </a-modal>
  </div>
</template>

<script>
  export default {
    props: ['commentsList'],
    watch: {
      commentsList: function (newVal, oldVal) {
        this.commentsList = newVal;
      }
    },
    mounted() {
      this.handleCommentClick();
    },
    data() {
      return {
        reviewId: '',
        commentsName: '',
        reviewModalVisiable: false,
        reviewContent: '',
        nickName: '',
        email: '',
        articleId: '',
        isClickComment:false,
      }
    },
    methods: {
      handleCommentClick() { //处理在主页面点击评论后滚到评论的位置
        let isClickComment = sessionStorage.getItem('isClickComment') || 0;
        if (isClickComment != 0) {
          setTimeout(() => {
            let offsetTop = document.getElementById('comments-list').offsetTop;
            window.scrollTo(0, offsetTop + 30);
          }, 500)
        }
        sessionStorage.setItem('isClickComment',0);
      },
      showReviewModal(reviewId, name) {
        this.reviewId = reviewId;
        this.commentsName = this.Utils.html_decode(name);
        this.reviewModalVisiable = true;
        let user = JSON.parse(sessionStorage.getItem('user') || '[]');
        if (user.userName)
          this.nickName = this.Utils.html_decode(user.userName);

      },
      review() {
        if (this.nickName.trim() == '') {
          this.$message.error('昵称不能为空');
          return;
        }else if(this.reviewContent.trim() == ''){
          this.$message.error('回复内容不能空')
        }else if (this.email) {
          if (!this.Utils.checkEmail(this.email)) {
            this.$message.error('邮箱格式不正确');
            return;
          }
        }
        let reviewObj = {
          articleId: this.$store.state.articleId,
          reviewParent: this.reviewId,
          email: this.email,
          reviewContent: this.Utils.html_encode(this.reviewContent),
          userName: this.Utils.html_encode(this.nickName),
        }
        this.axios.post('/user/review', reviewObj).then(res => {
          if (res.data.code == 0) {
            this.$message.success('回复成功');
            this.$emit('getComments');
            this.reviewModalVisiable = false;
            this.reviewContent = '';
            sessionStorage.setItem('user', JSON.stringify(reviewObj));
          }
        })
      },
      
    },

  }

</script>

<style scoped>
  .comments-list {
    margin: 0 0 50px 0;
  }

  .comments-list h1 {
    text-align: center;
    color: #666;
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 20px;
  }

</style>
