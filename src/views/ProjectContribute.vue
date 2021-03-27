<template>
    <div>
        <ProjectFrame index=4 >
            <Contribute></Contribute>
        </ProjectFrame>
    </div>
</template>

<script>
import ProjectFrame from "@/components/ProjectFrame.vue";
import Contribute from "@/components/Contribute.vue"
export default {
    name:"ProjectContribute",
    components: {
        ProjectFrame,
        Contribute
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