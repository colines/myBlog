<template>
  <div class="go-top" @click="goTop" id="go-top">
    <span class="iconfont">&#xe631;</span>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.goTopElement = document.getElementById('go-top')
      window.addEventListener('scroll', this.throttle(this.handleSroll, 50))
    },
    data() {
      return {
        goTopElement: null
      }
    },
    methods: {
      goTop() { //回到顶部
        let timer = null;
        timer = setInterval(function () {
          let osTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
          let ispeed = Math.floor(-osTop / 5)
          document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop = osTop + ispeed
          if (osTop == 0) {
            clearInterval(timer)
          }
        }, 30)
      },
      handleSroll() {
        let osTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (osTop < 100)
          this.goTopElement.classList.add('icon-hidden')
        else
          this.goTopElement.classList.remove('icon-hidden')

      },
      // 防节流函数
      throttle(fn, delay) {
        let prev = Date.now()
        return function () {
          let now = Date.now()
          if (now - prev > delay) {
            fn()
            prev = Date.now()
          }
        }
      }
    },

  }

</script>
<style scoped>
  .go-top {
    position: fixed;
    bottom: 3rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    border-radius: 50%;
    background: #45A7D4;
    cursor: pointer;
    transition: .3s ease-in-out;
    z-index: 999;
  }

  .iconfont {
    font-weight: 600;
    color: #fff;
  }

  .icon-hidden {
    display: none;
    transition: .3s ease-in-out;
  }

</style>
