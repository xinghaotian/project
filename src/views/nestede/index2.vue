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

      <!-- <el-form-item
        label="货主"
        label-width="40px"
      >
        <el-input
          v-model="souForm.name"
          placeholder="请输入账号"
          type="text"
        />
      </el-form-item> -->
      <el-form-item
        label="订单号"
        label-width="60px"
      >
        <el-input
          v-model="souForm.trans_no"
          placeholder="请输入订单号"
          type="text"
        />
      </el-form-item>
      <el-form-item
        label="出发地"
        label-width="60px"
      >
        <el-input
          v-model="souForm.addr_from"
          placeholder="请输入出发地"
          type="text"
        />
      </el-form-item>
      <el-form-item
        label="目的地"
        label-width="60px"
      >
        <el-input
          v-model="souForm.addr_to"
          placeholder="请输入目的地"
          type="text"
        />
      </el-form-item>
      <!-- <el-form-item
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
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="articleLoading"
      :data="tableData"
      class="babel"
      width="100%"
      empty-text="搜索结果为空"
      border
    >
      <el-table-column
        prop="type"
        label="类型"
        width="50"
        align="center" 
      >
        <template slot-scope="scope">
          {{ scope.row.type == 1? '整车':'零担' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="货名"
        align="center" 
        width="70"
      />
      <el-table-column
        width="120"
        label="订单号"
        align="center" 
        prop="trans_no"
      />
      <el-table-column
        prop="addr_from"
        align="center" 
        label="出发地"
      />
      <el-table-column
        align="center" 
        label="目的地"
        prop="addr_to"
      />
      <el-table-column
        align="center" 
        width="80"
        label="总体积"
        prop="volume"
      />
      <el-table-column
        align="center" 
        width="60"
        label="总重量"
        prop="weight"
      />
      <el-table-column
        align="center" 
        width="100"
        label="创建时间"
        prop="created_at"
      />
      <el-table-column
        align="center" 
        width="100"
        label="接单时间"
        prop="updated_at"
      />
      <el-table-column
        align="center" 
        width="180"
        prop="order_type"
        label="状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.order_type == 1">订单发布</span>
          <span v-if="scope.row.order_type == 4">订单接单</span>
          <span v-if="scope.row.order_type == 7">报价审核中</span>
          <span v-if="scope.row.order_type == 9">货站报价不合理</span>
          <span v-if="scope.row.order_type == 10">司机报价不合理</span>
          <span v-if="scope.row.order_type == 11">司机拒绝平台报价</span>
          <span v-if="scope.row.order_type == 12">货站拒绝平台报价</span>
          <span v-if="scope.row.order_type == 13">司机同意平台报价</span>
          <span v-if="scope.row.order_type == 15">货站同意平台</span>
          <span v-if="scope.row.order_type == 16">报价审核通过</span>
          <span v-if="scope.row.order_type == 17">等待货站支付</span>
          <span v-if="scope.row.order_type == 19">货主拒绝支付</span>
          <span v-if="scope.row.order_type == 20">货站拒绝支付</span>
          <span v-if="scope.row.order_type == 21">货站同意（第一次）支付价格</span>
          <span v-if="scope.row.order_type == 22">货主同意（第一次）支付价格</span>
          <span v-if="scope.row.order_type == 23">货站合并订单</span>
          <span v-if="scope.row.order_type == 24">货站选择自己的去货主取货 已经上传相关信息</span>
          <span v-if="scope.row.order_type == 25">预约时间</span>
          <span v-if="scope.row.order_type == 28">取货途中</span>
          <span v-if="scope.row.order_type == 31">取货</span>
          <span v-if="scope.row.order_type == 34">货物不属实</span>
          <span v-if="scope.row.order_type == 37">司机二次报价</span>
          <span v-if="scope.row.order_type == 40">平台二次审核报价审核中</span>
          <span v-if="scope.row.order_type == 41">货站二次审核报价审核中</span>
          <span v-if="scope.row.order_type == 42">货站二次报价不合理</span>
          <span v-if="scope.row.order_type == 43">司机二次报价不合理</span>
          <span v-if="scope.row.order_type == 44">货站二次报价同意平台报价</span>
          <span v-if="scope.row.order_type == 46">司机二次报价同意平台报价</span>
          <span v-if="scope.row.order_type == 47">司机拒绝二次平台报价</span>
          <span v-if="scope.row.order_type == 48">货站拒绝二次平台报价</span>
          <span v-if="scope.row.order_type == 49">司机二次报价审核通过</span>
          <span v-if="scope.row.order_type == 50">货站二次报价审核通过</span>
          <span v-if="scope.row.order_type == 52">货主拒绝支付</span>
          <span v-if="scope.row.order_type == 55">货主拒绝支付</span>
          <span v-if="scope.row.order_type == 58">确定发货(司机)</span>
          <span v-if="scope.row.order_type == 59">货主确定发货</span>
          <span v-if="scope.row.order_type == 60">司机到达目的地</span>
          <span v-if="scope.row.order_type == 61">配送完成</span>
          <span v-if="scope.row.order_type == 62">零担货物送货上门进行收货 货站</span>
          <span v-if="scope.row.order_type == 63">货站选择自己车未中转</span>
          <span v-if="scope.row.order_type == 64">货站选择自己车中转中</span>
          <span v-if="scope.row.order_type == 65">货站选择自己车中转完成</span>
          <span v-if="scope.row.order_type == 67">货主确认收货</span>
          <span v-if="scope.row.order_type == 70">货主确认收到回执单 订单最后步骤</span>
          <span v-if="scope.row.order_type == 73">司机拒绝接单</span>
          <span v-if="scope.row.order_type == 88">订单异常</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center" 
        prop="delete"
        label="下发操作"
        width="280"
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
          <el-button
            size="mini"
            type="success"
            plain
            @click=" handleEdit (scope.$index, scope.row)"
          >
            司机
          </el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            @click="$router.push(`/driver/${scope.$index}`)"
          >
            货站
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      @current-change="handleCurrentChange"
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
  name:'Cara',
  data () {
    return {
      articleLoading:false, // 表格状态
      page:1,// 当前页码
      total:null,// 总数据条数
      tableData:[],// 数据列表
      value1:[],
      time:'',
      // 搜索功能表单
      souForm:{
       trans_no:'',
       addr_from:'',
       addr_to:'',
       order_type:'70'
      //  begin_pubdate: '', // 开始时间
      //   end_pubdate: '' // 结束时间
      },
      // begin_end_pubdate:[], // 存储日期选择器同步的 [开始时间，结束时间]
      form:{
        subjectID:null,
        time:null
      }
      
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

    onSubmit(){
      this.page =1
      this.handleG()
    },
    handleCurrentChange(page){
      this.page = page
      this.handleG(page)
    },
    // 第一次获取页面数据
    handleG(page=1){
      this.articleLoading = true
      let id = JSON.parse(window.localStorage.getItem('user_info')).id
      const souFormm = {}
      for (let key in this.souForm) {
        if (this.souForm[key]) {
          souFormm[key] = this.souForm[key]
        }
      }
      this.$http({
        method:'POST',
        url:'/third/orders',
        data:{
          external_id:id,
          type:'1,2',
          page,

          per_page:10,
          ...souFormm
        }
      }).then(res=>{
        // console.log(res.data.data)
        this.tableData = res.data.data
        this.total=res.data.total
        this.articleLoading = false
      }).catch(err=>{
        throw err
      })
    },
    // 详情
    handleDetails(index, row){
      // console.log(row)
      let id = row.id
      let type = row.type
      this.$router.push({
              path: `/details`,
              query:{
                id,
                type
              }
            })
    },
    handleEdit (index, row) {
      // console.log(row)
      this.$router.push({
              path: `/depot/${index}`,
            })
    },
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

<style scoped>
.form{
  margin-top: 20px;
  margin-left: 20px;
}
.app-main{
  padding-left: 10px;
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
.el-form-item__content{
  width:240px
}
</style>
