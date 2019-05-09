<template>
  <div class="header">
    <div class="header-box">
      <header class="header-content">
        <div class="content">
          <a href="/" class="logo">
            <span class="iconfont">&#xe686;</span>
            <span class="name">Darcy</span>
          </a>
          <nav class="nav-content">
            <ul class="nav-list">
              <li class="li-first">
                <div class="phone-show">
                  <span>首页</span>
                  <span class="iconfont">&#xe771;</span>
                </div>
                <ul class="phone-hide">
                  <li class="nav-item" v-for="(item , index) in navList" :key="item.title"
                    @click="changeNavColor(index)">
                    <a v-text="item.title" :class="navIndex == index ? colorStyle : ''"></a>
                  </li>
                </ul>
              </li>
              <li class="search nav-item">
                <div class="input-search">
                  <input type="text" class="input" placeholder="关键词">
                  <span class="iconfont">&#xe615;</span>
                </div>
              </li>
              <li class="message nav-item">
                <span class="iconfont">&#xe642;</span>
                <a href="/">留言本</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <nav class="tag-nav" v-if="tagList.length">
        <ul class="tag-list">
          <li class="tag-item" v-for="(item,index) in tagList" :key="item.id" @click=changeTagColor(index)>
            <span v-text="item.tag" :class="tagIndex == index ? colorStyle :''"></span>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navList: [{
          src: '/',
          title: '首页'
        }, {
          src: '/',
          title: '前端'
        }, {
          src: '/',
          title: '后端'
        }, {
          src: '/',
          title: '项目总结'
        }],
        navIndex: 0,
        tagIndex: 0,
        colorStyle: 'colorStyle',
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
        }]
      }
    },
    methods: {
      changeNavColor(index) {
        this.navIndex = index;
      },
      changeTagColor(index) {
        this.tagIndex = index;
      }
    },

  }

</script>

<style scoped>
  .header-box {
    position: relative;
    height: 5rem;
  }

  .header-content {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-bottom: 1px solid rgb(243, 240, 240);
    height: 5rem;
    z-index: 100;
  }

  .content {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 960px;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .logo {
    height: 5rem;
    line-height: 5rem;
    font-size: 2.5rem;
    margin-right: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .logo .iconfont {
    font-size: 3rem;
  }

  .name {
    font-weight: bold;
    color: rgb(69, 167, 212);
    padding-left: .5rem;
  }

  .nav-content {
    height: 100%;
    flex: 1 0 auto;
  }

  .nav-list {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    height: 100%;
    margin: 0;
  }

  .li-first {
    display: flex;
  }

  .phone-hide {
    display: flex;
  }

  .phone-show {
    display: none;
    cursor: pointer;
  }

  .phone-show .iconfont {
    font-size: 1.5rem;
    margin-left: -.4rem;
  }

  .nav-item {
    color: #71777c;
    padding: 0 1.2rem;
    font-size: 1.33rem;
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .message .iconfont {
    font-size: 2rem;
    font-weight: bold;
    color: rgb(102, 190, 231);
  }

  .nav-item a {
    color: #71777c;
    font-size: 1.6rem;
  }

  .colorStyle {
    color: rgb(69, 167, 212) !important;
  }

  .search {
    flex: 1 1 auto;
    justify-content: flex-end;
    cursor: auto;
    z-index: 101;
  }

  .input-search {
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 3px;
  }

  .input-search .iconfont {
    font-size: 2rem;
    margin-right: 1rem;
  }

  .input {
    border: none;
    width: 10rem;
    padding: .6rem 1rem;
    box-shadow: none;
    outline: none;
    font-size: 1.1rem;
    color: #666;
  }

  input::placeholder {
    color: rgb(199, 199, 181);
  }

  .tag-nav {
    position: fixed;
    top: 5rem;
    left: 0;
    width: 100%;
    height: 3.833rem;
    z-index: 99;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    transition: all .2s;
    transform: translateZ(0);
    overflow: hidden;
  }

  .tag-list {
    position: relative;
    max-width: 960px;
    height: 110%;
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
    font-size: 1.4rem;
    color: #71777c;
    padding: 0 1rem;
    cursor: pointer;
  }

  .tag-item:hover {
    color: rgb(69, 167, 212);
  }

  @media screen and (max-width:980px) {
    .li-first {
      display: block;
      position: absolute;
      left: -15px;
      top: 0;
      background-color: #fff;
      z-index: 1;
    }

    .phone-show {
      height: 5rem;
      display: flex;
      align-items: center;
      color: rgb(69, 167, 212);
      font-size: 1.33rem;
      justify-content: center;
      padding: 0;
      width: 5.66rem;
    }

    .phone-show .iconfont {
      margin-left: .1rem;
    }

    .phone-hide {
      display: block;
      background-color: #fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
      border: 1px solid rgba(177, 180, 185, .45);
      border-radius: 4px;
      font-size: 1.2rem;
      background: #fff;
      z-index: 101;
    }

    .nav-item {
      height: 4rem;
      font-size: 1.33rem;
    }

    .nav-item a{
      font-size: 1.33rem ;
    }

    .name {
      display: none;
    }

    .input {
      width: 6rem;
    }

    .logo {
      padding-left: 1rem;
    }

    .message {
      margin-left: -.8rem;
    }

    .message .iconfont {
      font-size: 1.5rem;
    }

    .message a {
      font-size: 1.33rem !important;
    }
  }

  @media screen and (max-width:330px) {
    .li-first {
      display: block;
      position: absolute;
      left: -15px;
      top: 0;
      background-color: #fff;
      z-index: 1;
      overflow: hidden;
    }

    .phone-show {
      height: 5rem;
      display: flex;
      align-items: center;
      color: rgb(69, 167, 212);
      font-size: 1.33rem;
      justify-content: flex-start;
      padding: 0;
      width: 5.66rem;
    }

    .phone-hide {
      display: block;
      background-color: #fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
      border: 1px solid rgba(177, 180, 185, .45);
      border-radius: 4px;
      background: #fff;
      z-index: 101;
    }
    .nav-item a{
      font-size: 1.33rem ;
    }

    .name {
      display: none;
    }

    .logo {
      padding-left: 1rem;
    }

    .search {
      display: none;
    }
  }

</style>
