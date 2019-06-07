<template>
  <div class="author">
    <div class="author-header">
      <span>关于作者</span>
    </div>
    <div class="author-img">
      <div class="box-img">
        <img :src="author.imageUrl" alt="">
      </div>
    </div>
    <div class="author-name">
      <span v-text="author.name"></span>
    </div>
    <div class="author-sign" :title="author.userSignature">
      <span v-text="author.userSignature"></span>
    </div>
    <div class="author-meta">
      <ul>
        <li><span>文章</span><strong>{{author.thumbupSum}}</strong></li>
        <li><span>点赞</span><strong>{{author.thumbupSum}}</strong></li>
        <li class="action-item"><span>评论</span><strong>{{author.commentSum}}</strong></li>
        <li class="action-item"><span>浏览</span><strong>{{author.visitSum}}</strong></li>
      </ul>
    </div>
    <div class="clear-fix"></div>
  </div>
</template>

<script>
  export default {
    created(){
      this.getAuthor();
    },
    data(){
      return{
        author:{},
      }
    },
    methods: {
      getAuthor(){
        this.axios('/author/userDto/1').then(res=>{
          console.log(res);
         if(res.data.code == 0){
          this.author = res.data.data;
         }
        })
      }
    },

  }

</script>

<style scoped>
  .author {
    width: 20rem;
    height: 20.7rem;
    text-align: center;
    box-shadow: 0px 2px 5px rgb(199, 198, 198);
    background: #fff;
    border-radius: 2px;
  }

  .author-header {
    width: 100%;
    height: 3.5rem;
    line-height: 3.5rem;
    color: #646668;
    text-align: left;
    font-size: 1.16rem;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
  }

  .author-header span{
    padding-left: 2rem;
  }

  .author-img {
    width: 100%;
    padding: 1rem 6.5rem;
  }

  .box-img {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    overflow: hidden;
    background: #eee;
  }

  .box-img img {
    width: 100%;
  }

  .author-name {
    color: #666666;
    font-weight: 600;
    font-size: 1.6rem;
  }

  .author-sign {
    color: #888;
    padding: 1.25rem 1.5rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: .5rem;
  }

  .author-meta {
    width: 100%;
    border-top: 1px #efefef solid;
  }

  .author-meta ul{
      display: flex;
      text-align: center;
  }

  .author-meta ul li {
    float: left;
    width: 33.333%;
    border-right: 1px #efefef solid;
    padding: 8px 0;
    font-weight: 300;
  }
  .author-meta ul li span{
      display: block;
      font-size: 1.16rem;
      color: #999;
      padding:.5rem 0 .8rem 0;
  }

  .author-meta ul li strong{
      font-weight: bold;
      color: #666;
  }


</style>
