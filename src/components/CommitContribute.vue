<template>
  <div>
      <div style="width:100%;padding:20px;border: 1px solid #eaeefb;border-top:none;">
        <el-page-header @back="goBack" content="commit维度分析"></el-page-header>
      </div>
        <div class="title">
            14日内commit提交趋势
        </div>
        <div class="title" style="width:85%;background-color:#F56C6C;" v-show="todayCommit==0">
            <i class="el-icon-warning"></i>提示:今日无提交!
        </div>
         <div class="title" style="width:85%;background-color:#F56C6C;" v-show="yesterdayCommit==0">
            <i class="el-icon-warning"></i>提示:昨日无提交!
        </div>
        <div class="cardlist">
            <div class="card">
                <div class="cardheader">每日commit平均值</div>
                {{cut(avg)}}
            </div>
            <div class="card">
                <div class="cardheader">昨日commit</div>
                {{yesterdayCommit}}
            </div>
            <div class="card">
                <div class="cardheader">今日commit</div>
                {{todayCommit}}
            </div>

        </div>


        <div class="item" id="main" style="height:300px;">

        </div>

        <div class="title">
            commit列表
            <el-button @click="hideList"
            style="float:right">{{showTable?"收起":"展开"}}</el-button>
        </div>
        <div class="item" v-show="showTable">
            不符合commit title规范的commit将被以红色标出<el-button @click="commitInfo">commit title规范是什么？</el-button>
            <el-table :data="data" style="width: 100%"  
            :row-class-name="checkcommit">
            <el-table-column
                prop="date"
                label="提交日期"
                width="100">
            </el-table-column>
            <el-table-column
                prop="time"
                label="提交时间"
                 width="100">
            </el-table-column>
            <el-table-column
                prop="author"
                label="git用户名"
                >
            </el-table-column>
            <el-table-column
                prop="committer_name"
                label="git账号名"
               >
            </el-table-column>
            <el-table-column
                prop="title"
                label="提交信息">
            </el-table-column>
            <el-table-column
                prop="file_changed"
                label="修改文件"
                 width="50">
            </el-table-column>
            <el-table-column
                prop="insertions"
                label="增加行"
                 width="50">
            </el-table-column>
            <el-table-column
                prop="deletions"
                label="删除行"
                 width="50">
            </el-table-column>
            <el-table-column
                prop="total"
                label="总计"
                 width="50">
            </el-table-column>
            <el-table-column
                prop="message"
                label="说明"
                 >
            </el-table-column>
            </el-table>

        </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name:"CommitContribute",
    data(){
        return {
            data:[],
            showTable:true,
            avg:0,
            recent:[],
        }
    },
    computed:{
        todayCommit(){
            if(this.recent.length>=14&&this.recent[13]>0){
                return this.recent[13]
            }
            return 0
        },
        yesterdayCommit(){
            if(this.recent.length>=14&&this.recent[12]>0){
                return this.recent[12]
            }
            return 0
        }
    },
    methods:{
        goBack() {
            this.$router.go(-1)
        },
         cut(x){
            return x.toFixed(3)
        },
        commitInfo(){
            this.$notify({
            title: 'commit title规范',
            message:  'commit title规范：\n'+
            "格式：<type>: <subject>\n"+
            "其中type应为以下值：feat/fix/docs/style/refactor/perf/test/chore\n"+
            "commit title的长度应该在5-80个字符之间"
            });
        },
        checkcommit({row, rowIndex}){
            if(row.title.length<5||row.title.length>80){
                this.data[rowIndex]["message"]="title长度不符合规范"
                return 'alert-row'
            }
            var re=/^((feat)|(fix)|(docs)|(style)|(refactor)|(perf)|(test)|(chore)):.*$/
            var r=row.title.match(re)
            if (r==null){
                this.data[rowIndex]["message"]="不符合规定格式"
                return 'alert-row'
            }
            return ""

        },
        hideList(){
            this.showTable=!this.showTable
        },
        getDateStr(t){
            let year=t.getFullYear()
            let month=t.getMonth()+1
            let date=t.getDate()
            let res=year+"-"
            if(month<10){
                res=res+"0"+month
            }else{
                res=res+month
            }
            res=res+"-"
            if(date<10){
                res=res+"0"+date
            }else{
                res=res+date
            }
            return res
        },
        generateChart(){
            //第一步计算每天提交多少commit平均数
            let m={}
            let x=[]
            let y=[]
            let sum=0
            for(let i=0;i<this.data.length;i++){
                sum++
                if(this.data[i].date in m){
                    m[this.data[i].date]++
                }else{
                    m[this.data[i].date]=1
                }

            }
           
            if(m.length!=0){
                this.avg=sum/Object.keys(m).length
            }
             console.log("avg",this.avg)
            //生成表格数据
            for(let i=13;i>=0;i--){
                let tmp=new Date()
                tmp=new Date(tmp.setDate(tmp.getDate()-i))
                let dateStr=this.getDateStr(tmp)
                console.log(dateStr)
                x.push(dateStr)
                if(dateStr in m){
                    this.recent.push(m[dateStr])
                    y.push(m[dateStr])
                }else{
                    y.push(0)
                    this.recent.push(m[dateStr])
                }
            }
            
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                title: {
                    text: '14日内commit趋势',
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: x,
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} '
                    }
                },
                series: [
                    {
                        name: 'commit数量',
                        type: 'line',
                        data: y,
                    
                    },
                    
                ]
            };

            option && myChart.setOption(option);

        }
    },
    created(){
        this.projectId=this.$route.params.projectid
        this.$axios({
            method:"get",
            url:"api/projects/statistic/commit?id="+this.projectId
        }).then(
            (response)=>{
                
                this.data=response.data.data
                console.log(this.data)
                //this.generateLanguageTable()
                this.generateChart()
            }
        ).catch((error) =>{
            console.log(error)
            if(error.response.status==401){
                window.location.href="http://127.0.0.1:3333/login"
            }
            else{
                alert("发生错误")
                window.location.href="http://127.0.0.1:3333/login"
            }
        })
    },
}
</script>

<style>
.cardlist{
    width: 85%;margin:0 auto;
    margin-top:5px;
    margin-bottom:10px;
}
.card{
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    display:inline-block;
    width:27%;
    margin-left:3%;
    margin-right:3%;
    margin-bottom:5px;
    height:100px;
    color:#67C23A;
    font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size:40px;
    text-align: center;
    
}
.cardheader{
    font-size:20px;
    margin-top:5px;
    margin-bottom: 5px;
    background-color: #409eff;
    color: white;
    height:30px;
}

.title {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    width: 90%;
    height: 40px;
    line-height: 40px;
    margin: 15px auto;
    margin-bottom: 2px;
    padding: 5px;
    padding-left: 15px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: white;
    font-size: 20px;
    background-color: #409eff;
}
.item {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    width: 85%;
    padding: 5px;
    padding-left: 15px;
    margin: 5px auto;

    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #409eff;

    font-size: 15px;
    display: block;
}
</style>
<style >
.el-table .warning-row {
    background: #E6A23C;
  }

  .el-table .alert-row {
    background: #F56C6C;
  }

</style>