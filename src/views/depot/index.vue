<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="role"
        label="角色"
        width="100"
      />
      <el-table-column
        prop="name"
        label="司机姓名"
        width="80"
      />
      <el-table-column
        prop="tel"
        label="手机号"
      >
        121243615245
      </el-table-column>
      <el-table-column
        prop="address"
        label="注册时间"
      />
      <el-table-column
        prop="referrer"
        label="推荐人"
      />
      <el-table-column
        prop="autonym"
        label="是否实名"
      />
      <el-table-column
        prop="state"
        label="接单状态"
      />
      <el-table-column
        prop="site"
        label="注册地址"
      />
      <el-table-column
        prop="number"
        label="邀请总数"
      />
      <el-table-column
        prop="x"
        label="身份证号"
      />
      <el-table-column
        prop="delete"
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
      :total="1000"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [ {
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
    handleGo(){
       this.$router.go(-1)
    },
    handleEdit (index, row) {
     

    },
    // handleDelete (index, row) {
 
    //   console.log(index, row)
    // }
  }
}
</script>

<style>
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
</style>
