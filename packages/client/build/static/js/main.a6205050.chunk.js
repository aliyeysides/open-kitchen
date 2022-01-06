(this["webpackJsonpfoyir-client"]=this["webpackJsonpfoyir-client"]||[]).push([[0],{202:function(e,t,n){},208:function(e,t){},236:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),i=n(68),r=n.n(i),l=n(47),s=n(23),o=(n(202),n(203),n(204),n(309)),j=n(312),d=n(314),b=n(310),u=n(315),x=n(167),O=n.n(x),p=n(306),h=n(305),m=n(1);function v(e){var t=e.to,n=e.children,a=e.color,c=e.variant;return Object(m.jsx)(h.a,{color:a||"inherit",variant:c,component:l.b,to:t,children:n})}var f=n(168),_=n.n(f),g=n(307);function y(){return Object(m.jsxs)(o.a,{sx:{flexGrow:1},children:[Object(m.jsx)(j.a,{position:"fixed",children:Object(m.jsxs)(d.a,{children:[Object(m.jsx)(u.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},children:Object(m.jsx)(O.a,{})}),Object(m.jsxs)(b.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:[Object(m.jsx)(v,{to:"/recipes",children:"FoodTube"}),Object(m.jsx)(p.a,{label:"Alpha v0.0.1",color:"primary",variant:"outlined"})]}),Object(m.jsx)(_.a,{sx:{m:1,marginRight:2,cursor:"pointer"}}),Object(m.jsx)(v,{color:"primary",variant:"outlined",to:"/recipes/upload",children:"Upload"}),Object(m.jsx)(o.a,{sx:{marginLeft:2},children:Object(m.jsx)(g.a,{children:"A"})})]})}),Object(m.jsx)(d.a,{})]})}var C=function(){return Object(m.jsxs)(o.a,{className:"App",children:[Object(m.jsx)(y,{}),Object(m.jsx)(o.a,{className:"app-container",sx:{my:4,mx:10},children:Object(m.jsx)(s.a,{})})]})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,322)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),i(e),r(e)}))},k=n(110),R=n(302),N=n(299),$=n(298),I=n(308),U=n(177),S=n(74),q=Object(U.a)({palette:{primary:{main:"#1de9b6"},secondary:{main:"#1de9b6"},error:{main:S.a.A400},mode:"dark"}}),F=n(297),T=n.n(F),A=n(294),E=n(120);n(132);function G(e){var t=e.options,n=e.onReady,c=Object(a.useRef)(null),i=Object(a.useRef)(null),r=E.a;return Object(a.useEffect)((function(){if(i.current)i.current;else{var e=c.current;if(!e)return;var a=i.current=r(e,t,(function(){n&&n.apply(a)}))}}),[t,n,r]),Object(a.useEffect)((function(){return function(){i.current&&(i.current.dispose(),i.current=null)}}),[]),Object(m.jsx)("div",{"data-vjs-player":!0,children:Object(m.jsx)("video-js",{ref:c,className:"vjs-big-play-centered",children:Object(m.jsx)("track",{src:"https://s3.amazonaws.com/demo.jwplayer.com/text-tracks/assets/chapters.vtt",kind:"chapters",srcLang:"en",label:"English",default:!0})})})}var V,L,W,M,z,B,J,P=n(43),D=n(77),H=(Object(D.d)(V||(V=Object(P.a)(["\n  query {\n    videoUploads {\n      _id\n      name\n      url\n    }\n  }\n"]))),Object(D.d)(L||(L=Object(P.a)(["\n  query VideoUpload($id: String!) {\n    videoUpload(id: $id) {\n      _id\n      name\n      url\n    }\n  }\n"]))),Object(D.d)(W||(W=Object(P.a)(["\n  mutation CreateVideoUpload($file: Upload!) {\n    createVideoUpload(file: $file) {\n      _id\n      name\n    }\n  }\n"])))),K=Object(D.d)(M||(M=Object(P.a)(["\n  mutation CreateThumbnail($file: Upload!) {\n    createThumbnail(file: $file) {\n      _id\n    }\n  }\n"]))),Y=Object(D.d)(z||(z=Object(P.a)(["\n  mutation CreateRecipe($createRecipeInput: CreateRecipeInput!) {\n    createRecipe(createRecipeInput: $createRecipeInput) {\n      name\n    }\n  }\n"]))),Z=Object(D.d)(B||(B=Object(P.a)(["\n  query {\n    recipes {\n      _id\n      name\n      video {\n        url\n      }\n      thumbnail {\n        url\n      }\n    }\n  }\n"]))),Q=Object(D.d)(J||(J=Object(P.a)(["\n  query Recipe($id: String!) {\n    recipe(id: $id) {\n      _id\n      name\n      steps {\n        order\n        instruction\n      }\n      video {\n        _id\n        name\n        url\n      }\n    }\n  }\n"]))),X=n(311),ee=n(16),te=n(35),ne=n(174),ae=n(301),ce=n(316),ie=["children","value","index"];function re(e){var t=e.children,n=e.value,a=e.index,c=Object(ne.a)(e,ie);return Object(m.jsx)("div",Object(te.a)(Object(te.a)({role:"tabpanel",hidden:n!==a,id:"vertical-tabpanel-".concat(a),"aria-labelledby":"vertical-tab-".concat(a)},c),{},{children:n===a&&Object(m.jsx)(o.a,{sx:{p:3},children:Object(m.jsx)(X.a,{maxWidth:"sm",children:Object(m.jsx)(b.a,{children:t})})})}))}function le(e){var t=e.value,n=e.index,a=e.step;return Object(m.jsx)(re,{value:t,index:n,children:a.instruction})}function se(e){var t=e.steps,n=e.value;return Object(m.jsx)(m.Fragment,{children:t.map((function(e){return Object(m.jsx)(le,{step:e,value:n,index:e.order-1},"".concat(e.order))}))})}function oe(e){var t=e.recipe,n=Object(a.useState)(0),c=Object(ee.a)(n,2),i=c[0],r=c[1];console.log("recipe",t);var l;return Object(m.jsxs)(o.a,{sx:{flexGrow:1,bgcolor:"background.paper",display:"flex",height:"auto"},children:[Object(m.jsx)(ae.a,{orientation:"vertical",variant:"scrollable",value:i,onChange:function(e,t){console.log("handleChange"),r(t)},"aria-label":"Recipe Instructions",sx:{borderRight:1,borderColor:"divider",overflow:"visible"},children:(l=t.steps,l.map((function(e){return Object(m.jsx)(ce.a,Object(te.a)({label:"".concat(e.order)},(t=e.order-1,{id:"vertical-tab-".concat(t),"aria-controls":"vertical-tabpanel-".concat(t)})),"".concat(e.order));var t})))}),Object(m.jsx)(se,{value:i,steps:t.steps})]})}function je(){var e=Object(s.h)(),t=Object(A.a)(Q,{variables:{id:e.recipeId}}),n=t.loading,a=t.error,c=t.data;if(n)return Object(m.jsx)("div",{children:'"Loading..."'});if(a)return Object(m.jsxs)("div",{children:["`Error! $",a.message,"`"]});var i=null===c||void 0===c?void 0:c.recipe,r={autoplay:!0,controls:!0,responsive:!0,fluid:!1,fill:!0,sources:[{src:(null===c||void 0===c?void 0:c.recipe.video).url,type:"video/mp4"}]};return Object(m.jsx)("main",{children:Object(m.jsxs)(o.a,{sx:{display:"flex",justifyContent:"flex-start"},children:[Object(m.jsxs)(X.a,{disableGutters:!0,children:[Object(m.jsx)(o.a,{sx:{display:"grid",height:500},children:Object(m.jsx)(G,{options:r,onReady:function(){E.a.log("Your player is ready!")}})}),Object(m.jsx)(o.a,{sx:{display:"flex",my:2,fontWeight:"bold",fontSize:18},children:i.name}),Object(m.jsxs)(o.a,{sx:{display:"flex",justifyContent:"flex-end",alignItems:"center"},children:[Object(m.jsx)(o.a,{sx:{ml:3},children:"$5 per serving"}),Object(m.jsx)(o.a,{sx:{ml:3},children:"700 Calories per serving"}),Object(m.jsx)(h.a,{sx:{ml:3},color:"primary",variant:"contained",children:"Order Meal Kit"})]})]}),Object(m.jsx)(oe,{recipe:i})]})})}var de=n(33),be=n.n(de),ue=n(317),xe=n(319),Oe=n(318),pe=n(320);function he(e){var t=e.title,n=e.thumbnail;return Object(m.jsx)(ue.a,{variant:"outlined",sx:{maxWidth:"100%",maxHeight:"100%"},children:Object(m.jsxs)(Oe.a,{children:[Object(m.jsx)(xe.a,{component:"img",src:n,alt:"green iguana"}),Object(m.jsx)(pe.a,{avatar:Object(m.jsx)(g.a,{sx:{bgcolor:S.a[500]},"aria-label":"recipe",children:"R"}),title:t})]})})}function me(){return Object(m.jsx)(o.a,{className:be.a.view_all_link,children:Object(m.jsx)(l.b,{className:be.a.view_all_link_text,to:"/recipes/upload",children:"view all"})})}function ve(){var e=Object(A.a)(Z),t=e.loading,n=e.error,a=e.data;if(t)return Object(m.jsx)("div",{children:'"Loading..."'});if(n)return Object(m.jsxs)("div",{children:["`Error! $",n.message,"`"]});var c=null===a||void 0===a?void 0:a.recipes;return console.log("recipes:",c),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)(o.a,{className:be.a.section_header,children:[Object(m.jsx)(b.a,{sx:{color:"#1de9b6",my:2,cursor:"pointer"},variant:"h4",children:Object(m.jsx)(l.b,{className:be.a.view_all_link_text,to:"/recipes/upload",children:"#trending"})}),Object(m.jsx)(me,{})]}),Object(m.jsx)(o.a,{className:be.a.section_container,children:c.slice(c.length-4,c.length).map((function(e){return Object(m.jsx)(o.a,{className:be.a.section_item,children:Object(m.jsx)("img",{className:be.a.thumbnail,src:e.thumbnail.url,alt:"test"})},e._id)}))}),Object(m.jsxs)(o.a,{className:be.a.section_header,children:[Object(m.jsx)(b.a,{sx:{color:"#1de9b6",my:2,cursor:"pointer"},variant:"h4",children:Object(m.jsx)(l.b,{className:be.a.view_all_link_text,to:"/recipes/upload",children:"#vegan"})}),Object(m.jsx)(me,{})]}),Object(m.jsx)(o.a,{className:be.a.section_container,children:c.slice(c.length-4,c.length).map((function(e){return Object(m.jsx)(o.a,{className:be.a.section_item,children:Object(m.jsx)(he,{title:e.name,thumbnail:e.thumbnail.url})},e._id)}))}),Object(m.jsxs)(o.a,{className:be.a.section_header,children:[Object(m.jsx)(b.a,{sx:{color:"#1de9b6",my:2,cursor:"pointer"},variant:"h4",children:Object(m.jsx)(l.b,{className:be.a.view_all_link_text,to:"/recipes/upload",children:"#onepot"})}),Object(m.jsx)(me,{})]}),Object(m.jsx)(o.a,{className:be.a.section_container,children:c.slice(c.length-4,c.length).map((function(e){return Object(m.jsx)(o.a,{className:be.a.section_item,children:Object(m.jsx)(l.b,{to:"/recipes/".concat(e._id),children:Object(m.jsx)(he,{title:e.name,thumbnail:e.thumbnail.url})})},e._id)}))})]})}var fe=n(26),_e=n(6),ge=n(295),ye=n(300),Ce=n(296),we=n(145);function ke(e){return{id:"recipe-step-".concat(e),label:"Recipe Step ".concat(e),variant:"outlined",name:"recipe-step-".concat(e),key:"".concat(e),rows:4,multiline:!0,required:!0}}function Re(){var e=Object(ge.a)(H),t=Object(ee.a)(e,2),n=t[0],c=t[1],i=Object(ge.a)(K),r=Object(ee.a)(i,2),l=r[0],s=r[1],j=Object(ge.a)(Y),d=Object(ee.a)(j,1)[0],u=function(e){var t=e.target,n=(t.validity,t.value),a=t.name;return C((function(e){return Object(te.a)(Object(te.a)({},e),{},Object(_e.a)({},a,n))}))},x=[Object(m.jsx)(ye.a,Object(te.a)(Object(te.a)({},ke(1)),{},{onChange:u})),Object(m.jsx)(ye.a,Object(te.a)(Object(te.a)({},ke(2)),{},{onChange:u})),Object(m.jsx)(ye.a,Object(te.a)(Object(te.a)({},ke(3)),{},{onChange:u}))],O=Object(a.useState)(x),p=Object(ee.a)(O,2),v=p[0],f=p[1],_=Object(a.useState)({}),g=Object(ee.a)(_,2),y=g[0],C=g[1],w=Object(a.useRef)(3),k=Object(a.useRef)(null),R=Object(a.useRef)(null);return Object(m.jsx)("main",{children:Object(m.jsx)(o.a,{component:"form",sx:{display:"flex","& .MuiTextField-root":{m:1,width:"25ch"}},noValidate:!0,autoComplete:"off",children:Object(m.jsx)(X.a,{maxWidth:"sm",children:Object(m.jsxs)(Ce.a,{sx:{alignItems:"center"},spacing:2,children:[Object(m.jsx)(b.a,{variant:"h4",component:"div",sx:{flexGrow:1},children:"Create a Recipe"}),Object(m.jsx)(ye.a,{id:"recipe-name",label:"Recipe Name",name:"recipe-name",variant:"outlined",onChange:u,required:!0}),v,Object(m.jsx)(h.a,{variant:"outlined",onClick:function(){w.current++;var e=Object(m.jsx)(ye.a,Object(te.a)(Object(te.a)({},ke(w.current)),{},{onChange:u}));f([].concat(Object(fe.a)(v),[e]))},children:"Add Step"}),Object(m.jsx)(h.a,{variant:"outlined",onClick:function(){var e="recipe-step-".concat(w.current),t=Object.assign({},y);Object(we.unset)(t,e),C(t),w.current--,f(Object(fe.a)(v).slice(0,v.length-1))},color:"error",children:"Remove Step"}),Object(m.jsxs)(h.a,{onClick:function(){var e;return null===(e=k.current)||void 0===e?void 0:e.click()},children:[Object(m.jsx)(b.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"Add Video"}),Object(m.jsx)(o.a,{sx:{display:"none"},children:Object(m.jsx)("input",{ref:k,type:"file",onChange:function(e){var t=e.target,a=t.validity,c=Object(ee.a)(t.files,1)[0];a.valid&&c?n({variables:{file:c}}):console.error("Error uploading video")},required:!0})})]}),Object(m.jsxs)(h.a,{onClick:function(){var e;return null===(e=R.current)||void 0===e?void 0:e.click()},children:[Object(m.jsx)(b.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"Add Thumbnail"}),Object(m.jsx)(o.a,{sx:{display:"none"},children:Object(m.jsx)("input",{ref:R,type:"file",onChange:function(e){var t=e.target,n=t.validity,a=Object(ee.a)(t.files,1)[0];n.valid&&a?l({variables:{file:a}}):console.log("Error uploading thumbnail")},required:!0})})]}),Object(m.jsx)(h.a,{onClick:function(){var e=c.data,t=s.data,n=function(){var e=Object(we.omit)(y,["recipe-name"]),t=[];for(var n in e){var a=+n.split("-")[2];t.push({order:a,instruction:e[n]})}return t}(),a=function(e){return!e.error&&!e.loading&&e.data};a(c)&&a(s)&&d({variables:{createRecipeInput:{name:y["recipe-name"],steps:n,video:e.createVideoUpload._id,thumbnail:t.createThumbnail._id}}})},variant:"contained",color:"primary",children:Object(m.jsx)(b.a,{variant:"h5",component:"div",sx:{flexGrow:1},children:"Upload Recipe"})})]})})})})}var Ne=new k.a({cache:new R.a,link:T()({uri:"http://localhost:8080/graphql"})});r.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(l.a,{children:Object(m.jsxs)(I.a,{theme:q,children:[Object(m.jsx)($.a,{}),Object(m.jsx)(N.a,{client:Ne,children:Object(m.jsx)(s.d,{children:Object(m.jsxs)(s.b,{path:"/",element:Object(m.jsx)(C,{}),children:[Object(m.jsx)(s.b,{path:"recipes",element:Object(m.jsx)(ve,{})}),Object(m.jsx)(s.b,{path:"recipes/:recipeId",element:Object(m.jsx)(je,{})}),Object(m.jsx)(s.b,{path:"recipes/upload",element:Object(m.jsx)(Re,{})})]})})})]})})}),document.getElementById("root")),w()},33:function(e,t,n){e.exports={section_container:"recipes_section_container__3_3fZ",section_item:"recipes_section_item__1R6Ac",thumbnail:"recipes_thumbnail__3l2CW",view_all_link:"recipes_view_all_link__1WUsT",view_all_link_text:"recipes_view_all_link_text__pFfv2",section_header:"recipes_section_header__3mOlM",cursor_pointer:"recipes_cursor_pointer__3pU9V"}}},[[236,1,2]]]);
//# sourceMappingURL=main.a6205050.chunk.js.map