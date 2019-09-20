<template>
    <div class="links">
      <div class="links-header">
        <span>友情链接</span>
      </div>
      <div class="links-list">
        <ul>
          <li v-for="item in linksList" :key="item.urlId">
            <div class="other-logo" @click="goLinks(item.urlLink)">
              <img :src="item.imageUrl">
            </div>
            <div>
              <a :href="item.urlLink" v-text="item.urlName" target="_blank"></a>
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
      data() {
        return {
          linksList: [],
  
        }
  
      },
      methods: {
        getLinksList() {
          this.axios.get('/author/urlDto?sort=1').then(res => {
            if (res.data.code == 0) {
              this.linksList = res.data.data;
            }
          })
        },
        goLinks(url) {
          window.open(url, '_blank');
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
      border-radius: 2px;
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
      height: 3.5rem;
      line-height: 3.5rem;
      width: 100%;
      border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
    }
  
    .links-list ul li a {
      padding-left: 2rem;
    }
  
    .links-list a:hover {
      color: #f00;
      transition: .2s ease-in-out;
    }
  
  
    .words-list ul li .word:hover {
      color: rgb(69, 167, 212);
      cursor: pointer;
    }
  
    .other-logo {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-left: 2rem;
    }
  
    .other-logo img {
      width: 100%;
      padding-bottom: .5rem;
      cursor: pointer;
    }
  
    .link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 2rem;
    }
  
  </style>
  