<template>
    <div>
        <div class="milestonetitle">阶段性目标:{{ info.title }}</div>
        <div class="buttons">
            <el-button type="primary" @click="onEditMilestoneClick">
                <i class="el-icon-edit" style="font-size: 15px"></i>
                编辑阶段性目标
            </el-button>
            <!--el-button type="warning" >前往gitlab查看阶段性目标</el-button-->
            <el-button type="primary" @click="onCreateDemandClick">
                <i class="el-icon-plus" style="font-size: 15px"></i>
                新建子需求
            </el-button>
            <el-button type="danger" @click="onDeleteMilestoneClick">
                <i class="el-icon-delete" style="font-size: 15px"></i>
                删除阶段性目标
            </el-button>
        </div>
        <div class="subtitle">
            描述:{{ info.description }}<br />
            <i style="font-size: 15px">计划于{{ info.due_date }}完成</i><br />
        </div>
        <div class="subtitle">
            子需求
            <el-collapse v-model="activeNo">
                <el-collapse-item name="0">
                    <template #title>
                        <el-tag type="danger">P0</el-tag>&nbsp;&nbsp;(已完成{{
                            customInfo.p0issue[0]
                        }}/总计{{
                            customInfo.p0issue[0] + customInfo.p0issue[1]
                        }})
                    </template>

                    <div v-for="issue in p0" :key="issue.id">
                        <div class="issueitem" v-if="issue.state == 'closed'">
                            <el-tag type="danger">P0</el-tag>
                            <el-tag type="success">已完成</el-tag>
                            子需求:{{ issue.title }}
                            <el-button
                                type="warning"
                                style="float: right"
                                @click="gotoGitlab(issue.web_url)"
                                >前往gitlab查看</el-button
                            ><br />
                            计划结束时间
                            {{ issue.due_date }}
                            &nbsp;&nbsp;&nbsp;&nbsp;结束时间：{{
                                getTime(issue.closed_at)
                            }}
                        </div>
                        <div class="issueitem" v-if="issue.state == 'opened'">
                            <el-tag type="danger">P0</el-tag>
                            <el-tag effect="dark">进行中</el-tag>
                            子需求:{{ issue.title }}
                            <div style="display: inline-block; float: right">
                                <!--el-button type="danger" >强行关闭</el-button-->
                                <el-button
                                    type="warning"
                                    style="float: right"
                                    @click="gotoGitlab(issue.web_url)"
                                    >前往gitlab查看</el-button
                                >
                            </div>
                            <br />
                            计划结束时间
                            {{ issue.due_date }} &nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="1">
                    <template #title>
                        <el-tag type="warning">P1</el-tag>&nbsp;&nbsp;(已完成{{
                            customInfo.p1issue[0]
                        }}/总计{{
                            customInfo.p1issue[0] + customInfo.p1issue[1]
                        }})
                    </template>
                    <div v-for="issue in p1" :key="issue.id">
                        <div class="issueitem" v-if="issue.state == 'closed'">
                            <el-tag type="warning">P1</el-tag>
                            <el-tag type="success">已完成</el-tag>
                            子需求:{{ issue.title }}
                            <el-button
                                type="warning"
                                style="float: right"
                                @click="gotoGitlab(issue.web_url)"
                                >前往gitlab查看</el-button
                            ><br />
                            计划结束时间
                            {{ issue.due_date }}
                            &nbsp;&nbsp;&nbsp;&nbsp;结束时间：{{
                                getTime(issue.closed_at)
                            }}
                        </div>
                        <div class="issueitem" v-if="issue.state == 'opened'">
                            <el-tag type="warning">P1</el-tag>
                            <el-tag effect="dark">进行中</el-tag>
                            子需求:{{ issue.title }}
                            <div style="display: inline-block; float: right">
                                <!--el-button type="danger" >强行关闭</el-button-->
                                <el-button
                                    type="warning"
                                    style="float: right"
                                    @click="gotoGitlab(issue.web_url)"
                                    >前往gitlab查看</el-button
                                >
                            </div>
                            <br />
                            计划结束时间
                            {{ issue.due_date }} &nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template #title>
                        <el-tag>P2</el-tag>&nbsp;&nbsp;(已完成{{
                            customInfo.p2issue[0]
                        }}/总计{{
                            customInfo.p2issue[0] + customInfo.p2issue[1]
                        }})
                    </template>
                    <div v-for="issue in p2" :key="issue.id">
                        <div class="issueitem" v-if="issue.state == 'closed'">
                            <el-tag>P2</el-tag>
                            <el-tag type="success">已完成</el-tag>
                            子需求:{{ issue.title }}
                            <el-button
                                type="warning"
                                style="float: right"
                                @click="gotoGitlab(issue.web_url)"
                                >前往gitlab查看</el-button
                            ><br />
                            计划结束时间
                            {{ issue.due_date }}
                            &nbsp;&nbsp;&nbsp;&nbsp;结束时间：{{
                                getTime(issue.closed_at)
                            }}
                        </div>
                        <div class="issueitem" v-if="issue.state == 'opened'">
                            <el-tag>P2</el-tag>
                            <el-tag effect="dark">进行中</el-tag>
                            子需求:{{ issue.title }}
                            <div style="display: inline-block; float: right">
                                <!--el-button type="danger" >强行关闭</el-button-->
                                <el-button
                                    type="warning"
                                    style="float: right"
                                    @click="gotoGitlab(issue.web_url)"
                                    >前往gitlab查看</el-button
                                >
                            </div>
                            <br />
                            计划结束时间
                            {{ issue.due_date }} &nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>

        <div class="subtitle">
            <el-collapse>
                <el-collapse-item>
                    <template #title>
                        <i class="el-icon-share"></i>
                        <div style="display: inline; font-size: 20px">
                            Merge Request 总数{{
                                customInfo.mrinfo[0] +
                                customInfo.mrinfo[1] +
                                customInfo.mrinfo[2]
                            }}
                        </div>

                        <div style="width: 20px"></div>
                        <el-tag type="success">Merged</el-tag>
                        <div style="width: 5px"></div>
                        <div class="text">{{ customInfo.mrinfo[0] }}</div>

                        <div style="width: 20px"></div>
                        <el-tag type="warning">Opening</el-tag>
                        <div style="width: 5px"></div>
                        <div class="text">{{ customInfo.mrinfo[1] }}</div>

                        <div style="width: 20px"></div>
                        <el-tag type="danger">Closed</el-tag>
                        <div style="width: 5px"></div>
                        <div class="text">{{ customInfo.mrinfo[2] }}</div>
                    </template>
                    <div
                        class="issueitem"
                        v-for="mr in info.mrs"
                        v-bind:key="mr.id"
                    >
                        MR:{{ mr.title }}
                        <el-button
                            type="warning"
                            style="float: right"
                            @click="gotoGitlab(mr.web_url)"
                            >前往gitlab查看</el-button
                        ><br />
                        创建时间 {{ getTime(mr.created_at) }}
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
export default {
    name: "MilestoneDetail",
    data() {
        return {
            activeNo: "",
            projectId: "",
            milestoneId: "",
            info: {
                issues: [],
                mrs: [],
            },
        };
    },
    created() {
        this.projectId = this.$route.params.projectid;
        this.milestoneId = this.$route.params.milestoneid;
        this.$axios({
            method: "get",
            url:
                "api/projects/milestone?projectid=" +
                this.projectId +
                "&milestoneid=" +
                this.milestoneId,
        }).then((response) => {
                console.log(response.data);
                this.info = response.data;
                console.log(this.p0);
        }).catch((error) => {
            console.log(error);
        });
    },
    methods: {
        onDeleteMilestoneClick() {
            this.$confirm("此操作将永久删除该阶段计划, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.$axios({
                    method: "get",
                    url:
                        "api/projects/milestone/delete?projectid=" +
                        this.projectId +
                        "&milestoneid=" +
                        this.milestoneId,
                    }).then((response) => {
                        console.log(response.data);
                         this.$message({
                            type: "success",
                            message: "删除成功!",
                         });
                        this.$router.push('/project/' + this.projectId)
                    }).catch((error) => {
                        console.log(error);
                    });
            }).catch(() => {});
        },
        onEditMilestoneClick() {
            this.$router.push(
                "/project/" +
                    this.projectId +
                    "/editmilestone/" +
                    this.milestoneId
            );
        },
        onCreateDemandClick() {
            this.$router.push(
                "/project/" +
                    this.projectId +
                    "/milestone/" +
                    this.milestoneId +
                    "/createdemand"
            );
        },
        getTime(str) {
            return str.substr(0, str.indexOf("T"));
        },
        gotoGitlab(weburl) {
            window.location.href = weburl;
        },
        //return [num of closed feature/num of opened feature]
        countPxDemand: function (milestone, priority) {
            let res = [0, 0];
            for (let i = 0; i < milestone.issues.length; i++) {
                if (
                    milestone.issues[i].labels.indexOf(priority) > -1 &&
                    milestone.issues[i].labels.indexOf("feature") > -1
                ) {
                    if (milestone.issues[i].state != "opened") {
                        res[0]++;
                    } else {
                        res[1]++;
                    }
                }
            }
            return res;
        },
        countDemand: function (milestone) {
            let res = [0, 0];
            for (let i = 0; i < milestone.issues.length; i++) {
                if (milestone.issues[i].labels.indexOf("feature") > -1) {
                    if (milestone.issues[i].state != "opened") {
                        res[0]++;
                    } else {
                        res[1]++;
                    }
                }
            }
            return res;
        },
        //return [merged opening closed]
        countMr: function (milestone) {
            let res = [0, 0, 0];
            for (let i = 0; i < milestone.mrs.length; i++) {
                if (milestone.mrs[i].state == "closeed") {
                    res[2]++;
                } else if (milestone.mrs[i].state == "merged") {
                    res[0]++;
                } else {
                    res[1]++;
                }
            }
            return res;
        },
    },
    computed: {
        customInfo: function () {
            let allissue = this.countDemand(this.info);
            let p0issue = this.countPxDemand(this.info, "P0");
            let p1issue = this.countPxDemand(this.info, "P1");
            let p2issue = this.countPxDemand(this.info, "P2");
            let mrinfo = this.countMr(this.info);
            let percentage = 0;
            if (allissue[0] + allissue[1] != 0) {
                percentage = (allissue[0] / (allissue[0] + allissue[1])) * 100;
            }
            return {
                allissue: allissue,
                p0issue: p0issue,
                p1issue: p1issue,
                p2issue: p2issue,
                mrinfo: mrinfo,
                percentage: percentage,
            };
        },
        p0: function () {
            let res = [];
            for (let i = 0; i < this.info.issues.length; i++) {
                if (
                    this.info.issues[i].labels.indexOf("P0") > -1 &&
                    this.info.issues[i].labels.indexOf("feature") > -1
                ) {
                    res.push(this.info.issues[i]);
                }
            }
            return res;
        },
        p1: function () {
            let res = [];
            for (let i = 0; i < this.info.issues.length; i++) {
                if (
                    this.info.issues[i].labels.indexOf("P1") > -1 &&
                    this.info.issues[i].labels.indexOf("feature") > -1
                ) {
                    res.push(this.info.issues[i]);
                }
            }
            return res;
        },
        p2: function () {
            let res = [];
            for (let i = 0; i < this.info.issues.length; i++) {
                if (
                    this.info.issues[i].labels.indexOf("P2") > -1 &&
                    this.info.issues[i].labels.indexOf("feature") > -1
                ) {
                    res.push(this.info.issues[i]);
                }
            }
            return res;
        },
    },
};
</script>

<style scoped>
.milestonetitle {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    width: 90%;
    height: 60px;
    line-height: 60px;
    margin: 15px auto;
    margin-bottom: 2px;
    padding: 5px;
    padding-left: 15px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: white;
    font-size: 20px;
    background-color: #409eff;
}
.buttons {
    width: 90%;
    padding: 5px;
    padding-right: 15px;
    margin: 0px auto;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 20px;
}
.subtitle {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    width: 90%;
    padding: 5px;
    padding-left: 15px;
    margin: 15px auto;

    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

    font-size: 20px;
    display: block;
}
.issueitem {
    width: 95%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    margin: 5px;
    font-size: 15px;
    padding: 5px;
    padding-left: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border: 1px solid #dcdfe6;
}
</style>