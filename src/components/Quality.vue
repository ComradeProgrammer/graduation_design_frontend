<template>
    <div>
        <div class="buttons">
            <el-button type="primary" @click="onGotoSettingClick">
                <i class="el-icon-s-tools" style="font-size: 15px"></i>
                配置检查项
            </el-button>
        </div>

        <template v-show="hasResult">
            <div class="qualitytitle" style="background-color: #67c23a" v-show="data.build">
                <i class="el-icon-check"></i>代码构建:成功
            </div>
            <div class="qualitytitle" style="background-color: #f56c6c" v-show="!data.build">
                <i class="el-icon-close"></i>代码构建:失败
            </div>

            <div class="qualitytitle" style="background-color: #67c23a"  v-show="data.test">
                <i class="el-icon-check"></i>单元测试:成功
            </div>
            <div class="qualitytitle" style="background-color: #f56c6c" v-show="!data.test">
                <i class="el-icon-close"></i>单元测试:失败
            </div>

            <div class="qualitytitle" style="background-color: #409eff">
                <i class="el-icon-info"></i>单元测试覆盖检测项
            </div>
            <div class="qualityitem" v-for="(item,i) in data.coverage" :key="i">
                检查项:{{item.description.comment}}
                <i class="bugtext">正则表达式:"{{item.description.regex}}"</i><br>
                检查结果<br>
                <i class="bugtext" v-for="(msg,j) in item.res" :key="j">
                    "{{msg}}"<br>
                </i>
            </div>

            <div class="qualitytitle" style="background-color: #409eff">
                <i class="el-icon-info"></i>代码风格检测项
            </div>
            <div class="qualityitem" v-for="(item,i) in data.lint" :key="-i-1">
                检查项:{{item.description.comment}}
                <i class="bugtext">正则表达式:"{{item.description.regex}}"</i><br>
                检查结果:检测到{{item.res.length}}个问题<br>
                <i class="bugtext" v-for="(msg,j) in item.res" :key="j">
                    "{{msg}}"<br>
                </i>
            </div>
        </template>
        <template v-show="hasResult">
            <div class="qualitytitle" style="background-color: #606266" v-show="!data.build">
                <i class="el-icon-info"></i>
                当前主分支有正在运行中的CI-PIPELINE,请稍后再来查询
            </div>

        </template>
    </div>
</template>

<script>
export default {
    name: "Quality",
    data() {
        return {
            projectId:"",
            data:{
                
            },
        };
    },
    computed:{
        hasResult:function(){
            if (this.data.status=="created"||this.data.status=="waiting_for_resource"||this.data.status=="preparing"||this.data.status=="running"){
                return false
            }
            return true
        }
    },
    methods:{
        onGotoSettingClick(){
            this.$router.push('/project/' + this.projectId+'/quality/setting')
        },
    },
    created(){
        this.projectId=this.$route.params.projectid
        this.$axios({
            method:"get",
            url:"api/projects/quality?projectid="+this.projectId
        }).then(
            (response)=>{
                console.log(response.data.data)
                
                this.data=response.data.data
                console.log(this.data.build)
               
            }
        ).catch((error) =>{
            console.log(error)
        })
    }
};
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