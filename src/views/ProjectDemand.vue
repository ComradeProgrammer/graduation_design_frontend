<template>
    <div>
        <ProjectFrame index=1>
            <Demand :id="projectId"></Demand>
        </ProjectFrame>
    </div>
</template>

<script>
import ProjectFrame from "@/components/ProjectFrame.vue";
import Demand from  "@/components/Demand.vue";

export default {
    name:"ProjectDemand",
    components: {
        ProjectFrame,
        Demand
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