<template>
    <div id="myheader">
        <el-image style="height:56px;width=65px;" :src="imageurl"></el-image>
        <div id="content">{{title}}</div>
        
         <el-avatar id="avatar" shape="circle" :size="50"  :src="avatar"></el-avatar>
         <el-button type="danger" style="float:right;margin-top:10px;margin-right:5px" @click="logout">退出登录</el-button>
        </div>
</template>

<script>
export default {
    name: "MyHeader",
    props: ["title","avatar"],
    data(){
        return {
            imageurl:require("@/assets/logo.png")
        }
    },
    methods:{
        logout(){
            //todo change to real ip
            alert("请在gitlab中退出登录")
            window.location.href="http://127.0.0.1:3333/logout"
        }
    }
};
</script>

<style scope>
#myheader {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    height: 60px;
    background-color: #409EFF;
    width: 100%;
    
    
    
}
#content{
    display: inline-block;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: white;
    font-size: 25px;
    height: 60px;
    line-height: 60px;
    vertical-align: top
}
#avatar{
    float: right;
    margin-right: 20px;
    margin-top:5px;
}
</style>