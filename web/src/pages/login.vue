<template>
    <div class="login-container">
      <div class="login-header">
        登陆
      </div>
      <div class="login-content">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
          <FormItem label="账号" prop="account">
            <Input type="text" v-model.sync="formCustom.account"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" v-model.sync="formCustom.password"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
            <Button type="default" @click="handleReset('formCustom')" style="margin-left: 50px">注册</Button>
          </FormItem>
        </Form>
      </div>
    </div>
</template>

<script>
  import api from '../http/api.js'
  export default {
    data() {
      return {
        formCustom: {
          account: '',
          password: ''
        },
        ruleCustom: {
          password: [{
            required: true,
            messpassword: 'The password cannot be empty',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      handleSubmit(account) {
        let self = this;
        this.$refs[account].validate((valid) => {
          if (valid) {
            api.login(this.formCustom).then(e=>{})
            // this.axios.post('http://localhost:3000/api/login', this.qs.stringify({
            //     'account': this.formCustom.account,
            //     'password': this.formCustom.password
            //   }), {
            //     headers: {
            //       'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            //   })
            //   .then(function(res) {
            //     console.log(res)
            //     if(res.data.result){
            //        self.$Message.success('提交成功!');
            //       self.$router.push({ path:'/home'  })
            //     }
            //   })
          }
        })
      },
      handleReset(account) {
        this.$router.push({ path:'/home'  })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .login-container {
      width: 400px;
      margin:30vh auto 0;
      background: #91D5FF;
      border-radius:10px;
      opacity:0.8;
      .login-header {
        width: 100%;
        padding: 10px 0;
        font-size: 30px;
        color: #FFFFFF;
        letter-spacing: 5px;
      }

      .login-content {
        display: flex;
        justify-content: center;
      }
    }
</style>
