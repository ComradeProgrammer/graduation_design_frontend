<template>
    <div id="demand">
        <div class="topoperation">
            
            <el-button type="primary" @click="onCreateButtonClick">
                <i class="el-icon-plus" style="font-size:15px"></i>
                新建阶段性目标
            </el-button>
        </div>
        
        <template v-for="(milestone,i) in info" >
            <el-card class="box-card" v-bind:key="milestone.id">
                <template #header >
                    <div class="card-header" >
                    <span>阶段性目标:{{milestone.title}}</span>
                    <el-button class="button" 
                    @click=" onDetailButtonClick(milestone.id)">查看详情</el-button>
                    </div>
                </template>
                <div class="text">已完成需求{{customInfo[i].allissue[0]}}</div>
                <div class="text" style="float:right">需求总数 {{customInfo[i].allissue[0]+customInfo[i].allissue[1]}}</div>
                <el-progress id="progress" 
                    :text-inside="true" 
                    :stroke-width="26" 
                    :percentage="customInfo[i].percentage">
                </el-progress>
                <div class="seperator" style="margin-left:0">
                    <el-tag type="danger">P0</el-tag>
                    <div class="text">需求 进度:({{customInfo[i].p0issue[0]}}
                        /
                        {{customInfo[i].p0issue[1]+customInfo[i].p0issue[0]}})</div>
                </div>
                <div class="seperator">
                    <el-tag type="warning">P1</el-tag>
                   <div class="text">需求 进度:({{customInfo[i].p1issue[0]}}
                       /
                       {{customInfo[i].p1issue[1]+customInfo[i].p1issue[0]}})</div>
                </div>
                <div class="seperator">
                    <el-tag>P2</el-tag>
                    <div class="text">需求 进度:({{customInfo[i].p2issue[0]}}
                        /
                        {{customInfo[i].p2issue[1]+customInfo[i].p2issue[0]}})</div>
                </div>
                <el-divider></el-divider>
                <i class="el-icon-share"></i>Merge Request 总数 {{customInfo[i].mrinfo[0]+customInfo[i].mrinfo[1]+customInfo[i].mrinfo[2]}}
                <div class="seperator">
                    <el-tag type="success">Merged</el-tag>
                    <div class="text">{{customInfo[i].mrinfo[0]}}</div>
                </div>
                <div class="seperator">
                    <el-tag type="warning">Opening</el-tag>
                    <div class="text">{{customInfo[i].mrinfo[1]}}</div>
                </div>
                <div class="seperator">
                    <el-tag type="danger">Closed</el-tag>
                    <div class="text">{{customInfo[i].mrinfo[2]}}</div>
                </div>
                
            </el-card>
        </template>
    </div>
</template>

<script>
export default {
    name:"Demand",
    props:["id"],//id is project id
    methods:{
        //return [num of closed feature/num of opened feature]
        countPxDemand:function(milestone,priority){
            let res=[0,0]
            for(let i=0;i<milestone.issues.length;i++){
                if( milestone.issues[i].labels.indexOf(priority)>-1 && milestone.issues[i].labels.indexOf("feature")>-1){
                    if (milestone.issues[i].state!="opened"){
                        res[0]++
                    }else{
                        res[1]++
                    }
                }
            }
            return res
        },
        countDemand:function(milestone){
            let res=[0,0]
            for(let i=0;i<milestone.issues.length;i++){
                if( milestone.issues[i].labels.indexOf("feature")>-1){
                    if (milestone.issues[i].state!="opened"){
                        res[0]++
                    }else{
                        res[1]++
                    }
                }
            }
            return res
        },
        //return [merged opening closed]
        countMr:function(milestone){
            let res=[0,0,0]
            for(let i=0;i<milestone.mrs.length;i++){
                if (milestone.mrs[i].state=="closeed"){
                    res[2]++
                }else if(milestone.mrs[i].state=="merged"){
                    res[0]++
                }else{
                    res[1]++
                }
            }
            return res
        },
        onCreateButtonClick:function(){
            this.$router.push('/project/' + this.id+'/createmilestone')
        },
        onDetailButtonClick:function(milestoneid){
            this.$router.push('/project/' + this.id+'/milestone/'+milestoneid)
        }
    },
    data(){
        return {
            info:[]
        }
    },
    computed:{
        customInfo:function(){
            var res=[]
            for(let i=0;i<this.info.length;i++){
                let allissue=this.countDemand(this.info[i])
                let p0issue=this.countPxDemand(this.info[i],"P0")
                let p1issue=this.countPxDemand(this.info[i],"P1")
                let p2issue=this.countPxDemand(this.info[i],"P2")
                let mrinfo=this.countMr(this.info[i])
                let percentage=0
                if (allissue[0]+allissue[1]!=0){
                    percentage=(allissue[0]/(allissue[0]+allissue[1]))*100
                }
                res.push({
                    allissue:allissue,
                    p0issue:p0issue,
                    p1issue:p1issue,
                    p2issue:p2issue,
                    mrinfo:mrinfo,
                    percentage:percentage
                })
            }
            return res
        }
    },
    created(){
        console.log(this.$route.params.projectid)
        this.projectId=this.$route.params.projectid
        this.$axios({
            method:"get",
            url:"api/projects/milestone/all?projectid="+this.projectId
        }).then(
            (response)=>{
                this.info=response.data
            }
        ).catch((error) =>{
            console.log(error)
        })
    },
}
</script>

<style scope>
#demand{
    width:100%;

}
#progress{
    margin:3px;
}
.box-card {
    width: 90%;
    margin:0 auto;
    font-size: 20px;
    margin-bottom: 5px;
    
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#409EFF;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
    
.text {
    display: inline-block;
    font-size: 15px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    margin: 2px;
}
.seperator{
    display: inline-block;
    margin-left: 20px;
    margin-right:20px ;
    margin-top:2px;
    margin-bottom:5px;
}

.topoperation{
    width: 90%;
    margin:0 auto;
    padding-bottom: 10px;
}

</style>