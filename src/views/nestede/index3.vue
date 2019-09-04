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
        label="货主"
        label-width="40px"
      >
        <el-input
          v-model="souForm.name"
          placeholder="请输入货主姓名"
          type="text"
        />
      </el-form-item>
      <el-form-item
        label="订单号"
        label-width="60px"
      >
        <el-input
          v-model="souForm.a"
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
        width="50"
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
        label="下发操作"
        width="120"
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
    />
    <el-dialog
      title="位置"
      :visible.sync="dialogVisible"
      width="60%"
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
        <div class="block">
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
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
       reverse: false,
        activities: [{
          content: '活动按期开始',
          timestamp: '2018-04-15'
        }, {
          content: '通过审核',
          timestamp: '2018-04-13'
        }, {
          content: '创建成功',
          timestamp: '2018-04-11'
        }],
        // 地图属性
       center: {lng: 0, lat: 0},
      zoom: 3,
      dialogVisible:false,
      page:1,
      total:null,
      value1:[],
      time:'',
      // 搜索功能表单
      souForm:{
      //  name:'',
       a:'',
      //  b:'',
      //  c:'',
      //  d:'整车',
       begin_pubdate: '', // 开始时间
        end_pubdate: '' // 结束时间
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
      this.souForm.begin_pubdate = value[0]
      this.souForm.end_pubdate = value[1]
    },
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
        // console.log(res.data.data)
        this.tableData = res.data.data
        this.total=res.data.total
      }).catch(err=>{
        throw err
      })
    },
    // 详情
    handleDetails(index, row){
      this.dialogVisible = true
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
.block{
  display: block;
  position: absolute;
  top: 70px;
  right: 70px;
}

</style>
