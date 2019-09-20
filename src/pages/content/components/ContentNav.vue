<template>
  <div class="content-nav">
    <div class="content-header">
      <nav class="tag-nav" v-if="tagList.length">
        <ul class="tag-list">
          <li class="tag-item" v-for="(item,index) in tagList" :key="item.tagId" @click=tagChange(item.tagId,index)>
            <span v-text="item.tagName" :class="tagIndex == index ? colorStyle :''"></span>
          </li>
        </ul>
      </nav>
      <nav class="nav">
        <ul v-if="$store.state.isSort">
          <li v-for="(item,index) in navList" :class="navIndex == index ? colorStyle : ''">
            <span v-text="item.type" @click="getContenList(index)"></span>
          </li>
        </ul>
        <p v-else>搜索结果</p>
      </nav>
    </div>
    <content-list :contentList="contentList"></content-list>
    <div v-show="showTip" style="height: 70px;margin:30px 0 10px 30%;color: #666;font-weight: 600;">博主未添加此内容</div>
  </div>
</template>

<script>
  import ContentList from './components/ContentList'
  export default {
    components: {
      ContentList
    },
    created() {
      this.getContenList();
      window.addEventListener('scroll', this.debounce(this.isScrollToBottom, 100));
      this.$EventBus.$on('getTaglist', (index) => {
        this.getTagList(index);
      });
      this.$EventBus.$on('getArticleListBykeywords',(keywords)=>{
        this.getArticleListBykeywords.call(this,keywords);
      })
    },
    data() {
      return {
        navList: [{
          type: '热门',
          status: 1
        }, {
          type: '最新',
          status: 2
        }, {
          type: '评论',
          status: 3
        }],
        categoryId: '',
        tagList: [],
        tagId: '',
        status: 1,
        currentPage: 1,
        lastPage: '',
        navIndex: 0,
        tagIndex: 0,
        colorStyle: 'colorStyle',
        contentList: [],
        showTip: false,
        isRequest:true,//滚动到底部是否要请求
      }
    },
    methods: {
      tagChange(tagId, index) {
        this.tagIndex = index;
        this.tagId = tagId;
        this.getContenList();
      },
      getTagList(index) {
        if (index != 0) {
          this.axios.get('/author/categoryDto/tag?categoryId=' + this.$store.state.categoryId + '&state=1').then(
            res => {
              if (res.data.code == 0) {
                this.tagList = res.data.data;
                if (!this.tagList.length) {
                  this.$store.commmit('setCategoryType', 0);
                } else {
                  let item = {
                    tagId: 1,
                    tagName: '全部',
                  }
                  this.tagList.unshift(item);
                  this.tagId = '';
                  this.tagIndex = 0;
                  this.navIndex = 0;
                }
                this.categoryId = this.$store.state.categoryId;
                this.status = 1;
                this.currentPage = 1;
                this.getContenList();
              }
            })
        } else {
          this.status = 1;
          this.tagId = '';
          this.categoryId = '';
          this.currentPage = 1;
          this.tagList = [];
          this.$store.commit('setCategoryType', 0);
          this.getContenList();
        }
      },
      getContenList(index = 0) {
        this.showTip = false;
        this.navIndex = index;
        this.status = index + 1;
        if (this.tagId == 1)
          this.tagId = '';
        if (this.$store.state.categoryId == 1) { //
          this.categoryId = '';
        }
        this.getData();

      },
      getData() {
        this.axios.get('/user/articleDto?categoryId=' + this.categoryId + '&tagId=' + this.tagId + '&sort=' + this
          .status + '&pageNum=' + this.currentPage).then(res => {
          if (res.data.code == 0) {
            this.isRequest = true;
            let data = res.data.data;
            this.lastPage = data.lastPage;
            if (data.list.length) {
              this.contentList = data.list;
              this.showTip = false;
            } else {
              this.contentList = [];
              this.showTip = true;
            }
          } else {
            this.contentList = [];
            this.showTip = true;
          }
        })

      },
      getArticleListBykeywords(keywords){
        this.isRequest = false;
        this.axios.get('/user/search?keyword='+keywords+'&flag=2').then((res)=>{
          let data = res.data;
          if(data.code == 0){
            this.$store.commit('setIsSort', false);
            if(data.data.length){
              this.contentList = data.data;
              this.showTip = false;
            }else{
              this.contentList = [];
              this.showTip = true;
            }
          }
        })
      },
      showMore() {
        if (this.currentPage == this.lastPage) {

        } else {
          this.currentPage++;
          this.axios.get('/user/articleDto?categoryId=' + this.categoryId + '&tagId=' + this.tagId + '&sort=' + this
            .status + '&pageNum=' + this.currentPage).then(res => {
            if (res.data.code == 0) { 
              let data = res.data.data;
              this.contentList =  this.contentList.concat(data.list);
              this.isRequest = true;
            }
          })
        }
      },
      debounce(fn, delay) {
        let timeout = null
        return function () {
          if (timeout != null) {
            clearTimeout(timeout)
          }
          timeout = setTimeout(fn, delay)
        }
      },
      isScrollToBottom() {
        let wScrollY = window.scrollY; // 当前滚动条位置  
        let wInnerH = window.innerHeight; // 设备窗口的高度（不会变）  
        let bScrollH = document.body.scrollHeight || document.documentElement.scrollHeight; // 滚动条总高度      
        if (wScrollY + wInnerH >= bScrollH) {
          if(this.isRequest){
            this.isRequest = false;
            this.showMore();
          }
        }
      },

    }
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
    border-radius: 2px;
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
    .content-nav {
      width: 100%;
      margin-right: 0;
    }

    .tag-item {
      font-size: 1.16rem;
    }
  }

</style>
