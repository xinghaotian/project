<template>
  <div class="app-container">
    <el-form
      ref="souForm"
      :model="souForm"
      inline
      label-width="50px"
    >
      <!-- <el-form-item label="时间">
        <el-date-picker
          v-model="begin_end_pubdate"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleDateChange"
        />
      </el-form-item> -->
      <el-form-item
        label="账号"
      >
        <el-input
          v-model="souForm.name"
          placeholder="请输入账号"
        /></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="form"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="账号"
        width="120"
        prop="name"
      />
      <el-table-column
        align="center"
        label="姓名"
        width="100"
        prop="company_name"
      />
      <el-table-column
        label="电话"
        width="110"
        prop="phone"
      />
      <el-table-column
        label="注册日期"
        width="100"
        align="center"
        prop="updated_at"
      />
      
  
      <el-table-column
        label="备注"
        width="150"
        prop="remark"
      />
     
      <el-table-column
        label="已完成订单"
        width="110"
      />
      <el-table-column
        label="在途订单"
        width="100"
      />
      <el-table-column
        label="已发订单"
        width="100"
      />

      <el-table-column
        align="center"
        prop="created_at"
        label="操作"
      >
        <template slot-scope="scope">
          <div class="flex">
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)"
            >
              <i class="el-icon-view" />详情
            </el-button>
            <!-- <el-button
              size="mini"
              type="primary"
            >
              <i class="el-icon-edit-outline" />编辑
            </el-button> -->
            <el-button
              size="mini"
              type="danger"
            >
              <i class="el-icon-delete" />删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
    />
    <el-dialog
      top="5vh"
      width="50%"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="list"
        :model="list"
        :disabled="edit"
      >
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="list.company_name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="电话"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="list.phone"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="注册日期"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="list.created_at"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="账号"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="list.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="备注"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="list.remark"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="已完成订单"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="list.e"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="在途订单"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="list.f"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="已发订单"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="list.o"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleC()">
          退出
        </el-button>
        <el-button
          type="primary"
          @click="handleB()"
        >
          {{ this.edit ? '编辑':'提交' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  // http://abc.bjlitian.com:8111/api/third/shippers
  data () {
    return {
      total:30,
      souForm:{
       name:'',
      //  begin_pubdate: '', // 开始时间
      //   end_pubdate: '' // 结束时间
      },
      // begin_end_pubdate:[], // 存储日期选择器同步的 [开始时间，结束时间]

      edit:true,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      list: {
      },
      listLoading: true,
      form:null
    }
  },
  created () {
    // 第一次获取页面信息
    this.handleG()
    this.fetchData()
  },
  methods: {
    // 搜索
    // handleDateChange(value){
    //   this.filterParams.begin_pubdate = value[0]
    //   this.filterParams.end_pubdate = value[1]
    // },
    // 第一次获取页面信息
    handleG(){
      let id = JSON.parse(window.localStorage.getItem('user_info')).id
      this.$http({
        method:'POST',
        url:'/third/shippers',
        data:{
          external_id:id,
          per_page:10
        }
      }).then(res=>{
        this.form = res.data.data
        console.log(res)
      }).catch(err=>{
        throw err
      })
    },
    // 详情
    handleEdit(index, row){
      console.log(row)
      this.list = row
    this.dialogFormVisible = true
    },
    // 详情页面编辑
    // dialogFormVisible = false 关闭弹窗
    handleB(){
    this.edit = !this.edit
    // 下面是提交操作

    },
    // 退出
    handleC(){
      if(this.edit){
        this.dialogFormVisible = false
      }else{
        this.$confirm('还未提交, 是否继续退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          this.dialogFormVisible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          });          
        });
      }
      

  
    },
    fetchData () {
      this.listLoading = false
    },
  }
}
</script>
<style>
.el-dialog{
  width: 50%;
}
.el-input{
  width: 400px;
}
.flex {
  display: flex;
}
.el-button {
  flex: 1;
}
.cell {
  text-align: center;
}
.el-input__inner{
  width: 300px;
}
.el-input{
  width: 300px;
}
.el-pagination{
  margin-top: 20px;
  float: right;
  padding-right:0px;
}
</style>


