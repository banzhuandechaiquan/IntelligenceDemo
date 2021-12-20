<template>
  <div id="sensor">
<!--    导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>传感器管理</el-breadcrumb-item>
      <el-breadcrumb-item>传感器列表</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片区域-->
    <el-card>
      <!--      栅格化布局——搜索框与添加按钮-->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="query.sensorName" clearable @clear="clear">
            <el-button slot="append" icon="el-icon-search" @click="searchSensor"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addSensorBtn">添加传感器</el-button>
        </el-col>
      </el-row>
<!--      管理传感器列表-->
      <el-table :data="sensorList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="采样频率" prop="frequency"></el-table-column>
        <el-table-column label="机组编号" prop="machineId"></el-table-column>
        <el-table-column label="端口" prop="port"></el-table-column>
        <el-table-column label="传感器编号" prop="sensorId"></el-table-column>
        <el-table-column label="传感器位置" prop="sensorLocation"></el-table-column>
        <el-table-column label="传感型号" prop="sensorModel"></el-table-column>
        <el-table-column label="传感器名字" prop="sensorName"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <!--          修改传感器按钮-->
            <el-tooltip class="item" effect="dark" content="修改传感器" placement="top">
              <el-button type="primary" icon="el-icon-edit" size="mini"
                         @click="updateSensor(scope.row.sensorId)"></el-button>
            </el-tooltip>
            <!--          删除用户按钮-->
            <el-tooltip class="item" effect="dark" content="删除传感器" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="deleteSensor(scope.row.sensorId)"></el-button>
            </el-tooltip>
          </div>
        </el-table-column>
      </el-table>
      <!--    底部分页区域-->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="total"
                       :current-page="currentPage" :page-sizes="[1, 3, 4, 5 , 10]" :page-size="4"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-card>

    <!--    添加传感器的对话框-->
    <el-dialog title="添加传感器" :visible.sync="addDialogVisible" width="50%">
      <!--      表单输入-->
      <el-form ref="addRef" :model="addSensorForm" label-width="80px">
<!--        <el-form-item label="采样频率">-->
<!--          <el-input v-model="addSensorForm.frequency"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="机组编号">
          <el-input v-model="addSensorForm.machineId"></el-input>
        </el-form-item>
        <el-form-item label="端口">
          <el-input v-model="addSensorForm.port"></el-input>
        </el-form-item>
        <el-form-item label="传感器编号">
          <el-input v-model="addSensorForm.sensorId"></el-input>
        </el-form-item>
        <el-form-item label="传感器位置">
          <el-input v-model="addSensorForm.sensorLocation"></el-input>
        </el-form-item>
        <el-form-item label="传感型号">
          <el-input v-model="addSensorForm.sensorModel"></el-input>
        </el-form-item>
        <el-form-item label="传感器名字">
          <el-input v-model="addSensorForm.sensorName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addSensorItem">确 定</el-button>
        <el-button type="info" @click="resetAddForm">重 置</el-button>
      </span>
    </el-dialog>

    <!--    修改传感器的对话框-->
    <el-dialog title="修改传感器" :visible.sync="updateDialogVisible" width="50%">
      <!--      表单输入-->
      <el-form ref="updateRef" :model="updateSensorForm" label-width="80px">
<!--        <el-form-item label="采样频率">-->
<!--          <el-input v-model="addSensorForm.frequency"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="机组编号">
          <el-input v-model="updateSensorForm.machineId"></el-input>
        </el-form-item>
        <el-form-item label="端口">
          <el-input v-model="updateSensorForm.port"></el-input>
        </el-form-item>
<!--        <el-form-item label="传感器编号">-->
<!--          <el-input v-model="addSensorForm.sensorId"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="传感器位置">
          <el-input v-model="updateSensorForm.sensorLocation"></el-input>
        </el-form-item>
        <el-form-item label="传感型号">
          <el-input v-model="updateSensorForm.sensorModel"></el-input>
        </el-form-item>
        <el-form-item label="传感器名字">
          <el-input v-model="updateSensorForm.sensorName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="updateDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateSensorItem">确 定</el-button>
<!--        <el-button type="info" @click="resetUpdateForm">重 置</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    created() {
      this.getSensoritem()
    },
    name: "Sensor",
    data() {
      return {
        //分页
        currentPage:1,
        // 每页显示条数
        pageSize:4,
        // 传感器列表
        sensorList:[],
        // 查询传感器传递的参数
        query:{
          sensorName:''
        },
        // 传感器总数量
        total:0,
        // 添加传感器弹窗是否弹出
        addDialogVisible:false,
        // 添加传感器表单
        addSensorForm:{
          // frequency:'',
          machineId:'',
          port:'',
          sensorId:'',
          sensorLocation:'',
          sensorModel:'',
          sensorName:''
        },
        // 修改传感器弹窗是否弹出
        updateDialogVisible:false,
        // 修改传感器表单
        updateSensorForm:{}
      }
    },
    computed:{
      getUrl() {
        return '?pageSize=' + this.pageSize + '&' + 'currentPage=' + this.currentPage
      }
    },
    methods:{
      // 查询传感器的方法
      async getSensoritem() {
        const result = await this.$axios.post('/ifdsforpm/sensor/select' + this.getUrl,this.query)
        // console.log(result.data);
        this.sensorList = result.data.machinePageBean.list
        this.total = result.data.machinePageBean.totalCount
        // console.log(this.sensorList);
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        this.pageSize = newSize
        this.getSensoritem()
      },
      // 监听 分页 改变的事件
      handleCurrentChange(newPage) {
        this.currentPage = newPage
        this.getSensoritem()
      },
      // 查询传感器
      async searchSensor() {
        this.currentPage = 1
        this.getSensoritem()
      },
      // 清除输入框内容
      clear() {
        this.getSensoritem()
      },
      // 添加传感器
      addSensorBtn() {
        // console.log("addSensorBtn");
        this.addDialogVisible = true
      },
      // 确定添加
      async addSensorItem() {
        this.addDialogVisible = false
        const result = await this.$axios.post('/ifdsforpm/sensor/save',this.addSensorForm)
        console.log(result.data);
        this.getSensoritem()
        if(result.data.msg === '传感器已存在，创建失败') return this.$message.error('传感器已存在，创建失败')
        this.$message.success('添加传感器成功')
      },
      // 重置添加传感器表单
      resetAddForm() {
        this.$refs.addRef.resetFields();
      },
      // 修改传感器
      async updateSensor(sensorId) {
        this.updateDialogVisible = true
        const result = await this.$axios({
          url:'/ifdsforpm/sensor/findMachineById',
          method:'get',
          params:{
            id:sensorId
          }
        })
        // console.log(result.data);
        this.updateSensorForm = result.data.machine
        // console.log(this.updateSensorForm);
      },
      // 确定修改传感器
      async updateSensorItem() {
        const result = await this.$axios({
          url:'/ifdsforpm/sensor/updateSensor',
          method:'post',
          params:this.updateSensorForm
        })
        // console.log(result.data);
        this.updateDialogVisible = false
        this.getSensoritem()
        if(result.data.msg == "修改传信息成功..."){
          this.$message.success('修改传感器信息成功！')
        }else {
          this.$message.error('修改传感器信息失败！')
        }
      },
      // // 重置修改传感器表单
      // resetUpdateForm() {
      //   this.$refs.updateRef.resetFields();
      // },
      // 删除传感器
      async deleteSensor(sensorId) {
        // console.log(role);
        // 弹框询问用户是否删除
        const confirmResult =  await this.$confirm('此操作将永久删除传感器, 是否继续?', '提示', {
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
        // 不取消则执行删除传感器操作
        const result = await this.$axios({
          url:'/ifdsforpm/sensor/delete',
          method: 'post',
          params: {
            sensorId
          }
        })
        // console.log(result.data);
        this.getSensoritem()
      },
    }
  }
</script>

<style scoped>

</style>