<template>
  <div class="container">
    <div class="header">注册</div>
    <Form ref="formCustom" :model="formCustom" :label-width="80">
      <FormItem label="账号" prop="account">
        <Input type="text" v-model.sync="formCustom.account"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="text" v-model.sync="formCustom.password"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
        <Button type="default" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formCustom: {
          account: '',
          password: ''
        }
      }
    },
    watch: {

    },
    methods: {
      handleSubmit(name) {
        let self = this;
        if(this.account===''||this.password===''){
          self.$Message.error('账号或密码不能为空！')
          return;
        }
        this.axios.post('http://localhost:3000/api/add', this.qs.stringify({
            'account': this.formCustom.account,
            'password': this.formCustom.password
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(function(res) {
            self.$Message.success('注册成功!');
          })

      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    },
    mounted() {}
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 50%;
    margin: auto;

    .header {
      width: 100%;
      padding: 20px 0;
      font-size: 30px
    }
  }
</style>
