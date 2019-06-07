<template>
  <div class="header">
    <div class="author-img">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558847245158&di=7d375f370cd1fa2eab45a3b59b0baa1c&imgtype=0&src=http%3A%2F%2Flkker-10041312.file.myqcloud.com%2FImages%2F201902%2FgVaG15512595824319.jpg" alt="">
    </div>
    <div class="author-info">
      <h1>留言本</h1>
      <p>
        <span class="iconfont">&#xe7bd;</span>
        <span>darcy</span>
        <span class="iconfont">&#xe601;</span>
        <span>2019-05-15</span>
        <span class="iconfont">&#xe605;</span>
        <span>1024</span>
        <span class="iconfont">&#xe684;</span>
        <span>1024</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {

  }

</script>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:1rem 0;
  }

  .author-img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1.5rem;
  }

  .author-img img {
    width: 100%;
  }

  .author-info h1 {
    font-size: 1.6rem;
    font-weight: bold;
    height: 3rem;
    line-height: 3rem;
    color: #000;
  }
  .author-info p{
    line-height: 1.5;
  }

  .author-info p span{
    color:#666;
    font-size: 1.13rem;
  }
  .author-info .iconfont{
    margin-left: 1rem;
  }

  .author-info .iconfont:first-child{
    margin-left: 0;
  }

  @media screen and (max-width:980px) {
    .author-img{
      display:none;
    }
  }

</style>
