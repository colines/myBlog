<template>
  <div class="content-nav">
    <div class="content-header">
      <nav class="tag-nav" v-if="tagList.length">
        <ul class="tag-list">
          <li class="tag-item" v-for="(item,index) in tagList" :key="item.id" @click=changeTagColor(index)>
            <span v-text="item.tag" :class="tagIndex == index ? colorStyle :''"></span>
          </li>
        </ul>
      </nav>
      <nav class="nav">
        <ul>
          <li v-for="(item,index) in navList" :class="navIndex == index ? colorStyle : ''"
            @click="changeColorStyle(index)">
            <span v-text="item.type" @click="getContenList(item.status)"></span>
          </li>
        </ul>
      </nav>
    </div>
    <content-list :contentList="contentList"></content-list>
  </div>
</template>

<script>
  import ContentList from './components/ContentList'
  export default {
    components: {
      ContentList
    },
    created() {
      this.getContentHot();
    },
    data() {
      return {
        navList: [{
          type: '热门',
          status: 0
        }, {
          type: '最新',
          status: 1
        }, {
          type: '评论',
          status: 2
        }],
        tagList: [{
          tag: 'javascript',
          id: '1'
        }, {
          tag: 'css',
          id: '2'
        }, {
          tag: 'html',
          id: '3'
        }, {
          tag: 'vue',
          id: '4'
        }, {
          tag: 'react',
          id: '5'
        }, {
          tag: 'webpack',
          id: '6'
        }],
        navIndex: 0,
        tagIndex: 0,
        colorStyle: 'colorStyle',
        contentList: [],
      }
    },
    methods: {
      changeTagColor(index) {
        
        this.tagIndex = index;
      },
      changeColorStyle(index){
        this.navIndex = index;
      },
      getContenList(status) {
        switch (status) {
          case 0:
            this.getContentHot();
            break;
          case 1:
            this.getContentNew();
            break;
          case 2:
            this.getContentComments();
            break;
        }

      },
      getContentNew() {
        this.axios('/getContentListNew').then(res => {
          console.log(res);
          let data = res.data;
          if (data.code == 200) {
            this.contentList = data.data;
          }
        })
      },
      getContentHot() {
        this.axios('/getContentListHot').then(res => {
          console.log(res);
          let data = res.data;
          if (data.code == 200) {
            this.contentList = data.data;
          }
        })
      },
      getContentComments() {
        this.axios('/getContentListComments').then(res => {
          console.log(res);
          let data = res.data;
          if (data.code == 200) {
            this.contentList = data.data;
          }
        })
      }
    },

  }

</script>

<style scoped>
  .colorStyle {
    color: rgb(69, 167, 212);
  }

  .content-nav {
    display: block;
    margin-right: 260px;
    background: #fff;
    width: 700px;
    box-shadow: 0px 2px 5px rgb(199, 198, 198);
  }

  .content-header {
    padding: 1.2rem 1rem 2.2rem 1rem;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
  }
  .tag-nav {
    position: fixed;
    top: 5rem;
    left: 0;
    width: 100%;
    height: 3.833rem;
    z-index: 10;
    box-shadow: 0px 2px 5px rgb(199, 198, 198);
    transition: all .2s;
    transform: translateZ(0);
    overflow: hidden;
    background: #fff;
    margin-top: 1px;

  }

  .tag-list {
    position: relative;
    max-width: 960px;
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    line-height: 1;
    overflow-y: hidden;
  }

  .tag-item {
    height: 100%;
    align-items: center;
    display: flex;
    flex-shrink: 0;
    font-size: 1.33rem;
    color: #71777c;
    padding: 0 1rem;
    cursor: pointer;
  }

  .tag-item:hover {
    color: rgb(69, 167, 212);
  }

  .content-header .nav ul li {
    float: left;
    width: 5rem;
    text-align: center;
    border-right: 1px solid #ddd;
    font-size: 1.16rem;
    cursor: pointer;
  }

  .content-header .nav ul li:last-child {
    border: none;
  }

  .content-header .nav ul li:hover {
    color: rgb(69, 167, 212);
  }
  @media screen and (max-width:980px) {
    .content-nav{
      width:100%;
      margin-right: 0;
    }
    .tag-item{
      font-size: 1.16rem;
    }
  }

</style>
