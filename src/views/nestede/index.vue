<template>
  <el>
    <router-view />
    <el-table
      :data="tableData"
      class="babel"
      width="100%"
      border
    >
      <el-table-column
        prop="date"
        label="类型"
        width="60"
      />
      <el-table-column
        prop="name"
        label="货主"
        width="70"
      />
      <el-table-column
        width="120"
        label="订单号"
      >
        121243615245
      </el-table-column>
      <el-table-column
        prop="address"
        width="140"
        label="出发地"
      />
      <el-table-column
        width="140"
        label="目的地"
      />
      <el-table-column
        width="80"
        label="总体积"
      />
      <el-table-column
        width="80"
        label="总重量"
      />
      <el-table-column
        width="150"
        label="创建时间"
      />
      <el-table-column
        width="100"
        label="接单时间"
      />
      <el-table-column
        width="80"
        label="状态"
      />
      <el-table-column
        prop="delete"
        label="下发操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click=" handleEdit (scope.$index, scope.row)"
          >
            司机
          </el-button>
          <el-button
            size="mini"
            type="danger"
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
    />
    <!-- <el-button
type="text"
               @click="dialogTableVisible = true"
>
      打开嵌套表格的 Dialog
    </el-button> -->
    </div>
  </el>
</template>

<script>
export default {
  data () {
    return {
      page:1,
      total:30,

      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
       },
       {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
       }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
       }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
       }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
       },
       {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
       }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
       }
       ],
       sijiData:[ {
        role: '长途',
        name: '王小虎',
        tel: '12345678901',
        address:'2019',
        referrer:'无',
        autonym:'无',
        state:'停止接单',
        site:'中国北京市北京市顺义区火寺路11号院',
        number:'0',
        x:''
      }
      ]
       }
     
  },
  methods: {
    handleEdit (index, row) {
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

<style>
.babel{
  margin: 20px;
}
.el-table {
  margin: 20px, 20px, 20px, 20px;
}
.cell {
  text-align: center;
}
.el-pagination {
  margin-top: 30px;
  float: right;
  padding-right: 100px;
}
</style>
