<template>
    <ProjectFrame index=1>
            <MilestoneDetail></MilestoneDetail>
    </ProjectFrame>
</template>

<script>
import ProjectFrame from "@/components/ProjectFrame.vue";
import MilestoneDetail from "@/components/MilestoneDetail.vue";
export default {
    name:"Milestone",
    components: {
        ProjectFrame,
        MilestoneDetail,
    },
}
</script>

<style>

</style>