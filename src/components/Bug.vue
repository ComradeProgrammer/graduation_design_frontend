<template>
    <div>
        <div class="bugtitle" style="background-color:#409eff">
            总计{{customData[0].length+customData[1].length+customData[2].length}}个缺陷未完成，
            （其中<el-tag type="danger">P0</el-tag>{{customData[0].length}}个
            <el-tag type="warning">P1</el-tag>{{customData[1].length}}个
            <el-tag>P2</el-tag>{{customData[2].length}}个）
            ;
            另有{{customData[3].length}}个缺陷已经解决
        </div>
         <div class="buttons" >
            
            <el-button type="primary" @click="onCreateBugClick">
                <i class="el-icon-plus" style="font-size:15px"></i>
                报告新的缺陷
            </el-button>
        </div>
        <div class="bugtitle" style="background-color:#303133">未解决
            ({{customData[0].length+customData[1].length+customData[2].length}})
        </div>
        <div style="margin:0 auto;width:95%">
            <div class="bugp0title">
            P0等级缺陷({{customData[0].length}})
            </div>
            <div class="bugitem" v-for="bug in customData[0]" :key="bug.id">
                <el-tag type="danger">P0</el-tag>
                缺陷:{{bug.title}}
                <div style="display:inline-block;float:right">
                    <!--el-button type="danger" >强行关闭</el-button-->
                    <el-button type="warning" style="float:right" @click="gotoGitlab(bug.web_url)">前往gitlab查看</el-button>
                </div><br>
                <div class="bugtext">
                    描述:{{bug.description}}<br>
                    计划Fix时间 {{bug.due_date}} 
                </div>
            </div>
            <div class="bugp1title">
                P1等级缺陷({{customData[1].length}})
            </div>
            <div class="bugitem" v-for="bug in customData[1]" :key="bug.id">
                <el-tag type="warning">P1</el-tag>
                缺陷:{{bug.title}}
                <div style="display:inline-block;float:right">
                    <!--el-button type="danger" >强行关闭</el-button-->
                    <el-button type="warning" style="float:right" @click="gotoGitlab(bug.web_url)">前往gitlab查看</el-button>
                </div><br>
                <div class="bugtext">
                    描述:{{bug.description}}<br>
                    计划Fix时间 {{bug.due_date}} 
                </div>
            </div>
            <div class="bugp2title">
                P2等级缺陷({{customData[2].length}})
            </div>
            <div class="bugitem" v-for="bug in customData[2]" :key="bug.id">
                <el-tag>P2</el-tag>
                缺陷:{{bug.title}}
                <div style="display:inline-block;float:right">
                    <!--el-button type="danger" >强行关闭</el-button-->
                    <el-button type="warning" style="float:right" @click="gotoGitlab(bug.web_url)">前往gitlab查看</el-button>
                </div><br>
                <div class="bugtext">
                    描述:{{bug.description}}<br>
                    计划Fix时间 {{bug.due_date}} 
                </div>
            </div>
        </div>
        <div class="bugtitle" style="background-color:#67C23A">已解决({{customData[3].length}})</div>
        <div style="margin:0 auto;width:95%">
            <div class="bugitem" v-for="bug in customData[3]" :key="bug.id">
                <el-tag type="danger" v-if="getPriority(bug)=='P0'">P0</el-tag>
                <el-tag type="warning"  v-if="getPriority(bug)=='P1'">P1</el-tag>
                <el-tag  v-if="getPriority(bug)=='P2'">P2</el-tag>
                缺陷:{{bug.title}}
                <div style="display:inline-block;float:right">
                    <!--el-button type="danger" >强行关闭</el-button-->
                    <el-button type="warning" style="float:right" @click="gotoGitlab(bug.web_url)">前往gitlab查看</el-button>
                </div><br>
                <div class="bugtext">
                    描述:{{bug.description}}<br>
                   <div class="bugtext">计划Fix时间 {{bug.due_date}}  实际修复时间 {{getTime(bug.closed_at)}} </div>
                </div>
            </div>
            
        </div>
    </div>
  
</template>

<script>
export default {
    name:"Bug",
    data (){
        return {
            info:[],
            projectId:"",
        }
    },
    created(){
        this.projectId=this.$route.params.projectid
        this.$axios({
            method:"get",
            url:"api/projects/issue/all?projectid="+this.projectId
        }).then(
            (response)=>{
                console.log(response.data)
                this.info=response.data
                console.log(this.customData)
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
    methods:{
        onCreateBugClick(){
            this.$router.push('/project/' + this.projectId+'/createbug')
        },
        gotoGitlab(weburl){
            window.location.href=weburl
        },
        getTime(str){
            return str.substr(0,str.indexOf('T'))
        },
        getPriority(issue){
            if(issue.labels.indexOf("P0")>-1){
                return "P0"
            }
            if(issue.labels.indexOf("P1")>-1){
                return "P1"
            }
            if(issue.labels.indexOf("P2")>-1){
                return "P2"
            }

        }
    },
    computed:{
        customData:function(){
            let res=[[],[],[],[]]//p0 p1 p2 fixed

            for(let i=0;i<this.info.length;i++){
                if(!(this.info[i].labels.indexOf("bug")>-1)){
                    continue//ignore feature
                }
                if (this.info[i].state=="closed"){
                    res[3].push(this.info[i])
                }else{
                    if(this.info[i].labels.indexOf("P0")>-1){
                        res[0].push(this.info[i])
                    }
                    else if(this.info[i].labels.indexOf("P1")>-1){
                        res[1].push(this.info[i])
                    }
                    else  if(this.info[i].labels.indexOf("P2")>-1){
                        res[2].push(this.info[i])
                    }
                }
            }
            return res
        }
    }
}
</script>

<style scoped>
.bugtitle {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    width: 90%;
     height: 60px;
    line-height: 60px;
    margin: 15px auto;
    margin-bottom: 2px;
    padding: 5px;
    padding-left: 15px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: white;
    font-size: 20px;
}
.bugp0title {
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
    background-color: #F56C6C;
}
.bugp1title {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    width: 90%;
    height: 40px;
    line-height: 40px;
    margin: 15px auto;
    margin-bottom: 2px;
    padding: 3px;
    padding-left: 15px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: white;
    font-size: 20px;
    background-color: #E6A23C;
}
.bugp2title {
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
    background-color: #909399;
}
.bugitem{
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    width: 85%;
    padding: 5px;
    padding-left: 15px;
    margin: 5px auto;
    
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

    font-size: 20px;
    display: block;
}
.bugtext{
     font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color:#909399;
    font-size: 15px;
}
.buttons{
    width: 90%;
    padding: 5px;
    padding-right: 15px;
    margin: 0px auto;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 20px;
}
</style>