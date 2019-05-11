<template>
  <div class="content-nav">
    <div class="content-header">
      <nav class="nav">
        <ul>
          <li v-for="(item,index) in navList" :class="navIndex == index ? colorStyle : ''" @click="changeColorStyle(index)">
            <span v-text="item"></span>
          </li>
        </ul>
      </nav>

    </div>
   <div class="content-list">
      <ul>
        <li>
            <a href="">
              <div class="content-box">
                <div class="info-box">
                  <div class="meta-info">
                    <span class="time">1小时前</span>
                    <span>javascript</span>
                  </div>
                  <div class="title-info">
                    <span>vue的响应式原理</span>
                  </div>
                  <div class="action-info">
                    <ul>
                      <li><span class="iconfont">&#xe60c;</span><span>10</span></li>
                      <li class="action-item"><span class="iconfont">&#xe684;</span><span>5</span></li>
                      <li class="action-item"><span class="iconfont">&#xe605;</span><span>1110</span></li>
                      <li class="action-item"><span class="iconfont">&#xe61d;</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </a>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        navList:['热门','最新','评论'],
        navIndex:0,
        colorStyle:'colorStyle',
      }
    },
    methods: {
      changeColorStyle(index){
        this.navIndex = index;
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

  .content-list{
    width: 100%;
    background: #fff;
  }

  .content-list ul li{
    border-bottom: 1px solid hsla(0,0%,59.2%,.1);
  }
  .content-list ul li:hover{
    background: rgb(250, 249, 249);
  }
  .content-box{
    display: flex;
    padding:1.5rem 2.4rem;
    align-items: center;
  }
  .info-box{
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .meta-info{
    font-size: 1rem;
    color: #b2bac2;
  }
  .time::after{
    content: "·";
    color: rgb(178, 186, 194);
    margin: 0px 0.4em;
  }
  .title-info{
    margin: .8rem 0 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .title-info span{
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
  }

  .title-info span:hover{
    text-decoration: underline;
  }

  .action-info ul li{
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

  .action-info ul li span{
    margin-right: .5rem;
  }
  .action-item{
    margin-left: -1px;
  }




</style>
