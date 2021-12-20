<template>
  <div id="result">
    <!--    导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机组诊断</el-breadcrumb-item>
      <el-breadcrumb-item>诊断结果</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片主体区域-->
    <el-card>
      <el-form ref="resultForm" :model="form" label-width="80px">
        <!--      搜索机组id-->
        <el-form-item label="机组id">
          <el-col :span="8">
            <el-input v-model="form.machineId"></el-input>
          </el-col>
          <!--          开始诊断按钮-->
          <el-button type="primary" @click="btnResult">开始查询</el-button>
        </el-form-item>
<!--        开始时间-->
        <el-form-item label="开始时间" class="dateStyle">
          <el-col :span="15">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
<!--        结束时间-->
        <el-form-item label="结束时间" class="dateStyle">
          <el-col :span="15">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
<!--      机组诊断结果列表-->
      <el-table :data="resultList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="机组编号" prop="machineId"></el-table-column>
        <el-table-column label="诊断编号" prop="resultId"></el-table-column>
        <el-table-column label="诊断时间" prop="time">
          <template slot-scope="scope">{{ scope.row.time | formatDate }}</template>
        </el-table-column>
        <el-table-column label="错误类型" prop="fault"></el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
      </el-table>
<!--底部分页/一页条数栏-->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="total"
                       :current-page="currentPage" :page-sizes="[1, 3, 4, 5 , 10]" :page-size="4"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {formatDate} from '../js/date.js';
  export default {
    name: "Result",
    data() {
      return {
        // object类型的日期数据
        form:{
          date1:'',
          date2:'',
          machineId:''
        },
        // 数组类型的日期数据
        formChange:{
          dateOne:[],
          dateTwo:[],
        },
        // 开始时间的月份
        formMoon:13,
        // 结束时间的月份
        formMoonTwo:13,
        // 查询结果列表
        resultList:[],
        // 分页
        currentPage:1,
        // 数据总数
        total:0,
        // 每页条数
        pageSize:4
      }
    },
    filters: {
      // 时间戳过滤器
      formatDate(time) {
        const date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    computed:{
      // 开始时间
      getDateOne() {
        return this.formChange.dateOne[3]+ '/' + this.formMoon + '/' + this.formChange.dateOne[2]
      },
      // 结束时间
      getDateTwo() {
        return this.formChange.dateTwo[3]+ '/' + this.formMoonTwo + '/' + this.formChange.dateTwo[2]
      },
      // 获取页数跟
      getUrl() {
        return '?pageSize=' + this.pageSize + '&' + 'currentPage=' + this.currentPage
      }
    },
    methods:{
      async btnResult() {
        if(this.form.date1 === '' || this.form.date2 === '') return this.$message.error('请正确选择开始时间和结束时间')
        // console.log(this.form.date1);
        this.formChange.dateOne = this.form.date1.toString().split(' ')
        if(this.formChange.dateOne[1] === 'Jan'){
          this.formMoon = '01'
        }else if(this.formChange.dateOne[1] === 'Feb') {
          this.formMoon = '02'
        }else if(this.formChange.dateOne[1] === 'Mar') {
          this.formMoon = '03'
        }else if(this.formChange.dateOne[1] === 'Apr') {
          this.formMoon = '04'
        }else if(this.formChange.dateOne[1] === 'May') {
          this.formMoon = '05'
        }else if(this.formChange.dateOne[1] === 'Jun') {
          this.formMoon = '06'
        }else if(this.formChange.dateOne[1] === 'Jul') {
          this.formMoon = '07'
        }else if(this.formChange.dateOne[1] === 'Aug') {
          this.formMoon = '08'
        }else if(this.formChange.dateOne[1] === 'Sep') {
          this.formMoon = '09'
        }else if(this.formChange.dateOne[1] === 'Oct') {
          this.formMoon = '10'
        }else if(this.formChange.dateOne[1] === 'Nov') {
          this.formMoon = '11'
        }else if(this.formChange.dateOne[1] === 'Dec'
        ) {
          this.formMoon = '12'
        }

        this.formChange.dateTwo = this.form.date2.toString().split(' ')
        if(this.formChange.dateTwo[1] === 'Jan'){
          this.formMoonTwo = '01'
        }else if(this.formChange.dateTwo[1] === 'Feb') {
          this.formMoonTwo = '02'
        }else if(this.formChange.dateTwo[1] === 'Mar') {
          this.formMoonTwo = '03'
        }else if(this.formChange.dateTwo[1] === 'Apr') {
          this.formMoonTwo = '04'
        }else if(this.formChange.dateTwo[1] === 'May') {
          this.formMoonTwo = '05'
        }else if(this.formChange.dateTwo[1] === 'Jun') {
          this.formMoonTwo = '06'
        }else if(this.formChange.dateTwo[1] === 'Jul') {
          this.formMoonTwo = '07'
        }else if(this.formChange.dateTwo[1] === 'Aug') {
          this.formMoonTwo = '08'
        }else if(this.formChange.dateTwo[1] === 'Sep') {
          this.formMoonTwo = '09'
        }else if(this.formChange.dateTwo[1] === 'Oct') {
          this.formMoonTwo = '10'
        }else if(this.formChange.dateTwo[1] === 'Nov') {
          this.formMoonTwo = '11'
        }else if(this.formChange.dateTwo[1] === 'Dec') {
          this.formMoonTwo = '12'
        }

        const result = await this.$axios({
          url:'/ifdsforpm/result/select'+this.getUrl,
          method:'get',
          params:{
            id:this.form.machineId,
            startDate:this.getDateOne,
            endDate:this.getDateTwo
          },
        })
        // console.log(this.getDateOne);
        // console.log(this.getDateTwo);
        console.log(result.data);
        this.resultList = result.data.resultPageBean.list
        this.total = result.data.resultPageBean.totalCount

      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        this.pageSize = newSize
        this.btnResult()
      },
      // 监听 分页 改变的事件
      handleCurrentChange(newPage) {
        this.currentPage = newPage
        this.btnResult()
      }
    }
  }
</script>

<style scoped>
 .dateStyle {
   float: left;
   width: 40%;
   margin-right: -2rem;
 }
 .el-button {
   margin-left: 180px;
 }
</style>