  <template>
    <div class="post">
      <div class="box">
        <div class="post-message">
          <p>
            <span class="iconfont">&#xe669;</span>
            <span>发表留言</span>
          </p>
        </div>
        <div class="input-group">
          <label for="nickName">昵称：</label>
          <input type="text" placeholder="必填" id="nickName" v-model="nickName" >
        </div>
        <div class="input-group">
          <label for="email">邮箱：</label>
          <input type="text" placeholder="可填，保密" id="email" v-model="email" spellcheck="false">
        </div>
        <div class="input-group">
          <label for="url">网址：</label>
          <input type="text" placeholder="可填" id="url" v-model="url" spellcheck="false">
        </div>
        <div class="clear-fix"></div>
        <div class="textarea-group">
          <textarea name="message" id="message" class="textarea" placeholder="走心，走肾，不如走留言" v-model="message" spellcheck="false"></textarea>
        </div>
        <button class="btn" @click="submit">确认提交</button>
      </div>
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          nickName: '',
          email: '',
          url: '',
          message: '',
        }
      },
      methods: {
        checkInfo() {
          if (this.nickName.trim() == '') {
            this.$message.error('昵称不为空');
            return false;
          } else if (!this.Utils.checkEmail(this.email)) {
            this.$message.error('邮箱格式不正确');
            return false;
          } else if (this.message.trim() == '') {
            this.$message.error('走心留言不为空');
            return false;
          } else if (this.message.trim().length > 100) {
            this.$message.error('走心留言少于100个汉字');
            return false;
          }
          return true;
        },
        submit() {
          if (this.checkInfo()) {
            let guestBook = {
              userName: this.Utils.html_encode(this.nickName),
              guestbookContent: this.Utils.html_encode(this.message),
              guestbookUrl: this.Utils.html_encode(this.url),
            };
            this.axios.post('/user/guestBook', guestBook).then(res => {
              if(res.data.code == 0){
                this.$EventBus.$emit('addGuestBook', res.data.data);
                this.$message.success('发表成功');
              }
            })
          }
        },
      },

    }

  </script>

  <style scoped>
    .post {
      width: 100%;
      background: #fff;
      padding-bottom: 1rem;
    }

    .post-message {
      width: 100%;
      margin-bottom: 1.5rem;
    }

    .post-message p {
      padding: .8rem;
      border-bottom: 1px solid #ccc;
    }

    .input-group {
      word-break: break-all;
      float: left;
      width: 32%;
    }

    .input-group input {
      border: 1px solid #ccc;
      width: 11rem;
      padding: .4rem;
      margin-top: -.2rem;
      border-radius: 3px;
    }

    input:focus {
      border: 1px solid #666;
    }

    input::placeholder {
      color: #999;
    }

    textarea::placeholder {
      color: #999;

    }

    textarea:focus {
      border: 1px solid #666;
    }

    .textarea-group {
      margin: 1rem 0;
    }

    .textarea {
      width: 92%;
      height: 10rem;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }

    .btn {
      width: 6rem;
      height: 3rem;
      line-height: 3rem;
      border-radius: 5px;
      background: #3690cf;
      color: #fff;
      cursor: pointer;
    }

    @media screen and (max-width:980px) {
      .input-group {
        width: 100%;
        margin-bottom: 1rem;
      }

      .textarea-group {
        margin-top: 0;
      }

      .textarea {
        width: 85%;
      }
    }

  </style>
