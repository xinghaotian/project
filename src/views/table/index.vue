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
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column
        label="电话"
        width="110"
      >
        <template slot-scope="scope">
          17596123669
        </template>
      </el-table-column>
      <el-table-column
        label="头像"
        width="90"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="注册日期"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <!-- <el-table-column
        class-name="status-col"
        label="账号"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            type="success"
            effect="dark"
            disable-transitions="true"
          >
            账号
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column
        label="账号"
        width="100"
      />
      <el-table-column
        label="备注"
        width="100"
      />
      <el-table-column
        label="合同制"
        width="80"
      />
      <el-table-column
        label="公司"
        width="110"
      />
      <el-table-column
        label="在途订单"
        width="80"
      />
      <el-table-column
        label="已发订单"
        width="80"
      />

      <el-table-column
        align="center"
        prop="created_at"
        label="操作"
      >
        <template slot-scope="scope">
          <div class="flex">
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)"
            >
              <i class="el-icon-view" />详情
            </el-button>
            <el-button
              size="mini"
              type="primary"
            >
              <i class="el-icon-edit-outline" />编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
            >
              <i class="el-icon-delete" />删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      top="5vh"
      width="60%"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="电话"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="头像"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="注册日期"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="账号"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="备注"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="合同制"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="公司"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="在途订单"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="已发订单"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
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
       formLabelWidth: '120px',
        dialogFormVisible: false,
      list: null,
      listLoading: true,
      form:{

      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    handleEdit(index, row){
    this.dialogFormVisible = true
    },
    fetchData () {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
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


