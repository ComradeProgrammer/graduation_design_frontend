(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e4052de6"],{1964:function(t,e,s){},"5dff":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("MyHeader",{attrs:{title:"软工质量平台",avatar:""}}),t._v(" "),s("el-row",[s("el-col",{attrs:{span:4}},[s("div",[s("el-menu",{attrs:{"default-active":t.index},on:{select:t.handleSelect}},[s("el-menu-item",{attrs:{index:"1"},scopedSlots:t._u([{key:"title",fn:function(){return[t._v("需求看板")]},proxy:!0}])},[s("i",{staticClass:"el-icon-s-flag"})]),t._v(" "),s("el-menu-item",{attrs:{index:"2"},scopedSlots:t._u([{key:"title",fn:function(){return[t._v("缺陷看板")]},proxy:!0}])},[s("i",{staticClass:"el-icon-error"})]),t._v(" "),s("el-menu-item",{attrs:{index:"3"},scopedSlots:t._u([{key:"title",fn:function(){return[t._v("CI看板")]},proxy:!0}])},[s("i",{staticClass:"el-icon-data-analysis"})]),t._v(" "),s("el-menu-item",{attrs:{index:"4"},scopedSlots:t._u([{key:"title",fn:function(){return[t._v("贡献统计")]},proxy:!0}])},[s("i",{staticClass:"el-icon-warning"})])],1)],1)]),t._v(" "),s("el-col",{attrs:{span:20}},[s("div",{staticStyle:{height:"10px"}}),t._v(" "),t._t("default")],2)],1)],1)},n=[],o=s("9839"),a={name:"ProjectFrame",props:["index"],components:{MyHeader:o["a"]},data:function(){return{projectId:""}},methods:{handleSelect:function(t,e){switch(console.log(t,e),t){case"1":this.$router.push("/project/"+this.projectId);break;case"2":this.$router.push("/project/"+this.projectId+"/bug");break;case"3":this.$router.push("/project/"+this.projectId+"/quality");break;case"4":this.$router.push("/project/"+this.projectId+"/contribute");break;default:console.log("unhandled index")}}},created:function(){this.projectId=this.$route.params.projectid}},l=a,r=s("2877"),c=Object(r["a"])(l,i,n,!1,null,null,null);e["a"]=c.exports},cc34:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ProjectFrame",{attrs:{index:"1"}},[s("MilestoneDetail")],1)},n=[],o=s("5dff"),a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"milestonetitle"},[t._v("阶段性目标:"+t._s(t.info.title))]),t._v(" "),s("div",{staticClass:"buttons"},[s("el-button",{attrs:{type:"primary"},on:{click:t.onEditMilestoneClick}},[s("i",{staticClass:"el-icon-edit",staticStyle:{"font-size":"15px"}}),t._v("\n            编辑阶段性目标\n        ")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.onCreateDemandClick}},[s("i",{staticClass:"el-icon-plus",staticStyle:{"font-size":"15px"}}),t._v("\n            新建子需求\n        ")]),t._v(" "),s("el-button",{attrs:{type:"danger"},on:{click:t.onDeleteMilestoneClick}},[s("i",{staticClass:"el-icon-delete",staticStyle:{"font-size":"15px"}}),t._v("\n            删除阶段性目标\n        ")])],1),t._v(" "),s("div",{staticClass:"subtitle"},[t._v("\n        描述:"+t._s(t.info.description)),s("br"),t._v(" "),s("i",{staticStyle:{"font-size":"15px"}},[t._v("计划于"+t._s(t.info.due_date)+"完成")]),s("br")]),t._v(" "),s("div",{staticClass:"subtitle"},[t._v("\n        子需求\n        "),s("el-collapse",{model:{value:t.activeNo,callback:function(e){t.activeNo=e},expression:"activeNo"}},[s("el-collapse-item",{attrs:{name:"0"},scopedSlots:t._u([{key:"title",fn:function(){return[s("el-tag",{attrs:{type:"danger"}},[t._v("P0")]),t._v("  (已完成"+t._s(t.customInfo.p0issue[0])+"/总计"+t._s(t.customInfo.p0issue[0]+t.customInfo.p0issue[1])+")\n                ")]},proxy:!0}])},[t._v(" "),t._l(t.p0,(function(e){return s("div",{key:e.id},["closed"==e.state?s("div",{staticClass:"issueitem"},[s("el-tag",{attrs:{type:"danger"}},[t._v("P0")]),t._v(" "),s("el-tag",{attrs:{type:"success"}},[t._v("已完成")]),t._v("\n                        子需求:"+t._s(e.title)+"\n                        "),s("el-button",{staticStyle:{float:"right"},attrs:{type:"warning"},on:{click:function(s){return t.gotoGitlab(e.web_url)}}},[t._v("前往gitlab查看")]),s("br"),t._v("\n                        计划结束时间\n                        "+t._s(e.due_date)+"\n                            结束时间："+t._s(t.getTime(e.closed_at))+"\n                    ")],1):t._e(),t._v(" "),"opened"==e.state?s("div",{staticClass:"issueitem"},[s("el-tag",{attrs:{type:"danger"}},[t._v("P0")]),t._v(" "),s("el-tag",{attrs:{effect:"dark"}},[t._v("进行中")]),t._v("\n                        子需求:"+t._s(e.title)+"\n                        "),s("div",{staticStyle:{display:"inline-block",float:"right"}},[s("el-button",{staticStyle:{float:"right"},attrs:{type:"warning"},on:{click:function(s){return t.gotoGitlab(e.web_url)}}},[t._v("前往gitlab查看")])],1),t._v(" "),s("br"),t._v("\n                        计划结束时间\n                        "+t._s(e.due_date)+"     \n                    ")],1):t._e()])}))],2),t._v(" "),s("el-collapse-item",{attrs:{name:"1"},scopedSlots:t._u([{key:"title",fn:function(){return[s("el-tag",{attrs:{type:"warning"}},[t._v("P1")]),t._v("  (已完成"+t._s(t.customInfo.p1issue[0])+"/总计"+t._s(t.customInfo.p1issue[0]+t.customInfo.p1issue[1])+")\n                ")]},proxy:!0}])},[t._v(" "),t._l(t.p1,(function(e){return s("div",{key:e.id},["closed"==e.state?s("div",{staticClass:"issueitem"},[s("el-tag",{attrs:{type:"warning"}},[t._v("P1")]),t._v(" "),s("el-tag",{attrs:{type:"success"}},[t._v("已完成")]),t._v("\n                        子需求:"+t._s(e.title)+"\n                        "),s("el-button",{staticStyle:{float:"right"},attrs:{type:"warning"},on:{click:function(s){return t.gotoGitlab(e.web_url)}}},[t._v("前往gitlab查看")]),s("br"),t._v("\n                        计划结束时间\n                        "+t._s(e.due_date)+"\n                            结束时间："+t._s(t.getTime(e.closed_at))+"\n                    ")],1):t._e(),t._v(" "),"opened"==e.state?s("div",{staticClass:"issueitem"},[s("el-tag",{attrs:{type:"warning"}},[t._v("P1")]),t._v(" "),s("el-tag",{attrs:{effect:"dark"}},[t._v("进行中")]),t._v("\n                        子需求:"+t._s(e.title)+"\n                        "),s("div",{staticStyle:{display:"inline-block",float:"right"}},[s("el-button",{staticStyle:{float:"right"},attrs:{type:"warning"},on:{click:function(s){return t.gotoGitlab(e.web_url)}}},[t._v("前往gitlab查看")])],1),t._v(" "),s("br"),t._v("\n                        计划结束时间\n                        "+t._s(e.due_date)+"     \n                    ")],1):t._e()])}))],2),t._v(" "),s("el-collapse-item",{attrs:{name:"2"},scopedSlots:t._u([{key:"title",fn:function(){return[s("el-tag",[t._v("P2")]),t._v("  (已完成"+t._s(t.customInfo.p2issue[0])+"/总计"+t._s(t.customInfo.p2issue[0]+t.customInfo.p2issue[1])+")\n                ")]},proxy:!0}])},[t._v(" "),t._l(t.p2,(function(e){return s("div",{key:e.id},["closed"==e.state?s("div",{staticClass:"issueitem"},[s("el-tag",[t._v("P2")]),t._v(" "),s("el-tag",{attrs:{type:"success"}},[t._v("已完成")]),t._v("\n                        子需求:"+t._s(e.title)+"\n                        "),s("el-button",{staticStyle:{float:"right"},attrs:{type:"warning"},on:{click:function(s){return t.gotoGitlab(e.web_url)}}},[t._v("前往gitlab查看")]),s("br"),t._v("\n                        计划结束时间\n                        "+t._s(e.due_date)+"\n                            结束时间："+t._s(t.getTime(e.closed_at))+"\n                    ")],1):t._e(),t._v(" "),"opened"==e.state?s("div",{staticClass:"issueitem"},[s("el-tag",[t._v("P2")]),t._v(" "),s("el-tag",{attrs:{effect:"dark"}},[t._v("进行中")]),t._v("\n                        子需求:"+t._s(e.title)+"\n                        "),s("div",{staticStyle:{display:"inline-block",float:"right"}},[s("el-button",{staticStyle:{float:"right"},attrs:{type:"warning"},on:{click:function(s){return t.gotoGitlab(e.web_url)}}},[t._v("前往gitlab查看")])],1),t._v(" "),s("br"),t._v("\n                        计划结束时间\n                        "+t._s(e.due_date)+"     \n                    ")],1):t._e()])}))],2)],1)],1),t._v(" "),s("div",{staticClass:"subtitle"},[s("el-collapse",[s("el-collapse-item",{scopedSlots:t._u([{key:"title",fn:function(){return[s("i",{staticClass:"el-icon-share"}),t._v(" "),s("div",{staticStyle:{display:"inline","font-size":"20px"}},[t._v("\n                        Merge Request 总数"+t._s(t.customInfo.mrinfo[0]+t.customInfo.mrinfo[1]+t.customInfo.mrinfo[2])+"\n                    ")]),t._v(" "),s("div",{staticStyle:{width:"20px"}}),t._v(" "),s("el-tag",{attrs:{type:"success"}},[t._v("Merged")]),t._v(" "),s("div",{staticStyle:{width:"5px"}}),t._v(" "),s("div",{staticClass:"text"},[t._v(t._s(t.customInfo.mrinfo[0]))]),t._v(" "),s("div",{staticStyle:{width:"20px"}}),t._v(" "),s("el-tag",{attrs:{type:"warning"}},[t._v("Opening")]),t._v(" "),s("div",{staticStyle:{width:"5px"}}),t._v(" "),s("div",{staticClass:"text"},[t._v(t._s(t.customInfo.mrinfo[1]))]),t._v(" "),s("div",{staticStyle:{width:"20px"}}),t._v(" "),s("el-tag",{attrs:{type:"danger"}},[t._v("Closed")]),t._v(" "),s("div",{staticStyle:{width:"5px"}}),t._v(" "),s("div",{staticClass:"text"},[t._v(t._s(t.customInfo.mrinfo[2]))])]},proxy:!0}])},[t._v(" "),t._l(t.info.mrs,(function(e){return s("div",{key:e.id,staticClass:"issueitem"},[t._v("\n                    MR:"+t._s(e.title)+"\n                    "),s("el-button",{staticStyle:{float:"right"},attrs:{type:"warning"},on:{click:function(s){return t.gotoGitlab(e.web_url)}}},[t._v("前往gitlab查看")]),s("br"),t._v("\n                    创建时间 "+t._s(t.getTime(e.created_at))+"\n                ")],1)}))],2)],1)],1)])},l=[],r={name:"MilestoneDetail",data:function(){return{activeNo:"",projectId:"",milestoneId:"",info:{issues:[],mrs:[]}}},created:function(){var t=this;this.projectId=this.$route.params.projectid,this.milestoneId=this.$route.params.milestoneid,this.$axios({method:"get",url:"api/projects/milestone?projectid="+this.projectId+"&milestoneid="+this.milestoneId}).then((function(e){console.log(e.data),t.info=e.data,console.log(t.p0)})).catch((function(t){console.log(t),401==t.response.status||alert("发生错误"),window.location.href="http://127.0.0.1:3333/login"}))},methods:{onDeleteMilestoneClick:function(){var t=this;this.$confirm("此操作将永久删除该阶段计划, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$axios({method:"get",url:"api/projects/milestone/delete?projectid="+t.projectId+"&milestoneid="+t.milestoneId}).then((function(e){console.log(e.data),t.$message({type:"success",message:"删除成功!"}),t.$router.push("/project/"+t.projectId)})).catch((function(t){console.log(t),401==t.response.status||alert("发生错误"),window.location.href="http://127.0.0.1:3333/login"}))})).catch((function(){}))},onEditMilestoneClick:function(){this.$router.push("/project/"+this.projectId+"/editmilestone/"+this.milestoneId)},onCreateDemandClick:function(){this.$router.push("/project/"+this.projectId+"/milestone/"+this.milestoneId+"/createdemand")},getTime:function(t){return t.substr(0,t.indexOf("T"))},gotoGitlab:function(t){window.location.href=t},countPxDemand:function(t,e){for(var s=[0,0],i=0;i<t.issues.length;i++)t.issues[i].labels.indexOf(e)>-1&&t.issues[i].labels.indexOf("feature")>-1&&("opened"!=t.issues[i].state?s[0]++:s[1]++);return s},countDemand:function(t){for(var e=[0,0],s=0;s<t.issues.length;s++)t.issues[s].labels.indexOf("feature")>-1&&("opened"!=t.issues[s].state?e[0]++:e[1]++);return e},countMr:function(t){for(var e=[0,0,0],s=0;s<t.mrs.length;s++)"closeed"==t.mrs[s].state?e[2]++:"merged"==t.mrs[s].state?e[0]++:e[1]++;return e}},computed:{customInfo:function(){var t=this.countDemand(this.info),e=this.countPxDemand(this.info,"P0"),s=this.countPxDemand(this.info,"P1"),i=this.countPxDemand(this.info,"P2"),n=this.countMr(this.info),o=0;return t[0]+t[1]!=0&&(o=t[0]/(t[0]+t[1])*100),{allissue:t,p0issue:e,p1issue:s,p2issue:i,mrinfo:n,percentage:o}},p0:function(){for(var t=[],e=0;e<this.info.issues.length;e++)this.info.issues[e].labels.indexOf("P0")>-1&&this.info.issues[e].labels.indexOf("feature")>-1&&t.push(this.info.issues[e]);return t},p1:function(){for(var t=[],e=0;e<this.info.issues.length;e++)this.info.issues[e].labels.indexOf("P1")>-1&&this.info.issues[e].labels.indexOf("feature")>-1&&t.push(this.info.issues[e]);return t},p2:function(){for(var t=[],e=0;e<this.info.issues.length;e++)this.info.issues[e].labels.indexOf("P2")>-1&&this.info.issues[e].labels.indexOf("feature")>-1&&t.push(this.info.issues[e]);return t}}},c=r,u=(s("f4b1"),s("2877")),d=Object(u["a"])(c,a,l,!1,null,"53f58a33",null),_=d.exports,f={name:"Milestone",components:{ProjectFrame:o["a"],MilestoneDetail:_}},v=f,p=Object(u["a"])(v,i,n,!1,null,null,null);e["default"]=p.exports},f4b1:function(t,e,s){"use strict";s("1964")}}]);