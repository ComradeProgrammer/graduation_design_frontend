<template>
    <div>
        <MyHeader
            title="软工质量平台"
            avatar=""
        ></MyHeader>
        <div class="hometitle" style="background-color: #409EFF;">进入已经纳入质量管理的项目</div>
        <template v-for="t in tracked">
            <ProjectItem
                v-bind:key="t.id"
                v-bind:name="t.name_with_namespace"
                v-bind:weburl="t.web_url"
                v-bind:id="t.id"
                v-bind:sshurl="t.ssh_url_to_repo"
                tracked=1></ProjectItem>
        </template>
        <div class="hometitle" style="background-color: #909399;">或者将属于自己的项目纳入质量管理</div>
        <template v-for="t in untracked">
            <ProjectItem
                v-bind:key="t.id"
                v-bind:name="t.name_with_namespace"
                v-bind:weburl="t.web_url"
                v-bind:id="t.id"
                v-bind:sshurl="t.ssh_url_to_repo"
                tracked=0></ProjectItem>
        </template>
    </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import MyHeader from "@/components/MyHeader.vue";
import ProjectItem from "@/components/ProjectItem.vue";


export default {
    name: "Home",
    components: {
        MyHeader,
        ProjectItem
    },
    data(){
        return {
            tracked:{},
            untracked:{},
        }
    },
    created(){
        this.$axios({
            method:"get",
            url:"/api/projects",
        }).then(
            (response)=>{
                console.log(response)
                this.tracked=response.data.tracked
                this.untracked=response.data.untracked
            }
        ).catch((error) =>{
            console.log(error)
        })
    }
};
</script>
<style scoped>
.hometitle{
    
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    width:80%;
    height:40px;
    margin: 15px auto;
    padding-left:15px ;
    line-height:40px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: white;
    font-size: 15px;
    
   
}
</style>