<template>
  <div class="links">
    <div class="links-header">
      <span>友情链接</span>
    </div>
    <div class="links-list">
      <ul>
        <li v-for="item in linksList" :key="item.id">
          <div class="other-logo link" @click="goLinks(item.href)">
            <img :src="item.src" alt="item.title">
          </div class="link">
          <div>
            <a :href="item.href" v-text="item.title" target="_blank"></a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.getLinksList();
    },
    data(){
      return{
        linksList:[],

      }

    },
    methods: {
      getLinksList(){
        this.linksList = [
          {src:'../../../../../static/github.svg',href:"https://github.com",title:'GitHub',id:'1'},
          {src:'../../../../../static/stackOverflow.jpg',href:"https://stackoverflow.com",title:'StackOverflow',id:'2'},
          {src:'../../../../../static/juejin.jpg',href:"https://juejin.im",title:'掘金',id:'3'},
          {src:'../../../../../static/sf.jpg',href:"https://segmentfault.com",title:'思否',id:'4'},
          {src:'../../../../../static/csdn.jpg',href:"https://www.csdn.net",title:'CSDN',id:'5'},
          {src:'../../../../../static/w3cschool.jpg',href:"https://www.w3cschool.cn",title:'W3Cschool',id:'6'},
          {src:'../../../../../static/ali.jpg',href:"https://www.iconfont.cn",title:'阿里巴巴矢量图标库',id:'7'},
        ];
      },
      goLinks(url){
          window.open(url,'_blank');
      }

    },

  }

</script>

<style scoped>
  .links {
    width: 20rem;
    box-shadow: 0px 2px 5px rgb(199, 198, 198);
    background: #fff;
    margin-bottom: 8rem;
  }

  .links-header {
    width: 100%;
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: left;
    color: #646668;
    font-size: 1.16rem;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
  }

  .links-header span {
    padding-left: 2rem;
  }

  .links-list ul li {
    display: flex;
    height: 3rem;
    line-height: 3rem;
    width: 100%;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
  }

  .links-list ul li a{
      padding-left: 2rem;
  }
  .links-list a:hover{
    color: #f00;
    transition: .2s ease-in-out;
  }

 
  .words-list ul li .word:hover {
    color: rgb(69, 167, 212);
    cursor: pointer;
  }

  .other-logo{
    width:24px;
    height: 24px;
    border-radius: 50%;
  }

  .other-logo img{
    width: 100%;
    padding-top: 1rem;
    cursor: pointer;
  }

  .link{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 2rem;
  }

</style>
