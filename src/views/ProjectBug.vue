<template>
    <div>
        <ProjectFrame index=2 >
            <Bug></Bug>
        </ProjectFrame>
    </div>
</template>

<script>
import ProjectFrame from "@/components/ProjectFrame.vue";
import Bug from "@/components/Bug.vue"

export default {
    name:"ProjectBug",
    components: {
        ProjectFrame,
        Bug
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