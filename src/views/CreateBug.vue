<template>
    <div>
        <ProjectFrame index=2>
            
            <div id="createmilestonetitle">
                报告缺陷
            </div>
            <div id="createmilestoneform">
                <div class="formitem">
                    缺陷标题
                    <div style="margin:5px;" class="createalert"  v-show="!validTitle">
                        *缺陷标题不能为空
                    </div>
                    <el-input v-model="title" placeholder="请输入内容"></el-input>
                </div>

                <div class="formitem">
                   缺陷描述
                    <div style="margin:5px;" class="createalert" v-show="!validDescription">
                        *缺陷描述不能为空
                    </div>
                    <el-input v-model="description" type="textarea" :rows=3 placeholder="请输入内容"></el-input>
                </div>
                <div class="formitem">
                   缺陷开始修复时间&#12288;&#12288;
                    <div style="margin:5px;display:inline-block;" class="createalert" v-show="!validStartDate" >
                        *缺陷开始修复时间不能为空
                    </div>
                    <br>
                    <el-date-picker v-model="startdate"   type="date" placeholder="选择日期"
                    value-format="timestamp">
                    </el-date-picker>
                    {{startdate}}
                </div>
                <div class="formitem">
                   缺陷修复结束结束时间
                    <div style="margin:5px;display:inline-block;" class="createalert" v-show="!validDueDate">
                        *缺陷修复结束时间不能为空
                    </div>
                     <br>
                    <el-date-picker v-model="duedate"   type="date" placeholder="选择日期" value-format="timestamp">
                    </el-date-picker>
                </div>
                <div class="formitem">
                    缺陷优先级
                    <el-radio v-model="priority" label="P0"><el-tag type="danger">P0</el-tag></el-radio>
                    <el-radio v-model="priority" label="P1"><el-tag type="warning">P1</el-tag></el-radio>
                    <el-radio v-model="priority" label="P2"><el-tag >P2</el-tag></el-radio>
                </div>
                <div class="formitem">
                    缺陷所属的阶段性需求
                    <div style="margin:5px;display:inline-block;" class="createalert" v-show="!validMilestone">
                        *缺陷所属的阶段性需求不能为空
                    </div>
                    <br>
                    <el-select v-model="milestoneId" placeholder="请选择缺陷所属的阶段性需求">
                        <el-option
                        v-for="milestone in info"
                        :key="milestone.id"
                        :label="milestone.title"
                        :value="milestone.id">
                        </el-option>
                    </el-select>
                </div>
                
                <div class="formitem">
                    <el-button type="primary" :disabled="disabled" @click="onSubmit">提交</el-button>
                </div>
                
                
            </div>
           
        </ProjectFrame>
    </div>
  
</template>

<script>
import ProjectFrame from "@/components/ProjectFrame.vue";
export default {
    name:"CreateBug",
     components: {
        ProjectFrame,
    },
    data(){
        return{
            projectId:"",
            milestoneId:"",
            title:"",
            description:"",
            startdate:"",
            duedate:"",
            priority:'P0',
            info:{},
        }
    },
    created(){
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
            if(error.response.status==401){
                window.location.href="http://127.0.0.1:3333/login"
            }
            else{
                alert("发生错误")
                window.location.href="http://127.0.0.1:3333/login"
            }
        })
    },
    computed:{
        validTitle:function(){
            if (this.title!=""){
                return true
            }
            return false
        },
        validDescription:function(){
            if (this.description!=""){
                return true
            }
            return false
        },
        validStartDate:function(){
            if (this.startdate!=""){
                return true
            }
            return false
        },
        validDueDate:function(){
            if (this.duedate!=""){
                return true
            }
            return false
        },
        validMilestone:function(){
            if(this.milestoneId==""){
                return false
            }
            return true
        },
        disabled:function(){
            if (this.validTitle&&this.validDescription&&this.validStartDate&&this.validDueDate){
                return false
            }
            return true
        }
    },
    methods:{
        formatTime:function(myDate){
            let year=myDate.getFullYear()+""
            let month_=parseInt(myDate.getMonth())
            let month=month_>9?month_+1+"":"0"+(month_+1)
            let date_=parseInt(myDate.getDate())
            let  date=date_>10?""+date_:"0"+date_ 
           return year+"-"+month+"-"+date
        },
        onSubmit:function(){
            this.$axios({
                url:"/api/projects/milestone/issue/create",
                method:'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                data:JSON.stringify({
                    project_id:parseInt(this.projectId),
                    milestone_id:parseInt(this.milestoneId),
                    title:this.title,
                    description:this.description,
                    start_date:this.formatTime(new Date(this.startdate)),
                    due_date:this.formatTime(new Date(this.duedate)),
                    type_tag:"bug",
                    priority_tag:this.priority
                })
            }).then(
                (response)=>{
                    console.log(response)
                    this.$router.push('/project/' + this.projectId+"/bug")
                }
            ).catch((error) =>{
                console.log(error.response)
                if(error.response.status==401){
                    window.location.href="http://127.0.0.1:3333/login"
                }
                else{
                    alert("发生错误")
                    window.location.href="http://127.0.0.1:3333/login"
                }
            })
        }
    }
}
</script>

<style scope>
#createmilestonetitle{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 25px;
    width:95%;
    height:40px;
    padding: 10px;
    margin:5px auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    color: white;
    background-color: #409EFF;
    margin-bottom: 15px;
}
#createmilestoneform{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size:20px;
    width:90%;
    margin: 0 auto;
}
.formitem{
    margin-top:5px;
    margin-bottom: 10px;
}
.createalert{
    color: red;
    font-size:13px ;
}
</style>