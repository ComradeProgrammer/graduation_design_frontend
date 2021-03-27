<template>
    <div>
        <ProjectFrame index=3>
            <Quality></Quality>
        </ProjectFrame>
    </div>
</template>

<script>
import ProjectFrame from "@/components/ProjectFrame.vue";
import Quality from "@/components/Quality.vue"
export default {
    name:"ProjectQuality",
    components: {
        ProjectFrame,
        Quality
    },

}
</script>

<style>

</style>