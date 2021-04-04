<template>
    <div>
        <ProjectFrame index=4 >
            <LanguageContribute></LanguageContribute>
        </ProjectFrame>
    </div>
</template>

<script>
import ProjectFrame from "@/components/ProjectFrame.vue";
import LanguageContribute from "@/components/LanguageContribute.vue"
export default {
    name:"LanguageContributeView",
    components: {
        ProjectFrame,
        LanguageContribute
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