<template>
  <div class="article">
    article
  </div>
</template>

<script>
  export default {
    created(){
        this.getArticleById();
    },
    methods: {
        getArticleById(){
            let aid = this.$route.query.aid;
            this.axios('/getArticleById',this.$qs.stringify(aid)).then(res=>{
                console.log(res);
            })
        }
    },
  }

</script>

<style scoped>

</style>
