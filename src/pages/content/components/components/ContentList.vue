<template>
  <div class="content-list">
    <ul>
      <li v-for=" item in list" :key="item.id" @click="getArticle(item.id)">
        <div class="content-box">
          <div class="info-box">
            <div class="meta-info">
              <span class="time" v-text="item.date"></span>
              <span v-text="item.tagName"></span>
            </div>
            <div class="title-info">
              <span v-text="item.title"></span>
            </div>
            <div class="action-info">
              <ul>
                <li @click.stop="addAgreeNum(item.id,$event)"><span class="iconfont">&#xe60c;</span><span
                    v-text="item.agreenNum"></span></li>
                <li class="action-item"><span class="iconfont">&#xe684;</span><span v-text="item.commentsNum"></span>
                </li>
                <li class="action-item"><span class="iconfont">&#xe605;</span><span v-text="item.readNum"></span></li>
                <li @click="shareArticle" class="action-item"><span class="iconfont">&#xe61d;</span></li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['contentList'],
    data() {
      return {
        list: this.contentList,
      }
    },
    watch: {
      contentList: function (newVal, oldVal) {
        this.list = newVal;
      }
    },
    methods: {
      getArticle(id) {
        let routeData = this.$router.resolve({
          path: "/article",
          query: {
            aid: id
          }
        });
        window.open(routeData.href, '_blank');
      },
      addAgreeNum(id, event) {
        alert(id);
      },
      shareArticle() {
        
      }
    },

  }

</script>

<style scoped>
  .content-list {
    width: 100%;
    background: #fff;
  }

  .content-list ul li {
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
    cursor: pointer;
  }

  .content-list ul li:hover {
    background: rgb(250, 249, 249);
  }

  .content-box {
    display: flex;
    padding: 1.5rem 2.4rem;
    align-items: center;
  }

  .info-box {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .meta-info {
    font-size: 1rem;
    color: #b2bac2;
  }

  .time::after {
    content: "·";
    color: rgb(178, 186, 194);
    margin: 0px 0.4em;
  }

  .title-info {
    margin: .8rem 0 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title-info span {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
  }

  .title-info span:hover {
    text-decoration: underline;
  }

  .action-info ul li {
    float: left;
    padding: 0 .8rem;
    height: 2rem;
    font-size: 1.083rem;
    line-height: 2rem;
    white-space: nowrap;
    color: #b2bac2;
    border-radius: 1px;
    border: 1px solid #edeeef;
  }

  .action-info ul li span {
    margin-right: .5rem;
  }

  .action-item {
    margin-left: -1px;
  }

  @media screen and (max-width:980px) {
    .title-info span{
      font-size: 1.4rem;
    }
  }

</style>
