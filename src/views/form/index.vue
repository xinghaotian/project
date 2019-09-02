<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
    >
      <el-form-item
        label="店铺名称"
        style="width:500px"
      >
        <el-input v-model="form.name" />
      </el-form-item>

      <!-- <el-form-item label="营业执照">
        <el-row>
          <el-col
           v-for="(o, index) in 2"
                  :key="o"
                  :span="8"
                  :offset="index > 0 ? 2 : 0"
             >
            <el-card :body-style="{ padding: '0px' }">
              <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                   class="image"
         >
              <div style="padding: 14px;">
                <span>营业执照</span>
                <div class="bottom clearfix">
                  <el-button
                    type="text"
                             class="button"
                       >
                    操作按钮
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item> -->
      <el-form-item label="营业执照">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img
            width="100%"
            :src="dialogImageUrl"
            alt=""
          >
        </el-dialog>
      </el-form-item>

      <el-form-item label="城市">
        <el-select
          v-model="form.province"
          placeholder="请选择城市"
          style="width:150px"
          @change="setCity"
        >
          <el-option
            v-for="item in provinceOptions"
            :key="item"
            :value="item"
            :label="item"
          />
        </el-select>
        <el-select
          v-model="form.city"
          placeholder="请选择地区"
          style="width:150px"
        >
          <el-option
            v-for="item in cityOptions"
            :key="item"
            :value="item"
            :label="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="公司地址"
        style="width:500px"
      >
        <el-input v-model="form.dz" />
      </el-form-item>
      <el-form-item
        label="联系人"
        style="width:500px"
      >
        <el-input v-model="form.desc" />
      </el-form-item>
      <el-form-item
        label="手机号"
        style="width:500px"
      >
        <el-input v-model="form.tel" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { provinces as provincesFn , citys as citysFn} from '@/api/city.js'
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        tel:'',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        province: null, // 省
        city: null // 市
      },
      //省级选项
      provinceOptions:provincesFn(),
      //市级选项
      cityOptions:[],

    }
  },
  methods: {
    setCity (cityName) {
      this.form.city = null
      this.cityOptions = citysFn(cityName)
    },
    onSubmit () {
      this.$message('submit!')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>
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

