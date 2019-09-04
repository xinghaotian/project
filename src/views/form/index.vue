<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      :disabled="edit"
    >
      <el-form-item
        label="店铺名称"
        style="width:500px"
      >
        <el-input v-model="form.shop_name" />
      </el-form-item>
      <el-form-item
        label="店铺Logo"
        style="width:500px"
      >
        <el-upload
          class="avatar-uploader"
          action="http://abc.bjlitian.com:8111/api/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon" 
          />
        </el-upload>
      </el-form-item>
      <el-form-item label="营业执照">
        <el-upload
          class="avatar-uploader1"
          action="http://abc.bjlitian.com:8111/api/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload1"
        >
          <img
            v-if="imageUrl1"
            :src="imageUrl1"
            class="avatar1"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon" 
          />
        </el-upload>
      </el-form-item>
      <el-form-item
        label="公司地址"
        style="width:500px"
      >
        <el-input
          v-model="form.shop_addr"
          :disabled="edit"
        />
      </el-form-item>
      <el-form-item
        label="联系人"
        style="width:500px"
      >
        <el-input v-model="form.concat" />
      </el-form-item>
      <el-form-item
        label="手机号"
        style="width:500px"
      >
        <el-input v-model="form.shop_phone" />
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      class="onSubmit"
      @click="onSubmit"
    >
      {{ this.edit ? '编辑':'提交' }}
    </el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
       imageUrl: '', // 头像
       imageUrl1: '', // 营业执照
      edit:true,
      dialogVisible: false,
      form: {
        external_id:'', //  ID
        shop_phone:'', // 手机号
        shop_name:'', // 店铺名称
        shop_avatar:'', //店铺logo
        shop_license:'',// 营业执照
        shop_addr:'', // 公司地址
        concat:'' // 联系人
      },

    }
  },
  created(){
    this.handleUser()
  },
  methods: {
    // 页面加载获取用户店铺信息
    handleUser(){
      var id = JSON.parse(window.localStorage.getItem('user_info')).id
      this.$http({
        method:'POST',
        url:'/third/shopInfo',
        data:{
          external_id:id
        }

      }).then(res=>{
        // console.log(1)
        // console.log(res)
        // console.log(2)
        // var de = delete res.data.id
         this.form.external_id = res.data.external_id
         this.form.shop_phone = res.data.shop_phone
         this.form.shop_name = res.data.shop_name
         this.form.shop_avatar = res.data.shop_avatar
         this.form.shop_license = res.data.shop_license
         this.form.shop_addr = res.data.shop_addr
         this.form.concat = res.data.concat
         this.imageUrl = res.data.shop_avatar
         this.imageUrl1 = res.data.shop_license
      }).catch( err=>{
        throw err
      })
    },
    onSubmit () {
      this.edit = !this.edit
      if(this.edit){
        // 这里是提交操作
        this.$http({
          method:'POST',
          url:'/third/createShop',
          data:this.form
        }).then(res=>{
          // console.log(res)
          // this.$store.commit('changeUser', res.data)
          this.$message({
          message: '修改成功',
          type: 'success'
        })
        }).catch(err=>{
          throw err
        })
        console.log('提交成功')
      }
      
    },
    //头像上传
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res)
        this.form.shop_avatar ='http://abc.bjlitian.com:8111/'+res.data.file
        // http://abc.bjlitian.com:8111/externals/September2019/lvenzRQ1pIHcAIGBaNjW.jpg"

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

    // 营业执照
     handleAvatarSuccess1(res, file) {
        this.imageUrl1 = URL.createObjectURL(file.raw);
        console.log(res)
        this.form.shop_license ='http://abc.bjlitian.com:8111/'+res.data.file


      },
      beforeAvatarUpload1(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

  }
}
</script>

<style scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar1{
    width: 220px;
    height: 330px;
    display: block;
    border-radius: 6px

  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 6px
  }
.onSubmit{
  margin-left: 70px;
}
.line {
  text-align: center;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-form-item__content{
  width: 200px;
}
</style>

