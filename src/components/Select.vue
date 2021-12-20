<template>
  <div id="select">
    <!--    导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>曲线图</el-breadcrumb-item>
      <el-breadcrumb-item>查看数据曲线图</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片区域-->
    <el-card>
      <el-form ref="resultForm" :model="form" label-width="80px">
        <!--      搜索机组id-->
        <el-form-item label="传感器id">
          <el-col :span="8">
            <el-input v-model="form.sensorId"></el-input>
          </el-col>
          <!--          开始查询按钮-->
          <el-button type="primary" @click="BtnSelect">开始查询</el-button>
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
<!--      清除浮动-->
      <div class="clear"></div>
<!--      echart曲线图-->
      <div id="myChart" class="myChart"></div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Select",
    mounted(){
      this.drawLine();
    },
    data() {
      return {
        form:{
          // object类型的日期数据
          date1:'',
          date2:'',
          sensorId:''
        },
        // object类型的日期数据
        formChange:{
          dateOne:[],
          dateTwo:[],
        },
        // 开始时间的月份
        formMoon:13,
        // 结束时间的月份
        formMoonTwo:13,
        // 查询曲线图列表
        selectList:[],
        // 曲线图横坐标
        dataXAxis:[],
        // 曲线图纵坐标
        dataYAxis:[],
      }
    },
    computed: {
      getDateOne() {
        return this.formChange.dateOne[3] + '/' + this.formMoon + '/' + this.formChange.dateOne[2]
      },
      getDateTwo() {
        return this.formChange.dateTwo[3] + '/' + this.formMoonTwo + '/' + this.formChange.dateTwo[2]
      },
      getUrl() {
        return '?pageSize=' + this.pageSize + '&' + 'currentPage=' + this.currentPage
      }
    },
    methods:{
      drawLine(){
        console.log('hhh');
      },
      // 获取曲线图数据
      async BtnSelect() {
        // console.log(this.form.date1);
        if(this.form.date1 === '' || this.form.date2 === '') return this.$message.error('请正确选择开始时间和结束时间')
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
          url:'/ifdsforpm/information/select'+this.getUrl,
          method:'get',
          params:{
            id:this.form.sensorId,
            startDate:this.getDateOne,
            endDate:this.getDateTwo
          },
        })
        // console.log(result.data);
        this.selectList = result.data.informationList
        console.log(this.selectList);
        // console.log(this.selectList.length);

        for (let i=0; i<this.selectList.length; i++) {
          this.dataXAxis[i] = this.selectList[i].dataId
        }
        // console.log(this.dataXAxis)
        for (let i=0; i<this.selectList.length; i++) {
          this.dataYAxis[i] = this.selectList[i].value
        }
        // console.log(this.dataYAxis)

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '数据曲线图' },
          tooltip: {},
          xAxis: {
            data: this.dataXAxis
          },
          yAxis: {},
          series: [{
            name: 'value',
            type: 'bar',
            data: this.dataYAxis
          }]
        });
      },
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
  .clear {
    clear: both;
  }
  .myChart {
    width: 1100px;
    height: 350px;
  }
</style>