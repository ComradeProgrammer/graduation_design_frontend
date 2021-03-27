<template>
    <ProjectFrame index=3>
        <RegexSetting></RegexSetting>
    </ProjectFrame>
</template>

<script>
import ProjectFrame from "@/components/ProjectFrame.vue";
import RegexSetting from "@/components/RegexSetting.vue"
export default {
    name:"SetRegex",
    components: {
        ProjectFrame,
        RegexSetting,
    },
}
</script>

<style>

</style>