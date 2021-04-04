<template>
  <div>
      <div style="width:100%;padding:20px;border: 1px solid #eaeefb;border-top:none;">
        <el-page-header @back="goBack" content="活动维度分析"></el-page-header>
      </div>
       <div class="title">
            总体活动情况
        </div>

      <div class="cardlist">
            <div class="card">
                <div class="cardheader">总commit数</div>
                {{this.data.commit.length}}
            </div>
            <div class="card">
                <div class="cardheader">总MR数</div>
                {{this.data.mrs.length}}
            </div>
            <div class="card">
                <div class="cardheader">note(comment)个数</div>
                {{this.data.note.length}}
            </div>

        </div>

        <div class="title">
            活跃度分析
        </div>
        <div class="item">
            什么是活跃度？<br>
            某日的活跃度=commit数目+mr数目+note数目(issue 下的comment,mr下的comment,打开关闭issue等等操作)
        </div>
         <div class="item" id="main" style="height:300px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name:"ActivityContribute.vue",
    data(){
        return {
            data:{
                commit:[],
                issues:[],
                language:[],
                mrs:[],
                note:[],
            }
        }
    },
    methods:{
         goBack() {
            this.$router.go(-1)
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
            //第一步计算每天提交多少commit
            let m={}
            let x=[]
            let y=[]
            for(let i=0;i<this.data.commit.length;i++){
                if(this.data.commit[i].date in m){
                    m[this.data.commit[i].date]++
                }else{
                    m[this.data.commit[i].date]=1
                }

            }
            //然后是discussion
            for(let i=0;i<this.data.note.length;i++){
                let dateObj=new Date(this.data.note[i].created_at)
                let dateKey=this.getDateStr(dateObj)
                if(dateKey in m){
                    m[dateKey]++
                }
                else{
                    m[dateKey]=1
                }
            }

            //mrs
            for(let i=0;i<this.data.mrs.length;i++){
                let dateObj=new Date(this.data.mrs[i].created_at)
                let dateKey=this.getDateStr(dateObj)
                if(dateKey in m){
                    m[dateKey]++
                }
                else{
                    m[dateKey]=1
                }
            }

            //生成表格数据
            for(let i=13;i>=0;i--){
                let tmp=new Date()
                tmp=new Date(tmp.setDate(tmp.getDate()-i))
                let dateStr=this.getDateStr(tmp)
                x.push(dateStr)
                if(dateStr in m){
                    y.push(m[dateStr])
                }else{
                    y.push(0)
                }
            }
            
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                title: {
                    text: '14日内活跃度趋势',
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
                        name: '活跃度',
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
            url:"api/projects/statistic/activity?id="+this.projectId
        }).then(
            (response)=>{
                
                this.data=response.data.data
                console.log(this.data)
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

<style scoped>
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