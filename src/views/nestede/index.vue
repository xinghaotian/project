<template>
  <div>
    <el-table
:data="tableData"
              border
              style="width: 100%"
>
      <el-table-column
prop="date"
                       label="日期"
                       width="180"
/>
      <el-table-column
prop="name"
                       label="姓名"
                       width="180"
/>
      <el-table-column
prop="address"
                       label="地址"
/>
      <el-table-column
prop="delete"
                       label="下发操作"
>
        <template slot-scope="scope">
          <el-button
size="mini"
                     @click="handleEdit(scope.$index, scope.row)"
>
            司机
          </el-button>
          <el-button
size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)"
>
            货站
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
background
                   layout="prev, pager, next"
                   :total="1000"
/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
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
      ]
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style>
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
</style>
