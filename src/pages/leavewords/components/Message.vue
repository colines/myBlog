<template>
  <div class="message">
    <message-header></message-header>
    <post-message></post-message>
    <message-content></message-content>
  </div>
</template>

<script>
  import MessageHeader from './components/MessageHeader'
  import MessageContent from './components/MessageContent'
  import PostMessage from './components/PostMessage'
  export default {
      components:{
        MessageHeader,
        MessageContent,
        PostMessage,
      }

  }

</script>

<style scoped>
  .message {
    z-index: 1;
    margin-top: 8rem;
    max-width: 960px;
    display: block;
    margin-right: 260px;
    background: #fff;
    width: 650px;
    box-shadow: 0px 2px 5px rgb(199, 198, 198);
    padding: 25px;
  }
  @media screen and (max-width:980px) {
    .message{
      width: 100%;
    }
  }

</style>
