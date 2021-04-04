<template>
    <div>
        <ProjectFrame index=4 >
            <UserContribute></UserContribute>
        </ProjectFrame>
    </div>
</template>

<script>
import ProjectFrame from "@/components/ProjectFrame.vue";
import UserContribute from "@/components/UserContribute.vue"
export default {
    name:"UserContributeView",
    components: {
        ProjectFrame,
        UserContribute
    },
   data(){
        return {
            projectId:this.$route.params.projectid,
        }
    },
}
</script>

<style>

</style>