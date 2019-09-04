<template>
  <div>
    <router-view />
    <el-form
      ref="souForm"
      class="souForm"
      :model="souForm"
      inline
      label-width="80px"
    >
      <!-- <el-form-item label="创建时间">
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
        label="货主"
        label-width="40px"
      >
        <el-input
          v-model="souForm.name"
          placeholder="请输入账号"
          type="text"
        /></el-input>
      </el-form-item>
      <el-form-item
        label="订单号"
        label-width="60px"
      >
        <el-input
          v-model="souForm.a"
          placeholder="请输入订单号"
          type="text"
        /></el-input>
      </el-form-item>
      <el-form-item
        label="出发地"
        label-width="60px"
      >
        <el-input
          v-model="souForm.b"
          placeholder="请输入出发地"
          type="text"
        /></el-input>
      </el-form-item>
      <el-form-item
        label="目的地"
        label-width="60px"
      >
        <el-input
          v-model="souForm.c"
          placeholder="请输入目的地"
          type="text"
        /></el-input>
      </el-form-item>
      <el-form-item
        label="  订单类型"
        label-width="70px"
      >
        <el-select
          v-model="souForm.d"
          placeholder="请选择订单类型"
        >
          <el-option
            label="整车"
            value="整车" 
          />
          <el-option
            label="零担"
            value="零担" 
          />
          <el-option
            label="异常订单"
            value="异常订单" 
          />
          <el-option
            label="投保订单"
            value="投保订单" 
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      class="babel"
      width="100%"
      border
    >
      <el-table-column
        prop="date"
        label="类型"
        width="100"
      >
        整车
      </el-table-column>
      <el-table-column
        prop="name"
        label="货主"
        width="70"
      />
      <el-table-column
        width="120"
        label="订单号"
        prop="trans_no"
      />
      <el-table-column
        prop="addr_from"

        label="出发地"
      />
      <el-table-column

        label="目的地"
        prop="addr_to"
      />
      <el-table-column
        width="80"
        label="总体积"
        prop="volume"
      />
      <el-table-column
        width="60"
        label="总重量"
        prop="weight"
      />
      <el-table-column
        width="160"
        label="创建时间"
        prop="created_at"
      />
      <el-table-column
        width="160"
        label="接单时间"
        prop="updated_at"
      />
      <el-table-column
        width="80"
        label="状态"
      />
      <el-table-column
        prop="delete"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            plain
            @click=" handleDetails (scope.$index, scope.row)"
          >
            运单追踪
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
    />
    <!-- <el-button
type="text"
               @click="dialogTableVisible = true"
>
      打开嵌套表格的 Dialog
    </el-button> -->
  </div>
</template>

<script>

export default {
  name:'Car2',
  data () {
    return {
      page:1,
      total:null,
      // value1:[],
      time:'',
      // 搜索功能表单
      souForm:{
       name:'',
       a:'',
       b:'',
       c:'',
       d:'整车'
      //  begin_pubdate: '', // 开始时间
      //   end_pubdate: '' // 结束时间
      },
      // begin_end_pubdate:[], // 存储日期选择器同步的 [开始时间，结束时间]
      form:{
        subjectID:null,
        time:null
      },
      tableData:[]
     }
  },
  
  
  created(){
    //第一次获取页面数据
    this.handleG()
   },
  methods: {
    // 搜索
    // handleDateChange(value){
    //   this.souForm.begin_pubdate = value[0]
    //   this.souForm.end_pubdate = value[1]
    // },
    // 第一次获取页面数据
    handleG(){
      let id = JSON.parse(window.localStorage.getItem('user_info')).id
      this.$http({
        method:'POST',
        url:'/third/orders',
        data:{
          external_id:id,
          type:1,
          per_page:10
        }
      }).then(res=>{
        console.log(res.data.data)
        this.tableData = res.data.data
        this.total=res.data.total
      }).catch(err=>{
        throw err
      })
    },
    // 详情
    handleDetails(index, row){
      this.$router.push({
              path: `/details/${index}`,
            })
    }
    // handleEdit (index, row) {
    //   this.$router.push({
    //           path: `/depot/${index}`,
    //         })
    // },
    // handleDelete (index, row) {
    //   // this.$router.push('/driver')
    //   console.log(index, row)
    //   // this.$router.push({
    //   //         path: `/driver/${index}`,
    //   //       })
    // }
  }
}
</script>

<style>
.form{
  margin-top: 20px;
  margin-left: 20px;
}
/* .babel{
  margin: 0px 20px 20px 20px
} */
/* .el-table {
  margin: 0px, 20px, 20px, 20px;
} */
.cell {
  text-align: center;
}
.el-pagination {
  margin-top: 30px;
  float: right;
  padding-right: 100px;
}
.souForm{
  margin-top: 20px;
}
.app-main{
  padding-left: 10px;
}

</style>
