(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e93eb10"],{"057f":function(t,e,r){var i=r("fc6a"),n=r("241c").f,a={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return n(t)}catch(e){return o.slice()}};t.exports.f=function(t){return o&&"[object Window]"==a.call(t)?s(t):n(i(t))}},"2ceb":function(t,e,r){},"5dff":function(t,e,r){"use strict";var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("MyHeader",{attrs:{title:"软工质量平台",avatar:""}}),t._v(" "),r("el-row",[r("el-col",{attrs:{span:4}},[r("div",[r("el-menu",{attrs:{"default-active":t.index},on:{select:t.handleSelect}},[r("el-menu-item",{attrs:{index:"1"},scopedSlots:t._u([{key:"title",fn:function(){return[t._v("需求看板")]},proxy:!0}])},[r("i",{staticClass:"el-icon-s-flag"})]),t._v(" "),r("el-menu-item",{attrs:{index:"2"},scopedSlots:t._u([{key:"title",fn:function(){return[t._v("缺陷看板")]},proxy:!0}])},[r("i",{staticClass:"el-icon-error"})]),t._v(" "),r("el-menu-item",{attrs:{index:"3"},scopedSlots:t._u([{key:"title",fn:function(){return[t._v("CI看板")]},proxy:!0}])},[r("i",{staticClass:"el-icon-data-analysis"})]),t._v(" "),r("el-menu-item",{attrs:{index:"4"},scopedSlots:t._u([{key:"title",fn:function(){return[t._v("贡献统计")]},proxy:!0}])},[r("i",{staticClass:"el-icon-warning"})])],1)],1)]),t._v(" "),r("el-col",{attrs:{span:20}},[r("div",{staticStyle:{height:"10px"}}),t._v(" "),t._t("default")],2)],1)],1)},n=[],a=r("9839"),o={name:"ProjectFrame",props:["index"],components:{MyHeader:a["a"]},data:function(){return{projectId:""}},methods:{handleSelect:function(t,e){switch(console.log(t,e),t){case"1":this.$router.push("/project/"+this.projectId);break;case"2":this.$router.push("/project/"+this.projectId+"/bug");break;case"3":this.$router.push("/project/"+this.projectId+"/quality");break;case"4":this.$router.push("/project/"+this.projectId+"/contribute");break;default:console.log("unhandled index")}}},created:function(){this.projectId=this.$route.params.projectid}},s=o,c=r("2877"),l=Object(c["a"])(s,i,n,!1,null,null,null);e["a"]=l.exports},"65f0":function(t,e,r){var i=r("861d"),n=r("e8b5"),a=r("b622"),o=a("species");t.exports=function(t,e){var r;return n(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!n(r.prototype)?i(r)&&(r=r[o],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},"6e1a":function(t,e,r){"use strict";r("2ceb")},"71e7":function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("ProjectFrame",{attrs:{index:"1"}},[r("div",{attrs:{id:"createmilestonetitle"}},[t._v("\n            新建阶段性任务\n        ")]),t._v(" "),r("div",{attrs:{id:"createmilestoneform"}},[r("div",{staticClass:"formitem"},[t._v("\n                阶段性任务标题\n                "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.validTitle,expression:"!validTitle"}],staticClass:"createalert",staticStyle:{margin:"5px"}},[t._v("\n                    *阶段性任务标题不能为空\n                ")]),t._v(" "),r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),t._v(" "),r("div",{staticClass:"formitem"},[t._v("\n                阶段性任务描述\n                "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.validDescription,expression:"!validDescription"}],staticClass:"createalert",staticStyle:{margin:"5px"}},[t._v("\n                    *阶段性任务描述不能为空\n                ")]),t._v(" "),r("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入内容"},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1),t._v(" "),r("div",{staticClass:"formitem"},[t._v("\n                阶段性任务开始时间　　\n                "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.validStartDate,expression:"!validStartDate"}],staticClass:"createalert",staticStyle:{margin:"5px",display:"inline-block"}},[t._v("\n                    *阶段性任务开始时间不能为空\n                ")]),t._v(" "),r("br"),t._v(" "),r("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"timestamp"},model:{value:t.startdate,callback:function(e){t.startdate=e},expression:"startdate"}})],1),t._v(" "),r("div",{staticClass:"formitem"},[t._v("\n                阶段性任务计划结束时间\n                "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.validDueDate,expression:"!validDueDate"}],staticClass:"createalert",staticStyle:{margin:"5px",display:"inline-block"}},[t._v("\n                    *阶段性任务结束时间不能为空\n                 ")]),t._v(" "),r("br"),t._v(" "),r("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"timestamp"},model:{value:t.duedate,callback:function(e){t.duedate=e},expression:"duedate"}})],1),t._v(" "),r("div",{staticClass:"formitem"},[r("el-button",{attrs:{type:"primary",disabled:t.disabled},on:{click:t.onSubmit}},[t._v("提交")])],1)])])],1)},n=[],a=(r("a4d3"),r("e01a"),r("5dff")),o={name:"EditMilestone",components:{ProjectFrame:a["a"]},data:function(){return{projectId:"",milestoneId:"",title:"",description:"",startdate:"",duedate:""}},created:function(){var t=this;this.projectId=this.$route.params.projectid,this.milestoneId=this.$route.params.milestoneid,this.$axios({method:"get",url:"api/projects/milestone?projectid="+this.projectId+"&milestoneid="+this.milestoneId}).then((function(e){console.log(e.data),t.title=e.data.title,t.description=e.data.description,t.duedate=new Date(e.data.due_date).getTime(),t.startdate=new Date(e.data.start_date).getTime()})).catch((function(t){console.log(t),401==t.response.status||alert("发生错误"),window.location.href="http://127.0.0.1:3333/login"}))},computed:{validTitle:function(){return""!=this.title},validDescription:function(){return""!=this.description},validStartDate:function(){return""!=this.startdate},validDueDate:function(){return""!=this.duedate},disabled:function(){return!(this.validTitle&&this.validDescription&&this.validStartDate&&this.validDueDate)}},methods:{formatTime:function(t){var e=t.getFullYear()+"",r=parseInt(t.getMonth()),i=r>9?r+1+"":"0"+(r+1),n=parseInt(t.getDate()),a=n>10?""+n:"0"+n;return e+"-"+i+"-"+a},onSubmit:function(){var t=this;this.$axios({url:"/api/projects/milestone/create",method:"post",headers:{"Content-Type":"application/json"},data:JSON.stringify({project_id:parseInt(this.projectId),title:this.title,description:this.description,start_date:this.formatTime(new Date(this.startdate)),due_date:this.formatTime(new Date(this.duedate))})}).then((function(e){console.log(e),t.$router.push("/project/"+t.projectId)})).catch((function(t){console.log(t.response),401==t.response.status||alert("发生错误"),window.location.href="http://127.0.0.1:3333/login"}))}}},s=o,c=(r("6e1a"),r("2877")),l=Object(c["a"])(s,i,n,!1,null,null,null);e["default"]=l.exports},"746f":function(t,e,r){var i=r("428f"),n=r("5135"),a=r("e538"),o=r("9bf2").f;t.exports=function(t){var e=i.Symbol||(i.Symbol={});n(e,t)||o(e,t,{value:a.f(t)})}},a4d3:function(t,e,r){"use strict";var i=r("23e7"),n=r("da84"),a=r("d066"),o=r("c430"),s=r("83ab"),c=r("4930"),l=r("fdbf"),u=r("d039"),d=r("5135"),f=r("e8b5"),p=r("861d"),v=r("825a"),h=r("7b0b"),m=r("fc6a"),b=r("c04e"),y=r("5c6c"),g=r("7c73"),w=r("df75"),_=r("241c"),S=r("057f"),j=r("7418"),x=r("06cf"),O=r("9bf2"),k=r("d1e7"),D=r("9112"),I=r("6eeb"),C=r("5692"),$=r("f772"),P=r("d012"),T=r("90e3"),N=r("b622"),E=r("e538"),F=r("746f"),A=r("d44e"),J=r("69f3"),M=r("b727").forEach,H=$("hidden"),q="Symbol",Q="prototype",W=N("toPrimitive"),Y=J.set,z=J.getterFor(q),B=Object[Q],G=n.Symbol,K=a("JSON","stringify"),L=x.f,R=O.f,U=S.f,V=k.f,X=C("symbols"),Z=C("op-symbols"),tt=C("string-to-symbol-registry"),et=C("symbol-to-string-registry"),rt=C("wks"),it=n.QObject,nt=!it||!it[Q]||!it[Q].findChild,at=s&&u((function(){return 7!=g(R({},"a",{get:function(){return R(this,"a",{value:7}).a}})).a}))?function(t,e,r){var i=L(B,e);i&&delete B[e],R(t,e,r),i&&t!==B&&R(B,e,i)}:R,ot=function(t,e){var r=X[t]=g(G[Q]);return Y(r,{type:q,tag:t,description:e}),s||(r.description=e),r},st=l?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof G},ct=function(t,e,r){t===B&&ct(Z,e,r),v(t);var i=b(e,!0);return v(r),d(X,i)?(r.enumerable?(d(t,H)&&t[H][i]&&(t[H][i]=!1),r=g(r,{enumerable:y(0,!1)})):(d(t,H)||R(t,H,y(1,{})),t[H][i]=!0),at(t,i,r)):R(t,i,r)},lt=function(t,e){v(t);var r=m(e),i=w(r).concat(vt(r));return M(i,(function(e){s&&!dt.call(r,e)||ct(t,e,r[e])})),t},ut=function(t,e){return void 0===e?g(t):lt(g(t),e)},dt=function(t){var e=b(t,!0),r=V.call(this,e);return!(this===B&&d(X,e)&&!d(Z,e))&&(!(r||!d(this,e)||!d(X,e)||d(this,H)&&this[H][e])||r)},ft=function(t,e){var r=m(t),i=b(e,!0);if(r!==B||!d(X,i)||d(Z,i)){var n=L(r,i);return!n||!d(X,i)||d(r,H)&&r[H][i]||(n.enumerable=!0),n}},pt=function(t){var e=U(m(t)),r=[];return M(e,(function(t){d(X,t)||d(P,t)||r.push(t)})),r},vt=function(t){var e=t===B,r=U(e?Z:m(t)),i=[];return M(r,(function(t){!d(X,t)||e&&!d(B,t)||i.push(X[t])})),i};if(c||(G=function(){if(this instanceof G)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=T(t),r=function(t){this===B&&r.call(Z,t),d(this,H)&&d(this[H],e)&&(this[H][e]=!1),at(this,e,y(1,t))};return s&&nt&&at(B,e,{configurable:!0,set:r}),ot(e,t)},I(G[Q],"toString",(function(){return z(this).tag})),I(G,"withoutSetter",(function(t){return ot(T(t),t)})),k.f=dt,O.f=ct,x.f=ft,_.f=S.f=pt,j.f=vt,E.f=function(t){return ot(N(t),t)},s&&(R(G[Q],"description",{configurable:!0,get:function(){return z(this).description}}),o||I(B,"propertyIsEnumerable",dt,{unsafe:!0}))),i({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:G}),M(w(rt),(function(t){F(t)})),i({target:q,stat:!0,forced:!c},{for:function(t){var e=String(t);if(d(tt,e))return tt[e];var r=G(e);return tt[e]=r,et[r]=e,r},keyFor:function(t){if(!st(t))throw TypeError(t+" is not a symbol");if(d(et,t))return et[t]},useSetter:function(){nt=!0},useSimple:function(){nt=!1}}),i({target:"Object",stat:!0,forced:!c,sham:!s},{create:ut,defineProperty:ct,defineProperties:lt,getOwnPropertyDescriptor:ft}),i({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:pt,getOwnPropertySymbols:vt}),i({target:"Object",stat:!0,forced:u((function(){j.f(1)}))},{getOwnPropertySymbols:function(t){return j.f(h(t))}}),K){var ht=!c||u((function(){var t=G();return"[null]"!=K([t])||"{}"!=K({a:t})||"{}"!=K(Object(t))}));i({target:"JSON",stat:!0,forced:ht},{stringify:function(t,e,r){var i,n=[t],a=1;while(arguments.length>a)n.push(arguments[a++]);if(i=e,(p(e)||void 0!==t)&&!st(t))return f(e)||(e=function(t,e){if("function"==typeof i&&(e=i.call(this,t,e)),!st(e))return e}),n[1]=e,K.apply(null,n)}})}G[Q][W]||D(G[Q],W,G[Q].valueOf),A(G,q),P[H]=!0},b727:function(t,e,r){var i=r("0366"),n=r("44ad"),a=r("7b0b"),o=r("50c4"),s=r("65f0"),c=[].push,l=function(t){var e=1==t,r=2==t,l=3==t,u=4==t,d=6==t,f=7==t,p=5==t||d;return function(v,h,m,b){for(var y,g,w=a(v),_=n(w),S=i(h,m,3),j=o(_.length),x=0,O=b||s,k=e?O(v,j):r||f?O(v,0):void 0;j>x;x++)if((p||x in _)&&(y=_[x],g=S(y,x,w),t))if(e)k[x]=g;else if(g)switch(t){case 3:return!0;case 5:return y;case 6:return x;case 2:c.call(k,y)}else switch(t){case 4:return!1;case 7:c.call(k,y)}return d?-1:l||u?u:k}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6),filterOut:l(7)}},e01a:function(t,e,r){"use strict";var i=r("23e7"),n=r("83ab"),a=r("da84"),o=r("5135"),s=r("861d"),c=r("9bf2").f,l=r("e893"),u=a.Symbol;if(n&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},f=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof f?new u(t):void 0===t?u():u(t);return""===t&&(d[e]=!0),e};l(f,u);var p=f.prototype=u.prototype;p.constructor=f;var v=p.toString,h="Symbol(test)"==String(u("test")),m=/^Symbol\((.*)\)[^)]+$/;c(p,"description",{configurable:!0,get:function(){var t=s(this)?this.valueOf():this,e=v.call(t);if(o(d,t))return"";var r=h?e.slice(7,-1):e.replace(m,"$1");return""===r?void 0:r}}),i({global:!0,forced:!0},{Symbol:f})}},e538:function(t,e,r){var i=r("b622");e.f=i},e8b5:function(t,e,r){var i=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==i(t)}}}]);