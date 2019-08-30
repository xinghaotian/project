<template>
  <div class="app-container">
    <el-table
v-loading="listLoading"
              :data="list"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row
>
      <el-table-column
align="center"
                       label="姓名"
                       width="140"
>
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column
label="电话"
                       width="130"
>
        <template slot-scope="scope">
          17596123669
        </template>
      </el-table-column>
      <el-table-column
label="头像"
                       width="150"
                       align="center"
>
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
label="注册日期"
                       width="200"
                       align="center"
>
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column
class-name="status-col"
                       label="接单状态"
                       width="160"
                       align="center"
>
        <template slot-scope="scope">
          <el-tag
type="success"
                  effect="dark"
                  disable-transitions="true"
>
            接单中
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
label="是否实名"
                       width="110"
>
        已实名
      </el-table-column>
      <el-table-column
align="center"
                       prop="created_at"
                       label="操作"
>
        <template slot-scope="scope">
          <div class="flex">
            <el-button
size="medium"
                       type="warning"
>
              <i class="el-icon-view" />详情
            </el-button>
            <el-button
size="medium"
                       type="primary"
>
              <i class="el-icon-edit-outline" />编辑
            </el-button>
            <el-button
size="medium"
                       type="danger"
>
              <i class="el-icon-delete" />删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      list: null,
      listLoading: true
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
<style>
.flex {
  display: flex;
}
.el-button {
  flex: 1;
}
.cell {
  text-align: center;
}
</style>


