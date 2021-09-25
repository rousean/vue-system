<template>
  <div class="menu-container">
    <div class="global-operate">
      <div class="global-operate-content">
        <el-button type="primary" plain>
          <svg-icon
            iconClass="table-add"
            style="vertical-align: bottom;"
          ></svg-icon>
          新增
        </el-button>
      </div>
      <div class="global-operate-content">
        <el-button type="primary" plain>
          <svg-icon
            iconClass="table-import"
            style="vertical-align: bottom;"
          ></svg-icon>
          导入
        </el-button>
      </div>
      <div class="global-operate-content">
        <el-button type="primary" plain>
          <svg-icon
            iconClass="table-export"
            style="vertical-align: bottom;"
          ></svg-icon>
          导出
        </el-button>
      </div>
      <div class="global-operate-content">
        <el-button type="primary" plain>
          <svg-icon
            iconClass="table-batch-delete"
            style="vertical-align: bottom;"
          ></svg-icon>
          批量删除
        </el-button>
      </div>
      <div>
        <el-input placeholder="查询" v-model="searchValue">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
    <div class="table-container">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%;margin-bottom: 20px;"
        row-key="_id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="_id" label="ID" sortable></el-table-column>
        <el-table-column
          prop="title"
          label="展示名称"
          sortable
        ></el-table-column>
        <el-table-column prop="name" label="路由名称"></el-table-column>
        <el-table-column prop="path" label="路由路径"></el-table-column>
        <el-table-column prop="component" label="文件路径"></el-table-column>
        <el-table-column label="操作" width="200">
          <div class="partial-operate">
            <el-tooltip content="新增子集" placement="bottom" effect="light">
              <svg-icon
                iconClass="table-add-children"
                className="partial-operate-content"
              ></svg-icon>
            </el-tooltip>
            <el-tooltip content="查看" placement="bottom" effect="light">
              <svg-icon
                iconClass="table-look"
                className="partial-operate-content"
              ></svg-icon>
            </el-tooltip>
            <el-tooltip content="编辑" placement="bottom" effect="light">
              <svg-icon
                iconClass="table-edit"
                className="partial-operate-content"
              ></svg-icon>
            </el-tooltip>
            <el-tooltip content="删除" placement="bottom" effect="light">
              <svg-icon
                iconClass="table-delete"
                className="partial-operate-content"
              ></svg-icon>
            </el-tooltip>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { reqQueryMenu } from '../../../api/index'
export default {
  name: 'Menu',
  data() {
    return {
      searchValue: '',
      currentPage: 1,
      tableData: []
    }
  },
  async mounted() {
    const result = await reqQueryMenu()
    this.tableData = result.data
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.global-operate {
  margin-bottom: 10px;
  display: flex;
}
.global-operate-content {
  margin-right: 10px;
}
.partial-operate {
  display: flex;
}
.partial-operate-content {
  width: 24px;
  height: 24px;
  vertical-align: text-top;
  margin-right: 15px;
}
.pagination-container {
  text-align: right;
}
::v-deep .el-button {
  padding: 12px 14px;
}
</style>
