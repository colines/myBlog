<template>
  <div class="post">
    <div class="box">
      <div class="post-message">
        <p>
          <span class="iconfont">&#xe669;</span>
          <span>发表留言</span>
        </p>
      </div>
      <div class="input-group">
        <label for="nickName">昵称：</label>
        <input type="text" placeholder="必填" id="nickName">
      </div>
      <div class="input-group">
        <label for="email">邮箱：</label>
        <input type="text" placeholder="可填，保密" id="email">
      </div>
      <div class="input-group">
        <label for="url">网址：</label>
        <input type="text" placeholder="可填" id="url">
      </div>
      <div class="clear-fix"></div>
      <div class="textarea-group">
        <textarea name="message" id="message" class="textarea" placeholder="您的留言 O(∩_∩)O"></textarea>
      </div>
      <button class="btn">确认提交</button>
    </div>
  </div>
</template>

<script>
  export default {

  }

</script>

<style scoped>
  .post {
    width: 100%;
    background: #fff;
    padding-bottom: 2rem;
  }

  .post-message{
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .post-message p{
    padding: .8rem;
    border-bottom:1px solid #ccc;
  }

  .input-group {
    word-break: break-all;
    float: left;
    width: 32%;
  }

  .input-group input {
    border: 1px solid #ccc;
    width: 11rem;
    padding: .4rem;
    margin-top: -.2rem;
    border-radius: 3px;
  }

  input:focus{
    border:1px solid #666;
  }

  input::placeholder{
    color: rgb(209, 205, 205);
  }
  textarea::placeholder{
    color: rgb(209, 205, 205);

  }
  textarea:focus{
    border:1px solid #666;
  }

  .textarea-group{
    margin:1rem 0;
    padding-right: 1rem;
  }
  .textarea {
    width: 92%;
    height: 10rem;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .btn{
    width: 6rem;
    height: 3rem;
    line-height: 3rem;
    border-radius: 5px;
    background: #3690cf;
    color: #fff;
    cursor: pointer;
  }

  @media screen and (max-width:980px) {
    .input-group {
      width: 100%;
      margin-bottom: 1rem;
    }
    .textarea-group{
      margin-top: 0;
    }
    .textarea {
      width: 85%;
    }
  }


</style>
