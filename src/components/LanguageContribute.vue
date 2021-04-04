<template>
<div>
    <div style="width:100%;padding:20px;border: 1px solid #eaeefb;border-top:none;">
        <el-page-header @back="goBack" content="分语言维度分析"></el-page-header>
      </div>
      <el-alert title="在本页面以git中的用户名进行分析" type="warning" effect="dark" 
       style="width:92%;margin:5px auto;font-size:20px;"
       ></el-alert>
        <div class="title">
            语言列表
        </div>
        <el-alert
            title="点击列表条目选择要查看的语言"
            type="success"
            effect="dark"
            style="width:88%;margin:10px auto;font-size:20px;">
        </el-alert>
        <div class="item" >
            <el-table :data="table" style="width: 100%" ref="singleTable" @current-change="handleCurrentChange" highlight-current-row>
            <el-table-column
                prop="name"
                label="语言"
                width="300">
            </el-table-column>
            <el-table-column
                prop="lines"
                label="Gitlab用户名"
                width="行数">
            </el-table-column>
            </el-table>
        </div>
         <div class="title">
            贡献结构
        </div>
        <div class="item" >
            <div style="width: 60%;height:300px;margin:0 auto; " id="chart1"></div>
        </div>
</div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name:"LanguageContribute",
    data(){
        return {
            table:[],
            currentRow:{
                name:"",
                authors:{},
                lines:0,
            }
        }
    },
    methods: {
        generateChartA(){
            var chartDom = document.getElementById('chart1');
            var myChart = echarts.init(chartDom);
            var option;
            var chartdata=[]
            for(let key in this.currentRow.authors){
                chartdata.push({value:this.currentRow.authors[key],name:key})  
            }

            option = {
                title: {
                    text: this.currentRow.name+'贡献构成',
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
        goBack() {
            this.$router.go(-1)
        },
        generateLanguageTable(){
            for(let language in this.data.linesByLanguage){
                let name=language
                if(language==""){
                   name="other"
                }
                this.table.push({
                    name:name,
                    lines:this.data.linesByLanguage[language],
                    authors:this.data.linesByLanguageByAuthor[language]
                })
            }
            console.log(this.table)
            if(this.table.length!=0){
                this.$refs.singleTable.setCurrentRow(this.table[0]) 
                this.generateChartA()
            }

        },
        handleCurrentChange(val) {
            this.currentRow = val;
            console.log("handleCurrentChange")
            console.log(val)
            this.generateChartA()
        },
    },
    created(){
        this.projectId=this.$route.params.projectid
        this.$axios({
            method:"get",
            url:"api/projects/statistic/language?id="+this.projectId
        }).then(
            (response)=>{
                
                this.data=response.data.data
                console.log(this.data)
                this.generateLanguageTable()
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