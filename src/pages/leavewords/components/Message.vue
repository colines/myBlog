<template>
  <div class="message-box">
    <div class="message">
      <message-header></message-header>
      <post-message></post-message>
      <message-content></message-content>
    </div>
  </div>
</template>

<script>
  import MessageHeader from './components/MessageHeader'
  import MessageContent from './components/MessageContent'
  import PostMessage from './components/PostMessage'
  export default {
    components: {
      MessageHeader,
      MessageContent,
      PostMessage,
    }

  }

</script>

<style scoped>
  .message-box{
    z-index: 1;
    margin-top: 4rem;
    display: flex;
    max-width: 960px;
  }
  .message {
    display: block;
    width: 700px;
    max-width: 100%;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 2px 5px rgb(199, 198, 198);
    padding: 0 2rem;
    box-sizing: border-box;
  }

  @media screen and (max-width:980px) {
    .message {
      width: 100%;
    }
  }

</style>
