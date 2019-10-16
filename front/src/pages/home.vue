<template>
  <div class="container">
    <div class="header">表单</div>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
      <FormItem label="名字" prop="name">
        <Input type="text" v-model.sync="formCustom.name"></Input>
      </FormItem>
      <FormItem label="年龄" prop="age">
        <Input type="text" v-model.sync="formCustom.age"></Input>
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
          name: '',
          age: ''
        },
        ruleCustom: {
          age: [{
            required: true,
            message: 'The age cannot be empty',
            trigger: 'blur'
          }]
        }
      }
    },
    watch: {

    },
    methods: {
      handleSubmit(name) {
        let self=this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.axios.post('http://localhost:3000/api/add', this.qs.stringify({
                'name': this.formCustom.name,
                'age': parseInt(this.formCustom.age)
              }), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              })
              .then(function(res) {
                self.$Message.success('提交成功!');
                console.log(res.data)
              })
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    },
    mounted() {
    }
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
