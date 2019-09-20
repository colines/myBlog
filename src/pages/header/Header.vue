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
                <div class="phone-show" @click="navListToggle">
                  <span class="nav-title">{{navTitle}}</span>
                  <span class="iconfont">&#xe771;</span>
                </div>
                <ul class="phone-hide" :class="phoneHide ? phoneHideClass : ''">
                  <li class="nav-item" v-for="(item , index) in categoryList" :key="item.categoryId"
                    @click="getArticleListByCategotyId(index,item.categoryId,item.categoryName)">
                    <a v-text="item.categoryName" :class="navIndex == index ? colorStyle : ''"></a>
                  </li>
                </ul>
              </li>
              <li class="search nav-item">
                <div class="input-search">
                  <input type="text" class="input" v-model="keywords" placeholder="关键词" @keyup.enter="getArticleListBykeywords">
                  <span class="iconfont" @click="getArticleListBykeywords">&#xe615;</span>
                </div>
              </li>
              <li class="message nav-item">
                <span class="iconfont" @click="isLeaveWords">&#xe642;</span>
                <span class="leavewords" @click="isLeaveWords">留言本</span>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.getCategory();
    },
    mounted() {
      if(this.screenWidth < 980)
      this.phoneHide  = true;
      window.addEventListener('resize', this.throttle(this.resizeHandle, 100))
    },
    data() {
      return {
        categoryList: [],
        categoryType: 0,
        categoryId: '',
        articleType: 2,
        navIndex: 0,
        isguestbook:false,
        colorStyle: 'colorStyle',
        navTitle: '首页',
        phoneHide: false,
        phoneHideClass: 'phoneHideClass',
        screenWidth: document.body.clientWidth, //浏览器宽度
        keywords:'',

      }
    },
    methods: {
      throttle(fn, delay) { //防节流函数
        let prev = Date.now()
        return function () {
          let now = Date.now()
          if (now - prev > delay) {
            fn()
            prev = Date.now()
          }
        }
      },
      resizeHandle() {
        this.screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
        if (this.screenWidth < 980)
          this.phoneHide = true;
        else
          this.phoneHide = false;
      },
      getArticleListByCategotyId(index, id, title) {
        this.navIndex = index;
        this.navTitle = title;
        this.categoryId = id;
        this.isguestbook = false;
        this.$store.commit('setCategoryType', index);
        this.$store.commit('setCategoryId', id);
        this.$EventBus.$emit('getTaglist', index);

      },
      isLeaveWords(){
        let routeData = this.$router.resolve({
          path: "/guestbook",
        });
        window.open(routeData.href, '_blank');
        // this.$store.commit('setIsContent',false);
      },
      navListToggle() {
        this.phoneHide = !this.phoneHide;
      },
      getCategory() {
        this.axios.get('/author/categoryDto/category?state=1&sort=' + this.articleType).then(res => {
          if (res.data.code == 0) {
            this.categoryList = res.data.data;
            let item = {
              categoryId: 1,
              categoryName: '首页'
            }
            this.categoryList.unshift(item);
          }
        })
      },
      getArticleListBykeywords(){
        this.$EventBus.$emit('getArticleListBykeywords',this.Utils.html_encode(this.keywords));
      }
    },

  }

</script>

<style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 5rem;
    z-index: 100;
    background: #fff;
    border-bottom: 1px solid #eee;
  }

  .header-box {
    position: relative;
    height: 5rem;
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
    font-size: 2.2rem;
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

  .phone-show .nav-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

  .nav-item a,.leavewords {
    color: #71777c;
    font-size: 1.33rem;
  }

  .colorStyle {
    color: rgb(69, 167, 212) !important;
  }

  .search {
    flex: 1 1 auto;
    justify-content: flex-end;
    cursor: auto;
    z-index: 90;
  }

  .input-search {
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 3px;
  }

  .input-search .iconfont {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  .input {
    border: none;
    width: 12rem;
    padding: .6rem 1rem;
    box-shadow: none;
    outline: none;
    font-size: 1.1rem;
    color: #666;
  }

  input::placeholder {
    color: rgb(199, 199, 181);
  }

  @media screen and (max-width:980px) {
    .li-first {
      display: block;
      position: absolute;
      left: -15px;
      top: -7px;
      background-color: #fff;
      z-index: 99;
      margin-left: -10px;
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
      margin-left: 1rem;
    }

    .phone-show .iconfont {
      margin-left: .1rem;
    }

    .phone-hide {
      display: block !important;
      background-color: #fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
      border: 1px solid rgba(177, 180, 185, .45);
      border-radius: 4px;
      font-size: 1.2rem;
      background: #fff;
      z-index: 99;
    }

    .nav-item {
      height: 4rem;
      font-size: 1.33rem;
    }

    .nav-item a {
      font-size: 1.33rem;
    }

    .name {
      display: block;
      margin-right: 2rem !important;
    }

    .input {
      width: 8rem;
    }

    .logo {
      padding-left: 1rem;
    }

    .message {
      margin-left: -.8rem;
    }

    .message .iconfont {
      font-size: 1.8rem;
    }

    .message .leavewords {
      font-size: 1.33rem !important;
    }
  }

  @media screen and (max-width:700px) {
    .name {
      display: none;
    }
  }

  @media screen and (max-width:500px) {
    .phone-show {
      margin-left: 1rem;
    }
  }

  @media screen and (max-width:330px) {
    .li-first {
      display: block;
      position: absolute;
      left: 0;
      top: -6px;
      background-color: #fff;
      z-index: 99;
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
      margin-top: -1px;
    }

    .phone-hide {
      display: block !important;
      background-color: #fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
      border: 1px solid rgba(177, 180, 185, .45);
      border-radius: 4px;
      background: #fff;
      z-index: 99;
    }

    .nav-item a {
      font-size: 1.33rem;
    }

    .name {
      display: none;
    }

    .logo {
      padding-left: 1rem;
    }

    .input {
      width: 6rem;
    }

    .message .leavewords {
      display: none;
    }

    .message .iconfont {
      font-size: 2rem;
    }
  }

  .phoneHideClass {
    display: none !important;
  }

</style>
