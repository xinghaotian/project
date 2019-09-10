<template>
  <div class="some">
    <h2>添加合同制用户</h2>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="公司名称"
        prop="company_name"
      >
        <el-input v-model="ruleForm.company_name" />
      </el-form-item>
      <el-form-item
        label="备注"
        prop="remark"
      >
        <el-input v-model="ruleForm.remark" />
      </el-form-item>
      <el-form-item
        label="账号(手机号)"
        prop="phone"
      >
        <el-input v-model.number="ruleForm.phone" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="password_confirmation"
      >
        <el-input
          v-model="ruleForm.password_confirmation"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name:'AddH',
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            
              callback();
            
          }
        }, 1000);
      };
      var checkBge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }

              callback();

      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.password_confirmation !== '') {
            this.$refs.ruleForm.validateField('password_confirmation');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          password: '',
          password_confirmation: '',
          phone:'',
          company_name:'',
          remark:'',
          auth:2
        },
        rules: {
          company_name:[{ validator: checkBge, trigger: 'blur' }],
          remark:[{ validator: checkBge, trigger: 'blur' }],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password_confirmation: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let that = this
        let id = JSON.parse(window.localStorage.getItem('user_info')).id
        that.ruleForm.external_id = id
        that.$refs[formName].validate((valid) => {
          if (valid) {
            that.$http({
              method:'POST',
              url:'/third/createShipper',
              data:this.ruleForm
            }).then((res)=>{
              // console.log(res)
              if(res.code !== 200){
                that.$message.error(res.msg);
                     
              }else{
              that.$message({
              message: '提交成功',
              type: 'success'
              });
          that.$router.push({path:'/example/table'})
              }
             

            }).catch(()=>{

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style>
h2{
  text-align: center;
}
.success {
  margin-top: 50px;
  margin-left: 30px;
}
.some {
  width: 500px;
  margin: 100px auto;
}
</style>
