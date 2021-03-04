<template>
    <div>
        <MyHeader title="软工质量平台" avatar=""></MyHeader>
        <el-row>
            <!--left side bar-->
            <el-col :span="4">
                <div>
                    <!--左侧菜单-->
                    <el-menu :default-active="index" @select="handleSelect">
                        <el-menu-item index="1">
                            <i class="el-icon-s-flag"></i>
                            <template #title>需求看板</template>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-error"></i>
                            <template #title>缺陷看板</template>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-data-analysis"></i>
                            <template #title>单元测试结果</template>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-warning"></i>
                            <template #title>代码风格检查</template>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-col>
            <!--right side bar-->
            <el-col :span="20">
                <div style="height: 10px"></div>
                <slot></slot>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
export default {
    name: "ProjectFrame",
    props: ["index"],
    components: {
        MyHeader,
    },
    data(){
        return {
            projectId:"",
        }
    },

    methods: {
        handleSelect(index, indexPath) {
            console.log(index, indexPath);
            switch(index){
                case "1":
                    this.$router.push('/project/' + this.projectId)
                    break
                case "2":
                    this.$router.push('/project/' + this.projectId+'/bug')  
                    break
                default:
                    console.log("unhandled index")
            }
        },
    },
    created(){
        this.projectId=this.$route.params.projectid
    },
};
</script>

<style>
</style>