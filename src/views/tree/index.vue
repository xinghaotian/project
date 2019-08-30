<template>
  <div class="some">
    <el-form ref="ruleForm"
             :model="ruleForm"
             status-icon
             :rules="rules"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="账号"
                    prop="age">
        <el-input v-model.number="ruleForm.age" />
      </el-form-item>
      <el-form-item label="密码"
                    prop="pass">
        <el-input v-model="ruleForm.pass"
                  type="password"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="checkPass">
        <el-input v-model="ruleForm.checkPass"
                  type="password"
                  autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data () {
    // eslint-disable-next-line no-unused-vars
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('成功!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.success {
  margin-top: 50px;
  margin-left: 30px;
}
.some {
  width: 500px;
  margin: 100px auto;
}
</style>
