<template>
  <div class="leave-words">
    <div class="words-header">
      <span>最新留言</span>
    </div>
  </div>
</template>

<script>
  export default {

  }

</script>

<style scoped>
  .leave-words {
    width: 20rem;
    height: 22.2rem;
    text-align: center;
    box-shadow: 0px 2px 5px rgb(199, 198, 198);
  }

  .words-header {
    width: 100%;
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    color: #71777c;
    font-size: 1.16rem;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
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

  .author-meta ul {
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

  .author-meta ul li span {
    display: block;
    font-size: 1.16rem;
    color: #999;
    padding: .5rem 0 .8rem 0;
  }

  .author-meta ul li strong {
    font-weight: bold;
    color: #666;
  }

</style>
