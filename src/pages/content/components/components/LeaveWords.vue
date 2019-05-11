<template>
  <div class="leave-words">
    <div class="words-header">
      <span>最新评论</span>
    </div>
    <div class="words-list">
      <ul>
        <li>
          <p class="nick-name">colines</p>
          <p class="word">博主有点懒</p>
        </li>
        <li>
          <p class="nick-name">colines</p>
          <p class="word">博主有点懒</p>
        </li>
        <li>
          <p class="nick-name">colines</p>
          <p class="word">博主有点懒</p>
        </li>
        <li>
          <p class="nick-name">colines</p>
          <p class="word">博主有点懒</p>
        </li>
        <li>
          <p class="nick-name">colines</p>
          <p class="word">博主有点懒</p>
        </li>
      </ul>
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
    height: 24.42rem;
    box-shadow: 0px 2px 5px rgb(199, 198, 198);
    margin: 2rem 0;
    background: #fff;
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
  }

  .words-list ul li p {
    padding: .5rem 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

</style>
