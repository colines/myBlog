<template>
  <div class="content-nav">
    <div class="content-header">
      <nav class="nav">
        <ul>
          <li v-for="(item,index) in navList" :class="navIndex == index ? colorStyle : ''" @click="changeColorStyle(index)">
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
    components:{
      ContentList
    },
    created() {
      this.getContentHot();
    },
    data(){
      return{
        navList:[{type:'热门',status:0},{type:'最新',status:1},{type:'评论',status:2}],
        navIndex:0,
        colorStyle:'colorStyle',
        contentList:[],
      }
    },
    methods: {
      changeColorStyle(index){
        this.navIndex = index;
      },
      getContenList(status){
        switch(status){
          case 0:this.getContentHot();break;
          case 1:this.getContentNew();break;
          case 2:this.getContentComments();break;
        }

      },
      getContentNew(){
        this.axios('/getContentListNew').then(res=>{
          console.log(res);
          let data= res.data;
          if(data.code == 200){
            this.contentList = data.data;
          }
        })
      },
      getContentHot(){
        this.axios('/getContentListHot').then(res=>{
          console.log(res);
          let data= res.data;
          if(data.code == 200){
            this.contentList = data.data;
          }
        })
      },
      getContentComments(){
        this.axios('/getContentListComments').then(res=>{
          console.log(res);
          let data= res.data;
          if(data.code == 200){
            this.contentList = data.data;
          }
        })
      }
    },

  }

</script>

<style scoped>
  .colorStyle{
    color:rgb(69, 167, 212);
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
    border-bottom: 1px solid hsla(0,0%,59.2%,.1); 
  }
   
  .content-header ul li{
    float: left;
    width: 5rem;
    text-align: center;
    border-right: 1px solid #ddd;
    font-size: 1.16rem;
    cursor: pointer;
  }
  .content-header ul li:last-child{
    border:none;
  }
  .content-header ul li:hover{
    color:rgb(69, 167, 212);
  }
</style>
