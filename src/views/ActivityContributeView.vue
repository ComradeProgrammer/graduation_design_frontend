<template>
    <div>
        <ProjectFrame index=4 >
          <ActivityContribute></ActivityContribute>
        </ProjectFrame>
    </div>
</template>

<script>
import ProjectFrame from "@/components/ProjectFrame.vue";
import ActivityContribute from "@/components/ActivityContribute.vue"
export default {
    name:"ActivityContributeView",
    components: {
        ProjectFrame,
        ActivityContribute
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