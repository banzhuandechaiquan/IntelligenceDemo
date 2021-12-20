<template>
  <div id="machine">
    <!--  导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机组管理</el-breadcrumb-item>
      <el-breadcrumb-item>机组信息</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片效果的主体区域-->
    <el-card>
      <!--      栅格化布局——搜索框与添加按钮-->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="query.machineId" clearable @clear="clear">
            <el-button slot="append" icon="el-icon-search" @click="searchMachine"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addMachine">添加机组</el-button>
        </el-col>
      </el-row>
<!--          管理机组列表-->
      <el-table :data="machineList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="machineId" label="机组编号"></el-table-column>
        <el-table-column prop="machineName" label="机组名字"></el-table-column>
        <el-table-column prop="machineLocation" label="机组位置"></el-table-column>
        <el-table-column>
          <div slot-scope="scope">
            <!--          修改机组按钮-->
            <el-tooltip class="item" effect="dark" content="修改此机组" placement="top">
              <el-button type="primary" icon="el-icon-edit" size="mini"
                         @click="updateMachine(scope.row.machineId)"></el-button>
            </el-tooltip>
            <!--          删除机组按钮-->
            <el-tooltip class="item" effect="dark" content="删除此机组" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="deleteMachine(scope.row.machineId)">
              </el-button>
            </el-tooltip>
          </div>
        </el-table-column>
      </el-table>
      <!--    底部分页区域-->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="total"
                       :current-page="currentPage" :page-sizes="[1, 3, 4, 5 , 10]" :page-size="5"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-card>
    <!--    添加机组的对话框-->
    <el-dialog title="添加机组" :visible.sync="addDialogVisible" width="50%">
      <!--      表单输入-->
      <el-form ref="addMachineRef" :model="addMachineForm" label-width="80px" :rules="addMachineRules">
        <el-form-item label="机组编号" prop="machineId">
          <el-input v-model="addMachineForm.machineId"></el-input>
        </el-form-item>
        <el-form-item label="机组名字" prop="machineName">
          <el-input v-model="addMachineForm.machineName"></el-input>
        </el-form-item>
        <el-form-item label="机组位置" prop="machineLocation">
          <el-input v-model="addMachineForm.machineLocation"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addMachineItem">确 定</el-button>
        <el-button type="info" @click="resetMachineForm">重 置</el-button>
      </span>
    </el-dialog>
    <!--    修改机组的对话框-->
    <el-dialog title="修改机组" :visible.sync="updateDialogVisible" width="50%">
      <!--      表单输入-->
      <el-form ref="updateMachineRef" :model="machineInfoById" label-width="80px">
        <el-form-item label="机组编号" prop="machineId">
          <el-input v-model="machineInfoById.machineId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="机组名字" prop="machineName">
          <el-input v-model="machineInfoById.machineName"></el-input>
        </el-form-item>
        <el-form-item label="机组位置" prop="machineLocation">
          <el-input v-model="machineInfoById.machineLocation"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="updateDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateMachineItem">确 定</el-button>
        <el-button type="info" @click="resetMachineForm">重 置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import  qs from 'qs'

  export default {
    name: "Machine",
    created() {
      this.getMachine()
    },
    data() {
      return {
        // 查询机组所用参数
        query:{
          machineId:''
        },
        // 分页
        currentPage:1,
        // 分页数据条数
        pageSize:5,
        // 机组数据总数
        total:0,
        // 机组列表
        machineList:[],
        // 添加机组表单内容
        addMachineForm:{
          machineId:'',
          machineName:'',
          machineLocation:''
        },
        // 机组表单验证规则
        addMachineRules:{
          machineId:[
            { required: true, message: '机组编号不能为空', trigger: 'blur' },
          ],
          machineName:[
            { required: true, message: '机组名字不能为空', trigger: 'blur' },
          ],
          machineLocation:[
            { required: true, message: '机组位置不能为空', trigger: 'blur' },
          ]
        },
        // 添加机组弹窗是否显示
        addDialogVisible:false,
        // 修改机组弹窗是否显示
        updateDialogVisible:false,
        // 根据id查询到的机组信息
        machineInfoById:{
          machineId:'',
          machineName:'',
          machineLocation:''
        }
      }
    },
    computed:{
      getUrl() {
        return '?currentPage='+this.currentPage+'&pageSize='+this.pageSize
      }
    },
    methods:{
      // 获取机组信息
      async getMachine() {
        const result = await this.$axios.post('/ifdsforpm/machine/select'+this.getUrl,this.query)
        // console.log(result.data);
        this.machineList = result.data.machinePageBean.list
        this.total = result.data.machinePageBean.totalCount
      },
      // 添加机组
        addMachineItem() {
        this.addDialogVisible = false
        this.$refs.addMachineRef.validate(async valid => {
          if (!valid) return
          const result = await this.$axios.post('/ifdsforpm/machine/save', this.addMachineForm)
          // console.log(result.data);
          if (result.data.msg === '机组已存在，创建失败') return this.$message.error('机组已存在，创建失败')
          this.$message.success('创建新用户'+ this.addMachineForm.machineName + '成功！')
          this.getMachine()
        })
      },
      // 重置添加机组表单信息
      resetMachineForm(){
        this.$refs.addMachineRef.resetFields();
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        console.log(newSize);
        this.pageSize = newSize
        this.getMachine()
      },
      // 监听 分页 改变的事件
      handleCurrentChange(newPage) {
        this.currentPage = newPage
        this.getMachine()
      },
      // 添加机组按钮
      addMachine() {
        this.addDialogVisible = true
      },
      // 删除机组
      async deleteMachine(machineId) {
        // console.log(machineId);
        // 弹框询问用户是否删除
        const confirmResult =  await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => {
          return err
        })
        // 打印用户点击为确定或者取消
        // console.log(confirmResult);
        // 如果点击取消，则返回一个取消删除的弹框
        if(confirmResult !== 'confirm') {
          return  this.$message.info('取消删除！')
        }
        const result = await this.$axios({
          method:'post',
          url:'/ifdsforpm/machine/delete',
          params:{
            machineId
          }
        })
        // console.log(result.data);
        // 删除成功提示
        this.$message.success('删除成功！')
        // 重新加载用户列表
      this.getMachine()
      },
      // 查询机组
      async searchMachine() {
        this.currentPage = 1
        this.getMachine()
      },
      // 清除搜索输入框内容
      clear() {
        this.getMachine()
      },
      async updateMachine (machineId) {
        // 修改弹窗页面显示
        this.updateDialogVisible = true
        // console.log(machineId);
        const result = await this.$axios({
          url:"/ifdsforpm/machine/findMachineById",
          method:"get",
          params:{
            id:machineId
          }
        })
        // console.log(result.data);
        this.machineInfoById = result.data.machine
      },
      async updateMachineItem() {
        this.updateDialogVisible = false
        // console.log(this.machineInfoById);
        const result = await this.$axios({
          url:'/ifdsforpm/machine/updateMachine',
          method:'post',
          params:this.machineInfoById
        })
        // console.log(result.data);
        this.getMachine()
      }
    }
  }
</script>

<style scoped>

</style>