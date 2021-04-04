<template>
    <div>
        <ProjectFrame index=4 >
           <CommitContribute></CommitContribute>
        </ProjectFrame>
    </div>
</template>

<script>
import ProjectFrame from "@/components/ProjectFrame.vue";
import CommitContribute from "@/components/CommitContribute.vue"
export default {
    name:"CommitContributeView",
    components: {
        ProjectFrame,
        CommitContribute
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