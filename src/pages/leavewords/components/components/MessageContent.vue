<template>
  <div class="content">
    <div class="message-list">
      <ul>
        <li>
          <div class="message">
            <p>
              <span class="nickName">colines：</span>
              <span>发表于</span>
              <span class="time">2019-05-15 15:59</span>
            </p>
            <p>
              <span>
                因为悦己，所以轻欢！
              </span>
            </p>
          </div>
        </li>
        <li>
          <div class="message">
            <p>
              <span class="nickName">colines：</span>
              <span>发表于</span>
              <span class="time">2019-05-15 15:59</span>
            </p>
            <p>
              <span>
                因为悦己，所以轻欢！ 因为悦己，所以轻欢！
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="pages">
      <ul>
        <li>
          <span class="page-item">上一页</span>
        </li>
        <li v-for="(item,index) in pages" @click="changeStyle(index)">
          <span class="page-item" :class="index == pageIndex ? activeClass : ''">{{item}}</span>
        </li>
        <li>
          <span class="page-item">下一页</span>
        </li>
      </ul>
    </div>
    <div class="clear-fix"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageIndex: 0,
        pages: 5,
        activeClass: 'active'
      }
    },
    methods: {
      changeStyle(index) {
        this.pageIndex = index;
      }
    },

  }

</script>

<style scoped>
  .content {
    margin-bottom: 1.5rem;
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

  @media screen and (max-width:980px) {
    .message p {
      width: 20rem;
    }
  }

</style>
