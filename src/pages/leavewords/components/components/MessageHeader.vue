<template>
  <div class="header">
    <div class="author-img">
      <img src="../../../../../static/Davi.jpg" alt="">
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
    padding:.8rem 0 1rem .8rem;
    /* border-bottom: 1px solid hsla(0, 0%, 59.2%, .1); */
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
    margin-top: -1rem;
    height: 3.5rem;
    line-height: 3.5rem;
    color: #000;
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
