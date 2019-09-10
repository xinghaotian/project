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
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="begin_end_pubdate"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleDateChange"
        />
      </el-form-item>
      <el-form-item
        label="订单号"
        label-width="60px"
      >
        <el-input
          v-model="souForm.name"
          placeholder="请输入订单号"
          type="text"
        />
      </el-form-item>
      <!-- <el-form-item
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
      </el-form-item> -->
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
          @click="handleS"
        >
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
      <!-- <el-table-column
        width="80"
        label="总体积"
        prop="volume"
      />
      <el-table-column
        width="60"
        label="总重量"
        prop="weight"
      /> -->
      <el-table-column
        width="180"
        label="创建时间"
        prop="spike_time"
      />
      <!-- <el-table-column
        width="160"
        label="接单时间"
        prop="updated_at"
      />
      <el-table-column
        width="80"
        label="状态"
      /> -->
      <el-table-column
        prop="delete"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            plain
            @click=" handleDetails (scope.$index, scope.row)"
          >
            查看节点
          </el-button>
          <!-- <el-button
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
          </el-button> -->
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
    <el-dialog
      title="位置"
      :visible.sync="dialogVisible"
      width="65%"
    >
      <!-- 地图控件 -->
      <baidu-map
        class="map"
        :center="center"
        :zoom="zoom"
        @ready="handler"
      >
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" />
        <bm-marker
          :position="center"
          :dragging="true"
          animation="BMAP_ANIMATION_BOUNCE"
        />
      </baidu-map>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div class="blockk">
          <table
            class="tablee"
            :tableData1="tableData1"
            cellspacing="0"
            cellpadding="0"
          >
            <tbody>
              <tr>
                <td>创建时间</td>
                <td>{{ tableData1.created_at }}</td>
              </tr>
              <tr>
                <td>接单时间</td>
                <td>{{ tableData1.spike_time }}</td>
              </tr>
              <tr>
                <td>预约上门</td>
                <td>{{ tableData1.appoint_time }}</td>
              </tr>
              <tr>
                <td>司机装货</td>
                <td>{{ tableData1.deliver_time }}</td>
              </tr>
              <tr>
                <td>订单完成</td>
                <td>{{ tableData1.finish_time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name:'Car3',
  data () {
    return {
      // 时间线
      //  reverse: false,
      //   activities: [{
      //     content: '活动按期开始',
      //     timestamp: '2018-04-15'
      //   }, {
      //     content: '通过审核',
      //     timestamp: '2018-04-13'
      //   }, {
      //     content: '创建成功',
      //     timestamp: '2018-04-11'
      //   }],
        // 地图属性
      center: {lng: 0, lat: 0},
      zoom: 3,
      dialogVisible:false,
      page:1,
      total:null,
      value1:[],
      time:'',
      tableData1:{},
      // 搜索功能表单
      souForm:{
       name:'',
       start: '', // 开始时间
        end: '' // 结束时间
      },
      begin_end_pubdate:[], // 存储日期选择器同步的 [开始时间，结束时间]
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
    // 地图控件
    handler ({BMap, map}) {
      // console.log(BMap, map)
      
      this.center.lng = 116.49913
      this.center.lat = 40.037239
      this.zoom = 13
    },
    // 搜索
    handleDateChange(value){
      this.souForm.start = value[0]
      this.souForm.end = value[1]
    },
    // 第一次获取页面数据
    handleG(page=1){
      let id = JSON.parse(window.localStorage.getItem('user_info')).id
      const souFormm = {}
      for (let key in this.souForm) {
        if (this.souForm[key]) {
          souFormm[key] = this.souForm[key]
        }
      }
      this.$http({
        method:'POST',
        url:'/order/orderWaySearch',
        data:{
          external_id:id,
          limit:10,
          page,
          ...souFormm
        }
      }).then(res=>{
        console.log(res)
        this.tableData = res.data.data
        this.total=res.data.total


      }).catch(err=>{
        throw err
      })
    },
    handleCurrentChange(page){
      this.page = page
      this.handleG(page)
    },
    //搜索
    handleS(){
     this.handleG()
    },
    // 详情
    handleDetails(index, row){
      console.log(row)
              //地图
        this.center.lat = row.latitude
        this.center.lng = row.longitude
      this.dialogVisible = true
      this.tableData1 = row
    },
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
.map{
  width: 565px!important;
  height: 400px !important;
  margin-left: 30px!important;
}
.el-dialog__body{
  padding: 0;
  width: 400px;
 position: relative;

}
.blockk{
  display: block;
  position: absolute;
  top: 70px;
  right: 40px;
}
.blockk table{
  border: 1px solid #666;
  color:#666;
  background-color: #fff;
}
.blockk table td{
border: 1px solid #666;
text-align: left;
padding: 5px 10px;
}
</style>
