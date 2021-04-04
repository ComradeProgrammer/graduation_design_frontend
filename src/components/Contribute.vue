<template>
  <div>
        <div class="contributetitle">
            整体情况概览
            
        </div>
        <div class="cardlist">
            <div class="card">
                <div class="cardheader">代码总行数</div>
                {{data.totalLines}}
            </div>
            <div class="card">
                <div class="cardheader">Issue个数</div>
                {{data.issueNum}}
            </div>
            <div class="card">
                <div class="cardheader">主分支commit次数</div>
                {{data.commitNum}}
            </div>
            <div class="card">
                <div class="cardheader">MR次数</div>
                {{data.mrnum}}
            </div>
            <div class="card">
                <div class="cardheader">提交代码人数</div>
                {{Object.keys(data.linesByAuthor).length}}
            </div>
            <div class="card">
                <div class="cardheader">使用语言种类</div>
                {{Object.keys(data.linesByLanguage).length}}
            </div>

        </div>

        <div class="contributeitem" >
            <div id="charta" style="width: 49%;height:200px;display:inline-block;"></div>
            <div id="chartb" style="width: 49%;height:200px;display:inline-block;"></div>
        </div>

        <div class="contributetitle">
            分语言维度统计
             <el-button style="float:right;color:#409eff;" 
             @click="$router.push('/project/' + projectId+'/contribute/languagecontribute')"
             plain>点击前往</el-button>
        </div>
        <div class="contributetitle">
            分开发者维度分析
             <el-button style="float:right;color:#409eff;" 
             @click="$router.push('/project/' + projectId+'/contribute/usercontribute')"
             plain>点击前往</el-button>
        </div>
        <div class="contributetitle">
            commit分析
             <el-button style="float:right;color:#409eff;" 
             @click="$router.push('/project/' + projectId+'/contribute/commitcontribute')"
             plain>点击前往</el-button>
        </div>
        <div class="contributetitle">
            discussion活动分析
             <el-button style="float:right;color:#409eff;" plain>点击前往</el-button>
        </div>
        <!--div class="contributeitem" >
            <template v-for="(value,language) in this.data.linesByLanguageByAuthor" >
                <div :key="language" style="width: 49%;height:200px;display:inline-block; border:1px black solid" v-bind:id="'chart'+language"></div>
            </template>

        </div>

        <div class="contributeitem" >
            <template v-for="(value,author) in this.data.linesByAuthorByLanguage" >
                <div :key="author" style="width: 49%;height:200px;display:inline-block; border:1px black solid" v-bind:id="'chartauthor'+author"></div>
            </template>

        </div-->
        <div style="height:300px"></div>

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name:"Contribute",
    data(){
        return {
            data:{
                linesByLanguageByAuthor:{},
                linesByAuthor:{},
                linesByLanguage:{},
                mrnum:0,
            },
            authorFold:true,
            languageFold:true,
            summaryFold:true,
        }
    },
    methods:{
        generateChartA(){
            var chartDom = document.getElementById('charta');
            var myChart = echarts.init(chartDom);
            var option;
            var chartdata=[]
            for(let key in this.data.linesByLanguage){
                if (key!=""){
                    chartdata.push({value:this.data.linesByLanguage[key],name:key})
                }
                else{
                    chartdata.push({value:this.data.linesByLanguage[key],name:"others"})
                }
               
            }

            option = {
                title: {
                    text: '项目语言构成',
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
        generateChartB(){
            var chartDom = document.getElementById('chartb');
            var myChart = echarts.init(chartDom);
            var option;
            var chartdata=[]
            for(let key in this.data.linesByAuthor){        
                chartdata.push({value:this.data.linesByAuthor[key],name:key})
            }

            option = {
                title: {
                    text: '成员贡献构成',
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
                        // [
                        //     {value: 1048, name: '搜索引擎'},
                        //     {value: 735, name: '直接访问'},
                        //     {value: 580, name: '邮件营销'},
                        //     {value: 484, name: '联盟广告'},
                        //     {value: 300, name: '视频广告'}
                        // ],
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
    //     generateLanguagePersonChart(language){
    //         var chartDom = document.getElementById('chart'+language);
    //         var myChart = echarts.init(chartDom);
    //         var option;
    //         var chartdata=[]
    //         for(let key in this.data.linesByLanguageByAuthor[language]){  
    //             chartdata.push({value:this.data.linesByLanguageByAuthor[language][key],name:key})  
    //         }
    //         let title=language
    //         if(title==""){
    //             title="other"
    //         }
    //         option = {
    //             title: {
    //                 text: title+'贡献构成',
    //                 subtext: '',
    //                 left: 'center'
    //             },
    //             tooltip: {
    //                 trigger: 'item'
    //             },
    //             legend: {
    //                 orient: 'vertical',
    //                 left: 'left',
    //             },
    //             series: [
    //                 {
    //                     name: '',
    //                     type: 'pie',
    //                     radius: '50%',
    //                     data: chartdata,
                       
    //                     emphasis: {
    //                         itemStyle: {
    //                             shadowBlur: 10,
    //                             shadowOffsetX: 0,
    //                             shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                         }
    //                     }
    //                 }
    //             ]
    //         };

    //         option && myChart.setOption(option);

    //     },
    //     generatePersonLanguageChart(author){
    //         var chartDom = document.getElementById('chartauthor'+author);
    //         var myChart = echarts.init(chartDom);
    //         var option;
    //         var chartdata=[]
    //         for(let key in this.data.linesByAuthorByLanguage[author]){  
    //             chartdata.push({value:this.data.linesByAuthorByLanguage[author][key],name:key})  
    //         }
            
    //         option = {
    //             title: {
    //                 text: author+'贡献构成',
    //                 subtext: '',
    //                 left: 'center'
    //             },
    //             tooltip: {
    //                 trigger: 'item'
    //             },
    //             legend: {
    //                 orient: 'vertical',
    //                 left: 'left',
    //             },
    //             series: [
    //                 {
    //                     name: '',
    //                     type: 'pie',
    //                     radius: '50%',
    //                     data: chartdata,
                       
    //                     emphasis: {
    //                         itemStyle: {
    //                             shadowBlur: 10,
    //                             shadowOffsetX: 0,
    //                             shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                         }
    //                     }
    //                 }
    //             ]
    //         };

    //         option && myChart.setOption(option);

    //     }
     },

    created(){
        this.projectId=this.$route.params.projectid
        this.$axios({
            method:"get",
            url:"api/projects/statistic?id="+this.projectId
        }).then(
            (response)=>{
                
                this.data=response.data.data
                console.log(this.data)
                this.generateChartA()
                this.generateChartB()
                // for(let language in this.data.linesByLanguageByAuthor){
                //     this.$nextTick(()=>{this.generateLanguagePersonChart(language)})
                    
                // }
                // for (let author in this.data.linesByAuthorByLanguage){
                //     this.$nextTick(()=>{this.generatePersonLanguageChart(author)})
                // }   
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
.contributetitle {
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
.contributeitem {
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