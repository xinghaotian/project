<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="tableb"
    >
      <el-table-column
        prop="role"
        label="姓名"
        width="200"
      />
      <el-table-column
        prop="role"
        label="电话"
        width="200"
      />
      <el-table-column
        prop="role"
        label="头像"
        width="200"
      />
      <el-table-column
        prop="role"
        label="注册时间"
        width="150"
      />
      <el-table-column
        prop="role"
        label="推荐人手机号"
        width="150"
      />
      <el-table-column
        prop="role"
        label="是否实名"
        width="100"
      />
      <el-table-column
        prop="role"
        label="接单状态"
        width="100"
      />
      <el-table-column
        prop="role"
        label="操作"
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
      :total="30"
    />
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
     tableData: [ {
        role: '长途',
      
      }
      ]
    }
  },
  methods:{
    // 返回上一页
    handleGo(){
       this.$router.go(-1)
    },
    handleEdit(index, row){
      
    }
  }
}
</script>

<style scoped>
.elbutton{
  margin-left: 30px;
  margin-top: 30px;
}
.el-table--border th:first-child .cell {
  text-align: center;
}
.tableb{
  margin: 10px;
}
</style>
