<template>
  <div class="links">
    <div class="links-header">
      <span>友情链接</span>
    </div>
    <div class="links-list">
      <ul>
        <li>
         <a href="">GitHub</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {

  }

</script>

<style scoped>
  .links {
    width: 20rem;
    height: 24.42rem;
    box-shadow: 0px 2px 5px rgb(199, 198, 198);
    background: #fff;
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
    float: left;
    height: 3rem;
    line-height: 3rem;
    width: 100%;
    border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
  }

  .links-list ul li a{
      padding-left: 2rem;
  }

 
  .words-list ul li .word:hover {
    color: rgb(69, 167, 212);
    cursor: pointer;
  }

</style>
