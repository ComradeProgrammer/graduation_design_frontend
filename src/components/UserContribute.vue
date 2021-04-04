<template>
  <div class="usercontributemain">
      <div style="width:100%;padding:20px;border: 1px solid #eaeefb;border-top:none;">
        <el-page-header @back="goBack" content="分用户维度分析"></el-page-header>
      </div>
       <el-alert title="在本页面以git中的用户名进行分析" type="warning" effect="dark" 
       style="width:92%;margin:5px auto;font-size:20px;"
       ></el-alert>

       <div class="usercontributetitle">
            用户列表
        </div>
        <el-alert
            title="点击列表条目选择要查看的用户"
            type="success"
            effect="dark"
            style="width:88%;margin:10px auto;font-size:20px;">
        </el-alert>
        <div class="usercontributeitem" >
            <el-table :data="table" style="width: 100%" ref="singleTable" @current-change="handleCurrentChange" highlight-current-row>
            <el-table-column
                prop="gitname"
                label="Git用户名"
                width="300">
            </el-table-column>
            <el-table-column
                prop="gitlabname"
                label="Gitlab用户名"
                width="300">
            </el-table-column>
            <el-table-column
                prop="totalline"
                label="代码行数"
                 width="300">
            </el-table-column>
            
            </el-table>

        </div>
        <div class="usercontributetitle">
            {{getvalue(currentRow,"gitname")+"详情"}}
        </div>
        <div class="usercontributetitle" style="width:85%;color:white;background-color:#909399">
            提交代码分析
        </div>
        <div class="usercontributeitem" >
            <div style="width: 60%;height:300px;margin:0 auto; " id="chart1"></div>
        </div>

        <div class="usercontributetitle" style="width:85%;color:white;background-color:#909399">
            commit分析
        </div>
         <!--div class="usercontributeitem">
             
             <div style="float:right;width:60%;display:inline-block" class="text">
                 代码行数异常阈值<el-input v-model="limit" style="width:50%;"></el-input>
             </div>
             代码行数平均值{{currentRow.avg}}<br>
             代码行数标准差{{currentRow.bias}}<br>
         </div-->

         <div class="cardlist">
            <div class="card">
                <div class="cardheader">代码行数平均值</div>
                {{cut(currentRow.avg)}}
            </div>
            <div class="card">
                <div class="cardheader">代码行数标准差</div>
                {{cut(currentRow.bias)}}
            </div>
            <div class="card">
                <div class="cardheader">代码行数异常阈值</div>
                <el-input v-model="limit" style="width:50%;"></el-input>
            </div>

        </div>

         <div class="usercontributeitem">
            <el-table :data="currentRow.commits" style="width: 100%"  
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
                prop="title"
                label="提交信息"
                 width="200">
            </el-table-column>
            <el-table-column
                prop="file_changed"
                label="修改文件"
                 width="100">
            </el-table-column>
            <el-table-column
                prop="insertions"
                label="增加行"
                 width="100">
            </el-table-column>
            <el-table-column
                prop="deletions"
                label="删除行"
                 width="100">
            </el-table-column>
            <el-table-column
                prop="total"
                label="总计"
                 width="100">
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
    name:"UserContribute",
    data(){
        return {
            table:[],
            limit:100,
            currentRow:{
                row:"",
                gitname:"",
                gitlabname:"",
                totalline:"",
                language:{},
                commits:[],
                avg:0,
                bias:0,
            }
        }
    },
    methods: {
        cut(x){
            return x.toFixed(3)
        },
        getvalue(key,value){
            if(key==null){
                return ""
            }
            return key[value]
        },
        handleCurrentChange(val) {
            this.currentRow = val;
            console.log("handleCurrentChange")
            console.log(val)
            this.generateChartA()
        },
        goBack() {
            this.$router.go(-1)
        },
        generateUserTable(){
            for(let user in this.data.linesByAuthor){
                let commits=[]
                let sum=0,avg=0,bias=0
                if(this.data.commitList.length>0)
                {
                    for(let i=0;i<this.data.commitList.length;i++){
                        if(this.data.commitList[i].author==user){
                            this.data.commitList[i]["message"]=""
                            
                            commits.push(this.data.commitList[i])
                            if((this.data.commitList[i].insertions<this.limit)&&(this.data.commitList[i].deletions<this.limit)){
                                console.log("total",this.data.commitList[i].total)
                                sum=sum+this.data.commitList[i].total
                            }
                        }
                    }
                    avg=sum/commits.length
                    let tmp=0
                    for(let i=0;i<commits.length;i++){
                        if((commits[i].insertions<this.limit)&&(commits[i].deletions<this.limit)){
                            tmp=tmp+(commits[i].total-avg)*(commits[i].total-avg)
                        }
                    }
                    bias=Math.sqrt(tmp/commits.length)
                }
                


                let tmp={
                    row:this.table.length,
                    gitname:user,
                    gitlabname:this.data.gitAuthorToGitlabUser[user],
                    totalline:this.data.linesByAuthor[user],
                    language:this.data.linesByAuthorByLanguage[user],
                    commits:commits,
                    avg:avg,
                    bias:bias,
                }
                this.table.push(tmp)
            }
            console.log(this.table)
            if(this.table.length!=0){
                this.$refs.singleTable.setCurrentRow(this.table[0]) 
                this.generateChartA()
            }
        },
        generateChartA(){
            var chartDom = document.getElementById('chart1');
            var myChart = echarts.init(chartDom);
            var option;
            var chartdata=[]
            for(let key in this.currentRow.language){
                if (key!=""){
                    chartdata.push({value:this.currentRow.language[key],name:key})
                }
                else{
                    chartdata.push({value:this.currentRow.language[key],name:"others"})
                }
               
            }

            option = {
                title: {
                    text: '提交代码语言构成',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '50%',
                        data: chartdata,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            option && myChart.setOption(option);

        },
        checkcommit({row, rowIndex}){
            if(row.insertions>this.limit){
                this.currentRow.commits[rowIndex].message="代码增删超过阈值"
                return 'alert-row';
                
            }

            if(row.deletions>this.limit){
                this.currentRow.commits[rowIndex].message="代码增删超过阈值"
                return 'alert-row';
            }
            if ((row.total>this.currentRow.avg+2*this.currentRow.bias)||(row.total<this.currentRow.avg-2*this.currentRow.bias)){
                console.log("total",row.total,"avg",this.currentRow.avg,"bias",this.currentRow.bias)
                this.currentRow.commits[rowIndex].message="代码增删超过2倍标准差"
                return 'warning-row';
            }
            this.currentRow.commits[rowIndex].message=""
            return ""
            
        }

            
    },
    created(){
        this.projectId=this.$route.params.projectid
        this.$axios({
            method:"get",
            url:"api/projects/statistic/user?id="+this.projectId
        }).then(
            (response)=>{
                
                this.data=response.data.data
                console.log(this.data)
                this.generateUserTable()
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

<style scoped>
.usercontributemain{
    font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.usercontributetitle {
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
.usercontributeitem {
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
.text{
    font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
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

</style>
<style >
.el-table .warning-row {
    background: #E6A23C;
  }

  .el-table .alert-row {
    background: #F56C6C;
  }

</style>