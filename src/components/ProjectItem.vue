<template>
  <div id="projectitem">
        <div id="projectname">{{name}}</div>
        <div id="buttons">
            <el-button type="primary" @click="onMainButtonClick">{{buttonMsg}}</el-button>
            <el-button type="warning" @click="gotogitlab">前往gitlab</el-button>  
        </div>
        <br/>
        <div id="projectinfo">project_id:{{id}}&nbsp;ssh_url:{{sshurl}}</div>
  </div>
</template>

<script>
export default {
    name:"ProjectItem",
    props:["name","weburl","id","sshurl","tracked"],
    methods:{
        gotogitlab:function(){
            window.location.href=this.weburl
        },
        //todo: add project page
        gotoproject:function(){
            this.$router.push('project/' + this.id)
        },
        onMainButtonClick:function(){
            if (this.tracked==1){
                this.gotoproject()
            }
            else{
                //todo:fix
                this.$axios({
                    method:"get",
                    url:"api/projects/track?id="+this.id
                }).then(
                    (response)=>{
                        console.log(response)
                        location.reload();
                    }
                ).catch((error)=>{
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
    },
    computed:{
        buttonMsg:function(){
            if (this.tracked==1){
                return "进入项目"
            }else{
                return "纳入管理"
            }
        }
    },
}
</script>

<style scope>
#projectitem{
    height:80px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    width:80%;
    margin:5px auto;
    overflow:hidden;
}
#projectname{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 20px;
    margin-left:30px;
    margin-top:10px;
    display: inline-block;
}
#buttons{
    float:right;
    display: inline;
    margin-right: 10px;
    margin-top: 10px;
    
}
#projectinfo{
     font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 15px;
    margin-left:30px;
    margin-top:10px;
    display: inline-block;
    color:#606266;
}
</style>