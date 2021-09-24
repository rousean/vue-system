<template>
  <div class="menu-container">
    <div class="global-operate">
      <div class="global-operate-content">
        <el-button type="primary" plain>
          <svg-icon iconClass="table-add"></svg-icon>
          新增
        </el-button>
      </div>
      <div class="global-operate-content">
        <el-button type="primary" plain>
          <svg-icon iconClass="table-import"></svg-icon>
          导入
        </el-button>
      </div>
      <div class="global-operate-content">
        <el-button type="primary" plain>
          <svg-icon iconClass="table-export"></svg-icon>
          导出
        </el-button>
      </div>
      <div>
        <el-input placeholder="查询" v-model="searchValue">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300"
        ></el-table-column>
        <el-table-column label="操作" width="200">
          <div class="partial-operate">
            <el-tooltip content="新增子集" placement="bottom" effect="light">
              <div class="partial-operate-content">
                <svg-icon
                  iconClass="table-add-children"
                  style="width: 24px; height: 24px"
                ></svg-icon>
              </div>
            </el-tooltip>
            <el-tooltip content="查看" placement="bottom" effect="light">
              <div class="partial-operate-content">
                <svg-icon
                  iconClass="table-look"
                  style="width: 24px; height: 24px"
                ></svg-icon>
              </div>
            </el-tooltip>
            <el-tooltip content="编辑" placement="bottom" effect="light">
              <div class="partial-operate-content">
                <svg-icon
                  iconClass="table-edit"
                  style="width: 24px; height: 24px"
                ></svg-icon>
              </div>
            </el-tooltip>
            <el-tooltip content="删除" placement="bottom" effect="light">
              <div class="partial-operate-content">
                <svg-icon
                  iconClass="table-delete"
                  style="width: 24px; height: 24px"
                ></svg-icon>
              </div>
            </el-tooltip>
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Menu',
  data() {
    return {
      searchValue: '',
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {}
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
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
::v-deep .el-button {
  padding: 12px 14px;
}
</style>
