<template>
    <div>
        <div class="qualitytitle" style="background-color: #409eff">检测规则配置</div>
         <el-button type="primary" style="margin-left:6.5%"  @click="onCreateClick">
             <i class="el-icon-plus" style="font-size: 15px"></i>
             {{!inputShow?"新建规则":"收起创建列表"}}
        </el-button>
        <div class="qualityitem" style="padding-top:15px" v-show="inputShow">
            <el-form  label-width="100px">
                <el-form-item label="检查项名称">
                    <el-input v-model="comment"></el-input>
                </el-form-item>

                <el-form-item label="正则表达式">
                    <el-input v-model="regex"></el-input>
                </el-form-item>

                <el-form-item label="检查项类型">
                    <el-radio v-model="regextype" label="coverage">覆盖率测试规则</el-radio>
                    <el-radio v-model="regextype" label="lint">代码风格测试规则</el-radio>
                </el-form-item>
                 <el-button type="primary" @click="onSubmit">创建检查项</el-button>
            </el-form>
        </div>

        <div class="qualityitem" style="background-color: #606266;color:white">
            现有覆盖率检测规则
        </div>

        <div class="qualityitem"
            v-for="i in data.coverage" v-bind:key="i.id">
            <el-button type="danger" style="float:right;" @click="onDelete(i.id)">删除</el-button>
            检查项:{{i.comment}}<br>
              <i class="regtext">正则表达式:"{{i.regex}}"</i>
              
        </div>

        <div class="qualityitem"  style="background-color: #606266;color:white">
            现有代码风格问题检测规则
        </div>

        <div class="qualityitem"
            v-for="i in data.lint" v-bind:key="i.id">
            <el-button type="danger" style="float:right;" @click="onDelete(i.id)">删除</el-button>
            检查项:{{i.comment}}<br>
              <i class="regtext">正则表达式:"{{i.regex}}"</i>
        </div>
        
        
    </div>
</template>

<script>

export default {
    name:"RegexSetting",
    data(){
        return {
            data:{
                coverage:[],
                lint:[],
            },
            regextype:"coverage",
            inputShow:false ,   
            projectId:"" , 
            regex:"",
            comment:""
        }
    },
    created(){
        this.projectId=this.$route.params.projectid
        this.$axios({
            method:"get",
            url:"/api/projects/regex/all?projectid="+this.projectId
        }).then(
            (response)=>{
                console.log(response.data.data)     
                this.data=response.data.data 
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
        onCreateClick(){
            this.inputShow=!this.inputShow
        },
        onSubmit:function(){
            this.$axios({
                url:"/api/projects/regex/create",
                method:'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                data:JSON.stringify({
                    project_id:parseInt(this.projectId),
                    regex:this.regex,
                    regex_type:this.regextype,
                    comment:this.comment,
                })
            }).then(
                (response)=>{
                    console.log(response)
                    this.$router.go(0)
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
        },
        onDelete(regexid){
            this.$axios({
                url:"/api/projects/regex/delete?regexid="+regexid,
                method:'get',
                
            }).then(
                (response)=>{
                    console.log(response)
                    this.$router.go(0)
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
        },
    },

}
</script>

<style scoped>
.qualitytitle {
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
    background-color: #67c23a;
}
.qualityitem {
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
.regtext{
     font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color:#909399;
    font-size: 15px;
}
</style>