<template>
  <div>
    <el-form
      ref="souForm"
      class="souForm"
      :model="souForm"
      inline
      label-width="80px"
    >
      <el-form-item
        label="类型"
        label-width="60px"
      >
        <el-select
          v-model="souForm.type"
          placeholder="请选择类型"
        >
          <el-option
            label="短驳"
            value="5"
          />
          <el-option
            label="长途"
            value="6" 
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleS"
        >
          搜索
        </el-button>
      </el-form-item>
      <el-button
        class="xuan"
        type="primary"
        @click="handleXU"
      >
        选中发单
      </el-button>
    </el-form>
  
    <el-table
      v-loading="articleLoading"
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
      />
      <el-table-column
        prop="role_id"
        label="角色"
        align="center" 
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.role_id == 5 ? '短驳':'长途' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        align="center" 
        label="司机姓名"
        width="80"
      />
      <el-table-column
        prop="tel"
        label="手机号"
        align="center" 
      >
        121243615245
      </el-table-column>
      <el-table-column
        prop="address"
        align="center" 
        label="注册时间"
      />
      <el-table-column
        prop="inviter"
        label="推荐人"
        align="center" 
      />
      <el-table-column
        prop="auth"
        label="是否实名"
        align="center" 
      >
        <template slot-scope="scope">
          {{ scope.row.auth == 1? '未实名' : '已实名' }}
        </template>
      </el-table-column>
      <el-table-column
        align="center" 
        prop="status"
        label="接单状态"
      >
        <template slot-scope="scope">
          {{ scope.row.status == 1? '接单中' : '暂停接单' }}
        </template>
      </el-table-column>
      <el-table-column
        align="center" 
        prop="address"
        label="注册地址"
      />
      <el-table-column
        align="center" 
        prop="inviter_count"
        label="邀请总数"
      />
      <el-table-column
        align="center" 
        prop="x"
        label="身份证号"
      />
      <el-table-column
        prop="delete"
        align="center" 
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >
            发单
          </el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            货站
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="success"

      class="elbutton"
      @click="handleGo"
    >
      返回上一页
    </el-button>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      regId:'',
      total:null,
      page:1,
      articleLoading:false,
      tableData:null,
      souForm:{
        type:null
      }
    }
  },
  created(){
    this.handleC()
  },
  methods: {
    handleGo(){
       this.$router.go(-1)
    },
    handleEdit (index, row) {
     console.log(row)
      var regId = row.regId
     this.$http({
       method:'POST',
       url:'/common/shipperPush',
       data:{
         type:'driver',
         regId,
       }
     }).then(res=>{
       console.log(res)
       this.$message({
          message: '发单成功',
          type: 'success'
        })
     }).catch(err=>{
        this.$message.error('发单失败！')
       throw err
     })


    },
    handleSelectionChange(val){
      this.regId = (val.map(item=>item.regId)).join()
    },
    handleCurrentChange(page){
      let type = this.souForm.type
      this.page = page
      this.handleC(type,page)
    },
// 搜索
   handleS(){
    let type =  this.souForm.type
    this.handleC(type)
   },
    handleC(type=0,page=1){
      this.articleLoading = true
      this.$http({
        method:'POST',
        url:'/third/drivers',
        data:{
          page,
          type
        }
      }).then(res=>{
        // console.log(res)
        this.tableData = res.data.data
        this.total = res.data.total
        this.articleLoading = false
        
      }).catch(err=>{
        throw err
      })
    },
    //选中发单
    handleXU(){
      // console.log(this.regId)
    if(this.regId){
       this.$http({
       method:'POST',
       url:'/common/shipperPush',
       data:{
         type:'driver',
         regId:this.regId
       }
      }).then(res=>{
      //  console.log(res)
       this.$message({
          message: '发单成功',
          type: 'success'
        })
      }).catch(err=>{
        this.$message.error('发单失败!')
       throw err
     })
    }else{
      this.$message.error('发单失败!请选中!')
    }
    }

    
  }
}
</script>

<style scoped>
.elbutton{
  margin-left: 30px;
  margin-top: 30px;
}
.el-table {
  padding: 20px, 20px, 20px, 20px;
}
.cell {
  text-align: center;
}
.el-pagination {
  margin-top: 30px;
  float: right;
  padding-right: 100px;
}
.souForm{
  margin-top:30px;
  position: relative;
}
.xuan{
position: absolute;
right: 35px;
bottom: 0;
}
.el-button{
  margin-bottom: 30px;
}
</style>
