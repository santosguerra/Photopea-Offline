var UDOC={};UDOC.B=function(){var V=new Uint8Array(4),B=V.buffer,U=new Int16Array(B),M=new Uint16Array(B),J=new Int32Array(B),D=new Uint32Array(B),d=new Float32Array(B);
return{readShort:function(K,w){V[0]=K[w];V[1]=K[w+1];return U[0]},readUshort:function(K,w){V[0]=K[w];
V[1]=K[w+1];return M[0]},readInt:function(K,w){V[0]=K[w];V[1]=K[w+1];V[2]=K[w+2];V[3]=K[w+3];return J[0]},readUint:function(K,w){V[0]=K[w];
V[1]=K[w+1];V[2]=K[w+2];V[3]=K[w+3];return D[0]},readUintBE:function(K,w){V[3]=K[w];V[2]=K[w+1];V[1]=K[w+2];
V[0]=K[w+3];return D[0]},readFloat:function(K,w){V[0]=K[w];V[1]=K[w+1];V[2]=K[w+2];V[3]=K[w+3];return d[0]},readASCII:function(K,w,I){var O="";
for(var n=0;n<I;n++)O+=String.fromCharCode(K[w+n]);return O}}}();UDOC.G={concat:function(V,B){for(var U=0;
U<B.cmds.length;U++)V.cmds.push(B.cmds[U]);for(var U=0;U<B.crds.length;U++)V.crds.push(B.crds[U])},getBB:function(V){var B=1e99,U=1e99,M=-B,J=-U;
for(var D=0;D<V.length;D+=2){var d=V[D],K=V[D+1];if(d<B)B=d;if(d>M)M=d;if(K<U)U=K;if(K>J)J=K}return[B,U,M,J]},rectToPath:function(V){return{cmds:["M","L","L","L","Z"],crds:[V[0],V[1],V[2],V[1],V[2],V[3],V[0],V[3]]}},insideBox:function(V,B){return B[0]<=V[0]&&B[1]<=V[1]&&V[2]<=B[2]&&V[3]<=B[3]},isBox:function(V,B){var U=function(R,l){for(var Q=0;
Q<8;Q+=2){var c=!0;for(var f=0;f<8;f++)if(Math.abs(l[f]-R[f+Q&7])>=2){c=!1;break}if(c)return!0}return!1},D=!1;
if(V.cmds.length>10)return!1;var M=V.cmds.join(""),J=V.crds;if(M=="MLLLZ"&&J.length==8||(M=="MLLLLZ"||M=="MLLLL")&&J.length==10){if(J.length==10)J=J.slice(0,8);
if(B==null){B=[J[0],J[1],J[0],J[1]];for(var d=0;d<J.length;d+=2){var K=J[d],I=J[d+1];if(K<B[0])B[0]=K;
if(I<B[1])B[1]=I;if(B[2]<K)B[2]=K;if(B[3]<I)B[3]=I}}var O=B[0],$=B[1],n=B[2],S=B[3];if(!D)D=U(J,[O,$,n,$,n,S,O,S]);
if(!D)D=U(J,[O,S,n,S,n,$,O,$])}return D},boxArea:function(V){var B=V[2]-V[0],U=V[3]-V[1];return B*U},newPath:function(V){V.pth={cmds:[],crds:[]}},moveTo:function(V,B,U){var M=UDOC.M.multPoint(V.ctm,[B,U]),J=V.pth,D=J.cmds.length;
if(D!=0&&J.cmds[D-1]=="M"){J.cmds.pop();J.crds.pop();J.crds.pop()}V.pth.cmds.push("M");V.pth.crds.push(M[0],M[1]);
V.cpos=M},lineTo:function(V,B,U){var M=UDOC.M.multPoint(V.ctm,[B,U]);if(V.cpos[0]==M[0]&&V.cpos[1]==M[1])return;
V.pth.cmds.push("L");V.pth.crds.push(M[0],M[1]);V.cpos=M},curveTo:function(V,B,U,M,J,D,d){var K;if(V.pth.cmds.length==0)UDOC.G.moveTo(V,0,0);
K=UDOC.M.multPoint(V.ctm,[B,U]);B=K[0];U=K[1];K=UDOC.M.multPoint(V.ctm,[M,J]);M=K[0];J=K[1];K=UDOC.M.multPoint(V.ctm,[D,d]);
D=K[0];d=K[1];V.cpos=K;V.pth.cmds.push("C");V.pth.crds.push(B,U,M,J,D,d)},quadCurveTo:function(V,B,U,M,J){var D;
if(V.pth.cmds.length==0)UDOC.G.moveTo(V,0,0);D=UDOC.M.multPoint(V.ctm,[B,U]);B=D[0];U=D[1];D=UDOC.M.multPoint(V.ctm,[M,J]);
M=D[0];J=D[1];V.cpos=D;V.pth.cmds.push("Q");V.pth.crds.push(B,U,M,J)},closePath:function(V){V.pth.cmds.push("Z")},arc:function(V,B,U,M,J,D,d){if(d)while(D>J)D-=2*Math.PI;
else while(D<J)D+=2*Math.PI;var K=(D-J)/4,w=Math.cos(K/2),I=-Math.sin(K/2),O=(4-w)/3,$=I==0?I:(1-w)*(3-w)/(3*I),n=O,S=-$,R=w,x=-I,l=[w,I],c=[O,$],f=[n,S],y=[R,x],P={cmds:[V.pth.cmds.length==0?"M":"L"],crds:[w,I]},q=[1,0,0,1,0,0];
for(var p=0;p<4;p++){c=UDOC.M.multPoint(q,c);f=UDOC.M.multPoint(q,f);y=UDOC.M.multPoint(q,y);P.crds.push(c[0],c[1],f[0],f[1],y[0],y[1]);
P.cmds.push("C");if(p==0)UDOC.M.rotate(q,-K)}var k=[M,0,0,M,B,U];UDOC.M.rotate(q,-J+K/2);UDOC.M.concat(q,k);
UDOC.M.multArray(q,P.crds);UDOC.M.multArray(V.ctm,P.crds);UDOC.G.concat(V.pth,P);var U=P.crds.pop();
B=P.crds.pop();V.cpos=[B,U]},drawRect:function(V,B,U,M,J){UDOC.G.moveTo(V,B,U);UDOC.G.lineTo(V,B+M,U);
UDOC.G.lineTo(V,B+M,U+J);UDOC.G.lineTo(V,B,U+J);UDOC.G.closePath(V)},toPoly:function(V){if(V.cmds[0]!="M"||V.cmds[V.cmds.length-1]!="Z")return null;
for(var B=1;B<V.cmds.length-1;B++)if(V.cmds[B]!="L")return null;var U=[],M=V.crds.length;if(V.crds[0]==V.crds[M-2]&&V.crds[1]==V.crds[M-1])M-=2;
for(var B=0;B<M;B+=2)U.push([V.crds[B],V.crds[B+1]]);if(UDOC.G.polyArea(V.crds)<0)U.reverse();return U},fromPoly:function(V){var B={cmds:[],crds:[]};
for(var U=0;U<V.length;U++){B.crds.push(V[U][0],V[U][1]);B.cmds.push(U==0?"M":"L")}B.cmds.push("Z");
return B},polyArea:function(V){if(V.length<6)return 0;var B=V.length-2,U=(V[0]-V[B])*(V[B+1]+V[1]);for(var M=0;
M<B;M+=2)U+=(V[M+2]-V[M])*(V[M+1]+V[M+3]);return-U*.5},polyClip:function(V,B){var U,M,J,D,d=function(n){return(M[0]-U[0])*(n[1]-U[1])>(M[1]-U[1])*(n[0]-U[0])},K=function(){var n=[U[0]-M[0],U[1]-M[1]],S=[J[0]-D[0],J[1]-D[1]],R=U[0]*M[1]-U[1]*M[0],x=J[0]*D[1]-J[1]*D[0],l=1/(n[0]*S[1]-n[1]*S[0]);
return[(R*S[0]-x*n[0])*l,(R*S[1]-x*n[1])*l]},w=V,I,O;U=B[B.length-1];for(O in B){var M=B[O],$=w;w=[];
J=$[$.length-1];for(I in $){var D=$[I];if(d(D)){if(!d(J)){w.push(K())}w.push(D)}else if(d(J)){w.push(K())}J=D}U=M}return w}};
UDOC.M={getScale:function(V){return Math.sqrt(Math.abs(V[0]*V[3]-V[1]*V[2]))},translate:function(V,B,U){UDOC.M.concat(V,[1,0,0,1,B,U])},rotate:function(V,B){UDOC.M.concat(V,[Math.cos(B),-Math.sin(B),Math.sin(B),Math.cos(B),0,0])},scale:function(V,B,U){UDOC.M.concat(V,[B,0,0,U,0,0])},concat:function(V,B){var U=V[0],M=V[1],J=V[2],D=V[3],d=V[4],K=V[5];
V[0]=U*B[0]+M*B[2];V[1]=U*B[1]+M*B[3];V[2]=J*B[0]+D*B[2];V[3]=J*B[1]+D*B[3];V[4]=d*B[0]+K*B[2]+B[4];
V[5]=d*B[1]+K*B[3]+B[5]},invert:function(V){var B=V[0],U=V[1],M=V[2],J=V[3],D=V[4],d=V[5],K=B*J-U*M;
V[0]=J/K;V[1]=-U/K;V[2]=-M/K;V[3]=B/K;V[4]=(M*d-J*D)/K;V[5]=(U*D-B*d)/K},multPoint:function(V,B){var U=B[0],M=B[1];
return[U*V[0]+M*V[2]+V[4],U*V[1]+M*V[3]+V[5]]},multArray:function(V,B){for(var U=0;U<B.length;U+=2){var M=B[U],J=B[U+1];
B[U]=M*V[0]+J*V[2]+V[4];B[U+1]=M*V[1]+J*V[3]+V[5]}}};UDOC.C={srgbGamma:function(V){return V<.0031308?12.92*V:1.055*Math.pow(V,1/2.4)-.055},cmykToRgb:function(V){var B=V[0],M=V[1],J=V[2],D=V[3],d=255+B*(-4.387332384609988*B+54.48615194189176*M+18.82290502165302*J+212.25662451639585*D+-285.2331026137004)+M*(1.7149763477362134*M-5.6096736904047315*J+-17.873870861415444*D-5.497006427196366)+J*(-2.5217340131683033*J-21.248923337353073*D+17.5119270841813)+D*(-21.86122147463605*D-189.48180835922747),K=255+B*(8.841041422036149*B+60.118027045597366*M+6.871425592049007*J+31.159100130055922*D+-79.2970844816548)+M*(-15.310361306967817*M+17.575251261109482*J+131.35250912493976*D-190.9453302588951)+J*(4.444339102852739*J+9.8632861493405*D-24.86741582555878)+D*(-20.737325471181034*D-187.80453709719578),w=255+B*(.8842522430003296*B+8.078677503112928*M+30.89978309703729*J-.23883238689178934*D+-14.183576799673286)+M*(10.49593273432072*M+63.02378494754052*J+50.606957656360734*D-112.23884253719248)+J*(.03296041114873217*J+115.60384449646641*D+-193.58209356861505)+D*(-22.33816807309886*D-180.12613974708367);
return[Math.max(0,Math.min(1,d/255)),Math.max(0,Math.min(1,K/255)),Math.max(0,Math.min(1,w/255))]},labToRgb:function(V){var B=903.3,U=.008856,M=V[0],D=V[1],d=V[2],K=(M+16)/116,w=K*K*K,I=K-d/200,$=I*I*I,n=D/500+K,S=n*n*n,R=$>U?$:(116*I-16)/B,x=w>U?w:(116*K-16)/B,l=S>U?S:(116*n-16)/B,Q=l*96.72,c=x*100,f=R*81.427,y=[Q/100,c/100,f/100],P=[3.1338561,-1.6168667,-.4906146,-.9787684,1.9161415,.033454,.0719453,-.2289914,1.4052427],q=[P[0]*y[0]+P[1]*y[1]+P[2]*y[2],P[3]*y[0]+P[4]*y[1]+P[5]*y[2],P[6]*y[0]+P[7]*y[1]+P[8]*y[2]];
for(var H=0;H<3;H++)q[H]=Math.max(0,Math.min(1,UDOC.C.srgbGamma(q[H])));return q}};UDOC.getState=function(V){return{font:UDOC.getFont(),dd:{flat:1},ca:1,colr:[0,0,0],space:"/DeviceGray",CA:1,COLR:[0,0,0],sspace:"/DeviceGray",bmode:"/Normal",SA:!1,OPM:0,AIS:!1,OP:!1,op:!1,SMask:"/None",lwidth:1,lcap:0,ljoin:0,mlimit:10,SM:.1,doff:0,dash:[],ctm:[1,0,0,1,0,0],cpos:[0,0],pth:{cmds:[],crds:[]},cpth:V?UDOC.G.rectToPath(V):null,cpstack:[]}};
UDOC.getFont=function(){return{Tc:0,Tw:0,Th:100,Tl:0,Tf:"Helvetica-Bold",Tfs:1,Tmode:0,Trise:0,Tk:0,Tal:0,Tun:0,Tm:[1,0,0,1,0,0],Tlm:[1,0,0,1,0,0],Trm:[1,0,0,1,0,0]}};
function FromPS(){}FromPS.Parse=function(V,B){V=new Uint8Array(V);var U=0,D=null,d=null,l=!0;while(!(V[U]==37&&V[U+1]==33))U++;
var M=FromPS.B.readASCII(V,U,V.length-U),J=M.split(/[\n\r]+/);for(var K=0;K<J.length;K++){var w=J[K].trim();
if(w.charAt(0)=="%"){w=w.slice(1);while(w.charAt(0)=="%")w=w.slice(1);var I=w.split(":");if(I[0]=="BoundingBox"){D=I[1].trim().split(/[ ]+/).map(parseFloat)}if(w.indexOf("!PS-Adobe-3.0 EPSF-3.0")!=-1)d=w;
if(w.indexOf("!PS-Adobe-2.0 EPSF-1.2")!=-1)d=w}}if(d==null||D==null)D=[0,0,595,842];var O=[],$=FromPS._getDictStack([],{}),n=[{typ:"file",val:{buff:V,off:U}}],S=[],R=FromPS._getEnv(D),x=Date.now();
while(l)l=FromPS.step(O,$,n,S,R,B);if(R.pgOpen)B.ShowPage();B.Done();console.log(Date.now()-x)};FromPS._getDictStack=function(V,B){var U="def undef known begin end currentfile currentdict currentpacking setpacking currentoverprint setoverprint currentglobal setglobal gcheck currentsystemparams setsystemparams currentuserparams setuserparams currentpagedevice setpagedevice currentflat currentlinewidth currentdash currentpoint currentscreen setscreen currenthalftone currentblackgeneration currentundercolorremoval currentcolortransfer internaldict dict string readstring readhexstring readline getinterval putinterval token array aload astore length maxlength matrix count mark counttomark cleartomark dictstack countdictstack makepattern makefont scalefont stringwidth setfont currentcolorspace setcolorspace setcolor _setHSB_ currentgray currentrgbcolor setlinewidth setstrokeadjust setflat setlinecap setlinejoin setmiterlimit setdash clip eoclip clippath pathbbox newpath stroke fill eofill shfill closepath flattenpath showpage print _drawRect_ moveto lineto curveto arc arcn show ashow xshow yshow xyshow widthshow awidthshow charpath cshow rmoveto rlineto rcurveto translate rotate scale concat concatmatrix invertmatrix currentmatrix defaultmatrix setmatrix limitcheck save restore clipsave cliprestore gsave grestore grestoreall usertime readtime flush flushfile readonly executeonly findresource resourcestatus defineresource undefineresource resourceforall image imagemask colorimage xcheck status cachestatus setcachelimit type if ifelse exec stopped stop dup exch copy roll index anchorsearch pop put get load where store repeat for forall pathforall loop exit bind cvi cvr cvs cvx cvn cvlit add sub mul div idiv bitshift mod exp atan neg abs floor ceiling round truncate sqrt ln sin cos srand rand == transform itransform dtransform idtransform eq ge gt le lt ne and or not filter begincmap endcmap begincodespacerange endcodespacerange beginbfrange endbfrange beginbfchar endbfchar".split(" ").concat(V),M="image colorimage repeat for forall loop".split(" ");
for(var J=0;J<M.length;J++)U.push(M[J]+"---");FromPS._myOps=FromPS.makeProcs({CIDSystemInfo:"/CIDSystemInfo",findfont:"/Font findresource",definefont:"/Font defineresource",undefinefont:"/Font undefineresource",selectfont:"exch findfont exch scalefont setfont",rectfill:"gsave newpath _drawRect_  fill   grestore",rectstroke:"gsave newpath _drawRect_  stroke grestore",rectclip:"newpath _drawRect_  clip newpath",setgray:"/DeviceGray setcolorspace setcolor",setrgbcolor:"/DeviceRGB  setcolorspace setcolor",sethsbcolor:"/DeviceRGB  setcolorspace _setHSB_",setcmykcolor:"/DeviceCMYK setcolorspace setcolor",setpattern:"/Pattern    setcolorspace setcolor"});
for(var D in FromPS._myOps)U.push(D);var d=B,K={},I={},O={},$={};K.systemdict={typ:"dict",val:K};K.globaldict={typ:"dict",val:I};
K.userdict={typ:"dict",val:O};K.statusdict={typ:"dict",val:$};K.GlobalFontDirectory=K.SharedFontDirectory={typ:"dict",val:{}};
K.FontDirectory={typ:"dict",val:{}};K.$error={typ:"dict",val:{}};K.errordict={typ:"dict",val:FromPS.makeProcs({handleerror:""})};
K.null={typ:"null",val:null};K.true={typ:"boolean",val:!0};K.false={typ:"boolean",val:!1};K.product={typ:"string",val:FromPS.makeStr("Photopea")};
K.version={typ:"string",val:[51]};K.languagelevel={typ:"integer",val:3};for(var J=0;J<U.length;J++)K[U[J]]={typ:"operator",val:U[J]};
for(var n in d)K[n]=d[n];return[K,I,O]};FromPS._getEnv=function(V){var B={bb:V,gst:UDOC.getState(V),packing:!1,overprint:!1,global:!1,systemparams:{MaxPatternCache:{type:"integer",val:5e3}},userparams:{},pagedevice:{PageSize:{typ:"array",val:[{typ:"real",val:V[2]},{typ:"real",val:V[3]}]}},cmnum:0,fnt:null,res:{},pgOpen:!1,funs:FromPS.makeProcs({blackgeneration:"",undercolorremoval:"pop 0"})},U;
U="Font CIDFont CMap FontSet Form Pattern ProcSet Halftone ColorRendering IdiomSet InkParams TrapParams OutputDevice ControlLanguage Localization PDL HWOptions".split(" ");
for(var M=0;M<U.length;M++)B.res[U[M]]={typ:"dict",val:{},maxl:1e3};U=["Encoding","ColorSpace"];for(var M=0;
M<U.length;M++)B.res[U[M]]={typ:"array",val:[]};B.res.Category={typ:"dict",val:B.res};B.res.ColorSpace.val=[{typ:"array",val:[{typ:"name",val:"/DeviceRGB"}]},{typ:"array",val:[{typ:"name",val:"/DeviceCMYK"}]},{typ:"array",val:[{typ:"name",val:"/DeviceGray"}]}];
for(var M=0;M<U.length;M++)B.res[U[M]]={typ:"dict",val:{},maxl:1e3};return B};FromPS.makeProcs=function(V){var B={};
for(var U in V){var M=V[U].replace(/  +/g," ").split(" ");B[U]={typ:"procedure",val:[]};for(var J=0;
J<M.length;J++)B[U].val.push({typ:"name",val:M[J]})}return B};FromPS.addProc=function(V,B){if(V.val.length==0)return;
if(V.typ!="procedure"){console.log(V);throw V.typ}B.push({typ:"procedure",val:V.val,off:0})};FromPS.stepC=0;
FromPS._f32=new Float32Array(1);FromPS.step=function(V,B,U,M,J,D,d,K){var w=Date.now(),I=FromPS._f32,O=FromPS.getToken,$=J.gst,n=O(U,B),x=!1;
if(n==null)return!1;if(K&&n.typ=="string"&&FromPS.readStr(n.val)=="def")n={typ:"operator",val:"def"};
var S=n.typ,R=n.val;if(isNaN($.cpos[0]))throw"e";if(x)console.log(n,V.slice(0));if("integer real dict boolean string array procedure null file".split(" ").indexOf(S)!=-1){V.push(n);
return!0}if(S!="name"&&S!="operator")throw"e";if(R.charAt(0)=="/"){V.push(n)}else if(R.startsWith("II*"))return!1;
else if(R=="{"){var l=[],Q={typ:"procedure",val:[]},c=O(U,B);while(!0){if(c.val=="{"){var f={typ:"procedure",val:[]};
Q.val.push(f);l.push(Q);Q=f}else if(c.val=="}"){if(l.length==0)break;Q=l.pop()}else Q.val.push(c);c=O(U,B)}V.push(Q)}else if(R=="["||R=="<<")V.push({typ:"mark"});
else if(R=="]"||R==">>"){var y=[];while(V.length!=0){var P=V.pop();if(P.typ=="mark")break;y.push(P)}y.reverse();
if(R=="]")V.push({typ:"array",val:y});else{var q={};for(var H=0;H<y.length;H+=2)q[y[H].val.slice(1)]=y[H+1];
V.push({typ:"dict",val:q,maxl:1e3})}}else{var g=FromPS.getFromStacks(R,B);if(x)console.log("---",g);
if(g==null){if(K)return!1;else{console.log("unknown operator",R,V,B);throw"e"}}else if(g.typ=="procedure")FromPS.addProc(g,U);
else if("array string dict null integer real boolean state name file".split(" ").indexOf(g.typ)!=-1)V.push(g);
else if(g.typ=="operator"){var p=g.val,k="known if ifelse currentpacking setpacking dict dup begin end put bind def undef where pop get exec ge stop stopped cvr string not and".split(" ");
if(FromPS._myOps[p]){FromPS.addProc(FromPS._myOps[p],U)}else if(p=="flattenpath"||p=="limitcheck"){}else if(p=="def"){var b=V.pop(),ct=V.pop();
if(ct==null&&K)return!1;ct=FromPS.getDKey(ct);B[B.length-1][ct]=b}else if(p=="undef"||p=="known"){var a=FromPS.getDKey(V.pop()),ca=V.pop(),X=ca.val;
if(p=="undef")delete X[a];else V.push({typ:"boolean",val:ca.typ!="null"&&X[a]!=null})}else if(p=="internaldict"){var F=V.pop().val;
V.push({typ:"dict",val:{},maxl:1e3})}else if(p=="dict"){var F=V.pop().val;V.push({typ:"dict",val:{},maxl:F})}else if(p=="string"){var F=V.pop().val;
V.push({typ:"string",val:new Array(F)})}else if(p=="readstring"||p=="readhexstring"){var Y=V.pop(),F=Y.val.length,aJ=V.pop(),e=FromPS.GetFile(aJ).val;
if(p=="readstring"){for(var H=0;H<F;H++)Y.val[H]=e.buff[e.off+H];e.off+=F}else FromPS.readHex(e,F,Y.val);
V.push(Y,{typ:"boolean",val:!0})}else if(p=="readline"){var Y=V.pop(),e=FromPS.GetFile(V.pop()).val,H=0;
if(FromPS.isEOL(e.buff[e.off]))e.off++;while(H<Y.val.length){var aF=e.buff[e.off];e.off++;if(aF==null)throw"e";
if(FromPS.isEOL(aF)){if(e.buff[e.off]==10)e.off++;break}Y.val[H]=aF;H++}V.push({typ:"string",val:Y.val.slice(0,H)});
V.push({typ:"boolean",val:!0})}else if(p=="getinterval"){var aP=V.pop().val,bV=V.pop().val,bg=V.pop(),t=[];
if(bg.typ=="string"||bg.typ=="array")for(var H=0;H<aP;H++)t.push(bg.val[bV+H]);else throw"e";V.push({typ:bg.typ,val:t})}else if(p=="putinterval"){var bg=V.pop(),bV=V.pop().val,a4=V.pop();
if(bV+bg.val.length>=a4.val.length){}else if(bg.typ=="string")for(var H=0;H<bg.val.length;H++)a4.val[bV+H]=bg.val[H];
else throw"e"}else if(p=="token"){var bg=V.pop();if(bg.typ!="string")throw"e";var y=[];for(var H=0;H<bg.val.length;
H++){var ai=bg.val[H];if(ai==null)break;y.push(ai)}var bi={buff:new Uint8Array(y),off:0},n=O([{typ:"file",val:bi}],B),aB=[];
for(var H=bi.off;H<y.length;H++)aB.push(y[H]);V.push({typ:"string",val:aB},n,{typ:"boolean",val:!0})}else if(p=="array"){var F=V.pop().val;
V.push({typ:"array",val:new Array(F)})}else if(p=="aload"){var P=V.pop(),y=P.val;for(var H=0;H<y.length;
H++)V.push(y[H]);V.push(P)}else if(p=="astore"){var P=V.pop(),y=P.val;for(var H=0;H<y.length;H++)y[y.length-1-H]=V.pop();
V.push(P)}else if(p=="length"){var P=V.pop(),S=P.typ,F=0;if(S=="array")F=P.val.length;else if(S=="procedure")F=P.val.length;
else if(S=="dict")F=Object.keys(P.val).length;else if(S=="string")F=P.val.length;else{console.log(P);
throw"e"}V.push({typ:"integer",val:F})}else if(p=="maxlength"){var bk=V.pop();V.push({typ:"integer",val:bk.maxl})}else if(p=="matrix"){V.push({typ:"array",val:FromPS.makeArr([1,0,0,1,0,0],"real")})}else if(p=="count"){V.push({typ:"integer",val:V.length})}else if(p=="mark"){V.push({typ:"mark"})}else if(p=="counttomark"||p=="cleartomark"){var ah=0;
while(ah<V.length&&V[V.length-1-ah].typ!="mark")ah++;if(p=="cleartomark")for(var H=0;H<ah+1;H++)V.pop();
else V.push({typ:"integer",val:ah})}else if(p=="dictstack"){var y=V.pop();for(var H=0;H<B.length;H++)y.val[H]={typ:"dict",val:B[H],maxl:1e3};
V.push(y)}else if(p=="countdictstack"){var b6=0;for(var H=0;H<V.length;H++)if(V[H].typ=="dict")b6++;
V.push({typ:"integer",val:b6})}else if(p=="begin"){var P=V.pop(),X=P.val;if(X==null||P.typ!="dict"){console.log(P,B);
throw"e"}B.push(X)}else if(p=="end"){B.pop()}else if(p=="currentfile"){var bX;for(var H=U.length-1;H>=0;
H--)if(U[H].typ=="file"){bX=U[H];break}V.push({typ:"file",val:bX.val})}else if(p=="currentdict"){var X=B[B.length-1];
V.push({typ:"dict",val:X,maxl:1e3})}else if("currentpacking currentoverprint currentglobal currentsystemparams currentuserparams currentpagedevice".split(" ").indexOf(p)!=-1){var b=J[p.slice(7)];
V.push({typ:typeof b=="boolean"?"boolean":"dict",val:b})}else if(p=="gcheck"){var L=V.pop();V.push({typ:"boolean",val:!1})}else if("setpacking setoverprint setglobal setsystemparams setuserparams setpagedevice".split(" ").indexOf(p)!=-1){J[p.slice(3)]=V.pop().val}else if(p=="currentflat"){V.push({typ:"real",val:1})}else if(p=="currentlinewidth"){V.push({typ:"real",val:$.lwidth})}else if(p=="currentdash"){V.push({typ:"array",val:FromPS.makeArr($.dash,"integer")},{typ:"real",val:$.doff})}else if(p=="currentpoint"){var bM=$.ctm.slice(0);
UDOC.M.invert(bM);var cd=UDOC.M.multPoint(bM,$.cpos);V.push({typ:"real",val:cd[0]},{typ:"real",val:cd[1]})}else if(p=="currentscreen"){V.push({typ:"int",val:60},{typ:"real",val:0},{typ:"real",val:0})}else if(p=="setscreen"){V.pop();
V.pop();V.pop()}else if(p=="currenthalftone"){V.push({typ:"dict",val:{},maxl:1e3})}else if(p=="currentblackgeneration"||p=="currentundercolorremoval"){V.push(J.funs[p.slice(7)])}else if(p=="currentcolortransfer"){for(var H=0;
H<4;H++)V.push(J.funs.blackgeneration)}else if(p=="findresource"){var aD=V.pop().val.slice(1),bh=V.pop(),a=bh.val.slice(1),bm;
if(aD=="Font"){J.res[aD].val[a]={typ:"dict",val:{FontType:{typ:"integer",val:1},FontMatrix:{typ:"array",val:FromPS.makeArr([1,0,0,1,0,0],"real")},FontName:bh,FID:{typ:"fontID",val:Math.floor(Math.random()*16777215)},Encoding:{typ:"array",val:[]},FontBBox:{typ:"array",val:FromPS.makeArr([0,0,1,1],"real")},PaintType:{typ:"integer",val:0}}}}if(aD=="Category"&&a=="Generic")bm={typ:"dict",val:{},maxl:1e3};
else if((aD=="ProcSet"||aD=="Procset")&&a=="CIDInit")bm={typ:"dict",val:{},maxl:1e3};else bm=J.res[aD].val[a];
if(bm==null)throw"e";V.push(bm)}else if(p=="resourcestatus"){var aD=V.pop().val.slice(1),a=V.pop().val.slice(1),bm=J.res[aD].val[a];
if(bm){V.push({typ:"integer",val:1});V.push({typ:"integer",val:Object.keys(bm.val).length})}V.push({typ:"boolean",val:bm!=null})}else if(p=="defineresource"){var aD=V.pop().val.slice(1),bC=V.pop(),a=V.pop().val.slice(1);
J.res[aD].val[a]=bC;V.push(bC)}else if(p=="undefineresource"){var aD=V.pop().val.slice(1),a=V.pop().val.slice(1);
delete J.res[aD].val[a]}else if(p=="resourceforall"){var aD=V.pop().val.slice(1),aI=V.pop().val,E=V.pop(),bJ=V.pop().val;
if(bJ.length!=1||bJ[0]!=42)throw"e";var ak=J.res[aD].val;for(var a in ak){var Y=aI.slice(0);for(var H=0;
H<a.length;H++)Y[H]=a[H];FromPS.addProc(E,U);FromPS.addProc({typ:"procedure",val:[{typ:"string",val:Y}]},U)}}else if(p=="image"||p=="colorimage"){var bU,aY,cf,bL,cl=1,c4=!1,bv=[],top=V.pop();
V.push(top);if(p=="image"&&top.typ=="dict"){var aH=V.pop().val;bU=aH.Width.val;aY=aH.Height.val;cf=aH.BitsPerComponent.val;
bL=FromPS.readArr(aH.ImageMatrix.val);cl=aH.NComponents?aH.NComponents.val:1;c4=aH.MultipleDataSources?aH.MultipleDataSources.val:!1;
bv=aH.DataSource.val;if(aH.DataSource.typ=="file")bv=[aH.DataSource]}else{if(p=="colorimage"){cl=V.pop().val;
c4=V.pop().val}if(c4){bv[2]=V.pop();bv[1]=V.pop();bv[0]=V.pop()}else bv=[V.pop()];var bL=FromPS.readArr(V.pop().val),cf=V.pop().val,aY=V.pop().val,bU=V.pop().val}if(cl!=1&&cl!=3&&cl!=4)throw"unsupported number of channels "+cl;
if(cf!=8)throw"unsupported bits per channel: "+cf;var bu=new Uint8Array(bU*aY*4);for(var H=0;H<bu.length;
H++)bu[H]=255;U.push({typ:"name",val:p+"---",ctx:[bU,aY,cf,bL,cl,c4,bu,0,bv]});if(bv[0].typ=="procedure")for(var H=0;
H<bv.length;H++)FromPS.addProc(bv[H],U)}else if(p=="image---"||p=="colorimage---"){var ae=n.ctx,bU=ae[0],aY=ae[1],cf=ae[2],bL=ae[3],cl=ae[4],c4=ae[5],bu=ae[6],bt=ae[7],bv=ae[8],cn=0;
if(c4){for(H=0;H<cl;H++){var bR=bv[H];if(bR.typ=="procedure")bR=V.pop().val;else bR=bR.val;cn=bR.length;
if(cl==4)for(var cr=0;cr<cn;cr++)bu[(bt+cr)*4+3-H]=bR[cr];if(cl==3)for(var cr=0;cr<cn;cr++)bu[(bt+cr)*4+2-H]=bR[cr]}}else{var bR;
if(bv[0].typ=="file")bR=FromPS.GetFile(bv[0]).val.buff;else bR=V.pop().val;cn=Math.floor(bR.length/3);
for(var cr=0;cr<cn;cr++){var a1=cr*3,cg=(bt+cr)*4;bu[cg+0]=bR[a1+0];bu[cg+1]=bR[a1+1];bu[cg+2]=bR[a1+2]}}bt+=cn;
FromPS.checkPageStarted(J,D);if(bt==bU*aY){var ao=1/255;if($.space=="/DeviceCMYK")for(var H=0;H<bu.length;
H+=4){var aw=[bu[H]*ao,bu[H+1]*ao,bu[H+2]*ao,bu[H+3]*ao],a5=UDOC.C.cmykToRgb(aw);bu[H]=a5[0]*255;bu[H+1]=a5[1]*255;
bu[H+2]=a5[2]*255;bu[H+3]=255}var b4=$.ctm.slice(),cq=bL.slice(0);UDOC.M.invert(cq);var bP=[bU,0,0,-aY,0,aY];
UDOC.M.concat(bP,cq);UDOC.M.concat($.ctm,bP);D.PutImage($,bu,bU,aY);$.ctm=b4}else{ae[7]=bt;U.push(n);
if(bv[0].typ=="procedure")for(var H=0;H<bv.length;H++)FromPS.addProc(bv[H],U)}}else if(p=="makepattern"){var r=V.pop().val,bk=V.pop().val;
V.push({typ:"array",val:[bk,JSON.parse(JSON.stringify(r))]})}else if(p=="makefont"||p=="scalefont"){var bA=p=="makefont",ae=V.pop().val;
if(bA)ae=FromPS.readArr(ae);var bZ=JSON.parse(JSON.stringify(V.pop())),c0=FromPS.readArr(bZ.val.FontMatrix.val);
if(bA)UDOC.M.concat(c0,ae);else UDOC.M.scale(c0,ae,ae);bZ.val.FontMatrix.val=FromPS.makeArr(c0);V.push(bZ)}else if(p=="stringwidth"||p=="charpath"){if(p=="charpath")V.pop();
var aU=V.pop().val,Y=FromPS.readStr(aU),aC=UDOC.M.getScale($.font.Tm)/UDOC.M.getScale($.ctm),bo=.55*aC*Y.length;
if(p=="stringwidth")V.push({typ:"real",val:bo},{typ:"real",val:0});else UDOC.G.drawRect($,0,0,bo,aC)}else if(p=="setfont"){var bZ=V.pop().val;
$.font.Tf=bZ.FontName.val.slice(1);$.font.Tm=FromPS.readArr(bZ.FontMatrix.val)}else if(p=="setlinewidth")$.lwidth=V.pop().val;
else if(p=="setstrokeadjust")$.SA=V.pop().val;else if(p=="setlinecap")$.lcap=V.pop().val;else if(p=="setlinejoin")$.ljoin=V.pop().val;
else if(p=="setmiterlimit")$.mlimit=V.pop().val;else if(p=="setflat")$.dd.flat=V.pop();else if(p=="setdash"){$.doff=V.pop().val;
$.dash=FromPS.readArr(V.pop().val)}else if(p=="show"||p=="ashow"||p=="xshow"||p=="yshow"||p=="xyshow"||p=="widthshow"||p=="awidthshow"){if(p=="xshow"||p=="xyshow"||p=="yshow")V.pop();
var aU=V.pop().val,Y=FromPS.readStr(aU);if(p=="awidthshow"){V.pop();V.pop();V.pop();V.pop()}if(p=="widthshow"){V.pop();
V.pop();V.pop()}if(p=="ashow"){V.pop();V.pop()}var bK=$.ctm;$.ctm=bK.slice(0);$.ctm[4]=$.cpos[0];$.ctm[5]=$.cpos[1];
FromPS.checkPageStarted(J,D);D.PutText($,Y,Y.length*.55);$.cpos[0]+=Y.length*UDOC.M.getScale(bK)*UDOC.M.getScale($.font.Tm)*.55;
$.ctm=bK}else if(p=="cshow"){V.pop();V.pop()}else if(p=="currentcolorspace"){V.push({typ:"array",val:[{typ:"name",val:$.space}]})}else if(p=="setcolorspace"){var aQ=V.pop();
$.space=aQ.val;if(aQ.typ=="array")$.space=aQ.val[0].val;else if(aQ.typ=="name")$.space=aQ.val;else{console.log(aQ);
throw"e"}}else if(p=="setcolor"||p=="_setHSB_"){var bj;if($.space=="/Pattern"){var aw=V.pop();if(aw.typ!="array")throw"e";
var cd=aw.val,r=FromPS.readArr(cd[1]);UDOC.M.concat(r,$.ctm);bj=FromPS.getPSShadingFill(cd[0].Shading,r)}else if($.space=="/DeviceGray"){var ce=FromPS.nrm(V.pop().val);
bj=[ce,ce,ce]}else if(p=="_setHSB_"){var L=V.pop().val,cs=V.pop().val,aY=V.pop().val,at,ce,by,H,bd,cd,b5,bp;
H=Math.floor(aY*6);bd=aY*6-H;cd=L*(1-cs);b5=L*(1-bd*cs);bp=L*(1-(1-bd)*cs);switch(H%6){case 0:at=L,ce=bp,by=cd;
break;case 1:at=b5,ce=L,by=cd;break;case 2:at=cd,ce=L,by=bp;break;case 3:at=cd,ce=b5,by=L;break;case 4:at=bp,ce=cd,by=L;
break;case 5:at=L,ce=cd,by=b5;break}bj=[FromPS.nrm(at),FromPS.nrm(ce),FromPS.nrm(by)]}else if($.space=="/DeviceRGB"){var by=V.pop().val,ce=V.pop().val,at=V.pop().val;
bj=[FromPS.nrm(at),FromPS.nrm(ce),FromPS.nrm(by)]}else if($.space=="/DeviceCMYK"){var c5=V.pop().val,bw=V.pop().val,r=V.pop().val,ab=V.pop().val;
bj=UDOC.C.cmykToRgb([ab,r,bw,c5])}else throw $.space;if(bj)$.colr=$.COLR=bj}else if(p=="currentrgbcolor"){for(var H=0;
H<3;H++)V.push({typ:"real",val:$.colr[H]})}else if(p=="currentgray"){V.push({typ:"real",val:($.colr[0]+$.colr[1]+$.colr[2])/3})}else if(p=="clip"||p=="eoclip"){var aj=UDOC.G.getBB($.pth.crds),cc=UDOC.G.getBB($.cpth.crds);
if(UDOC.G.isBox($.pth,aj)&&UDOC.G.insideBox(cc,aj)){}else if(UDOC.G.isBox($.cpth,cc)&&UDOC.G.insideBox(aj,cc)){$.cpth=JSON.parse(JSON.stringify($.pth))}else{var am=UDOC.G.toPoly($.pth),bc=UDOC.G.toPoly($.cpth);
if(am&&bc){var cd=UDOC.G.polyClip(am,bc);if(cd.length!=0)$.cpth=UDOC.G.fromPoly(cd);else console.log("strange intersection of polygons")}else{$.cpth=JSON.parse(JSON.stringify($.pth))}}}else if(p=="clippath"){$.pth=JSON.parse(JSON.stringify($.cpth))}else if(p=="pathbbox"){var a8=$.pth.crds,b8=UDOC.G.getBB(a8);
a8=[b8[0],b8[1],b8[2],b8[1],b8[0],b8[3],b8[2],b8[3]];var bM=$.ctm.slice(0);UDOC.M.invert(bM);UDOC.M.multArray(bM,a8);
b8=UDOC.G.getBB(a8);I[0]=b8[0];b8[0]=I[0];I[0]=b8[1];b8[1]=I[0];I[0]=b8[2];b8[2]=I[0];I[0]=b8[3];b8[3]=I[0];
b8=FromPS.makeArr(b8,"real");V.push(b8[0],b8[1],b8[2],b8[3])}else if(p=="newpath")UDOC.G.newPath($);
else if(p=="stroke"){FromPS.checkPageStarted(J,D);D.Stroke($);UDOC.G.newPath($)}else if(p=="shfill"){var a9=$.colr,bT=$.pth,cd=V.pop().val,r=$.ctm.slice(0);
$.colr=FromPS.getPSShadingFill({typ:"dict",val:cd,maxl:1e3},r);FromPS.checkPageStarted(J,D);$.pth=$.cpth;
$.cpth=UDOC.G.rectToPath(J.bb);D.Fill($);$.colr=a9;$.pth=bT}else if(p=="fill"||p=="eofill"){FromPS.checkPageStarted(J,D);
D.Fill($,p=="eofill");UDOC.G.newPath($)}else if(p=="showpage"){FromPS.checkPageStarted(J,D);D.ShowPage();
var az=$.font;$=J.gst=UDOC.getState(J.bb);$.font=az;J.pgOpen=!1}else if(p=="print"){var aU=V.pop().val,Y=FromPS.readStr(aU);
D.Print(Y)}else if(p=="_drawRect_"){var aY=V.pop();if(aY.typ!="real"&&aY.typ!="integer")throw"e";aY=aY.val;
var bU=V.pop().val,bw=V.pop().val,bl=V.pop().val;UDOC.G.drawRect($,bl,bw,bU,aY)}else if(p=="closepath")UDOC.G.closePath($);
else if(p=="moveto"||p=="lineto"){var bw=V.pop().val,bl=V.pop().val;if(p=="moveto")UDOC.G.moveTo($,bl,bw);
else UDOC.G.lineTo($,bl,bw)}else if(p=="rmoveto"||p=="rlineto"){var bw=V.pop().val,bl=V.pop().val,bM=$.ctm.slice(0);
UDOC.M.invert(bM);var cd=UDOC.M.multPoint(bM,$.cpos);bw+=cd[1];bl+=cd[0];if(p=="rmoveto")UDOC.G.moveTo($,bl,bw);
else UDOC.G.lineTo($,bl,bw)}else if(p=="curveto"){var b0=V.pop().val,bW=V.pop().val,c7=V.pop().val,aq=V.pop().val,bf=V.pop().val,bz=V.length==0?0:V.pop().val;
UDOC.G.curveTo($,bz,bf,aq,c7,bW,b0)}else if(p=="arc"||p=="arcn"){var ad=V.pop().val,bO=V.pop().val,at=V.pop().val,bw=V.pop().val,bl=V.pop().val;
UDOC.G.arc($,bl,bw,at,bO*Math.PI/180,ad*Math.PI/180,p=="arcn")}else if(p=="concat"){var r=FromPS.readArr(V.pop().val);
UDOC.M.concat(r,$.ctm);$.ctm=r}else if(["translate","scale","rotate"].indexOf(p)!=-1){var L=V.pop(),r,bl,bw;
if(L.typ=="array"){r=FromPS.readArr(L.val);bw=V.pop().val}else{r=[1,0,0,1,0,0];bw=L.val}if(p!="rotate")bl=V.pop().val;
if(p=="translate")UDOC.M.translate(r,bl,bw);if(p=="scale")UDOC.M.scale(r,bl,bw);if(p=="rotate")UDOC.M.rotate(r,-bw*Math.PI/180);
if(L.typ=="array")V.push({typ:"array",val:FromPS.makeArr(r,"real")});else{UDOC.M.concat(r,$.ctm);$.ctm=r}}else if(p=="concatmatrix"){var aM=FromPS.readArr,bD=aM(V.pop().val),an=aM(V.pop().val),ax=aM(V.pop().val),r=ax.slice(0);
UDOC.M.concat(r,an);r=FromPS.makeArr(r,"real");V.push({typ:"array",val:r})}else if(p=="invertmatrix"){var aM=FromPS.readArr,an=aM(V.pop().val),ax=aM(V.pop().val),r=ax.slice(0);
UDOC.M.invert(r);r=FromPS.makeArr(r,"real");V.push({typ:"array",val:r})}else if(p=="currentmatrix"||p=="defaultmatrix"){var r=V.pop(),al=FromPS.makeArr(p=="currentmatrix"?$.ctm:[1,0,0,1,0,0],"real");
for(var H=0;H<6;H++)r.val[H]=al[H];V.push(r)}else if(p=="setmatrix"){$.ctm=FromPS.readArr(V.pop().val)}else if(p=="cvi"){var P=V.pop(),L=P.val,t=0;
if(P.typ=="real")t=Math.round(L);else if(P.typ=="integer")t=L;else throw"unknown type "+P.typ;V.push({typ:"integer",val:t})}else if(p=="cvr"){var P=V.pop(),L=P.val,t=0;
if(P.typ=="real")t=L;else if(P.typ=="integer")t=L;else if(P.typ=="string")t=parseFloat(FromPS.readStr(L));
else throw"unknown type "+P.typ;V.push({typ:"real",val:t})}else if(p=="cvs"){var Y=V.pop(),G=V.pop(),b="";
Y.val=[];V.push(Y);if(G.typ=="real"||G.typ=="integer"){if(Math.abs(Math.round(G.val)-G.val)<1e-6)b=Math.round(G.val)+".0";
else b=(Math.round(G.val*1e6)/1e6).toString()}else if(G.typ=="name")b=G.val;else throw"unknown var type: "+G.typ;
for(var H=0;H<b.length;H++)Y.val[H]=b.charCodeAt(H)}else if(p=="cvx"){var P=V.pop(),bq;if(P.typ=="array")bq={typ:"procedure",val:P.val};
else if(P.typ=="name")bq={typ:"name",val:P.val.slice(1)};else if(P.typ=="string"){bq={typ:"file",val:{off:0,buff:new Uint8Array(P.val)}}}else{console.log(P);
throw P.typ}V.push(bq)}else if(p=="cvlit"){var g=V.pop();if(g.typ=="procedure")V.push({typ:"array",val:g.val});
else V.push(g)}else if(p=="cvn"){V.push({typ:"name",val:FromPS.readStr(V.pop().val)})}else if("add sub mul div idiv bitshift mod exp atan".split(" ").indexOf(p)!=-1){var bF=V.pop(),v=V.pop(),A=v.val,N=bF.val,t=0,aK="";
if(p=="add"||p=="sub"||p=="mul")aK=v.typ=="real"||bF.typ=="real"?"real":"integer";else if(p=="div"||p=="atan"||p=="exp")aK="real";
else if(p=="mod"||p=="idiv"||p=="bitshift")aK="integer";if(v.typ=="real"){I[0]=A;A=I[0]}if(bF.typ=="real"){I[0]=N;
N=I[0]}if(p=="add")t=A+N;if(p=="sub")t=A-N;if(p=="mul")t=A*N;if(p=="div")t=A/N;if(p=="idiv")t=~~(A/N);
if(p=="bitshift")t=N>0?A<<N:A>>>-N;if(p=="mod")t=A%N;if(p=="exp")t=Math.pow(A,N);if(p=="atan")t=Math.atan2(A,N)*180/Math.PI;
if(aK=="real"){I[0]=t;t=I[0]}V.push({typ:aK,val:t})}else if("neg abs floor ceiling round truncate sqrt ln sin cos".split(" ").indexOf(p)!=-1){var v=V.pop(),A=v.val,t=0,aK="";
if(p=="neg"||p=="abs"||p=="truncate"||p=="floor"||p=="ceiling"||p=="round")aK=v.typ;else if(p=="sqrt"||p=="sin"||p=="cos"||p=="ln")aK="real";
if(v.typ=="real"){I[0]=A;A=I[0]}if(p=="neg")t=-A;if(p=="abs")t=Math.abs(A);if(p=="floor")t=Math.floor(A);
if(p=="ceiling")t=Math.ceil(A);if(p=="round")t=Math.round(A);if(p=="truncate")t=Math.trunc(A);if(p=="sqrt")t=Math.sqrt(A);
if(p=="ln")t=Math.log(A);if(p=="sin")t=Math.sin(A*Math.PI/180);if(p=="cos")t=Math.cos(A*Math.PI/180);
if(p=="ln"&&A<=0)throw"e";if(aK=="real"){I[0]=t;t=I[0]}V.push({typ:aK,val:t})}else if("eq ge gt le lt ne".split(" ").indexOf(p)!=-1){var bF=V.pop(),v=V.pop(),ac=v.typ,aS=bF.typ,A=v.val,N=bF.val,t=!1;
if(p=="eq"||p=="ne"){var h=v.typ==bF.typ;if(h&&["integer","real","name","null","dict"].indexOf(ac)!=-1)t=A==N;
else if(ac=="real"&&aS=="integer"||aS=="real"&&ac=="integer")t=A==N;else if(!h&&(v.typ=="null"||bF.typ=="null"))t=!1;
else if(h&&v.typ=="string"){if(A.length!=N.length)t=!1;else{t=!0;for(var H=0;H<A.length;H++)if(A[H]!=N[H])t=!1}}else{console.log(p,v,bF,v.val==bF.val);
throw"e"}if(p=="ne")t=!t}else if(p=="ge")t=A>=N;else if(p=="gt")t=A>N;else if(p=="le")t=A<=N;else if(p=="lt")t=A<N;
V.push({typ:"boolean",val:t})}else if(["and","or"].indexOf(p)!=-1){var z=V.pop(),s=V.pop(),N=s.val,i=z.val,W=s.typ=="integer",t;
if(p=="and")t=W?N&i:N&&i;if(p=="or")t=W?N|i:N||i;V.push({typ:W?"integer":"boolean",val:t})}else if(p=="not"){var by=V.pop(),L=by.val,W=by.typ=="integer",t=W?~L:!L;
V.push({typ:W?"integer":"boolean",val:t})}else if(p=="if"){var E=V.pop(),o=V.pop().val;if(o)FromPS.addProc(E,U)}else if(p=="ifelse"){var m=V.pop(),C=V.pop(),o=V.pop().val;
FromPS.addProc(o?C:m,U)}else if(p=="exec"||p=="stopped"){var g=V.pop();if(p=="stopped")FromPS.addProc({typ:"procedure",val:[{typ:"boolean",val:!1}]},U);
if(g.typ=="procedure")FromPS.addProc(g,U);else if(g.typ=="name"||g.typ=="operator"||g.typ=="integer"||g.typ=="real"||g.typ=="array")FromPS.addProc({typ:"procedure",val:[g]},U);
else{console.log(g);throw"unknown executable type: "+g.typ}}else if(p=="stop"){var aN=U[U.length-1];
if(aN.typ=="procedure"&&aN.off!=0)U.pop()}else if(p=="dup"){var L=V.pop();V.push(L,L)}else if(p=="exch"){V.push(V.pop(),V.pop())}else if(p=="copy"){var b6=V.pop();
if(b6.typ=="integer"){var av=[];for(var H=0;H<b6.val;H++)av[b6.val-1-H]=V.pop();for(var H=0;H<b6.val;
H++)V.push(av[H]);for(var H=0;H<b6.val;H++)V.push(av[H])}else if(b6.typ=="array"){var r=V.pop().val;
for(var H=0;H<r.length;H++){b6.val[H]=r[H];if(r[H].val==null){console.log(B);throw"e"}}V.push(b6)}else if(b6.typ=="dict"){var r=V.pop().val;
for(var b1 in r){b6.val[b1]=r[b1]}V.push(b6)}else throw"e"}else if(p=="roll"){var cr=V.pop().val,b6=V.pop().val,av=[];
for(var H=0;H<b6;H++)av.push(V.pop());av.reverse();cr=(b6+cr)%b6;for(var H=0;H<cr;H++)av.unshift(av.pop());
for(var H=0;H<b6;H++)V.push(av[H])}else if(p=="index"){var b6=V.pop().val;V.push(V[V.length-1-b6])}else if(p=="anchorsearch"){var j=V.pop(),as=V.pop(),aG=j.val,Y=as.val,bn=!0;
if(aG.length<=Y.length){for(var H=0;H<aG.length;H++)if(aG[H]!=Y[H])bn=!1}else bn=!1;if(bn)V.push({typ:"string",val:Y.slice(aG.length)},j);
else V.push(as);V.push({typ:"boolean",val:bn})}else if(p=="transform"||p=="itransform"||p=="dtransform"||p=="idtransform"){var r=V.pop(),bw=0,bl=0;
if(r.typ=="array"){r=FromPS.readArr(r.val);bw=V.pop().val}else{bw=r.val;r=$.ctm.slice(0)}if(p=="itransform"||p=="idtransform"){UDOC.M.invert(r)}bl=V.pop().val;
if(p.endsWith("dtransform")){r[4]=0;r[5]=0}var ag=UDOC.M.multPoint(r,[bl,bw]);V.push({typ:"real",val:ag[0]},{typ:"real",val:ag[1]})}else if(p=="pop"||p=="srand"||p=="=="){V.pop()}else if(p=="rand"){V.push({typ:"integer",val:Math.floor(Math.random()*2147483647)})}else if(p=="put"){var R=V.pop(),P=V.pop(),g=V.pop(),aK=g.typ;
if(aK=="array"){if(P.typ!="integer")throw"e";g.val[P.val]=R}else if(aK=="dict"){var ct=FromPS.getDKey(P);
g.val[ct]=R}else if(aK=="string")g.val[P.val]=R.val;else throw aK+" e"}else if(p=="get"){var P=V.pop(),g=V.pop(),aK=g.typ;
if(aK=="string")V.push({typ:"integer",val:g.val[P.val]});else if(aK=="array"){var b=g.val[P.val];if(b==null)throw"e";
V.push(b)}else if(aK=="dict"){var c5=FromPS.getDKey(P),L=g.val[c5];if(L==null){throw"e"}else V.push(L)}else throw"getting from unknown type "+g.typ}else if(p=="load"){var a=V.pop().val.slice(1),R=FromPS.getFromStacks(a,B);
if(R==null){console.log(a,B);throw"e"}V.push(R)}else if(p=="where"){var a=V.pop().val.slice(1),X=FromPS.where(a,B);
if(X!=null)V.push({typ:"dict",val:X,maxl:1e3});V.push({typ:"boolean",val:X!=null})}else if(p=="store"){var R=V.pop(),a=V.pop().val.slice(1),X=FromPS.where(a,B);
if(X==null)X=B[B.length-1];X[a]=R}else if(p=="repeat"){var E=V.pop(),c3=V.pop().val;U.push({typ:"name",val:p+"---",ctx:{proc:E,cur:0,cnt:c3}})}else if(p=="repeat---"){var _=n.ctx;
if(_.cur<_.cnt){U.push(n);FromPS.addProc(_.proc,U);_.cur++}}else if(p=="for"){var E=V.pop(),a3=V.pop(),br=V.pop(),a6=V.pop();
U.push({typ:"name",val:p+"---",ctx:{proc:E,isInt:a6.typ=="integer"&&br.typ=="integer",init:a6.val,inc:br.val,limit:a3.val}})}else if(p=="for---"){var _=n.ctx;
if(_.isInt){if(_.inc>0&&_.init<=_.limit||_.inc<0&&_.init>=_.limit){U.push(n);FromPS.addProc(_.proc,U);
V.push({typ:"integer",val:_.init});_.init+=_.inc}}else{var T=new Float32Array(1);T[0]=_.limit;_.limit=T[0];
T[0]=_.inc;_.inc=T[0];T[0]=_.init;if(_.inc>0&&T[0]<=_.limit||_.inc<0&&T[0]>=_.limit){U.push(n);FromPS.addProc(_.proc,U);
V.push({typ:"real",val:T[0]});T[0]+=_.inc;_.init=T[0]}}}else if(p=="loop"){var E=V.pop();U.push({typ:"name",val:p+"---",ctx:{proc:E}})}else if(p=="loop---"){var _=n.ctx;
U.push(n);FromPS.addProc(_.proc,U)}else if(p=="pathforall"){var Z=V.pop(),ch=V.pop(),bI=V.pop(),bN=V.pop()}else if(p=="forall"){var E=V.pop(),g=V.pop(),_=[E,g,0];
U.push({typ:"name",val:p+"---",ctx:_})}else if(p=="forall---"){var _=n.ctx,E=_[0],g=_[1],H=_[2];if(g.typ=="dict"){var cb=Object.keys(g.val);
if(H<cb.length){U.push(n);FromPS.addProc(E,U);V.push({typ:"name",val:"/"+cb[H]});var b=g.val[cb[H]];
if(b==null)throw"e";V.push(b==null?{typ:"null",val:null}:b);_[2]++}}else if(g.typ=="procedure"||g.typ=="array"){if(H<g.val.length){U.push(n);
FromPS.addProc(E,U);var b9=g.val[H];V.push(b9==null?{typ:"null",val:null}:b9);_[2]++}}else{console.log(E,g);
throw"forall: unknown type: "+g.typ}}else if(p=="exit"){var H=U.length-1;while(H!=0&&(U[H].typ!="name"||!U[H].val.endsWith("---")))H--;
if(H!=0)while(U.length>H)U.pop()}else if(p=="bind"){}else if(p=="xcheck"){var g=V.pop(),S=g.typ;V.push({typ:"boolean",val:S=="procedure"})}else if(p=="status"){var Y=V.pop();
V.push({typ:"boolean",val:!1})}else if(p=="cachestatus"){for(var H=0;H<7;H++)V.push({typ:"integer",val:5e3})}else if(p=="setcachelimit"){V.pop()}else if(p=="type"){var P=V.pop(),aL={name:"nametype",dict:"dicttype",boolean:"booleantype",procedure:"operatortype",string:"stringtype",null:"nulltype",integer:"integertype",array:"arraytype",operator:"operatortype",real:"realtype"};
if(aL[P.typ]==null){console.log(P);throw P.typ}V.push({typ:"name",val:"/"+aL[P.typ]})}else if(p=="save"){V.push({typ:"state",val:JSON.parse(JSON.stringify($))})}else if(p=="restore"){$=J.gst=V.pop().val}else if(p=="clipsave"){$.cpstack.push(JSON.parse(JSON.stringify($.cpth)))}else if(p=="cliprestore"){$.cpath=$.cpstack.pop()}else if(p=="gsave"){M.push(JSON.parse(JSON.stringify($)))}else if(p=="grestore"){if(M.length!=0)$=J.gst=M.pop();
else $=UDOC.getState()}else if(p=="grestoreall"){while(M.length!=0)$=J.gst=M.pop()}else if(p=="usertime"||p=="realtime")V.push({typ:"integer",val:p=="usertime"?Date.now()-w:Date.now()});
else if(p=="flush"||p=="readonly"||p=="executeonly"){}else if(p=="flushfile"){FromPS.GetFile(V.pop())}else if(p=="filter"){var a7=V.pop().val,c1;
if(a7=="/SubFileDecode"){var Y=V.pop();if(Y.typ!="string")throw"e";var aP=V.pop().val;Y=Y.val;c1=[a7,Y,aP]}else c1=[a7];
var a0=V.pop();V.push({typ:"file",val:{buff:new Uint8Array,off:0},_flt:c1,_src:a0})}else if(p=="begincmap"||p=="endcmap"){}else if(p=="begincodespacerange"||p=="beginbfrange"||p=="beginbfchar"){J.cmnum=V.pop().val}else if(p=="endcodespacerange"||p=="endbfrange"||p=="endbfchar"){var Z=p=="endbfrange"?3:2,ck=p.slice(3),X=B[B.length-1],cf=0;
if(X[ck]==null)X[ck]=[];for(var H=0;H<J.cmnum;H++){var a$=[];for(var cr=Z-1;cr>=0;cr--){var au=V.pop(),aE=au.val,b;
if(au.typ=="string"){b=FromPS.strToInt(aE);if(cr==0)cf=aE.length}else{b=[];for(var c5=0;c5<aE.length;
c5++)b.push(FromPS.strToInt(aE[c5].val))}a$[cr]=b}X[ck]=X[ck].concat(a$)}if(p!="endcodespacerange")X.bpc=cf}else if(d)d(p,V,B,U,M,J,D);
else{console.log(R,p);console.log(B,V);throw"e"}}else throw g.typ}return!0};FromPS.strToInt=function(V){var B=0;
for(var U=0;U<V.length;U++)B=B<<8|V[U];return B};FromPS.getDKey=function(V){if(V.typ=="name")return V.val.slice(1);
if(V.typ=="string")return FromPS.readStr(V.val);return V.val};FromPS.GetFile=function(V){if(V._flt==null||V.val.off<V.val.buff.length)return V;
FromPS.GetFile(V._src);var B=V._src.val,U=V._flt,M=U[0],J;if(M=="/ASCII85Decode")J=FromPS.F.ASCII85Decode(B);
else if(M=="/RunLengthDecode")J=FromPS.F.RunLengthDecode(B);else if(M=="/FlateDecode")J=FromPS.F.FlateDecode(B);
else if(M=="/LZWDecode")J=FromPS.F.LZWDecode(B);else if(M=="/SubFileDecode"){var d=U[1],K=U[2],w=B.off,I=0;
while(w<B.buff.length){var O=0;while(O<d.length&&B.buff[w+O]==d[O])O++;if(O==d.length){if(I==K)break;
I++}w++}J=B.buff.slice(B.off,w);B.off=w}else throw M;V.val={buff:J,off:0};return V};FromPS.checkPageStarted=function(V,B){if(!V.pgOpen){B.StartPage(V.bb[0],V.bb[1],V.bb[2],V.bb[3]);
V.pgOpen=!0}};FromPS.getPSShadingFill=function(V,B){function U(J){var D,d=J.typ,K=J.val;if(d=="dict"){D={};
for(var w in K)D["/"+w]=U(K[w])}else if(d=="array"){D=[];for(var I=0;I<K.length;I++)D.push(U(K[I]))}else if(d=="string"){D="";
for(var I=0;I<K.length;I++)D+=String.fromCharCode(K[I])}else if(["boolean","integer","real","name"].indexOf(d)!=-1)D=K;
else if(d=="procedure"){var O="";for(var I=0;I<K.length;I++)O+=K[I].val+" ";O="{ "+O+"}";var $=new Uint8Array(O.length);
for(var I=0;I<O.length;I++)$[I]=O.charCodeAt(I);D={"/FunctionType":4,"/Domain":[0,1],"/Range":[0,1,0,1,0,1,0,1],"/Length":O.length,stream:$}}else{console.log(J);
throw"e"}return D}var M=U(V);return FromPS.getShadingFill(M,B)};FromPS.F={HexDecode:function(V){var B=[];
FromPS.readHex(V,1e9,B);return new Uint8Array(B)},ASCII85Decode:function(V){var B=[85*85*85*85,85*85*85,85*85,85,1],U=[],M=0,J=0,D=V.off;
while(!0){if(D>=V.buff.length)throw"e";var d=V.buff[D];D++;if(FromPS.isWhite(d))continue;if(d==126){if(M!=0){if(M==3){U.push(J>>>24&255)}if(M==4){U.push(J>>>24&255,J>>>16&255)}var K=5-M<<3,I=J>>>K&255;
J=J&(1<<K)-1;if(J!=0)I++;U.push(I)}V.off=D+1;return new Uint8Array(U)}if(d==122){U.push(0,0,0,0);continue}if(d<33||84+33<d){console.log(d,String.fromCharCode(d),D-V.off);
throw"e"}J+=(d-33)*B[M];M++;if(M==5){U.push(J>>>24&255);U.push(J>>>16&255);U.push(J>>>8&255);U.push(J>>>0&255);
M=0;J=0}}},RunLengthDecode:function(V){var B=[],U=V.off;while(!0){if(U>=V.buff.length){console.log(B);
throw"e"}var M=V.buff[U];U++;if(M==128){V.off=U;return new Uint8Array(B)}if(M<128){for(var J=0;J<M+1;
J++)B.push(V.buff[U+J]);U+=M+1}else{for(var J=0;J<257-M;J++)B.push(V.buff[U]);U++}}},FlateDecode:function(V){var B=V.buff,U=new Uint8Array(B.buffer,V.off+2,B.length-2),M=pako.inflateRaw(U);
return M},LZWDecode:function(V){var B=new Uint8Array((V.buff.length-V.off)*20),U=UTIF.decode._decodeLZW(V.buff,V.off,B,0);
return B.slice(0,U)},_myLZW:function(){var V={},B=function(M,J,D,d,K){for(var I=0;I<K;I+=4){D[d+I]=M[J+I];
D[d+I+1]=M[J+I+1];D[d+I+2]=M[J+I+2];D[d+I+3]=M[J+I+3]}},U=function(M,J,D,d){if(!V.c){var K=new Uint32Array(65535),I=new Uint16Array(65535),O=new Uint8Array(2e6);
for(var $=0;$<256;$++){O[$<<2]=$;K[$]=$<<2;I[$]=1}V.c=[K,I,O]}var n=V.c[0],S=V.c[1],O=V.c[2],x=258,l=258<<2,Q=9,c=J<<3,f=256,y=257,P=0,q=0,k=0;
while(!0){P=M[c>>>3]<<16|M[c+8>>>3]<<8|M[c+16>>>3];q=P>>24-(c&7)-Q&(1<<Q)-1;c+=Q;if(q==y)break;if(q==f){Q=9;
x=258;l=258<<2;P=M[c>>>3]<<16|M[c+8>>>3]<<8|M[c+16>>>3];q=P>>24-(c&7)-Q&(1<<Q)-1;c+=Q;if(q==y)break;
D[d]=q;d++}else if(q<x){var a=n[q],ca=S[q];B(O,a,D,d,ca);d+=ca;if(k>=x){n[x]=l;O[n[x]]=a[0];S[x]=1;l=l+1+3&~3;
x++}else{n[x]=l;var F=n[k],Y=S[k];B(O,F,O,l,Y);O[l+Y]=O[a];Y++;S[x]=Y;x++;l=l+Y+3&~3}if(x+1==1<<Q)Q++}else{if(k>=x){n[x]=l;
S[x]=0;x++}else{n[x]=l;var F=n[k],Y=S[k];B(O,F,O,l,Y);O[l+Y]=O[l];Y++;S[x]=Y;x++;B(O,l,D,d,Y);d+=Y;l=l+Y+3&~3}if(x+1==1<<Q)Q++}k=q}return d};
return U}()};FromPS.B={readUshort:function(V,B){return V[B]<<8|V[B+1]},readUint:function(V,B){return V[B]*(256*256*256)+(V[B+1]<<16|V[B+2]<<8|V[B+3])},readASCII:function(V,B,U){var M="";
for(var J=0;J<U;J++)M+=String.fromCharCode(V[B+J]);return M}};FromPS.nrm=function(V){return Math.max(0,Math.min(1,V))};
FromPS.makeArr=function(V,B){var U=[];for(var M=0;M<V.length;M++)U.push({typ:B,val:V[M]});return U};
FromPS.readArr=function(V){var B=[];for(var U=0;U<V.length;U++)B.push(V[U].val);return B};FromPS.makeStr=function(V){var B=[];
for(var U=0;U<V.length;U++)B.push(V.charCodeAt(U));return B};FromPS.readStr=function(V){var B="";for(var U=0;
U<V.length;U++)B+=String.fromCharCode(V[U]);return B};FromPS.getFromStacks=function(V,B){var U=B.length-1;
while(U>=0){if(B[U][V]!=null)return B[U][V];U--}return null};FromPS.where=function(V,B){var U=B.length-1;
while(U>=0){if(B[U][V]!=null)return B[U];U--}return null};FromPS.skipWhite=function(V){var B=V.off,U=V.buff,M=FromPS.isWhite;
while(M(U[B])||U[B]==37){while(M(U[B]))B++;if(U[B]==37){while(B<U.length&&!FromPS.isEOL(U[B]))B++;B++}}V.off=B};
FromPS.getToken=function(V,B){if(V.length==0)return null;var U=V[V.length-1];if(U.typ=="procedure"){var M=U.val[U.off];
U.off++;if(U.off==U.val.length)V.pop();return M}if(U.typ=="name"){V.pop();return U}var J=FromPS.getFToken(U.val,B);
while(J==null&&V.length>1){V.pop();if(V.length!=0)J=FromPS.getFToken(V[V.length-1].val,B)}return J};
FromPS.getFToken=function(V,B){FromPS.skipWhite(V);var U=FromPS.isWhite,M=FromPS.isSpecl,J=V.off,D=V.buff,d=null;
if(J>=D.length)return null;var K=D[J],I=String.fromCharCode(K);J++;if(I=="("){var O=0,$=J;while(!(D[$]==41&&O==0)){if(D[$]==40)O++;
if(D[$]==41)O--;if(D[$]==92)$++;$++}var n=[];for(var S=0;S<$-J;S++)n.push(D[J+S]);J=$+1;n=FromPS.getString(n);
d={typ:"string",val:n}}else if(I=="{"||I=="}"||I=="["||I=="]"){d={typ:"name",val:I}}else if(I=="<"&&D[J]==60||I==">"&&D[J]==62){d={typ:"name",val:I=="<"?"<<":">>"};
J++}else if(I=="<"){var n;if(D[J]=="~".charCodeAt(0)){V.off=J+1;var R=FromPS.F.ASCII85Decode(V);n=[];
for(var S=0;S<R.length;S++)n.push(R[S]);J=V.off}else{var $=J;while(D[$]!=62)$++;var n=[];FromPS.readHex({buff:D,off:J},1e9,n);
J=$+1}d={typ:"string",val:n}}else{var $=J;while($<D.length&&!U(D[$])&&(!M(D[$])||D[$]==47&&D[$-1]==47&&$==J&&B))$++;
var x=FromPS.B.readASCII(D,J-1,$-J+1);J=$;var l=parseFloat(x);if(!1){}else if(x=="true"||x=="false")d={typ:"boolean",val:x=="true"};
else if(!isNaN(l)){var Q=new Float32Array(1);Q[0]=l;l=Q[0];d={typ:x.indexOf(".")==-1?"integer":"real",val:l}}else{if(x.slice(0,2)=="//"&&B){var c=x.slice(2),f=FromPS.getFromStacks(c,B);
if(f!=null)d=f;else d={typ:"name",val:x}}else d={typ:"name",val:x}}}V.off=J;return d};FromPS.isSpecl=function(V){return[40,41,60,62,91,93,123,125,37,47].indexOf(V)!=-1};
FromPS.isWhite=function(V){return V==0||V==9||V==10||V==12||V==13||V==32};FromPS.isEOL=function(V){return V==10||V==13};
FromPS.getString=function(V){var B=[],U="n,r,t,b,f,,(,), ,/".split(","),M=["\n","\r","\t","\b","\f","\\","(",")"," ","/"];
for(var J=0;J<V.length;J++){var D=V[J],d=String.fromCharCode(D);if(d=="\\"){var K=String.fromCharCode(V[J+1]);
J++;if(K=="\r"||K=="\n")continue;var I=U.indexOf(K);if(I!=-1)B.push(M[I].charCodeAt(0));else{var O=K+String.fromCharCode(V[J+1])+String.fromCharCode(V[J+2]);
J+=2;B.push(parseInt(O,8))}}else B.push(D)}return B};FromPS.makeString=function(V){var B="n r t b f  ( )".split(" "),U=["\n","\r","\t","\b","\f","\\","(",")"],M=[];
for(var J=0;J<V.length;J++){var D=V[J],d=U.indexOf(String.fromCharCode(D));if(d==-1)M.push(D);else M.push(92,B[d].charCodeAt(0))}return M};
FromPS.readHex=function(V,B,U){var M=0,J=-1,D=V.off,d=V.buff.length;while(M!=B&&D<d){var K=V.buff[D],O=0;
D++;if(47<K&&K<58)O=K-48;else if(96<K&&K<103)O=10+K-97;else if(64<K&&K<71)O=10+K-65;else if(K==62)break;
else if(FromPS.isWhite(K))continue;else throw"e";if(J==-1)J=O;else{U[M]=J<<4|O;J=-1;M++}}V.off=D};FromPS.getShadingFill=function(V,B){var U=V["/ShadingType"],M=V["/ColorSpace"],J=V["/Extend"],D=V["/Coords"]?V["/Coords"].slice(0):null,d="",w;
if(J==null)J=[!1,!1];if(U==2)d="lin";else if(U==3)d="rad";else{console.log("Unknown shading type",U);
return}var K=V["/Function"];if(K instanceof Array){var I=K.length,O;for(var $=0;$<I;$++){var n=FromPS.getGrad(K[$],"/DeviceGray");
if($==0)O=n;else{var R=O.length;for(var x=0;x<R;x++)O[x][1][$]=n[x][1][0]}}if(M=="/DeviceCMYK")for(var $=0;
$<O.length;$++)O[$][1]=UDOC.C.cmykToRgb(O[$][1]);w=O}else w=FromPS.getGrad(K,M);if(d=="rad"&&D[2]>D[5]){D=D.slice(3).concat(D.slice(0,3));
J.reverse();w.reverse();for(var $=0;$<w.length;$++)w[$][0]=1-w[$][0]}if(!J[0]&&d!="rad"){var l=w[0];
l[0]+=.002;w.unshift([.001,l[1].slice(),0])}if(!J[1]){var l=w[w.length-1];l[0]-=.002;w.push([0,999,l[1].slice(),0])}var Q={typ:d,mat:B,grad:w,crds:D};
return Q};FromPS.getGrad=function(V,B){var U=FromPS._normColor,M=V["/Functions"],J=V["/FunctionType"],D=V["/Bounds"],d=V["/Encode"],K;
if(J==0){K=[];var w=Math.min(4,V["/Size"][0]);for(var I=0;I<=w;I++)K.push([I/w,U(V,[I/w],B)])}else if(J==2)K=[[0,U(V,[0],B)],[1,U(V,[1],B)]];
else if(J==3){var O=0;K=[];if(D.length==0||D[0]>0)K.push([0,U(M[0],[d[0]],B)]);for(var I=0;I<D.length;
I++)K.push([D[I],U(M[I],[d[2*I+1]],B)]);if(D.length==0||D[D.length-1]<1)K.push([1,U(M[M.length-1],[d[d.length-1]],B)])}else if(J==4){K=[];
for(var I=0;I<5;I++)K.push([I/5,U(V,[I/5],B)])}return K};FromPS._normColor=function(V,B,U){var M="/DeviceCMYK",J="/DeviceRGB",D,d=FromPS.Func(V,B);
if(U[3]&&U[3]["/Length"]){d=FromPS.Func(U[3],d);if(U[2]==M||d.length==4)D=M;else if(U[2]==J)D=J;else if(U[2]&&U[2][1]&&U[2][1]["/Alternate"]&&U[2][1]["/Alternate"][0]=="/Lab")D="/Lab";
else{console.log(d,U);throw"unknown color profile"}}else if(U[0]=="/ICCBased"&&U[1]){var K=U[1]["/N"];
if(K==4)D=M;else if(K==3)D=J;else throw K}else if(U[0]=="/Separation"){d=FromPS._readSeparation(U,d[0]);
D=J}else if(U.length==1)D=U[0];else if(U[0]=="/Lab")D="/Lab";else if(U[2]==M)D=M;else D=U;if(D==J)d=d;
else if(D==M)d=UDOC.C.cmykToRgb(d);else if(D=="/DeviceGray")d=[d[0],d[0],d[0]];else if(D=="/Lab")d=UDOC.C.labToRgb(d);
else throw"Unknown color space "+D;return d};FromPS._readSeparation=function(V,B){var U=FromPS.Func(V[3],[B]),M;
if(V&&V[2]=="/DeviceCMYK")M=UDOC.C.cmykToRgb(U);else if(V&&V[2]=="/DeviceGray")M=[U[0],U[0],U[0]];else if(V&&V[2]&&V[2][0]&&V[2][0]=="/Lab")M=UDOC.C.labToRgb(U);
else{M=U}return M};FromPS.Func=function(V,B){var U=FromPS.intp,M=V["/Domain"],J=V["/Range"],d=V["/FunctionType"],K=[];
for(var w=0;w<B.length;w++)B[w]=Math.max(M[2*w],Math.min(M[2*w+1],B[w]));if(d==0){var I=V["/Encode"],O=V["/Size"],$=V["/Decode"],n=J.length/2;
if(I==null)I=[0,O[0]-1];if($==null)$=J;for(var w=0;w<B.length;w++){var R=U(B[w],M[2*w],M[2*w+1],I[2*w],I[2*w+1]);
B[w]=Math.max(0,Math.min(O[w]-1,R))}var x=V["/DataSource"];for(var l=0;l<n;l++){var Q=Math.round(B[0]),c;
if(x)c=x.charCodeAt(n*Q+l);else c=FromPS.GS(V)[n*Q+l];c=U(c,0,255,$[2*l],$[2*l+1]);K.push(c)}}else if(d==2){var f=V["/C0"],y=V["/C1"],P=V["/N"],Q=B[0];
for(var w=0;w<f.length;w++)K[w]=f[w]+Math.pow(Q,P)*(y[w]-f[w])}else if(d==4){var q=FromPS._getEnv([0,0,0,0]),b=!0;
q.pgOpen=!0;var g=[],p=[],x=FromPS._getDictStack([],{}),k=[];k.push({typ:"file",val:{buff:FromPS.GS(V),off:0}});
while(b)b=FromPS.step(p,x,k,g,q,{},FromPS.operator);var ct=p.pop();ct.off=0;k.push(ct);for(var w=0;w<B.length;
w++)p.push({typ:"real",val:B[w]});b=!0;while(b)b=FromPS.step(p,x,k,g,q,{},FromPS.operator);for(var w=0;
w<p.length;w++)K.push(p[w].val)}if(J)for(var w=0;w<K.length;w++)K[w]=Math.max(J[2*w],Math.min(J[2*w+1],K[w]));
return K};FromPS.intp=function(V,B,U,M,J){return M+(V-B)*(J-M)/(U-B)};FromPS.GS=function(V){if(V.stream==null){var B=V.buff;
delete V.buff;var U=V["/Filter"],M=V["/DecodeParms"];if(U!=null){var J=typeof U=="string"?[U]:U,D=!1;
for(var d=0;d<J.length;d++){var K=J[d],I={buff:B,off:0};if(K=="/FlateDecode"){B=FromPS.F.FlateDecode(I)}else if(K=="/RunLengthDecode"){B=FromPS.F.RunLengthDecode(I)}else if(K=="/LZWDecode"){B=FromPS.F.LZWDecode(I)}else if(K=="/ASCIIHexDecode"){B=FromPS.F.HexDecode(I)}else if(K=="/ASCII85Decode"||K=="/A85"){B=FromPS.F.ASCII85Decode(I)}else if(K=="/DCTDecode"||K=="/CCITTFaxDecode"||K=="/JPXDecode"||K=="/JBIG2Decode"){D=!0}else{console.log(K,B);
throw"e"}}if(!D)delete V["/Filter"]}if(M!=null){if(M instanceof Array)M=M[0];if(M["/Predictor"]!=null&&M["/Predictor"]!=1){var O=M["/Columns"],$=M["/Colors"]?M["/Colors"]:1,n=$*O,S=B.length/(n+1);
FromPS._filterZero(B,0,O,S,$);B=B.slice(0,S*n)}}V.stream=B}return V.stream};FromPS._filterZero=function(V,B,U,M,J){var D=J*U,d=FromPS._paeth;
for(var w=0;w<M;w++){var I=B+w*D,O=I+w+1,$=V[O-1];if($==0)for(var n=0;n<D;n++)V[I+n]=V[O+n];else if($==1){for(var n=0;
n<J;n++)V[I+n]=V[O+n];for(var n=J;n<D;n++)V[I+n]=V[O+n]+V[I+n-J]&255}else if(w==0){for(var n=0;n<J;n++)V[I+n]=V[O+n];
if($==2)for(var n=J;n<D;n++)V[I+n]=V[O+n]&255;if($==3)for(var n=J;n<D;n++)V[I+n]=V[O+n]+(V[I+n-J]>>1)&255;
if($==4)for(var n=J;n<D;n++)V[I+n]=V[O+n]+d(V[I+n-J],0,0)&255}else{if($==2){for(var n=0;n<D;n++)V[I+n]=V[O+n]+V[I+n-D]&255}if($==3){for(var n=0;
n<J;n++)V[I+n]=V[O+n]+(V[I+n-D]>>1)&255;for(var n=J;n<D;n++)V[I+n]=V[O+n]+(V[I+n-D]+V[I+n-J]>>1)&255}if($==4){for(var n=0;
n<J;n++)V[I+n]=V[O+n]+d(0,V[I+n-D],0)&255;for(var n=J;n<D;n++)V[I+n]=V[O+n]+d(V[I+n-J],V[I+n-D],V[I+n-J-D])&255}}}return V};
FromPS._paeth=function(V,B,U){var M=V+B-U,J=Math.abs(M-V),D=Math.abs(M-B),d=Math.abs(M-U);if(J<=D&&J<=d)return V;
else if(D<=d)return B;return U};function FromPDF(){}FromPDF.Parse=function(V,B){V=new Uint8Array(V);
var U=0;while(V[U]==32)U++;if(U!=0)V=new Uint8Array(V.buffer,U,V.length-U);var M=V.length-3;while(FromPS.B.readASCII(V,M,3)!="%%E")M--;
while(V[M-1]==37)M--;var J=M;M--;while(FromPS.isEOL(V[M]))M--;while(!FromPS.isEOL(V[M]))M--;var D=parseInt(FromPS.B.readASCII(V,M+1,J-M-1));
if(isNaN(D))throw"no xref";var d=[],K=FromPDF.readXrefTrail(V,D,d),w=-1;for(var I=0;I<d.length;I++)if(d[I]==null)w=I;
if(K==null||w!=-1){console.log("PDF is broken, trying to rebuild");while(d.length!=0)d.pop();K=FromPDF.brokenXrefTrail(V,d)}if(K["/Encrypt"]){alert("Encrypted PDFs are not supported yet.");
return}var O={buff:V,off:0},$=K["/Root"];if($.typ=="ref")K["/Root"]=FromPDF.getIndirect($.ind,$.gen,O,d);
var n=K["/Root"]["/Pages"];if(n.typ=="ref")K["/Root"]["/Pages"]=FromPDF.getIndirect(n.ind,n.gen,O,d);
var S=[K["/Root"]["/Pages"]];while(S.length!=0){var R=S.pop();if(R["/Type"]=="/Pages"){var x=R["/Kids"];
for(var I=0;I<x.length;I++){if(x[I].typ=="ref")x[I]=FromPDF.getIndirect(x[I].ind,x[I].gen,O,d);FromPDF.solveIndirects(x[I],O,d);
S.push(x[I])}}}var l=Date.now();FromPDF.render(K["/Root"],B,K);B.Done()};FromPDF.solveIndirects=function(V,B,U){if(typeof V=="object")for(var M in V)if(M.startsWith("/")){if(V[M]&&V[M].typ=="ref"&&U[V[M].ind])V[M]=FromPDF.getIndirect(V[M].ind,V[M].gen,B,U);
FromPDF.solveIndirects(V[M],B,U)}};FromPDF.render=function(V,B,U){var M="CS cs SCN scn SC sc sh Do gs ID EI cm y v B B* BT ET Tj TJ Tf Tm Td T* Tc Tw Tz TL Tr Ts MP DP BMC BDC EMC BX EX ri".split(" "),J={J:"setlinecap",j:"setlinejoin",w:"setlinewidth",d:"setdash",M:"setmiterlimit",i:"setflat",q:"gsave",Q:"grestore",m:"moveto",l:"lineto",c:"curveto",h:"closepath",re:"_drawRect_",W:"clip","W*":"eoclip",f:"fill",F:"fill","f*":"eofill",S:"stroke",b:"h B","b*":"h B*",n:"newpath",RG:"/DeviceRGB  CS SCN",rg:"/DeviceRGB  cs scn",G:"/DeviceGray CS SCN",g:"/DeviceGray cs scn",K:"/DeviceCMYK CS SCN",k:"/DeviceCMYK cs scn",TD:"dup neg TL Td","\"":"exch Tc exch Tw '","'":"T* Tj",s:"h S",BI:"/BI"},d=0;
J=FromPS.makeProcs(J);var D=[V["/Pages"]];while(D.length!=0){var K=D.pop();if(K["/Type"]=="/Pages"){var w=K["/Kids"];
for(var I=w.length-1;I>=0;I--)D.push(w[I]);continue}var O=K["/MediaBox"];if(O==null)O=V["/Pages"]["/MediaBox"];
d+=(O[2]-O[0])*(O[3]-O[1])}var D=[V["/Pages"]],$=-1,n=[-1e9,1e9];while(D.length!=0){var K=D.pop();if(K["/Type"]=="/Pages"){var w=K["/Kids"];
for(var I=w.length-1;I>=0;I--)D.push(w[I]);continue}$++;if($<n[0])continue;if(K["/Resources"]==null)K["/Resources"]=V["/Pages"]["/Resources"];
var S=K["/Contents"];if(S==null)continue;if(S.length==null)S=[S];var R=K["/Rotate"]!=null&&(K["/Rotate"]+36e3)%360==90,O=K["/MediaBox"];
if(O==null)O=V["/Pages"]["/MediaBox"];if(R)O=[O[0],O[1],O[3],O[2]];var x=FromPS._getEnv(O);x.pgOpen=!0;
var l=[],Q=[],c=FromPS._getDictStack(M,J),f=[];if(R){UDOC.M.rotate(x.gst.ctm,Math.PI/2);UDOC.M.translate(x.gst.ctm,0,O[3])}B.StartPage(O[0],O[1],O[2],O[3],d);
if(U["/Encrypt"]){if(D.length==0)alert("Encrypted PDF is not supported yet.")}else for(var y=0;y<S.length;
y++){if(S[y].buff==null)continue;var P=FromPS.GS(S[y]),q=P.length-1,H=!0;while(P[q]==0)q--;P=new Uint8Array(P.buffer,0,q+1);
f.push({typ:"file",val:{buff:P,off:0,extra:K,clgrp:!1}});while(H){H=FromPS.step(Q,c,f,l,x,B,FromPDF.operator)}}B.ShowPage();
if($>=n[1])break}};FromPDF.addCmd=function(V,B,U){var M=V.length,J=new Uint8Array(M);for(var D=0;D<M;
D++)J[D]=V.charCodeAt(D);B.push({typ:"file",val:{buff:J,off:0,extra:U}})};FromPDF._pushForm=function(V,B,U,M){var J=B["/Matrix"];
if(M)FromPDF.addCmd("Q",V,B);if(J){var D=J.slice(0);UDOC.M.invert(D);FromPDF.addCmd(D.join(" ")+" cm",V,B)}V.push({typ:"file",val:{buff:FromPS.GS(B),off:0,extra:B,clgrp:U}});
if(J)FromPDF.addCmd(J.join(" ")+" cm",V,B);if(M)FromPDF.addCmd("q",V,B)};FromPDF.operator=function(V,B,U,M,J,D,d){var K=D.gst,w=M.length-1;
while(M[w].typ!="file")w--;var I=M[w].val,O=I.extra["/Resources"];if(V=="Do"){var $=B.pop().val,n=O["/XObject"][$],S=n["/Subtype"];
if(S=="/Form"){var R=n["/Group"],x=!1;if(R!=null){x=!0}if(n["/Resources"]==null)n["/Resources"]=O;FromPDF._pushForm(M,n,x)}else if(S=="/Image"){var l=n["/Width"],Q=n["/Height"],c=n["/ColorSpace"],f=n["/SMask"],y=FromPDF.getImage(n),P=FromPDF.getJBIG2Glob(n),H,g;
if(f){var p=f["/Width"],k=f["/Height"];if(p!=l||k!=Q){var b=new Uint32Array(p*k),ct=new Uint32Array(y.buffer.slice(0,4));
b.fill(ct[0]);l=p;Q=k;y=new Uint8Array(b.buffer)}H=FromPDF.getImage(n["/SMask"]);g=FromPDF.getJBIG2Glob(n["/SMask"])}if(n["/ImageMask"]==!0){H=y;
g=P;y=new Uint8Array(l*Q*4);P=null;var a=K.colr[0]*255,ca=K.colr[1]*255,X=K.colr[2]*255;for(var F=0;
F<l*Q*4;F+=4){y[F]=a;y[F+1]=ca;y[F+2]=X;y[F+3]=255}}d.PutImage(K,y,l,Q,H,P,g)}else console.log("Unknown XObject",S)}else if(V=="gs"){var Y=B.pop().val,aJ=O["/ExtGState"][Y];
for(var e in aJ){var aF=aJ[e];if(e=="/Type")continue;else if(e=="/CA")K.CA=I.clgrp?K.CA*aF:aF;else if(e=="/ca")K.ca=I.clgrp?K.ca*aF:aF;
else if(e=="/BM"){if(!I.clgrp||K.bmode=="/Normal")K.bmode=aF}else if(e=="/LC")K.lcap=aF;else if(e=="/LJ")K.ljoin=aF;
else if(e=="/LW")K.lwidth=aF;else if(e=="/ML")K.mlimit=aF;else if(e=="/SA")K.SA=aF;else if(e=="/OPM")K.OPM=aF;
else if(e=="/AIS")K.AIS=aF;else if(e=="/OP")K.OP=aF;else if(e=="/op")K.op=aF;else if(e=="/SMask"){K.SMask=""}else if(e=="/SM")K.SM=aF;
else if(e=="/HT"||e=="/TR"){}else console.log("Unknown gstate property: ",e,aF)}}else if(V=="ID"){var aP={};
while(!0){var aF=B.pop().val;if(aF=="/BI")break;aP[B.pop().val]=aF}I.off++;var l=aP["/W"],Q=aP["/H"],bV=l*Q,y=new Uint8Array(bV*4),c=aP["/CS"],bg=aP["/BPC"],t=I.off;
while(!FromPS.isWhite(I.buff[t])||I.buff[t+1]!=69||I.buff[t+2]!=73)t++;var a4=I.buff.slice(I.off,t);
I.off+=a4.length;if(aP["/F"]=="/Fl"){var ai={buff:a4,"/Filter":"/FlateDecode"};if(aP["/DP"]){var bi=ai["/DecodeParms"]={},aB=["Predictor","Columns","Colors"];
for(var F=0;F<3;F++)if(aP["/DP"][aB[F]])bi["/"+aB[F]]=aP["/DP"][aB[F]].val}a4=FromPS.GS(ai);delete aP["/F"];
delete aP["/DP"]}if(c=="/G"&&aP["/F"]==null){FromPDF.plteImage(a4,0,y,null,l,Q,bg)}else if(c=="/RGB"&&aP["/F"]==null&&a4.length==l*Q*3){for(var F=0;
F<bV;F++){var bk=F*3,ah=F*4;y[ah]=a4[bk];y[ah+1]=a4[bk+1];y[ah+2]=a4[bk+2];y[ah+3]=255}}else if(c&&c[0].typ!=null){FromPDF.plteImage(a4,0,y,c[3].val,l,Q,bg)}else y=a4;
d.PutImage(K,y,l,Q)}else if(V=="n"||V=="BT"||V=="EI"){}else if(V=="ET"){K.font.Tm=[1,0,0,1,0,0];K.font.Tlm=K.font.Tm.slice(0)}else if(V=="y"||V=="v"){var b6=K.ctm.slice(0);
UDOC.M.invert(b6);var e=UDOC.M.multPoint(b6,K.cpos),bX=B.pop().val,L=B.pop().val,bM=B.pop().val,cd=B.pop().val;
if(V=="y")UDOC.G.curveTo(K,cd,bM,L,bX,L,bX);else UDOC.G.curveTo(K,e[0],e[1],cd,bM,L,bX)}else if(V=="B"||V=="B*"){d.Fill(K,V=="B*");
d.Stroke(K);UDOC.G.newPath(K)}else if(V=="cm"||V=="Tm"){var aD=[];for(var F=0;F<6;F++)aD.push(B.pop().val);
aD.reverse();if(V=="cm"){UDOC.M.concat(aD,K.ctm);K.ctm=aD}else{K.font.Tm=aD;K.font.Tlm=aD.slice(0)}}else if(V=="Td"||V=="T*"){var bh=0,bm=0;
if(V=="T*"){bh=0;bm=-K.font.Tl}else{bm=B.pop().val;bh=B.pop().val}var bC=[1,0,0,1,bh,bm];UDOC.M.concat(bC,K.font.Tlm);
K.font.Tm=bC;K.font.Tlm=bC.slice(0)}else if(V=="Tf"){var aI=B.pop().val,E=B.pop().val;K.font.Tf=E;K.font.Tfs=aI}else if(V=="Tj"||V=="TJ"){var bJ=B.pop();
if(bJ.typ=="string")bJ=[bJ];else bJ=bJ.val;var ak=K.font.Tf,E=O["/Font"][ak],bU=K.font.Tfs/1e3,aY=function(cq,r){var bA=[1,0,0,1,r,0];
UDOC.M.concat(bA,cq.Tm);cq.Tm=bA};for(var F=0;F<bJ.length;F++){if(bJ[F].typ!="string"){if(F==0)aY(K.font,-bU*bJ[F].val);
continue}var cf=FromPDF.getString(bJ[F].val,E);if(bJ[F+1]&&bJ[F+1].typ!="string"){var bL=bJ[F+1].val;
cf[1]+=-bL;if(-900<bL&&bL<-100)cf[0]+=" "}K.font.Tf=cf[2];d.PutText(K,cf[0],cf[1]/1e3);K.font.Tf=ak;
aY(K.font,bU*cf[1])}}else if(V=="Tc")K.font.Tc=B.pop().val;else if(V=="Tw")K.font.Tw=B.pop().val;else if(V=="Tz")K.font.Th=B.pop().val;
else if(V=="TL")K.font.Tl=B.pop().val;else if(V=="Tr")K.font.Tmode=B.pop().val;else if(V=="Ts")K.font.Trise=B.pop().val;
else if(V=="CS"||V=="cs"){var c=B.pop().val;if(V=="CS")K.sspace=c;else K.space=c}else if(V=="SCN"||V=="scn"||V=="SC"||V=="sc"){var cl=V=="SCN"||V=="SC",c4=cl?K.sspace:K.space,c,bv=null,aH=O?O["/ColorSpace"]:null;
if(aH!=null&&aH[c4]!=null){if(aH[c4][1]&&aH[c4][1]["/Alternate"])c=aH[c4][1]["/Alternate"];else c=typeof aH[c4]=="string"?aH[c4]:aH[c4][0]}else c=c4;
if(c=="/DeviceN"){var bu=aH[c4],ae=bu[1].length;for(var F=0;F<ae;F++)B.pop();bv=[1,0,0]}else if(c=="/Lab"||c=="/DeviceRGB"||c=="/CalRGB"||c=="/ICCBased"&&aH[c4][1]["/N"]==3){bv=[B.pop().val,B.pop().val,B.pop().val];
bv.reverse()}else if(c=="/DeviceCMYK"||c=="/ICCBased"&&aH[c4][1]["/N"]==4){var bt=[B.pop().val,B.pop().val,B.pop().val,B.pop().val];
bt.reverse();bv=UDOC.C.cmykToRgb(bt)}else if(c=="/DeviceGray"||c=="/CalGray"||c=="/ICCBased"&&aH[c4][1]["/N"]==1){var cn=FromPS.nrm(B.pop().val);
bv=[cn,cn,cn]}else if(c=="/Separation"){bv=FromPS._readSeparation(aH[c4],B.pop().val)}else if(c=="/Indexed"){var bR=FromPDF.getPalette(aH[c4]),cr=B.pop().val*3;
bv=[bR[cr]/255,bR[cr+1]/255,bR[cr+2]/255]}else if(c=="/Pattern"){var a1=O["/Pattern"][B.pop().val],cg=a1["/PatternType"];
if(cg==1){console.log("tile pattern");FromPDF._pushForm(M,a1,x,!0);return}var ao=a1["/Matrix"];if(ao==null)ao=[1,0,0,1,0,0];
bv=FromPS.getShadingFill(a1["/Shading"],ao);if(bv==null)bv=[0,0,0]}else{console.log(c4,c,aH,O);throw"e"}if(cl)K.COLR=bv;
else K.colr=bv}else if(V=="sh"){var aw=O["/Shading"][B.pop().val],a5=K.colr,b4=K.pth;K.pth=K.cpth;K.cpth=UDOC.G.rectToPath(D.bb);
K.colr=FromPS.getShadingFill(aw,K.ctm.slice(0));if(K.colr==null)K.colr=[0,0,0];d.Fill(K);K.colr=a5;K.pth=b4}else if(V=="MP"||V=="BMC"||V=="ri"){B.pop()}else if(V=="DP"||V=="BDC"){B.pop();
B.pop()}else if(V=="EMC"||V=="BX"||V=="EX"){}else throw"Unknown operator",V};FromPDF.getJBIG2Glob=function(V){var B=V;
B=B["/DecodeParms"];if(B==null)return null;B=B["/JBIG2Globals"];if(B==null)return null;return FromPS.GS(B)};
FromPDF.getImage=function(V){var B=V["/Width"],U=V["/Height"],M=B*U,J=FromPS.GS(V),D=V["/Filter"],d=V["/ColorSpace"],w=V["/BitsPerComponent"],I=V["/Matte"],O=V.image;
if(O==null){var $=V["/Mask"];if(d&&d[0]=="/Indexed"){var n=FromPDF.getPalette(d),S=new Uint8Array(M*4);
FromPDF.plteImage(J,0,S,n,B,U,w,$);O=S}else if(D==null&&d&&d=="/DeviceGray"){var n=[0,0,0,255,255,255],S=new Uint8Array(M*4);
if(V["/Decode"]&&V["/Decode"][0]==1){n.reverse()}if(V["/ImageMask"]==!0)n.reverse();FromPDF.plteImage(J,0,S,w==1?n:null,B,U,w,$);
O=S}else if(D==null&&d&&(d=="/DeviceCMYK"||d[0]=="/ICCBased"&&d[1]&&d[1]["/N"]==4)){var S=new Uint8Array(M*4),R=[0,0,0,0];
for(var x=0;x<M;x++){var l=x*4;R[0]=J[l]*(1/255);R[1]=J[l+1]*(1/255);R[2]=J[l+2]*(1/255);R[3]=J[l+3]*(1/255);
var Q=UDOC.C.cmykToRgb(R);S[l]=~~(Q[0]*255+.5);S[l+1]=~~(Q[1]*255+.5);S[l+2]=~~(Q[2]*255+.5);S[l+3]=255}O=S}else if(B*U*3<=J.length){var c=Math.round(255/((1<<w)-1)),f=Math.ceil(B*3*w/8),S=new Uint8Array(M*4);
for(var y=0;y<U;y++){var P=f*y;for(var H=0;H<B;H++){var l=(y*B+H)*4,p=3*H;S[l]=FromPDF.getBitNum(J,P,p,w);
S[l+1]=FromPDF.getBitNum(J,P,p+1,w);S[l+2]=FromPDF.getBitNum(J,P,p+2,w);S[l+3]=255}}O=S}else{O=J}if(I&&I.join("")!="000"){var k=Math.round(I[0]*255),b=Math.round(I[1]*255),ct=Math.round(I[2]*255);
for(var x=0;x<O.length;x+=4){O[x]=Math.max(O[x],k);O[x+1]=Math.max(O[x+1],b);O[x+2]=Math.max(O[x+2],ct)}}V.image=O}return O};
FromPDF.getPalette=function(V){var B;if(V[3].length!=null){var U=V[3];B=new Uint8Array(256*3);for(var M=0;
M<U.length;M++)B[M]=U.charCodeAt(M)}else B=FromPS.GS(V[3]);if(V[1]=="/DeviceCMYK"||V[1]&&V[1][1]&&V[1][1]["/N"]==4){var J=B,B=new Uint8Array(256*3);
for(var M=0;M<256;M++){var D=M<<2,d=D-M,K=UDOC.C.cmykToRgb([J[D]/255,J[D+1]/255,J[D+2]/255,J[D+3]/255]);
B[d]=K[0]*255;B[d+1]=K[1]*255;B[d+2]=K[2]*255}}return B};FromPDF.plteImage=function(V,B,U,M,J,D,d,w){var I=Math.round(255/((1<<d)-1)),O=Math.ceil(J*d/8);
for(var $=0;$<D;$++){var n=B+O*$;for(var S=0;S<J;S++){var R=FromPDF.getBitNum(V,n,S,d),x=$*J+S<<2;if(M){var l=R*3;
U[x]=M[l];U[x+1]=M[l+1];U[x+2]=M[l+2]}else{var Q=R*I;U[x]=Q;U[x+1]=Q;U[x+2]=Q}U[x+3]=255;if(w&&w[0]<=R&&R<=w[1])U[x+3]=0}}};
FromPDF.getBitNum=function(V,B,U,M){var J=0;if(M==8)J=V[B+U];else if(M==4)J=V[B+(U>>1)]>>(1-(U&1)<<2)&15;
else if(M==2)J=V[B+(U>>2)]>>(3-(U&3)<<1)&3;else if(M==1)J=V[B+(U>>3)]>>(7-(U&7)<<0)&1;return J};FromPDF.getString=function(V,B){var U=B["/Subtype"],M="",J=0,D=null,d=B["/ToUnicode"],K=B["/Encoding"],w=B,ca;
if(d!=null&&typeof d!="object")d=null;if(U=="/Type0")w=B["/DescendantFonts"][0];if(d!=null)M=FromPDF.toUnicode(V,d);
else if(K=="/WinAnsiEncoding")M=FromPDF.encFromMap(V,FromPDF._win1252);else if(K=="/MacRomanEncoding")M=FromPDF.encFromMap(V,FromPDF._macRoman);
else if(U=="/Type0"){var I=0,O=w["/CIDSystemInfo"]["/Ordering"];if(O=="Identity")I=0;else if(O=="Japan1")I=31;
else if(O=="GB1")I=31;else if(O=="CNS1")I=31;else if(O=="Korea1")I=31;else{console.log("unknown ordering",O);
I=0}for(var $=0;$<V.length;$+=2){var S=V[$]<<8|V[$+1];M+=String.fromCharCode(S+I)}}else if(K!=null&&K["/Type"]=="/Encoding"){var R=K["/Differences"],x=K["/BaseEncoding"],l=null;
if(x=="/WinAnsiEncoding")l=FromPDF._win1252;if(x=="/MacRomanEncoding")l=FromPDF._macRoman;if(R){var M="";
for(var Q=0;Q<V.length;Q++){var f=V[Q],y=-5,P=!1;for(var $=0;$<R.length;$++){if(typeof R[$]=="string"){if(f==y){M+=FromPDF.fromCName(R[$].slice(1));
P=!0;break}y++}else y=R[$]}if(!P&&l!=null){var q=l.indexOf(f);if(q!=-1)f=String.fromCharCode(l[q+1]);
M+=String.fromCharCode(f)}else if(!P)M+=String.fromCharCode(f)}}}else{M=FromPS.readStr(V)}if(U=="/Type0"){var H=w["/W"];
if(H&&H.length==0)H=null;if(H==null){J=M.length*1e3*.4;console.log("approximating word widths")}else for(var Q=0;
Q<V.length;Q+=2){var g=V[Q]<<8|V[Q+1],p=!1;for(var $=0;$<H.length;$+=2){var k=H[$],b=H[$+1];if(b.length){if(0<=g-k&&g-k<b.length){J+=b[g-k];
p=!0}}else{if(k<=g&&g<=b){J+=H[$+2];p=!0}$++}}if(!p)J+=H[1][0]}}else if(U=="/Type1"||U=="/Type3"||U=="/TrueType"){var ct=B["/FirstChar"],H=B["/Widths"];
if(H)for(var Q=0;Q<V.length;Q++)J+=H[V[Q]-ct];else{J=M.length*1e3*.4;console.log("approximating word width")}}else throw"unknown font type";
var a=w["/FontDescriptor"],X=["","2","3"];for(var Q=0;Q<3;Q++)if(a&&a["/FontFile"+X[Q]])ca="/FontFile"+X[Q];
if(a){if(a.psName)D=a.psName;else if(ca){var F=FromPS.GS(a[ca]);if(ca!=null&&F&&FromPS.B.readUint(F,0)==65536)D=a.psName=FromPDF._psName(F)}}if(D==null&&B["/BaseFont"])D=B["/BaseFont"].slice(1);
if(D==null||D=="")D="DejaVuSans";return[M,J,D]};FromPDF._psName=function(V){var B=FromPS.B.readUshort,U=B(V,4),M=0;
for(var J=0;J<U;J++){var D=FromPS.B.readASCII(V,12+J*16,4),d=FromPS.B.readUint(V,12+J*16+8);if(D=="name"){M=d;
break}}if(M==0)return null;var K=B(V,M+2),I=M+6,O=M+6;for(var J=0;J<K;J++){var $=B(V,O),n=B(V,O+2),S=B(V,O+4),R=B(V,O+6),x=B(V,O+8),l=B(V,O+10),Q;
O+=12;var f=I+K*12+l;if(n==1||n==10||n==3||$==3&&n==0){Q="";for(var y=1;y<x;y+=2)Q+=String.fromCharCode(V[f+y])}else if(n==0||n==2)Q=FromPS.B.readASCII(V,f,x);
if(R==6&&Q!=null&&Q.slice(0,3)!="OTS")return Q.replace(/\s/g,"")}return null};FromPDF.encFromMap=function(V,B){var U="";
for(var M=0;M<V.length;M++){var J=V[M],D=B.indexOf(J);if(D!=-1)J=B[D+1];U+=String.fromCharCode(J)}return U};
FromPDF._win1252=[128,8364,130,8218,131,402,132,8222,133,8230,134,8224,135,8225,136,710,137,8240,138,352,139,8249,140,338,142,381,145,8216,146,8217,147,8220,148,8221,149,8226,150,8211,151,8212,152,732,153,8482,154,353,155,8250,156,339,158,382,159,376];
FromPDF._macRoman=[128,196,129,197,130,199,131,201,132,209,133,214,134,220,135,225,136,224,137,226,138,228,139,227,140,229,141,231,142,233,143,232,144,234,145,235,146,237,147,236,148,238,149,239,150,241,151,243,152,242,153,244,154,246,155,245,156,250,157,249,158,251,159,252,160,8224,161,176,162,162,163,163,164,167,165,8226,166,182,167,223,168,174,169,169,170,8482,171,180,172,168,173,9824,174,198,175,216,176,8734,177,177,178,8804,179,8805,180,165,181,181,182,8706,183,8721,184,8719,185,960,186,8747,187,170,188,186,189,937,190,230,191,248,192,191,193,161,194,172,195,8730,196,402,197,8776,198,8710,199,171,200,187,201,8230,202,160,203,192,204,195,205,213,206,338,207,339,208,8211,209,8212,210,8220,211,8221,212,8216,213,8217,214,247,215,9674,216,255,217,376,218,8260,219,8364,220,8249,221,8250,222,64257,223,64258,224,8225,225,183,226,8218,227,8222,228,8240,229,194,230,202,231,193,232,203,233,200,234,205,235,206,236,207,237,204,238,211,239,212,240,63743,241,210,242,218,243,219,244,217,245,305,246,710,247,732,248,175,249,728,250,729,251,730,252,184,253,733,254,731,255,711];
FromPDF.fromCName=function(V){if(V=="f_f_i")return"ffi";if(V.length==1)return V;if(V.slice(0,3)=="uni")return String.fromCharCode(parseInt(V.slice(3),16));
var B={space:32,exclam:33,quotedbl:34,numbersign:35,dollar:36,percent:37,ampersand:38,quotesingle:39,parenleft:40,parenright:41,asterisk:42,plus:43,comma:44,hyphen:45,period:46,slash:47,zero:48,one:49,two:50,three:51,four:52,five:53,six:54,seven:55,eight:56,nine:57,colon:58,semicolon:59,less:60,equal:61,at:64,bracketleft:91,bracketright:93,underscore:95,braceleft:123,braceright:125,dieresis:168,circlecopyrt:169,degree:176,plusminus:177,Eacute:201,Adieresis:196,adieresis:228,Udieresis:220,germandbls:223,udieresis:252,Odieresis:214,odieresis:246,Cacute:262,cacute:263,Ccaron:268,ccaron:269,Dcroat:272,dcroat:273,Ecaron:283,ecaron:283,dotlessi:305,Scaron:352,scaron:353,Tcaron:356,tcaron:357,Zcaron:381,zcaron:382,alpha:945,phi:966,endash:8211,emdash:8212,asteriskmath:8727,quoteright:8217,quotedblbase:8222,ellipsis:8230,quotedblleft:8220,quotedblright:8221,bullet:8226,minus:8706,fi:64257,fl:64258},U=B[V];
if(U==null){if(V.charAt(0)!="g")console.log("unknown character "+V);return V}return String.fromCharCode(U)};
FromPDF.toUnicode=function(V,B){var U=B.cmap,M="",J;if(U==null){var D={buff:FromPS.GS(B),off:0},d=[],K=FromPS._getDictStack({}),w=[{typ:"file",val:D}],I=[],O=FromPS._getEnv([0,0,1,1]),$=!0;
O.pgOpen=!0;while($)$=FromPS.step(d,K,w,I,O,null,FromPS.operator,!0);U=O.res.CMap.val;B.cmap=U}for(var n in U){U=U[n].val;
break}var S=U.bfrange,R=U.bfchar,l=U.bpc;for(var Q=0;Q<V.length;Q+=l){var f=V[Q],y=!1;if(l==2)f=f<<8|V[Q+1];
if(!y&&S)for(var P=0;P<S.length;P+=3){var q=S[P],H=S[P+1],g=S[P+2];if(q<=f&&f<=H){if(q==H&&g==0){}else if(g.length==null)f+=g-q;
else f=g[f-q];y=!0;break}}if(!y&&R)for(var P=0;P<R.length;P+=2)if(R[P]==f){f=R[P+1];y=!0;break}M+=String.fromCharCode(f)}return M};
FromPDF.brokenXrefTrail=function(V,B){function U(S,R){var x=R;while(48<=S[R]&&S[R]<=57)R++;return FromPS.B.readASCII(S,x,R-x)}var M,J=V.length;
for(var D=0;D<J;D++){if(FromPS.isEOL(V[D])){var d=D;while(FromPS.isWhite(V[d]))d++;var K=U(V,d);if(K!=""){d+=K.length;
while(FromPS.isWhite(V[d]))d++;var I=U(V,d);if(I!=""){d+=I.length;while(FromPS.isWhite(V[d]))d++;if(FromPS.B.readASCII(V,d,3)=="obj"){var O=parseInt(K),$=parseInt(I);
B[O]={off:D+1,gen:$,chr:"n"};D=d}}}else if(V[d]==116&&V[d+1]==114&&FromPS.B.readASCII(V,d,7)=="trailer"){if(M==null)M=FromPDF._readTrailer(V,d+8,B)}else if(V[d]==115&&V[d+1]==116&&FromPS.B.readASCII(V,d,9)=="startxref"){d+=10;
while(FromPS.isWhite(V[d]))d++;var n=parseInt(U(V,d));if(n!=0&&M==null)M=FromPDF.readXrefTrail(V,n,B)}}}return M};
FromPDF._readTrailer=function(V,B,U){var M={buff:V,off:B},J=FromPDF.readObject(M,M,U);if(J["/Prev"])FromPDF.readXrefTrail(V,J["/Prev"],U);
return J};FromPDF.readXrefTrail=function(V,B,U){var M=FromPS.B.readASCII(V,B,4);if(M=="xref"){var J=B+4;
if(V[J]==13)J++;if(V[J]==10)J++;while(!0){if(FromPS.B.readASCII(V,J,7)=="trailer"){J+=7;if(V[J]==13)J++;
if(V[J]==10)J++;break}var D=J;while(!FromPS.isEOL(V[J]))J++;var d=FromPS.B.readASCII(V,D,J-D);d=d.split(" ");
var K=parseInt(d[0]),w=parseInt(d[1]);if(V[J]==13)J++;if(V[J]==10)J++;for(var I=0;I<w;I++){var O=K+I;
if(U[O]==null)U[O]={off:parseInt(FromPS.B.readASCII(V,J,10)),gen:parseInt(FromPS.B.readASCII(V,J+11,5)),chr:FromPS.B.readASCII(V,J+17,1),val:null,opn:!1};
if(V[J+16]!=32)return null;J+=20}}return FromPDF._readTrailer(V,J,U)}else{var J=B;while(!FromPS.isEOL(V[J]))J++;
while(FromPS.isWhite(V[J]))J++;if(FromPS.B.readASCII(V,J,2)=="<<"){var $={buff:V,off:J},n=FromPDF.readObject($,$,null),R=0,x=FromPS.GS(n),l=n["/W"],Q=n["/Index"],c=[],I=0;
if(Q){for(I=0;I<Q.length;I+=2){for(var f=0;f<Q[I+1];f++)c.push(Q[I]+f)}}I=0;while(R<x.length){var y=FromPDF.getInt(x,R,l[0]),J=0,g=0,p="n";
R+=l[0];var P=FromPDF.getInt(x,R,l[1]);R+=l[1];var H=FromPDF.getInt(x,R,l[2]);R+=l[2];if(y==0){J=P;g=H;
p="f"}if(y==1){J=P;g=H;p="n"}if(y==2){J=P;g=H;p="s"}U[Q?c[I]:I]={off:J,gen:g,chr:p,val:null,opn:!1};
I++}if(n["/Prev"])FromPDF.readXrefTrail(V,n["/Prev"],U);if(n["/Encrypt"])return n;var k={buff:V,off:0},b=["/Root","/Info"];
for(I=0;I<b.length;I++){var ct=b[I],a=n[ct];if(a&&a.typ=="ref")n[ct]=FromPDF.getIndirect(a.ind,a.gen,k,U)}return n}else return null}};
FromPDF.getInt=function(V,U,M){if(M==0)return 0;if(M==1)return V[U];if(M==2)return V[U]<<8|V[U+1];if(M==3)return V[U]<<16|V[U+1]<<8|V[U+2];
if(M==4)return V[U]<<24|V[U+1]<<16|V[U+2]<<8|V[U+3];while(M>4){M--;U++}return V[U]<<24|V[U+1]<<16|V[U+2]<<8|V[U+3]};
FromPDF.getIndirect=function(V,B,U,M){var J=M[V],K;if(J.chr=="f")return null;if(J.val!=null)return J.val;
if(J.opn)return{typ:"ref",ind:V,gen:B};J.opn=!0;var D=U.off;if(J.chr=="s"){var I=FromPDF.getIndirect(J.off,J.gen,U,M),O={buff:FromPS.GS(I),off:0},$=0,n=0;
while($!=V){$=FromPS.getFToken(O).val;n=FromPS.getFToken(O).val}O.off=n+I["/First"];K=FromPDF.readObject(O,U,M)}else{U.off=J.off;
var S=FromPS.getFToken(U);if(S.val!="<<"){var R=FromPS.getFToken(U),x=FromPS.getFToken(U)}else U.off-=2;
K=FromPDF.readObject(U,U,M)}J.val=K;U.off=D;J.opn=!1;return K};FromPDF.readObject=function(V,B,U){var M=FromPS.getFToken(V);
if(M.typ=="integer"){var J=V.off,D=FromPS.getFToken(V);if(D&&D.typ=="integer"){FromPS.skipWhite(V);if(V.buff[V.off]==82){V.off++;
if(U&&U[M.val])return FromPDF.getIndirect(M.val,D.val,B,U);else return{typ:"ref",ind:M.val,gen:D.val}}}V.off=J}if(M.val=="<<")return FromPDF.readDict(V,B,U);
if(M.val=="[")return FromPDF.readArra(V,B,U);if(M.typ=="string"){var d="";for(var K=0;K<M.val.length;
K++)d+=String.fromCharCode(M.val[K]);return d}if(M.typ=="name"&&M.val==">>")throw"e";return M.val};FromPDF.readDict=function(V,B,U){var M={};
while(!0){var J=V.off,D=FromPS.getFToken(V);if(D.typ=="name"&&D.val==">>")break;V.off=J;var d=FromPDF.readObject(V,B,U),K=FromPDF.readObject(V,B,U);
M[d]=K}if(M["/Length"]!=null&&M["/CFM"]==null){var w=M["/Length"],I=FromPS.getFToken(V);if(V.buff[V.off]==32)V.off++;
if(V.buff[V.off]==13)V.off++;if(V.buff[V.off]==10)V.off++;if(V.off+w>V.buff.length){console.log("too big /Length of a stream",w,V.buff.length-V.off,V.off)}M.buff=V.buff.slice(V.off,V.off+w);
V.off+=w;FromPS.getFToken(V)}return M};FromPDF.readArra=function(V,B,U){var M=[];while(!0){var J=V.off,D=FromPS.getFToken(V);
if(D.typ=="name"&&D.val=="]")return M;V.off=J;var d=FromPDF.readObject(V,B,U);M.push(d)}};var FromWMF=function(){var V=0,B=53,U=55,M=258,J=259,D=260,d=261,K=262,w=263,I=264,O=295,$=313,n=322,S=329,R=513,x=521,l=529,Q=531,c=532,f=544,y=552,P=561,q=564,H=804,g=805,p=522,k=523,b=524,ct=525,a=526,ca=527,X=1040,F=1042,Y=1045,aJ=1046,e=1048,aF=1049,aP=1065,bV=1078,bg=1313,t=1336,a4=1352,ai=1051,bi=1055,aB=1564,bk=1565,ah=30,b6=2074,bX=2851,L=1574,bM=298,cd=299,aD=300,bh=301,bm=302,bC=2071,aI=2096,E=2338,bJ=2610,ak=3379,bU=2368,aY=2881,cf=3907,bL=496,cl=247,c4=505,bv=762,aH=763,bu=764,ae=1791,bt=1,cn=2,bR=3,cr=4,a1=5,cg=6,ao=7,aw=8,a5=9,b4=10,cq=11,bP=12,r=13,bA=14,bZ=15,c0=16,aU=17,aC=18,bo=19,bK=20,aQ=21,bj=22,ce=23,cs=24,at=25,by=26,bd=27,b5=28,bp=29,c5=30,bw=31,ab=32,aj=33,cc=34,am=35,bc=37,a8=38,b8=42,a9=256,bT=258,az=512,bl=513,b0=514,bW=2049,c7=3073,aq=4096,bf=4097,bz=4098,ad=4110,bO=4111,aM=4112,bD=4115,an=4116,ax=4117,al=4118,G=4119,bq=4120,bF=4121,v=4122,u=4568,A=UDOC.B;
function N(z,s){z=new Uint8Array(z);var i=0,W={fill:!1,strk:!1,bb:[0,0,1,1],lbb:[0,0,1,1],scl:1,fnt:{nam:"Arial",hgh:25,und:!1,orn:0,chrst:0},tclr:[0,0,0],talg:0},o=A.readShort,m=A.readUshort,C=A.readUint,aN=C(z,0),a3=0;
if(aN==2596720087){i=6;var av=o(z,i+8);W.scl=120/av;for(var b1=0;b1<4;b1++){W.bb[b1]=Math.round(o(z,i)*W.scl);
i+=2}i+=2;i+=6}s.StartPage(W.bb[0],W.bb[1],W.bb[2],W.bb[3]);var j=UDOC.getState(W.bb),as=m(z,i);i+=2;
var aG=m(z,i);i+=2;var c6=m(z,i);i+=2;var bn=C(z,i);i+=4;var ag=m(z,i);i+=2;var c3=C(z,i);i+=4;var ag=m(z,i);
i+=2;var _=[];while(!0){var br=C(z,i)<<1,ch=null;i+=4;var a6=m(z,i);i+=2;var T=a6,Z=i;if(!1){}else if(T==V)break;
else if(T==L){var bI=m(z,i);Z+=2;var bN=bI;console.log(T,bN)}else if(T==J||T==K||T==M){}else if(T==bh){var cb=m(z,Z);
Z+=2;var b9=_[cb];if(b9.t=="br"){W.fill=b9.stl!=1;if(b9.stl==0){}else if(b9.stl==1){}else throw b9.stl+" e";
j.colr=b9.clr}else if(b9.t=="pn"){var aL=b9.stl&7;W.strk=aL!=5;if(aL==0||aL==6)j.lwidth=b9.px;else if(aL==5){}else throw aL+" e";
if((b9.stl&4096)!=0)j.ljoin=2;else if((b9.stl&8192)!=0)j.ljoin=0;else j.ljoin=1;j.COLR=b9.clr}else if(b9.t=="fn"){W.fnt=b9;
j.font.Tf=b9.nam;j.font.Tfs=Math.abs(b9.hgh);j.font.Tun=b9.und}else throw"e"}else if(T==bL){var cb=m(z,Z);
Z+=2;_[cb]=null}else if(T==k||T==b){var a7=T==k?0:2;W.lbb[a7+1]=o(z,Z);Z+=2;W.lbb[a7]=o(z,Z);Z+=2;ac(W,j)}else if(T==bu){ch={t:"br"};
ch.stl=m(z,Z);Z+=2;ch.clr=[z[Z]/255,z[Z+1]/255,z[Z+2]/255];Z+=4;ch.htc=m(z,Z);Z+=2}else if(T==bv){ch={t:"pn"};
ch.stl=m(z,Z);Z+=2;ch.px=o(z,Z);Z+=2;ch.py=o(z,Z);Z+=2;ch.clr=[z[Z]/255,z[Z+1]/255,z[Z+2]/255];Z+=4}else if(T==aH){ch={t:"fn",nam:""};
ch.hgh=o(z,Z);Z+=2;Z+=2*2;ch.orn=o(z,Z)/10;Z+=2;var c1=o(z,Z);Z+=2;ch.und=z[Z+1];Z+=2;ch.stk=z[Z];ch.chrst=z[i+1];
Z+=2;Z+=4;while(z[Z]!=0){ch.nam+=String.fromCharCode(z[Z]);Z++}if(c1>500)ch.nam+="-Bold"}else if(T==cl){ch={t:"pl"}}else if(T==x)W.tclr=[z[Z]/255,z[Z+1]/255,z[Z+2]/255];
else if(T==bm)W.talg=m(z,Z);else if(T==c){UDOC.G.moveTo(j,o(z,Z+2),o(z,Z))}else if(T==Q){if(j.pth.cmds.length==0){var a0=j.ctm.slice(0);
UDOC.M.invert(a0);var ck=UDOC.M.multPoint(a0,j.cpos);UDOC.G.moveTo(j,ck[0],ck[1])}UDOC.G.lineTo(j,o(z,Z+2),o(z,Z));
var a$=W.fill;W.fill=!1;aS(s,j,W);W.fill=a$}else if(T==t){var au=m(z,Z);Z+=2;var aE=Z;Z+=au*2;for(var b1=0;
b1<au;b1++){var aV=m(z,aE+b1*2);Z=h(z,Z,aV,j,!0)}aS(s,j,W)}else if(T==H||T==g){var aV=m(z,Z);Z+=2;Z=h(z,Z,aV,j,T==H);
var a$=W.fill;W.fill=a$&&T==H;aS(s,j,W);W.fill=a$}else if(T==ai||T==e){var aX=o(z,Z);Z+=2;var ay=o(z,Z);
Z+=2;var cw=o(z,Z);Z+=2;var ap=o(z,Z);Z+=2;if(T==ai){UDOC.G.moveTo(j,ap,cw);UDOC.G.lineTo(j,ay,cw);UDOC.G.lineTo(j,ay,aX);
UDOC.G.lineTo(j,ap,aX)}else{var bQ=(ap+ay)/2,be=(cw+aX)/2;UDOC.G.arc(j,bQ,be,(aX-cw)/2,0,2*Math.PI,!1)}UDOC.G.closePath(j);
var a$=W.fill;W.fill=!0;aS(s,j,W);W.fill=a$}else if(T==cf){var aR=C(z,Z);Z+=4;var a_=m(z,Z);Z+=2;var b7=o(z,Z);
Z+=2;var c2=o(z,Z);Z+=2;var b_=o(z,Z);Z+=2;var af=o(z,Z);Z+=2;var bY=o(z,Z);Z+=2;var aa=o(z,Z);Z+=2;
var bx=o(z,Z);Z+=2;var cj=o(z,Z);Z+=2;var ba=aK(z,Z),c9=j.ctm.slice(0);j.ctm=[1,0,0,1,0,0];UDOC.M.scale(j.ctm,aa,-bY);
UDOC.M.translate(j.ctm,cj,bx+bY);UDOC.M.concat(j.ctm,c9);s.PutImage(j,ba,c2,b7);j.ctm=c9}else if(T==bJ){var bs=o(z,Z),b2="";
Z+=2;var aA=o(z,Z);Z+=2;j.font.Tm=[1,0,0,-1,0,0];UDOC.M.rotate(j.font.Tm,W.fnt.orn*Math.PI/180);UDOC.M.translate(j.font.Tm,aA,bs);
var bH=W.talg;if((bH&6)==6)j.font.Tal=2;else if((bH&7)==0)j.font.Tal=0;else throw bH+" e";if((bH&24)==24){}else if((bH&24)==0)UDOC.M.translate(j.font.Tm,0,j.font.Tfs);
else throw"e";var a2=m(z,Z);Z+=2;var bE=m(z,Z);Z+=2;if(bE&4)Z+=8;for(var b1=0;b1<a2;b1++){var bB=z[Z+b1];
if(bB>127){b1++;bB=bB<<8|z[Z+b1]}b2+=String.fromCharCode(bB)}var c8=j.colr;j.colr=W.tclr;s.PutText(j,b2,b2.length*j.font.Tfs*.5);
j.colr=c8}else{console.log(T,br)}if(ch!=null){var cp=0;while(_[cp]!=null)cp++;_[cp]=ch}i+=br-6}s.ShowPage();
s.Done()}function aK(z,s){var i=A.readShort,W=A.readUshort,o=A.readUint,m=o(z,s),C,aN,av;s+=4;if(m==12)throw"e";
else{C=o(z,s);s+=4;aN=o(z,s);s+=4;var b1=W(z,s);s+=2;if(b1!=1)throw"e";var j=W(z,s);s+=2;if(j!=1&&j!=24&&j!=32)throw j+" e";
var as=o(z,s);s+=4;if(as!=0)throw"e";var aG=o(z,s);s+=4;var c6=o(z,s);s+=4;var bn=o(z,s);s+=4;av=o(z,s);
s+=4;var ag=o(z,s);s+=4}var c3=C*aN,_=new Uint8Array(c3*4),a3=Math.floor((C*b1*j+31&~31)/8);if(j==1)for(var br=0;
br<aN;br++){var a6=s+av*4+(aN-1-br)*a3;for(var T=0;T<C;T++){var Z=br*C+T<<2,ch=z[a6+(T>>>3)]>>>7-(T&7)&1;
_[Z]=z[s+ch*4+2];_[Z+1]=z[s+ch*4+1];_[Z+2]=z[s+ch*4+0];_[Z+3]=255}}if(j==24){for(var br=0;br<aN;br++)for(var T=0;
T<C;T++){var Z=br*C+T<<2,bI=s+(aN-1-br)*a3+T*3;_[Z]=z[bI+2];_[Z+1]=z[bI+1];_[Z+2]=z[bI+0];_[Z+3]=255}}if(j==32){for(var br=0;
br<aN;br++)for(var T=0;T<C;T++){var Z=br*C+T<<2,bI=s+(aN-1-br)*a3+T*4;_[Z]=z[bI+2];_[Z+1]=z[bI+1];_[Z+2]=z[bI+0];
_[Z+3]=z[bI+3]}}return _}function ac(z,s){var i=[1,0,0,1,0,0],W=z.lbb,o=z.bb;UDOC.M.translate(i,-W[0],-W[1]);
UDOC.M.scale(i,1/W[2],1/W[3]);UDOC.M.scale(i,o[2]-o[0],o[3]-o[1]);UDOC.M.translate(i,o[0],o[1]);s.ctm=i}function aS(z,s,i){if(i.fill)z.Fill(s,!1);
if(i.strk&&s.lwidth!=0)z.Stroke(s,!1);UDOC.G.newPath(s)}function h(z,s,i,W,o){var m=A.readShort;for(var C=0;
C<i;C++){var aN=m(z,s);s+=2;var av=m(z,s);s+=2;if(C==0)UDOC.G.moveTo(W,aN,av);else UDOC.G.lineTo(W,aN,av)}if(o)UDOC.G.closePath(W);
return s}return{Parse:N}}(),FromEMF=function(){var V=1,B=2,U=3,M=4,J=5,D=6,d=7,K=8,w=9,I=10,O=11,$=12,n=13,S=14,R=15,x=16,l=17,Q=18,c=19,f=20,y=21,P=22,q=23,H=24,g=25,p=26,k=27,b=28,ct=29,a=30,ca=31,X=32,F=33,Y=34,aJ=35,e=36,aF=37,aP=38,bV=39,bg=40,t=41,a4=42,ai=43,bi=44,aB=45,bk=46,ah=47,b6=48,bX=49,L=50,bM=51,cd=52,aD=53,bh=54,bm=55,bC=56,aI=57,E=58,bJ=59,ak=60,bU=61,aY=62,cf=63,bL=64,cl=65,c4=66,bv=67,aH=68,bu=70,ae=71,bt=72,cn=73,bR=74,cr=75,a1=76,cg=77,ao=78,aw=79,a5=80,b4=81,cq=82,bP=83,r=84,bA=85,bZ=86,c0=87,aU=88,aC=89,bo=90,bK=91,aQ=92,bj=93,ce=94,cs=95,at=96,by=97,bd=98,b5=99,bp=100,c5=101,bw=102,ab=103,aj=104,cc=105,am=106,bc=108,a8=109,b8=110,a9=111,bT=112,az=113,bl=114,b0=115,bW=116,c7=118,aq=119,bf=120,bz=121,ad=122,bO=UDOC.B;
function aM(G,bq){G=new Uint8Array(G);var bF=0,v={fill:!1,strk:!1,bb:[0,0,1,1],wbb:[0,0,1,1],fnt:{nam:"Arial",hgh:25,und:!1,orn:0},tclr:[0,0,0],talg:0},u,A=[],N=[],aK=bO.readShort,ac=bO.readUshort,aS=bO.readInt,h=bO.readUint,z=bO.readFloat,s=0;
while(!0){var i=h(G,bF),C=null,aN=0;bF+=4;var W=i,o=h(G,bF);bF+=4;var m=bF;if(!1){}else if(W==S){break}else if(W==V){v.bb=bD(G,m);
m+=16;bq.StartPage(v.bb[0],v.bb[1],v.bb[2],v.bb[3]);u=UDOC.getState(v.bb)}else if(W==F)N.push(JSON.stringify(u),JSON.stringify(v));
else if(W==Y){var av=aS(G,m);m+=4;while(av<-1){N.pop();N.pop()}v=JSON.parse(N.pop());u=JSON.parse(N.pop())}else if(W==bv){u.cpth=JSON.parse(JSON.stringify(u.pth))}else if([l,c,Q,bd,f,cr].indexOf(W)!=-1){}else if(W==E)u.mlimit=h(G,m);
else if(W==H)v.tclr=[G[m]/255,G[m+1]/255,G[m+2]/255];else if(W==P)v.talg=h(G,m);else if(W==O||W==$){if(v.vbb==null)v.vbb=[];
var b1=W==$?0:2;v.vbb[b1]=aS(G,m);m+=4;v.vbb[b1+1]=aS(G,m);m+=4;if(W==O)an(v,u)}else if(W==w||W==I){var b1=W==I?0:2;
v.wbb[b1]=aS(G,m);m+=4;v.wbb[b1+1]=aS(G,m);m+=4;if(W==w)an(v,u)}else if(W==bu){var j=h(G,m);m+=4}else if(W==aF){var as=h(G,m);
m+=4;if(as==2147483648){v.fill=!0;u.colr=[1,1,1]}else if(as==2147483653){v.fill=!1}else if(as==2147483655){v.strk=!0;
v.lwidth=1;u.COLR=[0,0,0]}else if(as==2147483656){v.strk=!1}else if(as==2147483661){}else if(as==2147483662){}else{var aG=A[as];
if(aG.t=="b"){v.fill=aG.stl!=1;if(aG.stl==0){}else if(aG.stl==1){}else throw aG.stl+" e";u.colr=aG.clr}else if(aG.t=="p"){v.strk=aG.stl!=5;
u.lwidth=aG.wid;u.COLR=aG.clr}else if(aG.t=="f"){v.fnt=aG;u.font.Tf=aG.nam;u.font.Tfs=Math.abs(aG.hgh);
u.font.Tun=aG.und}else throw"e"}}else if(W==bg){var as=h(G,m);m+=4;if(A[as]!=null)A[as]=null;else throw"e"}else if(W==bV){aN=h(G,m);
m+=4;C={t:"b"};C.stl=h(G,m);m+=4;C.clr=[G[m]/255,G[m+1]/255,G[m+2]/255];m+=4;C.htc=h(G,m);m+=4}else if(W==aP||W==cs){aN=h(G,m);
m+=4;C={t:"p"};if(W==cs){m+=16;C.stl=h(G,m);m+=4;C.wid=h(G,m);m+=4;m+=4}else{C.stl=h(G,m);m+=4;C.wid=h(G,m);
m+=4;m+=4}C.clr=[G[m]/255,G[m+1]/255,G[m+2]/255];m+=4}else if(W==cq){aN=h(G,m);m+=4;C={t:"f",nam:""};
C.hgh=aS(G,m);m+=4;m+=4*2;C.orn=aS(G,m)/10;m+=4;var c6=h(G,m);m+=4;C.und=G[m+1];C.stk=G[m+2];m+=4*2;
while(ac(G,m)!=0){C.nam+=String.fromCharCode(ac(G,m));m+=2}if(c6>500)C.nam+="-Bold"}else if(W==r){m+=16;
var bn=h(G,m),bN="";m+=4;var ag=z(G,m);m+=4;var c3=z(G,m);m+=4;var _=aS(G,m);m+=4;var a3=aS(G,m);m+=4;
var br=u.ctm.slice(0);if(bn==1)u.ctm=[1,0,0,1,0,0];u.font.Tm=[1,0,0,-1,0,0];UDOC.M.rotate(u.font.Tm,v.fnt.orn*Math.PI/180);
UDOC.M.translate(u.font.Tm,_,a3);var a6=v.talg;if((a6&6)==6)u.font.Tal=2;else if((a6&7)==0)u.font.Tal=0;
else throw a6+" e";if((a6&24)==24){}else if((a6&24)==0)UDOC.M.translate(u.font.Tm,0,u.font.Tfs);else console.log("unknown alignment",a6);
var T=h(G,m);m+=4;var Z=h(G,m);m+=4;var ch=h(G,m);m+=4;m+=16;var bI=h(G,m);m+=4;Z+=bF-8;for(var cb=0;
cb<T;cb++){var b9=ac(G,Z+cb*2);bN+=String.fromCharCode(b9)}var aL=u.colr;u.colr=v.tclr;bq.PutText(u,bN,bN.length*u.font.Tfs*.5);
u.colr=aL;u.ctm=br}else if(W==bJ){UDOC.G.newPath(u)}else if(W==ak){}else if(W==bU)UDOC.G.closePath(u);
else if(W==k){UDOC.G.moveTo(u,aS(G,m),aS(G,m+4))}else if(W==bh){if(u.pth.cmds.length==0){var a7=u.ctm.slice(0);
UDOC.M.invert(a7);var c1=UDOC.M.multPoint(a7,u.cpos);UDOC.G.moveTo(u,c1[0],c1[1])}UDOC.G.lineTo(u,aS(G,m),aS(G,m+4))}else if(W==U||W==bZ||W==M||W==c0||W==D||W==aC){m+=16;
var a0=W==U||W==bZ,ck=W==D||W==aC,a$=h(G,m);m+=4;if(!ck)UDOC.G.newPath(u);m=al(G,m,a$,u,W==bZ||W==c0||W==aC?2:4,a0,ck);
if(!ck)ax(bq,u,v,a0)}else if(W==bK){m+=16;var a0=!0,ck=!1,au=h(G,m);m+=4;m+=4;var aE=m;m+=au*4;if(!ck)UDOC.G.newPath(u);
for(var cb=0;cb<au;cb++){var aV=ac(G,aE+cb*4);m=al(G,m,aV,u,2,a0,ck)}if(!ck)ax(bq,u,v,a0)}else if(W==B||W==bA||W==J||W==aU){m+=16;
var aX=W==bA||W==aU,ay=aX?aK:aS,cw=aX?2:4,a$=h(G,m);m+=4;if(!(W==J||W==aU)){UDOC.G.moveTo(u,ay(G,m),ay(G,m+cw));
m+=2*cw;a$--}while(a$>0){UDOC.G.curveTo(u,ay(G,m),ay(G,m+cw),ay(G,m+2*cw),ay(G,m+3*cw),ay(G,m+4*cw),ay(G,m+5*cw));
m+=6*cw;a$-=3}}else if(W==ai||W==a4){UDOC.G.newPath(u);var ap=bD(G,m);if(W==ai){UDOC.G.drawRect(u,ap[0],ap[1],ap[2]-ap[0],ap[3]-ap[1])}else{var bQ=(ap[0]+ap[2])/2,be=(ap[1]+ap[3])/2;
UDOC.G.arc(u,bQ,be,(ap[2]-ap[0])/2,0,2*Math.PI,!1)}UDOC.G.closePath(u);ax(bq,u,v,!0)}else if(W==aY)bq.Fill(u,!1);
else if(W==bL)bq.Stroke(u);else if(W==cf){bq.Fill(u,!1);bq.Stroke(u)}else if(W==aJ||W==e){var aR=[];
for(var cb=0;cb<6;cb++)aR.push(z(G,m+cb*4));m+=24;if(W==aJ)u.ctm=aR;else{var bn=h(G,m);m+=4;if(bn==2){var a_=u.ctm;
u.ctm=aR;UDOC.M.concat(u.ctm,a_)}else throw"e"}}else if(W==y){var b7=h(G,m);m+=4}else if(W==b4){var ap=bD(G,m);
m+=16;var c2=aS(G,m);m+=4;var b_=aS(G,m);m+=4;var af=aS(G,m);m+=4;var bY=aS(G,m);m+=4;var aa=aS(G,m);
m+=4;var bx=aS(G,m);m+=4;var cj=h(G,m)+bF-8;m+=4;var ba=h(G,m);m+=4;var c9=h(G,m)+bF-8;m+=4;var bs=h(G,m);
m+=4;var aA=h(G,m);m+=4;if(aA!=0)throw"e";var bH=h(G,m);m+=4;var bE=aS(G,m);m+=4;var b2=aS(G,m);m+=4;
var bB=h(G,cj);cj+=4;var c8=h(G,cj);cj+=4;var cp=h(G,cj);cj+=4;if(c8!=aa||cp!=bx)throw"e";var ar=ac(G,cj);
cj+=2;var b$=ac(G,cj);cj+=2;if(b$!=1&&b$!=4&&b$!=8&&b$!=24&&b$!=32)throw b$+" e";var bG=h(G,cj);cj+=4;
if(bG!=0)throw bG+" e";var ci=h(G,cj);cj+=4;var aZ=h(G,cj);cj+=4;var bb=h(G,cj);cj+=4;var bS=h(G,cj);
cj+=4;var b3=h(G,cj);cj+=4;var cv=Math.floor((c8*ar*b$+31&~31)/8),aT=new Uint8Array(c8*cp*4);if(b$==8){for(var be=0;
be<cp;be++)for(var bQ=0;bQ<c8;bQ++){var aW=be*c8+bQ<<2,as=G[c9+(cp-1-be)*cv+bQ]<<2;aT[aW]=G[cj+as+2];
aT[aW+1]=G[cj+as+1];aT[aW+2]=G[cj+as+0];aT[aW+3]=255}}else if(b$==24){for(var be=0;be<cp;be++)for(var bQ=0;
bQ<c8;bQ++){var aW=be*c8+bQ<<2,aO=c9+(cp-1-be)*cv+bQ*3;aT[aW]=G[aO+2];aT[aW+1]=G[aO+1];aT[aW+2]=G[aO+0];
aT[aW+3]=255}}else if(b$==32){for(var be=0;be<cp;be++)for(var bQ=0;bQ<c8;bQ++){var aW=be*c8+bQ<<2,aO=c9+(cp-1-be)*cv+bQ*4;
aT[aW]=G[aO+2];aT[aW+1]=G[aO+1];aT[aW+2]=G[aO+0];aT[aW+3]=G[aO+3]}}else console.log("unsupported bit depth",b$,c8,cp);
var cm=u.ctm.slice(0);u.ctm=[1,0,0,1,0,0];UDOC.M.scale(u.ctm,bE,-b2);UDOC.M.translate(u.ctm,c2,b_+b2);
UDOC.M.concat(u.ctm,cm);bq.PutImage(u,aT,c8,cp);u.ctm=cm}else{console.log(W,o)}if(C!=null)A[aN]=C;bF+=o-8}bq.ShowPage();
bq.Done()}function bD(G,bq){var bF=[];for(var v=0;v<4;v++)bF[v]=bO.readInt(G,bq+v*4);return bF}function an(G,bq){var bF=[1,0,0,1,0,0],v=G.wbb,u=G.bb,A=G.vbb&&G.vbb.length==4?G.vbb:G.bb;
UDOC.M.translate(bF,-v[0],-v[1]);UDOC.M.scale(bF,1/v[2],1/v[3]);UDOC.M.scale(bF,A[2],A[3]);bq.ctm=bF}function ax(G,bq,bF,v){if(bF.fill&&v)G.Fill(bq,!1);
if(bF.strk&&bq.lwidth!=0)G.Stroke(bq)}function al(G,bq,bF,v,u,A,N){var aK=u==2?bO.readShort:bO.readInt;
for(var ac=0;ac<bF;ac++){var aS=aK(G,bq);bq+=u;var h=aK(G,bq);bq+=u;if(ac==0&&!N)UDOC.G.moveTo(v,aS,h);
else UDOC.G.lineTo(v,aS,h)}if(A)UDOC.G.closePath(v);return bq}return{Parse:aM}}(),FromDXF=function(){var V=function(){this.bb=[1e9,1e9,-1e9,-1e9]};
V.prototype={StartPage:function(){},PutText:function(){},PutImage:function(){},Stroke:function(K){this.checkPath(K.pth.crds)},Fill:function(K){this.checkPath(K.pth.crds)},PutText:function(K,w,I,O){var $=[0,0,I*K.font.Tfs,0,0,-K.font.Tfs,0,K.font.Tfs];
if(O){$[2]=O[0];$[5]=-O[1]}UDOC.M.multArray(K.ctm,$);UDOC.M.multArray(K.font.Tm,$);this.checkPath($)},checkPath:function(K){var w=this.bb;
for(var I=0;I<K.length;I+=2){var O=K[I],$=K[I+1];w[0]=Math.min(w[0],O);w[1]=Math.min(w[1],$);w[2]=Math.max(w[2],O);
w[3]=Math.max(w[3],$)}},ShowPage:function(){},Done:function(){}};function B(K,w){K=new Uint8Array(K);
var I=0,O=new TextDecoder().decode(K),$=O.split("\n"),x=2e3,l=100;for(var n=0;n<$.length;n++)$[n]=$[n].trim();
while($[$.length-1]=="")$.pop();var S=new V;U($,S);var R=S.bb,Q=(x-l*2)/(R[2]-R[0]),c=Math.round((R[3]-R[1])*Q+l*2),f=[0,0,x,c],y=UDOC.getState(f);
y.lwidth=1/Q;y.ctm=[Q,0,0,-Q,l-R[0]*Q,-l+R[1]*Q+c];U($,w,y,f)}function U(K,w,I,O){if(I==null){O=[0,0,1e3,1e3];
I=UDOC.getState(O)}w.StartPage(O[0],O[1],O[2],O[3]);var $={tabs:{LTYPE:{}},blocks:{}};J(K,w,I,$,0,K.length);
w.ShowPage();w.Done()}function M(K,w){if(K.startsWith("%%u")){K=K.slice(3);w.font.Tun=1}K=K.split("\\P").join("\n");
K=K.split("%%d").join("'");K=K.split("{").join("");K=K.split("}").join("");while(!0){var I=K.indexOf("\\U+");
if(I==-1)break;K=K.slice(0,I)+String.fromCharCode(parseInt(K.slice(I+3,I+7),16))+K.slice(I+7)}while(!0){var I=K.indexOf("\\"),O=K.indexOf(";");
if(I==-1||O==-1)break;var $=K.slice(I+1,O);if($.startsWith("pi"))$=" ".repeat(.5*parseFloat($.slice(2)));
else $="";K=K.slice(0,I)+$+K.slice(O+1)}return K}function J(K,w,I,O,$,n,S){var R,x,l;while($<n){var Q=parseInt(K[$++]),c=K[$++],f=[10,11,12,13,14,20,21,22,23,24,30,31,32,33,34,40,41,42,43,44,45,46,47,48,49,50,51,52,53,62,70,71,72,73,74,90,370].indexOf(Q)!=-1,y=R=="LWPOLYLINE"&&(Q==10||Q==20||Q==30)||R=="LTYPE"&&Q==49||R=="SPLINE"&&(Q==10||Q==20||Q==30||Q==40)||R=="OLE2FRAME"&&Q==310;
if(f)c=parseFloat(c);if(Q==999){}else if(c=="SECTION")S=-1;else if(c=="ENDSEC"){}else if(S==-1)S=c;else if(c=="EOF"){}else if(S=="HEADER"){}else if(S=="CLASSES"){}else if(S=="TABLES"||S=="BLOCKS"){if(Q==0){R=c;
x={};continue}if(y){if(x[Q]==null)x[Q]=[];x[Q].push(c)}else{x[Q]=c}if(K[$]!="0")continue;if(R=="LTYPE"){if(O.tabs[R][x[2]]!=null)throw"e";
O.tabs[R][x[2]]=x}else if(R=="BLOCK"){l=O.blocks[x[2]]=[$]}else if(R=="ENDBLK"){l[1]=$-2;l=null}}else if(S=="ENTITIES"){if(Q==0){R=c;
x={}}else{if(y){if(x[Q]==null)x[Q]=[];x[Q].push(c)}else{x[Q]=c}}if(K[$]!="0")continue;if(l==null){I.colr=[0,0,0];
I.ca=1;I.COLR=[0,0,0];I.dash=[];if(x[62]!=null&&x[62]!=256){var P={c0:[0,0,0],c1:[1,0,0],c2:[1,1,0],c4:[0,1,1],c5:[0,0,1],c7:[0,0,0],c8:[0,0,0],c242:[.64,0,.16],c250:[0,0,0]}["c"+x[62]];
if(P)I.COLR=P;else{I.COLR=[0,1,0];console.log(R+" "+x[62])}}if(x[6]!=null){var q=O.tabs.LTYPE[x[6]];
if(q[49]!=null){var H=q[49].slice(0);for(var g=0;g<H.length;g++)H[g]=Math.abs(H[g])*(x[48]?x[48]:1);
I.dash=H}}if(x[8]=="H")I.dash=[.1,.02];UDOC.G.newPath(I)}var p=-1/3.17;if(R=="LINE"){var k=(x[30]?x[30]:0)*p,b=(x[31]?x[31]:0)*p;
UDOC.G.moveTo(I,x[10]+k,x[20]-k);UDOC.G.lineTo(I,x[11]+b,x[21]-b);w.Stroke(I,!1)}else if(R=="POLYLINE"){l=[x,[]]}else if(R=="VERTEX"){l[1].push(x)}else if(R=="SEQEND"){if(l==null)continue;
var ct=l[0],a=l[1],ca=a.length,X=ct[70]==1?ca+1:ca;UDOC.G.moveTo(I,a[0][10],a[0][20]);for(var g=1;g<X;
g++){var F=a[g%ca][10],Y=a[g%ca][20],aJ=a[g-1][42];if(aJ==null)aJ=0;if(aJ==0)UDOC.G.lineTo(I,F,Y);else{var e=a[g-1],aF=e[10],aP=e[20],bV=F-aF,t=Y-aP,a4=-aJ*Math.PI/2,ai=.42,bi=Math.sin(a4),aB=Math.cos(a4),bk=aB*bV-bi*t,ah=bi*bV+aB*t,b6=aB*bV+bi*t,bX=-bi*bV+aB*t;
UDOC.G.curveTo(I,aF+ai*bk,aP+ai*ah,F-ai*b6,Y-ai*bX,F,Y)}}w.Stroke(I,!1);l=null}else if(R=="OLE2FRAME"){var L=57,bM=295,cd=x[310].join(""),aD=bM*L,bh=new Uint8Array(cd.length>>>1);
for(var g=0;g<bh.length;g++)bh[g]=parseInt(cd.slice(g*2,g*2+2),16);var bm=new Float64Array(bh.slice(2,2+12*8).buffer),bC=new Uint8Array(aD*4);
new Uint32Array(bC.buffer).fill(4281563135);var aI=I.ctm,E=[1,0,0,1,0,0],bJ=x[11]-x[10],ak=x[21]-x[20];
UDOC.M.scale(E,bJ,ak);UDOC.M.translate(E,x[10],x[20]);UDOC.M.concat(E,I.ctm);I.ctm=E;w.PutImage(I,bC,bM,L);
I.ctm=aI}else if(R=="INSERT"){var bU=O.blocks[x[2]],aY=I.ctm.slice(0),E=[1,0,0,1,0,0];if(x[50]!=null)UDOC.M.rotate(E,x[50]*Math.PI/180);
if(x[41]!=null)UDOC.M.scale(E,x[41],x[42]);UDOC.M.translate(E,x[10],x[20]);UDOC.M.concat(E,I.ctm);I.ctm=E;
J(K,w,I,O,bU[0],bU[1],S);I.ctm=aY}else if(R=="--VIEWPORT"){console.log(x);I.COLR=[1,0,0];UDOC.G.moveTo(I,x[10],x[20]);
UDOC.G.lineTo(I,x[10]+5,x[20]+5);w.Stroke(I,!1)}else if(R=="--DIMENSION"){var cf=x[70]&7;if(cf==0){console.log(x);
I.COLR=[0,.3,.6];var bV=0,t=0;UDOC.G.moveTo(I,x[13]+bV,x[23]+t);UDOC.G.lineTo(I,x[14]+bV,x[24]+t);w.Stroke(I,!1)}}else if(R=="3DFACE"||R=="SOLID"){var k=x[30]*p,b=x[31]*p,bL=x[32]*p,cl=x[33]*p;
UDOC.G.moveTo(I,x[10]+k,x[20]-k);UDOC.G.lineTo(I,x[11]+b,x[21]-b);UDOC.G.lineTo(I,x[12]+bL,x[22]-bL);
UDOC.G.lineTo(I,x[13]+cl,x[23]-cl);UDOC.G.closePath(I);if(R=="3DFACE"){I.colr=[Math.random(),Math.random(),Math.random()];
I.ca=.5}w.Fill(I,!1)}else if(R=="LWPOLYLINE"){for(var g=0;g<x[90];g++){var c4=g==0?UDOC.G.moveTo:UDOC.G.lineTo;
c4(I,x[10][g],x[20][g])}if(x[70]==1)UDOC.G.closePath(I);w.Stroke(I,!1)}else if(R=="CIRCLE"){UDOC.G.arc(I,x[10],x[20],x[40],0,Math.PI*2);
w.Stroke(I,!1)}else if(R=="ELLIPSE"){var bv=I.ctm.slice(0),aH=x[10],bu=x[20],bV=x[11],t=x[21],ae=Math.sqrt(bV*bV+t*t),E=[1,0,0,1,0,0];
UDOC.M.scale(E,1,x[40]);UDOC.M.rotate(E,-Math.atan2(t,bV));UDOC.M.translate(E,aH,bu);UDOC.M.concat(E,I.ctm);
I.ctm=E;UDOC.G.arc(I,0,0,ae,x[41],x[42]);w.Stroke(I,!1);I.ctm=bv}else if(R=="ARC"){UDOC.G.arc(I,x[10],x[20],x[40],x[50]*Math.PI/180,x[51]*Math.PI/180);
w.Stroke(I,!1)}else if(R=="SPLINE"){var bt=x[10],cn=x[20],bR=x[40].slice(0),cr=bt.length-1;UDOC.G.moveTo(I,bt[0],cn[0]);
if(x[71]==3&&x[73]==4){UDOC.G.curveTo(I,bt[1],cn[1],bt[2],cn[2],bt[3],cn[3])}else{var a1=-1e6,cg=1e6;
for(var g=0;g<bR.length;g++){var ao=bR[g];if(ao<cg)cg=ao;if(ao>a1)a1=ao}for(var g=0;g<bR.length;g++){bR[g]=(bR[g]-cg)/(a1-cg)}var ca=bt.length*10;
for(var aw=1;aw<ca;aw++){var a5=aw/ca,b4=D(bt,cn,x[71],bR,a5);UDOC.G.lineTo(I,b4[0],b4[1])}UDOC.G.lineTo(I,bt[bt.length-1],cn[cn.length-1])}if(x[70]&1)UDOC.G.closePath(I);
w.Stroke(I,!1)}else if(R=="--ATTDEF"||R=="ATTRIB"||R=="TEXT"||R=="MTEXT"){I.font.Tun=0;I.font.Tal=0;
I.font.Tm=[1,0,0,1,0,0];if(x[50])UDOC.M.rotate(I.font.Tm,-x[50]*Math.PI/180);UDOC.M.translate(I.font.Tm,x[10],x[20]);
I.font.Tfs=x[40];var cd=x[R=="ATTDEF"?3:1],bP=null;cd=M(cd,I);var cq=x[71]==null?0:(x[71]-1)%3;I.font.Tal=[0,2,1][cq];
if(R=="MTEXT"&&x[41]!=null&&x[41]!=0){var r=cd.length*I.font.Tfs/x[41];r=Math.max(r,cd.split("\n").length);
bP=[x[41],r*I.font.Tfs*1.5];if(cq==0){}else if(cq==2){UDOC.M.translate(I.font.Tm,-x[41],0)}else if(cq==1){UDOC.M.translate(I.font.Tm,-x[41]/2,0)}else console.log("unknown align",x)}else if(R=="MTEXT"&&x[71]!=null){if(x[71]<=3)UDOC.M.translate(I.font.Tm,0,-I.font.Tfs*.8);
else if(x[71]<=6)UDOC.M.translate(I.font.Tm,0,-I.font.Tfs*.4)}w.PutText(I,cd,cd.length*.5,bP)}else console.log("unknown command",R)}else if(S=="OBJECTS"){}else if(S=="ACDSDATA"){}else{console.log(S,Q,c);
throw S}}}function D(K,w,I,O,$){var n=0,S=0;for(var R=0;R<K.length;R++){var x=d(R,I,O,$);n+=K[R]*x;S+=w[R]*x}return[n,S]}function d(K,I,O,$){var n=new Float64Array(I+1),S,R,l=O.Length-1;
if(K==0&&$==O[0]||K==l-I-1&&$==O[l])return 1;if($<O[K]||$>=O[K+I+1])return 0;for(var Q=0;Q<=I;Q++){if($>=O[K+Q]&&$<O[K+Q+1])n[Q]=1;
else n[Q]=0}for(var c=1;c<=I;c++){if(n[0]==0)S=0;else S=($-O[K])*n[0]/(O[K+c]-O[K]);for(var Q=0;Q<I-c+1;
Q++){var f=O[K+Q+1],P=O[K+Q+c+1];if(n[Q+1]==0){n[Q]=S;S=0}else{R=n[Q+1]/(P-f);n[Q]=S+(P-$)*R;S=($-f)*R}}}return n[0]}return{Parse:B}}(),ToPDF=function(){function V(){this._res={"/Font":{},"/XObject":{},"/ExtGState":{},"/Pattern":{}};
this._xr=[null,{"/Type":"/Catalog","/Pages":{typ:"ref",ind:2}},{"/Type":"/Pages","/Kids":[],"/Count":0},this._res];
this._bnds=[];this._cont="";this._gst=B()}function B(){return{colr:"[0,0,0]",COLR:"[0,0,0]",lcap:"0",ljoin:"0",lwidth:"1",mlimit:"10",dash:"[]",doff:"0",bmode:"/Normal",CA:"1",ca:"1"}}V.prototype.StartPage=function(Q,c,f,y){this._bnds=[Q,c,f,y]};
V.prototype.Stroke=function(Q){if(Q.CA==0)return;this.setGState(Q,!0);this._cont+=" S\n"};V.prototype.Fill=function(Q,c){if(Q.ca==0)return;
this.setGState(Q,!0);this._cont+=" f\n"};function U(Q){return""+parseFloat(Q.toFixed(2))}function M(Q){return""+parseFloat(Q.toFixed(3))}function J(Q){return Math.sqrt(Math.abs(Q[0]*Q[3]-Q[1]*Q[2]))}function D(Q){var c=Q.map(U).join(" ");
if(c=="1 0 0 1 0 0")return"";return c+" cm "}function d(Q,c){if(Q.length!=c.length)return!1;for(var f=0;
f<Q.length;f++)if(Q[f]!=c[f])return!1;return!0}function K(Q){var c=[[255,216,255],[0,0,0,12,106,80,32,32],[0,0,0,0,48,0,1,0]],f=["/DCTDecode","/JPXDecode","/JBIG2Decode"];
for(var y=0;y<c.length;y++){var P=c[y],q=!0;for(var H=0;H<P.length;H++)q=q&&Q[H]==P[H];if(q)return f[y]}}V.prototype.setGState=function(Q,c){var f=this._gst,y={};
for(var P in Q)y[P]=typeof Q[P]=="string"?Q[P]:JSON.stringify(Q[P]);var q=J(Q.ctm),H=Q.dash.slice(0);
for(var g=0;g<H.length;g++)H[g]=U(H[g]*q);var p=this._cont;if(f.lcap!=y.lcap)p+=Q.lcap+" J ";if(f.ljoin!=y.ljoin)p+=Q.ljoin+" j ";
if(f.lwidth!=y.lwidth)p+=U(Q.lwidth*q)+" w ";if(f.mlimit!=y.mlimit)p+=U(Q.mlimit)+" M ";if(f.dash!=y.dash||f.doff!=y.doff)p+="["+H.join(" ")+"] "+Q.doff+" d ";
if(f.COLR!=y.COLR)p+=Q.COLR.map(M).join(" ")+" RG ";if(f.colr!=y.colr){if(Q.colr.length!=null)p+=Q.colr.map(M).join(" ")+" rg \n";
else{var k=this._res["/Pattern"],b=Q.colr,ct="/P"+(n(k)+1),a={"/ShadingType":b.typ=="lin"?2:3,"/ColorSpace":"/DeviceRGB","/Extend":[!0,!0],"/Function":I(b.grad),"/Coords":b.crds};
k[ct]={"/Type":"/Pattern","/PatternType":2,"/Matrix":b.mat,"/Shading":a};p+="/Pattern cs "+ct+" scn "}}var ca=this._res["/ExtGState"];
if(f.bmode!=y.bmode){var X=y.bmode;if(ca[X]==null)ca[X]={"/Type":"/ExtGState","/BM":Q.bmode};p+=X+" gs "}if(f.CA!=y.CA){var X="/Alpha"+Math.round(255*y.CA);
if(ca[X]==null)ca[X]={"/Type":"/ExtGState","/CA":Q.CA};p+=X+" gs "}if(f.ca!=y.ca){var X="/alpha"+Math.round(255*y.ca);
if(ca[X]==null)ca[X]={"/Type":"/ExtGState","/ca":Q.ca};p+=X+" gs "}if(c)p+=w(Q.pth);this._cont=p;this._gst=y};
function w(Q){var c=0,f="",y=U;for(var P=0;P<Q.cmds.length;P++){var q=Q.cmds[P];if(q=="M"){for(var H=0;
H<2;H++)f+=y(Q.crds[c++])+" ";f+="m "}else if(q=="L"){for(var H=0;H<2;H++)f+=y(Q.crds[c++])+" ";f+="l "}else if(q=="C"){for(var H=0;
H<6;H++)f+=y(Q.crds[c++])+" ";f+="c "}else if(q=="Z"){f+="h "}else throw q}return f}function I(Q){var c=[],f=[],y=[0,1],P=O;
if(Q.length==2)return P(Q[0][1],Q[1][1]);f.push(P(Q[0][1],Q[1][1]));for(var q=1;q<Q.length-1;q++){c.push(Q[q][0]);
f.push(P(Q[q][1],Q[q+1][1]));y.push(0,1)}return{"/FunctionType":3,"/Encode":y,"/Domain":[0,1],"/Bounds":c,"/Functions":f}}function O(Q,c){return{"/FunctionType":2,"/C0":Q,"/C1":c,"/Domain":[0,1],"/N":1}}V.prototype.PutText=function(Q,c,f,y){this.setGState(Q,!1);
var P=this.addFont(Q.font.Tf,y);this._cont+="q ";this._cont+=D(Q.ctm);this._cont+=D(Q.font.Tm);this._cont+="BT  "+P+" "+U(Q.font.Tfs)+" Tf  0 0 Td  (";
var q=[];if(y==null){var H=[128,8364,130,8218,131,402,132,8222,133,8230,134,8224,135,8225,136,710,137,8240,138,352,139,8249,140,338,142,381,145,8216,146,8217,147,8220,148,8221,149,8226,150,8211,151,8212,152,732,153,8482,154,353,155,8250,156,339,158,382,159,376];
for(var g=0;g<c.length;g++){var p=c.charCodeAt(g);if(p>255){var k=H.indexOf(p);q.push(k==-1?32:H[k-1])}else q.push(p)}}else{for(var g=0;
g<c.length;g++){var p=c.charCodeAt(g);q.push(p&255)}}q=FromPS.makeString(q);for(var g=0;g<q.length;g++)this._cont+=String.fromCharCode(q[g]);
this._cont+=") Tj  ET ";this._cont+=" Q\n"};V.prototype.PutImage=function(Q,c,f,y,P){if(c.length==f*y*4&&P==null){var H=f*y,g=new Uint8Array(H),p=255;
for(var k=0;k<H;k++){g[k]=c[(k<<2)+3];p&=c[(k<<2)+3]}if(p!=255)P=g}var b=this.addImage(c,f,y,P);this.setGState(Q,!1);
this._cont+="q "+D(Q.ctm);this._cont+=b+" Do  Q\n"};V.prototype.ShowPage=function(){R(this._xr,this._cont,this._bnds);
this._cont="";this._gst=B()};V.prototype.Print=function(Q){};V.prototype.Done=function(){var Q=this._res;
for(var c in Q)if(Object.keys(Q[c])==0)delete Q[c];this.buffer=x(this._xr)};V.prototype.addImage=function(Q,c,f,y){var P;
if(y){var H=y;if(y.length==c*f*4){H=new Uint8Array(c*f);for(var g=0;g<H.length;g++)H[g]=y[(g<<2)+1]}P=this.addImage(H,c,f,null)}var p=K(Q),k=Q;
if(Q.length==c*f*4){k=new Uint8Array(c*f*3);for(var g=0;g<Q.length;g+=4){var b=3*(g>>2);k[b]=Q[g+0];
k[b+1]=Q[g+1];k[b+2]=Q[g+2]}}var ct=this._res["/XObject"];for(var a in ct){var ca=this._xr[ct[a].ind],X=ca["/SMask"],F=X!=null?1:0,Y=P!=null?1:0;
if(!d(ca.stream,k)||F+Y==1)continue;if(F+Y==2&&!d(this._xr[X.ind].stream,H))continue;return a}var a="/I"+(n(ct)+1);
ct[a]={typ:"ref",ind:this._xr.length};var aJ={"/Type":"/XObject","/Subtype":"/Image","/BitsPerComponent":8,"/ColorSpace":Q.length==c*f||p=="/DCTDecode"&&$(Q)&&$(Q).comps==1?"/DeviceGray":"/DeviceRGB","/Height":f,"/Width":c,stream:k};
if(p!=null)aJ["/Filter"]=K(Q);if(y){aJ["/SMask"]={typ:"ref",ind:this._xr.length-1}}this._xr.push(aJ);
return a};function $(Q){var c=0;while(c<Q.length){while(Q[c]==255)c++;var f=Q[c];c++;if(f==216)continue;
if(f==217)break;if(208<=f&&f<=215)continue;if(f==1)continue;var y=(Q[c]<<8|Q[c+1])-2;c+=2;if(f==192)return{bpp:Q[c],w:Q[c+1]<<8|Q[c+2],h:Q[c+3]<<8|Q[c+4],comps:Q[c+5]};
c+=y}}function n(Q){var c;for(var f in Q)c=f;return c==null?0:parseInt(c.slice(2))}function S(Q){var c=Q.toLowerCase(),f="Helvetica Helvetica-Bold Helvetica-Oblique Helvetica-BoldOblique Times-Roman Times-Bold Times-Italic Times-BoldItalic".split(" "),y=0;
if(c.indexOf("sans")!=-1)y=0;else if(c.indexOf("serif")!=-1)y=4;var P=c.indexOf("bold")!=-1,q=c.indexOf("italic")!=-1||c.indexOf("oblique")!=-1||c.endsWith("-it");
if(P&&q)y+=3;else if(q)y+=2;else if(P)y+=1;return f[y]}V.prototype.addFont=function(Q,c){Q=S(Q);Q="/"+Q;
var f=this._res["/Font"];for(var y in f)if(f[y]["/BaseFont"]==Q)return y;var y="/F"+(n(f)+1),P={"/Type":"/Font","/Subtype":"/Type1","/BaseFont":Q,"/Encoding":"/WinAnsiEncoding"};
if(c!=null){var q="/CIDInit /ProcSet findresource begin \t12 dict begin \tbegincmap \t/CIDSystemInfo \t<<  /Registry (Adobe) \t/Ordering (UCS) \t/Supplement 0 \t>> def \t/CMapName /Adobe-Identity-UCS def \t/CMapType 2 def \t1 begincodespacerange \t<0000> <FFFF> \tendcodespacerange \t1 beginbfchar \t<0001> <200B> \tendbfchar \tendcmap \tCMapName currentdict /CMap defineresource pop \tend \tend",H=new Uint8Array(q.length);
for(var g=0;g<q.length;g++)H[g]=q.charCodeAt(g);P["/Subtype"]="/TrueType";delete P["/Encoding"];P["/FirstChar"]=0;
P["/Widths"]=[];for(var g=0;g<256;g++)P["/Widths"].push(500);P["/LastChar"]=P["/Widths"].length-1;P["/FontDescriptor"]={"/Ascent":905,"/CapHeight":1010,"/Descent":211,"/Flags":4,"/FontBBox":[-627,-376,2e3,1011],"/FontName":Q,"/ItalicAngle":0,"/StemV":80,"/Type":"/FontDescriptor","/FontFile2":{stream:new Uint8Array(c)}}}f[y]=P;
return y};function R(Q,c,f){var y=Q.length;Q[2]["/Kids"].push({typ:"ref",ind:y});Q[2]["/Count"]++;Q.push({"/Type":"/Page","/Parent":{typ:"ref",ind:2},"/Resources":{typ:"ref",ind:3},"/MediaBox":f,"/Contents":{typ:"ref",ind:y+1}});
Q.push({stream:c})}function x(Q){var c={file:new l,off:0},f=V.write,y=[];f(c,"%PDF-1.1\n");for(var P=1;
P<Q.length;P++){y.push(c.off);f(c,P+" 0 obj\n");V.writeDict(c,Q[P],0);f(c,"\nendobj\n")}var q=c.off;
f(c,"xref\n");f(c,"0 "+Q.length+"\n");f(c,"0000000000 65535 f \n");for(var P=0;P<y.length;P++){var H=y[P]+"";
while(H.length<10)H="0"+H;f(c,H+" 00000 n \n")}f(c,"trailer\n");V.writeDict(c,{"/Root":{typ:"ref",ind:1},"/Size":Q.length},0);
f(c,"\nstartxref\n"+q+"\n%%EOF\n");return c.file.data.buffer.slice(0,c.off)}V.write=function(Q,c){Q.file.req(Q.off,c.length);
for(var f=0;f<c.length;f++)Q.file.data[Q.off+f]=c.charCodeAt(f);Q.off+=c.length};V._tab="    ";V.spc=function(Q){var c="";
for(var f=0;f<Q;f++)c+=V._tab;return c};V.writeValue=function(Q,c,f){var y=V.write;if(!1){}else if(typeof c=="string")y(Q,c);
else if(typeof c=="number")y(Q,""+c);else if(typeof c=="boolean")y(Q,""+c);else if(c.typ!=null)y(Q,c.ind+" 0 R");
else if(c instanceof Array)V.writeArray(Q,c,f+1);else if(c instanceof Object)V.writeDict(Q,c,f+1);else{console.log(c);
throw"e"}};V.writeDict=function(Q,c,f){var y=V.write,P=V.spc,q=c.stream;if(q){if(typeof q=="string"){var H=new Uint8Array(q.length);
for(var g=0;g<q.length;g++)H[g]=q.charCodeAt(g);q=H}if(c["/Filter"]==null){c["/Filter"]="/FlateDecode";
q=pako.deflate(q)}}y(Q,"<<\n");for(var p in c){if(p.charAt(0)!="/")continue;y(Q,P(f+1)+p+" ");V.writeValue(Q,c[p],f);
y(Q,"\n")}if(q)y(Q,P(f+1)+"/Length "+q.length+"\n");y(Q,P(f)+">>");if(q){y(Q,P(f)+"\nstream\n");Q.file.req(Q.off,q.length);
for(var g=0;g<q.length;g++)Q.file.data[Q.off+g]=q[g];Q.off+=q.length;y(Q,P(f)+"\nendstream")}};V.writeArray=function(Q,c,f){var y=V.write;
y(Q,"[ ");for(var P=0;P<c.length;P++){V.writeValue(Q,c[P],f+1);if(P!=c.length-1)y(Q," ")}y(Q," ]")};
var l=function(){this.size=16;this.data=new Uint8Array(16)};l.prototype.req=function(Q,c){if(Q+c<=this.size)return;
var f=this.size;while(Q+c>this.size)this.size*=2;var y=new Uint8Array(this.size);for(var P=0;P<f;P++)y[P]=this.data[P];
this.data=y};return V}();function ToEMF(){this._file={file:new ToEMF.MFile,off:0};this._lstw=0;this._curx=0;
this._curh=0;this._recs=0;this._lenp=0;this._objs={};this._tabl=1;this._stkf=0;this._tclr=0;this._curt={p:-1,b:-1,t:-1};
this._inited=!1}ToEMF.prototype.StartPage=function(V,B,U,M){this._check();var J=this._file,d=ToEMF.B.writeUint,K=ToEMF.B.writeInt;
this._curh=Math.max(this._curh,M*10);if(!this._inited){this._inited=!0;this._addRec("HEADER",88);ToEMF._writeHeadBox(J,[V,B,U,M]);
J.off+=32;ToEMF.B.writeASCII(J.file,J.off," EMF");J.off+=4;d(J.file,J.off,65536);J.off+=4;this._lenp=J.off;
J.off+=4+4+4;J.off+=4+4+4;K(J.file,J.off,1440);J.off+=4;K(J.file,J.off,900);J.off+=4;K(J.file,J.off,508);
J.off+=4;K(J.file,J.off,318);J.off+=4;this._trsf([.1,0,0,.1,0,0]);this._addRec("SETBKMODE",12);d(J.file,J.off,1);
J.off+=4;this._addRec("SETTEXTALIGN",12);d(J.file,J.off,24);J.off+=4}else{this._curx+=this._lstw;ToEMF._writeHeadBox(J,[0,0,this._curx+U,Math.round(this._curh/10)])}this._lstw=U};
ToEMF.prototype.Stroke=function(V){this._draw(V,1)};ToEMF.prototype.Fill=function(V,B){this._draw(V,2)};
ToEMF.prototype.PutImage=function(V,B,U,M,J){var D=B.length;if((D&3)!=0)D+=4-(D&3);var d=[1,0,0,-1,0,1];
UDOC.M.concat(d,V.ctm);UDOC.M.scale(d,10,10);UDOC.M.scale(d,1,-1);UDOC.M.translate(d,this._curx,this._curh);
this._trsf(d);var w=this._file,I=ToEMF.B.writeUint,O=ToEMF.B.writeInt,$=ToEMF.B.writeUshort,S=8+16+14*4;
this._addRec("STRETCHDIBITS",S+40+D);w.off+=16;O(w.file,w.off,Math.round(0));w.off+=4;O(w.file,w.off,Math.round(0));
w.off+=4;w.off+=8;O(w.file,w.off,U);w.off+=4;O(w.file,w.off,M);w.off+=4;I(w.file,w.off,S);w.off+=4;I(w.file,w.off,40);
w.off+=4;I(w.file,w.off,S+40);w.off+=4;I(w.file,w.off,B.length);w.off+=4;w.off+=4;I(w.file,w.off,13369376);
w.off+=4;O(w.file,w.off,Math.round(1));w.off+=4;O(w.file,w.off,Math.round(1));w.off+=4;O(w.file,w.off,40);
w.off+=4;O(w.file,w.off,U);w.off+=4;O(w.file,w.off,M);w.off+=4;$(w.file,w.off,1);w.off+=2;$(w.file,w.off,32);
w.off+=2;O(w.file,w.off,0);w.off+=4;O(w.file,w.off,B.length);w.off+=4;O(w.file,w.off,3800);w.off+=4;
O(w.file,w.off,3800);w.off+=4;w.off+=8;w.file.req(w.off,B.length);if(B.length==U*M*4){for(var R=0;R<M;
R++)for(var x=0;x<U;x++){var l=R*U+x<<2,Q=w.off+((M-1-R)*U+x<<2);w.file.data[Q]=B[l+2];w.file.data[Q+1]=B[l+1];
w.file.data[Q+2]=B[l];w.file.data[Q+3]=B[l+3]}}else for(var c=0;c<B.length;c++)w.file.data[w.off+c]=B[c];
w.off+=D;UDOC.M.invert(d);this._trsf(d)};ToEMF.prototype.PutText=function(V,B,U){var M=B.length,R;if((M&1)==1)M++;
this._check();var J=this._file,d=ToEMF.B.writeUint,K=ToEMF.B.writeInt,w=ToEMF.B.writeUshort,I=ToEMF.B.writeFloat,O=ToEMF._color(V.colr);
if(O!=this._tclr){this._addRec("SETTEXTCOLOR",12);d(J.file,J.off,O);J.off+=4;this._tclr=O}this._setTool("f",[V.font.Tf,Math.round(V.font.Tfs*10)]);
var $=10*(V.ctm[4]+this._curx),n=this._curh-10*V.ctm[5],S=Math.abs(V.ctm[1])>.05;if(S){R=V.ctm.slice(0);
R[1]*=-1;R[2]*=-1;R[4]=$;R[5]=n;$=n=0;this._trsf(R)}var x=8+16+12+4*6+16;this._addRec("EXTTEXTOUTW",x+M*2);
J.off+=16;d(J.file,J.off,2);J.off+=4;I(J.file,J.off,31.25);J.off+=4;I(J.file,J.off,31.25);J.off+=4;K(J.file,J.off,Math.round($));
J.off+=4;K(J.file,J.off,Math.round(n));J.off+=4;d(J.file,J.off,B.length);J.off+=4;d(J.file,J.off,x);
J.off+=4;d(J.file,J.off,0);J.off+=4;J.off+=16;d(J.file,J.off,0);J.off+=4;for(var l=0;l<B.length;l++)w(J.file,J.off+l*2,B.charCodeAt(l));
J.off+=2*M;if(S){UDOC.M.invert(R);this._trsf(R)}};ToEMF.prototype.ShowPage=function(){this._check()};
ToEMF.prototype.Done=function(){this._check();var V=this._file,B=ToEMF.B.writeUint;this._addRec("EOF",20);
B(V.file,V.off,0);V.off+=4;B(V.file,V.off,16);V.off+=4;B(V.file,V.off,20);V.off+=4;B(V.file,this._lenp,V.off);
B(V.file,this._lenp+4,this._recs);B(V.file,this._lenp+8,this._tabl);this.buffer=V.file.data.buffer.slice(0,V.off)};
ToEMF.prototype._check=function(){var V=this._file,B=this._stkf;if(B==0)return;if(B==1)this._addRec("STROKEPATH",24);
if(B==2)this._addRec("FILLPATH",24);if(B==3)this._addRec("STROKEANDFILLPATH",24);V.off+=16;this._stkf=0};
ToEMF.prototype._addRec=function(V,B){var U=this._file,M=ToEMF.B.writeUint;this._recs++;M(U.file,U.off,ToEMF.C["EMR_"+V]);
U.off+=4;M(U.file,U.off,B);U.off+=4};ToEMF.prototype._trsf=function(V){var B=this._file,U=ToEMF.B.writeInt;
this._addRec("MODIFYWORLDTRANSFORM",36);for(var M=0;M<V.length;M++){ToEMF.B.writeFloat(B.file,B.off,V[M]);
B.off+=4}U(B.file,B.off,2);B.off+=4};ToEMF._writeHeadBox=function(V,B){var U=V.off;V.off=8;ToEMF._writeBox(V,B);
var M=1/72*25.4*100;ToEMF._writeBox(V,[0,0,Math.round((B[2]-B[0])*M),Math.round((B[3]-B[1])*M)]);V.off=U};
ToEMF._writeBox=function(V,B){for(var U=0;U<4;U++){ToEMF.B.writeInt(V.file,V.off,B[U]);V.off+=4}};ToEMF.prototype._draw=function(V,B){var U=this._file,M=ToEMF.B.writeUint,J=ToEMF.B.writeInt,d=V.pth,K=JSON.stringify(d);
if(this._cpth!=K)this._check();if(B==1)this._setTool("p",[V.COLR,V.lwidth,V.ljoin]);else this._setTool("b",[V.colr]);
if(this._cpth==K){this._stkf+=B}else{var w={M:["MOVETOEX",1],L:["LINETO",1],C:["POLYBEZIERTO",3],Z:["CLOSEFIGURE",0]},I=0,O=d.cmds.length;
this._addRec("BEGINPATH",8);for(var $=0;$<O;$++){var n=d.cmds[$],S=w[n],Q=1;if(S==null)throw n+" e";
var R=S[1]*2,x=S[0],l=8+4*R;while(!0){if($+Q<O&&d.cmds[$+Q]==n)Q++;else break}var c=n=="C"||n=="L"&&Q>1;
if(c){R*=Q;if(n=="L")x="POLYLINETO";l=8+20+4*R}this._addRec(x,l);if(c){U.off+=16;M(U.file,U.off,Q*S[1]);
U.off+=4;$+=Q-1}for(var f=0;f<R;f+=2){J(U.file,U.off,Math.round(10*(d.crds[I]+this._curx)));U.off+=4;
I++;J(U.file,U.off,Math.round(this._curh-10*d.crds[I]));U.off+=4;I++}}this._addRec("ENDPATH",8);this._cpth=K;
this._stkf=B}};ToEMF.prototype._setTool=function(V,B){var U=this._file,M=ToEMF.B.writeUint,J=ToEMF.B.writeInt,d=V+JSON.stringify(B),K=this._objs[d];
if(K==null){K=this._objs[d]=this._tabl;this._tabl++;if(V=="b")this._addRec("CREATEBRUSHINDIRECT",24);
if(V=="p")this._addRec("CREATEPEN",28);if(V=="f")this._addRec("EXTCREATEFONTINDIRECTW",104);M(U.file,U.off,K);
U.off+=4;if(V=="b"||V=="p"){if(V=="p"){M(U.file,U.off,0);U.off+=4;var w=Math.round(B[1]*10);M(U.file,U.off,w);
U.off+=4;M(U.file,U.off,w);U.off+=4}else{M(U.file,U.off,0);U.off+=4}M(U.file,U.off,ToEMF._color(B[0]));
U.off+=4;if(V=="b"){M(U.file,U.off,0);U.off+=4}}if(V=="f"){var I=B[0],O=I.toLowerCase().indexOf("bold")!=-1;
if(I.endsWith("-Bold"))I=I.slice(0,I.length-5);J(U.file,U.off,-B[1]);U.off+=4;U.off+=12;M(U.file,U.off,O?700:400);
U.off+=4;M(U.file,U.off,0);U.off+=4;M(U.file,U.off,262151);U.off+=4;for(var $=0;$<I.length;$++)ToEMF.B.writeUshort(U.file,U.off+$*2,I.charCodeAt($));
U.off+=64}}if(this._curt[V]!=K){this._addRec("SELECTOBJECT",12);M(U.file,U.off,K);U.off+=4;this._curt[V]=K}};
ToEMF._color=function(V){var B=Math.round(V[0]*255),U=Math.round(V[1]*255),M=Math.round(V[2]*255);return M<<16|U<<8|B<<0};
ToEMF.B=function(){var V=new Uint8Array(4),B=V.buffer,U=new Int16Array(B),M=new Uint16Array(B),J=new Int32Array(B),D=new Uint32Array(B),d=new Float32Array(B);
return{writeShort:function(K,w,I){U[0]=I;K.req(w,2);var O=K.data;O[w]=V[0];O[w+1]=V[1]},writeUshort:function(K,w,I){M[0]=I;
K.req(w,2);var O=K.data;O[w]=V[0];O[w+1]=V[1]},writeInt:function(K,w,I){J[0]=I;K.req(w,4);var O=K.data;
O[w]=V[0];O[w+1]=V[1];O[w+2]=V[2];O[w+3]=V[3]},writeUint:function(K,w,I){D[0]=I;K.req(w,4);var O=K.data;
O[w]=V[0];O[w+1]=V[1];O[w+2]=V[2];O[w+3]=V[3]},writeFloat:function(K,w,I){d[0]=I;K.req(w,4);var O=K.data;
O[w]=V[0];O[w+1]=V[1];O[w+2]=V[2];O[w+3]=V[3]},writeASCII:function(K,w,I){K.req(w,I.length);for(var O=0;
O<I.length;O++)K.data[w+O]=I.charCodeAt(O)}}}();ToEMF.MFile=function(){this.size=16;this.data=new Uint8Array(16)};
ToEMF.MFile.prototype.req=function(V,B){if(V+B<=this.size)return;var U=this.size;while(V+B>this.size)this.size*=2;
var M=new Uint8Array(this.size);for(var J=0;J<U;J++)M[J]=this.data[J];this.data=M};ToEMF.C={EMR_HEADER:1,EMR_POLYBEZIER:2,EMR_POLYGON:3,EMR_POLYLINE:4,EMR_POLYBEZIERTO:5,EMR_POLYLINETO:6,EMR_POLYPOLYLINE:7,EMR_POLYPOLYGON:8,EMR_SETWINDOWEXTEX:9,EMR_SETWINDOWORGEX:10,EMR_SETVIEWPORTEXTEX:11,EMR_SETVIEWPORTORGEX:12,EMR_SETBRUSHORGEX:13,EMR_EOF:14,EMR_SETPIXELV:15,EMR_SETMAPPERFLAGS:16,EMR_SETMAPMODE:17,EMR_SETBKMODE:18,EMR_SETPOLYFILLMODE:19,EMR_SETROP2:20,EMR_SETSTRETCHBLTMODE:21,EMR_SETTEXTALIGN:22,EMR_SETCOLORADJUSTMENT:23,EMR_SETTEXTCOLOR:24,EMR_SETBKCOLOR:25,EMR_OFFSETCLIPRGN:26,EMR_MOVETOEX:27,EMR_SETMETARGN:28,EMR_EXCLUDECLIPRECT:29,EMR_INTERSECTCLIPRECT:30,EMR_SCALEVIEWPORTEXTEX:31,EMR_SCALEWINDOWEXTEX:32,EMR_SAVEDC:33,EMR_RESTOREDC:34,EMR_SETWORLDTRANSFORM:35,EMR_MODIFYWORLDTRANSFORM:36,EMR_SELECTOBJECT:37,EMR_CREATEPEN:38,EMR_CREATEBRUSHINDIRECT:39,EMR_DELETEOBJECT:40,EMR_ANGLEARC:41,EMR_ELLIPSE:42,EMR_RECTANGLE:43,EMR_ROUNDRECT:44,EMR_ARC:45,EMR_CHORD:46,EMR_PIE:47,EMR_SELECTPALETTE:48,EMR_CREATEPALETTE:49,EMR_SETPALETTEENTRIES:50,EMR_RESIZEPALETTE:51,EMR_REALIZEPALETTE:52,EMR_EXTFLOODFILL:53,EMR_LINETO:54,EMR_ARCTO:55,EMR_POLYDRAW:56,EMR_SETARCDIRECTION:57,EMR_SETMITERLIMIT:58,EMR_BEGINPATH:59,EMR_ENDPATH:60,EMR_CLOSEFIGURE:61,EMR_FILLPATH:62,EMR_STROKEANDFILLPATH:63,EMR_STROKEPATH:64,EMR_FLATTENPATH:65,EMR_WIDENPATH:66,EMR_SELECTCLIPPATH:67,EMR_ABORTPATH:68,EMR_COMMENT:70,EMR_FILLRGN:71,EMR_FRAMERGN:72,EMR_INVERTRGN:73,EMR_PAINTRGN:74,EMR_EXTSELECTCLIPRGN:75,EMR_BITBLT:76,EMR_STRETCHBLT:77,EMR_MASKBLT:78,EMR_PLGBLT:79,EMR_SETDIBITSTODEVICE:80,EMR_STRETCHDIBITS:81,EMR_EXTCREATEFONTINDIRECTW:82,EMR_EXTTEXTOUTA:83,EMR_EXTTEXTOUTW:84,EMR_POLYBEZIER16:85,EMR_POLYGON16:86,EMR_POLYLINE16:87,EMR_POLYBEZIERTO16:88,EMR_POLYLINETO16:89,EMR_POLYPOLYLINE16:90,EMR_POLYPOLYGON16:91,EMR_POLYDRAW16:92,EMR_CREATEMONOBRUSH:93,EMR_CREATEDIBPATTERNBRUSHPT:94,EMR_EXTCREATEPEN:95,EMR_POLYTEXTOUTA:96,EMR_POLYTEXTOUTW:97,EMR_SETICMMODE:98,EMR_CREATECOLORSPACE:99,EMR_SETCOLORSPACE:100,EMR_DELETECOLORSPACE:101,EMR_GLSRECORD:102,EMR_GLSBOUNDEDRECORD:103,EMR_PIXELFORMAT:104,EMR_DRAWESCAPE:105,EMR_EXTESCAPE:106,EMR_SMALLTEXTOUT:108,EMR_FORCEUFIMAPPING:109,EMR_NAMEDESCAPE:110,EMR_COLORCORRECTPALETTE:111,EMR_SETICMPROFILEA:112,EMR_SETICMPROFILEW:113,EMR_ALPHABLEND:114,EMR_SETLAYOUT:115,EMR_TRANSPARENTBLT:116,EMR_GRADIENTFILL:118,EMR_SETLINKEDUFIS:119,EMR_SETTEXTJUSTIFICATION:120,EMR_COLORMATCHTOTARGETW:121,EMR_CREATECOLORSPACEW:122};
ToEMF.K=[];(function(){var V,B,U;V=ToEMF.C;B=ToEMF.K;U=4;for(var M in V)B[V[M]]=M.slice(U)}());var ToDXF=function(){var V;
function B(){this.buffer=null}B.prototype.StartPage=function(){if(V==null)V=[0,"SECTION",2,"ENTITIES"]};
B.prototype.ShowPage=function(){};B.prototype.Done=function(){V.push(0,"ENDSEC",0,"EOF","");var U=V.join("\n"),M=new Uint8Array(U.length);
this.buffer=M.buffer;for(var J=0;J<U.length;J++)M[J]=U.charCodeAt(J);V=null};B.prototype.PutImage=function(){};
B.prototype.PutText=function(U,M,J){while(M.endsWith("\n"))M=M.slice(0,M.length-1);V.push(0,"MTEXT");
V.push(40,U.font.Tfs);V.push(10,U.ctm[4],20,U.ctm[5]);V.push(1,M)};B.prototype.Fill=function(){};B.prototype.Stroke=function(U){var M=U.pth.cmds,J=U.pth.crds,D=0,d=0,K=0,w=0,I=0;
for(var O=0;O<M.length;O++){var $=M[O];if($=="M"){K=J[I++];w=J[I++];D=K;d=w}else if($=="L"||$=="Z"){if($=="Z"&&K==D&&w==d)continue;
V.push(0,"LINE",10,K,20,w);if($=="L"){K=J[I++];w=J[I++]}else{K=D;w=d}V.push(11,K,21,w)}else if($=="C"){V.push(0,"SPLINE");
V.push(210,0,220,0,230,0);V.push(70,8,71,3,72,8,73,4,74,0,42,0,43,0);for(var n=0;n<8;n++)V.push(40,n<4?0:1);
V.push(10,K,20,w);for(var n=0;n<3;n++){K=J[I++];w=J[I++];V.push(10,K,20,w)}}}};return B}()/* pako 1.0.5 nodeca/pako */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.pako=t()}}(function(){return function t(e,a,i){function n(s,o){if(!a[s]){if(!e[s]){var l="function"==typeof require&&require;if(!o&&l)return l(s,!0);if(r)return r(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var d=a[s]={exports:{}};e[s][0].call(d.exports,function(t){var a=e[s][1][t];return n(a?a:t)},d,d.exports,t,e,a,i)}return a[s].exports}for(var r="function"==typeof require&&require,s=0;s<i.length;s++)n(i[s]);return n}({1:[function(t,e,a){"use strict";function i(t){if(!(this instanceof i))return new i(t);this.options=l.assign({level:w,method:v,chunkSize:16384,windowBits:15,memLevel:8,strategy:p,to:""},t||{});var e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var a=o.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==b)throw new Error(d[a]);if(e.header&&o.deflateSetHeader(this.strm,e.header),e.dictionary){var n;if(n="string"==typeof e.dictionary?h.string2buf(e.dictionary):"[object ArrayBuffer]"===_.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=o.deflateSetDictionary(this.strm,n),a!==b)throw new Error(d[a]);this._dict_set=!0}}function n(t,e){var a=new i(e);if(a.push(t,!0),a.err)throw a.msg||d[a.err];return a.result}function r(t,e){return e=e||{},e.raw=!0,n(t,e)}function s(t,e){return e=e||{},e.gzip=!0,n(t,e)}var o=t("./zlib/deflate"),l=t("./utils/common"),h=t("./utils/strings"),d=t("./zlib/messages"),f=t("./zlib/zstream"),_=Object.prototype.toString,u=0,c=4,b=0,g=1,m=2,w=-1,p=0,v=8;i.prototype.push=function(t,e){var a,i,n=this.strm,r=this.options.chunkSize;if(this.ended)return!1;i=e===~~e?e:e===!0?c:u,"string"==typeof t?n.input=h.string2buf(t):"[object ArrayBuffer]"===_.call(t)?n.input=new Uint8Array(t):n.input=t,n.next_in=0,n.avail_in=n.input.length;do{if(0===n.avail_out&&(n.output=new l.Buf8(r),n.next_out=0,n.avail_out=r),a=o.deflate(n,i),a!==g&&a!==b)return this.onEnd(a),this.ended=!0,!1;0!==n.avail_out&&(0!==n.avail_in||i!==c&&i!==m)||("string"===this.options.to?this.onData(h.buf2binstring(l.shrinkBuf(n.output,n.next_out))):this.onData(l.shrinkBuf(n.output,n.next_out)))}while((n.avail_in>0||0===n.avail_out)&&a!==g);return i===c?(a=o.deflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===b):i!==m||(this.onEnd(b),n.avail_out=0,!0)},i.prototype.onData=function(t){this.chunks.push(t)},i.prototype.onEnd=function(t){t===b&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},a.Deflate=i,a.deflate=n,a.deflateRaw=r,a.gzip=s},{"./utils/common":3,"./utils/strings":4,"./zlib/deflate":8,"./zlib/messages":13,"./zlib/zstream":15}],2:[function(t,e,a){"use strict";function i(t){if(!(this instanceof i))return new i(t);this.options=o.assign({chunkSize:16384,windowBits:0,to:""},t||{});var e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0===(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var a=s.inflateInit2(this.strm,e.windowBits);if(a!==h.Z_OK)throw new Error(d[a]);this.header=new _,s.inflateGetHeader(this.strm,this.header)}function n(t,e){var a=new i(e);if(a.push(t,!0),a.err)throw a.msg||d[a.err];return a.result}function r(t,e){return e=e||{},e.raw=!0,n(t,e)}var s=t("./zlib/inflate"),o=t("./utils/common"),l=t("./utils/strings"),h=t("./zlib/constants"),d=t("./zlib/messages"),f=t("./zlib/zstream"),_=t("./zlib/gzheader"),u=Object.prototype.toString;i.prototype.push=function(t,e){var a,i,n,r,d,f,_=this.strm,c=this.options.chunkSize,b=this.options.dictionary,g=!1;if(this.ended)return!1;i=e===~~e?e:e===!0?h.Z_FINISH:h.Z_NO_FLUSH,"string"==typeof t?_.input=l.binstring2buf(t):"[object ArrayBuffer]"===u.call(t)?_.input=new Uint8Array(t):_.input=t,_.next_in=0,_.avail_in=_.input.length;do{if(0===_.avail_out&&(_.output=new o.Buf8(c),_.next_out=0,_.avail_out=c),a=s.inflate(_,h.Z_NO_FLUSH),a===h.Z_NEED_DICT&&b&&(f="string"==typeof b?l.string2buf(b):"[object ArrayBuffer]"===u.call(b)?new Uint8Array(b):b,a=s.inflateSetDictionary(this.strm,f)),a===h.Z_BUF_ERROR&&g===!0&&(a=h.Z_OK,g=!1),a!==h.Z_STREAM_END&&a!==h.Z_OK)return this.onEnd(a),this.ended=!0,!1;_.next_out&&(0!==_.avail_out&&a!==h.Z_STREAM_END&&(0!==_.avail_in||i!==h.Z_FINISH&&i!==h.Z_SYNC_FLUSH)||("string"===this.options.to?(n=l.utf8border(_.output,_.next_out),r=_.next_out-n,d=l.buf2string(_.output,n),_.next_out=r,_.avail_out=c-r,r&&o.arraySet(_.output,_.output,n,r,0),this.onData(d)):this.onData(o.shrinkBuf(_.output,_.next_out)))),0===_.avail_in&&0===_.avail_out&&(g=!0)}while((_.avail_in>0||0===_.avail_out)&&a!==h.Z_STREAM_END);return a===h.Z_STREAM_END&&(i=h.Z_FINISH),i===h.Z_FINISH?(a=s.inflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===h.Z_OK):i!==h.Z_SYNC_FLUSH||(this.onEnd(h.Z_OK),_.avail_out=0,!0)},i.prototype.onData=function(t){this.chunks.push(t)},i.prototype.onEnd=function(t){t===h.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},a.Inflate=i,a.inflate=n,a.inflateRaw=r,a.ungzip=n},{"./utils/common":3,"./utils/strings":4,"./zlib/constants":6,"./zlib/gzheader":9,"./zlib/inflate":11,"./zlib/messages":13,"./zlib/zstream":15}],3:[function(t,e,a){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;a.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(var i in a)a.hasOwnProperty(i)&&(t[i]=a[i])}}return t},a.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var n={arraySet:function(t,e,a,i,n){if(e.subarray&&t.subarray)return void t.set(e.subarray(a,a+i),n);for(var r=0;r<i;r++)t[n+r]=e[a+r]},flattenChunks:function(t){var e,a,i,n,r,s;for(i=0,e=0,a=t.length;e<a;e++)i+=t[e].length;for(s=new Uint8Array(i),n=0,e=0,a=t.length;e<a;e++)r=t[e],s.set(r,n),n+=r.length;return s}},r={arraySet:function(t,e,a,i,n){for(var r=0;r<i;r++)t[n+r]=e[a+r]},flattenChunks:function(t){return[].concat.apply([],t)}};a.setTyped=function(t){t?(a.Buf8=Uint8Array,a.Buf16=Uint16Array,a.Buf32=Int32Array,a.assign(a,n)):(a.Buf8=Array,a.Buf16=Array,a.Buf32=Array,a.assign(a,r))},a.setTyped(i)},{}],4:[function(t,e,a){"use strict";function i(t,e){if(e<65537&&(t.subarray&&s||!t.subarray&&r))return String.fromCharCode.apply(null,n.shrinkBuf(t,e));for(var a="",i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a}var n=t("./common"),r=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(t){r=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){s=!1}for(var o=new n.Buf8(256),l=0;l<256;l++)o[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1;o[254]=o[254]=1,a.string2buf=function(t){var e,a,i,r,s,o=t.length,l=0;for(r=0;r<o;r++)a=t.charCodeAt(r),55296===(64512&a)&&r+1<o&&(i=t.charCodeAt(r+1),56320===(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),r++)),l+=a<128?1:a<2048?2:a<65536?3:4;for(e=new n.Buf8(l),s=0,r=0;s<l;r++)a=t.charCodeAt(r),55296===(64512&a)&&r+1<o&&(i=t.charCodeAt(r+1),56320===(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),r++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},a.buf2binstring=function(t){return i(t,t.length)},a.binstring2buf=function(t){for(var e=new n.Buf8(t.length),a=0,i=e.length;a<i;a++)e[a]=t.charCodeAt(a);return e},a.buf2string=function(t,e){var a,n,r,s,l=e||t.length,h=new Array(2*l);for(n=0,a=0;a<l;)if(r=t[a++],r<128)h[n++]=r;else if(s=o[r],s>4)h[n++]=65533,a+=s-1;else{for(r&=2===s?31:3===s?15:7;s>1&&a<l;)r=r<<6|63&t[a++],s--;s>1?h[n++]=65533:r<65536?h[n++]=r:(r-=65536,h[n++]=55296|r>>10&1023,h[n++]=56320|1023&r)}return i(h,n)},a.utf8border=function(t,e){var a;for(e=e||t.length,e>t.length&&(e=t.length),a=e-1;a>=0&&128===(192&t[a]);)a--;return a<0?e:0===a?e:a+o[t[a]]>e?a:e}},{"./common":3}],5:[function(t,e,a){"use strict";function i(t,e,a,i){for(var n=65535&t|0,r=t>>>16&65535|0,s=0;0!==a;){s=a>2e3?2e3:a,a-=s;do n=n+e[i++]|0,r=r+n|0;while(--s);n%=65521,r%=65521}return n|r<<16|0}e.exports=i},{}],6:[function(t,e,a){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],7:[function(t,e,a){"use strict";function i(){for(var t,e=[],a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e}function n(t,e,a,i){var n=r,s=i+a;t^=-1;for(var o=i;o<s;o++)t=t>>>8^n[255&(t^e[o])];return t^-1}var r=i();e.exports=n},{}],8:[function(t,e,a){"use strict";function i(t,e){return t.msg=D[e],e}function n(t){return(t<<1)-(t>4?9:0)}function r(t){for(var e=t.length;--e>=0;)t[e]=0}function s(t){var e=t.state,a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(R.arraySet(t.output,e.pending_buf,e.pending_out,a,t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))}function o(t,e){C._tr_flush_block(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,s(t.strm)}function l(t,e){t.pending_buf[t.pending++]=e}function h(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function d(t,e,a,i){var n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,R.arraySet(e,t.input,t.next_in,n,a),1===t.state.wrap?t.adler=N(t.adler,e,n,a):2===t.state.wrap&&(t.adler=O(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)}function f(t,e){var a,i,n=t.max_chain_length,r=t.strstart,s=t.prev_length,o=t.nice_match,l=t.strstart>t.w_size-ft?t.strstart-(t.w_size-ft):0,h=t.window,d=t.w_mask,f=t.prev,_=t.strstart+dt,u=h[r+s-1],c=h[r+s];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do if(a=e,h[a+s]===c&&h[a+s-1]===u&&h[a]===h[r]&&h[++a]===h[r+1]){r+=2,a++;do;while(h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&r<_);if(i=dt-(_-r),r=_-dt,i>s){if(t.match_start=e,s=i,i>=o)break;u=h[r+s-1],c=h[r+s]}}while((e=f[e&d])>l&&0!==--n);return s<=t.lookahead?s:t.lookahead}function _(t){var e,a,i,n,r,s=t.w_size;do{if(n=t.window_size-t.lookahead-t.strstart,t.strstart>=s+(s-ft)){R.arraySet(t.window,t.window,s,s,0),t.match_start-=s,t.strstart-=s,t.block_start-=s,a=t.hash_size,e=a;do i=t.head[--e],t.head[e]=i>=s?i-s:0;while(--a);a=s,e=a;do i=t.prev[--e],t.prev[e]=i>=s?i-s:0;while(--a);n+=s}if(0===t.strm.avail_in)break;if(a=d(t.strm,t.window,t.strstart+t.lookahead,n),t.lookahead+=a,t.lookahead+t.insert>=ht)for(r=t.strstart-t.insert,t.ins_h=t.window[r],t.ins_h=(t.ins_h<<t.hash_shift^t.window[r+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[r+ht-1])&t.hash_mask,t.prev[r&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=r,r++,t.insert--,!(t.lookahead+t.insert<ht)););}while(t.lookahead<ft&&0!==t.strm.avail_in)}function u(t,e){var a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(_(t),0===t.lookahead&&e===I)return vt;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var i=t.block_start+a;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,o(t,!1),0===t.strm.avail_out))return vt;if(t.strstart-t.block_start>=t.w_size-ft&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.strstart>t.block_start&&(o(t,!1),0===t.strm.avail_out)?vt:vt}function c(t,e){for(var a,i;;){if(t.lookahead<ft){if(_(t),t.lookahead<ft&&e===I)return vt;if(0===t.lookahead)break}if(a=0,t.lookahead>=ht&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ft&&(t.match_length=f(t,a)),t.match_length>=ht)if(i=C._tr_tally(t,t.strstart-t.match_start,t.match_length-ht),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=ht){t.match_length--;do t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart;while(0!==--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else i=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=t.strstart<ht-1?t.strstart:ht-1,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function b(t,e){for(var a,i,n;;){if(t.lookahead<ft){if(_(t),t.lookahead<ft&&e===I)return vt;if(0===t.lookahead)break}if(a=0,t.lookahead>=ht&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=ht-1,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ft&&(t.match_length=f(t,a),t.match_length<=5&&(t.strategy===q||t.match_length===ht&&t.strstart-t.match_start>4096)&&(t.match_length=ht-1)),t.prev_length>=ht&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-ht,i=C._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-ht),t.lookahead-=t.prev_length-1,t.prev_length-=2;do++t.strstart<=n&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart);while(0!==--t.prev_length);if(t.match_available=0,t.match_length=ht-1,t.strstart++,i&&(o(t,!1),0===t.strm.avail_out))return vt}else if(t.match_available){if(i=C._tr_tally(t,0,t.window[t.strstart-1]),i&&o(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return vt}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=C._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<ht-1?t.strstart:ht-1,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function g(t,e){for(var a,i,n,r,s=t.window;;){if(t.lookahead<=dt){if(_(t),t.lookahead<=dt&&e===I)return vt;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=ht&&t.strstart>0&&(n=t.strstart-1,i=s[n],i===s[++n]&&i===s[++n]&&i===s[++n])){r=t.strstart+dt;do;while(i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&n<r);t.match_length=dt-(r-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=ht?(a=C._tr_tally(t,1,t.match_length-ht),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function m(t,e){for(var a;;){if(0===t.lookahead&&(_(t),0===t.lookahead)){if(e===I)return vt;break}if(t.match_length=0,a=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function w(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}function p(t){t.window_size=2*t.w_size,r(t.head),t.max_lazy_match=Z[t.level].max_lazy,t.good_match=Z[t.level].good_length,t.nice_match=Z[t.level].nice_length,t.max_chain_length=Z[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=ht-1,t.match_available=0,t.ins_h=0}function v(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=V,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new R.Buf16(2*ot),this.dyn_dtree=new R.Buf16(2*(2*rt+1)),this.bl_tree=new R.Buf16(2*(2*st+1)),r(this.dyn_ltree),r(this.dyn_dtree),r(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new R.Buf16(lt+1),this.heap=new R.Buf16(2*nt+1),r(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new R.Buf16(2*nt+1),r(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function k(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=Q,e=t.state,e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?ut:wt,t.adler=2===e.wrap?0:1,e.last_flush=I,C._tr_init(e),H):i(t,K)}function y(t){var e=k(t);return e===H&&p(t.state),e}function x(t,e){return t&&t.state?2!==t.state.wrap?K:(t.state.gzhead=e,H):K}function z(t,e,a,n,r,s){if(!t)return K;var o=1;if(e===Y&&(e=6),n<0?(o=0,n=-n):n>15&&(o=2,n-=16),r<1||r>$||a!==V||n<8||n>15||e<0||e>9||s<0||s>W)return i(t,K);8===n&&(n=9);var l=new v;return t.state=l,l.strm=t,l.wrap=o,l.gzhead=null,l.w_bits=n,l.w_size=1<<l.w_bits,l.w_mask=l.w_size-1,l.hash_bits=r+7,l.hash_size=1<<l.hash_bits,l.hash_mask=l.hash_size-1,l.hash_shift=~~((l.hash_bits+ht-1)/ht),l.window=new R.Buf8(2*l.w_size),l.head=new R.Buf16(l.hash_size),l.prev=new R.Buf16(l.w_size),l.lit_bufsize=1<<r+6,l.pending_buf_size=4*l.lit_bufsize,l.pending_buf=new R.Buf8(l.pending_buf_size),l.d_buf=1*l.lit_bufsize,l.l_buf=3*l.lit_bufsize,l.level=e,l.strategy=s,l.method=a,y(t)}function B(t,e){return z(t,e,V,tt,et,J)}function S(t,e){var a,o,d,f;if(!t||!t.state||e>L||e<0)return t?i(t,K):K;if(o=t.state,!t.output||!t.input&&0!==t.avail_in||o.status===pt&&e!==F)return i(t,0===t.avail_out?P:K);if(o.strm=t,a=o.last_flush,o.last_flush=e,o.status===ut)if(2===o.wrap)t.adler=0,l(o,31),l(o,139),l(o,8),o.gzhead?(l(o,(o.gzhead.text?1:0)+(o.gzhead.hcrc?2:0)+(o.gzhead.extra?4:0)+(o.gzhead.name?8:0)+(o.gzhead.comment?16:0)),l(o,255&o.gzhead.time),l(o,o.gzhead.time>>8&255),l(o,o.gzhead.time>>16&255),l(o,o.gzhead.time>>24&255),l(o,9===o.level?2:o.strategy>=G||o.level<2?4:0),l(o,255&o.gzhead.os),o.gzhead.extra&&o.gzhead.extra.length&&(l(o,255&o.gzhead.extra.length),l(o,o.gzhead.extra.length>>8&255)),o.gzhead.hcrc&&(t.adler=O(t.adler,o.pending_buf,o.pending,0)),o.gzindex=0,o.status=ct):(l(o,0),l(o,0),l(o,0),l(o,0),l(o,0),l(o,9===o.level?2:o.strategy>=G||o.level<2?4:0),l(o,zt),o.status=wt);else{var _=V+(o.w_bits-8<<4)<<8,u=-1;u=o.strategy>=G||o.level<2?0:o.level<6?1:6===o.level?2:3,_|=u<<6,0!==o.strstart&&(_|=_t),_+=31-_%31,o.status=wt,h(o,_),0!==o.strstart&&(h(o,t.adler>>>16),h(o,65535&t.adler)),t.adler=1}if(o.status===ct)if(o.gzhead.extra){for(d=o.pending;o.gzindex<(65535&o.gzhead.extra.length)&&(o.pending!==o.pending_buf_size||(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending!==o.pending_buf_size));)l(o,255&o.gzhead.extra[o.gzindex]),o.gzindex++;o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),o.gzindex===o.gzhead.extra.length&&(o.gzindex=0,o.status=bt)}else o.status=bt;if(o.status===bt)if(o.gzhead.name){d=o.pending;do{if(o.pending===o.pending_buf_size&&(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending===o.pending_buf_size)){f=1;break}f=o.gzindex<o.gzhead.name.length?255&o.gzhead.name.charCodeAt(o.gzindex++):0,l(o,f)}while(0!==f);o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),0===f&&(o.gzindex=0,o.status=gt)}else o.status=gt;if(o.status===gt)if(o.gzhead.comment){d=o.pending;do{if(o.pending===o.pending_buf_size&&(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending===o.pending_buf_size)){f=1;break}f=o.gzindex<o.gzhead.comment.length?255&o.gzhead.comment.charCodeAt(o.gzindex++):0,l(o,f)}while(0!==f);o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),0===f&&(o.status=mt)}else o.status=mt;if(o.status===mt&&(o.gzhead.hcrc?(o.pending+2>o.pending_buf_size&&s(t),o.pending+2<=o.pending_buf_size&&(l(o,255&t.adler),l(o,t.adler>>8&255),t.adler=0,o.status=wt)):o.status=wt),0!==o.pending){if(s(t),0===t.avail_out)return o.last_flush=-1,H}else if(0===t.avail_in&&n(e)<=n(a)&&e!==F)return i(t,P);if(o.status===pt&&0!==t.avail_in)return i(t,P);if(0!==t.avail_in||0!==o.lookahead||e!==I&&o.status!==pt){var c=o.strategy===G?m(o,e):o.strategy===X?g(o,e):Z[o.level].func(o,e);if(c!==yt&&c!==xt||(o.status=pt),c===vt||c===yt)return 0===t.avail_out&&(o.last_flush=-1),H;if(c===kt&&(e===U?C._tr_align(o):e!==L&&(C._tr_stored_block(o,0,0,!1),e===T&&(r(o.head),0===o.lookahead&&(o.strstart=0,o.block_start=0,o.insert=0))),s(t),0===t.avail_out))return o.last_flush=-1,H}return e!==F?H:o.wrap<=0?j:(2===o.wrap?(l(o,255&t.adler),l(o,t.adler>>8&255),l(o,t.adler>>16&255),l(o,t.adler>>24&255),l(o,255&t.total_in),l(o,t.total_in>>8&255),l(o,t.total_in>>16&255),l(o,t.total_in>>24&255)):(h(o,t.adler>>>16),h(o,65535&t.adler)),s(t),o.wrap>0&&(o.wrap=-o.wrap),0!==o.pending?H:j)}function E(t){var e;return t&&t.state?(e=t.state.status,e!==ut&&e!==ct&&e!==bt&&e!==gt&&e!==mt&&e!==wt&&e!==pt?i(t,K):(t.state=null,e===wt?i(t,M):H)):K}function A(t,e){var a,i,n,s,o,l,h,d,f=e.length;if(!t||!t.state)return K;if(a=t.state,s=a.wrap,2===s||1===s&&a.status!==ut||a.lookahead)return K;for(1===s&&(t.adler=N(t.adler,e,f,0)),a.wrap=0,f>=a.w_size&&(0===s&&(r(a.head),a.strstart=0,a.block_start=0,a.insert=0),d=new R.Buf8(a.w_size),R.arraySet(d,e,f-a.w_size,a.w_size,0),e=d,f=a.w_size),o=t.avail_in,l=t.next_in,h=t.input,t.avail_in=f,t.next_in=0,t.input=e,_(a);a.lookahead>=ht;){i=a.strstart,n=a.lookahead-(ht-1);do a.ins_h=(a.ins_h<<a.hash_shift^a.window[i+ht-1])&a.hash_mask,a.prev[i&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=i,i++;while(--n);a.strstart=i,a.lookahead=ht-1,_(a)}return a.strstart+=a.lookahead,a.block_start=a.strstart,a.insert=a.lookahead,a.lookahead=0,a.match_length=a.prev_length=ht-1,a.match_available=0,t.next_in=l,t.input=h,t.avail_in=o,a.wrap=s,H}var Z,R=t("../utils/common"),C=t("./trees"),N=t("./adler32"),O=t("./crc32"),D=t("./messages"),I=0,U=1,T=3,F=4,L=5,H=0,j=1,K=-2,M=-3,P=-5,Y=-1,q=1,G=2,X=3,W=4,J=0,Q=2,V=8,$=9,tt=15,et=8,at=29,it=256,nt=it+1+at,rt=30,st=19,ot=2*nt+1,lt=15,ht=3,dt=258,ft=dt+ht+1,_t=32,ut=42,ct=69,bt=73,gt=91,mt=103,wt=113,pt=666,vt=1,kt=2,yt=3,xt=4,zt=3;Z=[new w(0,0,0,0,u),new w(4,4,8,4,c),new w(4,5,16,8,c),new w(4,6,32,32,c),new w(4,4,16,16,b),new w(8,16,32,32,b),new w(8,16,128,128,b),new w(8,32,128,256,b),new w(32,128,258,1024,b),new w(32,258,258,4096,b)],a.deflateInit=B,a.deflateInit2=z,a.deflateReset=y,a.deflateResetKeep=k,a.deflateSetHeader=x,a.deflate=S,a.deflateEnd=E,a.deflateSetDictionary=A,a.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":3,"./adler32":5,"./crc32":7,"./messages":13,"./trees":14}],9:[function(t,e,a){"use strict";function i(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}e.exports=i},{}],10:[function(t,e,a){"use strict";var i=30,n=12;e.exports=function(t,e){var a,r,s,o,l,h,d,f,_,u,c,b,g,m,w,p,v,k,y,x,z,B,S,E,A;a=t.state,r=t.next_in,E=t.input,s=r+(t.avail_in-5),o=t.next_out,A=t.output,l=o-(e-t.avail_out),h=o+(t.avail_out-257),d=a.dmax,f=a.wsize,_=a.whave,u=a.wnext,c=a.window,b=a.hold,g=a.bits,m=a.lencode,w=a.distcode,p=(1<<a.lenbits)-1,v=(1<<a.distbits)-1;t:do{g<15&&(b+=E[r++]<<g,g+=8,b+=E[r++]<<g,g+=8),k=m[b&p];e:for(;;){if(y=k>>>24,b>>>=y,g-=y,y=k>>>16&255,0===y)A[o++]=65535&k;else{if(!(16&y)){if(0===(64&y)){k=m[(65535&k)+(b&(1<<y)-1)];continue e}if(32&y){a.mode=n;break t}t.msg="invalid literal/length code",a.mode=i;break t}x=65535&k,y&=15,y&&(g<y&&(b+=E[r++]<<g,g+=8),x+=b&(1<<y)-1,b>>>=y,g-=y),g<15&&(b+=E[r++]<<g,g+=8,b+=E[r++]<<g,g+=8),k=w[b&v];a:for(;;){if(y=k>>>24,b>>>=y,g-=y,y=k>>>16&255,!(16&y)){if(0===(64&y)){k=w[(65535&k)+(b&(1<<y)-1)];continue a}t.msg="invalid distance code",a.mode=i;break t}if(z=65535&k,y&=15,g<y&&(b+=E[r++]<<g,g+=8,g<y&&(b+=E[r++]<<g,g+=8)),z+=b&(1<<y)-1,z>d){t.msg="invalid distance too far back",a.mode=i;break t}if(b>>>=y,g-=y,y=o-l,z>y){if(y=z-y,y>_&&a.sane){t.msg="invalid distance too far back",a.mode=i;break t}if(B=0,S=c,0===u){if(B+=f-y,y<x){x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}}else if(u<y){if(B+=f+u-y,y-=u,y<x){x-=y;do A[o++]=c[B++];while(--y);if(B=0,u<x){y=u,x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}}}else if(B+=u-y,y<x){x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}for(;x>2;)A[o++]=S[B++],A[o++]=S[B++],A[o++]=S[B++],x-=3;x&&(A[o++]=S[B++],x>1&&(A[o++]=S[B++]))}else{B=o-z;do A[o++]=A[B++],A[o++]=A[B++],A[o++]=A[B++],x-=3;while(x>2);x&&(A[o++]=A[B++],x>1&&(A[o++]=A[B++]))}break}}break}}while(r<s&&o<h);x=g>>3,r-=x,g-=x<<3,b&=(1<<g)-1,t.next_in=r,t.next_out=o,t.avail_in=r<s?5+(s-r):5-(r-s),t.avail_out=o<h?257+(h-o):257-(o-h),a.hold=b,a.bits=g}},{}],11:[function(t,e,a){"use strict";function i(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function n(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new w.Buf16(320),this.work=new w.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function r(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=T,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new w.Buf32(bt),e.distcode=e.distdyn=new w.Buf32(gt),e.sane=1,e.back=-1,Z):N}function s(t){var e;return t&&t.state?(e=t.state,e.wsize=0,e.whave=0,e.wnext=0,r(t)):N}function o(t,e){var a,i;return t&&t.state?(i=t.state,e<0?(a=0,e=-e):(a=(e>>4)+1,e<48&&(e&=15)),e&&(e<8||e>15)?N:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,s(t))):N}function l(t,e){var a,i;return t?(i=new n,t.state=i,i.window=null,a=o(t,e),a!==Z&&(t.state=null),a):N}function h(t){return l(t,wt)}function d(t){if(pt){var e;for(g=new w.Buf32(512),m=new w.Buf32(32),e=0;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(y(z,t.lens,0,288,g,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;y(B,t.lens,0,32,m,0,t.work,{bits:5}),pt=!1}t.lencode=g,t.lenbits=9,t.distcode=m,t.distbits=5}function f(t,e,a,i){var n,r=t.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new w.Buf8(r.wsize)),i>=r.wsize?(w.arraySet(r.window,e,a-r.wsize,r.wsize,0),r.wnext=0,r.whave=r.wsize):(n=r.wsize-r.wnext,n>i&&(n=i),w.arraySet(r.window,e,a-i,n,r.wnext),i-=n,i?(w.arraySet(r.window,e,a-i,i,0),r.wnext=i,r.whave=r.wsize):(r.wnext+=n,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=n))),0}function _(t,e){var a,n,r,s,o,l,h,_,u,c,b,g,m,bt,gt,mt,wt,pt,vt,kt,yt,xt,zt,Bt,St=0,Et=new w.Buf8(4),At=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return N;a=t.state,a.mode===X&&(a.mode=W),o=t.next_out,r=t.output,h=t.avail_out,s=t.next_in,n=t.input,l=t.avail_in,_=a.hold,u=a.bits,c=l,b=h,xt=Z;t:for(;;)switch(a.mode){case T:if(0===a.wrap){a.mode=W;break}for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(2&a.wrap&&35615===_){a.check=0,Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0),_=0,u=0,a.mode=F;break}if(a.flags=0,a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&_)<<8)+(_>>8))%31){t.msg="incorrect header check",a.mode=_t;break}if((15&_)!==U){t.msg="unknown compression method",a.mode=_t;break}if(_>>>=4,u-=4,yt=(15&_)+8,0===a.wbits)a.wbits=yt;else if(yt>a.wbits){t.msg="invalid window size",a.mode=_t;break}a.dmax=1<<yt,t.adler=a.check=1,a.mode=512&_?q:X,_=0,u=0;break;case F:for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(a.flags=_,(255&a.flags)!==U){t.msg="unknown compression method",a.mode=_t;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=_t;break}a.head&&(a.head.text=_>>8&1),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0,a.mode=L;case L:for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.head&&(a.head.time=_),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,Et[2]=_>>>16&255,Et[3]=_>>>24&255,a.check=v(a.check,Et,4,0)),_=0,u=0,a.mode=H;case H:for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.head&&(a.head.xflags=255&_,a.head.os=_>>8),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0,a.mode=j;case j:if(1024&a.flags){for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.length=_,a.head&&(a.head.extra_len=_),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0}else a.head&&(a.head.extra=null);a.mode=K;case K:if(1024&a.flags&&(g=a.length,g>l&&(g=l),g&&(a.head&&(yt=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Array(a.head.extra_len)),w.arraySet(a.head.extra,n,s,g,yt)),512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,a.length-=g),a.length))break t;a.length=0,a.mode=M;case M:if(2048&a.flags){if(0===l)break t;g=0;do yt=n[s+g++],a.head&&yt&&a.length<65536&&(a.head.name+=String.fromCharCode(yt));while(yt&&g<l);if(512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,yt)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=P;case P:if(4096&a.flags){if(0===l)break t;g=0;do yt=n[s+g++],a.head&&yt&&a.length<65536&&(a.head.comment+=String.fromCharCode(yt));while(yt&&g<l);if(512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,yt)break t}else a.head&&(a.head.comment=null);a.mode=Y;case Y:if(512&a.flags){for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_!==(65535&a.check)){t.msg="header crc mismatch",a.mode=_t;break}_=0,u=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=X;break;case q:for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}t.adler=a.check=i(_),_=0,u=0,a.mode=G;case G:if(0===a.havedict)return t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,C;t.adler=a.check=1,a.mode=X;case X:if(e===E||e===A)break t;case W:if(a.last){_>>>=7&u,u-=7&u,a.mode=ht;break}for(;u<3;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}switch(a.last=1&_,_>>>=1,u-=1,3&_){case 0:a.mode=J;break;case 1:if(d(a),a.mode=at,e===A){_>>>=2,u-=2;break t}break;case 2:a.mode=$;break;case 3:t.msg="invalid block type",a.mode=_t}_>>>=2,u-=2;break;case J:for(_>>>=7&u,u-=7&u;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if((65535&_)!==(_>>>16^65535)){t.msg="invalid stored block lengths",a.mode=_t;break}if(a.length=65535&_,_=0,u=0,a.mode=Q,e===A)break t;case Q:a.mode=V;case V:if(g=a.length){if(g>l&&(g=l),g>h&&(g=h),0===g)break t;w.arraySet(r,n,s,g,o),l-=g,s+=g,h-=g,o+=g,a.length-=g;break}a.mode=X;break;case $:
for(;u<14;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(a.nlen=(31&_)+257,_>>>=5,u-=5,a.ndist=(31&_)+1,_>>>=5,u-=5,a.ncode=(15&_)+4,_>>>=4,u-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=_t;break}a.have=0,a.mode=tt;case tt:for(;a.have<a.ncode;){for(;u<3;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.lens[At[a.have++]]=7&_,_>>>=3,u-=3}for(;a.have<19;)a.lens[At[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,zt={bits:a.lenbits},xt=y(x,a.lens,0,19,a.lencode,0,a.work,zt),a.lenbits=zt.bits,xt){t.msg="invalid code lengths set",a.mode=_t;break}a.have=0,a.mode=et;case et:for(;a.have<a.nlen+a.ndist;){for(;St=a.lencode[_&(1<<a.lenbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(wt<16)_>>>=gt,u-=gt,a.lens[a.have++]=wt;else{if(16===wt){for(Bt=gt+2;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_>>>=gt,u-=gt,0===a.have){t.msg="invalid bit length repeat",a.mode=_t;break}yt=a.lens[a.have-1],g=3+(3&_),_>>>=2,u-=2}else if(17===wt){for(Bt=gt+3;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=gt,u-=gt,yt=0,g=3+(7&_),_>>>=3,u-=3}else{for(Bt=gt+7;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=gt,u-=gt,yt=0,g=11+(127&_),_>>>=7,u-=7}if(a.have+g>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=_t;break}for(;g--;)a.lens[a.have++]=yt}}if(a.mode===_t)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=_t;break}if(a.lenbits=9,zt={bits:a.lenbits},xt=y(z,a.lens,0,a.nlen,a.lencode,0,a.work,zt),a.lenbits=zt.bits,xt){t.msg="invalid literal/lengths set",a.mode=_t;break}if(a.distbits=6,a.distcode=a.distdyn,zt={bits:a.distbits},xt=y(B,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,zt),a.distbits=zt.bits,xt){t.msg="invalid distances set",a.mode=_t;break}if(a.mode=at,e===A)break t;case at:a.mode=it;case it:if(l>=6&&h>=258){t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,k(t,b),o=t.next_out,r=t.output,h=t.avail_out,s=t.next_in,n=t.input,l=t.avail_in,_=a.hold,u=a.bits,a.mode===X&&(a.back=-1);break}for(a.back=0;St=a.lencode[_&(1<<a.lenbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(mt&&0===(240&mt)){for(pt=gt,vt=mt,kt=wt;St=a.lencode[kt+((_&(1<<pt+vt)-1)>>pt)],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(pt+gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=pt,u-=pt,a.back+=pt}if(_>>>=gt,u-=gt,a.back+=gt,a.length=wt,0===mt){a.mode=lt;break}if(32&mt){a.back=-1,a.mode=X;break}if(64&mt){t.msg="invalid literal/length code",a.mode=_t;break}a.extra=15&mt,a.mode=nt;case nt:if(a.extra){for(Bt=a.extra;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.length+=_&(1<<a.extra)-1,_>>>=a.extra,u-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=rt;case rt:for(;St=a.distcode[_&(1<<a.distbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(0===(240&mt)){for(pt=gt,vt=mt,kt=wt;St=a.distcode[kt+((_&(1<<pt+vt)-1)>>pt)],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(pt+gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=pt,u-=pt,a.back+=pt}if(_>>>=gt,u-=gt,a.back+=gt,64&mt){t.msg="invalid distance code",a.mode=_t;break}a.offset=wt,a.extra=15&mt,a.mode=st;case st:if(a.extra){for(Bt=a.extra;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.offset+=_&(1<<a.extra)-1,_>>>=a.extra,u-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=_t;break}a.mode=ot;case ot:if(0===h)break t;if(g=b-h,a.offset>g){if(g=a.offset-g,g>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=_t;break}g>a.wnext?(g-=a.wnext,m=a.wsize-g):m=a.wnext-g,g>a.length&&(g=a.length),bt=a.window}else bt=r,m=o-a.offset,g=a.length;g>h&&(g=h),h-=g,a.length-=g;do r[o++]=bt[m++];while(--g);0===a.length&&(a.mode=it);break;case lt:if(0===h)break t;r[o++]=a.length,h--,a.mode=it;break;case ht:if(a.wrap){for(;u<32;){if(0===l)break t;l--,_|=n[s++]<<u,u+=8}if(b-=h,t.total_out+=b,a.total+=b,b&&(t.adler=a.check=a.flags?v(a.check,r,b,o-b):p(a.check,r,b,o-b)),b=h,(a.flags?_:i(_))!==a.check){t.msg="incorrect data check",a.mode=_t;break}_=0,u=0}a.mode=dt;case dt:if(a.wrap&&a.flags){for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=_t;break}_=0,u=0}a.mode=ft;case ft:xt=R;break t;case _t:xt=O;break t;case ut:return D;case ct:default:return N}return t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,(a.wsize||b!==t.avail_out&&a.mode<_t&&(a.mode<ht||e!==S))&&f(t,t.output,t.next_out,b-t.avail_out)?(a.mode=ut,D):(c-=t.avail_in,b-=t.avail_out,t.total_in+=c,t.total_out+=b,a.total+=b,a.wrap&&b&&(t.adler=a.check=a.flags?v(a.check,r,b,t.next_out-b):p(a.check,r,b,t.next_out-b)),t.data_type=a.bits+(a.last?64:0)+(a.mode===X?128:0)+(a.mode===at||a.mode===Q?256:0),(0===c&&0===b||e===S)&&xt===Z&&(xt=I),xt)}function u(t){if(!t||!t.state)return N;var e=t.state;return e.window&&(e.window=null),t.state=null,Z}function c(t,e){var a;return t&&t.state?(a=t.state,0===(2&a.wrap)?N:(a.head=e,e.done=!1,Z)):N}function b(t,e){var a,i,n,r=e.length;return t&&t.state?(a=t.state,0!==a.wrap&&a.mode!==G?N:a.mode===G&&(i=1,i=p(i,e,r,0),i!==a.check)?O:(n=f(t,e,r,r))?(a.mode=ut,D):(a.havedict=1,Z)):N}var g,m,w=t("../utils/common"),p=t("./adler32"),v=t("./crc32"),k=t("./inffast"),y=t("./inftrees"),x=0,z=1,B=2,S=4,E=5,A=6,Z=0,R=1,C=2,N=-2,O=-3,D=-4,I=-5,U=8,T=1,F=2,L=3,H=4,j=5,K=6,M=7,P=8,Y=9,q=10,G=11,X=12,W=13,J=14,Q=15,V=16,$=17,tt=18,et=19,at=20,it=21,nt=22,rt=23,st=24,ot=25,lt=26,ht=27,dt=28,ft=29,_t=30,ut=31,ct=32,bt=852,gt=592,mt=15,wt=mt,pt=!0;a.inflateReset=s,a.inflateReset2=o,a.inflateResetKeep=r,a.inflateInit=h,a.inflateInit2=l,a.inflate=_,a.inflateEnd=u,a.inflateGetHeader=c,a.inflateSetDictionary=b,a.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":3,"./adler32":5,"./crc32":7,"./inffast":10,"./inftrees":12}],12:[function(t,e,a){"use strict";var i=t("../utils/common"),n=15,r=852,s=592,o=0,l=1,h=2,d=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],f=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],_=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],u=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(t,e,a,c,b,g,m,w){var p,v,k,y,x,z,B,S,E,A=w.bits,Z=0,R=0,C=0,N=0,O=0,D=0,I=0,U=0,T=0,F=0,L=null,H=0,j=new i.Buf16(n+1),K=new i.Buf16(n+1),M=null,P=0;for(Z=0;Z<=n;Z++)j[Z]=0;for(R=0;R<c;R++)j[e[a+R]]++;for(O=A,N=n;N>=1&&0===j[N];N--);if(O>N&&(O=N),0===N)return b[g++]=20971520,b[g++]=20971520,w.bits=1,0;for(C=1;C<N&&0===j[C];C++);for(O<C&&(O=C),U=1,Z=1;Z<=n;Z++)if(U<<=1,U-=j[Z],U<0)return-1;if(U>0&&(t===o||1!==N))return-1;for(K[1]=0,Z=1;Z<n;Z++)K[Z+1]=K[Z]+j[Z];for(R=0;R<c;R++)0!==e[a+R]&&(m[K[e[a+R]]++]=R);if(t===o?(L=M=m,z=19):t===l?(L=d,H-=257,M=f,P-=257,z=256):(L=_,M=u,z=-1),F=0,R=0,Z=C,x=g,D=O,I=0,k=-1,T=1<<O,y=T-1,t===l&&T>r||t===h&&T>s)return 1;for(;;){B=Z-I,m[R]<z?(S=0,E=m[R]):m[R]>z?(S=M[P+m[R]],E=L[H+m[R]]):(S=96,E=0),p=1<<Z-I,v=1<<D,C=v;do v-=p,b[x+(F>>I)+v]=B<<24|S<<16|E|0;while(0!==v);for(p=1<<Z-1;F&p;)p>>=1;if(0!==p?(F&=p-1,F+=p):F=0,R++,0===--j[Z]){if(Z===N)break;Z=e[a+m[R]]}if(Z>O&&(F&y)!==k){for(0===I&&(I=O),x+=C,D=Z-I,U=1<<D;D+I<N&&(U-=j[D+I],!(U<=0));)D++,U<<=1;if(T+=1<<D,t===l&&T>r||t===h&&T>s)return 1;k=F&y,b[k]=O<<24|D<<16|x-g|0}}return 0!==F&&(b[x+F]=Z-I<<24|64<<16|0),w.bits=O,0}},{"../utils/common":3}],13:[function(t,e,a){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],14:[function(t,e,a){"use strict";function i(t){for(var e=t.length;--e>=0;)t[e]=0}function n(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}function r(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}function s(t){return t<256?lt[t]:lt[256+(t>>>7)]}function o(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function l(t,e,a){t.bi_valid>W-a?(t.bi_buf|=e<<t.bi_valid&65535,o(t,t.bi_buf),t.bi_buf=e>>W-t.bi_valid,t.bi_valid+=a-W):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)}function h(t,e,a){l(t,a[2*e],a[2*e+1])}function d(t,e){var a=0;do a|=1&t,t>>>=1,a<<=1;while(--e>0);return a>>>1}function f(t){16===t.bi_valid?(o(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}function _(t,e){var a,i,n,r,s,o,l=e.dyn_tree,h=e.max_code,d=e.stat_desc.static_tree,f=e.stat_desc.has_stree,_=e.stat_desc.extra_bits,u=e.stat_desc.extra_base,c=e.stat_desc.max_length,b=0;for(r=0;r<=X;r++)t.bl_count[r]=0;for(l[2*t.heap[t.heap_max]+1]=0,a=t.heap_max+1;a<G;a++)i=t.heap[a],r=l[2*l[2*i+1]+1]+1,r>c&&(r=c,b++),l[2*i+1]=r,i>h||(t.bl_count[r]++,s=0,i>=u&&(s=_[i-u]),o=l[2*i],t.opt_len+=o*(r+s),f&&(t.static_len+=o*(d[2*i+1]+s)));if(0!==b){do{for(r=c-1;0===t.bl_count[r];)r--;t.bl_count[r]--,t.bl_count[r+1]+=2,t.bl_count[c]--,b-=2}while(b>0);for(r=c;0!==r;r--)for(i=t.bl_count[r];0!==i;)n=t.heap[--a],n>h||(l[2*n+1]!==r&&(t.opt_len+=(r-l[2*n+1])*l[2*n],l[2*n+1]=r),i--)}}function u(t,e,a){var i,n,r=new Array(X+1),s=0;for(i=1;i<=X;i++)r[i]=s=s+a[i-1]<<1;for(n=0;n<=e;n++){var o=t[2*n+1];0!==o&&(t[2*n]=d(r[o]++,o))}}function c(){var t,e,a,i,r,s=new Array(X+1);for(a=0,i=0;i<K-1;i++)for(dt[i]=a,t=0;t<1<<et[i];t++)ht[a++]=i;for(ht[a-1]=i,r=0,i=0;i<16;i++)for(ft[i]=r,t=0;t<1<<at[i];t++)lt[r++]=i;for(r>>=7;i<Y;i++)for(ft[i]=r<<7,t=0;t<1<<at[i]-7;t++)lt[256+r++]=i;for(e=0;e<=X;e++)s[e]=0;for(t=0;t<=143;)st[2*t+1]=8,t++,s[8]++;for(;t<=255;)st[2*t+1]=9,t++,s[9]++;for(;t<=279;)st[2*t+1]=7,t++,s[7]++;for(;t<=287;)st[2*t+1]=8,t++,s[8]++;for(u(st,P+1,s),t=0;t<Y;t++)ot[2*t+1]=5,ot[2*t]=d(t,5);_t=new n(st,et,M+1,P,X),ut=new n(ot,at,0,Y,X),ct=new n(new Array(0),it,0,q,J)}function b(t){var e;for(e=0;e<P;e++)t.dyn_ltree[2*e]=0;for(e=0;e<Y;e++)t.dyn_dtree[2*e]=0;for(e=0;e<q;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*Q]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function g(t){t.bi_valid>8?o(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function m(t,e,a,i){g(t),i&&(o(t,a),o(t,~a)),N.arraySet(t.pending_buf,t.window,e,a,t.pending),t.pending+=a}function w(t,e,a,i){var n=2*e,r=2*a;return t[n]<t[r]||t[n]===t[r]&&i[e]<=i[a]}function p(t,e,a){for(var i=t.heap[a],n=a<<1;n<=t.heap_len&&(n<t.heap_len&&w(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!w(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i}function v(t,e,a){var i,n,r,o,d=0;if(0!==t.last_lit)do i=t.pending_buf[t.d_buf+2*d]<<8|t.pending_buf[t.d_buf+2*d+1],n=t.pending_buf[t.l_buf+d],d++,0===i?h(t,n,e):(r=ht[n],h(t,r+M+1,e),o=et[r],0!==o&&(n-=dt[r],l(t,n,o)),i--,r=s(i),h(t,r,a),o=at[r],0!==o&&(i-=ft[r],l(t,i,o)));while(d<t.last_lit);h(t,Q,e)}function k(t,e){var a,i,n,r=e.dyn_tree,s=e.stat_desc.static_tree,o=e.stat_desc.has_stree,l=e.stat_desc.elems,h=-1;for(t.heap_len=0,t.heap_max=G,a=0;a<l;a++)0!==r[2*a]?(t.heap[++t.heap_len]=h=a,t.depth[a]=0):r[2*a+1]=0;for(;t.heap_len<2;)n=t.heap[++t.heap_len]=h<2?++h:0,r[2*n]=1,t.depth[n]=0,t.opt_len--,o&&(t.static_len-=s[2*n+1]);for(e.max_code=h,a=t.heap_len>>1;a>=1;a--)p(t,r,a);n=l;do a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],p(t,r,1),i=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=i,r[2*n]=r[2*a]+r[2*i],t.depth[n]=(t.depth[a]>=t.depth[i]?t.depth[a]:t.depth[i])+1,r[2*a+1]=r[2*i+1]=n,t.heap[1]=n++,p(t,r,1);while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],_(t,e),u(r,h,t.bl_count)}function y(t,e,a){var i,n,r=-1,s=e[1],o=0,l=7,h=4;for(0===s&&(l=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=s,s=e[2*(i+1)+1],++o<l&&n===s||(o<h?t.bl_tree[2*n]+=o:0!==n?(n!==r&&t.bl_tree[2*n]++,t.bl_tree[2*V]++):o<=10?t.bl_tree[2*$]++:t.bl_tree[2*tt]++,o=0,r=n,0===s?(l=138,h=3):n===s?(l=6,h=3):(l=7,h=4))}function x(t,e,a){var i,n,r=-1,s=e[1],o=0,d=7,f=4;for(0===s&&(d=138,f=3),i=0;i<=a;i++)if(n=s,s=e[2*(i+1)+1],!(++o<d&&n===s)){if(o<f){do h(t,n,t.bl_tree);while(0!==--o)}else 0!==n?(n!==r&&(h(t,n,t.bl_tree),o--),h(t,V,t.bl_tree),l(t,o-3,2)):o<=10?(h(t,$,t.bl_tree),l(t,o-3,3)):(h(t,tt,t.bl_tree),l(t,o-11,7));o=0,r=n,0===s?(d=138,f=3):n===s?(d=6,f=3):(d=7,f=4)}}function z(t){var e;for(y(t,t.dyn_ltree,t.l_desc.max_code),y(t,t.dyn_dtree,t.d_desc.max_code),k(t,t.bl_desc),e=q-1;e>=3&&0===t.bl_tree[2*nt[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}function B(t,e,a,i){var n;for(l(t,e-257,5),l(t,a-1,5),l(t,i-4,4),n=0;n<i;n++)l(t,t.bl_tree[2*nt[n]+1],3);x(t,t.dyn_ltree,e-1),x(t,t.dyn_dtree,a-1)}function S(t){var e,a=4093624447;for(e=0;e<=31;e++,a>>>=1)if(1&a&&0!==t.dyn_ltree[2*e])return D;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return I;for(e=32;e<M;e++)if(0!==t.dyn_ltree[2*e])return I;return D}function E(t){bt||(c(),bt=!0),t.l_desc=new r(t.dyn_ltree,_t),t.d_desc=new r(t.dyn_dtree,ut),t.bl_desc=new r(t.bl_tree,ct),t.bi_buf=0,t.bi_valid=0,b(t)}function A(t,e,a,i){l(t,(T<<1)+(i?1:0),3),m(t,e,a,!0)}function Z(t){l(t,F<<1,3),h(t,Q,st),f(t)}function R(t,e,a,i){var n,r,s=0;t.level>0?(t.strm.data_type===U&&(t.strm.data_type=S(t)),k(t,t.l_desc),k(t,t.d_desc),s=z(t),n=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=n&&(n=r)):n=r=a+5,a+4<=n&&e!==-1?A(t,e,a,i):t.strategy===O||r===n?(l(t,(F<<1)+(i?1:0),3),v(t,st,ot)):(l(t,(L<<1)+(i?1:0),3),B(t,t.l_desc.max_code+1,t.d_desc.max_code+1,s+1),v(t,t.dyn_ltree,t.dyn_dtree)),b(t),i&&g(t)}function C(t,e,a){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&a,t.last_lit++,0===e?t.dyn_ltree[2*a]++:(t.matches++,e--,t.dyn_ltree[2*(ht[a]+M+1)]++,t.dyn_dtree[2*s(e)]++),t.last_lit===t.lit_bufsize-1}var N=t("../utils/common"),O=4,D=0,I=1,U=2,T=0,F=1,L=2,H=3,j=258,K=29,M=256,P=M+1+K,Y=30,q=19,G=2*P+1,X=15,W=16,J=7,Q=256,V=16,$=17,tt=18,et=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],at=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],it=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],nt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],rt=512,st=new Array(2*(P+2));i(st);var ot=new Array(2*Y);i(ot);var lt=new Array(rt);i(lt);var ht=new Array(j-H+1);i(ht);var dt=new Array(K);i(dt);var ft=new Array(Y);i(ft);var _t,ut,ct,bt=!1;a._tr_init=E,a._tr_stored_block=A,a._tr_flush_block=R,a._tr_tally=C,a._tr_align=Z},{"../utils/common":3}],15:[function(t,e,a){"use strict";function i(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}e.exports=i},{}],"/":[function(t,e,a){"use strict";var i=t("./lib/utils/common").assign,n=t("./lib/deflate"),r=t("./lib/inflate"),s=t("./lib/zlib/constants"),o={};i(o,n,r,s),e.exports=o},{"./lib/deflate":1,"./lib/inflate":2,"./lib/utils/common":3,"./lib/zlib/constants":6}]},{},[])("/")});
/**
 * @license
 * Copyright 2015 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var PDFJS;

(function(PDFJS) {
    "use strict";
	
var JpegError = (function JpegErrorClosure() {
  function JpegError(msg) {
    this.message = 'JPEG error: ' + msg;
  }

  JpegError.prototype = new Error();
  JpegError.prototype.name = 'JpegError';
  JpegError.constructor = JpegError;

  return JpegError;
})();
	
	var JpegImage = (function JpegImageClosure() {
  // prettier-ignore
  var dctZigZag = new Uint8Array([
     0,
     1,  8,
    16,  9,  2,
     3, 10, 17, 24,
    32, 25, 18, 11, 4,
     5, 12, 19, 26, 33, 40,
    48, 41, 34, 27, 20, 13,  6,
     7, 14, 21, 28, 35, 42, 49, 56,
    57, 50, 43, 36, 29, 22, 15,
    23, 30, 37, 44, 51, 58,
    59, 52, 45, 38, 31,
    39, 46, 53, 60,
    61, 54, 47,
    55, 62,
    63
  ]);

  var dctCos1 = 4017; // cos(pi/16)
  var dctSin1 = 799; // sin(pi/16)
  var dctCos3 = 3406; // cos(3*pi/16)
  var dctSin3 = 2276; // sin(3*pi/16)
  var dctCos6 = 1567; // cos(6*pi/16)
  var dctSin6 = 3784; // sin(6*pi/16)
  var dctSqrt2 = 5793; // sqrt(2)
  var dctSqrt1d2 = 2896; // sqrt(2) / 2

  // eslint-disable-next-line no-shadow
  function JpegImage({ decodeTransform = null, colorTransform = -1 } = {}) {
    this._decodeTransform = decodeTransform;
    this._colorTransform = colorTransform;
  }

  function buildHuffmanTable(codeLengths, values) {
    var k = 0,
      code = [],
      i,
      j,
      length = 16;
    while (length > 0 && !codeLengths[length - 1]) {
      length--;
    }
    code.push({ children: [], index: 0 });
    var p = code[0],
      q;
    for (i = 0; i < length; i++) {
      for (j = 0; j < codeLengths[i]; j++) {
        p = code.pop();
        p.children[p.index] = values[k];
        while (p.index > 0) {
          p = code.pop();
        }
        p.index++;
        code.push(p);
        while (code.length <= i) {
          code.push((q = { children: [], index: 0 }));
          p.children[p.index] = q.children;
          p = q;
        }
        k++;
      }
      if (i + 1 < length) {
        // p here points to last code
        code.push((q = { children: [], index: 0 }));
        p.children[p.index] = q.children;
        p = q;
      }
    }
    return code[0].children;
  }

  function getBlockBufferOffset(component, row, col) {
    return 64 * ((component.blocksPerLine + 1) * row + col);
  }

  function decodeScan(
    data,
    offset,
    frame,
    components,
    resetInterval,
    spectralStart,
    spectralEnd,
    successivePrev,
    successive,
    parseDNLMarker = false
  ) {
    var mcusPerLine = frame.mcusPerLine;
    var progressive = frame.progressive;

    const startOffset = offset;
    let bitsData = 0,
      bitsCount = 0;

    function readBit() {
      if (bitsCount > 0) {
        bitsCount--;
        return (bitsData >> bitsCount) & 1;
      }
      bitsData = data[offset++];
      if (bitsData === 0xff) {
        var nextByte = data[offset++];
        if (nextByte) {
          if (nextByte === /* DNL = */ 0xdc && parseDNLMarker) {
            offset += 2; // Skip marker length.

            const scanLines = readUint16(data, offset);
            offset += 2;
            if (scanLines > 0 && scanLines !== frame.scanLines) {
              throw new DNLMarkerError(
                "Found DNL marker (0xFFDC) while parsing scan data",
                scanLines
              );
            }
          } else if (nextByte === /* EOI = */ 0xd9) {
            if (parseDNLMarker) {
              // NOTE: only 8-bit JPEG images are supported in this decoder.
              const maybeScanLines = blockRow * 8;
              // Heuristic to attempt to handle corrupt JPEG images with too
              // large `scanLines` parameter, by falling back to the currently
              // parsed number of scanLines when it's at least one order of
              // magnitude smaller than expected (fixes issue10880.pdf).
              if (maybeScanLines > 0 && maybeScanLines < frame.scanLines / 10) {
                throw new DNLMarkerError(
                  "Found EOI marker (0xFFD9) while parsing scan data, " +
                    "possibly caused by incorrect `scanLines` parameter",
                  maybeScanLines
                );
              }
            }
            throw new EOIMarkerError(
              "Found EOI marker (0xFFD9) while parsing scan data"
            );
          }
          throw new JpegError(
            `unexpected marker ${((bitsData << 8) | nextByte).toString(16)}`
          );
        }
        // unstuff 0
      }
      bitsCount = 7;
      return bitsData >>> 7;
    }

    function decodeHuffman(tree) {
      var node = tree;
      while (true) {
        node = node[readBit()];
        switch (typeof node) {
          case "number":
            return node;
          case "object":
            continue;
        }
        throw new JpegError("invalid huffman sequence");
      }
    }

    function receive(length) {
      var n = 0;
      while (length > 0) {
        n = (n << 1) | readBit();
        length--;
      }
      return n;
    }

    function receiveAndExtend(length) {
      if (length === 1) {
        return readBit() === 1 ? 1 : -1;
      }
      var n = receive(length);
      if (n >= 1 << (length - 1)) {
        return n;
      }
      return n + (-1 << length) + 1;
    }

    function decodeBaseline(component, blockOffset) {
      var t = decodeHuffman(component.huffmanTableDC);
      var diff = t === 0 ? 0 : receiveAndExtend(t);
      component.blockData[blockOffset] = component.pred += diff;
      var k = 1;
      while (k < 64) {
        var rs = decodeHuffman(component.huffmanTableAC);
        var s = rs & 15,
          r = rs >> 4;
        if (s === 0) {
          if (r < 15) {
            break;
          }
          k += 16;
          continue;
        }
        k += r;
        var z = dctZigZag[k];
        component.blockData[blockOffset + z] = receiveAndExtend(s);
        k++;
      }
    }

    function decodeDCFirst(component, blockOffset) {
      var t = decodeHuffman(component.huffmanTableDC);
      var diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
      component.blockData[blockOffset] = component.pred += diff;
    }

    function decodeDCSuccessive(component, blockOffset) {
      component.blockData[blockOffset] |= readBit() << successive;
    }

    var eobrun = 0;
    function decodeACFirst(component, blockOffset) {
      if (eobrun > 0) {
        eobrun--;
        return;
      }
      var k = spectralStart,
        e = spectralEnd;
      while (k <= e) {
        var rs = decodeHuffman(component.huffmanTableAC);
        var s = rs & 15,
          r = rs >> 4;
        if (s === 0) {
          if (r < 15) {
            eobrun = receive(r) + (1 << r) - 1;
            break;
          }
          k += 16;
          continue;
        }
        k += r;
        var z = dctZigZag[k];
        component.blockData[blockOffset + z] =
          receiveAndExtend(s) * (1 << successive);
        k++;
      }
    }

    var successiveACState = 0,
      successiveACNextValue;
    function decodeACSuccessive(component, blockOffset) {
      var k = spectralStart;
      var e = spectralEnd;
      var r = 0;
      var s;
      var rs;
      while (k <= e) {
        const offsetZ = blockOffset + dctZigZag[k];
        const sign = component.blockData[offsetZ] < 0 ? -1 : 1;
        switch (successiveACState) {
          case 0: // initial state
            rs = decodeHuffman(component.huffmanTableAC);
            s = rs & 15;
            r = rs >> 4;
            if (s === 0) {
              if (r < 15) {
                eobrun = receive(r) + (1 << r);
                successiveACState = 4;
              } else {
                r = 16;
                successiveACState = 1;
              }
            } else {
              if (s !== 1) {
                throw new JpegError("invalid ACn encoding");
              }
              successiveACNextValue = receiveAndExtend(s);
              successiveACState = r ? 2 : 3;
            }
            continue;
          case 1: // skipping r zero items
          case 2:
            if (component.blockData[offsetZ]) {
              component.blockData[offsetZ] += sign * (readBit() << successive);
            } else {
              r--;
              if (r === 0) {
                successiveACState = successiveACState === 2 ? 3 : 0;
              }
            }
            break;
          case 3: // set value for a zero item
            if (component.blockData[offsetZ]) {
              component.blockData[offsetZ] += sign * (readBit() << successive);
            } else {
              component.blockData[offsetZ] =
                successiveACNextValue << successive;
              successiveACState = 0;
            }
            break;
          case 4: // eob
            if (component.blockData[offsetZ]) {
              component.blockData[offsetZ] += sign * (readBit() << successive);
            }
            break;
        }
        k++;
      }
      if (successiveACState === 4) {
        eobrun--;
        if (eobrun === 0) {
          successiveACState = 0;
        }
      }
    }

    let blockRow = 0;
    function decodeMcu(component, decode, mcu, row, col) {
      var mcuRow = (mcu / mcusPerLine) | 0;
      var mcuCol = mcu % mcusPerLine;
      blockRow = mcuRow * component.v + row;
      var blockCol = mcuCol * component.h + col;
      const blockOffset = getBlockBufferOffset(component, blockRow, blockCol);
      decode(component, blockOffset);
    }

    function decodeBlock(component, decode, mcu) {
      blockRow = (mcu / component.blocksPerLine) | 0;
      var blockCol = mcu % component.blocksPerLine;
      const blockOffset = getBlockBufferOffset(component, blockRow, blockCol);
      decode(component, blockOffset);
    }

    var componentsLength = components.length;
    var component, i, j, k, n;
    var decodeFn;
    if (progressive) {
      if (spectralStart === 0) {
        decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
      } else {
        decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
      }
    } else {
      decodeFn = decodeBaseline;
    }

    var mcu = 0,
      fileMarker;
    var mcuExpected;
    if (componentsLength === 1) {
      mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
    } else {
      mcuExpected = mcusPerLine * frame.mcusPerColumn;
    }

    var h, v;
    while (mcu <= mcuExpected) {
      // reset interval stuff
      var mcuToRead = resetInterval
        ? Math.min(mcuExpected - mcu, resetInterval)
        : mcuExpected;

      // The `mcuToRead === 0` case should only occur when all of the expected
      // MCU data has been already parsed, i.e. when `mcu === mcuExpected`, but
      // some corrupt JPEG images contain more data than intended and we thus
      // want to skip over any extra RSTx markers below (fixes issue11794.pdf).
      if (mcuToRead > 0) {
        for (i = 0; i < componentsLength; i++) {
          components[i].pred = 0;
        }
        eobrun = 0;

        if (componentsLength === 1) {
          component = components[0];
          for (n = 0; n < mcuToRead; n++) {
            decodeBlock(component, decodeFn, mcu);
            mcu++;
          }
        } else {
          for (n = 0; n < mcuToRead; n++) {
            for (i = 0; i < componentsLength; i++) {
              component = components[i];
              h = component.h;
              v = component.v;
              for (j = 0; j < v; j++) {
                for (k = 0; k < h; k++) {
                  decodeMcu(component, decodeFn, mcu, j, k);
                }
              }
            }
            mcu++;
          }
        }
      }

      // find marker
      bitsCount = 0;
      fileMarker = findNextFileMarker(data, offset);
      if (!fileMarker) {
        break; // Reached the end of the image data without finding any marker.
      }
      if (fileMarker.invalid) {
        // Some bad images seem to pad Scan blocks with e.g. zero bytes, skip
        // past those to attempt to find a valid marker (fixes issue4090.pdf).
        const partialMsg = mcuToRead > 0 ? "unexpected" : "excessive";
        warn(
          `decodeScan - ${partialMsg} MCU data, current marker is: ${fileMarker.invalid}`
        );
        offset = fileMarker.offset;
      }
      if (fileMarker.marker >= 0xffd0 && fileMarker.marker <= 0xffd7) {
        // RSTx
        offset += 2;
      } else {
        break;
      }
    }

    return offset - startOffset;
  }

  // A port of poppler's IDCT method which in turn is taken from:
  //   Christoph Loeffler, Adriaan Ligtenberg, George S. Moschytz,
  //   'Practical Fast 1-D DCT Algorithms with 11 Multiplications',
  //   IEEE Intl. Conf. on Acoustics, Speech & Signal Processing, 1989,
  //   988-991.
  function quantizeAndInverse(component, blockBufferOffset, p) {
    var qt = component.quantizationTable,
      blockData = component.blockData;
    var v0, v1, v2, v3, v4, v5, v6, v7;
    var p0, p1, p2, p3, p4, p5, p6, p7;
    var t;

    if (!qt) {
      throw new JpegError("missing required Quantization Table.");
    }

    // inverse DCT on rows
    for (var row = 0; row < 64; row += 8) {
      // gather block data
      p0 = blockData[blockBufferOffset + row];
      p1 = blockData[blockBufferOffset + row + 1];
      p2 = blockData[blockBufferOffset + row + 2];
      p3 = blockData[blockBufferOffset + row + 3];
      p4 = blockData[blockBufferOffset + row + 4];
      p5 = blockData[blockBufferOffset + row + 5];
      p6 = blockData[blockBufferOffset + row + 6];
      p7 = blockData[blockBufferOffset + row + 7];

      // dequant p0
      p0 *= qt[row];

      // check for all-zero AC coefficients
      if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
        t = (dctSqrt2 * p0 + 512) >> 10;
        p[row] = t;
        p[row + 1] = t;
        p[row + 2] = t;
        p[row + 3] = t;
        p[row + 4] = t;
        p[row + 5] = t;
        p[row + 6] = t;
        p[row + 7] = t;
        continue;
      }
      // dequant p1 ... p7
      p1 *= qt[row + 1];
      p2 *= qt[row + 2];
      p3 *= qt[row + 3];
      p4 *= qt[row + 4];
      p5 *= qt[row + 5];
      p6 *= qt[row + 6];
      p7 *= qt[row + 7];

      // stage 4
      v0 = (dctSqrt2 * p0 + 128) >> 8;
      v1 = (dctSqrt2 * p4 + 128) >> 8;
      v2 = p2;
      v3 = p6;
      v4 = (dctSqrt1d2 * (p1 - p7) + 128) >> 8;
      v7 = (dctSqrt1d2 * (p1 + p7) + 128) >> 8;
      v5 = p3 << 4;
      v6 = p5 << 4;

      // stage 3
      v0 = (v0 + v1 + 1) >> 1;
      v1 = v0 - v1;
      t = (v2 * dctSin6 + v3 * dctCos6 + 128) >> 8;
      v2 = (v2 * dctCos6 - v3 * dctSin6 + 128) >> 8;
      v3 = t;
      v4 = (v4 + v6 + 1) >> 1;
      v6 = v4 - v6;
      v7 = (v7 + v5 + 1) >> 1;
      v5 = v7 - v5;

      // stage 2
      v0 = (v0 + v3 + 1) >> 1;
      v3 = v0 - v3;
      v1 = (v1 + v2 + 1) >> 1;
      v2 = v1 - v2;
      t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
      v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
      v7 = t;
      t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
      v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
      v6 = t;

      // stage 1
      p[row] = v0 + v7;
      p[row + 7] = v0 - v7;
      p[row + 1] = v1 + v6;
      p[row + 6] = v1 - v6;
      p[row + 2] = v2 + v5;
      p[row + 5] = v2 - v5;
      p[row + 3] = v3 + v4;
      p[row + 4] = v3 - v4;
    }

    // inverse DCT on columns
    for (var col = 0; col < 8; ++col) {
      p0 = p[col];
      p1 = p[col + 8];
      p2 = p[col + 16];
      p3 = p[col + 24];
      p4 = p[col + 32];
      p5 = p[col + 40];
      p6 = p[col + 48];
      p7 = p[col + 56];

      // check for all-zero AC coefficients
      if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
        t = (dctSqrt2 * p0 + 8192) >> 14;
        // Convert to 8-bit.
        if (t < -2040) {
          t = 0;
        } else if (t >= 2024) {
          t = 255;
        } else {
          t = (t + 2056) >> 4;
        }
        blockData[blockBufferOffset + col] = t;
        blockData[blockBufferOffset + col + 8] = t;
        blockData[blockBufferOffset + col + 16] = t;
        blockData[blockBufferOffset + col + 24] = t;
        blockData[blockBufferOffset + col + 32] = t;
        blockData[blockBufferOffset + col + 40] = t;
        blockData[blockBufferOffset + col + 48] = t;
        blockData[blockBufferOffset + col + 56] = t;
        continue;
      }

      // stage 4
      v0 = (dctSqrt2 * p0 + 2048) >> 12;
      v1 = (dctSqrt2 * p4 + 2048) >> 12;
      v2 = p2;
      v3 = p6;
      v4 = (dctSqrt1d2 * (p1 - p7) + 2048) >> 12;
      v7 = (dctSqrt1d2 * (p1 + p7) + 2048) >> 12;
      v5 = p3;
      v6 = p5;

      // stage 3
      // Shift v0 by 128.5 << 5 here, so we don't need to shift p0...p7 when
      // converting to UInt8 range later.
      v0 = ((v0 + v1 + 1) >> 1) + 4112;
      v1 = v0 - v1;
      t = (v2 * dctSin6 + v3 * dctCos6 + 2048) >> 12;
      v2 = (v2 * dctCos6 - v3 * dctSin6 + 2048) >> 12;
      v3 = t;
      v4 = (v4 + v6 + 1) >> 1;
      v6 = v4 - v6;
      v7 = (v7 + v5 + 1) >> 1;
      v5 = v7 - v5;

      // stage 2
      v0 = (v0 + v3 + 1) >> 1;
      v3 = v0 - v3;
      v1 = (v1 + v2 + 1) >> 1;
      v2 = v1 - v2;
      t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
      v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
      v7 = t;
      t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
      v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
      v6 = t;

      // stage 1
      p0 = v0 + v7;
      p7 = v0 - v7;
      p1 = v1 + v6;
      p6 = v1 - v6;
      p2 = v2 + v5;
      p5 = v2 - v5;
      p3 = v3 + v4;
      p4 = v3 - v4;

      // Convert to 8-bit integers.
      if (p0 < 16) {
        p0 = 0;
      } else if (p0 >= 4080) {
        p0 = 255;
      } else {
        p0 >>= 4;
      }
      if (p1 < 16) {
        p1 = 0;
      } else if (p1 >= 4080) {
        p1 = 255;
      } else {
        p1 >>= 4;
      }
      if (p2 < 16) {
        p2 = 0;
      } else if (p2 >= 4080) {
        p2 = 255;
      } else {
        p2 >>= 4;
      }
      if (p3 < 16) {
        p3 = 0;
      } else if (p3 >= 4080) {
        p3 = 255;
      } else {
        p3 >>= 4;
      }
      if (p4 < 16) {
        p4 = 0;
      } else if (p4 >= 4080) {
        p4 = 255;
      } else {
        p4 >>= 4;
      }
      if (p5 < 16) {
        p5 = 0;
      } else if (p5 >= 4080) {
        p5 = 255;
      } else {
        p5 >>= 4;
      }
      if (p6 < 16) {
        p6 = 0;
      } else if (p6 >= 4080) {
        p6 = 255;
      } else {
        p6 >>= 4;
      }
      if (p7 < 16) {
        p7 = 0;
      } else if (p7 >= 4080) {
        p7 = 255;
      } else {
        p7 >>= 4;
      }

      // store block data
      blockData[blockBufferOffset + col] = p0;
      blockData[blockBufferOffset + col + 8] = p1;
      blockData[blockBufferOffset + col + 16] = p2;
      blockData[blockBufferOffset + col + 24] = p3;
      blockData[blockBufferOffset + col + 32] = p4;
      blockData[blockBufferOffset + col + 40] = p5;
      blockData[blockBufferOffset + col + 48] = p6;
      blockData[blockBufferOffset + col + 56] = p7;
    }
  }

  function buildComponentData(frame, component) {
    var blocksPerLine = component.blocksPerLine;
    var blocksPerColumn = component.blocksPerColumn;
    var computationBuffer = new Int16Array(64);

    for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
      for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
        var offset = getBlockBufferOffset(component, blockRow, blockCol);
        quantizeAndInverse(component, offset, computationBuffer);
      }
    }
    return component.blockData;
  }

  function findNextFileMarker(data, currentPos, startPos = currentPos) {
    const maxPos = data.length - 1;
    var newPos = startPos < currentPos ? startPos : currentPos;

    if (currentPos >= maxPos) {
      return null; // Don't attempt to read non-existent data and just return.
    }
    var currentMarker = readUint16(data, currentPos);
    if (currentMarker >= 0xffc0 && currentMarker <= 0xfffe) {
      return {
        invalid: null,
        marker: currentMarker,
        offset: currentPos,
      };
    }
    var newMarker = readUint16(data, newPos);
    while (!(newMarker >= 0xffc0 && newMarker <= 0xfffe)) {
      if (++newPos >= maxPos) {
        return null; // Don't attempt to read non-existent data and just return.
      }
      newMarker = readUint16(data, newPos);
    }
    return {
      invalid: currentMarker.toString(16),
      marker: newMarker,
      offset: newPos,
    };
  }

  JpegImage.prototype = {
    parse(data, { dnlScanLines = null } = {}) {
      function readDataBlock() {
        const length = readUint16(data, offset);
        offset += 2;
        let endOffset = offset + length - 2;

        var fileMarker = findNextFileMarker(data, endOffset, offset);
        if (fileMarker && fileMarker.invalid) {
          warn(
            "readDataBlock - incorrect length, current marker is: " +
              fileMarker.invalid
          );
          endOffset = fileMarker.offset;
        }

        var array = data.subarray(offset, endOffset);
        offset += array.length;
        return array;
      }

      function prepareComponents(frame) {
        var mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / frame.maxH);
        var mcusPerColumn = Math.ceil(frame.scanLines / 8 / frame.maxV);
        for (var i = 0; i < frame.components.length; i++) {
          component = frame.components[i];
          var blocksPerLine = Math.ceil(
            (Math.ceil(frame.samplesPerLine / 8) * component.h) / frame.maxH
          );
          var blocksPerColumn = Math.ceil(
            (Math.ceil(frame.scanLines / 8) * component.v) / frame.maxV
          );
          var blocksPerLineForMcu = mcusPerLine * component.h;
          var blocksPerColumnForMcu = mcusPerColumn * component.v;

          var blocksBufferSize =
            64 * blocksPerColumnForMcu * (blocksPerLineForMcu + 1);
          component.blockData = new Int16Array(blocksBufferSize);
          component.blocksPerLine = blocksPerLine;
          component.blocksPerColumn = blocksPerColumn;
        }
        frame.mcusPerLine = mcusPerLine;
        frame.mcusPerColumn = mcusPerColumn;
      }

      var offset = 0;
      var jfif = null;
      var adobe = null;
      var frame, resetInterval;
      let numSOSMarkers = 0;
      var quantizationTables = [];
      var huffmanTablesAC = [],
        huffmanTablesDC = [];

      let fileMarker = readUint16(data, offset);
      offset += 2;
      if (fileMarker !== /* SOI (Start of Image) = */ 0xffd8) {
        throw new JpegError("SOI not found");
      }
      fileMarker = readUint16(data, offset);
      offset += 2;

      markerLoop: while (fileMarker !== /* EOI (End of Image) = */ 0xffd9) {
        var i, j, l;
        switch (fileMarker) {
          case 0xffe0: // APP0 (Application Specific)
          case 0xffe1: // APP1
          case 0xffe2: // APP2
          case 0xffe3: // APP3
          case 0xffe4: // APP4
          case 0xffe5: // APP5
          case 0xffe6: // APP6
          case 0xffe7: // APP7
          case 0xffe8: // APP8
          case 0xffe9: // APP9
          case 0xffea: // APP10
          case 0xffeb: // APP11
          case 0xffec: // APP12
          case 0xffed: // APP13
          case 0xffee: // APP14
          case 0xffef: // APP15
          case 0xfffe: // COM (Comment)
            var appData = readDataBlock();

            if (fileMarker === 0xffe0) {
              // 'JFIF\x00'
              if (
                appData[0] === 0x4a &&
                appData[1] === 0x46 &&
                appData[2] === 0x49 &&
                appData[3] === 0x46 &&
                appData[4] === 0
              ) {
                jfif = {
                  version: { major: appData[5], minor: appData[6] },
                  densityUnits: appData[7],
                  xDensity: (appData[8] << 8) | appData[9],
                  yDensity: (appData[10] << 8) | appData[11],
                  thumbWidth: appData[12],
                  thumbHeight: appData[13],
                  thumbData: appData.subarray(
                    14,
                    14 + 3 * appData[12] * appData[13]
                  ),
                };
              }
            }
            // TODO APP1 - Exif
            if (fileMarker === 0xffee) {
              // 'Adobe'
              if (
                appData[0] === 0x41 &&
                appData[1] === 0x64 &&
                appData[2] === 0x6f &&
                appData[3] === 0x62 &&
                appData[4] === 0x65
              ) {
                adobe = {
                  version: (appData[5] << 8) | appData[6],
                  flags0: (appData[7] << 8) | appData[8],
                  flags1: (appData[9] << 8) | appData[10],
                  transformCode: appData[11],
                };
              }
            }
            break;

          case 0xffdb: // DQT (Define Quantization Tables)
            const quantizationTablesLength = readUint16(data, offset);
            offset += 2;
            var quantizationTablesEnd = quantizationTablesLength + offset - 2;
            var z;
            while (offset < quantizationTablesEnd) {
              var quantizationTableSpec = data[offset++];
              var tableData = new Uint16Array(64);
              if (quantizationTableSpec >> 4 === 0) {
                // 8 bit values
                for (j = 0; j < 64; j++) {
                  z = dctZigZag[j];
                  tableData[z] = data[offset++];
                }
              } else if (quantizationTableSpec >> 4 === 1) {
                // 16 bit values
                for (j = 0; j < 64; j++) {
                  z = dctZigZag[j];
                  tableData[z] = readUint16(data, offset);
                  offset += 2;
                }
              } else {
                throw new JpegError("DQT - invalid table spec");
              }
              quantizationTables[quantizationTableSpec & 15] = tableData;
            }
            break;

          case 0xffc0: // SOF0 (Start of Frame, Baseline DCT)
          case 0xffc1: // SOF1 (Start of Frame, Extended DCT)
          case 0xffc2: // SOF2 (Start of Frame, Progressive DCT)
            if (frame) {
              throw new JpegError("Only single frame JPEGs supported");
            }
            offset += 2; // Skip marker length.

            frame = {};
            frame.extended = fileMarker === 0xffc1;
            frame.progressive = fileMarker === 0xffc2;
            frame.precision = data[offset++];
            const sofScanLines = readUint16(data, offset);
            offset += 2;
            frame.scanLines = dnlScanLines || sofScanLines;
            frame.samplesPerLine = readUint16(data, offset);
            offset += 2;
            frame.components = [];
            frame.componentIds = {};
            var componentsCount = data[offset++],
              componentId;
            var maxH = 0,
              maxV = 0;
            for (i = 0; i < componentsCount; i++) {
              componentId = data[offset];
              var h = data[offset + 1] >> 4;
              var v = data[offset + 1] & 15;
              if (maxH < h) {
                maxH = h;
              }
              if (maxV < v) {
                maxV = v;
              }
              var qId = data[offset + 2];
              l = frame.components.push({
                h,
                v,
                quantizationId: qId,
                quantizationTable: null, // See comment below.
              });
              frame.componentIds[componentId] = l - 1;
              offset += 3;
            }
            frame.maxH = maxH;
            frame.maxV = maxV;
            prepareComponents(frame);
            break;

          case 0xffc4: // DHT (Define Huffman Tables)
            const huffmanLength = readUint16(data, offset);
            offset += 2;
            for (i = 2; i < huffmanLength; ) {
              var huffmanTableSpec = data[offset++];
              var codeLengths = new Uint8Array(16);
              var codeLengthSum = 0;
              for (j = 0; j < 16; j++, offset++) {
                codeLengthSum += codeLengths[j] = data[offset];
              }
              var huffmanValues = new Uint8Array(codeLengthSum);
              for (j = 0; j < codeLengthSum; j++, offset++) {
                huffmanValues[j] = data[offset];
              }
              i += 17 + codeLengthSum;

              (huffmanTableSpec >> 4 === 0 ? huffmanTablesDC : huffmanTablesAC)[
                huffmanTableSpec & 15
              ] = buildHuffmanTable(codeLengths, huffmanValues);
            }
            break;

          case 0xffdd: // DRI (Define Restart Interval)
            offset += 2; // Skip marker length.

            resetInterval = readUint16(data, offset);
            offset += 2;
            break;

          case 0xffda: // SOS (Start of Scan)
            // A DNL marker (0xFFDC), if it exists, is only allowed at the end
            // of the first scan segment and may only occur once in an image.
            // Furthermore, to prevent an infinite loop, do *not* attempt to
            // parse DNL markers during re-parsing of the JPEG scan data.
            const parseDNLMarker = ++numSOSMarkers === 1 && !dnlScanLines;

            offset += 2; // Skip marker length.

            var selectorsCount = data[offset++];
            var components = [],
              component;
            for (i = 0; i < selectorsCount; i++) {
              const index = data[offset++];
              var componentIndex = frame.componentIds[index];
              component = frame.components[componentIndex];
              component.index = index;
              var tableSpec = data[offset++];
              component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
              component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
              components.push(component);
            }
            var spectralStart = data[offset++];
            var spectralEnd = data[offset++];
            var successiveApproximation = data[offset++];
            try {
              var processed = decodeScan(
                data,
                offset,
                frame,
                components,
                resetInterval,
                spectralStart,
                spectralEnd,
                successiveApproximation >> 4,
                successiveApproximation & 15,
                parseDNLMarker
              );
              offset += processed;
            } catch (ex) {
              if (ex instanceof DNLMarkerError) {
                warn(`${ex.message} -- attempting to re-parse the JPEG image.`);
                return this.parse(data, { dnlScanLines: ex.scanLines });
              } else if (ex instanceof EOIMarkerError) {
                warn(`${ex.message} -- ignoring the rest of the image data.`);
                break markerLoop;
              }
              throw ex;
            }
            break;

          case 0xffdc: // DNL (Define Number of Lines)
            // Ignore the marker, since it's being handled in `decodeScan`.
            offset += 4;
            break;

          case 0xffff: // Fill bytes
            if (data[offset] !== 0xff) {
              // Avoid skipping a valid marker.
              offset--;
            }
            break;

          default:
            // Could be incorrect encoding -- the last 0xFF byte of the previous
            // block could have been eaten by the encoder, hence we fallback to
            // `startPos = offset - 3` when looking for the next valid marker.
            const nextFileMarker = findNextFileMarker(
              data,
              /* currentPos = */ offset - 2,
              /* startPos = */ offset - 3
            );
            if (nextFileMarker && nextFileMarker.invalid) {
              warn(
                "JpegImage.parse - unexpected data, current marker is: " +
                  nextFileMarker.invalid
              );
              offset = nextFileMarker.offset;
              break;
            }
            if (offset >= data.length - 1) {
              warn(
                "JpegImage.parse - reached the end of the image data " +
                  "without finding an EOI marker (0xFFD9)."
              );
              break markerLoop;
            }
            throw new JpegError(
              "JpegImage.parse - unknown marker: " + fileMarker.toString(16)
            );
        }
        fileMarker = readUint16(data, offset);
        offset += 2;
      }

      this.width = frame.samplesPerLine;
      this.height = frame.scanLines;
      this.jfif = jfif;
      this.adobe = adobe;
      this.components = [];
      for (i = 0; i < frame.components.length; i++) {
        component = frame.components[i];

        // Prevent errors when DQT markers are placed after SOF{n} markers,
        // by assigning the `quantizationTable` entry after the entire image
        // has been parsed (fixes issue7406.pdf).
        var quantizationTable = quantizationTables[component.quantizationId];
        if (quantizationTable) {
          component.quantizationTable = quantizationTable;
        }

        this.components.push({
          index: component.index,
          output: buildComponentData(frame, component),
          scaleX: component.h / frame.maxH,
          scaleY: component.v / frame.maxV,
          blocksPerLine: component.blocksPerLine,
          blocksPerColumn: component.blocksPerColumn,
        });
      }
      this.numComponents = this.components.length;
      return undefined;
    },

    _getLinearizedBlockData(width, height, isSourcePDF = false) {
      var scaleX = this.width / width,
        scaleY = this.height / height;

      var component, componentScaleX, componentScaleY, blocksPerScanline;
      var x, y, i, j, k;
      var index;
      var offset = 0;
      var output;
      var numComponents = this.components.length;
      var dataLength = width * height * numComponents;
      var data = new Uint8ClampedArray(dataLength);
      var xScaleBlockOffset = new Uint32Array(width);
      var mask3LSB = 0xfffffff8; // used to clear the 3 LSBs
      let lastComponentScaleX;

      for (i = 0; i < numComponents; i++) {
        component = this.components[i];
        componentScaleX = component.scaleX * scaleX;
        componentScaleY = component.scaleY * scaleY;
        offset = i;
        output = component.output;
        blocksPerScanline = (component.blocksPerLine + 1) << 3;
        // Precalculate the `xScaleBlockOffset`. Since it doesn't depend on the
        // component data, that's only necessary when `componentScaleX` changes.
        if (componentScaleX !== lastComponentScaleX) {
          for (x = 0; x < width; x++) {
            j = 0 | (x * componentScaleX);
            xScaleBlockOffset[x] = ((j & mask3LSB) << 3) | (j & 7);
          }
          lastComponentScaleX = componentScaleX;
        }
        // linearize the blocks of the component
        for (y = 0; y < height; y++) {
          j = 0 | (y * componentScaleY);
          index = (blocksPerScanline * (j & mask3LSB)) | ((j & 7) << 3);
          for (x = 0; x < width; x++) {
            data[offset] = output[index + xScaleBlockOffset[x]];
            offset += numComponents;
          }
        }
      }

      // decodeTransform contains pairs of multiplier (-256..256) and additive
      let transform = this._decodeTransform;

      // In PDF files, JPEG images with CMYK colour spaces are usually inverted
      // (this can be observed by extracting the raw image data).
      // Since the conversion algorithms (see below) were written primarily for
      // the PDF use-cases, attempting to use `JpegImage` to parse standalone
      // JPEG (CMYK) images may thus result in inverted images (see issue 9513).
      //
      // Unfortunately it's not (always) possible to tell, from the image data
      // alone, if it needs to be inverted. Thus in an attempt to provide better
      // out-of-box behaviour when `JpegImage` is used standalone, default to
      // inverting JPEG (CMYK) images if and only if the image data does *not*
      // come from a PDF file and no `decodeTransform` was passed by the user.
      if (!isSourcePDF && numComponents === 4 && !transform) {
        // prettier-ignore
        transform = new Int32Array([
          -256, 255, -256, 255, -256, 255, -256, 255]);
      }

      if (transform) {
        for (i = 0; i < dataLength; ) {
          for (j = 0, k = 0; j < numComponents; j++, i++, k += 2) {
            data[i] = ((data[i] * transform[k]) >> 8) + transform[k + 1];
          }
        }
      }
      return data;
    },

    get _isColorConversionNeeded() {
      if (this.adobe) {
        // The adobe transform marker overrides any previous setting.
        return !!this.adobe.transformCode;
      }
      if (this.numComponents === 3) {
        if (this._colorTransform === 0) {
          // If the Adobe transform marker is not present and the image
          // dictionary has a 'ColorTransform' entry, explicitly set to `0`,
          // then the colours should *not* be transformed.
          return false;
        } else if (
          this.components[0].index === /* "R" = */ 0x52 &&
          this.components[1].index === /* "G" = */ 0x47 &&
          this.components[2].index === /* "B" = */ 0x42
        ) {
          // If the three components are indexed as RGB in ASCII
          // then the colours should *not* be transformed.
          return false;
        }
        return true;
      }
      // `this.numComponents !== 3`
      if (this._colorTransform === 1) {
        // If the Adobe transform marker is not present and the image
        // dictionary has a 'ColorTransform' entry, explicitly set to `1`,
        // then the colours should be transformed.
        return true;
      }
      return false;
    },

    _convertYccToRgb: function convertYccToRgb(data) {
      var Y, Cb, Cr;
      for (var i = 0, length = data.length; i < length; i += 3) {
        Y = data[i];
        Cb = data[i + 1];
        Cr = data[i + 2];
        data[i] = Y - 179.456 + 1.402 * Cr;
        data[i + 1] = Y + 135.459 - 0.344 * Cb - 0.714 * Cr;
        data[i + 2] = Y - 226.816 + 1.772 * Cb;
      }
      return data;
    },

    _convertYcckToRgb: function convertYcckToRgb(data) {
      var Y, Cb, Cr, k;
      var offset = 0;
      for (var i = 0, length = data.length; i < length; i += 4) {
        Y = data[i];
        Cb = data[i + 1];
        Cr = data[i + 2];
        k = data[i + 3];

        data[offset++] =
          -122.67195406894 +
          Cb *
            (-6.60635669420364e-5 * Cb +
              0.000437130475926232 * Cr -
              5.4080610064599e-5 * Y +
              0.00048449797120281 * k -
              0.154362151871126) +
          Cr *
            (-0.000957964378445773 * Cr +
              0.000817076911346625 * Y -
              0.00477271405408747 * k +
              1.53380253221734) +
          Y *
            (0.000961250184130688 * Y -
              0.00266257332283933 * k +
              0.48357088451265) +
          k * (-0.000336197177618394 * k + 0.484791561490776);

        data[offset++] =
          107.268039397724 +
          Cb *
            (2.19927104525741e-5 * Cb -
              0.000640992018297945 * Cr +
              0.000659397001245577 * Y +
              0.000426105652938837 * k -
              0.176491792462875) +
          Cr *
            (-0.000778269941513683 * Cr +
              0.00130872261408275 * Y +
              0.000770482631801132 * k -
              0.151051492775562) +
          Y *
            (0.00126935368114843 * Y -
              0.00265090189010898 * k +
              0.25802910206845) +
          k * (-0.000318913117588328 * k - 0.213742400323665);

        data[offset++] =
          -20.810012546947 +
          Cb *
            (-0.000570115196973677 * Cb -
              2.63409051004589e-5 * Cr +
              0.0020741088115012 * Y -
              0.00288260236853442 * k +
              0.814272968359295) +
          Cr *
            (-1.53496057440975e-5 * Cr -
              0.000132689043961446 * Y +
              0.000560833691242812 * k -
              0.195152027534049) +
          Y *
            (0.00174418132927582 * Y -
              0.00255243321439347 * k +
              0.116935020465145) +
          k * (-0.000343531996510555 * k + 0.24165260232407);
      }
      // Ensure that only the converted RGB data is returned.
      return data.subarray(0, offset);
    },

    _convertYcckToCmyk: function convertYcckToCmyk(data) {
      var Y, Cb, Cr;
      for (var i = 0, length = data.length; i < length; i += 4) {
        Y = data[i];
        Cb = data[i + 1];
        Cr = data[i + 2];
        data[i] = 434.456 - Y - 1.402 * Cr;
        data[i + 1] = 119.541 - Y + 0.344 * Cb + 0.714 * Cr;
        data[i + 2] = 481.816 - Y - 1.772 * Cb;
        // K in data[i + 3] is unchanged
      }
      return data;
    },

    _convertCmykToRgb: function convertCmykToRgb(data) {
      var c, m, y, k;
      var offset = 0;
      for (var i = 0, length = data.length; i < length; i += 4) {
        c = data[i];
        m = data[i + 1];
        y = data[i + 2];
        k = data[i + 3];

        data[offset++] =
          255 +
          c *
            (-0.00006747147073602441 * c +
              0.0008379262121013727 * m +
              0.0002894718188643294 * y +
              0.003264231057537806 * k -
              1.1185611867203937) +
          m *
            (0.000026374107616089405 * m -
              0.00008626949158638572 * y -
              0.0002748769067499491 * k -
              0.02155688794978967) +
          y *
            (-0.00003878099212869363 * y -
              0.0003267808279485286 * k +
              0.0686742238595345) -
          k * (0.0003361971776183937 * k + 0.7430659151342254);

        data[offset++] =
          255 +
          c *
            (0.00013596372813588848 * c +
              0.000924537132573585 * m +
              0.00010567359618683593 * y +
              0.0004791864687436512 * k -
              0.3109689587515875) +
          m *
            (-0.00023545346108370344 * m +
              0.0002702845253534714 * y +
              0.0020200308977307156 * k -
              0.7488052167015494) +
          y *
            (0.00006834815998235662 * y +
              0.00015168452363460973 * k -
              0.09751927774728933) -
          k * (0.00031891311758832814 * k + 0.7364883807733168);

        data[offset++] =
          255 +
          c *
            (0.000013598650411385307 * c +
              0.00012423956175490851 * m +
              0.0004751985097583589 * y -
              0.0000036729317476630422 * k -
              0.05562186980264034) +
          m *
            (0.00016141380598724676 * m +
              0.0009692239130725186 * y +
              0.0007782692450036253 * k -
              0.44015232367526463) +
          y *
            (5.068882914068769e-7 * y +
              0.0017778369011375071 * k -
              0.7591454649749609) -
          k * (0.0003435319965105553 * k + 0.7063770186160144);
      }
      // Ensure that only the converted RGB data is returned.
      return data.subarray(0, offset);
    },

    getData({ width, height, forceRGB = false, isSourcePDF = false }) {
      if (this.numComponents > 4) {
        throw new JpegError("Unsupported color mode");
      }
      // Type of data: Uint8ClampedArray(width * height * numComponents)
      var data = this._getLinearizedBlockData(width, height, isSourcePDF);

      if (this.numComponents === 1 && forceRGB) {
        var dataLength = data.length;
        var rgbData = new Uint8ClampedArray(dataLength * 3);
        var offset = 0;
        for (var i = 0; i < dataLength; i++) {
          var grayColor = data[i];
          rgbData[offset++] = grayColor;
          rgbData[offset++] = grayColor;
          rgbData[offset++] = grayColor;
        }
        return rgbData;
      } else if (this.numComponents === 3 && this._isColorConversionNeeded) {
        return this._convertYccToRgb(data);
      } else if (this.numComponents === 4) {
        if (this._isColorConversionNeeded) {
          if (forceRGB) {
            return this._convertYcckToRgb(data);
          }
          return this._convertYcckToCmyk(data);
        } else if (forceRGB) {
          return this._convertCmykToRgb(data);
        }
      }
      return data;
    },
  };

  return JpegImage;
})();


	"use strict";
    var ArithmeticDecoder = function ArithmeticDecoderClosure() {
  var QeTable = [{
    qe: 0x5601,
    nmps: 1,
    nlps: 1,
    switchFlag: 1
  }, {
    qe: 0x3401,
    nmps: 2,
    nlps: 6,
    switchFlag: 0
  }, {
    qe: 0x1801,
    nmps: 3,
    nlps: 9,
    switchFlag: 0
  }, {
    qe: 0x0AC1,
    nmps: 4,
    nlps: 12,
    switchFlag: 0
  }, {
    qe: 0x0521,
    nmps: 5,
    nlps: 29,
    switchFlag: 0
  }, {
    qe: 0x0221,
    nmps: 38,
    nlps: 33,
    switchFlag: 0
  }, {
    qe: 0x5601,
    nmps: 7,
    nlps: 6,
    switchFlag: 1
  }, {
    qe: 0x5401,
    nmps: 8,
    nlps: 14,
    switchFlag: 0
  }, {
    qe: 0x4801,
    nmps: 9,
    nlps: 14,
    switchFlag: 0
  }, {
    qe: 0x3801,
    nmps: 10,
    nlps: 14,
    switchFlag: 0
  }, {
    qe: 0x3001,
    nmps: 11,
    nlps: 17,
    switchFlag: 0
  }, {
    qe: 0x2401,
    nmps: 12,
    nlps: 18,
    switchFlag: 0
  }, {
    qe: 0x1C01,
    nmps: 13,
    nlps: 20,
    switchFlag: 0
  }, {
    qe: 0x1601,
    nmps: 29,
    nlps: 21,
    switchFlag: 0
  }, {
    qe: 0x5601,
    nmps: 15,
    nlps: 14,
    switchFlag: 1
  }, {
    qe: 0x5401,
    nmps: 16,
    nlps: 14,
    switchFlag: 0
  }, {
    qe: 0x5101,
    nmps: 17,
    nlps: 15,
    switchFlag: 0
  }, {
    qe: 0x4801,
    nmps: 18,
    nlps: 16,
    switchFlag: 0
  }, {
    qe: 0x3801,
    nmps: 19,
    nlps: 17,
    switchFlag: 0
  }, {
    qe: 0x3401,
    nmps: 20,
    nlps: 18,
    switchFlag: 0
  }, {
    qe: 0x3001,
    nmps: 21,
    nlps: 19,
    switchFlag: 0
  }, {
    qe: 0x2801,
    nmps: 22,
    nlps: 19,
    switchFlag: 0
  }, {
    qe: 0x2401,
    nmps: 23,
    nlps: 20,
    switchFlag: 0
  }, {
    qe: 0x2201,
    nmps: 24,
    nlps: 21,
    switchFlag: 0
  }, {
    qe: 0x1C01,
    nmps: 25,
    nlps: 22,
    switchFlag: 0
  }, {
    qe: 0x1801,
    nmps: 26,
    nlps: 23,
    switchFlag: 0
  }, {
    qe: 0x1601,
    nmps: 27,
    nlps: 24,
    switchFlag: 0
  }, {
    qe: 0x1401,
    nmps: 28,
    nlps: 25,
    switchFlag: 0
  }, {
    qe: 0x1201,
    nmps: 29,
    nlps: 26,
    switchFlag: 0
  }, {
    qe: 0x1101,
    nmps: 30,
    nlps: 27,
    switchFlag: 0
  }, {
    qe: 0x0AC1,
    nmps: 31,
    nlps: 28,
    switchFlag: 0
  }, {
    qe: 0x09C1,
    nmps: 32,
    nlps: 29,
    switchFlag: 0
  }, {
    qe: 0x08A1,
    nmps: 33,
    nlps: 30,
    switchFlag: 0
  }, {
    qe: 0x0521,
    nmps: 34,
    nlps: 31,
    switchFlag: 0
  }, {
    qe: 0x0441,
    nmps: 35,
    nlps: 32,
    switchFlag: 0
  }, {
    qe: 0x02A1,
    nmps: 36,
    nlps: 33,
    switchFlag: 0
  }, {
    qe: 0x0221,
    nmps: 37,
    nlps: 34,
    switchFlag: 0
  }, {
    qe: 0x0141,
    nmps: 38,
    nlps: 35,
    switchFlag: 0
  }, {
    qe: 0x0111,
    nmps: 39,
    nlps: 36,
    switchFlag: 0
  }, {
    qe: 0x0085,
    nmps: 40,
    nlps: 37,
    switchFlag: 0
  }, {
    qe: 0x0049,
    nmps: 41,
    nlps: 38,
    switchFlag: 0
  }, {
    qe: 0x0025,
    nmps: 42,
    nlps: 39,
    switchFlag: 0
  }, {
    qe: 0x0015,
    nmps: 43,
    nlps: 40,
    switchFlag: 0
  }, {
    qe: 0x0009,
    nmps: 44,
    nlps: 41,
    switchFlag: 0
  }, {
    qe: 0x0005,
    nmps: 45,
    nlps: 42,
    switchFlag: 0
  }, {
    qe: 0x0001,
    nmps: 45,
    nlps: 43,
    switchFlag: 0
  }, {
    qe: 0x5601,
    nmps: 46,
    nlps: 46,
    switchFlag: 0
  }];
  function ArithmeticDecoder(data, start, end) {
    this.data = data;
    this.bp = start;
    this.dataEnd = end;
    this.chigh = data[start];
    this.clow = 0;
    this.byteIn();
    this.chigh = this.chigh << 7 & 0xFFFF | this.clow >> 9 & 0x7F;
    this.clow = this.clow << 7 & 0xFFFF;
    this.ct -= 7;
    this.a = 0x8000;
  }
  ArithmeticDecoder.prototype = {
    byteIn: function ArithmeticDecoder_byteIn() {
      var data = this.data;
      var bp = this.bp;
      if (data[bp] === 0xFF) {
        var b1 = data[bp + 1];
        if (b1 > 0x8F) {
          this.clow += 0xFF00;
          this.ct = 8;
        } else {
          bp++;
          this.clow += data[bp] << 9;
          this.ct = 7;
          this.bp = bp;
        }
      } else {
        bp++;
        this.clow += bp < this.dataEnd ? data[bp] << 8 : 0xFF00;
        this.ct = 8;
        this.bp = bp;
      }
      if (this.clow > 0xFFFF) {
        this.chigh += this.clow >> 16;
        this.clow &= 0xFFFF;
      }
    },
    readBit: function ArithmeticDecoder_readBit(contexts, pos) {
      var cx_index = contexts[pos] >> 1,
          cx_mps = contexts[pos] & 1;
      var qeTableIcx = QeTable[cx_index];
      var qeIcx = qeTableIcx.qe;
      var d;
      var a = this.a - qeIcx;
      if (this.chigh < qeIcx) {
        if (a < qeIcx) {
          a = qeIcx;
          d = cx_mps;
          cx_index = qeTableIcx.nmps;
        } else {
          a = qeIcx;
          d = 1 ^ cx_mps;
          if (qeTableIcx.switchFlag === 1) {
            cx_mps = d;
          }
          cx_index = qeTableIcx.nlps;
        }
      } else {
        this.chigh -= qeIcx;
        if ((a & 0x8000) !== 0) {
          this.a = a;
          return cx_mps;
        }
        if (a < qeIcx) {
          d = 1 ^ cx_mps;
          if (qeTableIcx.switchFlag === 1) {
            cx_mps = d;
          }
          cx_index = qeTableIcx.nlps;
        } else {
          d = cx_mps;
          cx_index = qeTableIcx.nmps;
        }
      }
      do {
        if (this.ct === 0) {
          this.byteIn();
        }
        a <<= 1;
        this.chigh = this.chigh << 1 & 0xFFFF | this.clow >> 15 & 1;
        this.clow = this.clow << 1 & 0xFFFF;
        this.ct--;
      } while ((a & 0x8000) === 0);
      this.a = a;
      contexts[pos] = cx_index << 1 | cx_mps;
      return d;
    }
  };
  return ArithmeticDecoder;
}();


	
	"use strict";
   var JpxImage = function JpxImageClosure() {
  var SubbandsGainLog2 = {
    'LL': 0,
    'LH': 1,
    'HL': 1,
    'HH': 2
  };
  function JpxImage() {
    this.failOnCorruptedImage = false;
  }
  JpxImage.prototype = {
    parse: function JpxImage_parse(data) {
      var head = readUint16(data, 0);
      if (head === 0xFF4F) {
        this.parseCodestream(data, 0, data.length);
        return;
      }
      var position = 0,
          length = data.length;
      while (position < length) {
        var headerSize = 8;
        var lbox = readUint32(data, position);
        var tbox = readUint32(data, position + 4);
        position += headerSize;
        if (lbox === 1) {
          lbox = readUint32(data, position) * 4294967296 + readUint32(data, position + 4);
          position += 8;
          headerSize += 8;
        }
        if (lbox === 0) {
          lbox = length - position + headerSize;
        }
        if (lbox < headerSize) {
          error('JPX Error: Invalid box field size');
        }
        var dataLength = lbox - headerSize;
        var jumpDataLength = true;
        switch (tbox) {
          case 0x6A703268:
            jumpDataLength = false;
            break;
          case 0x636F6C72:
            var method = data[position];
            if (method === 1) {
              var colorspace = readUint32(data, position + 3);
              switch (colorspace) {
                case 16:
                case 17:
                case 18:
                  break;
                default:
                  warn('Unknown colorspace ' + colorspace);
                  break;
              }
            } else if (method === 2) {
              info('ICC profile not supported');
            }
            break;
          case 0x6A703263:
            this.parseCodestream(data, position, position + dataLength);
            break;
          case 0x6A502020:
            if (readUint32(data, position) !== 0x0d0a870a) {
              warn('Invalid JP2 signature');
            }
            break;
          case 0x6A501A1A:
          case 0x66747970:
          case 0x72726571:
          case 0x72657320:
          case 0x69686472:
            break;
          default:
            var headerType = String.fromCharCode(tbox >> 24 & 0xFF, tbox >> 16 & 0xFF, tbox >> 8 & 0xFF, tbox & 0xFF);
            warn('Unsupported header type ' + tbox + ' (' + headerType + ')');
            break;
        }
        if (jumpDataLength) {
          position += dataLength;
        }
      }
    },
    parseImageProperties: function JpxImage_parseImageProperties(stream) {
      var newByte = stream.getByte();
      while (newByte >= 0) {
        var oldByte = newByte;
        newByte = stream.getByte();
        var code = oldByte << 8 | newByte;
        if (code === 0xFF51) {
          stream.skip(4);
          var Xsiz = stream.getInt32() >>> 0;
          var Ysiz = stream.getInt32() >>> 0;
          var XOsiz = stream.getInt32() >>> 0;
          var YOsiz = stream.getInt32() >>> 0;
          stream.skip(16);
          var Csiz = stream.getUint16();
          this.width = Xsiz - XOsiz;
          this.height = Ysiz - YOsiz;
          this.componentsCount = Csiz;
          this.bitsPerComponent = 8;
          return;
        }
      }
      error('JPX Error: No size marker found in JPX stream');
    },
    parseCodestream: function JpxImage_parseCodestream(data, start, end) {
      var context = {};
      var doNotRecover = false;
      try {
        var position = start;
        while (position + 1 < end) {
          var code = readUint16(data, position);
          position += 2;
          var length = 0,
              j,
              sqcd,
              spqcds,
              spqcdSize,
              scalarExpounded,
              tile;
          switch (code) {
            case 0xFF4F:
              context.mainHeader = true;
              break;
            case 0xFFD9:
              break;
            case 0xFF51:
              length = readUint16(data, position);
              var siz = {};
              siz.Xsiz = readUint32(data, position + 4);
              siz.Ysiz = readUint32(data, position + 8);
              siz.XOsiz = readUint32(data, position + 12);
              siz.YOsiz = readUint32(data, position + 16);
              siz.XTsiz = readUint32(data, position + 20);
              siz.YTsiz = readUint32(data, position + 24);
              siz.XTOsiz = readUint32(data, position + 28);
              siz.YTOsiz = readUint32(data, position + 32);
              var componentsCount = readUint16(data, position + 36);
              siz.Csiz = componentsCount;
              var components = [];
              j = position + 38;
              for (var i = 0; i < componentsCount; i++) {
                var component = {
                  precision: (data[j] & 0x7F) + 1,
                  isSigned: !!(data[j] & 0x80),
                  XRsiz: data[j + 1],
                  YRsiz: data[j + 1]
                };
                calculateComponentDimensions(component, siz);
                components.push(component);
              }
              context.SIZ = siz;
              context.components = components;
              calculateTileGrids(context, components);
              context.QCC = [];
              context.COC = [];
              break;
            case 0xFF5C:
              length = readUint16(data, position);
              var qcd = {};
              j = position + 2;
              sqcd = data[j++];
              switch (sqcd & 0x1F) {
                case 0:
                  spqcdSize = 8;
                  scalarExpounded = true;
                  break;
                case 1:
                  spqcdSize = 16;
                  scalarExpounded = false;
                  break;
                case 2:
                  spqcdSize = 16;
                  scalarExpounded = true;
                  break;
                default:
                  throw new Error('Invalid SQcd value ' + sqcd);
              }
              qcd.noQuantization = spqcdSize === 8;
              qcd.scalarExpounded = scalarExpounded;
              qcd.guardBits = sqcd >> 5;
              spqcds = [];
              while (j < length + position) {
                var spqcd = {};
                if (spqcdSize === 8) {
                  spqcd.epsilon = data[j++] >> 3;
                  spqcd.mu = 0;
                } else {
                  spqcd.epsilon = data[j] >> 3;
                  spqcd.mu = (data[j] & 0x7) << 8 | data[j + 1];
                  j += 2;
                }
                spqcds.push(spqcd);
              }
              qcd.SPqcds = spqcds;
              if (context.mainHeader) {
                context.QCD = qcd;
              } else {
                context.currentTile.QCD = qcd;
                context.currentTile.QCC = [];
              }
              break;
            case 0xFF5D:
              length = readUint16(data, position);
              var qcc = {};
              j = position + 2;
              var cqcc;
              if (context.SIZ.Csiz < 257) {
                cqcc = data[j++];
              } else {
                cqcc = readUint16(data, j);
                j += 2;
              }
              sqcd = data[j++];
              switch (sqcd & 0x1F) {
                case 0:
                  spqcdSize = 8;
                  scalarExpounded = true;
                  break;
                case 1:
                  spqcdSize = 16;
                  scalarExpounded = false;
                  break;
                case 2:
                  spqcdSize = 16;
                  scalarExpounded = true;
                  break;
                default:
                  throw new Error('Invalid SQcd value ' + sqcd);
              }
              qcc.noQuantization = spqcdSize === 8;
              qcc.scalarExpounded = scalarExpounded;
              qcc.guardBits = sqcd >> 5;
              spqcds = [];
              while (j < length + position) {
                spqcd = {};
                if (spqcdSize === 8) {
                  spqcd.epsilon = data[j++] >> 3;
                  spqcd.mu = 0;
                } else {
                  spqcd.epsilon = data[j] >> 3;
                  spqcd.mu = (data[j] & 0x7) << 8 | data[j + 1];
                  j += 2;
                }
                spqcds.push(spqcd);
              }
              qcc.SPqcds = spqcds;
              if (context.mainHeader) {
                context.QCC[cqcc] = qcc;
              } else {
                context.currentTile.QCC[cqcc] = qcc;
              }
              break;
            case 0xFF52:
              length = readUint16(data, position);
              var cod = {};
              j = position + 2;
              var scod = data[j++];
              cod.entropyCoderWithCustomPrecincts = !!(scod & 1);
              cod.sopMarkerUsed = !!(scod & 2);
              cod.ephMarkerUsed = !!(scod & 4);
              cod.progressionOrder = data[j++];
              cod.layersCount = readUint16(data, j);
              j += 2;
              cod.multipleComponentTransform = data[j++];
              cod.decompositionLevelsCount = data[j++];
              cod.xcb = (data[j++] & 0xF) + 2;
              cod.ycb = (data[j++] & 0xF) + 2;
              var blockStyle = data[j++];
              cod.selectiveArithmeticCodingBypass = !!(blockStyle & 1);
              cod.resetContextProbabilities = !!(blockStyle & 2);
              cod.terminationOnEachCodingPass = !!(blockStyle & 4);
              cod.verticalyStripe = !!(blockStyle & 8);
              cod.predictableTermination = !!(blockStyle & 16);
              cod.segmentationSymbolUsed = !!(blockStyle & 32);
              cod.reversibleTransformation = data[j++];
              if (cod.entropyCoderWithCustomPrecincts) {
                var precinctsSizes = [];
                while (j < length + position) {
                  var precinctsSize = data[j++];
                  precinctsSizes.push({
                    PPx: precinctsSize & 0xF,
                    PPy: precinctsSize >> 4
                  });
                }
                cod.precinctsSizes = precinctsSizes;
              }
              var unsupported = [];
              if (cod.selectiveArithmeticCodingBypass) {
                unsupported.push('selectiveArithmeticCodingBypass');
              }
              if (cod.resetContextProbabilities) {
                unsupported.push('resetContextProbabilities');
              }
              if (cod.terminationOnEachCodingPass) {
                unsupported.push('terminationOnEachCodingPass');
              }
              if (cod.verticalyStripe) {
                unsupported.push('verticalyStripe');
              }
              if (cod.predictableTermination) {
                unsupported.push('predictableTermination');
              }
              if (unsupported.length > 0) {
                doNotRecover = true;
                throw new Error('Unsupported COD options (' + unsupported.join(', ') + ')');
              }
              if (context.mainHeader) {
                context.COD = cod;
              } else {
                context.currentTile.COD = cod;
                context.currentTile.COC = [];
              }
              break;
            case 0xFF90:
              length = readUint16(data, position);
              tile = {};
              tile.index = readUint16(data, position + 2);
              tile.length = readUint32(data, position + 4);
              tile.dataEnd = tile.length + position - 2;
              tile.partIndex = data[position + 8];
              tile.partsCount = data[position + 9];
              context.mainHeader = false;
              if (tile.partIndex === 0) {
                tile.COD = context.COD;
                tile.COC = context.COC.slice(0);
                tile.QCD = context.QCD;
                tile.QCC = context.QCC.slice(0);
              }
              context.currentTile = tile;
              break;
            case 0xFF93:
              tile = context.currentTile;
              if (tile.partIndex === 0) {
                initializeTile(context, tile.index);
                buildPackets(context);
              }
              length = tile.dataEnd - position;
              parseTilePackets(context, data, position, length);
              break;
            case 0xFF55:
            case 0xFF57:
            case 0xFF58:
            case 0xFF64:
              length = readUint16(data, position);
              break;
            case 0xFF53:
              throw new Error('Codestream code 0xFF53 (COC) is ' + 'not implemented');
            default:
              throw new Error('Unknown codestream code: ' + code.toString(16));
          }
          position += length;
        }
      } catch (e) {
        if (doNotRecover || this.failOnCorruptedImage) {
          error('JPX Error: ' + e.message);
        } else {
          warn('JPX: Trying to recover from: ' + e.message);
        }
      }
      this.tiles = transformComponents(context);
      this.width = context.SIZ.Xsiz - context.SIZ.XOsiz;
      this.height = context.SIZ.Ysiz - context.SIZ.YOsiz;
      this.componentsCount = context.SIZ.Csiz;
    }
  };
  function calculateComponentDimensions(component, siz) {
    component.x0 = Math.ceil(siz.XOsiz / component.XRsiz);
    component.x1 = Math.ceil(siz.Xsiz / component.XRsiz);
    component.y0 = Math.ceil(siz.YOsiz / component.YRsiz);
    component.y1 = Math.ceil(siz.Ysiz / component.YRsiz);
    component.width = component.x1 - component.x0;
    component.height = component.y1 - component.y0;
  }
  function calculateTileGrids(context, components) {
    var siz = context.SIZ;
    var tile,
        tiles = [];
    var numXtiles = Math.ceil((siz.Xsiz - siz.XTOsiz) / siz.XTsiz);
    var numYtiles = Math.ceil((siz.Ysiz - siz.YTOsiz) / siz.YTsiz);
    for (var q = 0; q < numYtiles; q++) {
      for (var p = 0; p < numXtiles; p++) {
        tile = {};
        tile.tx0 = Math.max(siz.XTOsiz + p * siz.XTsiz, siz.XOsiz);
        tile.ty0 = Math.max(siz.YTOsiz + q * siz.YTsiz, siz.YOsiz);
        tile.tx1 = Math.min(siz.XTOsiz + (p + 1) * siz.XTsiz, siz.Xsiz);
        tile.ty1 = Math.min(siz.YTOsiz + (q + 1) * siz.YTsiz, siz.Ysiz);
        tile.width = tile.tx1 - tile.tx0;
        tile.height = tile.ty1 - tile.ty0;
        tile.components = [];
        tiles.push(tile);
      }
    }
    context.tiles = tiles;
    var componentsCount = siz.Csiz;
    for (var i = 0, ii = componentsCount; i < ii; i++) {
      var component = components[i];
      for (var j = 0, jj = tiles.length; j < jj; j++) {
        var tileComponent = {};
        tile = tiles[j];
        tileComponent.tcx0 = Math.ceil(tile.tx0 / component.XRsiz);
        tileComponent.tcy0 = Math.ceil(tile.ty0 / component.YRsiz);
        tileComponent.tcx1 = Math.ceil(tile.tx1 / component.XRsiz);
        tileComponent.tcy1 = Math.ceil(tile.ty1 / component.YRsiz);
        tileComponent.width = tileComponent.tcx1 - tileComponent.tcx0;
        tileComponent.height = tileComponent.tcy1 - tileComponent.tcy0;
        tile.components[i] = tileComponent;
      }
    }
  }
  function getBlocksDimensions(context, component, r) {
    var codOrCoc = component.codingStyleParameters;
    var result = {};
    if (!codOrCoc.entropyCoderWithCustomPrecincts) {
      result.PPx = 15;
      result.PPy = 15;
    } else {
      result.PPx = codOrCoc.precinctsSizes[r].PPx;
      result.PPy = codOrCoc.precinctsSizes[r].PPy;
    }
    result.xcb_ = r > 0 ? Math.min(codOrCoc.xcb, result.PPx - 1) : Math.min(codOrCoc.xcb, result.PPx);
    result.ycb_ = r > 0 ? Math.min(codOrCoc.ycb, result.PPy - 1) : Math.min(codOrCoc.ycb, result.PPy);
    return result;
  }
  function buildPrecincts(context, resolution, dimensions) {
    var precinctWidth = 1 << dimensions.PPx;
    var precinctHeight = 1 << dimensions.PPy;
    var isZeroRes = resolution.resLevel === 0;
    var precinctWidthInSubband = 1 << dimensions.PPx + (isZeroRes ? 0 : -1);
    var precinctHeightInSubband = 1 << dimensions.PPy + (isZeroRes ? 0 : -1);
    var numprecinctswide = resolution.trx1 > resolution.trx0 ? Math.ceil(resolution.trx1 / precinctWidth) - Math.floor(resolution.trx0 / precinctWidth) : 0;
    var numprecinctshigh = resolution.try1 > resolution.try0 ? Math.ceil(resolution.try1 / precinctHeight) - Math.floor(resolution.try0 / precinctHeight) : 0;
    var numprecincts = numprecinctswide * numprecinctshigh;
    resolution.precinctParameters = {
      precinctWidth: precinctWidth,
      precinctHeight: precinctHeight,
      numprecinctswide: numprecinctswide,
      numprecinctshigh: numprecinctshigh,
      numprecincts: numprecincts,
      precinctWidthInSubband: precinctWidthInSubband,
      precinctHeightInSubband: precinctHeightInSubband
    };
  }
  function buildCodeblocks(context, subband, dimensions) {
    var xcb_ = dimensions.xcb_;
    var ycb_ = dimensions.ycb_;
    var codeblockWidth = 1 << xcb_;
    var codeblockHeight = 1 << ycb_;
    var cbx0 = subband.tbx0 >> xcb_;
    var cby0 = subband.tby0 >> ycb_;
    var cbx1 = subband.tbx1 + codeblockWidth - 1 >> xcb_;
    var cby1 = subband.tby1 + codeblockHeight - 1 >> ycb_;
    var precinctParameters = subband.resolution.precinctParameters;
    var codeblocks = [];
    var precincts = [];
    var i, j, codeblock, precinctNumber;
    for (j = cby0; j < cby1; j++) {
      for (i = cbx0; i < cbx1; i++) {
        codeblock = {
          cbx: i,
          cby: j,
          tbx0: codeblockWidth * i,
          tby0: codeblockHeight * j,
          tbx1: codeblockWidth * (i + 1),
          tby1: codeblockHeight * (j + 1)
        };
        codeblock.tbx0_ = Math.max(subband.tbx0, codeblock.tbx0);
        codeblock.tby0_ = Math.max(subband.tby0, codeblock.tby0);
        codeblock.tbx1_ = Math.min(subband.tbx1, codeblock.tbx1);
        codeblock.tby1_ = Math.min(subband.tby1, codeblock.tby1);
        var pi = Math.floor((codeblock.tbx0_ - subband.tbx0) / precinctParameters.precinctWidthInSubband);
        var pj = Math.floor((codeblock.tby0_ - subband.tby0) / precinctParameters.precinctHeightInSubband);
        precinctNumber = pi + pj * precinctParameters.numprecinctswide;
        codeblock.precinctNumber = precinctNumber;
        codeblock.subbandType = subband.type;
        codeblock.Lblock = 3;
        if (codeblock.tbx1_ <= codeblock.tbx0_ || codeblock.tby1_ <= codeblock.tby0_) {
          continue;
        }
        codeblocks.push(codeblock);
        var precinct = precincts[precinctNumber];
        if (precinct !== undefined) {
          if (i < precinct.cbxMin) {
            precinct.cbxMin = i;
          } else if (i > precinct.cbxMax) {
            precinct.cbxMax = i;
          }
          if (j < precinct.cbyMin) {
            precinct.cbxMin = j;
          } else if (j > precinct.cbyMax) {
            precinct.cbyMax = j;
          }
        } else {
          precincts[precinctNumber] = precinct = {
            cbxMin: i,
            cbyMin: j,
            cbxMax: i,
            cbyMax: j
          };
        }
        codeblock.precinct = precinct;
      }
    }
    subband.codeblockParameters = {
      codeblockWidth: xcb_,
      codeblockHeight: ycb_,
      numcodeblockwide: cbx1 - cbx0 + 1,
      numcodeblockhigh: cby1 - cby0 + 1
    };
    subband.codeblocks = codeblocks;
    subband.precincts = precincts;
  }
  function createPacket(resolution, precinctNumber, layerNumber) {
    var precinctCodeblocks = [];
    var subbands = resolution.subbands;
    for (var i = 0, ii = subbands.length; i < ii; i++) {
      var subband = subbands[i];
      var codeblocks = subband.codeblocks;
      for (var j = 0, jj = codeblocks.length; j < jj; j++) {
        var codeblock = codeblocks[j];
        if (codeblock.precinctNumber !== precinctNumber) {
          continue;
        }
        precinctCodeblocks.push(codeblock);
      }
    }
    return {
      layerNumber: layerNumber,
      codeblocks: precinctCodeblocks
    };
  }
  function LayerResolutionComponentPositionIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var maxDecompositionLevelsCount = 0;
    for (var q = 0; q < componentsCount; q++) {
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
    }
    var l = 0,
        r = 0,
        i = 0,
        k = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; l < layersCount; l++) {
        for (; r <= maxDecompositionLevelsCount; r++) {
          for (; i < componentsCount; i++) {
            var component = tile.components[i];
            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }
            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;
            for (; k < numprecincts;) {
              var packet = createPacket(resolution, k, l);
              k++;
              return packet;
            }
            k = 0;
          }
          i = 0;
        }
        r = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function ResolutionLayerComponentPositionIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var maxDecompositionLevelsCount = 0;
    for (var q = 0; q < componentsCount; q++) {
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
    }
    var r = 0,
        l = 0,
        i = 0,
        k = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; r <= maxDecompositionLevelsCount; r++) {
        for (; l < layersCount; l++) {
          for (; i < componentsCount; i++) {
            var component = tile.components[i];
            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }
            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;
            for (; k < numprecincts;) {
              var packet = createPacket(resolution, k, l);
              k++;
              return packet;
            }
            k = 0;
          }
          i = 0;
        }
        l = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function ResolutionPositionComponentLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var l, r, c, p;
    var maxDecompositionLevelsCount = 0;
    for (c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, component.codingStyleParameters.decompositionLevelsCount);
    }
    var maxNumPrecinctsInLevel = new Int32Array(maxDecompositionLevelsCount + 1);
    for (r = 0; r <= maxDecompositionLevelsCount; ++r) {
      var maxNumPrecincts = 0;
      for (c = 0; c < componentsCount; ++c) {
        var resolutions = tile.components[c].resolutions;
        if (r < resolutions.length) {
          maxNumPrecincts = Math.max(maxNumPrecincts, resolutions[r].precinctParameters.numprecincts);
        }
      }
      maxNumPrecinctsInLevel[r] = maxNumPrecincts;
    }
    l = 0;
    r = 0;
    c = 0;
    p = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; r <= maxDecompositionLevelsCount; r++) {
        for (; p < maxNumPrecinctsInLevel[r]; p++) {
          for (; c < componentsCount; c++) {
            var component = tile.components[c];
            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }
            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;
            if (p >= numprecincts) {
              continue;
            }
            for (; l < layersCount;) {
              var packet = createPacket(resolution, p, l);
              l++;
              return packet;
            }
            l = 0;
          }
          c = 0;
        }
        p = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function PositionComponentResolutionLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var precinctsSizes = getPrecinctSizesInImageScale(tile);
    var precinctsIterationSizes = precinctsSizes;
    var l = 0,
        r = 0,
        c = 0,
        px = 0,
        py = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; py < precinctsIterationSizes.maxNumHigh; py++) {
        for (; px < precinctsIterationSizes.maxNumWide; px++) {
          for (; c < componentsCount; c++) {
            var component = tile.components[c];
            var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
            for (; r <= decompositionLevelsCount; r++) {
              var resolution = component.resolutions[r];
              var sizeInImageScale = precinctsSizes.components[c].resolutions[r];
              var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);
              if (k === null) {
                continue;
              }
              for (; l < layersCount;) {
                var packet = createPacket(resolution, k, l);
                l++;
                return packet;
              }
              l = 0;
            }
            r = 0;
          }
          c = 0;
        }
        px = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function ComponentPositionResolutionLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var precinctsSizes = getPrecinctSizesInImageScale(tile);
    var l = 0,
        r = 0,
        c = 0,
        px = 0,
        py = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; c < componentsCount; ++c) {
        var component = tile.components[c];
        var precinctsIterationSizes = precinctsSizes.components[c];
        var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
        for (; py < precinctsIterationSizes.maxNumHigh; py++) {
          for (; px < precinctsIterationSizes.maxNumWide; px++) {
            for (; r <= decompositionLevelsCount; r++) {
              var resolution = component.resolutions[r];
              var sizeInImageScale = precinctsIterationSizes.resolutions[r];
              var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);
              if (k === null) {
                continue;
              }
              for (; l < layersCount;) {
                var packet = createPacket(resolution, k, l);
                l++;
                return packet;
              }
              l = 0;
            }
            r = 0;
          }
          px = 0;
        }
        py = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function getPrecinctIndexIfExist(pxIndex, pyIndex, sizeInImageScale, precinctIterationSizes, resolution) {
    var posX = pxIndex * precinctIterationSizes.minWidth;
    var posY = pyIndex * precinctIterationSizes.minHeight;
    if (posX % sizeInImageScale.width !== 0 || posY % sizeInImageScale.height !== 0) {
      return null;
    }
    var startPrecinctRowIndex = posY / sizeInImageScale.width * resolution.precinctParameters.numprecinctswide;
    return posX / sizeInImageScale.height + startPrecinctRowIndex;
  }
  function getPrecinctSizesInImageScale(tile) {
    var componentsCount = tile.components.length;
    var minWidth = Number.MAX_VALUE;
    var minHeight = Number.MAX_VALUE;
    var maxNumWide = 0;
    var maxNumHigh = 0;
    var sizePerComponent = new Array(componentsCount);
    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
      var sizePerResolution = new Array(decompositionLevelsCount + 1);
      var minWidthCurrentComponent = Number.MAX_VALUE;
      var minHeightCurrentComponent = Number.MAX_VALUE;
      var maxNumWideCurrentComponent = 0;
      var maxNumHighCurrentComponent = 0;
      var scale = 1;
      for (var r = decompositionLevelsCount; r >= 0; --r) {
        var resolution = component.resolutions[r];
        var widthCurrentResolution = scale * resolution.precinctParameters.precinctWidth;
        var heightCurrentResolution = scale * resolution.precinctParameters.precinctHeight;
        minWidthCurrentComponent = Math.min(minWidthCurrentComponent, widthCurrentResolution);
        minHeightCurrentComponent = Math.min(minHeightCurrentComponent, heightCurrentResolution);
        maxNumWideCurrentComponent = Math.max(maxNumWideCurrentComponent, resolution.precinctParameters.numprecinctswide);
        maxNumHighCurrentComponent = Math.max(maxNumHighCurrentComponent, resolution.precinctParameters.numprecinctshigh);
        sizePerResolution[r] = {
          width: widthCurrentResolution,
          height: heightCurrentResolution
        };
        scale <<= 1;
      }
      minWidth = Math.min(minWidth, minWidthCurrentComponent);
      minHeight = Math.min(minHeight, minHeightCurrentComponent);
      maxNumWide = Math.max(maxNumWide, maxNumWideCurrentComponent);
      maxNumHigh = Math.max(maxNumHigh, maxNumHighCurrentComponent);
      sizePerComponent[c] = {
        resolutions: sizePerResolution,
        minWidth: minWidthCurrentComponent,
        minHeight: minHeightCurrentComponent,
        maxNumWide: maxNumWideCurrentComponent,
        maxNumHigh: maxNumHighCurrentComponent
      };
    }
    return {
      components: sizePerComponent,
      minWidth: minWidth,
      minHeight: minHeight,
      maxNumWide: maxNumWide,
      maxNumHigh: maxNumHigh
    };
  }
  function buildPackets(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var componentsCount = siz.Csiz;
    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
      var resolutions = [];
      var subbands = [];
      for (var r = 0; r <= decompositionLevelsCount; r++) {
        var blocksDimensions = getBlocksDimensions(context, component, r);
        var resolution = {};
        var scale = 1 << decompositionLevelsCount - r;
        resolution.trx0 = Math.ceil(component.tcx0 / scale);
        resolution.try0 = Math.ceil(component.tcy0 / scale);
        resolution.trx1 = Math.ceil(component.tcx1 / scale);
        resolution.try1 = Math.ceil(component.tcy1 / scale);
        resolution.resLevel = r;
        buildPrecincts(context, resolution, blocksDimensions);
        resolutions.push(resolution);
        var subband;
        if (r === 0) {
          subband = {};
          subband.type = 'LL';
          subband.tbx0 = Math.ceil(component.tcx0 / scale);
          subband.tby0 = Math.ceil(component.tcy0 / scale);
          subband.tbx1 = Math.ceil(component.tcx1 / scale);
          subband.tby1 = Math.ceil(component.tcy1 / scale);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolution.subbands = [subband];
        } else {
          var bscale = 1 << decompositionLevelsCount - r + 1;
          var resolutionSubbands = [];
          subband = {};
          subband.type = 'HL';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
          subband.tby0 = Math.ceil(component.tcy0 / bscale);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
          subband.tby1 = Math.ceil(component.tcy1 / bscale);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);
          subband = {};
          subband.type = 'LH';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale);
          subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale);
          subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);
          subband = {};
          subband.type = 'HH';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
          subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
          subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);
          resolution.subbands = resolutionSubbands;
        }
      }
      component.resolutions = resolutions;
      component.subbands = subbands;
    }
    var progressionOrder = tile.codingStyleDefaultParameters.progressionOrder;
    switch (progressionOrder) {
      case 0:
        tile.packetsIterator = new LayerResolutionComponentPositionIterator(context);
        break;
      case 1:
        tile.packetsIterator = new ResolutionLayerComponentPositionIterator(context);
        break;
      case 2:
        tile.packetsIterator = new ResolutionPositionComponentLayerIterator(context);
        break;
      case 3:
        tile.packetsIterator = new PositionComponentResolutionLayerIterator(context);
        break;
      case 4:
        tile.packetsIterator = new ComponentPositionResolutionLayerIterator(context);
        break;
      default:
        error('JPX Error: Unsupported progression order ' + progressionOrder);
    }
  }
  function parseTilePackets(context, data, offset, dataLength) {
    var position = 0;
    var buffer,
        bufferSize = 0,
        skipNextBit = false;
    function readBits(count) {
      while (bufferSize < count) {
        var b = data[offset + position];
        position++;
        if (skipNextBit) {
          buffer = buffer << 7 | b;
          bufferSize += 7;
          skipNextBit = false;
        } else {
          buffer = buffer << 8 | b;
          bufferSize += 8;
        }
        if (b === 0xFF) {
          skipNextBit = true;
        }
      }
      bufferSize -= count;
      return buffer >>> bufferSize & (1 << count) - 1;
    }
    function skipMarkerIfEqual(value) {
      if (data[offset + position - 1] === 0xFF && data[offset + position] === value) {
        skipBytes(1);
        return true;
      } else if (data[offset + position] === 0xFF && data[offset + position + 1] === value) {
        skipBytes(2);
        return true;
      }
      return false;
    }
    function skipBytes(count) {
      position += count;
    }
    function alignToByte() {
      bufferSize = 0;
      if (skipNextBit) {
        position++;
        skipNextBit = false;
      }
    }
    function readCodingpasses() {
      if (readBits(1) === 0) {
        return 1;
      }
      if (readBits(1) === 0) {
        return 2;
      }
      var value = readBits(2);
      if (value < 3) {
        return value + 3;
      }
      value = readBits(5);
      if (value < 31) {
        return value + 6;
      }
      value = readBits(7);
      return value + 37;
    }
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var sopMarkerUsed = context.COD.sopMarkerUsed;
    var ephMarkerUsed = context.COD.ephMarkerUsed;
    var packetsIterator = tile.packetsIterator;
    while (position < dataLength) {
      alignToByte();
      if (sopMarkerUsed && skipMarkerIfEqual(0x91)) {
        skipBytes(4);
      }
      var packet = packetsIterator.nextPacket();
      if (!readBits(1)) {
        continue;
      }
      var layerNumber = packet.layerNumber;
      var queue = [],
          codeblock;
      for (var i = 0, ii = packet.codeblocks.length; i < ii; i++) {
        codeblock = packet.codeblocks[i];
        var precinct = codeblock.precinct;
        var codeblockColumn = codeblock.cbx - precinct.cbxMin;
        var codeblockRow = codeblock.cby - precinct.cbyMin;
        var codeblockIncluded = false;
        var firstTimeInclusion = false;
        var valueReady;
        if (codeblock['included'] !== undefined) {
          codeblockIncluded = !!readBits(1);
        } else {
          precinct = codeblock.precinct;
          var inclusionTree, zeroBitPlanesTree;
          if (precinct['inclusionTree'] !== undefined) {
            inclusionTree = precinct.inclusionTree;
          } else {
            var width = precinct.cbxMax - precinct.cbxMin + 1;
            var height = precinct.cbyMax - precinct.cbyMin + 1;
            inclusionTree = new InclusionTree(width, height, layerNumber);
            zeroBitPlanesTree = new TagTree(width, height);
            precinct.inclusionTree = inclusionTree;
            precinct.zeroBitPlanesTree = zeroBitPlanesTree;
          }
          if (inclusionTree.reset(codeblockColumn, codeblockRow, layerNumber)) {
            while (true) {
              if (readBits(1)) {
                valueReady = !inclusionTree.nextLevel();
                if (valueReady) {
                  codeblock.included = true;
                  codeblockIncluded = firstTimeInclusion = true;
                  break;
                }
              } else {
                inclusionTree.incrementValue(layerNumber);
                break;
              }
            }
          }
        }
        if (!codeblockIncluded) {
          continue;
        }
        if (firstTimeInclusion) {
          zeroBitPlanesTree = precinct.zeroBitPlanesTree;
          zeroBitPlanesTree.reset(codeblockColumn, codeblockRow);
          while (true) {
            if (readBits(1)) {
              valueReady = !zeroBitPlanesTree.nextLevel();
              if (valueReady) {
                break;
              }
            } else {
              zeroBitPlanesTree.incrementValue();
            }
          }
          codeblock.zeroBitPlanes = zeroBitPlanesTree.value;
        }
        var codingpasses = readCodingpasses();
        while (readBits(1)) {
          codeblock.Lblock++;
        }
        var codingpassesLog2 = log2(codingpasses);
        var bits = (codingpasses < 1 << codingpassesLog2 ? codingpassesLog2 - 1 : codingpassesLog2) + codeblock.Lblock;
        var codedDataLength = readBits(bits);
        queue.push({
          codeblock: codeblock,
          codingpasses: codingpasses,
          dataLength: codedDataLength
        });
      }
      alignToByte();
      if (ephMarkerUsed) {
        skipMarkerIfEqual(0x92);
      }
      while (queue.length > 0) {
        var packetItem = queue.shift();
        codeblock = packetItem.codeblock;
        if (codeblock['data'] === undefined) {
          codeblock.data = [];
        }
        codeblock.data.push({
          data: data,
          start: offset + position,
          end: offset + position + packetItem.dataLength,
          codingpasses: packetItem.codingpasses
        });
        position += packetItem.dataLength;
      }
    }
    return position;
  }
  function copyCoefficients(coefficients, levelWidth, levelHeight, subband, delta, mb, reversible, segmentationSymbolUsed) {
    var x0 = subband.tbx0;
    var y0 = subband.tby0;
    var width = subband.tbx1 - subband.tbx0;
    var codeblocks = subband.codeblocks;
    var right = subband.type.charAt(0) === 'H' ? 1 : 0;
    var bottom = subband.type.charAt(1) === 'H' ? levelWidth : 0;
    for (var i = 0, ii = codeblocks.length; i < ii; ++i) {
      var codeblock = codeblocks[i];
      var blockWidth = codeblock.tbx1_ - codeblock.tbx0_;
      var blockHeight = codeblock.tby1_ - codeblock.tby0_;
      if (blockWidth === 0 || blockHeight === 0) {
        continue;
      }
      if (codeblock['data'] === undefined) {
        continue;
      }
      var bitModel, currentCodingpassType;
      bitModel = new BitModel(blockWidth, blockHeight, codeblock.subbandType, codeblock.zeroBitPlanes, mb);
      currentCodingpassType = 2;
      var data = codeblock.data,
          totalLength = 0,
          codingpasses = 0;
      var j, jj, dataItem;
      for (j = 0, jj = data.length; j < jj; j++) {
        dataItem = data[j];
        totalLength += dataItem.end - dataItem.start;
        codingpasses += dataItem.codingpasses;
      }
      var encodedData = new Uint8Array(totalLength);
      var position = 0;
      for (j = 0, jj = data.length; j < jj; j++) {
        dataItem = data[j];
        var chunk = dataItem.data.subarray(dataItem.start, dataItem.end);
        encodedData.set(chunk, position);
        position += chunk.length;
      }
      var decoder = new ArithmeticDecoder(encodedData, 0, totalLength);
      bitModel.setDecoder(decoder);
      for (j = 0; j < codingpasses; j++) {
        switch (currentCodingpassType) {
          case 0:
            bitModel.runSignificancePropagationPass();
            break;
          case 1:
            bitModel.runMagnitudeRefinementPass();
            break;
          case 2:
            bitModel.runCleanupPass();
            if (segmentationSymbolUsed) {
              bitModel.checkSegmentationSymbol();
            }
            break;
        }
        currentCodingpassType = (currentCodingpassType + 1) % 3;
      }
      var offset = codeblock.tbx0_ - x0 + (codeblock.tby0_ - y0) * width;
      var sign = bitModel.coefficentsSign;
      var magnitude = bitModel.coefficentsMagnitude;
      var bitsDecoded = bitModel.bitsDecoded;
      var magnitudeCorrection = reversible ? 0 : 0.5;
      var k, n, nb;
      position = 0;
      var interleave = subband.type !== 'LL';
      for (j = 0; j < blockHeight; j++) {
        var row = offset / width | 0;
        var levelOffset = 2 * row * (levelWidth - width) + right + bottom;
        for (k = 0; k < blockWidth; k++) {
          n = magnitude[position];
          if (n !== 0) {
            n = (n + magnitudeCorrection) * delta;
            if (sign[position] !== 0) {
              n = -n;
            }
            nb = bitsDecoded[position];
            var pos = interleave ? levelOffset + (offset << 1) : offset;
            if (reversible && nb >= mb) {
              coefficients[pos] = n;
            } else {
              coefficients[pos] = n * (1 << mb - nb);
            }
          }
          offset++;
          position++;
        }
        offset += width - blockWidth;
      }
    }
  }
  function transformTile(context, tile, c) {
    var component = tile.components[c];
    var codingStyleParameters = component.codingStyleParameters;
    var quantizationParameters = component.quantizationParameters;
    var decompositionLevelsCount = codingStyleParameters.decompositionLevelsCount;
    var spqcds = quantizationParameters.SPqcds;
    var scalarExpounded = quantizationParameters.scalarExpounded;
    var guardBits = quantizationParameters.guardBits;
    var segmentationSymbolUsed = codingStyleParameters.segmentationSymbolUsed;
    var precision = context.components[c].precision;
    var reversible = codingStyleParameters.reversibleTransformation;
    var transform = reversible ? new ReversibleTransform() : new IrreversibleTransform();
    var subbandCoefficients = [];
    var b = 0;
    for (var i = 0; i <= decompositionLevelsCount; i++) {
      var resolution = component.resolutions[i];
      var width = resolution.trx1 - resolution.trx0;
      var height = resolution.try1 - resolution.try0;
      var coefficients = new Float32Array(width * height);
      for (var j = 0, jj = resolution.subbands.length; j < jj; j++) {
        var mu, epsilon;
        if (!scalarExpounded) {
          mu = spqcds[0].mu;
          epsilon = spqcds[0].epsilon + (i > 0 ? 1 - i : 0);
        } else {
          mu = spqcds[b].mu;
          epsilon = spqcds[b].epsilon;
          b++;
        }
        var subband = resolution.subbands[j];
        var gainLog2 = SubbandsGainLog2[subband.type];
        var delta = reversible ? 1 : Math.pow(2, precision + gainLog2 - epsilon) * (1 + mu / 2048);
        var mb = guardBits + epsilon - 1;
        copyCoefficients(coefficients, width, height, subband, delta, mb, reversible, segmentationSymbolUsed);
      }
      subbandCoefficients.push({
        width: width,
        height: height,
        items: coefficients
      });
    }
    var result = transform.calculate(subbandCoefficients, component.tcx0, component.tcy0);
    return {
      left: component.tcx0,
      top: component.tcy0,
      width: result.width,
      height: result.height,
      items: result.items
    };
  }
  function transformComponents(context) {
    var siz = context.SIZ;
    var components = context.components;
    var componentsCount = siz.Csiz;
    var resultImages = [];
    for (var i = 0, ii = context.tiles.length; i < ii; i++) {
      var tile = context.tiles[i];
      var transformedTiles = [];
      var c;
      for (c = 0; c < componentsCount; c++) {
        transformedTiles[c] = transformTile(context, tile, c);
      }
      var tile0 = transformedTiles[0];
      var out = new Uint8Array(tile0.items.length * componentsCount);
      var result = {
        left: tile0.left,
        top: tile0.top,
        width: tile0.width,
        height: tile0.height,
        items: out
      };
      var shift, offset, max, min, maxK;
      var pos = 0,
          j,
          jj,
          y0,
          y1,
          y2,
          r,
          g,
          b,
          k,
          val;
      if (tile.codingStyleDefaultParameters.multipleComponentTransform) {
        var fourComponents = componentsCount === 4;
        var y0items = transformedTiles[0].items;
        var y1items = transformedTiles[1].items;
        var y2items = transformedTiles[2].items;
        var y3items = fourComponents ? transformedTiles[3].items : null;
        shift = components[0].precision - 8;
        offset = (128 << shift) + 0.5;
        max = 255 * (1 << shift);
        maxK = max * 0.5;
        min = -maxK;
        var component0 = tile.components[0];
        var alpha01 = componentsCount - 3;
        jj = y0items.length;
        if (!component0.codingStyleParameters.reversibleTransformation) {
          for (j = 0; j < jj; j++, pos += alpha01) {
            y0 = y0items[j] + offset;
            y1 = y1items[j];
            y2 = y2items[j];
            r = y0 + 1.402 * y2;
            g = y0 - 0.34413 * y1 - 0.71414 * y2;
            b = y0 + 1.772 * y1;
            out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
            out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
            out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
          }
        } else {
          for (j = 0; j < jj; j++, pos += alpha01) {
            y0 = y0items[j] + offset;
            y1 = y1items[j];
            y2 = y2items[j];
            g = y0 - (y2 + y1 >> 2);
            r = g + y2;
            b = g + y1;
            out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
            out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
            out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
          }
        }
        if (fourComponents) {
          for (j = 0, pos = 3; j < jj; j++, pos += 4) {
            k = y3items[j];
            out[pos] = k <= min ? 0 : k >= maxK ? 255 : k + offset >> shift;
          }
        }
      } else {
        for (c = 0; c < componentsCount; c++) {
          var items = transformedTiles[c].items;
          shift = components[c].precision - 8;
          offset = (128 << shift) + 0.5;
          max = 127.5 * (1 << shift);
          min = -max;
          for (pos = c, j = 0, jj = items.length; j < jj; j++) {
            val = items[j];
            out[pos] = val <= min ? 0 : val >= max ? 255 : val + offset >> shift;
            pos += componentsCount;
          }
        }
      }
      resultImages.push(result);
    }
    return resultImages;
  }
  function initializeTile(context, tileIndex) {
    var siz = context.SIZ;
    var componentsCount = siz.Csiz;
    var tile = context.tiles[tileIndex];
    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var qcdOrQcc = context.currentTile.QCC[c] !== undefined ? context.currentTile.QCC[c] : context.currentTile.QCD;
      component.quantizationParameters = qcdOrQcc;
      var codOrCoc = context.currentTile.COC[c] !== undefined ? context.currentTile.COC[c] : context.currentTile.COD;
      component.codingStyleParameters = codOrCoc;
    }
    tile.codingStyleDefaultParameters = context.currentTile.COD;
  }
  var TagTree = function TagTreeClosure() {
    function TagTree(width, height) {
      var levelsLength = log2(Math.max(width, height)) + 1;
      this.levels = [];
      for (var i = 0; i < levelsLength; i++) {
        var level = {
          width: width,
          height: height,
          items: []
        };
        this.levels.push(level);
        width = Math.ceil(width / 2);
        height = Math.ceil(height / 2);
      }
    }
    TagTree.prototype = {
      reset: function TagTree_reset(i, j) {
        var currentLevel = 0,
            value = 0,
            level;
        while (currentLevel < this.levels.length) {
          level = this.levels[currentLevel];
          var index = i + j * level.width;
          if (level.items[index] !== undefined) {
            value = level.items[index];
            break;
          }
          level.index = index;
          i >>= 1;
          j >>= 1;
          currentLevel++;
        }
        currentLevel--;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        this.currentLevel = currentLevel;
        delete this.value;
      },
      incrementValue: function TagTree_incrementValue() {
        var level = this.levels[this.currentLevel];
        level.items[level.index]++;
      },
      nextLevel: function TagTree_nextLevel() {
        var currentLevel = this.currentLevel;
        var level = this.levels[currentLevel];
        var value = level.items[level.index];
        currentLevel--;
        if (currentLevel < 0) {
          this.value = value;
          return false;
        }
        this.currentLevel = currentLevel;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        return true;
      }
    };
    return TagTree;
  }();
  var InclusionTree = function InclusionTreeClosure() {
    function InclusionTree(width, height, defaultValue) {
      var levelsLength = log2(Math.max(width, height)) + 1;
      this.levels = [];
      for (var i = 0; i < levelsLength; i++) {
        var items = new Uint8Array(width * height);
        for (var j = 0, jj = items.length; j < jj; j++) {
          items[j] = defaultValue;
        }
        var level = {
          width: width,
          height: height,
          items: items
        };
        this.levels.push(level);
        width = Math.ceil(width / 2);
        height = Math.ceil(height / 2);
      }
    }
    InclusionTree.prototype = {
      reset: function InclusionTree_reset(i, j, stopValue) {
        var currentLevel = 0;
        while (currentLevel < this.levels.length) {
          var level = this.levels[currentLevel];
          var index = i + j * level.width;
          level.index = index;
          var value = level.items[index];
          if (value === 0xFF) {
            break;
          }
          if (value > stopValue) {
            this.currentLevel = currentLevel;
            this.propagateValues();
            return false;
          }
          i >>= 1;
          j >>= 1;
          currentLevel++;
        }
        this.currentLevel = currentLevel - 1;
        return true;
      },
      incrementValue: function InclusionTree_incrementValue(stopValue) {
        var level = this.levels[this.currentLevel];
        level.items[level.index] = stopValue + 1;
        this.propagateValues();
      },
      propagateValues: function InclusionTree_propagateValues() {
        var levelIndex = this.currentLevel;
        var level = this.levels[levelIndex];
        var currentValue = level.items[level.index];
        while (--levelIndex >= 0) {
          level = this.levels[levelIndex];
          level.items[level.index] = currentValue;
        }
      },
      nextLevel: function InclusionTree_nextLevel() {
        var currentLevel = this.currentLevel;
        var level = this.levels[currentLevel];
        var value = level.items[level.index];
        level.items[level.index] = 0xFF;
        currentLevel--;
        if (currentLevel < 0) {
          return false;
        }
        this.currentLevel = currentLevel;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        return true;
      }
    };
    return InclusionTree;
  }();
  var BitModel = function BitModelClosure() {
    var UNIFORM_CONTEXT = 17;
    var RUNLENGTH_CONTEXT = 18;
    var LLAndLHContextsLabel = new Uint8Array([0, 5, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 1, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8]);
    var HLContextLabel = new Uint8Array([0, 3, 4, 0, 5, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 1, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8]);
    var HHContextLabel = new Uint8Array([0, 1, 2, 0, 1, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 4, 5, 0, 4, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 6, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8]);
    function BitModel(width, height, subband, zeroBitPlanes, mb) {
      this.width = width;
      this.height = height;
      this.contextLabelTable = subband === 'HH' ? HHContextLabel : subband === 'HL' ? HLContextLabel : LLAndLHContextsLabel;
      var coefficientCount = width * height;
      this.neighborsSignificance = new Uint8Array(coefficientCount);
      this.coefficentsSign = new Uint8Array(coefficientCount);
      this.coefficentsMagnitude = mb > 14 ? new Uint32Array(coefficientCount) : mb > 6 ? new Uint16Array(coefficientCount) : new Uint8Array(coefficientCount);
      this.processingFlags = new Uint8Array(coefficientCount);
      var bitsDecoded = new Uint8Array(coefficientCount);
      if (zeroBitPlanes !== 0) {
        for (var i = 0; i < coefficientCount; i++) {
          bitsDecoded[i] = zeroBitPlanes;
        }
      }
      this.bitsDecoded = bitsDecoded;
      this.reset();
    }
    BitModel.prototype = {
      setDecoder: function BitModel_setDecoder(decoder) {
        this.decoder = decoder;
      },
      reset: function BitModel_reset() {
        this.contexts = new Int8Array(19);
        this.contexts[0] = 4 << 1 | 0;
        this.contexts[UNIFORM_CONTEXT] = 46 << 1 | 0;
        this.contexts[RUNLENGTH_CONTEXT] = 3 << 1 | 0;
      },
      setNeighborsSignificance: function BitModel_setNeighborsSignificance(row, column, index) {
        var neighborsSignificance = this.neighborsSignificance;
        var width = this.width,
            height = this.height;
        var left = column > 0;
        var right = column + 1 < width;
        var i;
        if (row > 0) {
          i = index - width;
          if (left) {
            neighborsSignificance[i - 1] += 0x10;
          }
          if (right) {
            neighborsSignificance[i + 1] += 0x10;
          }
          neighborsSignificance[i] += 0x04;
        }
        if (row + 1 < height) {
          i = index + width;
          if (left) {
            neighborsSignificance[i - 1] += 0x10;
          }
          if (right) {
            neighborsSignificance[i + 1] += 0x10;
          }
          neighborsSignificance[i] += 0x04;
        }
        if (left) {
          neighborsSignificance[index - 1] += 0x01;
        }
        if (right) {
          neighborsSignificance[index + 1] += 0x01;
        }
        neighborsSignificance[index] |= 0x80;
      },
      runSignificancePropagationPass: function BitModel_runSignificancePropagationPass() {
        var decoder = this.decoder;
        var width = this.width,
            height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var neighborsSignificance = this.neighborsSignificance;
        var processingFlags = this.processingFlags;
        var contexts = this.contexts;
        var labels = this.contextLabelTable;
        var bitsDecoded = this.bitsDecoded;
        var processedInverseMask = ~1;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;
        for (var i0 = 0; i0 < height; i0 += 4) {
          for (var j = 0; j < width; j++) {
            var index = i0 * width + j;
            for (var i1 = 0; i1 < 4; i1++, index += width) {
              var i = i0 + i1;
              if (i >= height) {
                break;
              }
              processingFlags[index] &= processedInverseMask;
              if (coefficentsMagnitude[index] || !neighborsSignificance[index]) {
                continue;
              }
              var contextLabel = labels[neighborsSignificance[index]];
              var decision = decoder.readBit(contexts, contextLabel);
              if (decision) {
                var sign = this.decodeSignBit(i, j, index);
                coefficentsSign[index] = sign;
                coefficentsMagnitude[index] = 1;
                this.setNeighborsSignificance(i, j, index);
                processingFlags[index] |= firstMagnitudeBitMask;
              }
              bitsDecoded[index]++;
              processingFlags[index] |= processedMask;
            }
          }
        }
      },
      decodeSignBit: function BitModel_decodeSignBit(row, column, index) {
        var width = this.width,
            height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var contribution, sign0, sign1, significance1;
        var contextLabel, decoded;
        significance1 = column > 0 && coefficentsMagnitude[index - 1] !== 0;
        if (column + 1 < width && coefficentsMagnitude[index + 1] !== 0) {
          sign1 = coefficentsSign[index + 1];
          if (significance1) {
            sign0 = coefficentsSign[index - 1];
            contribution = 1 - sign1 - sign0;
          } else {
            contribution = 1 - sign1 - sign1;
          }
        } else if (significance1) {
          sign0 = coefficentsSign[index - 1];
          contribution = 1 - sign0 - sign0;
        } else {
          contribution = 0;
        }
        var horizontalContribution = 3 * contribution;
        significance1 = row > 0 && coefficentsMagnitude[index - width] !== 0;
        if (row + 1 < height && coefficentsMagnitude[index + width] !== 0) {
          sign1 = coefficentsSign[index + width];
          if (significance1) {
            sign0 = coefficentsSign[index - width];
            contribution = 1 - sign1 - sign0 + horizontalContribution;
          } else {
            contribution = 1 - sign1 - sign1 + horizontalContribution;
          }
        } else if (significance1) {
          sign0 = coefficentsSign[index - width];
          contribution = 1 - sign0 - sign0 + horizontalContribution;
        } else {
          contribution = horizontalContribution;
        }
        if (contribution >= 0) {
          contextLabel = 9 + contribution;
          decoded = this.decoder.readBit(this.contexts, contextLabel);
        } else {
          contextLabel = 9 - contribution;
          decoded = this.decoder.readBit(this.contexts, contextLabel) ^ 1;
        }
        return decoded;
      },
      runMagnitudeRefinementPass: function BitModel_runMagnitudeRefinementPass() {
        var decoder = this.decoder;
        var width = this.width,
            height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var neighborsSignificance = this.neighborsSignificance;
        var contexts = this.contexts;
        var bitsDecoded = this.bitsDecoded;
        var processingFlags = this.processingFlags;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;
        var length = width * height;
        var width4 = width * 4;
        for (var index0 = 0, indexNext; index0 < length; index0 = indexNext) {
          indexNext = Math.min(length, index0 + width4);
          for (var j = 0; j < width; j++) {
            for (var index = index0 + j; index < indexNext; index += width) {
              if (!coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
                continue;
              }
              var contextLabel = 16;
              if ((processingFlags[index] & firstMagnitudeBitMask) !== 0) {
                processingFlags[index] ^= firstMagnitudeBitMask;
                var significance = neighborsSignificance[index] & 127;
                contextLabel = significance === 0 ? 15 : 14;
              }
              var bit = decoder.readBit(contexts, contextLabel);
              coefficentsMagnitude[index] = coefficentsMagnitude[index] << 1 | bit;
              bitsDecoded[index]++;
              processingFlags[index] |= processedMask;
            }
          }
        }
      },
      runCleanupPass: function BitModel_runCleanupPass() {
        var decoder = this.decoder;
        var width = this.width,
            height = this.height;
        var neighborsSignificance = this.neighborsSignificance;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var contexts = this.contexts;
        var labels = this.contextLabelTable;
        var bitsDecoded = this.bitsDecoded;
        var processingFlags = this.processingFlags;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;
        var oneRowDown = width;
        var twoRowsDown = width * 2;
        var threeRowsDown = width * 3;
        var iNext;
        for (var i0 = 0; i0 < height; i0 = iNext) {
          iNext = Math.min(i0 + 4, height);
          var indexBase = i0 * width;
          var checkAllEmpty = i0 + 3 < height;
          for (var j = 0; j < width; j++) {
            var index0 = indexBase + j;
            var allEmpty = checkAllEmpty && processingFlags[index0] === 0 && processingFlags[index0 + oneRowDown] === 0 && processingFlags[index0 + twoRowsDown] === 0 && processingFlags[index0 + threeRowsDown] === 0 && neighborsSignificance[index0] === 0 && neighborsSignificance[index0 + oneRowDown] === 0 && neighborsSignificance[index0 + twoRowsDown] === 0 && neighborsSignificance[index0 + threeRowsDown] === 0;
            var i1 = 0,
                index = index0;
            var i = i0,
                sign;
            if (allEmpty) {
              var hasSignificantCoefficent = decoder.readBit(contexts, RUNLENGTH_CONTEXT);
              if (!hasSignificantCoefficent) {
                bitsDecoded[index0]++;
                bitsDecoded[index0 + oneRowDown]++;
                bitsDecoded[index0 + twoRowsDown]++;
                bitsDecoded[index0 + threeRowsDown]++;
                continue;
              }
              i1 = decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);
              if (i1 !== 0) {
                i = i0 + i1;
                index += i1 * width;
              }
              sign = this.decodeSignBit(i, j, index);
              coefficentsSign[index] = sign;
              coefficentsMagnitude[index] = 1;
              this.setNeighborsSignificance(i, j, index);
              processingFlags[index] |= firstMagnitudeBitMask;
              index = index0;
              for (var i2 = i0; i2 <= i; i2++, index += width) {
                bitsDecoded[index]++;
              }
              i1++;
            }
            for (i = i0 + i1; i < iNext; i++, index += width) {
              if (coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
                continue;
              }
              var contextLabel = labels[neighborsSignificance[index]];
              var decision = decoder.readBit(contexts, contextLabel);
              if (decision === 1) {
                sign = this.decodeSignBit(i, j, index);
                coefficentsSign[index] = sign;
                coefficentsMagnitude[index] = 1;
                this.setNeighborsSignificance(i, j, index);
                processingFlags[index] |= firstMagnitudeBitMask;
              }
              bitsDecoded[index]++;
            }
          }
        }
      },
      checkSegmentationSymbol: function BitModel_checkSegmentationSymbol() {
        var decoder = this.decoder;
        var contexts = this.contexts;
        var symbol = decoder.readBit(contexts, UNIFORM_CONTEXT) << 3 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 2 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);
        if (symbol !== 0xA) {
          error('JPX Error: Invalid segmentation symbol');
        }
      }
    };
    return BitModel;
  }();
  var Transform = function TransformClosure() {
    function Transform() {}
    Transform.prototype.calculate = function transformCalculate(subbands, u0, v0) {
      var ll = subbands[0];
      for (var i = 1, ii = subbands.length; i < ii; i++) {
        ll = this.iterate(ll, subbands[i], u0, v0);
      }
      return ll;
    };
    Transform.prototype.extend = function extend(buffer, offset, size) {
      var i1 = offset - 1,
          j1 = offset + 1;
      var i2 = offset + size - 2,
          j2 = offset + size;
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1] = buffer[j1];
      buffer[j2] = buffer[i2];
    };
    Transform.prototype.iterate = function Transform_iterate(ll, hl_lh_hh, u0, v0) {
      var llWidth = ll.width,
          llHeight = ll.height,
          llItems = ll.items;
      var width = hl_lh_hh.width;
      var height = hl_lh_hh.height;
      var items = hl_lh_hh.items;
      var i, j, k, l, u, v;
      for (k = 0, i = 0; i < llHeight; i++) {
        l = i * 2 * width;
        for (j = 0; j < llWidth; j++, k++, l += 2) {
          items[l] = llItems[k];
        }
      }
      llItems = ll.items = null;
      var bufferPadding = 4;
      var rowBuffer = new Float32Array(width + 2 * bufferPadding);
      if (width === 1) {
        if ((u0 & 1) !== 0) {
          for (v = 0, k = 0; v < height; v++, k += width) {
            items[k] *= 0.5;
          }
        }
      } else {
        for (v = 0, k = 0; v < height; v++, k += width) {
          rowBuffer.set(items.subarray(k, k + width), bufferPadding);
          this.extend(rowBuffer, bufferPadding, width);
          this.filter(rowBuffer, bufferPadding, width);
          items.set(rowBuffer.subarray(bufferPadding, bufferPadding + width), k);
        }
      }
      var numBuffers = 16;
      var colBuffers = [];
      for (i = 0; i < numBuffers; i++) {
        colBuffers.push(new Float32Array(height + 2 * bufferPadding));
      }
      var b,
          currentBuffer = 0;
      ll = bufferPadding + height;
      if (height === 1) {
        if ((v0 & 1) !== 0) {
          for (u = 0; u < width; u++) {
            items[u] *= 0.5;
          }
        }
      } else {
        for (u = 0; u < width; u++) {
          if (currentBuffer === 0) {
            numBuffers = Math.min(width - u, numBuffers);
            for (k = u, l = bufferPadding; l < ll; k += width, l++) {
              for (b = 0; b < numBuffers; b++) {
                colBuffers[b][l] = items[k + b];
              }
            }
            currentBuffer = numBuffers;
          }
          currentBuffer--;
          var buffer = colBuffers[currentBuffer];
          this.extend(buffer, bufferPadding, height);
          this.filter(buffer, bufferPadding, height);
          if (currentBuffer === 0) {
            k = u - numBuffers + 1;
            for (l = bufferPadding; l < ll; k += width, l++) {
              for (b = 0; b < numBuffers; b++) {
                items[k + b] = colBuffers[b][l];
              }
            }
          }
        }
      }
      return {
        width: width,
        height: height,
        items: items
      };
    };
    return Transform;
  }();
  var IrreversibleTransform = function IrreversibleTransformClosure() {
    function IrreversibleTransform() {
      Transform.call(this);
    }
    IrreversibleTransform.prototype = Object.create(Transform.prototype);
    IrreversibleTransform.prototype.filter = function irreversibleTransformFilter(x, offset, length) {
      var len = length >> 1;
      offset = offset | 0;
      var j, n, current, next;
      var alpha = -1.586134342059924;
      var beta = -0.052980118572961;
      var gamma = 0.882911075530934;
      var delta = 0.443506852043971;
      var K = 1.230174104914001;
      var K_ = 1 / K;
      j = offset - 3;
      for (n = len + 4; n--; j += 2) {
        x[j] *= K_;
      }
      j = offset - 2;
      current = delta * x[j - 1];
      for (n = len + 3; n--; j += 2) {
        next = delta * x[j + 1];
        x[j] = K * x[j] - current - next;
        if (n--) {
          j += 2;
          current = delta * x[j + 1];
          x[j] = K * x[j] - current - next;
        } else {
          break;
        }
      }
      j = offset - 1;
      current = gamma * x[j - 1];
      for (n = len + 2; n--; j += 2) {
        next = gamma * x[j + 1];
        x[j] -= current + next;
        if (n--) {
          j += 2;
          current = gamma * x[j + 1];
          x[j] -= current + next;
        } else {
          break;
        }
      }
      j = offset;
      current = beta * x[j - 1];
      for (n = len + 1; n--; j += 2) {
        next = beta * x[j + 1];
        x[j] -= current + next;
        if (n--) {
          j += 2;
          current = beta * x[j + 1];
          x[j] -= current + next;
        } else {
          break;
        }
      }
      if (len !== 0) {
        j = offset + 1;
        current = alpha * x[j - 1];
        for (n = len; n--; j += 2) {
          next = alpha * x[j + 1];
          x[j] -= current + next;
          if (n--) {
            j += 2;
            current = alpha * x[j + 1];
            x[j] -= current + next;
          } else {
            break;
          }
        }
      }
    };
    return IrreversibleTransform;
  }();
  var ReversibleTransform = function ReversibleTransformClosure() {
    function ReversibleTransform() {
      Transform.call(this);
    }
    ReversibleTransform.prototype = Object.create(Transform.prototype);
    ReversibleTransform.prototype.filter = function reversibleTransformFilter(x, offset, length) {
      var len = length >> 1;
      offset = offset | 0;
      var j, n;
      for (j = offset, n = len + 1; n--; j += 2) {
        x[j] -= x[j - 1] + x[j + 1] + 2 >> 2;
      }
      for (j = offset + 1, n = len; n--; j += 2) {
        x[j] += x[j - 1] + x[j + 1] >> 1;
      }
    };
    return ReversibleTransform;
  }();
  return JpxImage;
}();

	
	"use strict";
    
	var Jbig2Image = function Jbig2ImageClosure() {
  function ContextCache() {}
  ContextCache.prototype = {
    getContexts: function (id) {
      if (id in this) {
        return this[id];
      }
      return this[id] = new Int8Array(1 << 16);
    }
  };
  function DecodingContext(data, start, end) {
    this.data = data;
    this.start = start;
    this.end = end;
  }
  DecodingContext.prototype = {
    get decoder() {
      var decoder = new ArithmeticDecoder(this.data, this.start, this.end);
      return shadow(this, 'decoder', decoder);
    },
    get contextCache() {
      var cache = new ContextCache();
      return shadow(this, 'contextCache', cache);
    }
  };
  function decodeInteger(contextCache, procedure, decoder) {
    var contexts = contextCache.getContexts(procedure);
    var prev = 1;
    function readBits(length) {
      var v = 0;
      for (var i = 0; i < length; i++) {
        var bit = decoder.readBit(contexts, prev);
        prev = prev < 256 ? prev << 1 | bit : (prev << 1 | bit) & 511 | 256;
        v = v << 1 | bit;
      }
      return v >>> 0;
    }
    var sign = readBits(1);
    var value = readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(32) + 4436 : readBits(12) + 340 : readBits(8) + 84 : readBits(6) + 20 : readBits(4) + 4 : readBits(2);
    return sign === 0 ? value : value > 0 ? -value : null;
  }
  function decodeIAID(contextCache, decoder, codeLength) {
    var contexts = contextCache.getContexts('IAID');
    var prev = 1;
    for (var i = 0; i < codeLength; i++) {
      var bit = decoder.readBit(contexts, prev);
      prev = prev << 1 | bit;
    }
    if (codeLength < 31) {
      return prev & (1 << codeLength) - 1;
    }
    return prev & 0x7FFFFFFF;
  }
  var SegmentTypes = ['SymbolDictionary', null, null, null, 'IntermediateTextRegion', null, 'ImmediateTextRegion', 'ImmediateLosslessTextRegion', null, null, null, null, null, null, null, null, 'patternDictionary', null, null, null, 'IntermediateHalftoneRegion', null, 'ImmediateHalftoneRegion', 'ImmediateLosslessHalftoneRegion', null, null, null, null, null, null, null, null, null, null, null, null, 'IntermediateGenericRegion', null, 'ImmediateGenericRegion', 'ImmediateLosslessGenericRegion', 'IntermediateGenericRefinementRegion', null, 'ImmediateGenericRefinementRegion', 'ImmediateLosslessGenericRefinementRegion', null, null, null, null, 'PageInformation', 'EndOfPage', 'EndOfStripe', 'EndOfFile', 'Profiles', 'Tables', null, null, null, null, null, null, null, null, 'Extension'];
  var CodingTemplates = [[{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: 2,
    y: -1
  }, {
    x: -4,
    y: 0
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: 2,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: 2,
    y: -1
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -3,
    y: -1
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: -4,
    y: 0
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }]];
  var RefinementTemplates = [{
    coding: [{
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }],
    reference: [{
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: -1,
      y: 1
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }]
  }, {
    coding: [{
      x: -1,
      y: -1
    }, {
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }],
    reference: [{
      x: 0,
      y: -1
    }, {
      x: -1,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }]
  }];
  var ReusedContexts = [0x9B25, 0x0795, 0x00E5, 0x0195];
  var RefinementReusedContexts = [0x0020, 0x0008];
  function decodeBitmapTemplate0(width, height, decodingContext) {
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GB');
    var contextLabel,
        i,
        j,
        pixel,
        row,
        row1,
        row2,
        bitmap = [];
    var OLD_PIXEL_MASK = 0x7BF7;
    for (i = 0; i < height; i++) {
      row = bitmap[i] = new Uint8Array(width);
      row1 = i < 1 ? row : bitmap[i - 1];
      row2 = i < 2 ? row : bitmap[i - 2];
      contextLabel = row2[0] << 13 | row2[1] << 12 | row2[2] << 11 | row1[0] << 7 | row1[1] << 6 | row1[2] << 5 | row1[3] << 4;
      for (j = 0; j < width; j++) {
        row[j] = pixel = decoder.readBit(contexts, contextLabel);
        contextLabel = (contextLabel & OLD_PIXEL_MASK) << 1 | (j + 3 < width ? row2[j + 3] << 11 : 0) | (j + 4 < width ? row1[j + 4] << 4 : 0) | pixel;
      }
    }
    return bitmap;
  }
  function decodeBitmap(mmr, width, height, templateIndex, prediction, skip, at, decodingContext) {
    if (mmr) {
      error('JBIG2 error: MMR encoding is not supported');
    }
    if (templateIndex === 0 && !skip && !prediction && at.length === 4 && at[0].x === 3 && at[0].y === -1 && at[1].x === -3 && at[1].y === -1 && at[2].x === 2 && at[2].y === -2 && at[3].x === -2 && at[3].y === -2) {
      return decodeBitmapTemplate0(width, height, decodingContext);
    }
    var useskip = !!skip;
    var template = CodingTemplates[templateIndex].concat(at);
    template.sort(function (a, b) {
      return a.y - b.y || a.x - b.x;
    });
    var templateLength = template.length;
    var templateX = new Int8Array(templateLength);
    var templateY = new Int8Array(templateLength);
    var changingTemplateEntries = [];
    var reuseMask = 0,
        minX = 0,
        maxX = 0,
        minY = 0;
    var c, k;
    for (k = 0; k < templateLength; k++) {
      templateX[k] = template[k].x;
      templateY[k] = template[k].y;
      minX = Math.min(minX, template[k].x);
      maxX = Math.max(maxX, template[k].x);
      minY = Math.min(minY, template[k].y);
      if (k < templateLength - 1 && template[k].y === template[k + 1].y && template[k].x === template[k + 1].x - 1) {
        reuseMask |= 1 << templateLength - 1 - k;
      } else {
        changingTemplateEntries.push(k);
      }
    }
    var changingEntriesLength = changingTemplateEntries.length;
    var changingTemplateX = new Int8Array(changingEntriesLength);
    var changingTemplateY = new Int8Array(changingEntriesLength);
    var changingTemplateBit = new Uint16Array(changingEntriesLength);
    for (c = 0; c < changingEntriesLength; c++) {
      k = changingTemplateEntries[c];
      changingTemplateX[c] = template[k].x;
      changingTemplateY[c] = template[k].y;
      changingTemplateBit[c] = 1 << templateLength - 1 - k;
    }
    var sbb_left = -minX;
    var sbb_top = -minY;
    var sbb_right = width - maxX;
    var pseudoPixelContext = ReusedContexts[templateIndex];
    var row = new Uint8Array(width);
    var bitmap = [];
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GB');
    var ltp = 0,
        j,
        i0,
        j0,
        contextLabel = 0,
        bit,
        shift;
    for (var i = 0; i < height; i++) {
      if (prediction) {
        var sltp = decoder.readBit(contexts, pseudoPixelContext);
        ltp ^= sltp;
        if (ltp) {
          bitmap.push(row);
          continue;
        }
      }
      row = new Uint8Array(row);
      bitmap.push(row);
      for (j = 0; j < width; j++) {
        if (useskip && skip[i][j]) {
          row[j] = 0;
          continue;
        }
        if (j >= sbb_left && j < sbb_right && i >= sbb_top) {
          contextLabel = contextLabel << 1 & reuseMask;
          for (k = 0; k < changingEntriesLength; k++) {
            i0 = i + changingTemplateY[k];
            j0 = j + changingTemplateX[k];
            bit = bitmap[i0][j0];
            if (bit) {
              bit = changingTemplateBit[k];
              contextLabel |= bit;
            }
          }
        } else {
          contextLabel = 0;
          shift = templateLength - 1;
          for (k = 0; k < templateLength; k++, shift--) {
            j0 = j + templateX[k];
            if (j0 >= 0 && j0 < width) {
              i0 = i + templateY[k];
              if (i0 >= 0) {
                bit = bitmap[i0][j0];
                if (bit) {
                  contextLabel |= bit << shift;
                }
              }
            }
          }
        }
        var pixel = decoder.readBit(contexts, contextLabel);
        row[j] = pixel;
      }
    }
    return bitmap;
  }
  function decodeRefinement(width, height, templateIndex, referenceBitmap, offsetX, offsetY, prediction, at, decodingContext) {
    var codingTemplate = RefinementTemplates[templateIndex].coding;
    if (templateIndex === 0) {
      codingTemplate = codingTemplate.concat([at[0]]);
    }
    var codingTemplateLength = codingTemplate.length;
    var codingTemplateX = new Int32Array(codingTemplateLength);
    var codingTemplateY = new Int32Array(codingTemplateLength);
    var k;
    for (k = 0; k < codingTemplateLength; k++) {
      codingTemplateX[k] = codingTemplate[k].x;
      codingTemplateY[k] = codingTemplate[k].y;
    }
    var referenceTemplate = RefinementTemplates[templateIndex].reference;
    if (templateIndex === 0) {
      referenceTemplate = referenceTemplate.concat([at[1]]);
    }
    var referenceTemplateLength = referenceTemplate.length;
    var referenceTemplateX = new Int32Array(referenceTemplateLength);
    var referenceTemplateY = new Int32Array(referenceTemplateLength);
    for (k = 0; k < referenceTemplateLength; k++) {
      referenceTemplateX[k] = referenceTemplate[k].x;
      referenceTemplateY[k] = referenceTemplate[k].y;
    }
    var referenceWidth = referenceBitmap[0].length;
    var referenceHeight = referenceBitmap.length;
    var pseudoPixelContext = RefinementReusedContexts[templateIndex];
    var bitmap = [];
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GR');
    var ltp = 0;
    for (var i = 0; i < height; i++) {
      if (prediction) {
        var sltp = decoder.readBit(contexts, pseudoPixelContext);
        ltp ^= sltp;
        if (ltp) {
          error('JBIG2 error: prediction is not supported');
        }
      }
      var row = new Uint8Array(width);
      bitmap.push(row);
      for (var j = 0; j < width; j++) {
        var i0, j0;
        var contextLabel = 0;
        for (k = 0; k < codingTemplateLength; k++) {
          i0 = i + codingTemplateY[k];
          j0 = j + codingTemplateX[k];
          if (i0 < 0 || j0 < 0 || j0 >= width) {
            contextLabel <<= 1;
          } else {
            contextLabel = contextLabel << 1 | bitmap[i0][j0];
          }
        }
        for (k = 0; k < referenceTemplateLength; k++) {
          i0 = i + referenceTemplateY[k] + offsetY;
          j0 = j + referenceTemplateX[k] + offsetX;
          if (i0 < 0 || i0 >= referenceHeight || j0 < 0 || j0 >= referenceWidth) {
            contextLabel <<= 1;
          } else {
            contextLabel = contextLabel << 1 | referenceBitmap[i0][j0];
          }
        }
        var pixel = decoder.readBit(contexts, contextLabel);
        row[j] = pixel;
      }
    }
    return bitmap;
  }
  function decodeSymbolDictionary(huffman, refinement, symbols, numberOfNewSymbols, numberOfExportedSymbols, huffmanTables, templateIndex, at, refinementTemplateIndex, refinementAt, decodingContext) {
    if (huffman) {
      error('JBIG2 error: huffman is not supported');
    }
    var newSymbols = [];
    var currentHeight = 0;
    var symbolCodeLength = log2(symbols.length + numberOfNewSymbols);
    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;
    while (newSymbols.length < numberOfNewSymbols) {
      var deltaHeight = decodeInteger(contextCache, 'IADH', decoder);
      currentHeight += deltaHeight;
      var currentWidth = 0;
      while (true) {
        var deltaWidth = decodeInteger(contextCache, 'IADW', decoder);
        if (deltaWidth === null) {
          break;
        }
        currentWidth += deltaWidth;
        var bitmap;
        if (refinement) {
          var numberOfInstances = decodeInteger(contextCache, 'IAAI', decoder);
          if (numberOfInstances > 1) {
            bitmap = decodeTextRegion(huffman, refinement, currentWidth, currentHeight, 0, numberOfInstances, 1, symbols.concat(newSymbols), symbolCodeLength, 0, 0, 1, 0, huffmanTables, refinementTemplateIndex, refinementAt, decodingContext);
          } else {
            var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
            var rdx = decodeInteger(contextCache, 'IARDX', decoder);
            var rdy = decodeInteger(contextCache, 'IARDY', decoder);
            var symbol = symbolId < symbols.length ? symbols[symbolId] : newSymbols[symbolId - symbols.length];
            bitmap = decodeRefinement(currentWidth, currentHeight, refinementTemplateIndex, symbol, rdx, rdy, false, refinementAt, decodingContext);
          }
        } else {
          bitmap = decodeBitmap(false, currentWidth, currentHeight, templateIndex, false, null, at, decodingContext);
        }
        newSymbols.push(bitmap);
      }
    }
    var exportedSymbols = [];
    var flags = [],
        currentFlag = false;
    var totalSymbolsLength = symbols.length + numberOfNewSymbols;
    while (flags.length < totalSymbolsLength) {
      var runLength = decodeInteger(contextCache, 'IAEX', decoder);
      while (runLength--) {
        flags.push(currentFlag);
      }
      currentFlag = !currentFlag;
    }
    for (var i = 0, ii = symbols.length; i < ii; i++) {
      if (flags[i]) {
        exportedSymbols.push(symbols[i]);
      }
    }
    for (var j = 0; j < numberOfNewSymbols; i++, j++) {
      if (flags[i]) {
        exportedSymbols.push(newSymbols[j]);
      }
    }
    return exportedSymbols;
  }
  function decodeTextRegion(huffman, refinement, width, height, defaultPixelValue, numberOfSymbolInstances, stripSize, inputSymbols, symbolCodeLength, transposed, dsOffset, referenceCorner, combinationOperator, huffmanTables, refinementTemplateIndex, refinementAt, decodingContext) {
    if (huffman) {
      error('JBIG2 error: huffman is not supported');
    }
    var bitmap = [];
    var i, row;
    for (i = 0; i < height; i++) {
      row = new Uint8Array(width);
      if (defaultPixelValue) {
        for (var j = 0; j < width; j++) {
          row[j] = defaultPixelValue;
        }
      }
      bitmap.push(row);
    }
    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;
    var stripT = -decodeInteger(contextCache, 'IADT', decoder);
    var firstS = 0;
    i = 0;
    while (i < numberOfSymbolInstances) {
      var deltaT = decodeInteger(contextCache, 'IADT', decoder);
      stripT += deltaT;
      var deltaFirstS = decodeInteger(contextCache, 'IAFS', decoder);
      firstS += deltaFirstS;
      var currentS = firstS;
      do {
        var currentT = stripSize === 1 ? 0 : decodeInteger(contextCache, 'IAIT', decoder);
        var t = stripSize * stripT + currentT;
        var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
        var applyRefinement = refinement && decodeInteger(contextCache, 'IARI', decoder);
        var symbolBitmap = inputSymbols[symbolId];
        var symbolWidth = symbolBitmap[0].length;
        var symbolHeight = symbolBitmap.length;
        if (applyRefinement) {
          var rdw = decodeInteger(contextCache, 'IARDW', decoder);
          var rdh = decodeInteger(contextCache, 'IARDH', decoder);
          var rdx = decodeInteger(contextCache, 'IARDX', decoder);
          var rdy = decodeInteger(contextCache, 'IARDY', decoder);
          symbolWidth += rdw;
          symbolHeight += rdh;
          symbolBitmap = decodeRefinement(symbolWidth, symbolHeight, refinementTemplateIndex, symbolBitmap, (rdw >> 1) + rdx, (rdh >> 1) + rdy, false, refinementAt, decodingContext);
        }
        var offsetT = t - (referenceCorner & 1 ? 0 : symbolHeight);
        var offsetS = currentS - (referenceCorner & 2 ? symbolWidth : 0);
        var s2, t2, symbolRow;
        if (transposed) {
          for (s2 = 0; s2 < symbolHeight; s2++) {
            row = bitmap[offsetS + s2];
            if (!row) {
              continue;
            }
            symbolRow = symbolBitmap[s2];
            var maxWidth = Math.min(width - offsetT, symbolWidth);
            switch (combinationOperator) {
              case 0:
                for (t2 = 0; t2 < maxWidth; t2++) {
                  row[offsetT + t2] |= symbolRow[t2];
                }
                break;
              case 2:
                for (t2 = 0; t2 < maxWidth; t2++) {
                  row[offsetT + t2] ^= symbolRow[t2];
                }
                break;
              default:
                error('JBIG2 error: operator ' + combinationOperator + ' is not supported');
            }
          }
          currentS += symbolHeight - 1;
        } else {
          for (t2 = 0; t2 < symbolHeight; t2++) {
            row = bitmap[offsetT + t2];
            if (!row) {
              continue;
            }
            symbolRow = symbolBitmap[t2];
            switch (combinationOperator) {
              case 0:
                for (s2 = 0; s2 < symbolWidth; s2++) {
                  row[offsetS + s2] |= symbolRow[s2];
                }
                break;
              case 2:
                for (s2 = 0; s2 < symbolWidth; s2++) {
                  row[offsetS + s2] ^= symbolRow[s2];
                }
                break;
              default:
                error('JBIG2 error: operator ' + combinationOperator + ' is not supported');
            }
          }
          currentS += symbolWidth - 1;
        }
        i++;
        var deltaS = decodeInteger(contextCache, 'IADS', decoder);
        if (deltaS === null) {
          break;
        }
        currentS += deltaS + dsOffset;
      } while (true);
    }
    return bitmap;
  }
  function readSegmentHeader(data, start) {
    var segmentHeader = {};
    segmentHeader.number = readUint32(data, start);
    var flags = data[start + 4];
    var segmentType = flags & 0x3F;
    if (!SegmentTypes[segmentType]) {
      error('JBIG2 error: invalid segment type: ' + segmentType);
    }
    segmentHeader.type = segmentType;
    segmentHeader.typeName = SegmentTypes[segmentType];
    segmentHeader.deferredNonRetain = !!(flags & 0x80);
    var pageAssociationFieldSize = !!(flags & 0x40);
    var referredFlags = data[start + 5];
    var referredToCount = referredFlags >> 5 & 7;
    var retainBits = [referredFlags & 31];
    var position = start + 6;
    if (referredFlags === 7) {
      referredToCount = readUint32(data, position - 1) & 0x1FFFFFFF;
      position += 3;
      var bytes = referredToCount + 7 >> 3;
      retainBits[0] = data[position++];
      while (--bytes > 0) {
        retainBits.push(data[position++]);
      }
    } else if (referredFlags === 5 || referredFlags === 6) {
      error('JBIG2 error: invalid referred-to flags');
    }
    segmentHeader.retainBits = retainBits;
    var referredToSegmentNumberSize = segmentHeader.number <= 256 ? 1 : segmentHeader.number <= 65536 ? 2 : 4;
    var referredTo = [];
    var i, ii;
    for (i = 0; i < referredToCount; i++) {
      var number = referredToSegmentNumberSize === 1 ? data[position] : referredToSegmentNumberSize === 2 ? readUint16(data, position) : readUint32(data, position);
      referredTo.push(number);
      position += referredToSegmentNumberSize;
    }
    segmentHeader.referredTo = referredTo;
    if (!pageAssociationFieldSize) {
      segmentHeader.pageAssociation = data[position++];
    } else {
      segmentHeader.pageAssociation = readUint32(data, position);
      position += 4;
    }
    segmentHeader.length = readUint32(data, position);
    position += 4;
    if (segmentHeader.length === 0xFFFFFFFF) {
      if (segmentType === 38) {
        var genericRegionInfo = readRegionSegmentInformation(data, position);
        var genericRegionSegmentFlags = data[position + RegionSegmentInformationFieldLength];
        var genericRegionMmr = !!(genericRegionSegmentFlags & 1);
        var searchPatternLength = 6;
        var searchPattern = new Uint8Array(searchPatternLength);
        if (!genericRegionMmr) {
          searchPattern[0] = 0xFF;
          searchPattern[1] = 0xAC;
        }
        searchPattern[2] = genericRegionInfo.height >>> 24 & 0xFF;
        searchPattern[3] = genericRegionInfo.height >> 16 & 0xFF;
        searchPattern[4] = genericRegionInfo.height >> 8 & 0xFF;
        searchPattern[5] = genericRegionInfo.height & 0xFF;
        for (i = position, ii = data.length; i < ii; i++) {
          var j = 0;
          while (j < searchPatternLength && searchPattern[j] === data[i + j]) {
            j++;
          }
          if (j === searchPatternLength) {
            segmentHeader.length = i + searchPatternLength;
            break;
          }
        }
        if (segmentHeader.length === 0xFFFFFFFF) {
          error('JBIG2 error: segment end was not found');
        }
      } else {
        error('JBIG2 error: invalid unknown segment length');
      }
    }
    segmentHeader.headerEnd = position;
    return segmentHeader;
  }
  function readSegments(header, data, start, end) {
    var segments = [];
    var position = start;
    while (position < end) {
      var segmentHeader = readSegmentHeader(data, position);
      position = segmentHeader.headerEnd;
      var segment = {
        header: segmentHeader,
        data: data
      };
      if (!header.randomAccess) {
        segment.start = position;
        position += segmentHeader.length;
        segment.end = position;
      }
      segments.push(segment);
      if (segmentHeader.type === 51) {
        break;
      }
    }
    if (header.randomAccess) {
      for (var i = 0, ii = segments.length; i < ii; i++) {
        segments[i].start = position;
        position += segments[i].header.length;
        segments[i].end = position;
      }
    }
    return segments;
  }
  function readRegionSegmentInformation(data, start) {
    return {
      width: readUint32(data, start),
      height: readUint32(data, start + 4),
      x: readUint32(data, start + 8),
      y: readUint32(data, start + 12),
      combinationOperator: data[start + 16] & 7
    };
  }
  var RegionSegmentInformationFieldLength = 17;
  function processSegment(segment, visitor) {
    var header = segment.header;
    var data = segment.data,
        position = segment.start,
        end = segment.end;
    var args, at, i, atLength;
    switch (header.type) {
      case 0:
        var dictionary = {};
        var dictionaryFlags = readUint16(data, position);
        dictionary.huffman = !!(dictionaryFlags & 1);
        dictionary.refinement = !!(dictionaryFlags & 2);
        dictionary.huffmanDHSelector = dictionaryFlags >> 2 & 3;
        dictionary.huffmanDWSelector = dictionaryFlags >> 4 & 3;
        dictionary.bitmapSizeSelector = dictionaryFlags >> 6 & 1;
        dictionary.aggregationInstancesSelector = dictionaryFlags >> 7 & 1;
        dictionary.bitmapCodingContextUsed = !!(dictionaryFlags & 256);
        dictionary.bitmapCodingContextRetained = !!(dictionaryFlags & 512);
        dictionary.template = dictionaryFlags >> 10 & 3;
        dictionary.refinementTemplate = dictionaryFlags >> 12 & 1;
        position += 2;
        if (!dictionary.huffman) {
          atLength = dictionary.template === 0 ? 4 : 1;
          at = [];
          for (i = 0; i < atLength; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          dictionary.at = at;
        }
        if (dictionary.refinement && !dictionary.refinementTemplate) {
          at = [];
          for (i = 0; i < 2; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          dictionary.refinementAt = at;
        }
        dictionary.numberOfExportedSymbols = readUint32(data, position);
        position += 4;
        dictionary.numberOfNewSymbols = readUint32(data, position);
        position += 4;
        args = [dictionary, header.number, header.referredTo, data, position, end];
        break;
      case 6:
      case 7:
        var textRegion = {};
        textRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var textRegionSegmentFlags = readUint16(data, position);
        position += 2;
        textRegion.huffman = !!(textRegionSegmentFlags & 1);
        textRegion.refinement = !!(textRegionSegmentFlags & 2);
        textRegion.stripSize = 1 << (textRegionSegmentFlags >> 2 & 3);
        textRegion.referenceCorner = textRegionSegmentFlags >> 4 & 3;
        textRegion.transposed = !!(textRegionSegmentFlags & 64);
        textRegion.combinationOperator = textRegionSegmentFlags >> 7 & 3;
        textRegion.defaultPixelValue = textRegionSegmentFlags >> 9 & 1;
        textRegion.dsOffset = textRegionSegmentFlags << 17 >> 27;
        textRegion.refinementTemplate = textRegionSegmentFlags >> 15 & 1;
        if (textRegion.huffman) {
          var textRegionHuffmanFlags = readUint16(data, position);
          position += 2;
          textRegion.huffmanFS = textRegionHuffmanFlags & 3;
          textRegion.huffmanDS = textRegionHuffmanFlags >> 2 & 3;
          textRegion.huffmanDT = textRegionHuffmanFlags >> 4 & 3;
          textRegion.huffmanRefinementDW = textRegionHuffmanFlags >> 6 & 3;
          textRegion.huffmanRefinementDH = textRegionHuffmanFlags >> 8 & 3;
          textRegion.huffmanRefinementDX = textRegionHuffmanFlags >> 10 & 3;
          textRegion.huffmanRefinementDY = textRegionHuffmanFlags >> 12 & 3;
          textRegion.huffmanRefinementSizeSelector = !!(textRegionHuffmanFlags & 14);
        }
        if (textRegion.refinement && !textRegion.refinementTemplate) {
          at = [];
          for (i = 0; i < 2; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          textRegion.refinementAt = at;
        }
        textRegion.numberOfSymbolInstances = readUint32(data, position);
        position += 4;
        if (textRegion.huffman) {
          error('JBIG2 error: huffman is not supported');
        }
        args = [textRegion, header.referredTo, data, position, end];
        break;
      case 38:
      case 39:
        var genericRegion = {};
        genericRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var genericRegionSegmentFlags = data[position++];
        genericRegion.mmr = !!(genericRegionSegmentFlags & 1);
        genericRegion.template = genericRegionSegmentFlags >> 1 & 3;
        genericRegion.prediction = !!(genericRegionSegmentFlags & 8);
        if (!genericRegion.mmr) {
          atLength = genericRegion.template === 0 ? 4 : 1;
          at = [];
          for (i = 0; i < atLength; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          genericRegion.at = at;
        }
        args = [genericRegion, data, position, end];
        break;
      case 48:
        var pageInfo = {
          width: readUint32(data, position),
          height: readUint32(data, position + 4),
          resolutionX: readUint32(data, position + 8),
          resolutionY: readUint32(data, position + 12)
        };
        if (pageInfo.height === 0xFFFFFFFF) {
          delete pageInfo.height;
        }
        var pageSegmentFlags = data[position + 16];
        readUint16(data, position + 17);
        pageInfo.lossless = !!(pageSegmentFlags & 1);
        pageInfo.refinement = !!(pageSegmentFlags & 2);
        pageInfo.defaultPixelValue = pageSegmentFlags >> 2 & 1;
        pageInfo.combinationOperator = pageSegmentFlags >> 3 & 3;
        pageInfo.requiresBuffer = !!(pageSegmentFlags & 32);
        pageInfo.combinationOperatorOverride = !!(pageSegmentFlags & 64);
        args = [pageInfo];
        break;
      case 49:
        break;
      case 50:
        break;
      case 51:
        break;
      case 62:
        break;
      default:
        error('JBIG2 error: segment type ' + header.typeName + '(' + header.type + ') is not implemented');
    }
    var callbackName = 'on' + header.typeName;
    if (callbackName in visitor) {
      visitor[callbackName].apply(visitor, args);
    }
  }
  function processSegments(segments, visitor) {
    for (var i = 0, ii = segments.length; i < ii; i++) {
      processSegment(segments[i], visitor);
    }
  }
  function parseJbig2(data, start, end) {
    var position = start;
    if (data[position] !== 0x97 || data[position + 1] !== 0x4A || data[position + 2] !== 0x42 || data[position + 3] !== 0x32 || data[position + 4] !== 0x0D || data[position + 5] !== 0x0A || data[position + 6] !== 0x1A || data[position + 7] !== 0x0A) {
      error('JBIG2 error: invalid header');
    }
    var header = {};
    position += 8;
    var flags = data[position++];
    header.randomAccess = !(flags & 1);
    if (!(flags & 2)) {
      header.numberOfPages = readUint32(data, position);
      position += 4;
    }
    readSegments(header, data, position, end);
    error('Not implemented');
  }
  function parseJbig2Chunks(chunks) {
    var visitor = new SimpleSegmentVisitor();
    for (var i = 0, ii = chunks.length; i < ii; i++) {
      var chunk = chunks[i];
      var segments = readSegments({}, chunk.data, chunk.start, chunk.end);
      processSegments(segments, visitor);
    }
    return visitor.buffer;
  }
  function SimpleSegmentVisitor() {}
  SimpleSegmentVisitor.prototype = {
    onPageInformation: function SimpleSegmentVisitor_onPageInformation(info) {
      this.currentPageInfo = info;
      var rowSize = info.width + 7 >> 3;
      var buffer = new Uint8Array(rowSize * info.height);
      if (info.defaultPixelValue) {
        for (var i = 0, ii = buffer.length; i < ii; i++) {
          buffer[i] = 0xFF;
        }
      }
      this.buffer = buffer;
    },
    drawBitmap: function SimpleSegmentVisitor_drawBitmap(regionInfo, bitmap) {
      var pageInfo = this.currentPageInfo;
      var width = regionInfo.width,
          height = regionInfo.height;
      var rowSize = pageInfo.width + 7 >> 3;
      var combinationOperator = pageInfo.combinationOperatorOverride ? regionInfo.combinationOperator : pageInfo.combinationOperator;
      var buffer = this.buffer;
      var mask0 = 128 >> (regionInfo.x & 7);
      var offset0 = regionInfo.y * rowSize + (regionInfo.x >> 3);
      var i, j, mask, offset;
      switch (combinationOperator) {
        case 0:
          for (i = 0; i < height; i++) {
            mask = mask0;
            offset = offset0;
            for (j = 0; j < width; j++) {
              if (bitmap[i][j]) {
                buffer[offset] |= mask;
              }
              mask >>= 1;
              if (!mask) {
                mask = 128;
                offset++;
              }
            }
            offset0 += rowSize;
          }
          break;
        case 2:
          for (i = 0; i < height; i++) {
            mask = mask0;
            offset = offset0;
            for (j = 0; j < width; j++) {
              if (bitmap[i][j]) {
                buffer[offset] ^= mask;
              }
              mask >>= 1;
              if (!mask) {
                mask = 128;
                offset++;
              }
            }
            offset0 += rowSize;
          }
          break;
        default:
          error('JBIG2 error: operator ' + combinationOperator + ' is not supported');
      }
    },
    onImmediateGenericRegion: function SimpleSegmentVisitor_onImmediateGenericRegion(region, data, start, end) {
      var regionInfo = region.info;
      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeBitmap(region.mmr, regionInfo.width, regionInfo.height, region.template, region.prediction, null, region.at, decodingContext);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessGenericRegion: function SimpleSegmentVisitor_onImmediateLosslessGenericRegion() {
      this.onImmediateGenericRegion.apply(this, arguments);
    },
    onSymbolDictionary: function SimpleSegmentVisitor_onSymbolDictionary(dictionary, currentSegment, referredSegments, data, start, end) {
      var huffmanTables;
      if (dictionary.huffman) {
        error('JBIG2 error: huffman is not supported');
      }
      var symbols = this.symbols;
      if (!symbols) {
        this.symbols = symbols = {};
      }
      var inputSymbols = [];
      for (var i = 0, ii = referredSegments.length; i < ii; i++) {
        inputSymbols = inputSymbols.concat(symbols[referredSegments[i]]);
      }
      var decodingContext = new DecodingContext(data, start, end);
      symbols[currentSegment] = decodeSymbolDictionary(dictionary.huffman, dictionary.refinement, inputSymbols, dictionary.numberOfNewSymbols, dictionary.numberOfExportedSymbols, huffmanTables, dictionary.template, dictionary.at, dictionary.refinementTemplate, dictionary.refinementAt, decodingContext);
    },
    onImmediateTextRegion: function SimpleSegmentVisitor_onImmediateTextRegion(region, referredSegments, data, start, end) {
      var regionInfo = region.info;
      var huffmanTables;
      var symbols = this.symbols;
      var inputSymbols = [];
      for (var i = 0, ii = referredSegments.length; i < ii; i++) {
        inputSymbols = inputSymbols.concat(symbols[referredSegments[i]]);
      }
      var symbolCodeLength = log2(inputSymbols.length);
      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeTextRegion(region.huffman, region.refinement, regionInfo.width, regionInfo.height, region.defaultPixelValue, region.numberOfSymbolInstances, region.stripSize, inputSymbols, symbolCodeLength, region.transposed, region.dsOffset, region.referenceCorner, region.combinationOperator, huffmanTables, region.refinementTemplate, region.refinementAt, decodingContext);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessTextRegion: function SimpleSegmentVisitor_onImmediateLosslessTextRegion() {
      this.onImmediateTextRegion.apply(this, arguments);
    }
  };
  function Jbig2Image() {}
  Jbig2Image.prototype = {
    parseChunks: function Jbig2Image_parseChunks(chunks) {
      return parseJbig2Chunks(chunks);
    }
  };
  return Jbig2Image;
}();


	
	
	
	function log2(x) {
        var n = 1, i = 0;
        while (x > n) {
            n <<= 1;
            i++;
        }
        return i;
    }
    function readInt8(data, start) {
        return data[start] << 24 >> 24;
    }
    function readUint16(data, offset) {
        return data[offset] << 8 | data[offset + 1];
    }
    function readUint32(data, offset) {
        return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
    }
    function shadow(obj, prop, value) {
        Object.defineProperty(obj, prop, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: false
        });
        return value;
    }
    var error = function() {
        console.error.apply(console, arguments);
        throw new Error("PDFJS error: " + arguments[0]);
    };
    var warn = function() {
        console.warn.apply(console, arguments);
    };
    var info = function() {
        console.info.apply(console, arguments);
    };
    Jbig2Image.prototype.parse = function parseJbig2(data) {
        var position = 0, end = data.length;
        if (data[position] !== 151 || data[position + 1] !== 74 || data[position + 2] !== 66 || data[position + 3] !== 50 || data[position + 4] !== 13 || data[position + 5] !== 10 || data[position + 6] !== 26 || data[position + 7] !== 10) {
            error("JBIG2 error: invalid header");
        }
        var header = {};
        position += 8;
        var flags = data[position++];
        header.randomAccess = !(flags & 1);
        if (!(flags & 2)) {
            header.numberOfPages = readUint32(data, position);
            position += 4;
        }
        var visitor = this.parseChunks([ {
            data: data,
            start: position,
            end: end
        } ]);
        var width = visitor.currentPageInfo.width;
        var height = visitor.currentPageInfo.height;
        var bitPacked = visitor.buffer;
        var data = new Uint8Array(width * height);
        var q = 0, k = 0;
        for (var i = 0; i < height; i++) {
            var mask = 0, buffer;
            for (var j = 0; j < width; j++) {
                if (!mask) {
                    mask = 128;
                    buffer = bitPacked[k++];
                }
                data[q++] = buffer & mask ? 0 : 255;
                mask >>= 1;
            }
        }
        this.width = width;
        this.height = height;
        this.data = data;
    };
    PDFJS.JpegImage = JpegImage;
    PDFJS.JpxImage = JpxImage;
    PDFJS.Jbig2Image = Jbig2Image;
})(PDFJS || (PDFJS = {}));


;(function(){var o,X=0,e=null,n=null;o=window.FFT={};var f={o:function(G){if(G!==0&&(G&G-1)===0){X=G;
f.B();f.q();f.i()}else{throw new Error("init: radix-2 required")}},X:function(G,B){f.G(G,B,1)},e:function(G,B){var j=1/X;
f.G(G,B,-1);for(var q=0;q<X;q++){G[q]*=j;B[q]*=j}},n:function(G,B){var j=[],q=[],i=0;for(var m=0;m<X;
m++){i=m*X;for(var Z=0;Z<X;Z++){j[Z]=G[Z+i];q[Z]=B[Z+i]}f.X(j,q);for(var p=0;p<X;p++){G[p+i]=j[p];B[p+i]=q[p]}}for(var C=0;
C<X;C++){for(var a=0;a<X;a++){i=C+a*X;j[a]=G[i];q[a]=B[i]}f.X(j,q);for(var r=0;r<X;r++){i=C+r*X;G[i]=j[r];
B[i]=q[r]}}},f:function(G,B){var j=[],q=[],i=0;for(var m=0;m<X;m++){i=m*X;for(var Z=0;Z<X;Z++){j[Z]=G[Z+i];
q[Z]=B[Z+i]}f.e(j,q);for(var p=0;p<X;p++){G[p+i]=j[p];B[p+i]=q[p]}}for(var C=0;C<X;C++){for(var a=0;
a<X;a++){i=C+a*X;j[a]=G[i];q[a]=B[i]}f.e(j,q);for(var r=0;r<X;r++){i=C+r*X;G[i]=j[r];B[i]=q[r]}}},G:function(G,B,j){var q,i,m,Z,p,C,a,r,M,R=X>>2;
for(var P=0;P<X;P++){Z=e[P];if(P<Z){p=G[P];G[P]=G[Z];G[Z]=p;p=B[P];B[P]=B[Z];B[Z]=p}}for(var y=1;y<X;
y<<=1){i=0;q=X/(y<<1);for(var x=0;x<y;x++){C=n[i+R];a=j*n[i];for(var t=x;t<X;t+=y<<1){m=t+y;r=C*G[m]+a*B[m];
M=C*B[m]-a*G[m];G[m]=G[t]-r;G[t]+=r;B[m]=B[t]-M;B[t]+=M}i+=q}}},B:function(){var G=Uint32Array;if(X<=256)G=Uint8Array;
else if(X<=65536)G=Uint16Array;e=new G(X);n=new Float64Array(X*1.25)},j:function(){},q:function(){var G=0,B=0,q=0;
e[0]=0;while(++G<X){q=X>>1;while(q<=B){B-=q;q>>=1}B+=q;e[G]=B}},i:function(){var G=X>>1,B=X>>2,j=X>>3,q=G+B,i=Math.sin(Math.PI/X),m=2*i*i,Z=Math.sqrt(m*(2-m)),p=n[B]=1,C=n[0]=0;
i=2*m;for(var a=1;a<j;a++){p-=m;m+=i*p;C+=Z;Z-=i*C;n[a]=C;n[B-a]=p}if(j!==0){n[j]=Math.sqrt(.5)}for(var r=0;
r<B;r++){n[G-r]=n[r]}for(var M=0;M<q;M++){n[M+G]=-n[M]}}};o.init=f.o;o.fft2d=f.n;o.ifft2d=f.f}.call(this));
	
(function(r){"object"===typeof exports&&"undefined"!==typeof module?module.exports=r():"function"===typeof define&&define.amd?define([],r):("undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:this).acorn=r()})(function(){return function a(l,f,c){function g(d,n){if(!f[d]){if(!l[d]){var e="function"==typeof require&&require;if(!n&&e)return e(d,!0);if(b)return b(d,!0);e=Error("Cannot find module '"+d+"'");throw e.code="MODULE_NOT_FOUND",e;}e=f[d]={exports:{}};
l[d][0].call(e.exports,function(b){var e=l[d][1][b];return g(e?e:b)},e,e.exports,a,l,f,c)}return f[d].exports}for(var b="function"==typeof require&&require,d=0;d<c.length;d++)g(c[d]);return g}({1:[function(a,l,f){var c=a("./tokentype");a=a("./state").Parser.prototype;a.checkPropClash=function(b,c){if(!(6<=this.options.ecmaVersion&&(b.computed||b.method||b.shorthand))){var d=b.key;switch(d.type){case "Identifier":var a=d.name;break;case "Literal":a=String(d.value);break;default:return}var e=b.kind;
if(6<=this.options.ecmaVersion)"__proto__"===a&&"init"===e&&(c.proto&&this.raiseRecoverable(d.start,"Redefinition of __proto__ property"),c.proto=!0);else{a="$"+a;var m=c[a];m?(a="init"!==e,(!this.strict&&!a||!m[e])&&a^m.init||this.raiseRecoverable(d.start,"Redefinition of property")):m=c[a]={init:!1,get:!1,set:!1};m[e]=!0}}};a.parseExpression=function(b,a){var d=this.start,n=this.startLoc,e=this.parseMaybeAssign(b,a);if(this.type===c.types.comma){d=this.startNodeAt(d,n);for(d.expressions=[e];this.eat(c.types.comma);)d.expressions.push(this.parseMaybeAssign(b,
a));return this.finishNode(d,"SequenceExpression")}return e};a.parseMaybeAssign=function(b,a,h){if(this.inGenerator&&this.isContextual("yield"))return this.parseYield();var d=!1;a||(a={shorthandAssign:0,trailingComma:0},d=!0);var e=this.start,m=this.startLoc;if(this.type==c.types.parenL||this.type==c.types.name)this.potentialArrowAt=this.start;var p=this.parseMaybeConditional(b,a);h&&(p=h.call(this,p,e,m));if(this.type.isAssign)return d&&this.checkPatternErrors(a,!0),h=this.startNodeAt(e,m),h.operator=
this.value,h.left=this.type===c.types.eq?this.toAssignable(p):p,a.shorthandAssign=0,this.checkLVal(p),this.next(),h.right=this.parseMaybeAssign(b),this.finishNode(h,"AssignmentExpression");d&&this.checkExpressionErrors(a,!0);return p};a.parseMaybeConditional=function(b,a){var d=this.start,n=this.startLoc,e=this.parseExprOps(b,a);return this.checkExpressionErrors(a)?e:this.eat(c.types.question)?(d=this.startNodeAt(d,n),d.test=e,d.consequent=this.parseMaybeAssign(),this.expect(c.types.colon),d.alternate=
this.parseMaybeAssign(b),this.finishNode(d,"ConditionalExpression")):e};a.parseExprOps=function(b,c){var a=this.start,d=this.startLoc,e=this.parseMaybeUnary(c,!1);return this.checkExpressionErrors(c)?e:this.parseExprOp(e,a,d,-1,b)};a.parseExprOp=function(b,a,h,n,e){var d=this.type.binop;if(null!=d&&(!e||this.type!==c.types._in)&&d>n){var p=this.type===c.types.logicalOR||this.type===c.types.logicalAND,g=this.value;this.next();var k=this.start,q=this.startLoc,d=this.parseExprOp(this.parseMaybeUnary(null,
!1),k,q,d,e);b=this.buildBinary(a,h,b,d,g,p);return this.parseExprOp(b,a,h,n,e)}return b};a.buildBinary=function(b,c,a,n,e,m){b=this.startNodeAt(b,c);b.left=a;b.operator=e;b.right=n;return this.finishNode(b,m?"LogicalExpression":"BinaryExpression")};a.parseMaybeUnary=function(b,a){var d=this.start,n=this.startLoc;if(this.type.prefix){var e=this.startNode();var m=this.type===c.types.incDec;e.operator=this.value;e.prefix=!0;this.next();e.argument=this.parseMaybeUnary(null,!0);this.checkExpressionErrors(b,
!0);m?this.checkLVal(e.argument):this.strict&&"delete"===e.operator&&"Identifier"===e.argument.type?this.raiseRecoverable(e.start,"Deleting local variable in strict mode"):a=!0;m=this.finishNode(e,m?"UpdateExpression":"UnaryExpression")}else{m=this.parseExprSubscripts(b);if(this.checkExpressionErrors(b))return m;for(;this.type.postfix&&!this.canInsertSemicolon();)e=this.startNodeAt(d,n),e.operator=this.value,e.prefix=!1,e.argument=m,this.checkLVal(m),this.next(),m=this.finishNode(e,"UpdateExpression")}return!a&&
this.eat(c.types.starstar)?this.buildBinary(d,n,m,this.parseMaybeUnary(null,!1),"**",!1):m};a.parseExprSubscripts=function(b){var c=this.start,a=this.startLoc,n=this.parseExprAtom(b),e="ArrowFunctionExpression"===n.type&&")"!==this.input.slice(this.lastTokStart,this.lastTokEnd);return this.checkExpressionErrors(b)||e?n:this.parseSubscripts(n,c,a)};a.parseSubscripts=function(b,a,h,n){for(var e;;)if(this.eat(c.types.dot))e=this.startNodeAt(a,h),e.object=b,e.property=this.parseIdent(!0),e.computed=!1,
b=this.finishNode(e,"MemberExpression");else if(this.eat(c.types.bracketL))e=this.startNodeAt(a,h),e.object=b,e.property=this.parseExpression(),e.computed=!0,this.expect(c.types.bracketR),b=this.finishNode(e,"MemberExpression");else if(!n&&this.eat(c.types.parenL))e=this.startNodeAt(a,h),e.callee=b,e.arguments=this.parseExprList(c.types.parenR,!1),b=this.finishNode(e,"CallExpression");else if(this.type===c.types.backQuote)e=this.startNodeAt(a,h),e.tag=b,e.quasi=this.parseTemplate(),b=this.finishNode(e,
"TaggedTemplateExpression");else return b};a.parseExprAtom=function(b){var a=this.potentialArrowAt==this.start;switch(this.type){case c.types._super:this.inFunction||this.raise(this.start,"'super' outside of function or class");case c.types._this:return b=this.type===c.types._this?"ThisExpression":"Super",a=this.startNode(),this.next(),this.finishNode(a,b);case c.types.name:b=this.start;var h=this.startLoc,n=this.parseIdent(this.type!==c.types.name);return a&&!this.canInsertSemicolon()&&this.eat(c.types.arrow)?
this.parseArrowExpression(this.startNodeAt(b,h),[n]):n;case c.types.regexp:return b=this.value,a=this.parseLiteral(b.value),a.regex={pattern:b.pattern,flags:b.flags},a;case c.types.num:case c.types.string:return this.parseLiteral(this.value);case c.types._null:case c.types._true:case c.types._false:return a=this.startNode(),a.value=this.type===c.types._null?null:this.type===c.types._true,a.raw=this.type.keyword,this.next(),this.finishNode(a,"Literal");case c.types.parenL:return this.parseParenAndDistinguishExpression(a);
case c.types.bracketL:return a=this.startNode(),this.next(),a.elements=this.parseExprList(c.types.bracketR,!0,!0,b),this.finishNode(a,"ArrayExpression");case c.types.braceL:return this.parseObj(!1,b);case c.types._function:return a=this.startNode(),this.next(),this.parseFunction(a,!1);case c.types._class:return this.parseClass(this.startNode(),!1);case c.types._new:return this.parseNew();case c.types.backQuote:return this.parseTemplate();default:this.unexpected()}};a.parseLiteral=function(b){var a=
this.startNode();a.value=b;a.raw=this.input.slice(this.start,this.end);this.next();return this.finishNode(a,"Literal")};a.parseParenExpression=function(){this.expect(c.types.parenL);var b=this.parseExpression();this.expect(c.types.parenR);return b};a.parseParenAndDistinguishExpression=function(b){var a=this.start,h=this.startLoc;if(6<=this.options.ecmaVersion){this.next();for(var n=this.start,e=this.startLoc,m=[],p=!0,g={shorthandAssign:0,trailingComma:0},k=void 0,q=void 0;this.type!==c.types.parenR;)if(p?
p=!1:this.expect(c.types.comma),this.type===c.types.ellipsis){k=this.start;m.push(this.parseParenItem(this.parseRest()));break}else this.type!==c.types.parenL||q||(q=this.start),m.push(this.parseMaybeAssign(!1,g,this.parseParenItem));var p=this.start,f=this.startLoc;this.expect(c.types.parenR);if(b&&!this.canInsertSemicolon()&&this.eat(c.types.arrow))return this.checkPatternErrors(g,!0),q&&this.unexpected(q),this.parseParenArrowList(a,h,m);m.length||this.unexpected(this.lastTokStart);k&&this.unexpected(k);
this.checkExpressionErrors(g,!0);1<m.length?(b=this.startNodeAt(n,e),b.expressions=m,this.finishNodeAt(b,"SequenceExpression",p,f)):b=m[0]}else b=this.parseParenExpression();return this.options.preserveParens?(a=this.startNodeAt(a,h),a.expression=b,this.finishNode(a,"ParenthesizedExpression")):b};a.parseParenItem=function(b){return b};a.parseParenArrowList=function(b,a,c){return this.parseArrowExpression(this.startNodeAt(b,a),c)};var g=[];a.parseNew=function(){var b=this.startNode(),a=this.parseIdent(!0);
if(6<=this.options.ecmaVersion&&this.eat(c.types.dot))return b.meta=a,b.property=this.parseIdent(!0),"target"!==b.property.name&&this.raiseRecoverable(b.property.start,"The only valid meta property for new is new.target"),this.inFunction||this.raiseRecoverable(b.start,"new.target can only be used in functions"),this.finishNode(b,"MetaProperty");var a=this.start,h=this.startLoc;b.callee=this.parseSubscripts(this.parseExprAtom(),a,h,!0);this.eat(c.types.parenL)?b.arguments=this.parseExprList(c.types.parenR,
!1):b.arguments=g;return this.finishNode(b,"NewExpression")};a.parseTemplateElement=function(){var b=this.startNode();b.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,"\n"),cooked:this.value};this.next();b.tail=this.type===c.types.backQuote;return this.finishNode(b,"TemplateElement")};a.parseTemplate=function(){var b=this.startNode();this.next();b.expressions=[];var a=this.parseTemplateElement();for(b.quasis=[a];!a.tail;)this.expect(c.types.dollarBraceL),b.expressions.push(this.parseExpression()),
this.expect(c.types.braceR),b.quasis.push(a=this.parseTemplateElement());this.next();return this.finishNode(b,"TemplateLiteral")};a.parseObj=function(b,a){var d=this.startNode(),n=!0,e={};d.properties=[];for(this.next();!this.eat(c.types.braceR);){if(n)n=!1;else if(this.expect(c.types.comma),this.afterTrailingComma(c.types.braceR))break;var m=this.startNode(),p=void 0,g=void 0,k=void 0;if(6<=this.options.ecmaVersion){m.method=!1;m.shorthand=!1;if(b||a)g=this.start,k=this.startLoc;b||(p=this.eat(c.types.star))}this.parsePropertyName(m);
this.parsePropertyValue(m,b,p,g,k,a);this.checkPropClash(m,e);d.properties.push(this.finishNode(m,"Property"))}return this.finishNode(d,b?"ObjectPattern":"ObjectExpression")};a.parsePropertyValue=function(b,a,h,n,e,m){this.eat(c.types.colon)?(b.value=a?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,m),b.kind="init"):6<=this.options.ecmaVersion&&this.type===c.types.parenL?(a&&this.unexpected(),b.kind="init",b.method=!0,b.value=this.parseMethod(h)):5<=this.options.ecmaVersion&&
!b.computed&&"Identifier"===b.key.type&&("get"===b.key.name||"set"===b.key.name)&&this.type!=c.types.comma&&this.type!=c.types.braceR?((h||a)&&this.unexpected(),b.kind=b.key.name,this.parsePropertyName(b),b.value=this.parseMethod(!1),b.value.params.length!==("get"===b.kind?0:1)&&(a=b.value.start,"get"===b.kind?this.raiseRecoverable(a,"getter should have no params"):this.raiseRecoverable(a,"setter should have exactly one param")),"set"===b.kind&&"RestElement"===b.value.params[0].type&&this.raiseRecoverable(b.value.params[0].start,
"Setter cannot use rest params")):6<=this.options.ecmaVersion&&!b.computed&&"Identifier"===b.key.type?(b.kind="init",a?((this.keywords.test(b.key.name)||(this.strict?this.reservedWordsStrictBind:this.reservedWords).test(b.key.name)||this.inGenerator&&"yield"==b.key.name)&&this.raiseRecoverable(b.key.start,"Binding "+b.key.name),b.value=this.parseMaybeDefault(n,e,b.key)):this.type===c.types.eq&&m?(m.shorthandAssign||(m.shorthandAssign=this.start),b.value=this.parseMaybeDefault(n,e,b.key)):b.value=
b.key,b.shorthand=!0):this.unexpected()};a.parsePropertyName=function(b){if(6<=this.options.ecmaVersion){if(this.eat(c.types.bracketL))return b.computed=!0,b.key=this.parseMaybeAssign(),this.expect(c.types.bracketR),b.key;b.computed=!1}return b.key=this.type===c.types.num||this.type===c.types.string?this.parseExprAtom():this.parseIdent(!0)};a.initFunction=function(b){b.id=null;6<=this.options.ecmaVersion&&(b.generator=!1,b.expression=!1)};a.parseMethod=function(b){var a=this.startNode(),h=this.inGenerator;
this.inGenerator=b;this.initFunction(a);this.expect(c.types.parenL);a.params=this.parseBindingList(c.types.parenR,!1,!1);6<=this.options.ecmaVersion&&(a.generator=b);this.parseFunctionBody(a,!1);this.inGenerator=h;return this.finishNode(a,"FunctionExpression")};a.parseArrowExpression=function(b,a){var c=this.inGenerator;this.inGenerator=!1;this.initFunction(b);b.params=this.toAssignableList(a,!0);this.parseFunctionBody(b,!0);this.inGenerator=c;return this.finishNode(b,"ArrowFunctionExpression")};
a.parseFunctionBody=function(b,a){var d=a&&this.type!==c.types.braceL;if(d)b.body=this.parseMaybeAssign(),b.expression=!0;else{var n=this.inFunction,e=this.labels;this.inFunction=!0;this.labels=[];b.body=this.parseBlock(!0);b.expression=!1;this.inFunction=n;this.labels=e}this.strict||!d&&b.body.body.length&&this.isUseStrict(b.body.body[0])?(d=this.strict,this.strict=!0,b.id&&this.checkLVal(b.id,!0),this.checkParams(b),this.strict=d):a&&this.checkParams(b)};a.checkParams=function(b){for(var a={},c=
0;c<b.params.length;c++)this.checkLVal(b.params[c],!0,a)};a.parseExprList=function(b,a,h,n){for(var e=[],d=!0;!this.eat(b);){if(d)d=!1;else if(this.expect(c.types.comma),a&&this.afterTrailingComma(b))break;if(h&&this.type===c.types.comma)var p=null;else this.type===c.types.ellipsis?(p=this.parseSpread(n),this.type===c.types.comma&&n&&!n.trailingComma&&(n.trailingComma=this.lastTokStart)):p=this.parseMaybeAssign(!1,n);e.push(p)}return e};a.parseIdent=function(b){var a=this.startNode();b&&"never"==
this.options.allowReserved&&(b=!1);this.type===c.types.name?(!b&&(this.strict?this.reservedWordsStrict:this.reservedWords).test(this.value)&&(6<=this.options.ecmaVersion||-1==this.input.slice(this.start,this.end).indexOf("\\"))&&this.raiseRecoverable(this.start,"The keyword '"+this.value+"' is reserved"),!b&&this.inGenerator&&"yield"===this.value&&this.raiseRecoverable(this.start,"Can not use 'yield' as identifier inside a generator"),a.name=this.value):b&&this.type.keyword?a.name=this.type.keyword:
this.unexpected();this.next();return this.finishNode(a,"Identifier")};a.parseYield=function(){var b=this.startNode();this.next();this.type==c.types.semi||this.canInsertSemicolon()||this.type!=c.types.star&&!this.type.startsExpr?(b.delegate=!1,b.argument=null):(b.delegate=this.eat(c.types.star),b.argument=this.parseMaybeAssign());return this.finishNode(b,"YieldExpression")}},{"./state":10,"./tokentype":14}],2:[function(a,l,f){function c(b,a){for(var e=65536,c=0;c<a.length;c+=2){e+=a[c];if(e>b)return!1;
e+=a[c+1];if(e>=b)return!0}}f.__esModule=!0;f.isIdentifierStart=function(b,a){return 65>b?36===b:91>b?!0:97>b?95===b:123>b?!0:65535>=b?170<=b&&g.test(String.fromCharCode(b)):!1===a?!1:c(b,d)};f.isIdentifierChar=function(a,e){return 48>a?36===a:58>a?!0:65>a?!1:91>a?!0:97>a?95===a:123>a?!0:65535>=a?170<=a&&b.test(String.fromCharCode(a)):!1===e?!1:c(a,d)||c(a,h)};f.reservedWords={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
5:"class enum extends super const export import",6:"enum",7:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"};f.keywords={5:"break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",6:"break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this const class extends export import super"};
a="\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0-\u08b4\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fd5\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7ad\ua7b0-\ua7b7\ua7f7-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab65\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var g=new RegExp("["+a+"]"),b=new RegExp("["+a+"\u200c\u200d\u00b7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d01-\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1cf8\u1cf9\u1dc0-\u1df5\u1dfc-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]");
a=null;var d=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,17,26,6,37,11,29,3,35,5,7,2,4,43,157,99,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,26,45,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,785,52,76,44,33,24,27,35,42,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,287,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,86,25,391,63,32,0,449,56,1288,
921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,881,68,12,0,67,12,16481,1,3071,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,4149,196,1340,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,3,5761,10591,541],h=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,
41,2,5,0,166,1,1306,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,52,0,13,2,49,13,10,2,4,9,83,11,168,11,6,9,7,3,57,0,2,6,3,1,3,2,10,0,11,1,3,6,4,4,316,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,423,9,20855,9,135,4,60,6,26,9,1016,45,17,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,3617,6,792618,239]},{}],3:[function(a,l,f){f.__esModule=!0;f.parse=function(a,b){return(new c.Parser(b,a)).parse()};f.parseExpressionAt=function(a,b,d){a=new c.Parser(d,a,b);a.nextToken();
return a.parseExpression()};f.tokenizer=function(a,b){return new c.Parser(b,a)};var c=a("./state");a("./parseutil");a("./statement");a("./lval");a("./expression");a("./location");f.Parser=c.Parser;f.plugins=c.plugins;l=a("./options");f.defaultOptions=l.defaultOptions;l=a("./locutil");f.Position=l.Position;f.SourceLocation=l.SourceLocation;f.getLineInfo=l.getLineInfo;l=a("./node");f.Node=l.Node;l=a("./tokentype");f.TokenType=l.TokenType;f.tokTypes=l.types;l=a("./tokencontext");f.TokContext=l.TokContext;
f.tokContexts=l.types;l=a("./identifier");f.isIdentifierChar=l.isIdentifierChar;f.isIdentifierStart=l.isIdentifierStart;l=a("./tokenize");f.Token=l.Token;a=a("./whitespace");f.isNewLine=a.isNewLine;f.lineBreak=a.lineBreak;f.lineBreakG=a.lineBreakG;f.version="3.1.0"},{"./expression":1,"./identifier":2,"./location":4,"./locutil":5,"./lval":6,"./node":7,"./options":8,"./parseutil":9,"./state":10,"./statement":11,"./tokencontext":12,"./tokenize":13,"./tokentype":14,"./whitespace":16}],4:[function(a,l,
f){l=a("./state");var c=a("./locutil");a=l.Parser.prototype;a.raise=function(a,b){var d=c.getLineInfo(this.input,a);b+=" ("+d.line+":"+d.column+")";var h=new SyntaxError(b);h.pos=a;h.loc=d;h.raisedAt=this.pos;throw h;};a.raiseRecoverable=a.raise;a.curPosition=function(){if(this.options.locations)return new c.Position(this.curLine,this.pos-this.lineStart)}},{"./locutil":5,"./state":10}],5:[function(a,l,f){function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function");
}f.__esModule=!0;f.getLineInfo=function(a,c){for(var d=1,e=0;;){g.lineBreakG.lastIndex=e;var m=g.lineBreakG.exec(a);if(m&&m.index<c)++d,e=m.index+m[0].length;else return new b(d,c-e)}};var g=a("./whitespace"),b=function(){function a(b,d){c(this,a);this.line=b;this.column=d}a.prototype.offset=function(b){return new a(this.line,this.column+b)};return a}();f.Position=b;f.SourceLocation=function h(a,b,m){c(this,h);this.start=b;this.end=m;null!==a.sourceFile&&(this.source=a.sourceFile)}},{"./whitespace":16}],
6:[function(a,l,f){var c=a("./tokentype");l=a("./state");var g=a("./util");a=l.Parser.prototype;a.toAssignable=function(a,c){if(6<=this.options.ecmaVersion&&a)switch(a.type){case "Identifier":case "ObjectPattern":case "ArrayPattern":break;case "ObjectExpression":a.type="ObjectPattern";for(var b=0;b<a.properties.length;b++){var d=a.properties[b];"init"!==d.kind&&this.raise(d.key.start,"Object pattern can't contain getter or setter");this.toAssignable(d.value,c)}break;case "ArrayExpression":a.type=
"ArrayPattern";this.toAssignableList(a.elements,c);break;case "AssignmentExpression":if("="===a.operator)a.type="AssignmentPattern",delete a.operator;else{this.raise(a.left.end,"Only '=' operator can be used for specifying default value.");break}case "AssignmentPattern":"YieldExpression"===a.right.type&&this.raise(a.right.start,"Yield expression cannot be a default value");break;case "ParenthesizedExpression":a.expression=this.toAssignable(a.expression,c);break;case "MemberExpression":if(!c)break;
default:this.raise(a.start,"Assigning to rvalue")}return a};a.toAssignableList=function(a,c){var b=a.length;if(b){var d=a[b-1];if(d&&"RestElement"==d.type)--b;else if(d&&"SpreadElement"==d.type){d.type="RestElement";var e=d.argument;this.toAssignable(e,c);"Identifier"!==e.type&&"MemberExpression"!==e.type&&"ArrayPattern"!==e.type&&this.unexpected(e.start);--b}c&&"RestElement"===d.type&&"Identifier"!==d.argument.type&&this.unexpected(d.argument.start)}for(d=0;d<b;d++)(e=a[d])&&this.toAssignable(e,
c);return a};a.parseSpread=function(a){var b=this.startNode();this.next();b.argument=this.parseMaybeAssign(a);return this.finishNode(b,"SpreadElement")};a.parseRest=function(a){var b=this.startNode();this.next();b.argument=a?this.type===c.types.name?this.parseIdent():this.unexpected():this.type===c.types.name||this.type===c.types.bracketL?this.parseBindingAtom():this.unexpected();return this.finishNode(b,"RestElement")};a.parseBindingAtom=function(){if(6>this.options.ecmaVersion)return this.parseIdent();
switch(this.type){case c.types.name:return this.parseIdent();case c.types.bracketL:var a=this.startNode();this.next();a.elements=this.parseBindingList(c.types.bracketR,!0,!0);return this.finishNode(a,"ArrayPattern");case c.types.braceL:return this.parseObj(!0);default:this.unexpected()}};a.parseBindingList=function(a,d,h,n){for(var b=[],m=!0;!this.eat(a);)if(m?m=!1:this.expect(c.types.comma),d&&this.type===c.types.comma)b.push(null);else if(h&&this.afterTrailingComma(a))break;else if(this.type===
c.types.ellipsis){d=this.parseRest(n);this.parseBindingListItem(d);b.push(d);this.type===c.types.comma&&this.raise(this.start,"Comma is not permitted after the rest element");this.expect(a);break}else{var p=this.parseMaybeDefault(this.start,this.startLoc);this.parseBindingListItem(p);b.push(p)}return b};a.parseBindingListItem=function(a){return a};a.parseMaybeDefault=function(a,d,h){h=h||this.parseBindingAtom();if(6>this.options.ecmaVersion||!this.eat(c.types.eq))return h;a=this.startNodeAt(a,d);
a.left=h;a.right=this.parseMaybeAssign();return this.finishNode(a,"AssignmentPattern")};a.checkLVal=function(a,c,h){switch(a.type){case "Identifier":this.strict&&this.reservedWordsStrictBind.test(a.name)&&this.raiseRecoverable(a.start,(c?"Binding ":"Assigning to ")+a.name+" in strict mode");h&&(g.has(h,a.name)&&this.raiseRecoverable(a.start,"Argument name clash"),h[a.name]=!0);break;case "MemberExpression":c&&this.raiseRecoverable(a.start,(c?"Binding":"Assigning to")+" member expression");break;case "ObjectPattern":for(var b=
0;b<a.properties.length;b++)this.checkLVal(a.properties[b].value,c,h);break;case "ArrayPattern":for(b=0;b<a.elements.length;b++){var e=a.elements[b];e&&this.checkLVal(e,c,h)}break;case "AssignmentPattern":this.checkLVal(a.left,c,h);break;case "RestElement":this.checkLVal(a.argument,c,h);break;case "ParenthesizedExpression":this.checkLVal(a.expression,c,h);break;default:this.raise(a.start,(c?"Binding":"Assigning to")+" rvalue")}}},{"./state":10,"./tokentype":14,"./util":15}],7:[function(a,l,f){function c(a,
b,c,e){a.type=b;a.end=c;this.options.locations&&(a.loc.end=e);this.options.ranges&&(a.range[1]=c);return a}f.__esModule=!0;l=a("./state");var g=a("./locutil"),b=function h(a,b,c){if(!(this instanceof h))throw new TypeError("Cannot call a class as a function");this.type="";this.start=b;this.end=0;a.options.locations&&(this.loc=new g.SourceLocation(a,c));a.options.directSourceFile&&(this.sourceFile=a.options.directSourceFile);a.options.ranges&&(this.range=[b,0])};f.Node=b;a=l.Parser.prototype;a.startNode=
function(){return new b(this,this.start,this.startLoc)};a.startNodeAt=function(a,c){return new b(this,a,c)};a.finishNode=function(a,b){return c.call(this,a,b,this.lastTokEnd,this.lastTokEndLoc)};a.finishNodeAt=function(a,b,e,m){return c.call(this,a,b,e,m)}},{"./locutil":5,"./state":10}],8:[function(a,l,f){function c(a,c){return function(e,m,d,h,k,q){e={type:e?"Block":"Line",value:m,start:d,end:h};a.locations&&(e.loc=new b.SourceLocation(this,k,q));a.ranges&&(e.range=[d,h]);c.push(e)}}f.__esModule=
!0;f.getOptions=function(a){var b={},e;for(e in d)b[e]=a&&g.has(a,e)?a[e]:d[e];null==b.allowReserved&&(b.allowReserved=5>b.ecmaVersion);g.isArray(b.onToken)&&function(){var a=b.onToken;b.onToken=function(b){return a.push(b)}}();g.isArray(b.onComment)&&(b.onComment=c(b,b.onComment));return b};var g=a("./util"),b=a("./locutil"),d={ecmaVersion:6,sourceType:"script",onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowHashBang:!1,
locations:!1,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1,plugins:{}};f.defaultOptions=d},{"./locutil":5,"./util":15}],9:[function(a,l,f){var c=a("./tokentype");l=a("./state");var g=a("./whitespace");a=l.Parser.prototype;a.isUseStrict=function(a){return 5<=this.options.ecmaVersion&&"ExpressionStatement"===a.type&&"Literal"===a.expression.type&&"use strict"===a.expression.raw.slice(1,-1)};a.eat=function(a){return this.type===a?(this.next(),
!0):!1};a.isContextual=function(a){return this.type===c.types.name&&this.value===a};a.eatContextual=function(a){return this.value===a&&this.eat(c.types.name)};a.expectContextual=function(a){this.eatContextual(a)||this.unexpected()};a.canInsertSemicolon=function(){return this.type===c.types.eof||this.type===c.types.braceR||g.lineBreak.test(this.input.slice(this.lastTokEnd,this.start))};a.insertSemicolon=function(){if(this.canInsertSemicolon()){if(this.options.onInsertedSemicolon)this.options.onInsertedSemicolon(this.lastTokEnd,
this.lastTokEndLoc);return!0}};a.semicolon=function(){this.eat(c.types.semi)||this.insertSemicolon()||this.unexpected()};a.afterTrailingComma=function(a){if(this.type==a){if(this.options.onTrailingComma)this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc);this.next();return!0}};a.expect=function(a){this.eat(a)||this.unexpected()};a.unexpected=function(a){this.raise(null!=a?a:this.start,"Unexpected token")};a.checkPatternErrors=function(a,c){var b=a&&a.trailingComma;if(!c)return!!b;
b&&this.raise(b,"Comma is not permitted after the rest element")};a.checkExpressionErrors=function(a,c){var b=a&&a.shorthandAssign;if(!c)return!!b;b&&this.raise(b,"Shorthand property assignments are valid only in destructuring patterns")}},{"./state":10,"./tokentype":14,"./whitespace":16}],10:[function(a,l,f){function c(a){return new RegExp("^("+a.replace(/ /g,"|")+")$")}f.__esModule=!0;var g=a("./identifier"),b=a("./tokentype"),d=a("./whitespace"),h=a("./options"),n={};f.plugins=n;a=function(){function a(e,
p,f){if(!(this instanceof a))throw new TypeError("Cannot call a class as a function");this.options=e=h.getOptions(e);this.sourceFile=e.sourceFile;this.keywords=c(g.keywords[6<=e.ecmaVersion?6:5]);var k=e.allowReserved?"":g.reservedWords[e.ecmaVersion]+("module"==e.sourceType?" await":"");this.reservedWords=c(k);k=(k?k+" ":"")+g.reservedWords.strict;this.reservedWordsStrict=c(k);this.reservedWordsStrictBind=c(k+" "+g.reservedWords.strictBind);this.input=String(p);this.containsEsc=!1;this.loadPlugins(e.plugins);
f?(this.pos=f,this.lineStart=Math.max(0,this.input.lastIndexOf("\n",f)),this.curLine=this.input.slice(0,this.lineStart).split(d.lineBreak).length):(this.pos=this.lineStart=0,this.curLine=1);this.type=b.types.eof;this.value=null;this.start=this.end=this.pos;this.startLoc=this.endLoc=this.curPosition();this.lastTokEndLoc=this.lastTokStartLoc=null;this.lastTokStart=this.lastTokEnd=this.pos;this.context=this.initialContext();this.exprAllowed=!0;this.strict=this.inModule="module"===e.sourceType;this.potentialArrowAt=
-1;this.inFunction=this.inGenerator=!1;this.labels=[];0===this.pos&&e.allowHashBang&&"#!"===this.input.slice(0,2)&&this.skipLineComment(2)}a.prototype.isKeyword=function(a){return this.keywords.test(a)};a.prototype.isReservedWord=function(a){return this.reservedWords.test(a)};a.prototype.extend=function(a,b){this[a]=b(this[a])};a.prototype.loadPlugins=function(a){for(var b in a){var c=n[b];if(!c)throw Error("Plugin '"+b+"' not found");c(this,a[b])}};a.prototype.parse=function(){var a=this.options.program||
this.startNode();this.nextToken();return this.parseTopLevel(a)};return a}();f.Parser=a},{"./identifier":2,"./options":8,"./tokentype":14,"./whitespace":16}],11:[function(a,l,f){var c=a("./tokentype");l=a("./state");var g=a("./whitespace"),b=a("./identifier");a=l.Parser.prototype;a.parseTopLevel=function(a){var b=!0;a.body||(a.body=[]);for(;this.type!==c.types.eof;){var e=this.parseStatement(!0,!0);a.body.push(e);b&&(this.isUseStrict(e)&&this.setStrict(!0),b=!1)}this.next();6<=this.options.ecmaVersion&&
(a.sourceType=this.options.sourceType);return this.finishNode(a,"Program")};var d={kind:"loop"},h={kind:"switch"};a.isLet=function(){if(this.type!==c.types.name||6>this.options.ecmaVersion||"let"!=this.value)return!1;g.skipWhiteSpace.lastIndex=this.pos;var a=g.skipWhiteSpace.exec(this.input),a=this.pos+a[0].length,d=this.input.charCodeAt(a);if(91===d||123==d)return!0;if(b.isIdentifierStart(d,!0)){for(d=a+1;b.isIdentifierChar(this.input.charCodeAt(d,!0));++d);a=this.input.slice(a,d);if(!this.isKeyword(a))return!0}return!1};
a.parseStatement=function(a,b){var e=this.type,d=this.startNode(),k=void 0;this.isLet()&&(e=c.types._var,k="let");switch(e){case c.types._break:case c.types._continue:return this.parseBreakContinueStatement(d,e.keyword);case c.types._debugger:return this.parseDebuggerStatement(d);case c.types._do:return this.parseDoStatement(d);case c.types._for:return this.parseForStatement(d);case c.types._function:return!a&&6<=this.options.ecmaVersion&&this.unexpected(),this.parseFunctionStatement(d);case c.types._class:return a||
this.unexpected(),this.parseClass(d,!0);case c.types._if:return this.parseIfStatement(d);case c.types._return:return this.parseReturnStatement(d);case c.types._switch:return this.parseSwitchStatement(d);case c.types._throw:return this.parseThrowStatement(d);case c.types._try:return this.parseTryStatement(d);case c.types._const:case c.types._var:return k=k||this.value,a||"var"==k||this.unexpected(),this.parseVarStatement(d,k);case c.types._while:return this.parseWhileStatement(d);case c.types._with:return this.parseWithStatement(d);
case c.types.braceL:return this.parseBlock();case c.types.semi:return this.parseEmptyStatement(d);case c.types._export:case c.types._import:return this.options.allowImportExportEverywhere||(b||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),e===c.types._import?this.parseImport(d):this.parseExport(d);default:var k=this.value,m=this.parseExpression();return e===c.types.name&&
"Identifier"===m.type&&this.eat(c.types.colon)?this.parseLabeledStatement(d,k,m):this.parseExpressionStatement(d,m)}};a.parseBreakContinueStatement=function(a,b){var e="break"==b;this.next();this.eat(c.types.semi)||this.insertSemicolon()?a.label=null:this.type!==c.types.name?this.unexpected():(a.label=this.parseIdent(),this.semicolon());for(var d=0;d<this.labels.length;++d){var k=this.labels[d];if(null==a.label||k.name===a.label.name){if(null!=k.kind&&(e||"loop"===k.kind))break;if(a.label&&e)break}}d===
this.labels.length&&this.raise(a.start,"Unsyntactic "+b);return this.finishNode(a,e?"BreakStatement":"ContinueStatement")};a.parseDebuggerStatement=function(a){this.next();this.semicolon();return this.finishNode(a,"DebuggerStatement")};a.parseDoStatement=function(a){this.next();this.labels.push(d);a.body=this.parseStatement(!1);this.labels.pop();this.expect(c.types._while);a.test=this.parseParenExpression();6<=this.options.ecmaVersion?this.eat(c.types.semi):this.semicolon();return this.finishNode(a,
"DoWhileStatement")};a.parseForStatement=function(a){this.next();this.labels.push(d);this.expect(c.types.parenL);if(this.type===c.types.semi)return this.parseFor(a,null);var b=this.isLet();if(this.type===c.types._var||this.type===c.types._const||b){var e=this.startNode(),b=b?"let":this.value;this.next();this.parseVar(e,!0,b);this.finishNode(e,"VariableDeclaration");return!(this.type===c.types._in||6<=this.options.ecmaVersion&&this.isContextual("of"))||1!==e.declarations.length||"var"!==b&&e.declarations[0].init?
this.parseFor(a,e):this.parseForIn(a,e)}e={shorthandAssign:0,trailingComma:0};b=this.parseExpression(!0,e);if(this.type===c.types._in||6<=this.options.ecmaVersion&&this.isContextual("of"))return this.checkPatternErrors(e,!0),this.toAssignable(b),this.checkLVal(b),this.parseForIn(a,b);this.checkExpressionErrors(e,!0);return this.parseFor(a,b)};a.parseFunctionStatement=function(a){this.next();return this.parseFunction(a,!0)};a.parseIfStatement=function(a){this.next();a.test=this.parseParenExpression();
a.consequent=this.parseStatement(!1);a.alternate=this.eat(c.types._else)?this.parseStatement(!1):null;return this.finishNode(a,"IfStatement")};a.parseReturnStatement=function(a){this.inFunction||this.options.allowReturnOutsideFunction||this.raise(this.start,"'return' outside of function");this.next();this.eat(c.types.semi)||this.insertSemicolon()?a.argument=null:(a.argument=this.parseExpression(),this.semicolon());return this.finishNode(a,"ReturnStatement")};a.parseSwitchStatement=function(a){this.next();
a.discriminant=this.parseParenExpression();a.cases=[];this.expect(c.types.braceL);this.labels.push(h);for(var b,e=!1;this.type!=c.types.braceR;)if(this.type===c.types._case||this.type===c.types._default){var d=this.type===c.types._case;b&&this.finishNode(b,"SwitchCase");a.cases.push(b=this.startNode());b.consequent=[];this.next();d?b.test=this.parseExpression():(e&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),e=!0,b.test=null);this.expect(c.types.colon)}else b||this.unexpected(),
b.consequent.push(this.parseStatement(!0));b&&this.finishNode(b,"SwitchCase");this.next();this.labels.pop();return this.finishNode(a,"SwitchStatement")};a.parseThrowStatement=function(a){this.next();g.lineBreak.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw");a.argument=this.parseExpression();this.semicolon();return this.finishNode(a,"ThrowStatement")};var n=[];a.parseTryStatement=function(a){this.next();a.block=this.parseBlock();a.handler=
null;if(this.type===c.types._catch){var b=this.startNode();this.next();this.expect(c.types.parenL);b.param=this.parseBindingAtom();this.checkLVal(b.param,!0);this.expect(c.types.parenR);b.body=this.parseBlock();a.handler=this.finishNode(b,"CatchClause")}a.finalizer=this.eat(c.types._finally)?this.parseBlock():null;a.handler||a.finalizer||this.raise(a.start,"Missing catch or finally clause");return this.finishNode(a,"TryStatement")};a.parseVarStatement=function(a,b){this.next();this.parseVar(a,!1,
b);this.semicolon();return this.finishNode(a,"VariableDeclaration")};a.parseWhileStatement=function(a){this.next();a.test=this.parseParenExpression();this.labels.push(d);a.body=this.parseStatement(!1);this.labels.pop();return this.finishNode(a,"WhileStatement")};a.parseWithStatement=function(a){this.strict&&this.raise(this.start,"'with' in strict mode");this.next();a.object=this.parseParenExpression();a.body=this.parseStatement(!1);return this.finishNode(a,"WithStatement")};a.parseEmptyStatement=
function(a){this.next();return this.finishNode(a,"EmptyStatement")};a.parseLabeledStatement=function(a,b,d){for(var e=0;e<this.labels.length;++e)this.labels[e].name===b&&this.raise(d.start,"Label '"+b+"' is already declared");for(var k=this.type.isLoop?"loop":this.type===c.types._switch?"switch":null,e=this.labels.length-1;0<=e;e--){var q=this.labels[e];if(q.statementStart==a.start)q.statementStart=this.start,q.kind=k;else break}this.labels.push({name:b,kind:k,statementStart:this.start});a.body=this.parseStatement(!0);
this.labels.pop();a.label=d;return this.finishNode(a,"LabeledStatement")};a.parseExpressionStatement=function(a,b){a.expression=b;this.semicolon();return this.finishNode(a,"ExpressionStatement")};a.parseBlock=function(a){var b=this.startNode(),e=!0,d=void 0;b.body=[];for(this.expect(c.types.braceL);!this.eat(c.types.braceR);){var k=this.parseStatement(!0);b.body.push(k);e&&a&&this.isUseStrict(k)&&(d=this.strict,this.setStrict(this.strict=!0));e=!1}!1===d&&this.setStrict(!1);return this.finishNode(b,
"BlockStatement")};a.parseFor=function(a,b){a.init=b;this.expect(c.types.semi);a.test=this.type===c.types.semi?null:this.parseExpression();this.expect(c.types.semi);a.update=this.type===c.types.parenR?null:this.parseExpression();this.expect(c.types.parenR);a.body=this.parseStatement(!1);this.labels.pop();return this.finishNode(a,"ForStatement")};a.parseForIn=function(a,b){var e=this.type===c.types._in?"ForInStatement":"ForOfStatement";this.next();a.left=b;a.right=this.parseExpression();this.expect(c.types.parenR);
a.body=this.parseStatement(!1);this.labels.pop();return this.finishNode(a,e)};a.parseVar=function(a,b,d){a.declarations=[];for(a.kind=d;;){var e=this.startNode();this.parseVarId(e);this.eat(c.types.eq)?e.init=this.parseMaybeAssign(b):"const"!==d||this.type===c.types._in||6<=this.options.ecmaVersion&&this.isContextual("of")?"Identifier"==e.id.type||b&&(this.type===c.types._in||this.isContextual("of"))?e.init=null:this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):
this.unexpected();a.declarations.push(this.finishNode(e,"VariableDeclarator"));if(!this.eat(c.types.comma))break}return a};a.parseVarId=function(a){a.id=this.parseBindingAtom();this.checkLVal(a.id,!0)};a.parseFunction=function(a,b,d){this.initFunction(a);6<=this.options.ecmaVersion&&(a.generator=this.eat(c.types.star));var e=this.inGenerator;this.inGenerator=a.generator;if(b||this.type===c.types.name)a.id=this.parseIdent();this.parseFunctionParams(a);this.parseFunctionBody(a,d);this.inGenerator=e;
return this.finishNode(a,b?"FunctionDeclaration":"FunctionExpression")};a.parseFunctionParams=function(a){this.expect(c.types.parenL);a.params=this.parseBindingList(c.types.parenR,!1,!1,!0)};a.parseClass=function(a,b){this.next();this.parseClassId(a,b);this.parseClassSuper(a);var e=this.startNode(),d=!1;e.body=[];for(this.expect(c.types.braceL);!this.eat(c.types.braceR);)if(!this.eat(c.types.semi)){var k=this.startNode(),q=this.eat(c.types.star),h=this.type===c.types.name&&"static"===this.value;this.parsePropertyName(k);
k["static"]=h&&this.type!==c.types.parenL;k["static"]&&(q&&this.unexpected(),q=this.eat(c.types.star),this.parsePropertyName(k));k.kind="method";h=!1;if(!k.computed){var f=k.key;q||"Identifier"!==f.type||this.type===c.types.parenL||"get"!==f.name&&"set"!==f.name||(h=!0,k.kind=f.name,f=this.parsePropertyName(k));!k["static"]&&("Identifier"===f.type&&"constructor"===f.name||"Literal"===f.type&&"constructor"===f.value)&&(d&&this.raise(f.start,"Duplicate constructor in the same class"),h&&this.raise(f.start,
"Constructor can't have get/set modifier"),q&&this.raise(f.start,"Constructor can't be a generator"),k.kind="constructor",d=!0)}this.parseClassMethod(e,k,q);h&&(k.value.params.length!==("get"===k.kind?0:1)&&(q=k.value.start,"get"===k.kind?this.raiseRecoverable(q,"getter should have no params"):this.raiseRecoverable(q,"setter should have exactly one param")),"set"===k.kind&&"RestElement"===k.value.params[0].type&&this.raise(k.value.params[0].start,"Setter cannot use rest params"))}a.body=this.finishNode(e,
"ClassBody");return this.finishNode(a,b?"ClassDeclaration":"ClassExpression")};a.parseClassMethod=function(a,b,c){b.value=this.parseMethod(c);a.body.push(this.finishNode(b,"MethodDefinition"))};a.parseClassId=function(a,b){a.id=this.type===c.types.name?this.parseIdent():b?this.unexpected():null};a.parseClassSuper=function(a){a.superClass=this.eat(c.types._extends)?this.parseExprSubscripts():null};a.parseExport=function(a){this.next();if(this.eat(c.types.star))return this.expectContextual("from"),
a.source=this.type===c.types.string?this.parseExprAtom():this.unexpected(),this.semicolon(),this.finishNode(a,"ExportAllDeclaration");if(this.eat(c.types._default)){var b=this.type==c.types.parenL,e=this.parseMaybeAssign(),d=!0;b||"FunctionExpression"!=e.type&&"ClassExpression"!=e.type||(d=!1,e.id&&(e.type="FunctionExpression"==e.type?"FunctionDeclaration":"ClassDeclaration"));a.declaration=e;d&&this.semicolon();return this.finishNode(a,"ExportDefaultDeclaration")}if(this.shouldParseExportStatement())a.declaration=
this.parseStatement(!0),a.specifiers=[],a.source=null;else{a.declaration=null;a.specifiers=this.parseExportSpecifiers();if(this.eatContextual("from"))a.source=this.type===c.types.string?this.parseExprAtom():this.unexpected();else{for(b=0;b<a.specifiers.length;b++)(this.keywords.test(a.specifiers[b].local.name)||this.reservedWords.test(a.specifiers[b].local.name))&&this.unexpected(a.specifiers[b].local.start);a.source=null}this.semicolon()}return this.finishNode(a,"ExportNamedDeclaration")};a.shouldParseExportStatement=
function(){return this.type.keyword||this.isLet()};a.parseExportSpecifiers=function(){var a=[],b=!0;for(this.expect(c.types.braceL);!this.eat(c.types.braceR);){if(b)b=!1;else if(this.expect(c.types.comma),this.afterTrailingComma(c.types.braceR))break;var d=this.startNode();d.local=this.parseIdent(this.type===c.types._default);d.exported=this.eatContextual("as")?this.parseIdent(!0):d.local;a.push(this.finishNode(d,"ExportSpecifier"))}return a};a.parseImport=function(a){this.next();this.type===c.types.string?
(a.specifiers=n,a.source=this.parseExprAtom()):(a.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),a.source=this.type===c.types.string?this.parseExprAtom():this.unexpected());this.semicolon();return this.finishNode(a,"ImportDeclaration")};a.parseImportSpecifiers=function(){var a=[],b=!0;if(this.type===c.types.name){var d=this.startNode();d.local=this.parseIdent();this.checkLVal(d.local,!0);a.push(this.finishNode(d,"ImportDefaultSpecifier"));if(!this.eat(c.types.comma))return a}if(this.type===
c.types.star)return d=this.startNode(),this.next(),this.expectContextual("as"),d.local=this.parseIdent(),this.checkLVal(d.local,!0),a.push(this.finishNode(d,"ImportNamespaceSpecifier")),a;for(this.expect(c.types.braceL);!this.eat(c.types.braceR);){if(b)b=!1;else if(this.expect(c.types.comma),this.afterTrailingComma(c.types.braceR))break;d=this.startNode();d.imported=this.parseIdent(!0);this.eatContextual("as")?d.local=this.parseIdent():(d.local=d.imported,this.isKeyword(d.local.name)&&this.unexpected(d.local.start),
this.reservedWordsStrict.test(d.local.name)&&this.raise(d.local.start,"The keyword '"+d.local.name+"' is reserved"));this.checkLVal(d.local,!0);a.push(this.finishNode(d,"ImportSpecifier"))}return a}},{"./identifier":2,"./state":10,"./tokentype":14,"./whitespace":16}],12:[function(a,l,f){f.__esModule=!0;l=a("./state");var c=a("./tokentype"),g=a("./whitespace");a=function h(a,b,c,f){if(!(this instanceof h))throw new TypeError("Cannot call a class as a function");this.token=a;this.isExpr=!!b;this.preserveSpace=
!!c;this.override=f};f.TokContext=a;var b={b_stat:new a("{",!1),b_expr:new a("{",!0),b_tmpl:new a("${",!0),p_stat:new a("(",!1),p_expr:new a("(",!0),q_tmpl:new a("`",!0,!0,function(a){return a.readTmplToken()}),f_expr:new a("function",!0)};f.types=b;f=l.Parser.prototype;f.initialContext=function(){return[b.b_stat]};f.braceIsBlock=function(a){if(a===c.types.colon){var f=this.curContext();if(f===b.b_stat||f===b.b_expr)return!f.isExpr}return a===c.types._return?g.lineBreak.test(this.input.slice(this.lastTokEnd,
this.start)):a===c.types._else||a===c.types.semi||a===c.types.eof||a===c.types.parenR?!0:a==c.types.braceL?this.curContext()===b.b_stat:!this.exprAllowed};f.updateContext=function(a){var b,e=this.type;e.keyword&&a==c.types.dot?this.exprAllowed=!1:(b=e.updateContext)?b.call(this,a):this.exprAllowed=e.beforeExpr};c.types.parenR.updateContext=c.types.braceR.updateContext=function(){if(1==this.context.length)this.exprAllowed=!0;else{var a=this.context.pop();a===b.b_stat&&this.curContext()===b.f_expr?
(this.context.pop(),this.exprAllowed=!1):this.exprAllowed=a===b.b_tmpl?!0:!a.isExpr}};c.types.braceL.updateContext=function(a){this.context.push(this.braceIsBlock(a)?b.b_stat:b.b_expr);this.exprAllowed=!0};c.types.dollarBraceL.updateContext=function(){this.context.push(b.b_tmpl);this.exprAllowed=!0};c.types.parenL.updateContext=function(a){this.context.push(a===c.types._if||a===c.types._for||a===c.types._with||a===c.types._while?b.p_stat:b.p_expr);this.exprAllowed=!0};c.types.incDec.updateContext=
function(){};c.types._function.updateContext=function(a){!a.beforeExpr||a===c.types.semi||a===c.types._else||a===c.types.colon&&this.curContext()===b.b_stat||this.context.push(b.f_expr);this.exprAllowed=!1};c.types.backQuote.updateContext=function(){this.curContext()===b.q_tmpl?this.context.pop():this.context.push(b.q_tmpl);this.exprAllowed=!1}},{"./state":10,"./tokentype":14,"./whitespace":16}],13:[function(a,l,f){function c(a,b,c,d){try{return new RegExp(a,b)}catch(t){if(void 0!==c)throw t instanceof
SyntaxError&&d.raise(c,"Error parsing regular expression: "+t.message),t;}}function g(a){if(65535>=a)return String.fromCharCode(a);a-=65536;return String.fromCharCode((a>>10)+55296,(a&1023)+56320)}f.__esModule=!0;var b=a("./identifier"),d=a("./tokentype");l=a("./state");var h=a("./locutil"),n=a("./whitespace"),e=function k(a){if(!(this instanceof k))throw new TypeError("Cannot call a class as a function");this.type=a.type;this.value=a.value;this.start=a.start;this.end=a.end;a.options.locations&&(this.loc=
new h.SourceLocation(a,a.startLoc,a.endLoc));a.options.ranges&&(this.range=[a.start,a.end])};f.Token=e;a=l.Parser.prototype;var m="object"==typeof Packages&&"[object JavaPackage]"==Object.prototype.toString.call(Packages);a.next=function(){if(this.options.onToken)this.options.onToken(new e(this));this.lastTokEnd=this.end;this.lastTokStart=this.start;this.lastTokEndLoc=this.endLoc;this.lastTokStartLoc=this.startLoc;this.nextToken()};a.getToken=function(){this.next();return new e(this)};"undefined"!==
typeof Symbol&&(a[Symbol.iterator]=function(){var a=this;return{next:function(){var b=a.getToken();return{done:b.type===d.types.eof,value:b}}}});a.setStrict=function(a){this.strict=a;if(this.type===d.types.num||this.type===d.types.string){this.pos=this.start;if(this.options.locations)for(;this.pos<this.lineStart;)this.lineStart=this.input.lastIndexOf("\n",this.lineStart-2)+1,--this.curLine;this.nextToken()}};a.curContext=function(){return this.context[this.context.length-1]};a.nextToken=function(){var a=
this.curContext();a&&a.preserveSpace||this.skipSpace();this.start=this.pos;this.options.locations&&(this.startLoc=this.curPosition());if(this.pos>=this.input.length)return this.finishToken(d.types.eof);if(a.override)return a.override(this);this.readToken(this.fullCharCodeAtPos())};a.readToken=function(a){return b.isIdentifierStart(a,6<=this.options.ecmaVersion)||92===a?this.readWord():this.getTokenFromCode(a)};a.fullCharCodeAtPos=function(){var a=this.input.charCodeAt(this.pos);if(55295>=a||57344<=
a)return a;var b=this.input.charCodeAt(this.pos+1);return(a<<10)+b-56613888};a.skipBlockComment=function(){var a=this.options.onComment&&this.curPosition(),b=this.pos,c=this.input.indexOf("*/",this.pos+=2);-1===c&&this.raise(this.pos-2,"Unterminated comment");this.pos=c+2;if(this.options.locations){n.lineBreakG.lastIndex=b;for(var d=void 0;(d=n.lineBreakG.exec(this.input))&&d.index<this.pos;)++this.curLine,this.lineStart=d.index+d[0].length}if(this.options.onComment)this.options.onComment(!0,this.input.slice(b+
2,c),b,this.pos,a,this.curPosition())};a.skipLineComment=function(a){for(var b=this.pos,c=this.options.onComment&&this.curPosition(),d=this.input.charCodeAt(this.pos+=a);this.pos<this.input.length&&10!==d&&13!==d&&8232!==d&&8233!==d;)++this.pos,d=this.input.charCodeAt(this.pos);if(this.options.onComment)this.options.onComment(!1,this.input.slice(b+a,this.pos),b,this.pos,c,this.curPosition())};a.skipSpace=function(){a:for(;this.pos<this.input.length;){var a=this.input.charCodeAt(this.pos);switch(a){case 32:case 160:++this.pos;
break;case 13:10===this.input.charCodeAt(this.pos+1)&&++this.pos;case 10:case 8232:case 8233:++this.pos;this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break a}break;default:if(8<a&&14>a||5760<=a&&n.nonASCIIwhitespace.test(String.fromCharCode(a)))++this.pos;else break a}}};a.finishToken=function(a,b){this.end=this.pos;this.options.locations&&
(this.endLoc=this.curPosition());var c=this.type;this.type=a;this.value=b;this.updateContext(c)};a.readToken_dot=function(){var a=this.input.charCodeAt(this.pos+1);if(48<=a&&57>=a)return this.readNumber(!0);var b=this.input.charCodeAt(this.pos+2);if(6<=this.options.ecmaVersion&&46===a&&46===b)return this.pos+=3,this.finishToken(d.types.ellipsis);++this.pos;return this.finishToken(d.types.dot)};a.readToken_slash=function(){var a=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,
this.readRegexp()):61===a?this.finishOp(d.types.assign,2):this.finishOp(d.types.slash,1)};a.readToken_mult_modulo_exp=function(a){var b=this.input.charCodeAt(this.pos+1),c=1;a=42===a?d.types.star:d.types.modulo;7<=this.options.ecmaVersion&&42===b&&(++c,a=d.types.starstar,b=this.input.charCodeAt(this.pos+2));return 61===b?this.finishOp(d.types.assign,c+1):this.finishOp(a,c)};a.readToken_pipe_amp=function(a){var b=this.input.charCodeAt(this.pos+1);return b===a?this.finishOp(124===a?d.types.logicalOR:
d.types.logicalAND,2):61===b?this.finishOp(d.types.assign,2):this.finishOp(124===a?d.types.bitwiseOR:d.types.bitwiseAND,1)};a.readToken_caret=function(){return 61===this.input.charCodeAt(this.pos+1)?this.finishOp(d.types.assign,2):this.finishOp(d.types.bitwiseXOR,1)};a.readToken_plus_min=function(a){var b=this.input.charCodeAt(this.pos+1);return b===a?45==b&&62==this.input.charCodeAt(this.pos+2)&&n.lineBreak.test(this.input.slice(this.lastTokEnd,this.pos))?(this.skipLineComment(3),this.skipSpace(),
this.nextToken()):this.finishOp(d.types.incDec,2):61===b?this.finishOp(d.types.assign,2):this.finishOp(d.types.plusMin,1)};a.readToken_lt_gt=function(a){var b=this.input.charCodeAt(this.pos+1),c=1;if(b===a)return c=62===a&&62===this.input.charCodeAt(this.pos+2)?3:2,61===this.input.charCodeAt(this.pos+c)?this.finishOp(d.types.assign,c+1):this.finishOp(d.types.bitShift,c);if(33==b&&60==a&&45==this.input.charCodeAt(this.pos+2)&&45==this.input.charCodeAt(this.pos+3))return this.inModule&&this.unexpected(),
this.skipLineComment(4),this.skipSpace(),this.nextToken();61===b&&(c=2);return this.finishOp(d.types.relational,c)};a.readToken_eq_excl=function(a){var b=this.input.charCodeAt(this.pos+1);return 61===b?this.finishOp(d.types.equality,61===this.input.charCodeAt(this.pos+2)?3:2):61===a&&62===b&&6<=this.options.ecmaVersion?(this.pos+=2,this.finishToken(d.types.arrow)):this.finishOp(61===a?d.types.eq:d.types.prefix,1)};a.getTokenFromCode=function(a){switch(a){case 46:return this.readToken_dot();case 40:return++this.pos,
this.finishToken(d.types.parenL);case 41:return++this.pos,this.finishToken(d.types.parenR);case 59:return++this.pos,this.finishToken(d.types.semi);case 44:return++this.pos,this.finishToken(d.types.comma);case 91:return++this.pos,this.finishToken(d.types.bracketL);case 93:return++this.pos,this.finishToken(d.types.bracketR);case 123:return++this.pos,this.finishToken(d.types.braceL);case 125:return++this.pos,this.finishToken(d.types.braceR);case 58:return++this.pos,this.finishToken(d.types.colon);case 63:return++this.pos,
this.finishToken(d.types.question);case 96:if(6>this.options.ecmaVersion)break;++this.pos;return this.finishToken(d.types.backQuote);case 48:a=this.input.charCodeAt(this.pos+1);if(120===a||88===a)return this.readRadixNumber(16);if(6<=this.options.ecmaVersion){if(111===a||79===a)return this.readRadixNumber(8);if(98===a||66===a)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(a);case 47:return this.readToken_slash();
case 37:case 42:return this.readToken_mult_modulo_exp(a);case 124:case 38:return this.readToken_pipe_amp(a);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(a);case 60:case 62:return this.readToken_lt_gt(a);case 61:case 33:return this.readToken_eq_excl(a);case 126:return this.finishOp(d.types.prefix,1)}this.raise(this.pos,"Unexpected character '"+g(a)+"'")};a.finishOp=function(a,b){var c=this.input.slice(this.pos,this.pos+b);this.pos+=b;return this.finishToken(a,
c)};var p=!!c("\uffff","u");a.readRegexp=function(){for(var a=this,b=void 0,e=void 0,f=this.pos;;){this.pos>=this.input.length&&this.raise(f,"Unterminated regular expression");var g=this.input.charAt(this.pos);n.lineBreak.test(g)&&this.raise(f,"Unterminated regular expression");if(b)b=!1;else{if("["===g)e=!0;else if("]"===g&&e)e=!1;else if("/"===g&&!e)break;b="\\"===g}++this.pos}b=this.input.slice(f,this.pos);++this.pos;e=this.readWord1();g=b;if(e){var h=/^[gim]*$/;6<=this.options.ecmaVersion&&(h=
/^[gimuy]*$/);h.test(e)||this.raise(f,"Invalid regular expression flag");0<=e.indexOf("u")&&!p&&(g=g.replace(/\\u\{([0-9a-fA-F]+)\}/g,function(b,c,d){c=Number("0x"+c);1114111<c&&a.raise(f+d+3,"Code point out of bounds");return"x"}),g=g.replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x"))}h=null;m||(c(g,void 0,f,this),h=c(b,e));return this.finishToken(d.types.regexp,{pattern:b,flags:e,value:h})};a.readInt=function(a,b){for(var c=this.pos,d=0,e=0,f=null==b?Infinity:b;e<f;++e){var k=this.input.charCodeAt(this.pos),
k=97<=k?k-97+10:65<=k?k-65+10:48<=k&&57>=k?k-48:Infinity;if(k>=a)break;++this.pos;d=d*a+k}return this.pos===c||null!=b&&this.pos-c!==b?null:d};a.readRadixNumber=function(a){this.pos+=2;var c=this.readInt(a);null==c&&this.raise(this.start+2,"Expected number in radix "+a);b.isIdentifierStart(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");return this.finishToken(d.types.num,c)};a.readNumber=function(a){var c=this.pos,e=!1,f=48===this.input.charCodeAt(this.pos);a||
null!==this.readInt(10)||this.raise(c,"Invalid number");a=this.input.charCodeAt(this.pos);46===a&&(++this.pos,this.readInt(10),e=!0,a=this.input.charCodeAt(this.pos));if(69===a||101===a)a=this.input.charCodeAt(++this.pos),43!==a&&45!==a||++this.pos,null===this.readInt(10)&&this.raise(c,"Invalid number"),e=!0;b.isIdentifierStart(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");a=this.input.slice(c,this.pos);var k=void 0;e?k=parseFloat(a):f&&1!==a.length?/[89]/.test(a)||
this.strict?this.raise(c,"Invalid number"):k=parseInt(a,8):k=parseInt(a,10);return this.finishToken(d.types.num,k)};a.readCodePoint=function(){if(123===this.input.charCodeAt(this.pos)){6>this.options.ecmaVersion&&this.unexpected();var a=++this.pos;var b=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos);++this.pos;1114111<b&&this.raise(a,"Code point out of bounds")}else b=this.readHexChar(4);return b};a.readString=function(a){for(var b="",c=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,
"Unterminated string constant");var e=this.input.charCodeAt(this.pos);if(e===a)break;92===e?(b+=this.input.slice(c,this.pos),b+=this.readEscapedChar(!1),c=this.pos):(n.isNewLine(e)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}b+=this.input.slice(c,this.pos++);return this.finishToken(d.types.string,b)};a.readTmplToken=function(){for(var a="",b=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var c=this.input.charCodeAt(this.pos);if(96===
c||36===c&&123===this.input.charCodeAt(this.pos+1)){if(this.pos===this.start&&this.type===d.types.template){if(36===c)return this.pos+=2,this.finishToken(d.types.dollarBraceL);++this.pos;return this.finishToken(d.types.backQuote)}a+=this.input.slice(b,this.pos);return this.finishToken(d.types.template,a)}if(92===c)a+=this.input.slice(b,this.pos),a+=this.readEscapedChar(!0),b=this.pos;else if(n.isNewLine(c)){a+=this.input.slice(b,this.pos);++this.pos;switch(c){case 13:10===this.input.charCodeAt(this.pos)&&
++this.pos;case 10:a+="\n";break;default:a+=String.fromCharCode(c)}this.options.locations&&(++this.curLine,this.lineStart=this.pos);b=this.pos}else++this.pos}};a.readEscapedChar=function(a){var b=this.input.charCodeAt(++this.pos);++this.pos;switch(b){case 110:return"\n";case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return g(this.readCodePoint());case 116:return"\t";case 98:return"\b";case 118:return"\x0B";case 102:return"\f";case 13:10===this.input.charCodeAt(this.pos)&&
++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";default:if(48<=b&&55>=b){var b=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],c=parseInt(b,8);255<c&&(b=b.slice(0,-1),c=parseInt(b,8));"0"!==b&&(this.strict||a)&&this.raise(this.pos-2,"Octal literal in strict mode");this.pos+=b.length-1;return String.fromCharCode(c)}return String.fromCharCode(b)}};a.readHexChar=function(a){var b=this.pos;a=this.readInt(16,a);null===a&&this.raise(b,"Bad character escape sequence");
return a};a.readWord1=function(){this.containsEsc=!1;for(var a="",c=!0,d=this.pos,e=6<=this.options.ecmaVersion;this.pos<this.input.length;){var f=this.fullCharCodeAtPos();if(b.isIdentifierChar(f,e))this.pos+=65535>=f?1:2;else if(92===f)this.containsEsc=!0,a+=this.input.slice(d,this.pos),d=this.pos,117!=this.input.charCodeAt(++this.pos)&&this.raise(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos,f=this.readCodePoint(),(c?b.isIdentifierStart:b.isIdentifierChar)(f,e)||this.raise(d,
"Invalid Unicode escape"),a+=g(f),d=this.pos;else break;c=!1}return a+this.input.slice(d,this.pos)};a.readWord=function(){var a=this.readWord1(),b=d.types.name;(6<=this.options.ecmaVersion||!this.containsEsc)&&this.keywords.test(a)&&(b=d.keywords[a]);return this.finishToken(b,a)}},{"./identifier":2,"./locutil":5,"./state":10,"./tokentype":14,"./whitespace":16}],14:[function(a,l,f){function c(a,c){return new b(a,{beforeExpr:!0,binop:c})}function g(a){var c=1>=arguments.length||void 0===arguments[1]?
{}:arguments[1];c.keyword=a;h[a]=d["_"+a]=new b(a,c)}f.__esModule=!0;var b=function e(a){var b=1>=arguments.length||void 0===arguments[1]?{}:arguments[1];if(!(this instanceof e))throw new TypeError("Cannot call a class as a function");this.label=a;this.keyword=b.keyword;this.beforeExpr=!!b.beforeExpr;this.startsExpr=!!b.startsExpr;this.isLoop=!!b.isLoop;this.isAssign=!!b.isAssign;this.prefix=!!b.prefix;this.postfix=!!b.postfix;this.binop=b.binop||null;this.updateContext=null};f.TokenType=b;a={beforeExpr:!0};
l={startsExpr:!0};var d={num:new b("num",l),regexp:new b("regexp",l),string:new b("string",l),name:new b("name",l),eof:new b("eof"),bracketL:new b("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new b("]"),braceL:new b("{",{beforeExpr:!0,startsExpr:!0}),braceR:new b("}"),parenL:new b("(",{beforeExpr:!0,startsExpr:!0}),parenR:new b(")"),comma:new b(",",a),semi:new b(";",a),colon:new b(":",a),dot:new b("."),question:new b("?",a),arrow:new b("=>",a),template:new b("template"),ellipsis:new b("...",a),backQuote:new b("`",
l),dollarBraceL:new b("${",{beforeExpr:!0,startsExpr:!0}),eq:new b("=",{beforeExpr:!0,isAssign:!0}),assign:new b("_=",{beforeExpr:!0,isAssign:!0}),incDec:new b("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new b("prefix",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:c("||",1),logicalAND:c("&&",2),bitwiseOR:c("|",3),bitwiseXOR:c("^",4),bitwiseAND:c("&",5),equality:c("==/!=",6),relational:c("</>",7),bitShift:c("<</>>",8),plusMin:new b("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),
modulo:c("%",10),star:c("*",10),slash:c("/",10),starstar:new b("**",{beforeExpr:!0})};f.types=d;var h={};f.keywords=h;g("break");g("case",a);g("catch");g("continue");g("debugger");g("default",a);g("do",{isLoop:!0,beforeExpr:!0});g("else",a);g("finally");g("for",{isLoop:!0});g("function",l);g("if");g("return",a);g("switch");g("throw",a);g("try");g("var");g("const");g("while",{isLoop:!0});g("with");g("new",{beforeExpr:!0,startsExpr:!0});g("this",l);g("super",l);g("class");g("extends",a);g("export");
g("import");g("null",l);g("true",l);g("false",l);g("in",{beforeExpr:!0,binop:7});g("instanceof",{beforeExpr:!0,binop:7});g("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0});g("void",{beforeExpr:!0,prefix:!0,startsExpr:!0});g("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},{}],15:[function(a,l,f){f.__esModule=!0;f.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)};f.has=function(a,f){return Object.prototype.hasOwnProperty.call(a,f)}},{}],16:[function(a,l,f){f.__esModule=
!0;f.isNewLine=function(a){return 10===a||13===a||8232===a||8233==a};a=/\r\n?|\n|\u2028|\u2029/;f.lineBreak=a;f.lineBreakG=new RegExp(a.source,"g");f.nonASCIIwhitespace=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;f.skipWhiteSpace=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g},{}]},{},[3])(3)});
var UPNG = {};

	

UPNG.toRGBA8 = function(out)
{
	var w = out.width, h = out.height;
	if(out.tabs.acTL==null) return [UPNG.toRGBA8.decodeImage(out.data, w, h, out).buffer];
	
	var frms = [];
	if(out.frames[0].data==null) out.frames[0].data = out.data;
	
	var len = w*h*4, img = new Uint8Array(len), empty = new Uint8Array(len), prev=new Uint8Array(len);
	for(var i=0; i<out.frames.length; i++)
	{
		var frm = out.frames[i];
		var fx=frm.rect.x, fy=frm.rect.y, fw = frm.rect.width, fh = frm.rect.height;
		var fdata = UPNG.toRGBA8.decodeImage(frm.data, fw,fh, out);
		
		if(i!=0) for(var j=0; j<len; j++) prev[j]=img[j];
		
		if     (frm.blend==0) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 0);
		else if(frm.blend==1) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 1);
		
		frms.push(img.buffer.slice(0));
		
		if     (frm.dispose==0) {}
		else if(frm.dispose==1) UPNG._copyTile(empty, fw, fh, img, w, h, fx, fy, 0);
		else if(frm.dispose==2) for(var j=0; j<len; j++) img[j]=prev[j];
	}
	return frms;
}
UPNG.toRGBA8.decodeImage = function(data, w, h, out)
{
	var area = w*h, bpp = UPNG.decode._getBPP(out);
	var bpl = Math.ceil(w*bpp/8);	// bytes per line

	var bf = new Uint8Array(area*4), bf32 = new Uint32Array(bf.buffer);
	var ctype = out.ctype, depth = out.depth;
	var rs = UPNG._bin.readUshort;
	
	//console.log(ctype, depth);
	var time = Date.now();

	if     (ctype==6) { // RGB + alpha
		var qarea = area<<2;
		if(depth== 8) for(var i=0; i<qarea;i+=4) {  bf[i] = data[i];  bf[i+1] = data[i+1];  bf[i+2] = data[i+2];  bf[i+3] = data[i+3]; }
		if(depth==16) for(var i=0; i<qarea;i++ ) {  bf[i] = data[i<<1];  }
	}
	else if(ctype==2) {	// RGB
		var ts=out.tabs["tRNS"];
		if(ts==null) {
			if(depth== 8) for(var i=0; i<area; i++) {  var ti=i*3;  bf32[i] = (255<<24)|(data[ti+2]<<16)|(data[ti+1]<<8)|data[ti];  }
			if(depth==16) for(var i=0; i<area; i++) {  var ti=i*6;  bf32[i] = (255<<24)|(data[ti+4]<<16)|(data[ti+2]<<8)|data[ti];  }
		}
		else {  var tr=ts[0], tg=ts[1], tb=ts[2];
			if(depth== 8) for(var i=0; i<area; i++) {  var qi=i<<2, ti=i*3;  bf32[i] = (255<<24)|(data[ti+2]<<16)|(data[ti+1]<<8)|data[ti];
				if(data[ti]   ==tr && data[ti+1]   ==tg && data[ti+2]   ==tb) bf[qi+3] = 0;  }
			if(depth==16) for(var i=0; i<area; i++) {  var qi=i<<2, ti=i*6;  bf32[i] = (255<<24)|(data[ti+4]<<16)|(data[ti+2]<<8)|data[ti];
				if(rs(data,ti)==tr && rs(data,ti+2)==tg && rs(data,ti+4)==tb) bf[qi+3] = 0;  }
		}
	}
	else if(ctype==3) {	// palette
		var p=out.tabs["PLTE"], ap=out.tabs["tRNS"], tl=ap?ap.length:0;
		//console.log(p, ap);
		if(depth==1) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
			for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>3)]>>(7-((i&7)<<0)))& 1), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
		}
		if(depth==2) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
			for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>2)]>>(6-((i&3)<<1)))& 3), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
		}
		if(depth==4) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
			for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>1)]>>(4-((i&1)<<2)))&15), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
		}
		if(depth==8) for(var i=0; i<area; i++ ) {  var qi=i<<2, j=data[i]                      , cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
	}
	else if(ctype==4) {	// gray + alpha
		if(depth== 8)  for(var i=0; i<area; i++) {  var qi=i<<2, di=i<<1, gr=data[di];  bf[qi]=gr;  bf[qi+1]=gr;  bf[qi+2]=gr;  bf[qi+3]=data[di+1];  }
		if(depth==16)  for(var i=0; i<area; i++) {  var qi=i<<2, di=i<<2, gr=data[di];  bf[qi]=gr;  bf[qi+1]=gr;  bf[qi+2]=gr;  bf[qi+3]=data[di+2];  }
	}
	else if(ctype==0) {	// gray
		var tr = out.tabs["tRNS"] ? out.tabs["tRNS"] : -1;
		for(var y=0; y<h; y++) {
			var off = y*bpl, to = y*w;
			if     (depth== 1) for(var x=0; x<w; x++) {  var gr=255*((data[off+(x>>>3)]>>>(7 -((x&7)   )))& 1), al=(gr==tr*255)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
			else if(depth== 2) for(var x=0; x<w; x++) {  var gr= 85*((data[off+(x>>>2)]>>>(6 -((x&3)<<1)))& 3), al=(gr==tr* 85)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
			else if(depth== 4) for(var x=0; x<w; x++) {  var gr= 17*((data[off+(x>>>1)]>>>(4 -((x&1)<<2)))&15), al=(gr==tr* 17)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
			else if(depth== 8) for(var x=0; x<w; x++) {  var gr=data[off+     x], al=(gr                 ==tr)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
			else if(depth==16) for(var x=0; x<w; x++) {  var gr=data[off+(x<<1)], al=(rs(data,off+(x<<i))==tr)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
		}
	}
	//console.log(Date.now()-time);
	return bf;
}



UPNG.decode = function(buff)
{
	var data = new Uint8Array(buff), offset = 8, bin = UPNG._bin, rUs = bin.readUshort, rUi = bin.readUint;
	var out = {tabs:{}, frames:[]};
	var dd = new Uint8Array(data.length), doff = 0;	 // put all IDAT data into it
	var fd, foff = 0;	// frames
	
	var mgck = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
	for(var i=0; i<8; i++) if(data[i]!=mgck[i]) throw "The input is not a PNG file!";

	while(offset<data.length)
	{
		var len  = bin.readUint(data, offset);  offset += 4;
		var type = bin.readASCII(data, offset, 4);  offset += 4;
		//console.log(type,len);
		
		if     (type=="IHDR")  {  UPNG.decode._IHDR(data, offset, out);  }
		else if(type=="CgBI")  {  out.tabs[type] = data.slice(offset,offset+4);  }
		else if(type=="IDAT") {
			for(var i=0; i<len; i++) dd[doff+i] = data[offset+i];
			doff += len;
		}
		else if(type=="acTL")  {
			out.tabs[type] = {  num_frames:rUi(data, offset), num_plays:rUi(data, offset+4)  };
			fd = new Uint8Array(data.length);
		}
		else if(type=="fcTL")  {
			if(foff!=0) {  var fr = out.frames[out.frames.length-1];
				fr.data = UPNG.decode._decompress(out, fd.slice(0,foff), fr.rect.width, fr.rect.height);  foff=0;
			}
			var rct = {x:rUi(data, offset+12),y:rUi(data, offset+16),width:rUi(data, offset+4),height:rUi(data, offset+8)};
			var del = rUs(data, offset+22);  del = rUs(data, offset+20) / (del==0?100:del);
			var frm = {rect:rct, delay:Math.round(del*1000), dispose:data[offset+24], blend:data[offset+25]};
			//console.log(frm);
			out.frames.push(frm);
		}
		else if(type=="fdAT") {
			for(var i=0; i<len-4; i++) fd[foff+i] = data[offset+i+4];
			foff += len-4;
		}
		else if(type=="pHYs") {
			out.tabs[type] = [bin.readUint(data, offset), bin.readUint(data, offset+4), data[offset+8]];
		}
		else if(type=="cHRM") {
			out.tabs[type] = [];
			for(var i=0; i<8; i++) out.tabs[type].push(bin.readUint(data, offset+i*4));
		}
		else if(type=="tEXt" || type=="zTXt") {
			if(out.tabs[type]==null) out.tabs[type] = {};
			var nz = bin.nextZero(data, offset);
			var keyw = bin.readASCII(data, offset, nz-offset);
			var text, tl=offset+len-nz-1;
			if(type=="tEXt") text = bin.readASCII(data, nz+1, tl);
			else {
				var bfr = UPNG.decode._inflate(data.slice(nz+2,nz+2+tl));
				text = bin.readUTF8(bfr,0,bfr.length);
			}
			out.tabs[type][keyw] = text;
		}
		else if(type=="iTXt") {
			if(out.tabs[type]==null) out.tabs[type] = {};
			var nz = 0, off = offset;
			nz = bin.nextZero(data, off);
			var keyw = bin.readASCII(data, off, nz-off);  off = nz + 1;
			var cflag = data[off], cmeth = data[off+1];  off+=2;
			nz = bin.nextZero(data, off);
			var ltag = bin.readASCII(data, off, nz-off);  off = nz + 1;
			nz = bin.nextZero(data, off);
			var tkeyw = bin.readUTF8(data, off, nz-off);  off = nz + 1;
			var text, tl=len-(off-offset);
			if(cflag==0) text  = bin.readUTF8(data, off, tl);
			else {
				var bfr = UPNG.decode._inflate(data.slice(off,off+tl));
				text = bin.readUTF8(bfr,0,bfr.length);
			}
			out.tabs[type][keyw] = text;
		}
		else if(type=="PLTE") {
			out.tabs[type] = bin.readBytes(data, offset, len);
		}
		else if(type=="hIST") {
			var pl = out.tabs["PLTE"].length/3;
			out.tabs[type] = [];  for(var i=0; i<pl; i++) out.tabs[type].push(rUs(data, offset+i*2));
		}
		else if(type=="tRNS") {
			if     (out.ctype==3) out.tabs[type] = bin.readBytes(data, offset, len);
			else if(out.ctype==0) out.tabs[type] = rUs(data, offset);
			else if(out.ctype==2) out.tabs[type] = [ rUs(data,offset),rUs(data,offset+2),rUs(data,offset+4) ];
			//else console.log("tRNS for unsupported color type",out.ctype, len);
		}
		else if(type=="gAMA") out.tabs[type] = bin.readUint(data, offset)/100000;
		else if(type=="sRGB") out.tabs[type] = data[offset];
		else if(type=="bKGD")
		{
			if     (out.ctype==0 || out.ctype==4) out.tabs[type] = [rUs(data, offset)];
			else if(out.ctype==2 || out.ctype==6) out.tabs[type] = [rUs(data, offset), rUs(data, offset+2), rUs(data, offset+4)];
			else if(out.ctype==3) out.tabs[type] = data[offset];
		}
		else if(type=="IEND") {
			break;
		}
		//else {  console.log("unknown chunk type", type, len);  out.tabs[type]=data.slice(offset,offset+len);  }
		offset += len;
		var crc = bin.readUint(data, offset);  offset += 4;
	}
	if(foff!=0) {  var fr = out.frames[out.frames.length-1];
		fr.data = UPNG.decode._decompress(out, fd.slice(0,foff), fr.rect.width, fr.rect.height);  foff=0;
	}	
	out.data = UPNG.decode._decompress(out, dd, out.width, out.height);
	
	delete out.compress;  delete out.interlace;  delete out.filter;
	return out;
}

UPNG.decode._decompress = function(out, dd, w, h) {
	var time = Date.now();
	var bpp = UPNG.decode._getBPP(out), bpl = Math.ceil(w*bpp/8), buff = new Uint8Array((bpl+1+out.interlace)*h);
	if(out.tabs["CgBI"]) dd = UPNG.inflateRaw(dd,buff);
	else                 dd = UPNG.decode._inflate(dd,buff);
	//console.log(dd.length, buff.length);
	//console.log(Date.now()-time);

	var time=Date.now();
	if     (out.interlace==0) dd = UPNG.decode._filterZero(dd, out, 0, w, h);
	else if(out.interlace==1) dd = UPNG.decode._readInterlace(dd, out);
	//console.log(Date.now()-time);
	return dd;
}

UPNG.decode._inflate = function(data, buff) {  var out=UPNG["inflateRaw"](new Uint8Array(data.buffer, 2,data.length-6),buff);  return out;  }
UPNG.inflateRaw=function(){var H={};H.H={};H.H.N=function(N,W){var R=Uint8Array,i=0,m=0,J=0,h=0,Q=0,X=0,u=0,w=0,d=0,v,C;
if(N[0]==3&&N[1]==0)return W?W:new R(0);var V=H.H,n=V.b,A=V.e,l=V.R,M=V.n,I=V.A,e=V.Z,b=V.m,Z=W==null;
if(Z)W=new R(N.length>>>2<<5);while(i==0){i=n(N,d,1);m=n(N,d+1,2);d+=3;if(m==0){if((d&7)!=0)d+=8-(d&7);
var D=(d>>>3)+4,q=N[D-4]|N[D-3]<<8;if(Z)W=H.H.W(W,w+q);W.set(new R(N.buffer,N.byteOffset+D,q),w);d=D+q<<3;
w+=q;continue}if(Z)W=H.H.W(W,w+(1<<17));if(m==1){v=b.J;C=b.h;X=(1<<9)-1;u=(1<<5)-1}if(m==2){J=A(N,d,5)+257;
h=A(N,d+5,5)+1;Q=A(N,d+10,4)+4;d+=14;var E=d,j=1;for(var c=0;c<38;c+=2){b.Q[c]=0;b.Q[c+1]=0}for(var c=0;
c<Q;c++){var K=A(N,d+c*3,3);b.Q[(b.X[c]<<1)+1]=K;if(K>j)j=K}d+=3*Q;M(b.Q,j);I(b.Q,j,b.u);v=b.w;C=b.d;
d=l(b.u,(1<<j)-1,J+h,N,d,b.v);var r=V.V(b.v,0,J,b.C);X=(1<<r)-1;var S=V.V(b.v,J,h,b.D);u=(1<<S)-1;M(b.C,r);
I(b.C,r,v);M(b.D,S);I(b.D,S,C)}while(!0){var T=v[e(N,d)&X];d+=T&15;var p=T>>>4;if(p>>>8==0){W[w++]=p}else if(p==256){break}else{var z=w+p-254;
if(p>264){var _=b.q[p-257];z=w+(_>>>3)+A(N,d,_&7);d+=_&7}var $=C[e(N,d)&u];d+=$&15;var s=$>>>4,Y=b.c[s],a=(Y>>>4)+n(N,d,Y&15);
d+=Y&15;while(w<z){W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a]}w=z}}}return W.length==w?W:W.slice(0,w)};
H.H.W=function(N,W){var R=N.length;if(W<=R)return N;var V=new Uint8Array(R<<1);V.set(N,0);return V};
H.H.R=function(N,W,R,V,n,A){var l=H.H.e,M=H.H.Z,I=0;while(I<R){var e=N[M(V,n)&W];n+=e&15;var b=e>>>4;
if(b<=15){A[I]=b;I++}else{var Z=0,m=0;if(b==16){m=3+l(V,n,2);n+=2;Z=A[I-1]}else if(b==17){m=3+l(V,n,3);
n+=3}else if(b==18){m=11+l(V,n,7);n+=7}var J=I+m;while(I<J){A[I]=Z;I++}}}return n};H.H.V=function(N,W,R,V){var n=0,A=0,l=V.length>>>1;
while(A<R){var M=N[A+W];V[A<<1]=0;V[(A<<1)+1]=M;if(M>n)n=M;A++}while(A<l){V[A<<1]=0;V[(A<<1)+1]=0;A++}return n};
H.H.n=function(N,W){var R=H.H.m,V=N.length,n,A,l,M,I,e=R.j;for(var M=0;M<=W;M++)e[M]=0;for(M=1;M<V;M+=2)e[N[M]]++;
var b=R.K;n=0;e[0]=0;for(A=1;A<=W;A++){n=n+e[A-1]<<1;b[A]=n}for(l=0;l<V;l+=2){I=N[l+1];if(I!=0){N[l]=b[I];
b[I]++}}};H.H.A=function(N,W,R){var V=N.length,n=H.H.m,A=n.r;for(var l=0;l<V;l+=2)if(N[l+1]!=0){var M=l>>1,I=N[l+1],e=M<<4|I,b=W-I,Z=N[l]<<b,m=Z+(1<<b);
while(Z!=m){var J=A[Z]>>>15-W;R[J]=e;Z++}}};H.H.l=function(N,W){var R=H.H.m.r,V=15-W;for(var n=0;n<N.length;
n+=2){var A=N[n]<<W-N[n+1];N[n]=R[A]>>>V}};H.H.M=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8};
H.H.I=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8;N[V+2]|=R>>>16};H.H.e=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8)>>>(W&7)&(1<<R)-1};
H.H.b=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)&(1<<R)-1};H.H.Z=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)};
H.H.i=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16|N[(W>>>3)+3]<<24)>>>(W&7)};H.H.m=function(){var N=Uint16Array,W=Uint32Array;
return{K:new N(16),j:new N(16),X:[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],S:[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],T:[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0],q:new N(32),p:[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,65535,65535],z:[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0],c:new W(32),J:new N(512),_:[],h:new N(32),$:[],w:new N(32768),C:[],v:[],d:new N(32768),D:[],u:new N(512),Q:[],r:new N(1<<15),s:new W(286),Y:new W(30),a:new W(19),t:new W(15e3),k:new N(1<<16),g:new N(1<<15)}}();
(function(){var N=H.H.m,W=1<<15;for(var R=0;R<W;R++){var V=R;V=(V&2863311530)>>>1|(V&1431655765)<<1;
V=(V&3435973836)>>>2|(V&858993459)<<2;V=(V&4042322160)>>>4|(V&252645135)<<4;V=(V&4278255360)>>>8|(V&16711935)<<8;
N.r[R]=(V>>>16|V<<16)>>>17}function n(A,l,M){while(l--!=0)A.push(0,M)}for(var R=0;R<32;R++){N.q[R]=N.S[R]<<3|N.T[R];
N.c[R]=N.p[R]<<4|N.z[R]}n(N._,144,8);n(N._,255-143,9);n(N._,279-255,7);n(N._,287-279,8);H.H.n(N._,9);
H.H.A(N._,9,N.J);H.H.l(N._,9);n(N.$,32,5);H.H.n(N.$,5);H.H.A(N.$,5,N.h);H.H.l(N.$,5);n(N.Q,19,0);n(N.C,286,0);
n(N.D,30,0);n(N.v,320,0)}());return H.H.N}()


UPNG.decode._readInterlace = function(data, out)
{
	var w = out.width, h = out.height;
	var bpp = UPNG.decode._getBPP(out), cbpp = bpp>>3, bpl = Math.ceil(w*bpp/8);
	var img = new Uint8Array( h * bpl );
	var di = 0;

	var starting_row  = [ 0, 0, 4, 0, 2, 0, 1 ];
	var starting_col  = [ 0, 4, 0, 2, 0, 1, 0 ];
	var row_increment = [ 8, 8, 8, 4, 4, 2, 2 ];
	var col_increment = [ 8, 8, 4, 4, 2, 2, 1 ];

	var pass=0;
	while(pass<7)
	{
		var ri = row_increment[pass], ci = col_increment[pass];
		var sw = 0, sh = 0;
		var cr = starting_row[pass];  while(cr<h) {  cr+=ri;  sh++;  }
		var cc = starting_col[pass];  while(cc<w) {  cc+=ci;  sw++;  }
		var bpll = Math.ceil(sw*bpp/8);
		UPNG.decode._filterZero(data, out, di, sw, sh);

		var y=0, row = starting_row[pass];
		while(row<h)
		{
			var col = starting_col[pass];
			var cdi = (di+y*bpll)<<3;

			while(col<w)
			{
				if(bpp==1) {
					var val = data[cdi>>3];  val = (val>>(7-(cdi&7)))&1;
					img[row*bpl + (col>>3)] |= (val << (7-((col&7)<<0)));
				}
				if(bpp==2) {
					var val = data[cdi>>3];  val = (val>>(6-(cdi&7)))&3;
					img[row*bpl + (col>>2)] |= (val << (6-((col&3)<<1)));
				}
				if(bpp==4) {
					var val = data[cdi>>3];  val = (val>>(4-(cdi&7)))&15;
					img[row*bpl + (col>>1)] |= (val << (4-((col&1)<<2)));
				}
				if(bpp>=8) {
					var ii = row*bpl+col*cbpp;
					for(var j=0; j<cbpp; j++) img[ii+j] = data[(cdi>>3)+j];
				}
				cdi+=bpp;  col+=ci;
			}
			y++;  row += ri;
		}
		if(sw*sh!=0) di += sh * (1 + bpll);
		pass = pass + 1;
	}
	return img;
}

UPNG.decode._getBPP = function(out) {
	var noc = [1,null,3,1,2,null,4][out.ctype];
	return noc * out.depth;
}

UPNG.decode._filterZero = function(data, out, off, w, h)
{
	var bpp = UPNG.decode._getBPP(out), bpl = Math.ceil(w*bpp/8), paeth = UPNG.decode._paeth;
	bpp = Math.ceil(bpp/8);
	
	var i=0, di=1, type=data[off], x=0;
	
	if(type>1) data[off]=[0,0,1][type-2];  
	if(type==3) for(x=bpp; x<bpl; x++) data[x+1] = (data[x+1] + (data[x+1-bpp]>>>1) )&255;

	for(var y=0; y<h; y++)  {
		i = off+y*bpl; di = i+y+1;
		type = data[di-1]; x=0;

		if     (type==0)   for(; x<bpl; x++) data[i+x] = data[di+x];
		else if(type==1) { for(; x<bpp; x++) data[i+x] = data[di+x];
						   for(; x<bpl; x++) data[i+x] = (data[di+x] + data[i+x-bpp]);  }
		else if(type==2) { for(; x<bpl; x++) data[i+x] = (data[di+x] + data[i+x-bpl]);  }
		else if(type==3) { for(; x<bpp; x++) data[i+x] = (data[di+x] + ( data[i+x-bpl]>>>1));
			               for(; x<bpl; x++) data[i+x] = (data[di+x] + ((data[i+x-bpl]+data[i+x-bpp])>>>1) );  }
		else             { for(; x<bpp; x++) data[i+x] = (data[di+x] + paeth(0, data[i+x-bpl], 0));
						   for(; x<bpl; x++) data[i+x] = (data[di+x] + paeth(data[i+x-bpp], data[i+x-bpl], data[i+x-bpp-bpl]) );  }
	}
	return data;
}

UPNG.decode._paeth = function(a,b,c)
{
	var p = a+b-c, pa = (p-a), pb = (p-b), pc = (p-c);
	if (pa*pa <= pb*pb && pa*pa <= pc*pc)  return a;
	else if (pb*pb <= pc*pc)  return b;
	return c;
}

UPNG.decode._IHDR = function(data, offset, out)
{
	var bin = UPNG._bin;
	out.width  = bin.readUint(data, offset);  offset += 4;
	out.height = bin.readUint(data, offset);  offset += 4;
	out.depth     = data[offset];  offset++;
	out.ctype     = data[offset];  offset++;
	out.compress  = data[offset];  offset++;
	out.filter    = data[offset];  offset++;
	out.interlace = data[offset];  offset++;
}

UPNG._bin = {
	nextZero   : function(data,p)  {  while(data[p]!=0) p++;  return p;  },
	readUshort : function(buff,p)  {  return (buff[p]<< 8) | buff[p+1];  },
	writeUshort: function(buff,p,n){  buff[p] = (n>>8)&255;  buff[p+1] = n&255;  },
	readUint   : function(buff,p)  {  return (buff[p]*(256*256*256)) + ((buff[p+1]<<16) | (buff[p+2]<< 8) | buff[p+3]);  },
	writeUint  : function(buff,p,n){  buff[p]=(n>>24)&255;  buff[p+1]=(n>>16)&255;  buff[p+2]=(n>>8)&255;  buff[p+3]=n&255;  },
	readASCII  : function(buff,p,l){  var s = "";  for(var i=0; i<l; i++) s += String.fromCharCode(buff[p+i]);  return s;    },
	writeASCII : function(data,p,s){  for(var i=0; i<s.length; i++) data[p+i] = s.charCodeAt(i);  },
	readBytes  : function(buff,p,l){  var arr = [];   for(var i=0; i<l; i++) arr.push(buff[p+i]);   return arr;  },
	pad : function(n) { return n.length < 2 ? "0" + n : n; },
	readUTF8 : function(buff, p, l) {
		var s = "", ns;
		for(var i=0; i<l; i++) s += "%" + UPNG._bin.pad(buff[p+i].toString(16));
		try {  ns = decodeURIComponent(s); }
		catch(e) {  return UPNG._bin.readASCII(buff, p, l);  }
		return  ns;
	}
}
UPNG._copyTile = function(sb, sw, sh, tb, tw, th, xoff, yoff, mode)
{
	var w = Math.min(sw,tw), h = Math.min(sh,th);
	var si=0, ti=0;
	for(var y=0; y<h; y++)
		for(var x=0; x<w; x++)
		{
			if(xoff>=0 && yoff>=0) {  si = (y*sw+x)<<2;  ti = (( yoff+y)*tw+xoff+x)<<2;  }
			else                   {  si = ((-yoff+y)*sw-xoff+x)<<2;  ti = (y*tw+x)<<2;  }
			
			if     (mode==0) {  tb[ti] = sb[si];  tb[ti+1] = sb[si+1];  tb[ti+2] = sb[si+2];  tb[ti+3] = sb[si+3];  }
			else if(mode==1) {
				var fa = sb[si+3]*(1/255), fr=sb[si]*fa, fg=sb[si+1]*fa, fb=sb[si+2]*fa; 
				var ba = tb[ti+3]*(1/255), br=tb[ti]*ba, bg=tb[ti+1]*ba, bb=tb[ti+2]*ba; 
				
				var ifa=1-fa, oa = fa+ba*ifa, ioa = (oa==0?0:1/oa);
				tb[ti+3] = 255*oa;  
				tb[ti+0] = (fr+br*ifa)*ioa;  
				tb[ti+1] = (fg+bg*ifa)*ioa;   
				tb[ti+2] = (fb+bb*ifa)*ioa;  
			}
			else if(mode==2){	// copy only differences, otherwise zero
				var fa = sb[si+3], fr=sb[si], fg=sb[si+1], fb=sb[si+2]; 
				var ba = tb[ti+3], br=tb[ti], bg=tb[ti+1], bb=tb[ti+2]; 
				if(fa==ba && fr==br && fg==bg && fb==bb) {  tb[ti]=0;  tb[ti+1]=0;  tb[ti+2]=0;  tb[ti+3]=0;  }
				else {  tb[ti]=fr;  tb[ti+1]=fg;  tb[ti+2]=fb;  tb[ti+3]=fa;  }
			}
			else if(mode==3){	// check if can be blended
				var fa = sb[si+3], fr=sb[si], fg=sb[si+1], fb=sb[si+2]; 
				var ba = tb[ti+3], br=tb[ti], bg=tb[ti+1], bb=tb[ti+2]; 
				if(fa==ba && fr==br && fg==bg && fb==bb) continue;
				//if(fa!=255 && ba!=0) return false;
				if(fa<220 && ba>20) return false;
			}
		}
	return true;
}


UPNG.encode = function(bufs, w, h, ps, dels, tabs, forbidPlte)
{
	if(ps==null) ps=0;
	if(forbidPlte==null) forbidPlte = false;

	var nimg = UPNG.encode.compress(bufs, w, h, ps, [false, false, false, 0, forbidPlte]);
	UPNG.encode.compressPNG(nimg, -1);
	
	return UPNG.encode._main(nimg, w, h, dels, tabs);
}

UPNG.encodeLL = function(bufs, w, h, cc, ac, depth, dels, tabs) {
	var nimg = {  ctype: 0 + (cc==1 ? 0 : 2) + (ac==0 ? 0 : 4),      depth: depth,  frames: []  };
	
	var time = Date.now();
	var bipp = (cc+ac)*depth, bipl = bipp * w;
	for(var i=0; i<bufs.length; i++)
		nimg.frames.push({  rect:{x:0,y:0,width:w,height:h},  img:new Uint8Array(bufs[i]), blend:0, dispose:1, bpp:Math.ceil(bipp/8), bpl:Math.ceil(bipl/8)  });
	
	UPNG.encode.compressPNG(nimg, 0, true);
	
	var out = UPNG.encode._main(nimg, w, h, dels, tabs);
	return out;
}

UPNG.encode._main = function(nimg, w, h, dels, tabs) {
	if(tabs==null) tabs={};
	var crc = UPNG.crc.crc, wUi = UPNG._bin.writeUint, wUs = UPNG._bin.writeUshort, wAs = UPNG._bin.writeASCII;
	var offset = 8, anim = nimg.frames.length>1, pltAlpha = false;
	
	var leng = 8 + (16+5+4) /*+ (9+4)*/ + (anim ? 20 : 0);
	if(tabs["sRGB"]!=null) leng += 8+1+4;
	if(tabs["pHYs"]!=null) leng += 8+9+4;
	if(nimg.ctype==3) {
		var dl = nimg.plte.length;
		for(var i=0; i<dl; i++) if((nimg.plte[i]>>>24)!=255) pltAlpha = true;
		leng += (8 + dl*3 + 4) + (pltAlpha ? (8 + dl*1 + 4) : 0);
	}
	for(var j=0; j<nimg.frames.length; j++)
	{
		var fr = nimg.frames[j];
		if(anim) leng += 38;
		leng += fr.cimg.length + 12;
		if(j!=0) leng+=4;
	}
	leng += 12; 
	
	var data = new Uint8Array(leng);
	var wr=[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
	for(var i=0; i<8; i++) data[i]=wr[i];
	
	wUi(data,offset, 13);     offset+=4;
	wAs(data,offset,"IHDR");  offset+=4;
	wUi(data,offset,w);  offset+=4;
	wUi(data,offset,h);  offset+=4;
	data[offset] = nimg.depth;  offset++;  // depth
	data[offset] = nimg.ctype;  offset++;  // ctype
	data[offset] = 0;  offset++;  // compress
	data[offset] = 0;  offset++;  // filter
	data[offset] = 0;  offset++;  // interlace
	wUi(data,offset,crc(data,offset-17,17));  offset+=4; // crc

	// 13 bytes to say, that it is sRGB
	if(tabs["sRGB"]!=null) {
		wUi(data,offset, 1);      offset+=4;
		wAs(data,offset,"sRGB");  offset+=4;
		data[offset] = tabs["sRGB"];  offset++;
		wUi(data,offset,crc(data,offset-5,5));  offset+=4; // crc
	}
	if(tabs["pHYs"]!=null) {
		wUi(data,offset, 9);      offset+=4;
		wAs(data,offset,"pHYs");  offset+=4;
		wUi(data,offset, tabs["pHYs"][0]);      offset+=4;
		wUi(data,offset, tabs["pHYs"][1]);      offset+=4;
		data[offset]=tabs["pHYs"][2];			offset++;
		wUi(data,offset,crc(data,offset-13,13));  offset+=4; // crc
	}

	if(anim) {
		wUi(data,offset, 8);      offset+=4;
		wAs(data,offset,"acTL");  offset+=4;
		wUi(data,offset, nimg.frames.length);     offset+=4;
		wUi(data,offset, tabs["loop"]!=null?tabs["loop"]:0);      offset+=4;
		wUi(data,offset,crc(data,offset-12,12));  offset+=4; // crc
	}

	if(nimg.ctype==3) {
		var dl = nimg.plte.length;
		wUi(data,offset, dl*3);  offset+=4;
		wAs(data,offset,"PLTE");  offset+=4;
		for(var i=0; i<dl; i++){
			var ti=i*3, c=nimg.plte[i], r=(c)&255, g=(c>>>8)&255, b=(c>>>16)&255;
			data[offset+ti+0]=r;  data[offset+ti+1]=g;  data[offset+ti+2]=b;
		}
		offset+=dl*3;
		wUi(data,offset,crc(data,offset-dl*3-4,dl*3+4));  offset+=4; // crc

		if(pltAlpha) {
			wUi(data,offset, dl);  offset+=4;
			wAs(data,offset,"tRNS");  offset+=4;
			for(var i=0; i<dl; i++)  data[offset+i]=(nimg.plte[i]>>>24)&255;
			offset+=dl;
			wUi(data,offset,crc(data,offset-dl-4,dl+4));  offset+=4; // crc
		}
	}
	
	var fi = 0;
	for(var j=0; j<nimg.frames.length; j++)
	{
		var fr = nimg.frames[j];
		if(anim) {
			wUi(data, offset, 26);     offset+=4;
			wAs(data, offset,"fcTL");  offset+=4;
			wUi(data, offset, fi++);   offset+=4;
			wUi(data, offset, fr.rect.width );   offset+=4;
			wUi(data, offset, fr.rect.height);   offset+=4;
			wUi(data, offset, fr.rect.x);   offset+=4;
			wUi(data, offset, fr.rect.y);   offset+=4;
			wUs(data, offset, dels[j]);   offset+=2;
			wUs(data, offset,  1000);   offset+=2;
			data[offset] = fr.dispose;  offset++;	// dispose
			data[offset] = fr.blend  ;  offset++;	// blend
			wUi(data,offset,crc(data,offset-30,30));  offset+=4; // crc
		}
				
		var imgd = fr.cimg, dl = imgd.length;
		wUi(data,offset, dl+(j==0?0:4));     offset+=4;
		var ioff = offset;
		wAs(data,offset,(j==0)?"IDAT":"fdAT");  offset+=4;
		if(j!=0) {  wUi(data, offset, fi++);  offset+=4;  }
		data.set(imgd,offset);
		offset += dl;
		wUi(data,offset,crc(data,ioff,offset-ioff));  offset+=4; // crc
	}

	wUi(data,offset, 0);     offset+=4;
	wAs(data,offset,"IEND");  offset+=4;
	wUi(data,offset,crc(data,offset-4,4));  offset+=4; // crc

	return data.buffer;
}

UPNG.encode.compressPNG = function(out, filter, levelZero) {
	for(var i=0; i<out.frames.length; i++) {
		var frm = out.frames[i], nw=frm.rect.width, nh=frm.rect.height;
		var fdata = new Uint8Array(nh*frm.bpl+nh);
		frm.cimg = UPNG.encode._filterZero(frm.img,nh,frm.bpp,frm.bpl,fdata, filter, levelZero);
	}
}



UPNG.encode.compress = function(bufs, w, h, ps, prms) // prms:  onlyBlend, minBits, forbidPlte
{
	//var time = Date.now();
	var onlyBlend = prms[0], evenCrd = prms[1], forbidPrev = prms[2], minBits = prms[3], forbidPlte = prms[4];
	
	var ctype = 6, depth = 8, alphaAnd=255
	
	for(var j=0; j<bufs.length; j++)  {  // when not quantized, other frames can contain colors, that are not in an initial frame
		var img = new Uint8Array(bufs[j]), ilen = img.length;
		for(var i=0; i<ilen; i+=4) alphaAnd &= img[i+3];
	}
	var gotAlpha = (alphaAnd!=255);
	
	//console.log("alpha check", Date.now()-time);  time = Date.now();
	
	//var brute = gotAlpha && forGIF;		// brute : frames can only be copied, not "blended"
	var frms = UPNG.encode.framize(bufs, w, h, onlyBlend, evenCrd, forbidPrev);
	//console.log("framize", Date.now()-time);  time = Date.now();
	
	var cmap={}, plte=[], inds=[]; 
	
	if(ps!=0) {
		var nbufs = [];  for(var i=0; i<frms.length; i++) nbufs.push(frms[i].img.buffer);
		
		var abuf = UPNG.encode.concatRGBA(nbufs), qres = UPNG.quantize(abuf, ps);  console.log(qres);
		var cof = 0, bb = new Uint8Array(qres.abuf);
		for(var i=0; i<frms.length; i++) {  var ti=frms[i].img, bln=ti.length;  inds.push(new Uint8Array(qres.inds.buffer, cof>>2, bln>>2));
			for(var j=0; j<bln; j+=4) {  ti[j]=bb[cof+j];  ti[j+1]=bb[cof+j+1];  ti[j+2]=bb[cof+j+2];  ti[j+3]=bb[cof+j+3];  }    cof+=bln;  }
		
		for(var i=0; i<qres.plte.length; i++) plte.push(qres.plte[i].est.rgba);
		//console.log("quantize", Date.now()-time);  time = Date.now();
	}
	else {
		// what if ps==0, but there are <=256 colors?  we still need to detect, if the palette could be used
		for(var j=0; j<frms.length; j++)  {  // when not quantized, other frames can contain colors, that are not in an initial frame
			var frm = frms[j], img32 = new Uint32Array(frm.img.buffer), nw=frm.rect.width, ilen = img32.length;
			var ind = new Uint8Array(ilen);  inds.push(ind);
			for(var i=0; i<ilen; i++) {
				var c = img32[i];
				if     (i!=0 && c==img32[i- 1]) ind[i]=ind[i-1];
				else if(i>nw && c==img32[i-nw]) ind[i]=ind[i-nw];
				else {
					var cmc = cmap[c];
					if(cmc==null) {  cmap[c]=cmc=plte.length;  plte.push(c);  if(plte.length>=300) break;  }
					ind[i]=cmc;
				}
			}
		}
		//console.log("make palette", Date.now()-time);  time = Date.now();
	}
	
	var cc=plte.length; //console.log("colors:",cc);
	if(cc<=256 && forbidPlte==false) {
		if(cc<= 2) depth=1;  else if(cc<= 4) depth=2;  else if(cc<=16) depth=4;  else depth=8;
		depth =  Math.max(depth, minBits);
	}
	
	for(var j=0; j<frms.length; j++)
	{
		var frm = frms[j], nx=frm.rect.x, ny=frm.rect.y, nw=frm.rect.width, nh=frm.rect.height;
		var cimg = frm.img, cimg32 = new Uint32Array(cimg.buffer);
		var bpl = 4*nw, bpp=4;
		if(cc<=256 && forbidPlte==false) {
			bpl = Math.ceil(depth*nw/8);
			var nimg = new Uint8Array(bpl*nh);
			var inj = inds[j];
			for(var y=0; y<nh; y++) {  var i=y*bpl, ii=y*nw;
				if     (depth==8) for(var x=0; x<nw; x++) nimg[i+(x)   ]   =  (inj[ii+x]             );
				else if(depth==4) for(var x=0; x<nw; x++) nimg[i+(x>>1)]  |=  (inj[ii+x]<<(4-(x&1)*4));
				else if(depth==2) for(var x=0; x<nw; x++) nimg[i+(x>>2)]  |=  (inj[ii+x]<<(6-(x&3)*2));
				else if(depth==1) for(var x=0; x<nw; x++) nimg[i+(x>>3)]  |=  (inj[ii+x]<<(7-(x&7)*1));
			}
			cimg=nimg;  ctype=3;  bpp=1;
		}
		else if(gotAlpha==false && frms.length==1) {	// some next "reduced" frames may contain alpha for blending
			var nimg = new Uint8Array(nw*nh*3), area=nw*nh;
			for(var i=0; i<area; i++) { var ti=i*3, qi=i*4;  nimg[ti]=cimg[qi];  nimg[ti+1]=cimg[qi+1];  nimg[ti+2]=cimg[qi+2];  }
			cimg=nimg;  ctype=2;  bpp=3;  bpl=3*nw;
		}
		frm.img=cimg;  frm.bpl=bpl;  frm.bpp=bpp;
	}
	//console.log("colors => palette indices", Date.now()-time);  time = Date.now();
	
	return {ctype:ctype, depth:depth, plte:plte, frames:frms  };
}
UPNG.encode.framize = function(bufs,w,h,alwaysBlend,evenCrd,forbidPrev) {
	/*  DISPOSE
	    - 0 : no change
		- 1 : clear to transparent
		- 2 : retstore to content before rendering (previous frame disposed)
		BLEND
		- 0 : replace
		- 1 : blend
	*/
	var frms = [];
	for(var j=0; j<bufs.length; j++) {
		var cimg = new Uint8Array(bufs[j]), cimg32 = new Uint32Array(cimg.buffer);
		var nimg;
		
		var nx=0, ny=0, nw=w, nh=h, blend=alwaysBlend?1:0;
		if(j!=0) {
			var tlim = (forbidPrev || alwaysBlend || j==1 || frms[j-2].dispose!=0)?1:2, tstp = 0, tarea = 1e9;
			for(var it=0; it<tlim; it++)
			{
				var pimg = new Uint8Array(bufs[j-1-it]), p32 = new Uint32Array(bufs[j-1-it]);
				var mix=w,miy=h,max=-1,may=-1;
				for(var y=0; y<h; y++) for(var x=0; x<w; x++) {
					var i = y*w+x;
					if(cimg32[i]!=p32[i]) {
						if(x<mix) mix=x;  if(x>max) max=x;
						if(y<miy) miy=y;  if(y>may) may=y;
					}
				}
				if(max==-1) mix=miy=max=may=0;
				if(evenCrd) {  if((mix&1)==1)mix--;  if((miy&1)==1)miy--;  }
				var sarea = (max-mix+1)*(may-miy+1);
				if(sarea<tarea) {
					tarea = sarea;  tstp = it;
					nx = mix; ny = miy; nw = max-mix+1; nh = may-miy+1;
				}
			}
			
			// alwaysBlend: pokud zjistím, že blendit nelze, nastavím předchozímu snímku dispose=1. Zajistím, aby obsahoval můj obdélník.
			var pimg = new Uint8Array(bufs[j-1-tstp]);
			if(tstp==1) frms[j-1].dispose = 2;
			
			nimg = new Uint8Array(nw*nh*4);
			UPNG._copyTile(pimg,w,h, nimg,nw,nh, -nx,-ny, 0);
			
			blend =  UPNG._copyTile(cimg,w,h, nimg,nw,nh, -nx,-ny, 3) ? 1 : 0;
			if(blend==1) UPNG.encode._prepareDiff(cimg,w,h,nimg,{x:nx,y:ny,width:nw,height:nh});
			else         UPNG._copyTile(cimg,w,h, nimg,nw,nh, -nx,-ny, 0);
			//UPNG._copyTile(cimg,w,h, nimg,nw,nh, -nx,-ny, blend==1?2:0);
		}
		else nimg = cimg.slice(0);	// img may be rewritten further ... don't rewrite input
		
		frms.push({rect:{x:nx,y:ny,width:nw,height:nh}, img:nimg, blend:blend, dispose:0});
	}
	
	
	if(alwaysBlend) for(var j=0; j<frms.length; j++) {
		var frm = frms[j];  if(frm.blend==1) continue;
		var r0 = frm.rect, r1 = frms[j-1].rect
		var miX = Math.min(r0.x, r1.x), miY = Math.min(r0.y, r1.y);
		var maX = Math.max(r0.x+r0.width, r1.x+r1.width), maY = Math.max(r0.y+r0.height, r1.y+r1.height);
		var r = {x:miX, y:miY, width:maX-miX, height:maY-miY};
		
		frms[j-1].dispose = 1;
		if(j-1!=0) 
		UPNG.encode._updateFrame(bufs, w,h,frms, j-1,r, evenCrd);
		UPNG.encode._updateFrame(bufs, w,h,frms, j  ,r, evenCrd);
	}
	var area = 0;
	if(bufs.length!=1) for(var i=0; i<frms.length; i++) {
		var frm = frms[i];
		area += frm.rect.width*frm.rect.height;
		//if(i==0 || frm.blend!=1) continue;
		//var ob = new Uint8Array(
		//console.log(frm.blend, frm.dispose, frm.rect);
	}
	//if(area!=0) console.log(area);
	return frms;
}
UPNG.encode._updateFrame = function(bufs, w,h, frms, i, r, evenCrd) {
	var U8 = Uint8Array, U32 = Uint32Array;
	var pimg = new U8(bufs[i-1]), pimg32 = new U32(bufs[i-1]), nimg = i+1<bufs.length ? new U8(bufs[i+1]):null;
	var cimg = new U8(bufs[i]), cimg32 = new U32(cimg.buffer);
	
	var mix=w,miy=h,max=-1,may=-1;
	for(var y=0; y<r.height; y++) for(var x=0; x<r.width; x++) {
		var cx = r.x+x, cy = r.y+y;
		var j = cy*w+cx, cc = cimg32[j];
		// no need to draw transparency, or to dispose it. Or, if writing the same color and the next one does not need transparency.
		if(cc==0 || (frms[i-1].dispose==0 && pimg32[j]==cc && (nimg==null || nimg[j*4+3]!=0))/**/) {}
		else {
			if(cx<mix) mix=cx;  if(cx>max) max=cx;
			if(cy<miy) miy=cy;  if(cy>may) may=cy;
		}
	}
	if(max==-1) mix=miy=max=may=0;
	if(evenCrd) {  if((mix&1)==1)mix--;  if((miy&1)==1)miy--;  }
	r = {x:mix, y:miy, width:max-mix+1, height:may-miy+1};
	
	var fr = frms[i];  fr.rect = r;  fr.blend = 1;  fr.img = new Uint8Array(r.width*r.height*4);
	if(frms[i-1].dispose==0) {
		UPNG._copyTile(pimg,w,h, fr.img,r.width,r.height, -r.x,-r.y, 0);
		UPNG.encode._prepareDiff(cimg,w,h,fr.img,r);
		//UPNG._copyTile(cimg,w,h, fr.img,r.width,r.height, -r.x,-r.y, 2);
	}
	else
		UPNG._copyTile(cimg,w,h, fr.img,r.width,r.height, -r.x,-r.y, 0);
}
UPNG.encode._prepareDiff = function(cimg, w,h, nimg, rec) {
	UPNG._copyTile(cimg,w,h, nimg,rec.width,rec.height, -rec.x,-rec.y, 2);
	/*
	var n32 = new Uint32Array(nimg.buffer);
	var og = new Uint8Array(rec.width*rec.height*4), o32 = new Uint32Array(og.buffer);
	UPNG._copyTile(cimg,w,h, og,rec.width,rec.height, -rec.x,-rec.y, 0);
	for(var i=4; i<nimg.length; i+=4) {
		if(nimg[i-1]!=0 && nimg[i+3]==0 && o32[i>>>2]==o32[(i>>>2)-1]) {
			n32[i>>>2]=o32[i>>>2];
			//var j = i, c=p32[(i>>>2)-1];
			//while(p32[j>>>2]==c) {  n32[j>>>2]=c;  j+=4;  }
		}
	}
	for(var i=nimg.length-8; i>0; i-=4) {
		if(nimg[i+7]!=0 && nimg[i+3]==0 && o32[i>>>2]==o32[(i>>>2)+1]) {
			n32[i>>>2]=o32[i>>>2];
			//var j = i, c=p32[(i>>>2)-1];
			//while(p32[j>>>2]==c) {  n32[j>>>2]=c;  j+=4;  }
		}
	}*/
}

UPNG.encode._filterZero = function(img,h,bpp,bpl,data, filter, levelZero)
{
	var fls = [], ftry=[0,1,2,3,4];
	if     (filter!=-1)             ftry=[filter];
	else if(h*bpl>500000 || bpp==1) ftry=[0];
	var opts;  if(levelZero) opts={level:0};
	
	
	var CMPR = (data.length>10e6 && UZIP!=null) ? UZIP : pako;
	
	var time = Date.now();
	for(var i=0; i<ftry.length; i++) {
		for(var y=0; y<h; y++) UPNG.encode._filterLine(data, img, y, bpl, bpp, ftry[i]);
		//var nimg = new Uint8Array(data.length);
		//var sz = UZIP.F.deflate(data, nimg);  fls.push(nimg.slice(0,sz));
		//var dfl = pako["deflate"](data), dl=dfl.length-4;
		//var crc = (dfl[dl+3]<<24)|(dfl[dl+2]<<16)|(dfl[dl+1]<<8)|(dfl[dl+0]<<0);
		//console.log(crc, UZIP.adler(data,2,data.length-6));
		fls.push(CMPR["deflate"](data,opts));
	}
	
	var ti, tsize=1e9;
	for(var i=0; i<fls.length; i++) if(fls[i].length<tsize) {  ti=i;  tsize=fls[i].length;  }
	return fls[ti];
}
UPNG.encode._filterLine = function(data, img, y, bpl, bpp, type)
{
	var i = y*bpl, di = i+y, paeth = UPNG.decode._paeth
	data[di]=type;  di++;

	if(type==0) {
		if(bpl<500) for(var x=0; x<bpl; x++) data[di+x] = img[i+x];
		else data.set(new Uint8Array(img.buffer,i,bpl),di);
	}
	else if(type==1) {
		for(var x=  0; x<bpp; x++) data[di+x] =  img[i+x];
		for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]-img[i+x-bpp]+256)&255;
	}
	else if(y==0) {
		for(var x=  0; x<bpp; x++) data[di+x] = img[i+x];

		if(type==2) for(var x=bpp; x<bpl; x++) data[di+x] = img[i+x];
		if(type==3) for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x] - (img[i+x-bpp]>>1) +256)&255;
		if(type==4) for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x] - paeth(img[i+x-bpp], 0, 0) +256)&255;
	}
	else {
		if(type==2) { for(var x=  0; x<bpl; x++) data[di+x] = (img[i+x]+256 - img[i+x-bpl])&255;  }
		if(type==3) { for(var x=  0; x<bpp; x++) data[di+x] = (img[i+x]+256 - (img[i+x-bpl]>>1))&255;
					  for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]+256 - ((img[i+x-bpl]+img[i+x-bpp])>>1))&255;  }
		if(type==4) { for(var x=  0; x<bpp; x++) data[di+x] = (img[i+x]+256 - paeth(0, img[i+x-bpl], 0))&255;
					  for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]+256 - paeth(img[i+x-bpp], img[i+x-bpl], img[i+x-bpp-bpl]))&255;  }
	}
}

UPNG.crc = {
	table : ( function() {
	   var tab = new Uint32Array(256);
	   for (var n=0; n<256; n++) {
			var c = n;
			for (var k=0; k<8; k++) {
				if (c & 1)  c = 0xedb88320 ^ (c >>> 1);
				else        c = c >>> 1;
			}
			tab[n] = c;  }
		return tab;  })(),
	update : function(c, buf, off, len) {
		for (var i=0; i<len; i++)  c = UPNG.crc.table[(c ^ buf[off+i]) & 0xff] ^ (c >>> 8);
		return c;
	},
	crc : function(b,o,l)  {  return UPNG.crc.update(0xffffffff,b,o,l) ^ 0xffffffff;  }
}


UPNG.quantize = function(abuf, ps)
{	
	var oimg = new Uint8Array(abuf), nimg = oimg.slice(0), nimg32 = new Uint32Array(nimg.buffer);
	
	var KD = UPNG.quantize.getKDtree(nimg, ps);
	var root = KD[0], leafs = KD[1];
	
	var planeDst = UPNG.quantize.planeDst;
	var sb = oimg, tb = nimg32, len=sb.length;
		
	var inds = new Uint8Array(oimg.length>>2), nd;
	if(oimg.length<20e6)  // precise, but slow :(
		for(var i=0; i<len; i+=4) {
			var r=sb[i]*(1/255), g=sb[i+1]*(1/255), b=sb[i+2]*(1/255), a=sb[i+3]*(1/255);
			
			nd = UPNG.quantize.getNearest(root, r, g, b, a);
			inds[i>>2] = nd.ind;  tb[i>>2] = nd.est.rgba;
		}
	else 
		for(var i=0; i<len; i+=4) {
			var r=sb[i]*(1/255), g=sb[i+1]*(1/255), b=sb[i+2]*(1/255), a=sb[i+3]*(1/255);
			
			nd = root;  while(nd.left) nd = (planeDst(nd.est,r,g,b,a)<=0) ? nd.left : nd.right;
			inds[i>>2] = nd.ind;  tb[i>>2] = nd.est.rgba;
		}
	return {  abuf:nimg.buffer, inds:inds, plte:leafs  };
}

UPNG.quantize.getKDtree = function(nimg, ps, err) {
	if(err==null) err = 0.0001;
	var nimg32 = new Uint32Array(nimg.buffer);
	
	var root = {i0:0, i1:nimg.length, bst:null, est:null, tdst:0, left:null, right:null };  // basic statistic, extra statistic
	root.bst = UPNG.quantize.stats(  nimg,root.i0, root.i1  );  root.est = UPNG.quantize.estats( root.bst );
	var leafs = [root];
	
	while(leafs.length<ps)
	{
		var maxL = 0, mi=0;
		for(var i=0; i<leafs.length; i++) if(leafs[i].est.L > maxL) {  maxL=leafs[i].est.L;  mi=i;  }
		if(maxL<err) break;
		var node = leafs[mi];
		
		var s0 = UPNG.quantize.splitPixels(nimg,nimg32, node.i0, node.i1, node.est.e, node.est.eMq255);
		var s0wrong = (node.i0>=s0 || node.i1<=s0);
		//console.log(maxL, leafs.length, mi);
		if(s0wrong) {  node.est.L=0;  continue;  }
		
		
		var ln = {i0:node.i0, i1:s0, bst:null, est:null, tdst:0, left:null, right:null };  ln.bst = UPNG.quantize.stats( nimg, ln.i0, ln.i1 );  
		ln.est = UPNG.quantize.estats( ln.bst );
		var rn = {i0:s0, i1:node.i1, bst:null, est:null, tdst:0, left:null, right:null };  rn.bst = {R:[], m:[], N:node.bst.N-ln.bst.N};
		for(var i=0; i<16; i++) rn.bst.R[i] = node.bst.R[i]-ln.bst.R[i];
		for(var i=0; i< 4; i++) rn.bst.m[i] = node.bst.m[i]-ln.bst.m[i];
		rn.est = UPNG.quantize.estats( rn.bst );
		
		node.left = ln;  node.right = rn;
		leafs[mi]=ln;  leafs.push(rn);
	}
	leafs.sort(function(a,b) {  return b.bst.N-a.bst.N;  });
	for(var i=0; i<leafs.length; i++) leafs[i].ind=i;
	return [root, leafs];
}

UPNG.quantize.getNearest = function(nd, r,g,b,a)
{
	if(nd.left==null) {  nd.tdst = UPNG.quantize.dist(nd.est.q,r,g,b,a);  return nd;  }
	var planeDst = UPNG.quantize.planeDst(nd.est,r,g,b,a);
	
	var node0 = nd.left, node1 = nd.right;
	if(planeDst>0) {  node0=nd.right;  node1=nd.left;  }
	
	var ln = UPNG.quantize.getNearest(node0, r,g,b,a);
	if(ln.tdst<=planeDst*planeDst) return ln;
	var rn = UPNG.quantize.getNearest(node1, r,g,b,a);
	return rn.tdst<ln.tdst ? rn : ln;
}
UPNG.quantize.planeDst = function(est, r,g,b,a) {  var e = est.e;  return e[0]*r + e[1]*g + e[2]*b + e[3]*a - est.eMq;  }
UPNG.quantize.dist     = function(q,   r,g,b,a) {  var d0=r-q[0], d1=g-q[1], d2=b-q[2], d3=a-q[3];  return d0*d0+d1*d1+d2*d2+d3*d3;  }

UPNG.quantize.splitPixels = function(nimg, nimg32, i0, i1, e, eMq)
{
	var vecDot = UPNG.quantize.vecDot;
	i1-=4;
	var shfs = 0;
	while(i0<i1)
	{
		while(vecDot(nimg, i0, e)<=eMq) i0+=4;
		while(vecDot(nimg, i1, e)> eMq) i1-=4;
		if(i0>=i1) break;
		
		var t = nimg32[i0>>2];  nimg32[i0>>2] = nimg32[i1>>2];  nimg32[i1>>2]=t;
		
		i0+=4;  i1-=4;
	}
	while(vecDot(nimg, i0, e)>eMq) i0-=4;
	return i0+4;
}
UPNG.quantize.vecDot = function(nimg, i, e)
{
	return nimg[i]*e[0] + nimg[i+1]*e[1] + nimg[i+2]*e[2] + nimg[i+3]*e[3];
}
UPNG.quantize.stats = function(nimg, i0, i1){
	var R = [0,0,0,0,  0,0,0,0,  0,0,0,0,  0,0,0,0];
	var m = [0,0,0,0];
	var N = (i1-i0)>>2;
	for(var i=i0; i<i1; i+=4)
	{
		var r = nimg[i]*(1/255), g = nimg[i+1]*(1/255), b = nimg[i+2]*(1/255), a = nimg[i+3]*(1/255);
		//var r = nimg[i], g = nimg[i+1], b = nimg[i+2], a = nimg[i+3];
		m[0]+=r;  m[1]+=g;  m[2]+=b;  m[3]+=a;
		
		R[ 0] += r*r;  R[ 1] += r*g;  R[ 2] += r*b;  R[ 3] += r*a;  
		               R[ 5] += g*g;  R[ 6] += g*b;  R[ 7] += g*a; 
		                              R[10] += b*b;  R[11] += b*a;  
		                                             R[15] += a*a;  
	}
	R[4]=R[1];  R[8]=R[2];  R[9]=R[6];  R[12]=R[3];  R[13]=R[7];  R[14]=R[11];
	
	return {R:R, m:m, N:N};
}
UPNG.quantize.estats = function(stats){
	var R = stats.R, m = stats.m, N = stats.N;
	
	// when all samples are equal, but N is large (millions), the Rj can be non-zero ( 0.0003.... - precission error)
	var m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3], iN = (N==0 ? 0 : 1/N);
	var Rj = [
		R[ 0] - m0*m0*iN,  R[ 1] - m0*m1*iN,  R[ 2] - m0*m2*iN,  R[ 3] - m0*m3*iN,  
		R[ 4] - m1*m0*iN,  R[ 5] - m1*m1*iN,  R[ 6] - m1*m2*iN,  R[ 7] - m1*m3*iN,
		R[ 8] - m2*m0*iN,  R[ 9] - m2*m1*iN,  R[10] - m2*m2*iN,  R[11] - m2*m3*iN,  
		R[12] - m3*m0*iN,  R[13] - m3*m1*iN,  R[14] - m3*m2*iN,  R[15] - m3*m3*iN 
	];
	
	var A = Rj, M = UPNG.M4;
	var b = [Math.random(),Math.random(),Math.random(),Math.random()], mi = 0, tmi = 0;
	
	if(N!=0)
	for(var i=0; i<16; i++) {
		b = M.multVec(A, b);  tmi = Math.sqrt(M.dot(b,b));  b = M.sml(1/tmi,  b);
		if(i!=0 && Math.abs(tmi-mi)<1e-9) break;  mi = tmi;
	}	
	//b = [0,0,1,0];  mi=N;
	var q = [m0*iN, m1*iN, m2*iN, m3*iN];
	var eMq255 = M.dot(M.sml(255,q),b);
	
	return {  Cov:Rj, q:q, e:b, L:mi,  eMq255:eMq255, eMq : M.dot(b,q),
				rgba: (((Math.round(255*q[3])<<24) | (Math.round(255*q[2])<<16) |  (Math.round(255*q[1])<<8) | (Math.round(255*q[0])<<0))>>>0)  };
}
UPNG.M4 = {
	multVec : function(m,v) {
			return [
				m[ 0]*v[0] + m[ 1]*v[1] + m[ 2]*v[2] + m[ 3]*v[3],
				m[ 4]*v[0] + m[ 5]*v[1] + m[ 6]*v[2] + m[ 7]*v[3],
				m[ 8]*v[0] + m[ 9]*v[1] + m[10]*v[2] + m[11]*v[3],
				m[12]*v[0] + m[13]*v[1] + m[14]*v[2] + m[15]*v[3]
			];
	},
	dot : function(x,y) {  return  x[0]*y[0]+x[1]*y[1]+x[2]*y[2]+x[3]*y[3];  },
	sml : function(a,y) {  return [a*y[0],a*y[1],a*y[2],a*y[3]];  }
}

UPNG.encode.concatRGBA = function(bufs) {
	var tlen = 0;
	for(var i=0; i<bufs.length; i++) tlen += bufs[i].byteLength;
	var nimg = new Uint8Array(tlen), noff=0;
	for(var i=0; i<bufs.length; i++) {
		var img = new Uint8Array(bufs[i]), il = img.length;
		for(var j=0; j<il; j+=4) {  
			var r=img[j], g=img[j+1], b=img[j+2], a = img[j+3];
			if(a==0) r=g=b=0;
			nimg[noff+j]=r;  nimg[noff+j+1]=g;  nimg[noff+j+2]=b;  nimg[noff+j+3]=a;  }
		noff += il;
	}
	return nimg.buffer;
}
var UTEX=function(){function L(W,l,M,F,t){var K=new Uint8Array(4*4*4);for(var $=0;$<t;$+=4)for(var I=0;
I<F;I+=4){D(W,l,K);n(M,F,t,I,$,K);l+=8}return l}function a6(W,l,M,F,t){var K=new Uint8Array(4*4*4);for(var $=0;
$<t;$+=4)for(var I=0;I<F;I+=4){D(W,l+8,K);n(M,F,t,I,$,K);l+=16}return l}function aa(W,l,M,F,t){var K=new Uint8Array(4*4*4);
for(var $=0;$<t;$+=4)for(var I=0;I<F;I+=4){Y(W,l,K);n(M,F,t,I,$,K);l+=8}return l}function k(W,l,M,F,t){var K=new Uint8Array(16*4);
for(var $=0;$<M;$+=4)for(var I=0;I<l;I+=4){r(W,l,M,I,$,K);c(F,t,K);t+=8}return t}function B(W,l,M,F,t){var K={W:l*8},$=new Uint8Array(4*4*4);
for(var I=0;I<t;I+=4)for(var O=0;O<F;O+=4){Y(W,l+8,$);for(var C=0;C<64;C+=4){var j=a2(W,K,4);$[C+3]=255*(j/15)}n(M,F,t,O,I,$);
l+=16;K.W+=64}return l}function Q(W,l){var M=[W,l];if(W>l)M.push(6/7*W+1/7*l,5/7*W+2/7*l,4/7*W+3/7*l,3/7*W+4/7*l,2/7*W+5/7*l,1/7*W+6/7*l);
else M.push(4/5*W+1/5*l,3/5*W+2/5*l,2/5*W+3/5*l,1/5*W+4/5*l,0,255);return M}function T(W,l,M,F,t){var K=Q(W[l],W[l+1]);
M.W+=16;for(var $=0;$<64;$+=4){var I=a2(W,M,3);F[$+t]=K[I]}}function u(W,l,M,F,t){var K={W:l*8},$=new Uint8Array(4*4*4);
$.fill(255);for(var I=0;I<t;I+=4)for(var O=0;O<F;O+=4){T(W,l,K,$,1);l+=8;T(W,l,K,$,0);l+=8;n(M,F,t,O,I,$)}return l}function G(W,l,M,F,t){var K={W:l*8},$=new Uint8Array(4*4*4);
for(var I=0;I<t;I+=4)for(var O=0;O<F;O+=4){Y(W,l+8,$);T(W,l,K,$,3);K.W+=64;n(M,F,t,O,I,$);l+=16}return l}function a(W,l,M,F,t){var K=new Uint8Array(16*4);
for(var $=0;$<M;$+=4)for(var I=0;I<l;I+=4){r(W,l,M,I,$,K);var O=K[3],C=K[3];for(var j=7;j<64;j+=4){var b=K[j];
if(b<O)O=b;else if(C<b)C=b}F[t]=C;F[t+1]=O;t+=2;var h=Q(C,O),_=t+2<<3;for(var j=0;j<64;j+=32){var S=0,_=0;
for(var J=0;J<32;J+=4){var v=0,V=500,b=K[j+J+3];for(var p=0;p<8;p++){var w=Math.abs(h[p]-b);if(w<V){V=w;
v=p}}S=S|v<<_;_+=3}F[t]=S;F[t+1]=S>>8;F[t+2]=S>>16;t+=3}c(F,t,K);t+=8}return t}var E=new Uint8Array(16);
function D(W,l,M){var F=W[l+1]<<8|W[l],t=W[l+3]<<8|W[l+2],K=(F&31)*(255/31),$=(F>>>5&31)*(255/31),I=(F>>10)*(255/31),O=(t&31)*(255/31),C=(t>>>5&63)*(255/63),j=(t>>11)*(255/31),b=E;
b[0]=~~I;b[1]=~~$;b[2]=~~K;b[3]=255;b[12]=~~j;b[13]=~~C;b[14]=~~O;b[15]=255;var h=2/3,_=1-h;b[4]=~~(h*I+_*j);
b[5]=~~(h*$+_*C);b[6]=~~(h*K+_*O);b[7]=255;h=1/3;_=1-h;b[8]=~~(h*I+_*j);b[9]=~~(h*$+_*C);b[10]=~~(h*K+_*O);
b[11]=255;z(W,M,b,l)}function Y(W,l,M){var F=W[l+1]<<8|W[l],t=W[l+3]<<8|W[l+2],K=(F&31)*(255/31),$=(F>>>5&63)*(255/63),I=(F>>11)*(255/31),O=(t&31)*(255/31),C=(t>>>5&63)*(255/63),j=(t>>11)*(255/31),b=E;
b[0]=~~I;b[1]=~~$;b[2]=~~K;b[3]=255;b[4]=~~j;b[5]=~~C;b[6]=~~O;b[7]=255;if(t<F){var h=2/3,_=1-h;b[8]=~~(h*I+_*j);
b[9]=~~(h*$+_*C);b[10]=~~(h*K+_*O);b[11]=255;h=1/3;_=1-h;b[12]=~~(h*I+_*j);b[13]=~~(h*$+_*C);b[14]=~~(h*K+_*O);
b[15]=255}else{var h=1/2,_=1-h;b[8]=~~(h*I+_*j);b[9]=~~(h*$+_*C);b[10]=~~(h*K+_*O);b[11]=255;b[12]=0;
b[13]=0;b[14]=0;b[15]=0}z(W,M,b,l)}function c(W,l,M){var F=A,t=af(M),K=M[t>>8],$=M[(t>>8)+1],I=M[(t>>8)+2],O=M[t&255],C=M[(t&255)+1],j=M[(t&255)+2],b=K>>3<<11|$>>2<<5|I>>3,h=O>>3<<11|C>>2<<5|j>>3;
if(b<h){var _=b;b=h;h=_}var I=Math.floor((b&31)*(255/31)),$=Math.floor((b>>>5&63)*(255/63)),K=Math.floor((b>>11)*(255/31)),j=Math.floor((h&31)*(255/31)),C=Math.floor((h>>>5&63)*(255/63)),O=Math.floor((h>>11)*(255/31));
W[l+0]=b&255;W[l+1]=b>>8;W[l+2]=h&255;W[l+3]=h>>8;var S=2/3,J=1-S,v=Math.floor(S*K+J*O),V=Math.floor(S*$+J*C),p=Math.floor(S*I+J*j);
S=1/3;J=1-S;var w=Math.floor(S*K+J*O),a5=Math.floor(S*$+J*C),y=Math.floor(S*I+J*j),m=l*8+32;for(var i=0;
i<64;i+=4){var f=M[i],H=M[i+1],an=M[i+2],a9=F(f,H,an,K,$,I),a8=F(f,H,an,O,C,j),o=F(f,H,an,v,V,p),R=F(f,H,an,w,a5,y),al=Math.min(a9,Math.min(a8,Math.min(o,R))),g=0;
if(al==a8)g=1;else if(al==o)g=2;else if(al==R)g=3;W[m>>3]|=g<<(m&7);m+=2}}function z(W,l,M,F){var t=F+4<<3;
for(var K=0;K<64;K+=4){var $=W[t>>3]>>(t&7)&3;t+=2;$=$<<2;l[K]=M[$];l[K+1]=M[$+1];l[K+2]=M[$+2];l[K+3]=M[$+3]}}function r(W,l,M,F,t,K){for(var $=0;
$<4;$++){var I=(t+$)*l+F<<2,O=$<<4;K[O+0]=W[I+0];K[O+1]=W[I+1];K[O+2]=W[I+2];K[O+3]=W[I+3];K[O+4]=W[I+4];
K[O+5]=W[I+5];K[O+6]=W[I+6];K[O+7]=W[I+7];K[O+8]=W[I+8];K[O+9]=W[I+9];K[O+10]=W[I+10];K[O+11]=W[I+11];
K[O+12]=W[I+12];K[O+13]=W[I+13];K[O+14]=W[I+14];K[O+15]=W[I+15]}}function n(W,l,M,F,t,K){for(var $=0;
$<4;$++){var I=(t+$)*l+F<<2,O=$<<4;W[I+0]=K[O+0];W[I+1]=K[O+1];W[I+2]=K[O+2];W[I+3]=K[O+3];W[I+4]=K[O+4];
W[I+5]=K[O+5];W[I+6]=K[O+6];W[I+7]=K[O+7];W[I+8]=K[O+8];W[I+9]=K[O+9];W[I+10]=K[O+10];W[I+11]=K[O+11];
W[I+12]=K[O+12];W[I+13]=K[O+13];W[I+14]=K[O+14];W[I+15]=K[O+15]}}var d="0011001100110011 0001000100010001 0111011101110111 0001001100110111 0000000100010011 0011011101111111 0001001101111111 0000000100110111 0000000000010011 0011011111111111 0000000101111111 0000000000010111 0001011111111111 0000000011111111 0000111111111111 0000000000001111 0000100011101111 0111000100000000 0000000010001110 0111001100010000 0011000100000000 0000100011001110 0000000010001100 0111001100110001 0011000100010000 0000100010001100 0110011001100110 0011011001101100 0001011111101000 0000111111110000 0111000110001110 0011100110011100 0101010101010101 0000111100001111 0101101001011010 0011001111001100 0011110000111100 0101010110101010 0110100101101001 0101101010100101 0111001111001110 0001001111001000 0011001001001100 0011101111011100 0110100110010110 0011110011000011 0110011010011001 0000011001100000 0100111001000000 0010011100100000 0000001001110010 0000010011100100 0110110010010011 0011011011001001 0110001110011100 0011100111000110 0110110011001001 0110001100111001 0111111010000001 0001100011100111 0000111100110011 0011001111110000 0010001011101110 0100010001110111".split(" "),q="0011001102212222 0001001122112221 0000200122112211 0222002200110111 0000000011221122 0011001100220022 0022002211111111 0011001122112211 0000000011112222 0000111111112222 0000111122222222 0012001200120012 0112011201120112 0122012201220122 0011011211221222 0011200122002220 0001001101121122 0111001120012200 0000112211221122 0022002200221111 0111011102220222 0001000122212221 0000001101220122 0000110022102210 0122012200110000 0012001211222222 0110122112210110 0000011012211221 0022110211020022 0110011020022222 0011012201220011 0000200022112221 0000000211221222 0222002200120011 0011001200220222 0120012001200120 0000111122220000 0120120120120120 0120201212010120 0011220011220011 0011112222000011 0101010122222222 0000000021212121 0022112200221122 0022001100220011 0220122102201221 0101222222220101 0000212121212121 0101010101012222 0222011102220111 0002111200021112 0000211221122112 0222011101110222 0002111211120002 0110011001102222 0000000021122112 0110011022222222 0022001100110022 0022112211220022 0000000000002112 0002000100020001 0222122202221222 0101222222222222 0111201122012220".split(" "),Z=[[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,2,0],[0,8,0],[0,2,0],[0,2,0],[0,8,0],[0,8,0],[0,15,0],[0,2,0],[0,8,0],[0,2,0],[0,2,0],[0,8,0],[0,8,0],[0,2,0],[0,2,0],[0,15,0],[0,15,0],[0,6,0],[0,8,0],[0,2,0],[0,8,0],[0,15,0],[0,15,0],[0,2,0],[0,8,0],[0,2,0],[0,2,0],[0,2,0],[0,15,0],[0,15,0],[0,6,0],[0,6,0],[0,2,0],[0,6,0],[0,8,0],[0,15,0],[0,15,0],[0,2,0],[0,2,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,2,0],[0,2,0],[0,15,0]],ae=[[0,3,15],[0,3,8],[0,15,8],[0,15,3],[0,8,15],[0,3,15],[0,15,3],[0,15,8],[0,8,15],[0,8,15],[0,6,15],[0,6,15],[0,6,15],[0,5,15],[0,3,15],[0,3,8],[0,3,15],[0,3,8],[0,8,15],[0,15,3],[0,3,15],[0,3,8],[0,6,15],[0,10,8],[0,5,3],[0,8,15],[0,8,6],[0,6,10],[0,8,15],[0,5,15],[0,15,10],[0,15,8],[0,8,15],[0,15,3],[0,3,15],[0,5,10],[0,6,10],[0,10,8],[0,8,9],[0,15,10],[0,15,6],[0,3,15],[0,15,8],[0,5,15],[0,15,3],[0,15,6],[0,15,6],[0,15,8],[0,3,15],[0,15,3],[0,5,15],[0,5,15],[0,5,15],[0,8,15],[0,5,15],[0,10,15],[0,5,15],[0,10,15],[0,8,15],[0,13,15],[0,15,3],[0,12,15],[0,3,15],[0,3,8]];
function P(W,l,M,F,t){var K=a2,$={W:0},I=new Uint8Array(4*4*4),O=[null,null,[0,21,43,64],[0,9,18,27,37,46,55,64],[0,4,9,13,17,21,26,30,34,38,43,47,51,55,60,64]],C=[null,null,d,q],j=[null,null,Z,ae];
for(var b=0;b<t;b+=4)for(var h=0;h<F;h+=4){var _=0,al="0000000000000000";while((W[l]>>_&1)!=1)_++;$.W=(l<<3)+_+1;
var S=_==4||_==5?K(W,$,2):0,J=_==4?K(W,$,1):0,v=[4,6,6,6,0,0,0,6][_],V=K(W,$,v),p=[4,6,5,7,5,7,7,5][_],w=[0,0,0,0,6,8,7,5][_],a5=[1,1,0,1,0,0,1,1][_],y=[6,4,6,4,2,2,2,4][_],m=[];
for(var i=0;i<4;i++){var f=i==3?w:p;for(var H=0;H<y;H++)m[i*y+H]=K(W,$,f)}for(var H=0;H<y;H++){if(_==1&&(H&1)==1)$.W--;
var an=K(W,$,a5);for(var i=0;i<3;i++)m[i*y+H]=m[i*y+H]<<a5|an;if(w!=0)m[3*y+H]=m[3*y+H]<<a5|an}p+=a5;
if(w!=0)w+=a5;for(var i=0;i<4;i++){var f=i==3?w:p,a9=f==0?0:1/((1<<f)-1);for(var H=0;H<y;H++)m[i*y+H]*=a9}if(w==0)for(var H=0;
H<y;H++)m[3*y+H]=1;var a8=[3,2,3,2,1,1,1,2][_],o=[3,3,2,2,2,2,4,2][_],R=[0,0,0,0,3,2,0,0][_],g=[0,0,0];
if(a8!=1){al=C[a8][V];g=j[a8][V]}var ah=$.W,ac=ah+16*o-a8;if(J==1){var ao=ah;ah=ac;ac=ao;ao=o;o=R;R=ao}var ak=O[o];
$.W=ah;for(var i=0;i<64;i+=4){var x=al.charCodeAt(i>>2)-48,a0=g[x]==i>>2?1:0,a4=K(W,$,o-a0),s=ak[a4]/64,a7=(1-s)*m[0*y+2*x+0]+s*m[0*y+2*x+1],ad=(1-s)*m[1*y+2*x+0]+s*m[1*y+2*x+1],ag=(1-s)*m[2*y+2*x+0]+s*m[2*y+2*x+1],a1=(1-s)*m[3*y+2*x+0]+s*m[3*y+2*x+1];
I[i]=a7*255;I[i+1]=ad*255;I[i+2]=ag*255;I[i+3]=a1*255}ak=O[R];$.W=ac;if(R!=0)for(var i=0;i<64;i+=4){var x=al.charCodeAt(i>>2)-48,a0=g[x]==i>>2?1:0,a4=K(W,$,R-a0),s=ak[a4]/64,a1=(1-s)*m[3*y+2*x+0]+s*m[3*y+2*x+1];
I[i+3]=a1*255}ai(I,S);n(M,F,t,h,b,I);l+=16}return l}function ai(W,l){if(l==0)return;for(var M=0;M<64;
M+=4){var F=W[M],t=W[M+1],K=W[M+2],$=W[M+3];if(l==1){var I=$;$=F;F=I}if(l==2){var I=$;$=t;t=I}if(l==3){var I=$;
$=K;K=I}W[M]=F;W[M+1]=t;W[M+2]=K;W[M+3]=$}}function a2(W,l,M){var F=0,t=M;while(M!=0){F=F|X(W,l)<<t-M;
M--}return F}function X(W,l){var M=l.W;l.W++;return W[M>>3]>>(M&7)&1}function e(W,l,M){var F=l>>1,t=M>>1,K=new Uint8Array(F*t*4);
for(var $=0;$<t;$++)for(var I=0;I<F;I++){var O=$*F+I<<2,C=($<<1)*l+(I<<1)<<2,j=W[C+3],b=W[C+7],h=W[C]*j+W[C+4]*b,_=W[C+1]*j+W[C+5]*b,S=W[C+2]*j+W[C+6]*b;
C+=l<<2;var J=W[C+3],v=W[C+7];h+=W[C]*J+W[C+4]*v;_+=W[C+1]*J+W[C+5]*v;S+=W[C+2]*J+W[C+6]*v;var V=j+b+J+v+2>>2,p=V==0?0:.25/V;
K[O]=~~(h*p+.5);K[O+1]=~~(_*p+.5);K[O+2]=~~(S*p+.5);K[O+3]=V}return K}function A(W,l,M,F,t,K){return(W-F)*(W-F)+(l-t)*(l-t)+(M-K)*(M-K)}function af(W){var l=A,M=0,F=0;
for(var t=0;t<64;t+=4){var K=W[t],$=W[t+1],I=W[t+2];for(var O=t+4;O<64;O+=4){var C=l(K,$,I,W[O],W[O+1],W[O+2]);
if(C>F){F=C;M=t<<8|O}}}return M}var aj=new ArrayBuffer(4),N=new Uint8Array(aj),ab=new Uint32Array(aj),am=new Uint16Array(aj),a3={Y:function(W,l){N[0]=W[l+0];
N[1]=W[l+1];return am[0]},T:function(W,l){N[0]=W[l+0];N[1]=W[l+1];N[2]=W[l+2];N[3]=W[l+3];return ab[0]},G:function(W,l,M){ab[0]=M;
W[l+0]=N[0];W[l+1]=N[1];W[l+2]=N[2];W[l+3]=N[3]},t:function(W,l,M){var F="";for(var t=0;t<M;t++)F+=String.fromCharCode(W[l+t]);
return F},b:function(W,l,M){for(var F=0;F<M.length;F++)W[l+F]=M.charCodeAt(F)}};return{R:aa,C:B,k:G,M:u,K:P,e:L,J:a6,P:k,n:a,o:e,X:a3}}();
UTEX.DDS=function(){var L={r:1,D:2,h:4,L:8,S:4096,_:131072,N:524288,q:8388608,Q:1,i:2,a:4,I:64,O:512,$:131072,B:8,z:4194304,A:4096};
function a6(G){var a=new Uint8Array(G),E=0,D=UTEX.X.t(a,E,4),Y,c,z;E+=4;Y=k(a,E);E+=124;c=Y.Z;if(c.u&L.a&&c.f=="DX10"){z=u(a,E);
E+=20}var r=Y.width,n=Y.height,d=[],q=c.f,Z=c.w,ae={DXT1:"BC1",DXT3:"BC2",DXT5:"BC3",DX10:"BC7",ATI2:"BC5"};
if(ae[q])q=ae[q];if(z){var P=z.V;if(70<=P&&P<=72)q="BC1";else if(73<=P&&P<=75)q="BC2";else if(76<=P&&P<=78)q="BC3";
else if(97<=P&&P<=99)q="BC7";else console.log("Unknown DX10 format",P)}var a2=Math.max(1,Y.c);for(var X=0;
X<a2;X++){var e=r*n*4,A=new Uint8Array(e);if(!1){}else if(q=="BC1")E=UTEX.R(a,E,A,r,n);else if(q=="BC2")E=UTEX.C(a,E,A,r,n);
else if(q=="BC3")E=UTEX.k(a,E,A,r,n);else if(q=="BC5")E=UTEX.M(a,E,A,r,n);else if(q=="BC7")E=UTEX.K(a,E,A,r,n);
else if(q=="ATC ")E=UTEX.e(a,E,A,r,n);else if(q=="ATCA")E=UTEX.J(a,E,A,r,n);else if(q=="ATCI")E=UTEX.J(a,E,A,r,n);
else if(c.u&L.Q&&c.u&L.I){var af=c.l,N=255/af,ab=c.j,am=255/ab,W=c.H,l=255/W,M=c.m,F=255/M;if(Z==32){for(var t=0;
t<e;t+=4){var K=a[E+t+3]<<24|a[E+t+2]<<16|a[E+t+1]<<8|a[E+t];A[t+0]=(K&af)*N;A[t+1]=(K&ab)*am;A[t+2]=(K&W)*l;
A[t+3]=(K&M)*F}E+=e}else if(Z==16){for(var t=0;t<e;t+=4){var K=a[E+(t>>1)+1]<<8|a[E+(t>>1)];A[t+0]=(K&af)*N;
A[t+1]=(K&ab)*am;A[t+2]=(K&W)*l;A[t+3]=(K&M)*F}E+=e>>>1}else throw"unknown bit count "+Z}else if(c.u&L.i||c.u&L.Q||c.u&L.$){if(Z==8){for(var t=0;
t<e;t+=4)A[t+3]=a[E+(t>>2)];E+=e>>>2}else throw"unknown bit count "+Z}else{console.log("unknown texture format, head flags: ",Y.u.toString(2),"pixelFormat flags: ",c.u.toString(2));
throw"e"}d.push({width:r,height:n,image:A.buffer});r=r>>>1;n=n>>>1}return d}function aa(G,a,E){var G=new Uint8Array(G),D=255,r=0,n=0;
for(var Y=3;Y<G.length;Y+=4)D&=G[Y];var c=D<250,z=new Uint8Array(124+a*E*2);UTEX.X.b(z,r,"DDS ");r+=4;
B(z,a,E,c,r);r+=124;while(a*E!=0){if(c)r=UTEX.n(G,a,E,z,r);else r=UTEX.P(G,a,E,z,r);G=UTEX.o(G,a,E);
a=a>>1;E=E>>1;n++}z[28]=n;return z.buffer.slice(0,r)}function k(G,a){var E={},D=UTEX.X.T;a+=4;E.u=D(G,a);
a+=4;E.height=D(G,a);a+=4;E.width=D(G,a);a+=4;E.pitch=D(G,a);a+=4;E.depth=D(G,a);a+=4;E.c=D(G,a);a+=4;
a+=11*4;E.Z=Q(G,a);a+=32;E.v=D(G,a);a+=4;E.g=D(G,a);a+=4;E.a3=D(G,a);a+=4;E.a8=D(G,a);a+=4;a+=4;return E}function B(G,a,E,D,Y){var c=UTEX.X.G,z=L.r|L.D|L.h|L.S;
z|=L._|L.N;var r=L.B|L.z|L.A,n=(a*E>>1)*(D?2:1),d=D?1:0;c(G,Y,124);Y+=4;c(G,Y,z);Y+=4;c(G,Y,E);Y+=4;
c(G,Y,a);Y+=4;c(G,Y,n);Y+=4;c(G,Y,d);Y+=4;c(G,Y,10);Y+=4;Y+=11*4;T(G,D,Y);Y+=32;c(G,Y,r);Y+=4;Y+=4*4}function Q(G,a){var E={},D=UTEX.X.T;
a+=4;E.u=D(G,a);a+=4;E.f=UTEX.X.t(G,a,4);a+=4;E.w=D(G,a);a+=4;E.l=D(G,a);a+=4;E.j=D(G,a);a+=4;E.H=D(G,a);
a+=4;E.m=D(G,a);a+=4;return E}function T(G,a,E){var D=UTEX.X.G,Y=L.a;D(G,E,32);E+=4;D(G,E,Y);E+=4;UTEX.X.b(G,E,a?"DXT5":"DXT1");
E+=4;E+=5*4}function u(G,a){var E={},D=UTEX.X.T;E.V=D(G,a);a+=4;E.a4=D(G,a);a+=4;E.a6=D(G,a);a+=4;E.a1=D(G,a);
a+=4;E.a0=D(G,a);a+=4;return E}return{encode:aa,decode:a6}}();UTEX.VTF=function(){var L={};function a6(k){var B=new Uint8Array(k),Q=0,T={};
Q=aa(B,Q,T);var u=T.F,G=T.d;if(u*G!=0){var a=new Uint8Array(u*G*4);Q=UTEX.R(B,Q,a,u,G)}var E=T.s,D=T.p,Y=[];
for(var c=0;c<D;c++){var z=T.width>>>D-1-c,r=T.height>>>D-1-c;for(var n=0;n<T.frames;n++){var a=new Uint8Array(z*r*4);
if(E==0||E==12){var d=Q,q=E==0?[0,1,2,3]:[2,1,0,3],Z=q[0],ae=q[1],P=q[2],a2=q[3];for(var X=0;X<a.length;
X+=4){a[X+Z]=B[d++];a[X+ae]=B[d++];a[X+P]=B[d++];a[X+a2]=B[d++]}Q+=z*r*4}else if(E==2){for(var X=0;X<a.length;
X+=4){a[X]=B[Q++];a[X+1]=B[Q++];a[X+2]=B[Q++];a[X+3]=255}}else if(E==13)Q=UTEX.R(B,Q,a,z,r);else if(E==14)Q=UTEX.C(B,Q,a,z,r);
else if(E==15)Q=UTEX.k(B,Q,a,z,r);else throw E;Y.push({width:z,height:r,image:a.buffer})}}return Y}function aa(k,B,Q){var T=UTEX.X.T,u=UTEX.X.Y,G=UTEX.X.t(k,B,4);
B+=4;var a=T(k,B);B+=4;var E=T(k,B);B+=4;var D=T(k,B);B+=4;Q.width=u(k,B);B+=2;Q.height=u(k,B);B+=2;
Q.u=T(k,B);B+=4;Q.frames=u(k,B);B+=2;Q.a7=u(k,B);B+=2;B+=4;B+=12;B+=4;B+=4;Q.s=T(k,B);B+=4;Q.p=k[B++];
Q.a2=T(k,B);B+=4;Q.F=k[B++];Q.d=k[B++];if(E>=2){Q.depth=u(k,B);B+=2;if(E>=3){B+=3;Q.a5=T(k,B);B+=4}}return D}return{decode:a6}}();(function(){var _={};if(typeof module=="object"){module.exports=_}else{self.UTIF=_}var b5=typeof require==="function"?require("pako"):self.pako;
function av(){if(typeof process=="undefined"||process.env.NODE_ENV=="development")console.log.apply(console,arguments)}(function(_,b5){(function(){"use strict";
var M=function Y(){function M($){this.message="JPEG error: "+$}M.prototype=new Error;M.prototype.name="JpegError";
M.constructor=M;return M}(),t=function h(){var $=new Uint8Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),R=4017,Q=799,l=3406,e=2276,b=1567,C=3784,T=5793,i=2896;
function t(E){if(E==null)E={};if(E.w==null)E.w=-1;this.V=E.n;this.N=E.w}function z(E,q){var N=0,H=[],n,j,X=16,u;
while(X>0&&!E[X-1]){X--}H.push({children:[],index:0});var d=H[0];for(n=0;n<X;n++){for(j=0;j<E[n];j++){d=H.pop();
d.children[d.index]=q[N];while(d.index>0){d=H.pop()}d.index++;H.push(d);while(H.length<=n){H.push(u={children:[],index:0});
d.children[d.index]=u.children;d=u}N++}if(n+1<X){H.push(u={children:[],index:0});d.children[d.index]=u.children;
d=u}}return H[0].children}function A(E,q,N){return 64*((E.P+1)*q+N)}function O(E,q,N,H,n,j,X,u,d,Z){if(Z==null)Z=!1;
var B=N.m,k=N.Z,W=q,S=0,U=0,r=0,L=0,az,J=0,p,v,x,m,ab,ae,ax=0,aF,aU,aK,aS;function a(){if(U>0){U--;return S>>U&1}S=E[q++];
if(S===255){var aB=E[q++];if(aB){if(aB===220&&Z){q+=2;var aC=c(E,q);q+=2;if(aC>0&&aC!==N.s){throw new DNLMarkerError("Found DNL marker (0xFFDC) while parsing scan data",aC)}}else if(aB===217){if(Z){var aO=J*8;
if(aO>0&&aO<N.s/10){throw new DNLMarkerError("Found EOI marker (0xFFD9) while parsing scan data, "+"possibly caused by incorrect `scanLines` parameter",aO)}}throw new EOIMarkerError("Found EOI marker (0xFFD9) while parsing scan data")}throw new M("unexpected marker")}}U=7;
return S>>>7}function aa(aB){var aC=aB;while(!0){aC=aC[a()];switch(typeof aC){case"number":return aC;
case"object":continue}throw new M("invalid huffman sequence")}}function ap(aB){var ab=0;while(aB>0){ab=ab<<1|a();
aB--}return ab}function w(aB){if(aB===1){return a()===1?1:-1}var ab=ap(aB);if(ab>=1<<aB-1){return ab}return ab+(-1<<aB)+1}function b8(p,aB){var aC=aa(p.J),aO=aC===0?0:w(aC),m=1;
p.D[aB]=p.Q+=aO;while(m<64){var a9=aa(p.i),a_=a9&15,as=a9>>4;if(a_===0){if(as<15){break}m+=16;continue}m+=as;
var ar=$[m];p.D[aB+ar]=w(a_);m++}}function aI(p,aB){var aC=aa(p.J),aO=aC===0?0:w(aC)<<d;p.D[aB]=p.Q+=aO}function aq(p,aB){p.D[aB]|=a()<<d}function ag(p,aB){if(r>0){r--;
return}var m=j,aC=X;while(m<=aC){var aO=aa(p.i),a9=aO&15,a_=aO>>4;if(a9===0){if(a_<15){r=ap(a_)+(1<<a_)-1;
break}m+=16;continue}m+=a_;var as=$[m];p.D[aB+as]=w(a9)*(1<<d);m++}}function aQ(p,aB){var m=j,aC=X,aO=0,a9,a_;
while(m<=aC){var as=aB+$[m],ar=p.D[as]<0?-1:1;switch(L){case 0:a_=aa(p.i);a9=a_&15;aO=a_>>4;if(a9===0){if(aO<15){r=ap(aO)+(1<<aO);
L=4}else{aO=16;L=1}}else{if(a9!==1){throw new M("invalid ACn encoding")}az=w(a9);L=aO?2:3}continue;case 1:case 2:if(p.D[as]){p.D[as]+=ar*(a()<<d)}else{aO--;
if(aO===0){L=L===2?3:0}}break;case 3:if(p.D[as]){p.D[as]+=ar*(a()<<d)}else{p.D[as]=az<<d;L=0}break;case 4:if(p.D[as]){p.D[as]+=ar*(a()<<d)}break}m++}if(L===4){r--;
if(r===0){L=0}}}function af(p,aB,ax,aC,aO){var a9=ax/B|0,a_=ax%B;J=a9*p.A+aC;var as=a_*p.h+aO,ar=A(p,J,as);
aB(p,ar)}function b3(p,aB,ax){J=ax/p.P|0;var aC=ax%p.P,aO=A(p,J,aC);aB(p,aO)}var a5=H.length;if(k){if(j===0){ae=u===0?aI:aq}else{ae=u===0?ag:aQ}}else{ae=b8}if(a5===1){aU=H[0].P*H[0].c}else{aU=B*N.R}while(ax<=aU){var aV=n?Math.min(aU-ax,n):aU;
if(aV>0){for(v=0;v<a5;v++){H[v].Q=0}r=0;if(a5===1){p=H[0];for(ab=0;ab<aV;ab++){b3(p,ae,ax);ax++}}else{for(ab=0;
ab<aV;ab++){for(v=0;v<a5;v++){p=H[v];aK=p.h;aS=p.A;for(x=0;x<aS;x++){for(m=0;m<aK;m++){af(p,ae,ax,x,m)}}}ax++}}}U=0;
aF=G(E,q);if(!aF){break}if(aF.u){var a4=aV>0?"unexpected":"excessive";q=aF.offset}if(aF.M>=65488&&aF.M<=65495){q+=2}else{break}}return q-W}function K(E,q,N){var H=E.$,n=E.D,j,X,u,d,Z,B,k,W,S,U,r,L,az,J,p,aH,v;
if(!H){throw new M("missing required Quantization Table.")}for(var x=0;x<64;x+=8){S=n[q+x];U=n[q+x+1];
r=n[q+x+2];L=n[q+x+3];az=n[q+x+4];J=n[q+x+5];p=n[q+x+6];aH=n[q+x+7];S*=H[x];if((U|r|L|az|J|p|aH)===0){v=T*S+512>>10;
N[x]=v;N[x+1]=v;N[x+2]=v;N[x+3]=v;N[x+4]=v;N[x+5]=v;N[x+6]=v;N[x+7]=v;continue}U*=H[x+1];r*=H[x+2];L*=H[x+3];
az*=H[x+4];J*=H[x+5];p*=H[x+6];aH*=H[x+7];j=T*S+128>>8;X=T*az+128>>8;u=r;d=p;Z=i*(U-aH)+128>>8;W=i*(U+aH)+128>>8;
B=L<<4;k=J<<4;j=j+X+1>>1;X=j-X;v=u*C+d*b+128>>8;u=u*b-d*C+128>>8;d=v;Z=Z+k+1>>1;k=Z-k;W=W+B+1>>1;B=W-B;
j=j+d+1>>1;d=j-d;X=X+u+1>>1;u=X-u;v=Z*e+W*l+2048>>12;Z=Z*l-W*e+2048>>12;W=v;v=B*Q+k*R+2048>>12;B=B*R-k*Q+2048>>12;
k=v;N[x]=j+W;N[x+7]=j-W;N[x+1]=X+k;N[x+6]=X-k;N[x+2]=u+B;N[x+5]=u-B;N[x+3]=d+Z;N[x+4]=d-Z}for(var m=0;
m<8;++m){S=N[m];U=N[m+8];r=N[m+16];L=N[m+24];az=N[m+32];J=N[m+40];p=N[m+48];aH=N[m+56];if((U|r|L|az|J|p|aH)===0){v=T*S+8192>>14;
if(v<-2040){v=0}else if(v>=2024){v=255}else{v=v+2056>>4}n[q+m]=v;n[q+m+8]=v;n[q+m+16]=v;n[q+m+24]=v;
n[q+m+32]=v;n[q+m+40]=v;n[q+m+48]=v;n[q+m+56]=v;continue}j=T*S+2048>>12;X=T*az+2048>>12;u=r;d=p;Z=i*(U-aH)+2048>>12;
W=i*(U+aH)+2048>>12;B=L;k=J;j=(j+X+1>>1)+4112;X=j-X;v=u*C+d*b+2048>>12;u=u*b-d*C+2048>>12;d=v;Z=Z+k+1>>1;
k=Z-k;W=W+B+1>>1;B=W-B;j=j+d+1>>1;d=j-d;X=X+u+1>>1;u=X-u;v=Z*e+W*l+2048>>12;Z=Z*l-W*e+2048>>12;W=v;v=B*Q+k*R+2048>>12;
B=B*R-k*Q+2048>>12;k=v;S=j+W;aH=j-W;U=X+k;p=X-k;r=u+B;J=u-B;L=d+Z;az=d-Z;if(S<16){S=0}else if(S>=4080){S=255}else{S>>=4}if(U<16){U=0}else if(U>=4080){U=255}else{U>>=4}if(r<16){r=0}else if(r>=4080){r=255}else{r>>=4}if(L<16){L=0}else if(L>=4080){L=255}else{L>>=4}if(az<16){az=0}else if(az>=4080){az=255}else{az>>=4}if(J<16){J=0}else if(J>=4080){J=255}else{J>>=4}if(p<16){p=0}else if(p>=4080){p=255}else{p>>=4}if(aH<16){aH=0}else if(aH>=4080){aH=255}else{aH>>=4}n[q+m]=S;
n[q+m+8]=U;n[q+m+16]=r;n[q+m+24]=L;n[q+m+32]=az;n[q+m+40]=J;n[q+m+48]=p;n[q+m+56]=aH}}function V(E,q){var N=q.P,H=q.c,n=new Int16Array(64);
for(var j=0;j<H;j++){for(var X=0;X<N;X++){var u=A(q,j,X);K(q,u,n)}}return q.D}function G(E,q,N){if(N==null)N=q;
var H=E.length-1,n=N<q?N:q;if(q>=H){return null}var j=c(E,q);if(j>=65472&&j<=65534){return{u:null,M:j,offset:q}}var X=c(E,n);
while(!(X>=65472&&X<=65534)){if(++n>=H){return null}X=c(E,n)}return{u:j.toString(16),M:X,offset:n}}t.prototype={parse(E,q){if(q==null)q={};
var N=q.F,H=0,n=null,j=null,X,u,d=0;function Z(){var as=c(E,H);H+=2;var ar=H+as-2,U=G(E,ar,H);if(U&&U.u){ar=U.offset}var a2=E.subarray(H,ar);
H+=a2.length;return a2}function B(X){var as=Math.ceil(X.o/8/X.X),ar=Math.ceil(X.s/8/X.B);for(var r=0;
r<X.W.length;r++){ag=X.W[r];var a2=Math.ceil(Math.ceil(X.o/8)*ag.h/X.X),aP=Math.ceil(Math.ceil(X.s/8)*ag.A/X.B),a$=as*ag.h,aW=ar*ag.A,aN=64*aW*(a$+1);
ag.D=new Int16Array(aN);ag.P=a2;ag.c=aP}X.m=as;X.R=ar}var k=[],W=[],S=[],U=c(E,H);H+=2;if(U!==65496){throw new M("SOI not found")}U=c(E,H);
H+=2;markerLoop:while(U!==65497){var r,L,az;switch(U){case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var J=Z();
if(U===65504){if(J[0]===74&&J[1]===70&&J[2]===73&&J[3]===70&&J[4]===0){n={version:{d:J[5],T:J[6]},K:J[7],j:J[8]<<8|J[9],H:J[10]<<8|J[11],S:J[12],I:J[13],C:J.subarray(14,14+3*J[12]*J[13])}}}if(U===65518){if(J[0]===65&&J[1]===100&&J[2]===111&&J[3]===98&&J[4]===101){j={version:J[5]<<8|J[6],k:J[7]<<8|J[8],q:J[9]<<8|J[10],a:J[11]}}}break;
case 65499:var p=c(E,H),aH;H+=2;var v=p+H-2;while(H<v){var x=E[H++],m=new Uint16Array(64);if(x>>4===0){for(L=0;
L<64;L++){aH=$[L];m[aH]=E[H++]}}else if(x>>4===1){for(L=0;L<64;L++){aH=$[L];m[aH]=c(E,H);H+=2}}else{throw new M("DQT - invalid table spec")}k[x&15]=m}break;
case 65472:case 65473:case 65474:if(X){throw new M("Only single frame JPEGs supported")}H+=2;X={};X.G=U===65473;
X.Z=U===65474;X.precision=E[H++];var ab=c(E,H),ae,ax=0,aF=0;H+=2;X.s=N||ab;X.o=c(E,H);H+=2;X.W=[];X._={};
var aU=E[H++];for(r=0;r<aU;r++){ae=E[H];var aK=E[H+1]>>4,aS=E[H+1]&15;if(ax<aK){ax=aK}if(aF<aS){aF=aS}var a=E[H+2];
az=X.W.push({h:aK,A:aS,L:a,$:null});X._[ae]=az-1;H+=3}X.X=ax;X.B=aF;B(X);break;case 65476:var aa=c(E,H);
H+=2;for(r=2;r<aa;){var ap=E[H++],w=new Uint8Array(16),b8=0;for(L=0;L<16;L++,H++){b8+=w[L]=E[H]}var aI=new Uint8Array(b8);
for(L=0;L<b8;L++,H++){aI[L]=E[H]}r+=17+b8;(ap>>4===0?S:W)[ap&15]=z(w,aI)}break;case 65501:H+=2;u=c(E,H);
H+=2;break;case 65498:var aq=++d===1&&!N,ag;H+=2;var aQ=E[H++],af=[];for(r=0;r<aQ;r++){var b3=E[H++],a5=X._[b3];
ag=X.W[a5];ag.index=b3;var aV=E[H++];ag.J=S[aV>>4];ag.i=W[aV&15];af.push(ag)}var a4=E[H++],aB=E[H++],aC=E[H++];
try{var aO=O(E,H,X,af,u,a4,aB,aC>>4,aC&15,aq);H+=aO}catch(ex){if(ex instanceof DNLMarkerError){return this.parse(E,{F:ex.s})}else if(ex instanceof EOIMarkerError){break markerLoop}throw ex}break;
case 65500:H+=4;break;case 65535:if(E[H]!==255){H--}break;default:var a9=G(E,H-2,H-3);if(a9&&a9.u){H=a9.offset;
break}if(H>=E.length-1){break markerLoop}throw new M("JpegImage.parse - unknown marker: "+U.toString(16))}U=c(E,H);
H+=2}this.width=X.o;this.height=X.s;this.g=n;this.b=j;this.W=[];for(r=0;r<X.W.length;r++){ag=X.W[r];
var a_=k[ag.L];if(a_){ag.$=a_}this.W.push({index:ag.index,e:V(X,ag),l:ag.h/X.X,t:ag.A/X.B,P:ag.P,c:ag.c})}this.p=this.W.length;
return undefined},Y(E,q,N){if(N==null)N=!1;var H=this.width/E,n=this.height/q,j,X,u,d,Z,B,k,W,S,U,r=0,L,az=this.W.length,J=E*q*az,p=new Uint8ClampedArray(J),aH=new Uint32Array(E),v=4294967288,x;
for(k=0;k<az;k++){j=this.W[k];X=j.l*H;u=j.t*n;r=k;L=j.e;d=j.P+1<<3;if(X!==x){for(Z=0;Z<E;Z++){W=0|Z*X;
aH[Z]=(W&v)<<3|W&7}x=X}for(B=0;B<q;B++){W=0|B*u;U=d*(W&v)|(W&7)<<3;for(Z=0;Z<E;Z++){p[r]=L[U+aH[Z]];
r+=az}}}var m=this.V;if(!N&&az===4&&!m){m=new Int32Array([-256,255,-256,255,-256,255,-256,255])}if(m){for(k=0;
k<J;){for(W=0,S=0;W<az;W++,k++,S+=2){p[k]=(p[k]*m[S]>>8)+m[S+1]}}}return p},get f(){if(this.b){return!!this.b.a}if(this.p===3){if(this.N===0){return!1}else if(this.W[0].index===82&&this.W[1].index===71&&this.W[2].index===66){return!1}return!0}if(this.N===1){return!0}return!1},z:function b0(E){var q,N,H;
for(var n=0,j=E.length;n<j;n+=3){q=E[n];N=E[n+1];H=E[n+2];E[n]=q-179.456+1.402*H;E[n+1]=q+135.459-.344*N-.714*H;
E[n+2]=q-226.816+1.772*N}return E},O:function y(E){var q,N,H,n,j=0;for(var X=0,u=E.length;X<u;X+=4){q=E[X];
N=E[X+1];H=E[X+2];n=E[X+3];E[j++]=-122.67195406894+N*(-660635669420364e-19*N+.000437130475926232*H-54080610064599e-18*q+.00048449797120281*n-.154362151871126)+H*(-.000957964378445773*H+.000817076911346625*q-.00477271405408747*n+1.53380253221734)+q*(.000961250184130688*q-.00266257332283933*n+.48357088451265)+n*(-.000336197177618394*n+.484791561490776);
E[j++]=107.268039397724+N*(219927104525741e-19*N-.000640992018297945*H+.000659397001245577*q+.000426105652938837*n-.176491792462875)+H*(-.000778269941513683*H+.00130872261408275*q+.000770482631801132*n-.151051492775562)+q*(.00126935368114843*q-.00265090189010898*n+.25802910206845)+n*(-.000318913117588328*n-.213742400323665);
E[j++]=-20.810012546947+N*(-.000570115196973677*N-263409051004589e-19*H+.0020741088115012*q-.00288260236853442*n+.814272968359295)+H*(-153496057440975e-19*H-.000132689043961446*q+.000560833691242812*n-.195152027534049)+q*(.00174418132927582*q-.00255243321439347*n+.116935020465145)+n*(-.000343531996510555*n+.24165260232407)}return E.subarray(0,j)},r:function s(E){var q,N,H;
for(var n=0,j=E.length;n<j;n+=4){q=E[n];N=E[n+1];H=E[n+2];E[n]=434.456-q-1.402*H;E[n+1]=119.541-q+.344*N+.714*H;
E[n+2]=481.816-q-1.772*N}return E},U:function D(E){var q,N,H,n,j=0;for(var X=0,u=E.length;X<u;X+=4){q=E[X];
N=E[X+1];H=E[X+2];n=E[X+3];E[j++]=255+q*(-6747147073602441e-20*q+.0008379262121013727*N+.0002894718188643294*H+.003264231057537806*n-1.1185611867203937)+N*(26374107616089404e-21*N-8626949158638572e-20*H-.0002748769067499491*n-.02155688794978967)+H*(-3878099212869363e-20*H-.0003267808279485286*n+.0686742238595345)-n*(.0003361971776183937*n+.7430659151342254);
E[j++]=255+q*(.00013596372813588848*q+.000924537132573585*N+.00010567359618683593*H+.0004791864687436512*n-.3109689587515875)+N*(-.00023545346108370344*N+.0002702845253534714*H+.0020200308977307156*n-.7488052167015494)+H*(6834815998235662e-20*H+.00015168452363460973*n-.09751927774728933)-n*(.0003189131175883281*n+.7364883807733168);
E[j++]=255+q*(13598650411385308e-21*q+.00012423956175490851*N+.0004751985097583589*H-36729317476630424e-22*n-.05562186980264034)+N*(.00016141380598724676*N+.0009692239130725186*H+.0007782692450036253*n-.44015232367526463)+H*(5.068882914068769e-7*H+.0017778369011375071*n-.7591454649749609)-n*(.0003435319965105553*n+.7063770186160144)}return E.subarray(0,j)},getData:function(E){var q=E.width,N=E.height,H=E.forceRGB,n=E.isSourcePDF;
if(this.p>4){throw new M("Unsupported color mode")}var j=this.Y(q,N,n);if(this.p===1&&H){var X=j.length,u=new Uint8ClampedArray(X*3),d=0;
for(var Z=0;Z<X;Z++){var B=j[Z];u[d++]=B;u[d++]=B;u[d++]=B}return u}else if(this.p===3&&this.f){return this.z(j)}else if(this.p===4){if(this.f){if(H){return this.O(j)}return this.r(j)}else if(H){return this.U(j)}}return j}};
return t}();function P($,R){return $[R]<<24>>24}function c($,R){return $[R]<<8|$[R+1]}function I($,R){return($[R]<<24|$[R+1]<<16|$[R+2]<<8|$[R+3])>>>0}_.JpegDecoder=t}());
_.encodeImage=function(M,t,Y,h){var c={t256:[t],t257:[Y],t258:[8,8,8,8],t259:[1],t262:[2],t273:[1e3],t277:[4],t278:[Y],t279:[t*Y*4],t282:[[72,1]],t283:[[72,1]],t284:[1],t286:[[0,1]],t287:[[0,1]],t296:[1],t305:["Photopea (UTIF.js)"],t338:[1]};
if(h)for(var I in h)c[I]=h[I];var $=new Uint8Array(_.encode([c])),R=new Uint8Array(M),Q=new Uint8Array(1e3+t*Y*4);
for(var I=0;I<$.length;I++)Q[I]=$[I];for(var I=0;I<R.length;I++)Q[1e3+I]=R[I];return Q.buffer};_.encode=function(M){var t=!1,Y=new Uint8Array(2e4),h=4,P=t?_._binLE:_._binBE,c=8;
Y[0]=Y[1]=t?73:77;P.writeUshort(Y,2,42);P.writeUint(Y,h,c);h+=4;for(var I=0;I<M.length;I++){var $=_._writeIFD(P,_._types.basic,Y,c,M[I]);
c=$[1];if(I<M.length-1){if((c&3)!=0)c+=4-(c&3);P.writeUint(Y,$[0],c)}}return Y.slice(0,c).buffer};_.decode=function(M,t){if(t==null)t={parseMN:!0,debug:!1};
var Y=new Uint8Array(M),h=0,P=_._binBE.readASCII(Y,h,2);h+=2;var c=P=="II"?_._binLE:_._binBE,I=c.readUshort(Y,h);
h+=2;var $=c.readUint(Y,h);h+=4;var R=[];while(!0){var Q=_._readIFD(c,Y,$,R,0,t);$=c.readUint(Y,Q);if($==0||Q==0)break}return R};
_.decodeImage=function(M,t,Y){if(t.data)return;var h=new Uint8Array(M),P=_._binBE.readASCII(h,0,2),$,o=0;
if(t.t256==null)return;t.isLE=P=="II";t.width=t.t256[0];t.height=t.t257[0];var c=t.t259?t.t259[0]:1,I=t.t266?t.t266[0]:1;
if(t.t284&&t.t284[0]==2)av("PlanarConfiguration 2 should not be used!");if(t.t258)$=Math.min(32,t.t258[0])*t.t258.length;
else $=t.t277?t.t277[0]:1;if(c==1&&t.t279!=null&&t.t278&&t.t262[0]==32803){$=Math.round(t.t279[0]*8/(t.width*t.t278[0]))}var R=Math.ceil(t.width*$/8)*8,Q=t.t273;
if(Q==null)Q=t.t324;var l=t.t279;if(c==1&&Q.length==1)l=[t.height*(R>>>3)];if(l==null)l=t.t325;var e=new Uint8Array(t.height*(R>>>3));
if(t.t322!=null){var b=t.t322[0],C=t.t323[0],T=Math.floor((t.width+b-1)/b),f=Math.floor((t.height+C-1)/C),i=new Uint8Array(Math.ceil(b*C*$/8)|0);
for(var z=0;z<f;z++)for(var A=0;A<T;A++){var V=z*T+A;for(var G=0;G<i.length;G++)i[G]=0;_.decode._decompress(t,Y,h,Q[V],l[V],c,i,0,I);
if(c==6)e=i;else _._copyTile(i,Math.ceil(b*$/8)|0,C,e,Math.ceil(t.width*$/8)|0,t.height,Math.ceil(A*b*$/8)|0,z*C)}o=e.length*8}else{var b0=t.t278?t.t278[0]:t.height;
b0=Math.min(b0,t.height);for(var V=0;V<Q.length;V++){_.decode._decompress(t,Y,h,Q[V],l[V],c,e,Math.ceil(o/8)|0,I);
o+=R*b0}o=Math.min(o,e.length*8)}t.data=new Uint8Array(e.buffer,0,Math.ceil(o/8)|0)};_.decode._decompress=function(M,t,Y,h,P,c,I,$,R){if(!1){}else if(c==1)for(var Q=0;
Q<P;Q++)I[$+Q]=Y[h+Q];else if(c==3)_.decode._decodeG3(Y,h,P,I,$,M.width,R,M.t292?(M.t292[0]&1)==1:!1);
else if(c==4)_.decode._decodeG4(Y,h,P,I,$,M.width,R);else if(c==5)_.decode._decodeLZW(Y,h,P,I,$,8);else if(c==6)_.decode._decodeOldJPEG(M,Y,h,P,I,$);
else if(c==7||c==34892)_.decode._decodeNewJPEG(M,Y,h,P,I,$);else if(c==8||c==32946){var l=new Uint8Array(Y.buffer,h,P),e=b5.inflate(l);
for(var o=0;o<e.length;o++)I[$+o]=e[o]}else if(c==9)_.decode._decodeVC5(Y,h,P,I,$);else if(c==32767)_.decode._decodeARW(M,Y,h,P,I,$);
else if(c==32773)_.decode._decodePackBits(Y,h,P,I,$);else if(c==32809)_.decode._decodeThunder(Y,h,P,I,$);
else if(c==34713)_.decode._decodeNikon(M,t,Y,h,P,I,$);else av("Unknown compression",c);var b=M.t258?Math.min(32,M.t258[0]):1,C=M.t277?M.t277[0]:1,T=b*C>>>3,f=M.t278?M.t278[0]:M.height,i=Math.ceil(b*C*M.width/8);
if(b==16&&!M.isLE&&M.t33422==null)for(var z=0;z<f;z++){var A=$+z*i;for(var O=1;O<i;O+=2){var V=I[A+O];
I[A+O]=I[A+O-1];I[A+O-1]=V}}if(M.t317&&M.t317[0]==2){for(var z=0;z<f;z++){var G=$+z*i;if(b==16)for(var Q=T;
Q<i;Q+=2){var b0=(I[G+Q+1]<<8|I[G+Q])+(I[G+Q-T+1]<<8|I[G+Q-T]);I[G+Q]=b0&255;I[G+Q+1]=b0>>>8&255}else if(C==3)for(var Q=3;
Q<i;Q+=3){I[G+Q]=I[G+Q]+I[G+Q-3]&255;I[G+Q+1]=I[G+Q+1]+I[G+Q-2]&255;I[G+Q+2]=I[G+Q+2]+I[G+Q-1]&255}else for(var Q=T;
Q<i;Q++)I[G+Q]=I[G+Q]+I[G+Q-T]&255}}};_.decode._decodeVC5=_.decode._decodeVC5=function(){var M=[1,0,1,0,2,2,1,1,3,7,1,2,5,25,1,3,6,48,1,4,6,54,1,5,7,111,1,8,7,99,1,6,7,105,12,0,7,107,1,7,8,209,20,0,8,212,1,9,8,220,1,10,9,393,1,11,9,394,32,0,9,416,1,12,9,427,1,13,10,887,1,18,10,784,1,14,10,790,1,15,10,835,60,0,10,852,1,16,10,885,1,17,11,1571,1,19,11,1668,1,20,11,1669,100,0,11,1707,1,21,11,1772,1,22,12,3547,1,29,12,3164,1,24,12,3166,1,25,12,3140,1,23,12,3413,1,26,12,3537,1,27,12,3539,1,28,13,7093,1,35,13,6283,1,30,13,6331,1,31,13,6335,180,0,13,6824,1,32,13,7072,1,33,13,7077,320,0,13,7076,1,34,14,12565,1,36,14,12661,1,37,14,12669,1,38,14,13651,1,39,14,14184,1,40,15,28295,1,46,15,28371,1,47,15,25320,1,42,15,25336,1,43,15,25128,1,41,15,27300,1,44,15,28293,1,45,16,50259,1,48,16,50643,1,49,16,50675,1,50,16,56740,1,53,16,56584,1,51,16,56588,1,52,17,113483,1,61,17,113482,1,60,17,101285,1,55,17,101349,1,56,17,109205,1,57,17,109207,1,58,17,100516,1,54,17,113171,1,59,18,202568,1,62,18,202696,1,63,18,218408,1,64,18,218412,1,65,18,226340,1,66,18,226356,1,67,18,226358,1,68,19,402068,1,69,19,405138,1,70,19,405394,1,71,19,436818,1,72,19,436826,1,73,19,452714,1,75,19,452718,1,76,19,452682,1,74,20,804138,1,77,20,810279,1,78,20,810790,1,79,20,873638,1,80,20,873654,1,81,20,905366,1,82,20,905430,1,83,20,905438,1,84,21,1608278,1,85,21,1620557,1,86,21,1621582,1,87,21,1621583,1,88,21,1747310,1,89,21,1810734,1,90,21,1810735,1,91,21,1810863,1,92,21,1810879,1,93,22,3621725,1,99,22,3621757,1,100,22,3241112,1,94,22,3494556,1,95,22,3494557,1,96,22,3494622,1,97,22,3494623,1,98,23,6482227,1,102,23,6433117,1,101,23,6989117,1,103,23,6989119,1,105,23,6989118,1,104,23,7243449,1,106,23,7243512,1,107,24,13978233,1,111,24,12964453,1,109,24,12866232,1,108,24,14486897,1,113,24,13978232,1,110,24,14486896,1,112,24,14487026,1,114,24,14487027,1,115,25,25732598,1,225,25,25732597,1,189,25,25732596,1,188,25,25732595,1,203,25,25732594,1,202,25,25732593,1,197,25,25732592,1,207,25,25732591,1,169,25,25732590,1,223,25,25732589,1,159,25,25732522,1,235,25,25732579,1,152,25,25732575,1,192,25,25732489,1,179,25,25732573,1,201,25,25732472,1,172,25,25732576,1,149,25,25732488,1,178,25,25732566,1,120,25,25732571,1,219,25,25732577,1,150,25,25732487,1,127,25,25732506,1,211,25,25732548,1,125,25,25732588,1,158,25,25732486,1,247,25,25732467,1,238,25,25732508,1,163,25,25732552,1,228,25,25732603,1,183,25,25732513,1,217,25,25732587,1,168,25,25732520,1,122,25,25732484,1,128,25,25732562,1,249,25,25732505,1,187,25,25732504,1,186,25,25732483,1,136,25,25928905,1,181,25,25732560,1,255,25,25732500,1,230,25,25732482,1,135,25,25732555,1,233,25,25732568,1,222,25,25732583,1,145,25,25732481,1,134,25,25732586,1,167,25,25732521,1,248,25,25732518,1,209,25,25732480,1,243,25,25732512,1,216,25,25732509,1,164,25,25732547,1,140,25,25732479,1,157,25,25732544,1,239,25,25732574,1,191,25,25732564,1,251,25,25732478,1,156,25,25732546,1,139,25,25732498,1,242,25,25732557,1,133,25,25732477,1,162,25,25732515,1,213,25,25732584,1,165,25,25732514,1,212,25,25732476,1,227,25,25732494,1,198,25,25732531,1,236,25,25732530,1,234,25,25732529,1,117,25,25732528,1,215,25,25732527,1,124,25,25732526,1,123,25,25732525,1,254,25,25732524,1,253,25,25732523,1,148,25,25732570,1,218,25,25732580,1,146,25,25732581,1,147,25,25732569,1,224,25,25732533,1,143,25,25732540,1,184,25,25732541,1,185,25,25732585,1,166,25,25732556,1,132,25,25732485,1,129,25,25732563,1,250,25,25732578,1,151,25,25732501,1,119,25,25732502,1,193,25,25732536,1,176,25,25732496,1,245,25,25732553,1,229,25,25732516,1,206,25,25732582,1,144,25,25732517,1,208,25,25732558,1,137,25,25732543,1,241,25,25732466,1,237,25,25732507,1,190,25,25732542,1,240,25,25732551,1,131,25,25732554,1,232,25,25732565,1,252,25,25732475,1,171,25,25732493,1,205,25,25732492,1,204,25,25732491,1,118,25,25732490,1,214,25,25928904,1,180,25,25732549,1,126,25,25732602,1,182,25,25732539,1,175,25,25732545,1,141,25,25732559,1,138,25,25732537,1,177,25,25732534,1,153,25,25732503,1,194,25,25732606,1,160,25,25732567,1,121,25,25732538,1,174,25,25732497,1,246,25,25732550,1,130,25,25732572,1,200,25,25732474,1,170,25,25732511,1,221,25,25732601,1,196,25,25732532,1,142,25,25732519,1,210,25,25732495,1,199,25,25732605,1,155,25,25732535,1,154,25,25732499,1,244,25,25732510,1,220,25,25732600,1,195,25,25732607,1,161,25,25732604,1,231,25,25732473,1,173,25,25732599,1,226,26,51465122,1,116,26,51465123,0,1],Y,h,P,c=[3,3,3,3,2,2,2,1,1,1],I=24576,$=16384,R=8192,Q=$|R;
function l(K){var V=K[1],y=K[0][V>>>3]>>>7-(V&7)&1;K[1]++;return y}function e(K,V){if(Y==null){Y={};
for(var y=0;y<M.length;y+=4)Y[M[y+1]]=M.slice(y,y+4)}var D=l(K),E=Y[D];while(E==null){D=D<<1|l(K);E=Y[D]}var q=E[3];
if(q!=0)q=l(K)==0?q:-q;V[0]=E[2];V[1]=q}function o(K,V){for(var y=0;y<V;y++){if((K&1)==1)K++;K=K>>>1}return K}function b(K,V){return K>>V}function C(K,V,y,D,E,q){V[y]=b(b(11*K[E]-4*K[E+q]+K[E+q+q]+4,3)+K[D],1);
V[y+q]=b(b(5*K[E]+4*K[E+q]-K[E+q+q]+4,3)-K[D],1)}function T(K,V,y,D,E,q){var H=K[E-q]-K[E+q],n=K[E],u=K[D];
V[y]=b(b(H+4,3)+n+u,1);V[y+q]=b(b(-H+4,3)+n-u,1)}function f(K,V,y,D,E,q){V[y]=b(b(5*K[E]+4*K[E-q]-K[E-q-q]+4,3)+K[D],1);
V[y+q]=b(b(11*K[E]-4*K[E-q]+K[E-q-q]+4,3)-K[D],1)}function z(K){K=K<0?0:K>4095?4095:K;K=P[K]>>>2;return K}function A(K,V,y,D,E){D=new Uint16Array(D.buffer);
var q=Date.now(),H=_._binBE,n=V+y,u,k,F,S,a3,r,an,L,az,ah,aR,at,J,ak,p,ad,a8,aL;V+=4;while(V<n){var b4=H.readShort(K,V),x=H.readUshort(K,V+2);
V+=4;if(b4==12)u=x;else if(b4==20)k=x;else if(b4==21)F=x;else if(b4==48)S=x;else if(b4==53)a3=x;else if(b4==35)r=x;
else if(b4==62)an=x;else if(b4==101)L=x;else if(b4==109)az=x;else if(b4==84)ah=x;else if(b4==106)aR=x;
else if(b4==107)at=x;else if(b4==108)J=x;else if(b4==102)ak=x;else if(b4==104)p=x;else if(b4==105)ad=x;
else{var m=b4<0?-b4:b4,aD=m&65280,aE=0;if(m&Q){if(m&R){aE=x&65535;aE+=(m&255)<<16}else{aE=x&65535}}if((m&I)==I){if(a8==null){a8=[];
for(var ay=0;ay<4;ay++)a8[ay]=new Int16Array((k>>>1)*(F>>>1));aL=new Int16Array((k>>>1)*(F>>>1));h=new Int16Array(1024);
for(var ay=0;ay<1024;ay++){var aM=ay-512,a6=Math.abs(aM),u=Math.floor(768*a6*a6*a6/(255*255*255))+a6;
h[ay]=Math.sign(aM)*u}P=new Uint16Array(4096);var ab=(1<<16)-1;for(var ay=0;ay<4096;ay++){var ae=ay,aT=ab*(Math.pow(113,ae/4095)-1)/112;
P[ay]=Math.min(aT,ab)}}var b1=a8[an],ax=o(k,1+c[S]),aU=o(F,1+c[S]);if(S==0){for(var a=0;a<aU;a++)for(var w=0;
w<ax;w++){var b8=V+(a*ax+w)*2;b1[a*(k>>>1)+w]=K[b8]<<8|K[b8+1]}}else{var aI=[K,V*8],aq=[],aQ=0,af=ax*aU,b3=[0,0],a5=0,x=0;
while(aQ<af){e(aI,b3);a5=b3[0];x=b3[1];while(a5>0){aq[aQ++]=x;a5--}}var aV=(S-1)%3,a4=aV!=1?ax:0,aB=aV!=0?aU:0;
for(var a=0;a<aU;a++){var aC=(a+aB)*(k>>>1)+a4,aO=a*ax;for(var w=0;w<ax;w++)b1[aC+w]=h[aq[aO+w]+512]*a3}if(aV==2){var p=k>>>1,a9=ax*2,a_=aU*2;
for(var a=0;a<aU;a++){for(var w=0;w<a9;w++){var ay=a*2*p+w,as=a*p+w,ar=aU*p+as;if(a==0)C(b1,aL,ay,ar,as,p);
else if(a==aU-1)f(b1,aL,ay,ar,as,p);else T(b1,aL,ay,ar,as,p)}}var a2=b1;b1=aL;aL=a2;for(var a=0;a<a_;
a++){for(var w=0;w<ax;w++){var ay=a*p+2*w,as=a*p+w,ar=ax+as;if(w==0)C(b1,aL,ay,ar,as,1);else if(w==ax-1)f(b1,aL,ay,ar,as,1);
else T(b1,aL,ay,ar,as,1)}}var a2=b1;b1=aL;aL=a2;var aP=[],a$=2-~~((S-1)/3);for(var aW=0;aW<3;aW++)aP[aW]=az>>14-aW*2&3;
var aN=aP[a$];if(aN!=0)for(var a=0;a<a_;a++)for(var w=0;w<a9;w++){var ay=a*p+w;b1[ay]=b1[ay]<<aN}}}if(S==9&&an==3){var au=a8[0],aZ=a8[1],aA=a8[2],ac=a8[3];
for(var a=0;a<F;a+=2)for(var w=0;w<k;w+=2){var a1=a*k+w,b8=(a>>>1)*(k>>>1)+(w>>>1),b6=au[b8],aY=aZ[b8]-2048,aw=aA[b8]-2048,aJ=ac[b8]-2048,aG=(aY<<1)+b6,aX=(aw<<1)+b6,b7=b6+aJ,b2=b6-aJ;
D[a1]=z(aG);D[a1+1]=z(b7);D[a1+k]=z(b2);D[a1+k+1]=z(aX)}}V+=aE*4}else if(m==16388){V+=aE*4}else if(aD==8192||aD==8448||aD==9216){}else throw m.toString(16)}}console.log(Date.now()-q)}return A}();
_.decode._ljpeg_diff=function(M,t,Y){var h=_.decode._getbithuff,P,c;P=h(M,t,Y[0],Y);c=h(M,t,P,0);if((c&1<<P-1)==0)c-=(1<<P)-1;
return c};_.decode._decodeARW=function(M,t,Y,h,P,c){var I=M.t256[0],$=M.t257[0],R=M.t258[0],Q=M.isLE?_._binLE:_._binBE,l=I*$==h||I*$*1.5==h,z,i,D,E,q,N,H,n,j,C,X;
if(!l){$+=8;var e=[Y,0,0,0],o=new Uint16Array(32770),b=[3857,3856,3599,3342,3085,2828,2571,2314,2057,1800,1543,1286,1029,772,771,768,514,513],C,T,f,i,z,A=0,O=_.decode._ljpeg_diff;
o[0]=15;for(f=C=0;C<18;C++){var K=32768>>>(b[C]>>>8);for(var T=0;T<K;T++)o[++f]=b[C]}for(i=I;i--;)for(z=0;
z<$+1;z+=2){if(z==$)z=1;A+=O(t,e,o);if(z<$){var V=A&4095;_.decode._putsF(P,(z*I+i)*R,V<<16-R)}}return}if(I*$*1.5==h){for(var C=0;
C<h;C+=3){var G=t[Y+C+0],b0=t[Y+C+1],y=t[Y+C+2];P[c+C]=b0<<4|G>>>4;P[c+C+1]=G<<4|y>>>4;P[c+C+2]=y<<4|b0>>>4}return}var s=new Uint16Array(16),u=new Uint8Array(I+1);
for(z=0;z<$;z++){for(var d=0;d<I;d++)u[d]=t[Y++];for(X=0,i=0;i<I-30;X+=16){E=2047&(D=Q.readUint(u,X));
q=2047&D>>>11;N=15&D>>>22;H=15&D>>>26;for(n=0;n<4&&128<<n<=E-q;n++);for(j=30,C=0;C<16;C++)if(C==N)s[C]=E;
else if(C==H)s[C]=q;else{s[C]=((Q.readUshort(u,X+(j>>3))>>>(j&7)&127)<<n)+q;if(s[C]>2047)s[C]=2047;j+=7}for(C=0;
C<16;C++,i+=2){var V=s[C]<<1;_.decode._putsF(P,(z*I+i)*R,V<<16-R)}i-=i&1?1:31}}};_.decode._decodeNikon=function(M,t,Y,h,P,c,I){var $=[[0,0,1,5,1,1,1,1,1,1,2,0,0,0,0,0,0,5,4,3,6,2,7,1,0,8,9,11,10,12],[0,0,1,5,1,1,1,1,1,1,2,0,0,0,0,0,0,57,90,56,39,22,5,4,3,2,1,0,11,12,12],[0,0,1,4,2,3,1,2,0,0,0,0,0,0,0,0,0,5,4,6,3,7,2,8,1,9,0,10,11,12],[0,0,1,4,3,1,1,1,1,1,2,0,0,0,0,0,0,5,6,4,7,8,3,9,2,1,0,10,11,12,13,14],[0,0,1,5,1,1,1,1,1,1,1,2,0,0,0,0,0,8,92,75,58,41,7,6,5,4,3,2,1,0,13,14],[0,0,1,4,2,2,3,1,2,0,0,0,0,0,0,0,0,7,6,8,5,9,4,10,3,11,12,2,0,1,13,14]],R=M.t256[0],Q=M.t257[0],l=M.t258[0],e=0,o=0,b=_.decode._make_decoder,C=_.decode._getbithuff,T=t[0].exifIFD.makerNote,f=T.t150?T.t150:T.t140,i=0,z=f[i++],A=f[i++],y=0,V,D,E,q,N,H,n=0;
if(z==73||A==88)i+=2110;if(z==70)e=2;if(l==14)e+=3;var O=[[0,0],[0,0]],K=M.isLE?_._binLE:_._binBE;for(var V=0;
V<2;V++)for(var G=0;G<2;G++){O[V][G]=K.readShort(f,i);i+=2}var b0=1<<l&32767,s=K.readShort(f,i);i+=2;
if(s>1)y=Math.floor(b0/(s-1));if(z==68&&A==32&&y>0)o=K.readShort(f,562);var j=[0,0],X=b($[e]),u=[h,0,0,0];
for(n=D=0;D<Q;D++){if(o&&D==o){X=b($[e+1])}for(E=0;E<R;E++){V=C(Y,u,X[0],X);q=V&15;N=V>>>4;H=(C(Y,u,q-N,0)<<1)+1<<N>>>1;
if((H&1<<q-1)==0)H-=(1<<q)-(N==0?1:0);if(E<2)j[E]=O[D&1][E]+=H;else j[E&1]+=H;var d=Math.min(Math.max(j[E&1],0),(1<<l)-1),Z=(D*R+E)*l;
_.decode._putsF(c,Z,d<<16-l)}}};_.decode._putsF=function(M,t,Y){Y=Y<<8-(t&7);var h=t>>>3;M[h]|=Y>>>16;
M[h+1]|=Y>>>8;M[h+2]|=Y};_.decode._getbithuff=function(M,t,Y,h){var P=0,c=_.decode._get_byte,I,$=t[0],R=t[1],Q=t[2],l=t[3];
if(Y==0||Q<0)return 0;while(!l&&Q<Y&&(I=M[$++])!=-1&&!(l=P&&I==255&&M[$++])){R=(R<<8)+I;Q+=8}I=R<<32-Q>>>32-Y;
if(h){Q-=h[I+1]>>>8;I=h[I+1]&255}else Q-=Y;if(Q<0)throw"e";t[0]=$;t[1]=R;t[2]=Q;t[3]=l;return I};_.decode._make_decoder=function(M){var t,Y,h,c,I,$=[],R=17;
for(t=16;t!=0&&!M[t];t--);$[0]=t;for(h=Y=1;Y<=t;Y++)for(c=0;c<M[Y];c++,++R)for(I=0;I<1<<t-Y;I++)if(h<=1<<t)$[h++]=Y<<8|M[R];
return $};_.decode._decodeNewJPEG=function(M,t,Y,h,P,c){h=Math.min(h,t.length-Y);var I=M.t347,$=I?I.length:0,R=new Uint8Array($+h);
if(I){var Q=216,l=217,e=0;for(var o=0;o<$-1;o++){if(I[o]==255&&I[o+1]==l)break;R[e++]=I[o]}var b=t[Y],C=t[Y+1];
if(b!=255||C!=Q){R[e++]=b;R[e++]=C}for(var o=2;o<h;o++)R[e++]=t[Y+o]}else for(var o=0;o<h;o++)R[o]=t[Y+o];
if(M.t262[0]==32803||M.t259[0]==7&&M.t262[0]==34892){var T=M.t258[0],f=_.LosslessJpegDecode(R),i=f.length;
if(!1){}else if(T==16){if(M.isLE)for(var o=0;o<i;o++){P[c+(o<<1)]=f[o]&255;P[c+(o<<1)+1]=f[o]>>>8}else for(var o=0;
o<i;o++){P[c+(o<<1)]=f[o]>>>8;P[c+(o<<1)+1]=f[o]&255}}else if(T==14||T==12){var z=16-T;for(var o=0;o<i;
o++)_.decode._putsF(P,o*T,f[o]<<z)}else if(T==8){for(var o=0;o<i;o++)P[c+o]=f[o]}else throw new Error("unsupported bit depth "+T)}else{var A=new _.JpegDecoder;
A.parse(R);var O=A.getData({width:A.width,height:A.height,forceRGB:!0,isSourcePDF:!1});for(var o=0;o<O.length;
o++)P[c+o]=O[o]}if(M.t262[0]==6)M.t262[0]=2};_.decode._decodeOldJPEGInit=function(M,t,Y,h){var P=216,c=217,I=219,$=196,R=221,Q=192,l=218,e=0,o=0,b,C,T=!1,f,i,z,A=M.t513,O=A?A[0]:0,K=M.t514,V=K?K[0]:0,G=M.t324||M.t273||A,b0=M.t530,y=0,s=0,D=M.t277?M.t277[0]:1,E=M.t515;
if(G){o=G[0];T=G.length>1}if(!T){if(t[Y]==255&&t[Y+1]==P)return{jpegOffset:Y};if(A!=null){if(t[Y+O]==255&&t[Y+O+1]==P)e=Y+O;
else av("JPEGInterchangeFormat does not point to SOI");if(K==null)av("JPEGInterchangeFormatLength field is missing");
else if(O>=o||O+V<=o)av("JPEGInterchangeFormatLength field value is invalid");if(e!=null)return{jpegOffset:e}}}if(b0!=null){y=b0[0];
s=b0[1]}if(A!=null)if(K!=null)if(V>=2&&O+V<=o){if(t[Y+O+V-2]==255&&t[Y+O+V-1]==P)b=new Uint8Array(V-2);
else b=new Uint8Array(V);for(f=0;f<b.length;f++)b[f]=t[Y+O+f];av("Incorrect JPEG interchange format: using JPEGInterchangeFormat offset to derive tables")}else av("JPEGInterchangeFormat+JPEGInterchangeFormatLength > offset to first strip or tile");
if(b==null){var q=0,N=[];N[q++]=255;N[q++]=P;var H=M.t519;if(H==null)throw new Error("JPEGQTables tag is missing");
for(f=0;f<H.length;f++){N[q++]=255;N[q++]=I;N[q++]=0;N[q++]=67;N[q++]=f;for(i=0;i<64;i++)N[q++]=t[Y+H[f]+i]}for(z=0;
z<2;z++){var n=M[z==0?"t520":"t521"];if(n==null)throw new Error((z==0?"JPEGDCTables":"JPEGACTables")+" tag is missing");
for(f=0;f<n.length;f++){N[q++]=255;N[q++]=$;var j=19;for(i=0;i<16;i++)j+=t[Y+n[f]+i];N[q++]=j>>>8;N[q++]=j&255;
N[q++]=f|z<<4;for(i=0;i<16;i++)N[q++]=t[Y+n[f]+i];for(i=0;i<j;i++)N[q++]=t[Y+n[f]+16+i]}}N[q++]=255;
N[q++]=Q;N[q++]=0;N[q++]=8+3*D;N[q++]=8;N[q++]=M.height>>>8&255;N[q++]=M.height&255;N[q++]=M.width>>>8&255;
N[q++]=M.width&255;N[q++]=D;if(D==1){N[q++]=1;N[q++]=17;N[q++]=0}else for(f=0;f<3;f++){N[q++]=f+1;N[q++]=f!=0?17:(y&15)<<4|s&15;
N[q++]=f}if(E!=null&&E[0]!=0){N[q++]=255;N[q++]=R;N[q++]=0;N[q++]=4;N[q++]=E[0]>>>8&255;N[q++]=E[0]&255}b=new Uint8Array(N)}var X=-1;
f=0;while(f<b.length-1){if(b[f]==255&&b[f+1]==Q){X=f;break}f++}if(X==-1){var u=new Uint8Array(b.length+10+3*D);
u.set(b);var d=b.length;X=b.length;b=u;b[d++]=255;b[d++]=Q;b[d++]=0;b[d++]=8+3*D;b[d++]=8;b[d++]=M.height>>>8&255;
b[d++]=M.height&255;b[d++]=M.width>>>8&255;b[d++]=M.width&255;b[d++]=D;if(D==1){b[d++]=1;b[d++]=17;b[d++]=0}else for(f=0;
f<3;f++){b[d++]=f+1;b[d++]=f!=0?17:(y&15)<<4|s&15;b[d++]=f}}if(t[o]==255&&t[o+1]==l){var Z=t[o+2]<<8|t[o+3];
C=new Uint8Array(Z+2);C[0]=t[o];C[1]=t[o+1];C[2]=t[o+2];C[3]=t[o+3];for(f=0;f<Z-2;f++)C[f+4]=t[o+f+4]}else{C=new Uint8Array(2+6+2*D);
var B=0;C[B++]=255;C[B++]=l;C[B++]=0;C[B++]=6+2*D;C[B++]=D;if(D==1){C[B++]=1;C[B++]=0}else for(f=0;f<3;
f++){C[B++]=f+1;C[B++]=f<<4|f}C[B++]=0;C[B++]=63;C[B++]=0}return{jpegOffset:Y,tables:b,sosMarker:C,sofPosition:X}};
_.decode._decodeOldJPEG=function(M,t,Y,h,P,c){var I,$,R,Q,l,e=_.decode._decodeOldJPEGInit(M,t,Y,h);if(e.jpegOffset!=null){$=Y+h-e.jpegOffset;
Q=new Uint8Array($);for(I=0;I<$;I++)Q[I]=t[e.jpegOffset+I]}else{R=e.tables.length;Q=new Uint8Array(R+e.sosMarker.length+h+2);
Q.set(e.tables);l=R;Q[e.sofPosition+5]=M.height>>>8&255;Q[e.sofPosition+6]=M.height&255;Q[e.sofPosition+7]=M.width>>>8&255;
Q[e.sofPosition+8]=M.width&255;if(t[Y]!=255||t[Y+1]!=SOS){Q.set(e.sosMarker,l);l+=sosMarker.length}for(I=0;
I<h;I++)Q[l++]=t[Y+I];Q[l++]=255;Q[l++]=EOI}var o=new _.JpegDecoder;o.parse(Q);var b=o.getData({width:o.width,height:o.height,forceRGB:!0,isSourcePDF:!1});
for(var I=0;I<b.length;I++)P[c+I]=b[I];if(M.t262&&M.t262[0]==6)M.t262[0]=2};_.decode._decodePackBits=function(M,t,Y,h,P){var c=new Int8Array(M.buffer),I=new Int8Array(h.buffer),$=t+Y;
while(t<$){var R=c[t];t++;if(R>=0&&R<128)for(var Q=0;Q<R+1;Q++){I[P]=c[t];P++;t++}if(R>=-127&&R<0){for(var Q=0;
Q<-R+1;Q++){I[P]=c[t];P++}t++}}};_.decode._decodeThunder=function(M,t,Y,h,P){var c=[0,1,0,-1],I=[0,1,2,3,0,-3,-2,-1],$=t+Y,R=P*2,Q=0;
while(t<$){var l=M[t],e=l>>>6,o=l&63;t++;if(e==3){Q=o&15;h[R>>>1]|=Q<<4*(1-R&1);R++}if(e==0)for(var b=0;
b<o;b++){h[R>>>1]|=Q<<4*(1-R&1);R++}if(e==2)for(var b=0;b<2;b++){var C=o>>>3*(1-b)&7;if(C!=4){Q+=I[C];
h[R>>>1]|=Q<<4*(1-R&1);R++}}if(e==1)for(var b=0;b<3;b++){var C=o>>>2*(2-b)&3;if(C!=2){Q+=c[C];h[R>>>1]|=Q<<4*(1-R&1);
R++}}}};_.decode._dmap={"1":0,"011":1,"000011":2,"0000011":3,"010":-1,"000010":-2,"0000010":-3};_.decode._lens=function(){var M=function(R,Q,l,e){for(var o=0;
o<Q.length;o++)R[Q[o]]=l+o*e},t="00110101,000111,0111,1000,1011,1100,1110,1111,10011,10100,00111,01000,001000,000011,110100,110101,"+"101010,101011,0100111,0001100,0001000,0010111,0000011,0000100,0101000,0101011,0010011,0100100,0011000,00000010,00000011,00011010,"+"00011011,00010010,00010011,00010100,00010101,00010110,00010111,00101000,00101001,00101010,00101011,00101100,00101101,00000100,00000101,00001010,"+"00001011,01010010,01010011,01010100,01010101,00100100,00100101,01011000,01011001,01011010,01011011,01001010,01001011,00110010,00110011,00110100",Y="0000110111,010,11,10,011,0011,0010,00011,000101,000100,0000100,0000101,0000111,00000100,00000111,000011000,"+"0000010111,0000011000,0000001000,00001100111,00001101000,00001101100,00000110111,00000101000,00000010111,00000011000,000011001010,000011001011,000011001100,000011001101,000001101000,000001101001,"+"000001101010,000001101011,000011010010,000011010011,000011010100,000011010101,000011010110,000011010111,000001101100,000001101101,000011011010,000011011011,000001010100,000001010101,000001010110,000001010111,"+"000001100100,000001100101,000001010010,000001010011,000000100100,000000110111,000000111000,000000100111,000000101000,000001011000,000001011001,000000101011,000000101100,000001011010,000001100110,000001100111",h="11011,10010,010111,0110111,00110110,00110111,01100100,01100101,01101000,01100111,011001100,011001101,011010010,011010011,011010100,011010101,011010110,"+"011010111,011011000,011011001,011011010,011011011,010011000,010011001,010011010,011000,010011011",P="0000001111,000011001000,000011001001,000001011011,000000110011,000000110100,000000110101,0000001101100,0000001101101,0000001001010,0000001001011,0000001001100,"+"0000001001101,0000001110010,0000001110011,0000001110100,0000001110101,0000001110110,0000001110111,0000001010010,0000001010011,0000001010100,0000001010101,0000001011010,"+"0000001011011,0000001100100,0000001100101",c="00000001000,00000001100,00000001101,000000010010,000000010011,000000010100,000000010101,000000010110,000000010111,000000011100,000000011101,000000011110,000000011111";
t=t.split(",");Y=Y.split(",");h=h.split(",");P=P.split(",");c=c.split(",");var I={},$={};M(I,t,0,1);
M(I,h,64,64);M(I,c,1792,64);M($,Y,0,1);M($,P,64,64);M($,c,1792,64);return[I,$]}();_.decode._decodeG4=function(M,t,Y,h,P,c,I){var $=_.decode,R=t<<3,Q=0,l="",e=[],o=[],C=0,T=0,f=0,i=0,z=0,O=0,K=0,V="",G=0;
for(var b=0;b<c;b++)o.push(0);o=$._makeDiff(o);var b0=Math.ceil(c/8)*8;while(R>>>3<t+Y){i=$._findDiff(o,C+(C==0?0:1),1-O),z=$._findDiff(o,i,O);
var y=0;if(I==1)y=M[R>>>3]>>>7-(R&7)&1;if(I==2)y=M[R>>>3]>>>(R&7)&1;R++;l+=y;if(V=="H"){if($._lens[O][l]!=null){var s=$._lens[O][l];
l="";Q+=s;if(s<64){$._addNtimes(e,Q,O);C+=Q;O=1-O;Q=0;G--;if(G==0)V=""}}}else{if(l=="0001"){l="";$._addNtimes(e,z-C,O);
C=z}if(l=="001"){l="";V="H";G=2}if($._dmap[l]!=null){T=i+$._dmap[l];$._addNtimes(e,T-C,O);C=T;l="";O=1-O}}if(e.length==c&&V==""){$._writeBits(e,h,P*8+K*b0);
O=0;K++;C=0;o=$._makeDiff(e);e=[]}}};_.decode._findDiff=function(M,t,Y){for(var h=0;h<M.length;h+=2)if(M[h]>=t&&M[h+1]==Y)return M[h]};
_.decode._makeDiff=function(M){var t=[];if(M[0]==1)t.push(0,1);for(var Y=1;Y<M.length;Y++)if(M[Y-1]!=M[Y])t.push(Y,M[Y]);
t.push(M.length,0,M.length,1);return t};_.decode._decodeG3=function(M,t,Y,h,P,c,I,$){var R=_.decode,Q=t<<3,l=0,e="",o=[],b=[],T=0,f=0,i=0,z=0,O=0,K=0,G="",b0=0,y=!0;
for(var C=0;C<c;C++)o.push(0);var V=-1,s=Math.ceil(c/8)*8;while(Q>>>3<t+Y){z=R._findDiff(b,T+(T==0?0:1),1-K),O=R._findDiff(b,z,K);
var D=0;if(I==1)D=M[Q>>>3]>>>7-(Q&7)&1;if(I==2)D=M[Q>>>3]>>>(Q&7)&1;Q++;e+=D;if(y){if(R._lens[K][e]!=null){var E=R._lens[K][e];
e="";l+=E;if(E<64){R._addNtimes(o,l,K);K=1-K;l=0}}}else{if(G=="H"){if(R._lens[K][e]!=null){var E=R._lens[K][e];
e="";l+=E;if(E<64){R._addNtimes(o,l,K);T+=l;K=1-K;l=0;b0--;if(b0==0)G=""}}}else{if(e=="0001"){e="";R._addNtimes(o,O-T,K);
T=O}if(e=="001"){e="";G="H";b0=2}if(R._dmap[e]!=null){f=z+R._dmap[e];R._addNtimes(o,f-T,K);T=f;e="";
K=1-K}}}if(e.endsWith("000000000001")){if(V>=0)R._writeBits(o,h,P*8+V*s);if($){if(I==1)y=(M[Q>>>3]>>>7-(Q&7)&1)==1;
if(I==2)y=(M[Q>>>3]>>>(Q&7)&1)==1;Q++}e="";K=0;V++;T=0;b=R._makeDiff(o);o=[]}}if(o.length==c)R._writeBits(o,h,P*8+V*s)};
_.decode._addNtimes=function(M,t,Y){for(var h=0;h<t;h++)M.push(Y)};_.decode._writeBits=function(M,t,Y){for(var h=0;
h<M.length;h++)t[Y+h>>>3]|=M[h]<<7-(Y+h&7)};_.decode._decodeLZW=_.decode._decodeLZW=function(){var M,Y,h,P,c=0,I=0,$=0,R=0,Q=function(){var z=M>>>3,O=Y[z]<<16|Y[z+1]<<8|Y[z+2],K=O>>>24-(M&7)-I&(1<<I)-1;
M+=I;return K},l=new Uint32Array(4096*4),e=0,o=function(z){if(z==e)return;e=z;$=1<<z;R=$+1;for(var O=0;
O<R+1;O++){l[4*O]=l[4*O+3]=O;l[4*O+1]=65535;l[4*O+2]=1}},b=function(z){I=z+1;c=R+1},C=function(z){var O=z<<2,K=l[O+2],V=P+K-1;
while(O!=65535){h[V--]=l[O];O=l[O+1]}P+=K},T=function(z,O){var K=c<<2,V=z<<2;l[K]=l[(O<<2)+3];l[K+1]=V;
l[K+2]=l[V+2]+1;l[K+3]=l[V+3];c++;if(c+1==1<<I&&I!=12)I++},f=function(z,O,K,V,b0,y){M=O<<3;Y=z;h=V;P=b0;
var D=O+K<<3,E=0,q=0;o(y);b(y);while(M<D&&(E=Q())!=R){if(E==$){b(y);E=Q();if(E==R)break;C(E)}else{if(E<c){C(E);
T(q,E)}else{T(q,q);C(c-1)}}q=E}return P};return f}();_.tags={};_._types=function(){var M=new Array(250);
M.fill(0);M=M.concat([0,0,0,0,4,3,3,3,3,3,0,0,3,0,0,0,3,0,0,2,2,2,2,4,3,0,0,3,4,4,3,3,5,5,3,2,5,5,0,0,0,0,4,4,0,0,3,3,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,2,2,3,5,5,3,0,3,3,4,4,4,3,4,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var t={33432:2,33434:5,33437:5,34665:4,34850:3,34853:4,34855:3,34864:3,34866:4,36864:7,36867:2,36868:2,37121:7,37377:10,37378:5,37380:10,37381:5,37383:3,37384:3,37385:3,37386:5,37510:7,37520:2,37521:2,37522:2,40960:7,40961:3,40962:4,40963:4,40965:4,41486:5,41487:5,41488:3,41985:3,41986:3,41987:3,41988:5,41989:3,41990:3,41993:3,41994:3,41995:7,41996:3,42032:2,42033:2,42034:5,42036:2,42037:2,59932:7};
return{basic:{main:M,rest:t},gps:{main:[1,2,5,2,5,1,5,5,0,9],rest:{18:2,29:2}}}}();_._readIFD=function(M,t,Y,h,P,c){var I=M.readUshort(t,Y);
Y+=2;var $={};if(c.debug)av("   ".repeat(P),h.length-1,">>>----------------");for(var R=0;R<I;R++){var Q=M.readUshort(t,Y);
Y+=2;var l=M.readUshort(t,Y);Y+=2;var e=M.readUint(t,Y);Y+=4;var o=M.readUint(t,Y);Y+=4;var b=[];if(l==1||l==7){b=new Uint8Array(t.buffer,e<5?Y-4:o,e)}if(l==2){var C=e<5?Y-4:o,T=t[C],f=Math.max(0,Math.min(e-1,t.length-C));
if(T<128||f==0)b.push(M.readASCII(t,C,f));else b=new Uint8Array(t.buffer,C,f)}if(l==3){for(var i=0;i<e;
i++)b.push(M.readUshort(t,(e<3?Y-4:o)+2*i))}if(l==4||l==13){for(var i=0;i<e;i++)b.push(M.readUint(t,(e<2?Y-4:o)+4*i))}if(l==5||l==10){var z=l==5?M.readUint:M.readInt;
for(var i=0;i<e;i++)b.push([z(t,o+i*8),z(t,o+i*8+4)])}if(l==8){for(var i=0;i<e;i++)b.push(M.readShort(t,(e<3?Y-4:o)+2*i))}if(l==9){for(var i=0;
i<e;i++)b.push(M.readInt(t,(e<2?Y-4:o)+4*i))}if(l==11){for(var i=0;i<e;i++)b.push(M.readFloat(t,o+i*4))}if(l==12){for(var i=0;
i<e;i++)b.push(M.readDouble(t,o+i*8))}$["t"+Q]=b;if(e!=0&&b.length==0){av(Q,"unknown TIFF tag type: ",l,"num:",e);
if(R==0)return;return}if(c.debug)av("   ".repeat(P),Q,l,_.tags[Q],b);if(Q==330&&$.t272&&$.t272[0]=="DSLR-A100"){}else if(Q==330||Q==34665||Q==34853||Q==50740&&M.readUshort(t,M.readUint(b,0))<300||Q==61440){var A=Q==50740?[M.readUint(b,0)]:b,O=[];
for(var i=0;i<A.length;i++)_._readIFD(M,t,A[i],O,P+1,c);if(Q==330)$.subIFD=O;if(Q==34665)$.exifIFD=O[0];
if(Q==34853)$.gpsiIFD=O[0];if(Q==50740)$.dngPrvt=O[0];if(Q==61440)$.fujiIFD=O[0]}if(Q==37500&&c.parseMN){var K=b;
if(M.readASCII(K,0,5)=="Nikon")$.makerNote=_.decode(K.slice(10).buffer)[0];else if(M.readUshort(t,o)<300&&M.readUshort(t,o+4)<=12){var V=[];
_._readIFD(M,t,o,V,P+1,c);$.makerNote=V[0]}}}h.push($);if(c.debug)av("   ".repeat(P),"<<<---------------");
return Y};_._writeIFD=function(M,t,Y,h,P){var c=Object.keys(P),I=c.length;if(P.exifIFD)I--;if(P.gpsiIFD)I--;
M.writeUshort(Y,h,I);h+=2;var $=h+I*12+4;for(var R=0;R<c.length;R++){var Q=c[R];if(Q=="t34665"||Q=="t34853")continue;
if(Q=="exifIFD")Q="t34665";if(Q=="gpsiIFD")Q="t34853";var l=parseInt(Q.slice(1)),e=t.main[l];if(e==null)e=t.rest[l];
if(e==null||e==0)throw new Error("unknown type of tag: "+l);var o=P[Q];if(l==34665){var b=_._writeIFD(M,t,Y,$,P.exifIFD);
o=[$];$=b[1]}if(l==34853){var b=_._writeIFD(M,_._types.gps,Y,$,P.gpsiIFD);o=[$];$=b[1]}if(e==2)o=o[0]+"\0";
var C=o.length;M.writeUshort(Y,h,l);h+=2;M.writeUshort(Y,h,e);h+=2;M.writeUint(Y,h,C);h+=4;var T=[-1,1,1,2,4,8,0,1,0,4,8,0,8][e]*C,f=h;
if(T>4){M.writeUint(Y,h,$);f=$}if(e==1||e==7){for(var i=0;i<C;i++)Y[f+i]=o[i]}else if(e==2){M.writeASCII(Y,f,o)}else if(e==3){for(var i=0;
i<C;i++)M.writeUshort(Y,f+2*i,o[i])}else if(e==4){for(var i=0;i<C;i++)M.writeUint(Y,f+4*i,o[i])}else if(e==5||e==10){var z=e==5?M.writeUint:M.writeInt;
for(var i=0;i<C;i++){var A=o[i],O=A[0],K=A[1];if(O==null)throw"e";z(Y,f+8*i,O);z(Y,f+8*i+4,K)}}else if(e==9){for(var i=0;
i<C;i++)M.writeInt(Y,f+4*i,o[i])}else if(e==12){for(var i=0;i<C;i++)M.writeDouble(Y,f+8*i,o[i])}else throw e;
if(T>4){T+=T&1;$+=T}h+=4}return[h,$]};_.toRGBA8=function(M,t){var Y=M.width,h=M.height,c=Y*h,I=c*4,$=M.data,R=new Uint8Array(c*4),Q=M.t262?M.t262[0]:2,l=M.t258?Math.min(32,M.t258[0]):1;
if(M.t262==null&&l==1)Q=0;if(!1){}else if(Q==0){var e=Math.ceil(l*Y/8);for(var o=0;o<h;o++){var b=o*e,C=o*Y;
if(l==1)for(var T=0;T<Y;T++){var f=C+T<<2,i=$[b+(T>>3)]>>7-(T&7)&1;R[f]=R[f+1]=R[f+2]=(1-i)*255;R[f+3]=255}if(l==4)for(var T=0;
T<Y;T++){var f=C+T<<2,i=$[b+(T>>1)]>>4-4*(T&1)&15;R[f]=R[f+1]=R[f+2]=(15-i)*17;R[f+3]=255}if(l==8)for(var T=0;
T<Y;T++){var f=C+T<<2,i=$[b+T];R[f]=R[f+1]=R[f+2]=255-i;R[f+3]=255}}}else if(Q==1){var z=M.t258?M.t258.length:1,e=Math.ceil(z*l*Y/8);
if(t==null)t=1/256;for(var o=0;o<h;o++){var b=o*e,C=o*Y;if(l==1)for(var T=0;T<Y;T++){var f=C+T<<2,i=$[b+(T>>3)]>>7-(T&7)&1;
R[f]=R[f+1]=R[f+2]=i*255;R[f+3]=255}if(l==2)for(var T=0;T<Y;T++){var f=C+T<<2,i=$[b+(T>>2)]>>6-2*(T&3)&3;
R[f]=R[f+1]=R[f+2]=i*85;R[f+3]=255}if(l==8)for(var T=0;T<Y;T++){var f=C+T<<2,i=$[b+T*z];R[f]=R[f+1]=R[f+2]=i;
R[f+3]=255}if(l==16)for(var T=0;T<Y;T++){var f=C+T<<2,O=b+2*T,i=$[O+1]<<8|$[O];R[f]=R[f+1]=R[f+2]=Math.min(255,~~(i*t));
R[f+3]=255}}}else if(Q==2){var z=M.t258?M.t258.length:3;if(l==8){if(z==4)for(var T=0;T<I;T++)R[T]=$[T];
if(z==3)for(var T=0;T<c;T++){var f=T<<2,V=T*3;R[f]=$[V];R[f+1]=$[V+1];R[f+2]=$[V+2];R[f+3]=255}}else{if(z==4)for(var T=0;
T<c;T++){var f=T<<2,V=T*8+1;R[f]=$[V];R[f+1]=$[V+2];R[f+2]=$[V+4];R[f+3]=$[V+6]}if(z==3)for(var T=0;
T<c;T++){var f=T<<2,V=T*6+1;R[f]=$[V];R[f+1]=$[V+2];R[f+2]=$[V+4];R[f+3]=255}}}else if(Q==3){var G=M.t320,z=M.t258?M.t258.length:1;
for(var T=0;T<c;T++){var f=T<<2,b0=$[T*z];R[f]=G[b0]>>8;R[f+1]=G[256+b0]>>8;R[f+2]=G[512+b0]>>8;R[f+3]=255}}else if(Q==5){var z=M.t258?M.t258.length:4,y=z>4?1:0;
for(var T=0;T<c;T++){var f=T<<2,s=T*z,D=255-$[s],E=255-$[s+1],q=255-$[s+2],N=(255-$[s+3])*(1/255);R[f]=~~(D*N+.5);
R[f+1]=~~(E*N+.5);R[f+2]=~~(q*N+.5);R[f+3]=255*(1-y)+$[s+4]*y}}else if(Q==6&&M.t278){var H=M.t278[0];
for(var o=0;o<h;o+=H){var T=o*Y,n=H*Y;for(var X=0;X<n;X++){var f=4*(T+X),s=3*T+4*(X>>>1),q=$[s+(X&1)],d=$[s+2]-128,Z=$[s+3]-128,B=q+((Z>>2)+(Z>>3)+(Z>>5)),g=q-((d>>2)+(d>>4)+(d>>5))-((Z>>1)+(Z>>3)+(Z>>4)+(Z>>5)),k=q+(d+(d>>1)+(d>>2)+(d>>6));
R[f]=Math.max(0,Math.min(255,B));R[f+1]=Math.max(0,Math.min(255,g));R[f+2]=Math.max(0,Math.min(255,k));
R[f+3]=255}}}else av("Unknown Photometric interpretation: "+Q);return R};_.replaceIMG=function(M){if(M==null)M=document.getElementsByTagName("img");
var t=["tif","tiff","dng","cr2","nef"];for(var Y=0;Y<M.length;Y++){var h=M[Y],P=h.getAttribute("src");
if(P==null)continue;var I=P.split(".").pop().toLowerCase();if(t.indexOf(I)==-1)continue;var $=new XMLHttpRequest;
_._xhrs.push($);_._imgs.push(h);$.open("GET",P);$.responseType="arraybuffer";$.onload=_._imgLoaded;$.send()}};
_._xhrs=[];_._imgs=[];_._imgLoaded=function(M){var Y=M.target.response,h=_.decode(Y),P=h,c=0,I=P[0];
if(h[0].subIFD)P=P.concat(h[0].subIFD);for(var $=0;$<P.length;$++){var R=P[$];if(R.t258==null||R.t258.length<3)continue;
var Q=R.t256*R.t257;if(Q>c){c=Q;I=R}}_.decodeImage(Y,I,h);var l=_.toRGBA8(I),e=I.width,o=I.height,b=_._xhrs.indexOf(M.target),R=_._imgs[b];
_._xhrs.splice(b,1);_._imgs.splice(b,1);var C=document.createElement("canvas");C.width=e;C.height=o;
var T=C.getContext("2d"),f=new ImageData(new Uint8ClampedArray(l.buffer),e,o);T.putImageData(f,0,0);
R.setAttribute("src",C.toDataURL())};_._binBE={nextZero:function(M,t){while(M[t]!=0)t++;return t},readUshort:function(M,t){return M[t]<<8|M[t+1]},readShort:function(M,t){var Y=_._binBE.ui8;
Y[0]=M[t+1];Y[1]=M[t+0];return _._binBE.i16[0]},readInt:function(M,t){var Y=_._binBE.ui8;Y[0]=M[t+3];
Y[1]=M[t+2];Y[2]=M[t+1];Y[3]=M[t+0];return _._binBE.i32[0]},readUint:function(M,t){var Y=_._binBE.ui8;
Y[0]=M[t+3];Y[1]=M[t+2];Y[2]=M[t+1];Y[3]=M[t+0];return _._binBE.ui32[0]},readASCII:function(M,t,Y){var h="";
for(var P=0;P<Y;P++)h+=String.fromCharCode(M[t+P]);return h},readFloat:function(M,t){var Y=_._binBE.ui8;
for(var h=0;h<4;h++)Y[h]=M[t+3-h];return _._binBE.fl32[0]},readDouble:function(M,t){var Y=_._binBE.ui8;
for(var h=0;h<8;h++)Y[h]=M[t+7-h];return _._binBE.fl64[0]},writeUshort:function(M,t,Y){M[t]=Y>>8&255;
M[t+1]=Y&255},writeInt:function(M,t,Y){var h=_._binBE.ui8;_._binBE.i32[0]=Y;M[t+3]=h[0];M[t+2]=h[1];
M[t+1]=h[2];M[t+0]=h[3]},writeUint:function(M,t,Y){M[t]=Y>>24&255;M[t+1]=Y>>16&255;M[t+2]=Y>>8&255;M[t+3]=Y>>0&255},writeASCII:function(M,t,Y){for(var h=0;
h<Y.length;h++)M[t+h]=Y.charCodeAt(h)},writeDouble:function(M,t,Y){_._binBE.fl64[0]=Y;for(var h=0;h<8;
h++)M[t+h]=_._binBE.ui8[7-h]}};_._binBE.ui8=new Uint8Array(8);_._binBE.i16=new Int16Array(_._binBE.ui8.buffer);
_._binBE.i32=new Int32Array(_._binBE.ui8.buffer);_._binBE.ui32=new Uint32Array(_._binBE.ui8.buffer);
_._binBE.fl32=new Float32Array(_._binBE.ui8.buffer);_._binBE.fl64=new Float64Array(_._binBE.ui8.buffer);
_._binLE={nextZero:_._binBE.nextZero,readUshort:function(M,t){return M[t+1]<<8|M[t]},readShort:function(M,t){var Y=_._binBE.ui8;
Y[0]=M[t+0];Y[1]=M[t+1];return _._binBE.i16[0]},readInt:function(M,t){var Y=_._binBE.ui8;Y[0]=M[t+0];
Y[1]=M[t+1];Y[2]=M[t+2];Y[3]=M[t+3];return _._binBE.i32[0]},readUint:function(M,t){var Y=_._binBE.ui8;
Y[0]=M[t+0];Y[1]=M[t+1];Y[2]=M[t+2];Y[3]=M[t+3];return _._binBE.ui32[0]},readASCII:_._binBE.readASCII,readFloat:function(M,t){var Y=_._binBE.ui8;
for(var h=0;h<4;h++)Y[h]=M[t+h];return _._binBE.fl32[0]},readDouble:function(M,t){var Y=_._binBE.ui8;
for(var h=0;h<8;h++)Y[h]=M[t+h];return _._binBE.fl64[0]},writeUshort:function(M,t,Y){M[t]=Y&255;M[t+1]=Y>>8&255},writeInt:function(M,t,Y){var h=_._binBE.ui8;
_._binBE.i32[0]=Y;M[t+0]=h[0];M[t+1]=h[1];M[t+2]=h[2];M[t+3]=h[3]},writeUint:function(M,t,Y){M[t]=Y>>>0&255;
M[t+1]=Y>>>8&255;M[t+2]=Y>>>16&255;M[t+3]=Y>>>24&255},writeASCII:_._binBE.writeASCII};_._copyTile=function(M,t,Y,h,P,c,I,$){var R=Math.min(t,P-I),Q=Math.min(Y,c-$);
for(var l=0;l<Q;l++){var e=($+l)*P+I,o=l*t;for(var b=0;b<R;b++)h[e+b]=M[o+b]}};_.LosslessJpegDecode=function(){var M,t,Y,h,P,c,I,$,Q,l;
function e(){return M[t++]}function b(){return M[t++]<<8|M[t++]}function i(){var u=e(),d=[0,0,0,255],Z=[],B=8;
for(var g=0;g<16;g++)Z[g]=e();for(var g=0;g<16;g++){for(var k=0;k<Z[g];k++){var W=A(d,0,g+1,1);d[W+3]=e()}}var F=new Uint8Array(1<<B);
Q[u]=[new Uint8Array(d),F];for(var g=0;g<1<<B;g++){var al=B,S=g,a3=0,U=0;while(d[a3+3]==255&&al!=0){U=S>>--al&1;
a3=d[a3+U]}F[g]=a3}}function A(u,d,Z,B){if(u[d+3]!=255)return 0;if(Z==0)return d;for(var g=0;g<2;g++){if(u[d+g]==0){u[d+g]=u.length;
u.push(0,0,B,255)}var k=A(u,u[d+g],Z-1,B+1);if(k!=0)return k}return 0}function O(u){var d=u.c,Z=u.d;
while(d<25){var B=u.data[u.a++];if(!u.b)u.a+=B+1>>>8;Z=Z<<8|B;d+=8}u.c=d;u.d=Z}function V(u,d){if(d.c<u)O(d);
return d.d>>(d.c-=u)&65535>>16-u}function b0(u,d){var Z=u[0],B=0,g=255,k=0;if(d.c<16)O(d);var W=d.d>>d.c-8&255;
B=u[1][W];g=Z[B+3];d.c-=Z[B+2];while(g==255){k=d.d>>--d.c&1;B=Z[B+k];g=Z[B+3]}return g}function s(u,d){if(u<32768>>16-d)u+=-(1<<d)+1;
return u}function D(u,d){var Z=b0(u,d);if(Z==0)return 0;var B=V(Z,d);return s(B,Z)}function q(u,d,Z){var B=c,g=h,k=I,W=l;
for(var F=0;F<B;F++){u[F]=D(W[F],Z)+(1<<Y-1)}for(var al=B;al<d;al+=B){for(var F=0;F<B;F++)u[al+F]=D(W[F],Z)+u[al+F-B]}var S=d;
for(var a3=1;a3<g;a3++){for(var F=0;F<B;F++){u[S+F]=D(W[F],Z)+u[S+F-d]}for(var al=B;al<d;al+=B){for(var F=0;
F<B;F++){var U=S+al+F,r=u[U-B];if(k==1){}else if(k==6)r=u[U-d]+(r-u[U-B-d]>>>1);else throw k;u[U]=r+D(W[F],Z)}}S+=d}}function N(u,d){var Z=V(u,d);
return u==16?-32768:s(Z,u)}function j(u,d,Z){var B=M.length-t;for(var g=0;g<B;g+=4){var k=M[t+g];M[t+g]=M[t+g+3];
M[t+g+3]=k;var k=M[t+g+1];M[t+g+1]=M[t+g+2];M[t+g+2]=k}var W=l[0];for(var F=0;F<h;F++){var al=32768,S=32768;
for(var a3=0;a3<d;a3+=2){var U=b0(W,Z),r=b0(W,Z);if(U!=0)al+=N(U,Z);if(r!=0)S+=N(r,Z);u[F*d+a3]=al&65535;
u[F*d+a3+1]=S&65535}}}function X(u){M=u;t=0;Q=[],l=[];if(b()!=65496)throw"e";while(!0){var d=b();if(d==65535){t--;
continue}var Z=b();if(d==65475){Y=e();h=b();P=b();c=e();$=[];for(var B=0;B<c;B++){var g=e(),k=e();if(k!=17)throw"e";
t++;$[g]=B}}else if(d==65476){var W=t+Z-2;while(t<W)i()}else if(d==65498){t++;for(var B=0;B<c;B++){var F=e();
l[$[F]]=Q[e()>>>4]}I=e();t+=2;break}else{t+=Z-2}}var al=Y>8?Uint16Array:Uint8Array,S=P*c,a3=new al(h*S),U={c:0,d:0,b:I==8,a:t,data:M};
if(U.b)j(a3,S,U);else q(a3,S,U);return a3}return X}()}(_,b5))}())// (c) Dean McNamee <dean@gmail.com>, 2013.
//
// https://github.com/deanm/omggif
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
//
// omggif is a JavaScript implementation of a GIF 89a encoder and decoder,
// including animation and compression.  It does not rely on any specific
// underlying system, so should run in the browser, Node, or Plask.

"use strict";

function GifWriter(buf, width, height, gopts) {
  var p = 0;

  var gopts = gopts === undefined ? { } : gopts;
  var loop_count = gopts.loop === undefined ? null : gopts.loop;
  var global_palette = gopts.palette === undefined ? null : gopts.palette;

  if (width <= 0 || height <= 0 || width > 65535 || height > 65535)
    throw new Error("Width/Height invalid.");

  function check_palette_and_num_colors(palette) {
    var num_colors = palette.length;
    if (num_colors < 2 || num_colors > 256 ||  num_colors & (num_colors-1)) {
      throw new Error(
          "Invalid code/color length, must be power of 2 and 2 .. 256.");
    }
    return num_colors;
  }

  // - Header.
  buf[p++] = 0x47; buf[p++] = 0x49; buf[p++] = 0x46;  // GIF
  buf[p++] = 0x38; buf[p++] = 0x39; buf[p++] = 0x61;  // 89a

  // Handling of Global Color Table (palette) and background index.
  var gp_num_colors_pow2 = 0;
  var background = 0;
  if (global_palette !== null) {
    var gp_num_colors = check_palette_and_num_colors(global_palette);
    while (gp_num_colors >>= 1) ++gp_num_colors_pow2;
    gp_num_colors = 1 << gp_num_colors_pow2;
    --gp_num_colors_pow2;
    if (gopts.background !== undefined) {
      background = gopts.background;
      if (background >= gp_num_colors)
        throw new Error("Background index out of range.");
      // The GIF spec states that a background index of 0 should be ignored, so
      // this is probably a mistake and you really want to set it to another
      // slot in the palette.  But actually in the end most browsers, etc end
      // up ignoring this almost completely (including for dispose background).
      if (background === 0)
        throw new Error("Background index explicitly passed as 0.");
    }
  }

  // - Logical Screen Descriptor.
  // NOTE(deanm): w/h apparently ignored by implementations, but set anyway.
  buf[p++] = width & 0xff; buf[p++] = width >> 8 & 0xff;
  buf[p++] = height & 0xff; buf[p++] = height >> 8 & 0xff;
  // NOTE: Indicates 0-bpp original color resolution (unused?).
  buf[p++] = (global_palette !== null ? 0x80 : 0) |  // Global Color Table Flag.
             gp_num_colors_pow2;  // NOTE: No sort flag (unused?).
  buf[p++] = background;  // Background Color Index.
  buf[p++] = 0;  // Pixel aspect ratio (unused?).

  // - Global Color Table
  if (global_palette !== null) {
    for (var i = 0, il = global_palette.length; i < il; ++i) {
      var rgb = global_palette[i];
      buf[p++] = rgb >> 16 & 0xff;
      buf[p++] = rgb >> 8 & 0xff;
      buf[p++] = rgb & 0xff;
    }
  }

  if (loop_count !== null) {  // Netscape block for looping.
    if (loop_count < 0 || loop_count > 65535)
      throw new Error("Loop count invalid.");
    // Extension code, label, and length.
    buf[p++] = 0x21; buf[p++] = 0xff; buf[p++] = 0x0b;
    // NETSCAPE2.0
    buf[p++] = 0x4e; buf[p++] = 0x45; buf[p++] = 0x54; buf[p++] = 0x53;
    buf[p++] = 0x43; buf[p++] = 0x41; buf[p++] = 0x50; buf[p++] = 0x45;
    buf[p++] = 0x32; buf[p++] = 0x2e; buf[p++] = 0x30;
    // Sub-block
    buf[p++] = 0x03; buf[p++] = 0x01;
    buf[p++] = loop_count & 0xff; buf[p++] = loop_count >> 8 & 0xff;
    buf[p++] = 0x00;  // Terminator.
  }


  var ended = false;

  this.addFrame = function(x, y, w, h, indexed_pixels, opts) {
    if (ended === true) { --p; ended = false; }  // Un-end.

    opts = opts === undefined ? { } : opts;

    // TODO(deanm): Bounds check x, y.  Do they need to be within the virtual
    // canvas width/height, I imagine?
    if (x < 0 || y < 0 || x > 65535 || y > 65535)
      throw new Error("x/y invalid.");

    if (w <= 0 || h <= 0 || w > 65535 || h > 65535)
      throw new Error("Width/Height invalid.");

    if (indexed_pixels.length < w * h)
      throw new Error("Not enough pixels for the frame size.");

    var using_local_palette = true;
    var palette = opts.palette;
    if (palette === undefined || palette === null) {
      using_local_palette = false;
      palette = global_palette;
    }

    if (palette === undefined || palette === null)
      throw new Error("Must supply either a local or global palette.");

    var num_colors = check_palette_and_num_colors(palette);

    // Compute the min_code_size (power of 2), destroying num_colors.
    var min_code_size = 0;
    while (num_colors >>= 1) ++min_code_size;
    num_colors = 1 << min_code_size;  // Now we can easily get it back.

    var delay = opts.delay === undefined ? 0 : opts.delay;

    // From the spec:
    //     0 -   No disposal specified. The decoder is
    //           not required to take any action.
    //     1 -   Do not dispose. The graphic is to be left
    //           in place.
    //     2 -   Restore to background color. The area used by the
    //           graphic must be restored to the background color.
    //     3 -   Restore to previous. The decoder is required to
    //           restore the area overwritten by the graphic with
    //           what was there prior to rendering the graphic.
    //  4-7 -    To be defined.
    // NOTE(deanm): Dispose background doesn't really work, apparently most
    // browsers ignore the background palette index and clear to transparency.
    var disposal = opts.disposal === undefined ? 0 : opts.disposal;
    if (disposal < 0 || disposal > 3)  // 4-7 is reserved.
      throw new Error("Disposal out of range.");

    var use_transparency = false;
    var transparent_index = 0;
    if (opts.transparent !== undefined && opts.transparent !== null) {
      use_transparency = true;
      transparent_index = opts.transparent;
      if (transparent_index < 0 || transparent_index >= num_colors)
        throw new Error("Transparent color index.");
    }

    if (disposal !== 0 || use_transparency || delay !== 0) {
      // - Graphics Control Extension
      buf[p++] = 0x21; buf[p++] = 0xf9;  // Extension / Label.
      buf[p++] = 4;  // Byte size.

      buf[p++] = disposal << 2 | (use_transparency === true ? 1 : 0);
      buf[p++] = delay & 0xff; buf[p++] = delay >> 8 & 0xff;
      buf[p++] = transparent_index;  // Transparent color index.
      buf[p++] = 0;  // Block Terminator.
    }

    // - Image Descriptor
    buf[p++] = 0x2c;  // Image Seperator.
    buf[p++] = x & 0xff; buf[p++] = x >> 8 & 0xff;  // Left.
    buf[p++] = y & 0xff; buf[p++] = y >> 8 & 0xff;  // Top.
    buf[p++] = w & 0xff; buf[p++] = w >> 8 & 0xff;
    buf[p++] = h & 0xff; buf[p++] = h >> 8 & 0xff;
    // NOTE: No sort flag (unused?).
    // TODO(deanm): Support interlace.
    buf[p++] = using_local_palette === true ? (0x80 | (min_code_size-1)) : 0;

    // - Local Color Table
    if (using_local_palette === true) {
      for (var i = 0, il = palette.length; i < il; ++i) {
        var rgb = palette[i];
        buf[p++] = rgb >> 16 & 0xff;
        buf[p++] = rgb >> 8 & 0xff;
        buf[p++] = rgb & 0xff;
      }
    }

    p = GifWriterOutputLZWCodeStream(
            buf, p, min_code_size < 2 ? 2 : min_code_size, indexed_pixels);

    return p;
  };

  this.end = function() {
    if (ended === false) {
      buf[p++] = 0x3b;  // Trailer.
      ended = true;
    }
    return p;
  };

  this.getOutputBuffer = function() { return buf; };
  this.setOutputBuffer = function(v) { buf = v; };
  this.getOutputBufferPosition = function() { return p; };
  this.setOutputBufferPosition = function(v) { p = v; };
}

// Main compression routine, palette indexes -> LZW code stream.
// |index_stream| must have at least one entry.
function GifWriterOutputLZWCodeStream(buf, p, min_code_size, index_stream) {
  buf[p++] = min_code_size;
  var cur_subblock = p++;  // Pointing at the length field.

  var clear_code = 1 << min_code_size;
  var code_mask = clear_code - 1;
  var eoi_code = clear_code + 1;
  var next_code = eoi_code + 1;

  var cur_code_size = min_code_size + 1;  // Number of bits per code.
  var cur_shift = 0;
  // We have at most 12-bit codes, so we should have to hold a max of 19
  // bits here (and then we would write out).
  var cur = 0;

  function emit_bytes_to_buffer(bit_block_size) {
    while (cur_shift >= bit_block_size) {
      buf[p++] = cur & 0xff;
      cur >>= 8; cur_shift -= 8;
      if (p === cur_subblock + 256) {  // Finished a subblock.
        buf[cur_subblock] = 255;
        cur_subblock = p++;
      }
    }
  }

  function emit_code(c) {
    cur |= c << cur_shift;
    cur_shift += cur_code_size;
    emit_bytes_to_buffer(8);
  }

  // I am not an expert on the topic, and I don't want to write a thesis.
  // However, it is good to outline here the basic algorithm and the few data
  // structures and optimizations here that make this implementation fast.
  // The basic idea behind LZW is to build a table of previously seen runs
  // addressed by a short id (herein called output code).  All data is
  // referenced by a code, which represents one or more values from the
  // original input stream.  All input bytes can be referenced as the same
  // value as an output code.  So if you didn't want any compression, you
  // could more or less just output the original bytes as codes (there are
  // some details to this, but it is the idea).  In order to achieve
  // compression, values greater then the input range (codes can be up to
  // 12-bit while input only 8-bit) represent a sequence of previously seen
  // inputs.  The decompressor is able to build the same mapping while
  // decoding, so there is always a shared common knowledge between the
  // encoding and decoder, which is also important for "timing" aspects like
  // how to handle variable bit width code encoding.
  //
  // One obvious but very important consequence of the table system is there
  // is always a unique id (at most 12-bits) to map the runs.  'A' might be
  // 4, then 'AA' might be 10, 'AAA' 11, 'AAAA' 12, etc.  This relationship
  // can be used for an effecient lookup strategy for the code mapping.  We
  // need to know if a run has been seen before, and be able to map that run
  // to the output code.  Since we start with known unique ids (input bytes),
  // and then from those build more unique ids (table entries), we can
  // continue this chain (almost like a linked list) to always have small
  // integer values that represent the current byte chains in the encoder.
  // This means instead of tracking the input bytes (AAAABCD) to know our
  // current state, we can track the table entry for AAAABC (it is guaranteed
  // to exist by the nature of the algorithm) and the next character D.
  // Therefor the tuple of (table_entry, byte) is guaranteed to also be
  // unique.  This allows us to create a simple lookup key for mapping input
  // sequences to codes (table indices) without having to store or search
  // any of the code sequences.  So if 'AAAA' has a table entry of 12, the
  // tuple of ('AAAA', K) for any input byte K will be unique, and can be our
  // key.  This leads to a integer value at most 20-bits, which can always
  // fit in an SMI value and be used as a fast sparse array / object key.

  // Output code for the current contents of the index buffer.
  var ib_code = index_stream[0] & code_mask;  // Load first input index.
  var code_table = { };  // Key'd on our 20-bit "tuple".

  emit_code(clear_code);  // Spec says first code should be a clear code.

  // First index already loaded, process the rest of the stream.
  for (var i = 1, il = index_stream.length; i < il; ++i) {
    var k = index_stream[i] & code_mask;
    var cur_key = ib_code << 8 | k;  // (prev, k) unique tuple.
    var cur_code = code_table[cur_key];  // buffer + k.

    // Check if we have to create a new code table entry.
    if (cur_code === undefined) {  // We don't have buffer + k.
      // Emit index buffer (without k).
      // This is an inline version of emit_code, because this is the core
      // writing routine of the compressor (and V8 cannot inline emit_code
      // because it is a closure here in a different context).  Additionally
      // we can call emit_byte_to_buffer less often, because we can have
      // 30-bits (from our 31-bit signed SMI), and we know our codes will only
      // be 12-bits, so can safely have 18-bits there without overflow.
      // emit_code(ib_code);
      cur |= ib_code << cur_shift;
      cur_shift += cur_code_size;
      while (cur_shift >= 8) {
        buf[p++] = cur & 0xff;
        cur >>= 8; cur_shift -= 8;
        if (p === cur_subblock + 256) {  // Finished a subblock.
          buf[cur_subblock] = 255;
          cur_subblock = p++;
        }
      }

      if (next_code === 4096) {  // Table full, need a clear.
        emit_code(clear_code);
        next_code = eoi_code + 1;
        cur_code_size = min_code_size + 1;
        code_table = { };
      } else {  // Table not full, insert a new entry.
        // Increase our variable bit code sizes if necessary.  This is a bit
        // tricky as it is based on "timing" between the encoding and
        // decoder.  From the encoders perspective this should happen after
        // we've already emitted the index buffer and are about to create the
        // first table entry that would overflow our current code bit size.
        if (next_code >= (1 << cur_code_size)) ++cur_code_size;
        code_table[cur_key] = next_code++;  // Insert into code table.
      }

      ib_code = k;  // Index buffer to single input k.
    } else {
      ib_code = cur_code;  // Index buffer to sequence in code table.
    }
  }

  emit_code(ib_code);  // There will still be something in the index buffer.
  emit_code(eoi_code);  // End Of Information.

  // Flush / finalize the sub-blocks stream to the buffer.
  emit_bytes_to_buffer(1);

  // Finish the sub-blocks, writing out any unfinished lengths and
  // terminating with a sub-block of length 0.  If we have already started
  // but not yet used a sub-block it can just become the terminator.
  if (cur_subblock + 1 === p) {  // Started but unused.
    buf[cur_subblock] = 0;
  } else {  // Started and used, write length and additional terminator block.
    buf[cur_subblock] = p - cur_subblock - 1;
    buf[p++] = 0;
  }
  return p;
};

var UGIF=function(){var a=function(){var j,F,c,b,H=0,k=0,Z=0,P=0,l=function(){var R=j>>>3,i=F[R+2]<<16|F[R+1]<<8|F[R],M=i>>>(j&7)&(1<<k)-1;
j+=k;return M},e=new Uint32Array(4096*4),V=0,W=function(R){if(R==V)return;V=R;Z=1<<R;P=Z+1;for(var i=0;
i<P+1;i++){e[4*i]=e[4*i+3]=i;e[4*i+1]=65535;e[4*i+2]=1}},G=function(R){k=R+1;H=P+1},Q=function(R){var i=R<<2,M=e[i+2],v=b+M-1;
while(i!=65535){c[v--]=e[i];i=e[i+1]}b+=M},L=function(R,i){var M=H<<2,v=R<<2;e[M]=e[(i<<2)+3];e[M+1]=v;
e[M+2]=e[v+2]+1;e[M+3]=e[v+3];H++;if(H==1<<k&&k!=12)k++},s=function(R,i,M,v,t,q){j=i<<3;F=R;c=v;b=t;
var g=i+M<<3,r=0,p=0;W(q);G(q);while(j<g&&(r=l())!=P){if(r==Z){G(q);r=l();if(r==P)break;Q(r)}else{if(r<H){Q(r);
L(p,r)}else{L(p,p);Q(H-1)}}p=r}return b};return s}(),O,f,E=new Uint8Array(128),B=function(){return O[f++]},A=function(){var j=O[f+1]<<8|O[f];
f+=2;return j},U=function(){while(O[f]!=0)f+=1+O[f];f++},d=function(j){O=new Uint8Array(j);f=6;var F=A(),c=A(),b=B(),H=B(),k=B(),Z=b>>>7,P=b>>>4&7,X=b>>>3&1,l=b>>>0&7,m=f,e=0,V,W=0,G=0,C=0,z=260;
if(Z==1)f+=3*(1<<l+1);var T=[];while(f<O.length){var Q=B();if(Q==33){var L=B();if(L==249){var s=B(),b=B();
W=b>>>2&7;G=A();z=B();if((b&1)==0)z=260;B()}else if(L==254){U()}else if(L==255){U()}else throw L}else if(Q==44){var R=A(),i=A(),M=A(),v=A(),t=B(),q=t>>>7;
C=t>>>6&1;if(q==1){var l=t>>>0&7;e=f;f+=3*(1<<l+1)}V={x:R,y:i,a:M,O:v,f:W,delay:G,B:z,A:e==0?m:e,U:C};
T.push(V);e=0}else if(Q<=8){var M=V.a,v=V.O,S=M*v,Y=0;if(E.length<S*1.2)E=new Uint8Array(~~(S*1.3));
while(f<O.length&&O[f]!=0){var J=B();for(var g=0;g<J;g++)E[Y+g]=O[f+g];Y+=J;f+=J}if(f>=O.length){alert("Some frames are damaged.");
T.pop();break}B();V.d=new Uint8Array(S);var r=a(E,0,Y,V.d,0,Q)}else if(Q==59)break;else throw Q}return{width:F,height:c,data:O,frames:T}};
function D(j,F,O,c,b,H,k,Z){for(var P=0;P<k;P++){var X=b[H+P];if(X!=Z){var l=F+P<<2,m=c+X*3;j[l]=O[m];
j[l+1]=O[m+1];j[l+2]=O[m+2];j[l+3]=255}}}var w=function(j){var F=j.frames,c=j.width,b=j.height,H=new Uint8Array(c*b*4),k,Z=[],O=j.data;
for(var P=0;P<F.length;P++){var X=F[P],l=X.x,m=X.y,e=X.a,T=X.O,V=X.f;if(V==3){if(k==null)k=H.slice(0);
else k.set(H)}var W=[];if(X.U==1){for(var G=0;G<T;G+=8)W.push(G);for(var G=4;G<T;G+=8)W.push(G);for(var G=2;
G<T;G+=4)W.push(G);for(var G=1;G<T;G+=2)W.push(G)}var C=X.d,z=X.A,Q=X.B,L=X.U;for(var G=0;G<T;G++){var s=L==0?G:W[G];
D(H,(s+m)*c+l,O,z,C,G*e,e,Q)}Z.push(H.slice(0).buffer);if(V<2){}else if(V==2){for(var G=0;G<T;G++){var R=((m+G)*c+l)*4;
H.fill(0,R,R+e*4)}}else if(V==3)H.set(k)}return Z};return{decode:d,toRGBA8:w}}()/**
 * Gauss-Jordan elimination
 */

var linear = (function(){
/**
 * Used internally to solve systems
 * If you want to solve A.x = B,
 * choose data=A and mirror=B.
 * mirror can be either an array representing a vector
 * or an array of arrays representing a matrix.
 */
function Mat(data, mirror) {
  // Clone the original matrix
  this.data = new Array(data.length);
  for (var i=0, cols=data[0].length; i<data.length; i++) {
    this.data[i] = new Array(cols);
    for(var j=0; j<cols; j++) {
      this.data[i][j] = data[i][j];
    }
  }

  if (mirror) {
    if (typeof mirror[0] !== "object") {
      for (var i=0; i<mirror.length; i++) {
        mirror[i] = [mirror[i]];
      }
    }
    this.mirror = new Mat(mirror);
  }
}

/**
 * Swap lines i and j in the matrix
 */
Mat.prototype.swap = function (i, j) {
  if (this.mirror) this.mirror.swap(i,j);
  var tmp = this.data[i];
  this.data[i] = this.data[j];
  this.data[j] = tmp;
}

/**
 * Multiply line number i by l
 */
Mat.prototype.multline = function (i, l) {
  if (this.mirror) this.mirror.multline(i,l);
  var line = this.data[i];
  for (var k=line.length-1; k>=0; k--) {
    line[k] *= l;
  }
}

/**
 * Add line number j multiplied by l to line number i
 */
Mat.prototype.addmul = function (i, j, l) {
  if (this.mirror) this.mirror.addmul(i,j,l);
  var lineI = this.data[i], lineJ = this.data[j];
  for (var k=lineI.length-1; k>=0; k--) {
    lineI[k] = lineI[k] + l*lineJ[k];
  }
}

/**
 * Tests if line number i is composed only of zeroes
 */
Mat.prototype.hasNullLine = function (i) {
  for (var j=0; j<this.data[i].length; j++) {
    if (this.data[i][j] !== 0) {
      return false;
    }
  }
  return true;
}

Mat.prototype.gauss = function() {
  var pivot = 0,
      lines = this.data.length,
      columns = this.data[0].length,
      nullLines = [];

  for (var j=0; j<columns; j++) {
    // Find the line on which there is the maximum value of column j
    var maxValue = 0, maxLine = 0;
    for (var k=pivot; k<lines; k++) {
      var val = this.data[k][j];
      if (Math.abs(val) > Math.abs(maxValue)) {
        maxLine = k;
        maxValue = val;
      } 
    }
    if (maxValue === 0) {
      // The matrix is not invertible. The system may still have solutions.
      nullLines.push(pivot);
    } else {
      // The value of the pivot is maxValue
      this.multline(maxLine, 1/maxValue);
      this.swap(maxLine, pivot);
      for (var i=0; i<lines; i++) {
        if (i !== pivot) {
          this.addmul(i, pivot, -this.data[i][j]);
        }
      }
    }
    pivot++;
  }

  // Check that the system has null lines where it should
  for (var i=0; i<nullLines.length; i++) {
    if (!this.mirror.hasNullLine(nullLines[i])) {
      throw new Error("singular matrix");
    }
  }
  return this.mirror.data;
}

/**
 * Solves A.x = b
 * @param A
 * @param b
 * @return x
 */
 var exports = {};
exports.solve = function solve(A, b) {
  var result = new Mat(A,b).gauss();
  if (result.length > 0 && result[0].length === 1) {
    // Convert Nx1 matrices to simple javascript arrays
    for (var i=0; i<result.length; i++) result[i] = result[i][0];
  }
  return result;
}

function identity(n) {
  var id = new Array(n);
  for (var i=0; i<n; i++) {
    id[i] = new Array(n);
    for (var j=0; j<n; j++) {
      id[i][j] = (i === j) ? 1 : 0;
    }
  }
  return id;
}

/**
 * invert a matrix
 */
exports.invert = function invert(A) {
  return new Mat(A, identity(A.length)).gauss();
}

return exports;
})();

var Typr=function(){var U={};U.parse=function(h){var d=function(L,k,B,e){var T=U.B,i=U.T,$={cmap:i.c,head:i.head,hhea:i.aN,maxp:i.aa,hmtx:i.a4,name:i.name,"OS/2":i.g,post:i.a$,loca:i.b5,kern:i.U,glyf:i.A,"CFF ":i.$,"SVG ":i.am,COLR:i.aD,CPAL:i.aA},x={_data:L,_index:k,_offset:B};
for(var m in $){var u=U.findTable(L,m,B);if(u){var z=u[0],F=e[z];if(F==null)F=$[m].v(L,z,u[1],x);x[m]=e[z]=F}}return x},T=U.B,L=new Uint8Array(h),e={},G=T.z(L,0,4);
if(G=="ttcf"){var B=4,f=T.d(L,B);B+=2;var O=T.d(L,B);B+=2;var s=T.u(L,B);B+=4;var Y=[];for(var A=0;A<s;
A++){var t=T.u(L,B);B+=4;Y.push(d(L,A,t,e))}return Y}else return[d(L,0,0,e)]};U.findTable=function(h,d,T){var L=U.B,e=L.d(h,T+4),G=T+12;
for(var B=0;B<e;B++){var O=L.z(h,G,4),s=L.u(h,G+4),Y=L.u(h,G+8),A=L.u(h,G+12);if(O==d)return[Y,A];G+=16}return null};
U.T={};U.B={p:function(h,d){return(h[d]<<8|h[d+1])+(h[d+2]<<8|h[d+3])/(256*256+4)},i:function(h,d){var T=U.B.M(h,d);
return T/16384},o:function(h,d){var T=U.B.T.r;T[0]=h[d+3];T[1]=h[d+2];T[2]=h[d+1];T[3]=h[d];return U.B.T.ao[0]},Q:function(h,d){var T=U.B.T.r;
T[0]=h[d];return U.B.T.ac[0]},M:function(h,d){var T=U.B.T.r;T[1]=h[d];T[0]=h[d+1];return U.B.T.aT[0]},d:function(h,d){return h[d]<<8|h[d+1]},aR:function(h,d,T){h[d]=T>>8&255;
h[d+1]=T&255},ae:function(h,d,T){var L=[];for(var e=0;e<T;e++){var G=U.B.d(h,d+e*2);L.push(G)}return L},u:function(h,d){var T=U.B.T.r;
T[3]=h[d];T[2]=h[d+1];T[1]=h[d+2];T[0]=h[d+3];return U.B.T.aV[0]},a6:function(h,d,T){h[d]=T>>24&255;
h[d+1]=T>>16&255;h[d+2]=T>>8&255;h[d+3]=T>>0&255},f:function(h,d){return U.B.u(h,d)*(4294967295+1)+U.B.u(h,d+4)},z:function(h,d,T){var L="";
for(var e=0;e<T;e++)L+=String.fromCharCode(h[d+e]);return L},aC:function(h,d,T){for(var L=0;L<T.length;
L++)h[d+L]=T.charCodeAt(L)},F:function(h,d,T){var L="";for(var e=0;e<T;e++){var G=h[d++]<<8|h[d++];L+=String.fromCharCode(G)}return L},au:window.TextDecoder?new window.TextDecoder:null,a7:function(h,d,T){var L=U.B.au;
if(L&&d==0&&T==h.length)return L.decode(h);return U.B.z(h,d,T)},L:function(h,d,T){var L=[];for(var e=0;
e<T;e++)L.push(h[d+e]);return L},aJ:function(h,d,T){var L=[];for(var e=0;e<T;e++)L.push(String.fromCharCode(h[d+e]));
return L},T:function(){var h=new ArrayBuffer(8);return{ah:h,ac:new Int8Array(h),r:new Uint8Array(h),aT:new Int16Array(h),b2:new Uint16Array(h),ao:new Int32Array(h),aV:new Uint32Array(h)}}()};
U.T.$={v:function(h,d,T){var L=U.B,e=U.T.$;h=new Uint8Array(h.buffer,d,T);d=0;var G=h[d];d++;var B=h[d];
d++;var f=h[d];d++;var O=h[d];d++;var s=[];d=e.k(h,d,s);var Y=[];for(var A=0;A<s.length-1;A++)Y.push(L.z(h,d+s[A],s[A+1]-s[A]));
d+=s[s.length-1];var t=[];d=e.k(h,d,t);var k=[];for(var A=0;A<t.length-1;A++)k.push(e.O(h,d+t[A],d+t[A+1]));
d+=t[t.length-1];var i=k[0],$=[];d=e.k(h,d,$);var x=[];for(var A=0;A<$.length-1;A++)x.push(L.z(h,d+$[A],$[A+1]-$[A]));
d+=$[$.length-1];e.K(h,d,i);if(i.CharStrings)i.CharStrings=e.L(h,i.CharStrings);if(i.ROS){d=i.FDArray;
var m=[];d=e.k(h,d,m);i.FDArray=[];for(var A=0;A<m.length-1;A++){var n=e.O(h,d+m[A],d+m[A+1]);e.I(h,n,x);
i.FDArray.push(n)}d+=m[m.length-1];d=i.FDSelect;i.FDSelect=[];var u=h[d];d++;if(u==3){var z=L.d(h,d);
d+=2;for(var A=0;A<z+1;A++){i.FDSelect.push(L.d(h,d),h[d+2]);d+=3}}else throw u}if(i.charset)i.charset=e.a0(h,i.charset,i.CharStrings.length);
e.I(h,i,x);return i},I:function(h,d,T){var L=U.T.$,e;if(d.Private){e=d.Private[1];d.Private=L.O(h,e,e+d.Private[0]);
if(d.Private.Subrs)L.K(h,e+d.Private.Subrs,d.Private)}for(var G in d)if("FamilyName FontName FullName Notice version Copyright".split(" ").indexOf(G)!=-1)d[G]=T[d[G]-426+35]},K:function(h,d,T){T.Subrs=U.T.$.L(h,d);
var L,e=T.Subrs.length+1;if(!1)L=0;else if(e<1240)L=107;else if(e<33900)L=1131;else L=32768;T.Bias=L},L:function(h,d){var T=U.B,L=[];
d=U.T.$.k(h,d,L);var e=[],G=L.length-1,B=h.byteOffset+d;for(var f=0;f<G;f++){var O=L[f];e.push(new Uint8Array(h.buffer,B+O,L[f+1]-O))}return e},a_:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],b6:function(h,d){for(var T=0;
T<h.charset.length;T++)if(h.charset[T]==d)return T;return-1},Y:function(h,d){if(d<0||d>255)return-1;
return U.T.$.b6(h,U.T.$.a_[d])},a0:function(h,d,T){var L=U.B,e=[".notdef"],G=h[d];d++;if(G==0){for(var B=0;
B<T;B++){var O=L.d(h,d);d+=2;e.push(O)}}else if(G==1||G==2){while(e.length<T){var O=L.d(h,d),s=0;d+=2;
if(G==1){s=h[d];d++}else{s=L.d(h,d);d+=2}for(var B=0;B<=s;B++){e.push(O);O++}}}else throw"error: format: "+G;
return e},k:function(h,d,T){var L=U.B,e=L.d(h,d)+1;d+=2;var G=h[d];d++;if(G==1)for(var B=0;B<e;B++)T.push(h[d+B]);
else if(G==2)for(var B=0;B<e;B++)T.push(L.d(h,d+B*2));else if(G==3)for(var B=0;B<e;B++)T.push(L.u(h,d+B*3-1)&16777215);
else if(G==4)for(var B=0;B<e;B++)T.push(L.u(h,d+B*4));else if(e!=1)throw"unsupported offset size: "+G+", count: "+e;
d+=e*G;return d-1},aP:function(h,d,T){var L=U.B,e=h[d],G=h[d+1],B=h[d+2],f=h[d+3],O=h[d+4],s=1,Y=null,A=null;
if(e<=20){Y=e;s=1}if(e==12){Y=e*100+G;s=2}if(21<=e&&e<=27){Y=e;s=1}if(e==28){A=L.M(h,d+1);s=3}if(29<=e&&e<=31){Y=e;
s=1}if(32<=e&&e<=246){A=e-139;s=1}if(247<=e&&e<=250){A=(e-247)*256+G+108;s=2}if(251<=e&&e<=254){A=-(e-251)*256-G-108;
s=2}if(e==255){A=L.o(h,d+1)/65535;s=5}T.aY=A!=null?A:"o"+Y;T.size=s},aM:function(h,d,T){var L=d+T,e=U.B,G=[];
while(d<L){var B=h[d],f=h[d+1],O=h[d+2],s=h[d+3],Y=h[d+4],A=1,t=null,k=null;if(B<=20){t=B;A=1}if(B==12){t=B*100+f;
A=2}if(B==19||B==20){t=B;A=2}if(21<=B&&B<=27){t=B;A=1}if(B==28){k=e.M(h,d+1);A=3}if(29<=B&&B<=31){t=B;
A=1}if(32<=B&&B<=246){k=B-139;A=1}if(247<=B&&B<=250){k=(B-247)*256+f+108;A=2}if(251<=B&&B<=254){k=-(B-251)*256-f-108;
A=2}if(B==255){k=e.o(h,d+1)/65535;A=5}G.push(k!=null?k:"o"+t);d+=A}return G},O:function(h,d,T){var L=U.B,e={},G=[];
while(d<T){var B=h[d],f=h[d+1],O=h[d+2],s=h[d+3],Y=h[d+4],A=1,t=null,k=null;if(B==28){k=L.M(h,d+1);A=3}if(B==29){k=L.o(h,d+1);
A=5}if(32<=B&&B<=246){k=B-139;A=1}if(247<=B&&B<=250){k=(B-247)*256+f+108;A=2}if(251<=B&&B<=254){k=-(B-251)*256-f-108;
A=2}if(B==255){k=L.o(h,d+1)/65535;A=5;throw"unknown number"}if(B==30){var i=[],n="";A=1;while(!0){var $=h[d+A];
A++;var x=$>>4,m=$&15;if(x!=15)i.push(x);if(m!=15)i.push(m);if(m==15)break}var u=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"];
for(var z=0;z<i.length;z++)n+=u[i[z]];k=parseFloat(n)}if(B<=21){var F="version Notice FullName FamilyName Weight FontBBox BlueValues OtherBlues FamilyBlues FamilyOtherBlues StdHW StdVW escape UniqueID XUID charset Encoding CharStrings Private Subrs defaultWidthX nominalWidthX".split(" ");
t=F[B];A=1;if(B==12){var F="Copyright isFixedPitch ItalicAngle UnderlinePosition UnderlineThickness PaintType CharstringType FontMatrix StrokeWidth BlueScale BlueShift BlueFuzz StemSnapH StemSnapV ForceBold   LanguageGroup ExpansionFactor initialRandomSeed SyntheticBase PostScript BaseFontName BaseFontBlend       ROS CIDFontVersion CIDFontRevision CIDFontType CIDCount UIDBase FDArray FDSelect FontName".split(" ");
t=F[f];A=2}}if(t!=null){e[t]=G.length==1?G[0]:G;G=[]}else G.push(k);d+=A}return e}};U.T.c={v:function(h,d,T){var L={C:[],e:{},a8:d};
h=new Uint8Array(h.buffer,d,T);d=0;var e=d,G=U.B,B=G.d,f=U.T.c,O=B(h,d);d+=2;var s=B(h,d);d+=2;var Y=[];
for(var A=0;A<s;A++){var t=B(h,d);d+=2;var k=B(h,d);d+=2;var i=G.u(h,d);d+=4;var $="p"+t+"e"+k,x=Y.indexOf(i);
if(x==-1){x=L.C.length;var m={};Y.push(i);var n=m.aw=B(h,i);if(n==0)m=f.aj(h,i,m);else if(n==4)m=f.aK(h,i,m);
else if(n==6)m=f.av(h,i,m);else if(n==12)m=f.an(h,i,m);L.C.push(m)}if(L.e[$]!=null)throw"multiple tables for one platform+encoding";
L.e[$]=x}return L},aj:function(h,d,T){var L=U.B;d+=2;var e=L.d(h,d);d+=2;var G=L.d(h,d);d+=2;T.map=[];
for(var B=0;B<e-6;B++)T.map.push(h[d+B]);return T},aK:function(h,d,T){var L=U.B,e=L.d,G=L.ae,B=d;d+=2;
var f=e(h,d);d+=2;var O=e(h,d);d+=2;var s=e(h,d);d+=2;var Y=s>>>1;T.az=e(h,d);d+=2;T.ad=e(h,d);d+=2;
T.ar=e(h,d);d+=2;T.aL=G(h,d,Y);d+=Y*2;d+=2;T.af=G(h,d,Y);d+=Y*2;T.aB=[];for(var A=0;A<Y;A++){T.aB.push(L.M(h,d));
d+=2}T.m=G(h,d,Y);d+=Y*2;T.R=G(h,d,B+f-d>>>1);return T},av:function(h,d,T){var L=U.B,e=d;d+=2;var G=L.d(h,d);
d+=2;var B=L.d(h,d);d+=2;T.aU=L.d(h,d);d+=2;var f=L.d(h,d);d+=2;T.R=[];for(var O=0;O<f;O++){T.R.push(L.d(h,d));
d+=2}return T},an:function(h,d,T){var L=U.B,e=L.u,G=d;d+=4;var B=e(h,d);d+=4;var f=e(h,d);d+=4;var O=e(h,d)*3;
d+=4;var s=T.a9=new Uint32Array(O);for(var Y=0;Y<O;Y+=3){s[Y]=e(h,d+(Y<<2));s[Y+1]=e(h,d+(Y<<2)+4);s[Y+2]=e(h,d+(Y<<2)+8)}return T}};
U.T.A={v:function(h,d,T,L){var e=[],G=L.maxp.numGlyphs;for(var B=0;B<G;B++)e.push(null);return e},a2:function(h,d){var T=U.B,L=h._data,e=h.loca;
if(e[d]==e[d+1])return null;var B=U.findTable(L,"glyf",h._offset)[0]+e[d],f={};f.j=T.M(L,B);B+=2;f.as=T.M(L,B);
B+=2;f.ag=T.M(L,B);B+=2;f.ak=T.M(L,B);B+=2;f.at=T.M(L,B);B+=2;if(f.as>=f.ak||f.ag>=f.at)return null;
if(f.j>0){f.h=[];for(var O=0;O<f.j;O++){f.h.push(T.d(L,B));B+=2}var s=T.d(L,B),x=0,m=0;B+=2;if(L.length-B<s)return null;
f.ai=T.L(L,B,s);B+=s;var Y=f.h[f.j-1]+1;f.s=[];for(var O=0;O<Y;O++){var A=L[B];B++;f.s.push(A);if((A&8)!=0){var t=L[B];
B++;for(var k=0;k<t;k++){f.s.push(A);O++}}}f.V=[];for(var O=0;O<Y;O++){var i=(f.s[O]&2)!=0,$=(f.s[O]&16)!=0;
if(i){f.V.push($?L[B]:-L[B]);B++}else{if($)f.V.push(0);else{f.V.push(T.M(L,B));B+=2}}}f.S=[];for(var O=0;
O<Y;O++){var i=(f.s[O]&4)!=0,$=(f.s[O]&32)!=0;if(i){f.S.push($?L[B]:-L[B]);B++}else{if($)f.S.push(0);
else{f.S.push(T.M(L,B));B+=2}}}for(var O=0;O<Y;O++){x+=f.V[O];m+=f.S[O];f.V[O]=x;f.S[O]=m}}else{var n=1<<0,u=1<<1,z=1<<2,F=1<<3,H=1<<4,b=1<<5,g=1<<6,j=1<<7,K=1<<8,J=1<<9,y=1<<10,l=1<<11,D=1<<12,Q;
f.W=[];do{Q=T.d(L,B);B+=2;var o={X:{a:1,b0:0,aF:0,_:1,aS:0,b1:0},aE:-1,b3:-1};f.W.push(o);o.al=T.d(L,B);
B+=2;if(Q&n){var p=T.M(L,B);B+=2;var r=T.M(L,B);B+=2}else{var p=T.Q(L,B);B++;var r=T.Q(L,B);B++}if(Q&u){o.X.aS=p;
o.X.b1=r}else{o.aE=p;o.b3=r}if(Q&F){o.X.a=o.X._=T.i(L,B);B+=2}else if(Q&g){o.X.a=T.i(L,B);B+=2;o.X._=T.i(L,B);
B+=2}else if(Q&j){o.X.a=T.i(L,B);B+=2;o.X.b0=T.i(L,B);B+=2;o.X.aF=T.i(L,B);B+=2;o.X._=T.i(L,B);B+=2}}while(Q&b);
if(Q&K){var a9=T.d(L,B);B+=2;f.a3=[];for(var O=0;O<a9;O++){f.a3.push(L[B]);B++}}}return f}};U.T.head={v:function(h,d,T){var L=U.B,e={},G=L.p(h,d);
d+=4;e.fontRevision=L.p(h,d);d+=4;var B=L.u(h,d);d+=4;var f=L.u(h,d);d+=4;e.flags=L.d(h,d);d+=2;e.unitsPerEm=L.d(h,d);
d+=2;e.created=L.f(h,d);d+=8;e.modified=L.f(h,d);d+=8;e.xMin=L.M(h,d);d+=2;e.yMin=L.M(h,d);d+=2;e.xMax=L.M(h,d);
d+=2;e.yMax=L.M(h,d);d+=2;e.macStyle=L.d(h,d);d+=2;e.lowestRecPPEM=L.d(h,d);d+=2;e.fontDirectionHint=L.M(h,d);
d+=2;e.indexToLocFormat=L.M(h,d);d+=2;e.glyphDataFormat=L.M(h,d);d+=2;return e}};U.T.aN={v:function(h,d,T){var L=U.B,e={},G=L.p(h,d);
d+=4;var B="ascender descender lineGap advanceWidthMax minLeftSideBearing minRightSideBearing xMaxExtent caretSlopeRise caretSlopeRun caretOffset res0 res1 res2 res3 metricDataFormat numberOfHMetrics".split(" ");
for(var f=0;f<B.length;f++){var O=B[f],s=O=="advanceWidthMax"||O=="numberOfHMetrics"?L.d:L.M;e[O]=s(h,d+f*2)}return e}};
U.T.a4={v:function(h,d,T,L){var e=U.B,G=[],B=[],f=L.maxp.numGlyphs,O=L.hhea.numberOfHMetrics,s=0,Y=0,A=0;
while(A<O){s=e.d(h,d+(A<<2));Y=e.M(h,d+(A<<2)+2);G.push(s);B.push(Y);A++}while(A<f){G.push(s);B.push(Y);
A++}return{b4:G,a5:B}}};U.T.U={v:function(h,d,T,L){var e=U.B,G=U.T.U,B=e.d(h,d);if(B==1)return G.aO(h,d,T,L);
var f=e.d(h,d+2);d+=4;var O={P:[],Z:[]};for(var s=0;s<f;s++){d+=2;var T=e.d(h,d);d+=2;var Y=e.d(h,d);
d+=2;var A=Y>>>8;A&=15;if(A==0)d=G.H(h,d,O)}return O},aO:function(h,d,T,L){var e=U.B,G=U.T.U,B=e.p(h,d),f=e.u(h,d+4);
d+=8;var O={P:[],Z:[]};for(var s=0;s<f;s++){var T=e.u(h,d);d+=4;var Y=e.d(h,d);d+=2;var A=e.d(h,d);d+=2;
var t=Y&255;if(t==0)d=G.H(h,d,O)}return O},H:function(h,d,T){var L=U.B,e=L.d,G=-1,B=e(h,d),f=e(h,d+2),O=e(h,d+4),s=e(h,d+6);
d+=8;for(var Y=0;Y<B;Y++){var A=e(h,d);d+=2;var t=e(h,d);d+=2;var k=L.M(h,d);d+=2;if(A!=G){T.P.push(A);
T.Z.push({aG:[],aZ:[]})}var i=T.Z[T.Z.length-1];i.aG.push(t);i.aZ.push(k);G=A}return d}};U.T.b5={v:function(h,d,T,L){var e=U.B,G=[],B=L.head.indexToLocFormat,f=L.maxp.numGlyphs+1;
if(B==0)for(var O=0;O<f;O++)G.push(e.d(h,d+(O<<1))<<1);if(B==1)for(var O=0;O<f;O++)G.push(e.u(h,d+(O<<2)));
return G}};U.T.aa={v:function(h,d,T){var L=U.B,e=L.d,G={},B=L.u(h,d);d+=4;G.numGlyphs=e(h,d);d+=2;return G}};
U.T.name={v:function(h,d,T){var L=U.B,e={},G=L.d(h,d),F="postScriptName",V;d+=2;var B=L.d(h,d);d+=2;
var f=L.d(h,d);d+=2;var O="copyright fontFamily fontSubfamily ID fullName version postScriptName trademark manufacturer designer description urlVendor urlDesigner licence licenceURL --- typoFamilyName typoSubfamilyName compatibleFull sampleText postScriptCID wwsFamilyName wwsSubfamilyName lightPalette darkPalette".split(" "),s=d,Y=L.d;
for(var A=0;A<B;A++){var t=Y(h,d),u;d+=2;var k=Y(h,d);d+=2;var i=Y(h,d);d+=2;var $=Y(h,d);d+=2;var x=Y(h,d);
d+=2;var m=Y(h,d);d+=2;var n=s+B*12+m;if(!1){}else if(t==0)u=L.F(h,n,x/2);else if(t==3&&k==0)u=L.F(h,n,x/2);
else if(k==0)u=L.z(h,n,x);else if(k==1)u=L.F(h,n,x/2);else if(k==3)u=L.F(h,n,x/2);else if(k==4)u=L.F(h,n,x/2);
else if(k==10)u=L.F(h,n,x/2);else if(t==1){u=L.z(h,n,x);console.log("reading unknown MAC encoding "+k+" as ASCII")}else{console.log("unknown encoding "+k+", platformID: "+t);
u=L.z(h,n,x)}var z="p"+t+","+i.toString(16);if(e[z]==null)e[z]={};e[z][O[$]]=u;e[z]._lang=i}for(var a in e)if(e[a][F]!=null&&e[a]._lang==1033)return e[a];
for(var a in e)if(e[a][F]!=null&&e[a]._lang==0)return e[a];for(var a in e)if(e[a][F]!=null&&e[a]._lang==3084)return e[a];
for(var a in e)if(e[a][F]!=null)return e[a];for(var a in e){V=e[a];break}console.log("returning name table with languageID "+V.ay);
if(V[F]==null&&V.ID!=null)V[F]=V.ID;return V}};U.T.g={v:function(h,d,T){var L=U.B,e=L.d(h,d);d+=2;var G=U.T.g,B={};
if(e==0)G.n(h,d,B);else if(e==1)G.q(h,d,B);else if(e==2||e==3||e==4)G.ax(h,d,B);else if(e==5)G.ab(h,d,B);
else throw"unknown OS/2 table version: "+e;return B},n:function(h,d,T){var L=U.B;T.xAvgCharWidth=L.M(h,d);
d+=2;T.usWeightClass=L.d(h,d);d+=2;T.usWidthClass=L.d(h,d);d+=2;T.fsType=L.d(h,d);d+=2;T.ySubscriptXSize=L.M(h,d);
d+=2;T.ySubscriptYSize=L.M(h,d);d+=2;T.ySubscriptXOffset=L.M(h,d);d+=2;T.ySubscriptYOffset=L.M(h,d);
d+=2;T.ySuperscriptXSize=L.M(h,d);d+=2;T.ySuperscriptYSize=L.M(h,d);d+=2;T.ySuperscriptXOffset=L.M(h,d);
d+=2;T.ySuperscriptYOffset=L.M(h,d);d+=2;T.yStrikeoutSize=L.M(h,d);d+=2;T.yStrikeoutPosition=L.M(h,d);
d+=2;T.sFamilyClass=L.M(h,d);d+=2;T.panose=L.L(h,d,10);d+=10;T.ulUnicodeRange1=L.u(h,d);d+=4;T.ulUnicodeRange2=L.u(h,d);
d+=4;T.ulUnicodeRange3=L.u(h,d);d+=4;T.ulUnicodeRange4=L.u(h,d);d+=4;T.achVendID=L.z(h,d,4);d+=4;T.fsSelection=L.d(h,d);
d+=2;T.usFirstCharIndex=L.d(h,d);d+=2;T.usLastCharIndex=L.d(h,d);d+=2;T.sTypoAscender=L.M(h,d);d+=2;
T.sTypoDescender=L.M(h,d);d+=2;T.sTypoLineGap=L.M(h,d);d+=2;T.usWinAscent=L.d(h,d);d+=2;T.usWinDescent=L.d(h,d);
d+=2;return d},q:function(h,d,T){var L=U.B;d=U.T.g.n(h,d,T);T.ulCodePageRange1=L.u(h,d);d+=4;T.ulCodePageRange2=L.u(h,d);
d+=4;return d},ax:function(h,d,T){var L=U.B,e=L.d;d=U.T.g.q(h,d,T);T.sxHeight=L.M(h,d);d+=2;T.sCapHeight=L.M(h,d);
d+=2;T.usDefault=e(h,d);d+=2;T.usBreak=e(h,d);d+=2;T.usMaxContext=e(h,d);d+=2;return d},ab:function(h,d,T){var L=U.B.d;
d=U.T.g.ax(h,d,T);T.usLowerOpticalPointSize=L(h,d);d+=2;T.usUpperOpticalPointSize=L(h,d);d+=2;return d}};
U.T.a$={v:function(h,d,T){var L=U.B,e={};e.version=L.p(h,d);d+=4;e.italicAngle=L.p(h,d);d+=4;e.underlinePosition=L.M(h,d);
d+=2;e.underlineThickness=L.M(h,d);d+=2;return e}};U.T.am={v:function(h,d,T){var L=U.B,e={entries:[]},G=d,B=L.d(h,d);
d+=2;var f=L.u(h,d);d+=4;var O=L.u(h,d);d+=4;d=f+G;var s=L.d(h,d);d+=2;for(var Y=0;Y<s;Y++){var A=L.d(h,d);
d+=2;var t=L.d(h,d);d+=2;var k=L.u(h,d);d+=4;var i=L.u(h,d);d+=4;var $=new Uint8Array(h.buffer,G+k+f,i),x=L.a7($,0,$.length);
for(var m=A;m<=t;m++){e.entries[m]=x}}return e}};U.T.aD={v:function(h,d,T){var L=U.B,e=d;d+=2;var G=L.d(h,d);
d+=2;var B=L.u(h,d);d+=4;var f=L.u(h,d);d+=4;var O=L.d(h,d);d+=2;var s={},Y=e+B;for(var A=0;A<G;A++){s["g"+L.d(h,Y)]=[L.d(h,Y+2),L.d(h,Y+4)];
Y+=6}var t=[];Y=e+f;for(var A=0;A<O;A++){t.push(L.d(h,Y),L.d(h,Y+2));Y+=4}return[s,t]}};U.T.aA={v:function(h,d,T){var L=U.B,e=d,G=L.d(h,d);
d+=2;if(G==0){var B=L.d(h,d);d+=2;var f=L.d(h,d);d+=2;var O=L.d(h,d);d+=2;var s=L.u(h,d);d+=4;return new Uint8Array(h.buffer,e+s,O*4)}else throw G}};
U.U={shape:function(h,d,T){var L=function(h,e,i,T){var $=e[i],x=e[i+1],m=h.kern;if(m){var n=m.P.indexOf($);
if(n!=-1){var u=m.Z[n].aG.indexOf(x);if(u!=-1)return[0,0,m.Z[n].aZ[u],0]}}return[0,0,0,0]},e=[],s=0,Y=0;
for(var G=0;G<d.length;G++){var B=d.codePointAt(G);if(B>65535)G++;e.push(U.U.codeToGlyph(h,B))}var O=[];
for(var G=0;G<e.length;G++){var A=L(h,e,G,T),t=e[G],k=h.hmtx.b4[t]+A[2];O.push({g:t,cl:G,dx:0,dy:0,ax:k,ay:0});
s+=k}return O},shapeToPath:function(h,d,T){var L={B:[],b:[]},e=0,G=0;for(var B=0;B<d.length;B++){var O=d[B],s=U.U.glyphToPath(h,O.g),Y=s.crds;
for(var A=0;A<Y.length;A+=2){L.b.push(Y[A]+e+O.dx);L.b.push(Y[A+1]+G+O.dy)}if(T)L.B.push(T);for(var A=0;
A<s.cmds.length;A++)L.B.push(s.cmds[A]);var t=L.B.length;if(T)if(t!=0&&L.B[t-1]!="X")L.B.push("X");e+=O.ax;
G+=O.ay}return{cmds:L.B,crds:L.b}},codeToGlyph:function(h,d){var T=h.cmap,L=-1,e="p3e10 p0e4 p3e1 p1e0 p0e3 p0e1".split(" ");
for(var G=0;G<e.length;G++)if(T.e[e[G]]!=null){L=T.e[e[G]];break}if(L==-1)throw"no familiar platform and encoding!";
var B=function($,u,z){var F=0,a=Math.floor($.length/u);while(F+1!=a){var V=F+(a-F>>>1);if($[V*u]<=z)F=V;
else a=V}return F*u},O=T.C[L],s=O.aw,Y=-1;if(s==0){if(d>=O.map.length)Y=0;else Y=O.map[d]}else if(s==4){var A=-1,t=O.aL;
if(d>t[t.length-1])A=-1;else{A=B(t,1,d);if(t[A]<d)A++}if(A==-1)Y=0;else if(d<O.af[A])Y=0;else{var k=0;
if(O.m[A]!=0)k=O.R[d-O.af[A]+(O.m[A]>>1)-(O.m.length-A)];else k=d+O.aB[A];Y=k&65535}}else if(s==6){var i=d-O.aU,$=O.R;
if(i<0||i>=$.length)Y=0;else Y=$[i]}else if(s==12){var x=O.a9;if(d>x[x.length-2])Y=0;else{var G=B(x,3,d);
if(x[G]<=d&&d<=x[G+1]){Y=x[G+2]+(d-x[G])}if(Y==-1)Y=0}}else throw"unknown cmap table format "+O.aw;var m=h["SVG "],n=h.loca;
if(Y!=0&&h["CFF "]==null&&(m==null||m.entries[Y]==null)&&n[Y]==n[Y+1]&&[9,10,11,12,13,32,133,160,5760,8232,8233,8239,12288,6158,8203,8204,8205,8288,65279].indexOf(d)==-1&&!(8192<=d&&d<=8202))Y=0;
return Y},glyphToPath:function(h,d){var T={B:[],b:[]},L=h["SVG "],e=h["CFF "],G=h.COLR,B=U.U;if(L&&L.entries[d]){var f=L.entries[d];
if(f!=null){if(typeof f=="string"){f=B.SVG.b7(f);L.entries[d]=f}T=f}}else if(G&&G[0]["g"+d]){function O(F){var a=F.toString(16);
return(a.length==1?"0":"")+a}var s=h.CPAL,Y=G[0]["g"+d];for(var A=0;A<Y[1];A++){var t=Y[0]+A,k=G[1][2*t],$=G[1][2*t+1]*4,x=U.U.glyphToPath(h,k),m="#"+O(s[$+2])+O(s[$+1])+O(s[$+0]);
T.B.push(m);T.B=T.B.concat(x.cmds);T.b=T.b.concat(x.crds);T.B.push("X")}}else if(e){var n=e.Private,u={x:0,y:0,stack:[],N:0,w:!1,width:n?n.defaultWidthX:0,open:!1};
if(e.ROS){var z=0;while(e.FDSelect[z+2]<=d)z+=2;n=e.FDArray[e.FDSelect[z+1]].Private}B._drawCFF(e.CharStrings[d],u,e,n,T)}else if(h.glyf){B._drawGlyf(d,h,T)}return{cmds:T.B,crds:T.b}},_drawGlyf:function(h,d,T){var L=d.glyf[h];
if(L==null)L=d.glyf[h]=U.T.A.a2(d,h);if(L!=null){if(L.j>-1)U.U._simpleGlyph(L,T);else U.U._compoGlyph(L,d,T)}},_simpleGlyph:function(h,d){var T=U.U.P;
for(var L=0;L<h.j;L++){var e=L==0?0:h.h[L-1]+1,G=h.h[L];for(var B=e;B<=G;B++){var O=B==e?G:B-1,s=B==G?e:B+1,Y=h.s[B]&1,A=h.s[O]&1,t=h.s[s]&1,k=h.V[B],$=h.S[B];
if(B==e){if(Y){if(A)T.G(d,h.V[O],h.S[O]);else{T.G(d,k,$);continue}}else{if(A)T.G(d,h.V[O],h.S[O]);else T.G(d,Math.floor((h.V[O]+k)*.5),Math.floor((h.S[O]+$)*.5))}}if(Y){if(A)T.J(d,k,$)}else{if(t)T.aq(d,k,$,h.V[s],h.S[s]);
else T.aq(d,k,$,Math.floor((k+h.V[s])*.5),Math.floor(($+h.S[s])*.5))}}T.D(d)}},_compoGlyph:function(h,d,T){for(var L=0;
L<h.W.length;L++){var e={B:[],b:[]},G=h.W[L];U.U._drawGlyf(G.al,d,e);var B=G.X;for(var f=0;f<e.b.length;
f+=2){var s=e.b[f],Y=e.b[f+1];T.b.push(s*B.a+Y*B.b0+B.aS);T.b.push(s*B.aF+Y*B._+B.b1)}for(var f=0;f<e.B.length;
f++)T.B.push(e.B[f])}},pathToSVG:function(h,d){var T=h.cmds,L=h.crds,G=0;if(d==null)d=5;var e=[],B={M:2,L:2,Q:4,C:6};
for(var f=0;f<T.length;f++){var O=T[f],s=G+(B[O]?B[O]:0);e.push(O);while(G<s){var Y=L[G++];e.push(parseFloat(Y.toFixed(d))+(G==s?"":" "))}}return e.join("")},SVGToPath:function(h){var d={B:[],b:[]};
U.U.SVG.a1(h,d);return{cmds:d.B,crds:d.b}},pathToContext:function(h,d){var T=0,L=h.cmds,e=h.crds;for(var G=0;
G<L.length;G++){var B=L[G];if(B=="M"){d.moveTo(e[T],e[T+1]);T+=2}else if(B=="L"){d.lineTo(e[T],e[T+1]);
T+=2}else if(B=="C"){d.bezierCurveTo(e[T],e[T+1],e[T+2],e[T+3],e[T+4],e[T+5]);T+=6}else if(B=="Q"){d.quadraticCurveTo(e[T],e[T+1],e[T+2],e[T+3]);
T+=4}else if(B.charAt(0)=="#"){d.beginPath();d.fillStyle=B}else if(B=="Z"){d.closePath()}else if(B=="X"){d.fill()}}},P:{G:function(h,d,T){h.B.push("M");
h.b.push(d,T)},J:function(h,d,T){h.B.push("L");h.b.push(d,T)},l:function(h,d,T,L,e,G,B){h.B.push("C");
h.b.push(d,T,L,e,G,B)},aq:function(h,d,T,L,e){h.B.push("Q");h.b.push(d,T,L,e)},D:function(h){h.B.push("Z")}},_drawCFF:function(h,d,T,L,e){var G=d.stack,B=d.N,f=d.w,O=d.width,s=d.open,Y=0,A=d.x,t=d.y,k=0,$=0,x=0,m=0,n=0,u=0,z=0,F=0,H=0,b=0,g=U.T.$,j=U.U.P,K=L.nominalWidthX,J={aY:0,size:0};
while(Y<h.length){g.aP(h,Y,J);var y=J.aY;Y+=J.size;if(!1){}else if(y=="o1"||y=="o18"){var l;l=G.length%2!==0;
if(l&&!f){O=G.shift()+K}B+=G.length>>1;G.length=0;f=!0}else if(y=="o3"||y=="o23"){var l;l=G.length%2!==0;
if(l&&!f){O=G.shift()+K}B+=G.length>>1;G.length=0;f=!0}else if(y=="o4"){if(G.length>1&&!f){O=G.shift()+K;
f=!0}if(s)j.D(e);t+=G.pop();j.G(e,A,t);s=!0}else if(y=="o5"){while(G.length>0){A+=G.shift();t+=G.shift();
j.J(e,A,t)}}else if(y=="o6"||y=="o7"){var D=G.length,Q=y=="o6";for(var o=0;o<D;o++){var p=G.shift();
if(Q)A+=p;else t+=p;Q=!Q;j.J(e,A,t)}}else if(y=="o8"||y=="o24"){var D=G.length,r=0;while(r+6<=D){k=A+G.shift();
$=t+G.shift();x=k+G.shift();m=$+G.shift();A=x+G.shift();t=m+G.shift();j.l(e,k,$,x,m,A,t);r+=6}if(y=="o24"){A+=G.shift();
t+=G.shift();j.J(e,A,t)}}else if(y=="o11")break;else if(y=="o1234"||y=="o1235"||y=="o1236"||y=="o1237"){if(y=="o1234"){k=A+G.shift();
$=t;x=k+G.shift();m=$+G.shift();H=x+G.shift();b=m;n=H+G.shift();u=m;z=n+G.shift();F=t;A=z+G.shift();
j.l(e,k,$,x,m,H,b);j.l(e,n,u,z,F,A,t)}if(y=="o1235"){k=A+G.shift();$=t+G.shift();x=k+G.shift();m=$+G.shift();
H=x+G.shift();b=m+G.shift();n=H+G.shift();u=b+G.shift();z=n+G.shift();F=u+G.shift();A=z+G.shift();t=F+G.shift();
G.shift();j.l(e,k,$,x,m,H,b);j.l(e,n,u,z,F,A,t)}if(y=="o1236"){k=A+G.shift();$=t+G.shift();x=k+G.shift();
m=$+G.shift();H=x+G.shift();b=m;n=H+G.shift();u=m;z=n+G.shift();F=u+G.shift();A=z+G.shift();j.l(e,k,$,x,m,H,b);
j.l(e,n,u,z,F,A,t)}if(y=="o1237"){k=A+G.shift();$=t+G.shift();x=k+G.shift();m=$+G.shift();H=x+G.shift();
b=m+G.shift();n=H+G.shift();u=b+G.shift();z=n+G.shift();F=u+G.shift();if(Math.abs(z-A)>Math.abs(F-t)){A=z+G.shift()}else{t=F+G.shift()}j.l(e,k,$,x,m,H,b);
j.l(e,n,u,z,F,A,t)}}else if(y=="o14"){if(G.length>0&&!f){O=G.shift()+T.nominalWidthX;f=!0}if(G.length==4){var a9=0,_=G.shift(),I=G.shift(),ah=G.shift(),a6=G.shift(),ae=g.Y(T,ah),a4=g.Y(T,a6);
U.U._drawCFF(T.CharStrings[ae],d,T,L,e);d.x=_;d.y=I;U.U._drawCFF(T.CharStrings[a4],d,T,L,e)}if(s){j.D(e);
s=!1}}else if(y=="o19"||y=="o20"){var l;l=G.length%2!==0;if(l&&!f){O=G.shift()+K}B+=G.length>>1;G.length=0;
f=!0;Y+=B+7>>3}else if(y=="o21"){if(G.length>2&&!f){O=G.shift()+K;f=!0}t+=G.pop();A+=G.pop();if(s)j.D(e);
j.G(e,A,t);s=!0}else if(y=="o22"){if(G.length>1&&!f){O=G.shift()+K;f=!0}A+=G.pop();if(s)j.D(e);j.G(e,A,t);
s=!0}else if(y=="o25"){while(G.length>6){A+=G.shift();t+=G.shift();j.J(e,A,t)}k=A+G.shift();$=t+G.shift();
x=k+G.shift();m=$+G.shift();A=x+G.shift();t=m+G.shift();j.l(e,k,$,x,m,A,t)}else if(y=="o26"){if(G.length%2){A+=G.shift()}while(G.length>0){k=A;
$=t+G.shift();x=k+G.shift();m=$+G.shift();A=x;t=m+G.shift();j.l(e,k,$,x,m,A,t)}}else if(y=="o27"){if(G.length%2){t+=G.shift()}while(G.length>0){k=A+G.shift();
$=t;x=k+G.shift();m=$+G.shift();A=x+G.shift();t=m;j.l(e,k,$,x,m,A,t)}}else if(y=="o10"||y=="o29"){var C=y=="o10"?L:T;
if(G.length==0){console.log("error: empty stack")}else{var S=G.pop(),q=C.Subrs[S+C.Bias];d.x=A;d.y=t;
d.N=B;d.w=f;d.width=O;d.open=s;U.U._drawCFF(q,d,T,L,e);A=d.x;t=d.y;B=d.N;f=d.w;O=d.width;s=d.open}}else if(y=="o30"||y=="o31"){var D,X=G.length,r=0,c=y=="o31";
D=X&~2;r+=X-D;while(r<D){if(c){k=A+G.shift();$=t;x=k+G.shift();m=$+G.shift();t=m+G.shift();if(D-r==5){A=x+G.shift();
r++}else A=x;c=!1}else{k=A;$=t+G.shift();x=k+G.shift();m=$+G.shift();A=x+G.shift();if(D-r==5){t=m+G.shift();
r++}else t=m;c=!0}j.l(e,k,$,x,m,A,t);r+=4}}else if((y+"").charAt(0)=="o"){console.log("Unknown operation: "+y,h);
throw y}else G.push(y)}d.x=A;d.y=t;d.N=B;d.w=f;d.width=O;d.open=s},SVG:function(){var h={aW:function(Y){return Math.sqrt(Math.abs(Y[0]*Y[3]-Y[1]*Y[2]))},translate:function(Y,t,k){h.concat(Y,[1,0,0,1,t,k])},rotate:function(Y,t){h.concat(Y,[Math.cos(t),-Math.sin(t),Math.sin(t),Math.cos(t),0,0])},scale:function(Y,t,k){h.concat(Y,[t,0,0,k,0,0])},concat:function(Y,t){var k=Y[0],i=Y[1],$=Y[2],x=Y[3],m=Y[4],n=Y[5];
Y[0]=k*t[0]+i*t[2];Y[1]=k*t[1]+i*t[3];Y[2]=$*t[0]+x*t[2];Y[3]=$*t[1]+x*t[3];Y[4]=m*t[0]+n*t[2]+t[4];
Y[5]=m*t[1]+n*t[3]+t[5]},aQ:function(Y){var t=Y[0],k=Y[1],i=Y[2],$=Y[3],x=Y[4],m=Y[5],n=t*$-k*i;Y[0]=$/n;
Y[1]=-k/n;Y[2]=-i/n;Y[3]=t/n;Y[4]=(i*m-$*x)/n;Y[5]=(k*x-t*m)/n},aI:function(Y,t){var k=t[0],$=t[1];return[k*Y[0]+$*Y[2]+Y[4],k*Y[1]+$*Y[3]+Y[5]]},ap:function(Y,t){for(var k=0;
k<t.length;k+=2){var i=t[k],$=t[k+1];t[k]=i*Y[0]+$*Y[2]+Y[4];t[k+1]=i*Y[1]+$*Y[3]+Y[5]}}};function d(Y,A,t){var k=[],i=0,$=0,x=0;
while(!0){var m=Y.indexOf(A,$),n=Y.indexOf(t,$);if(m==-1&&n==-1)break;if(n==-1||m!=-1&&m<n){if(x==0){k.push(Y.slice(i,m).trim());
i=m+1}x++;$=m+1}else if(m==-1||n!=-1&&n<m){x--;if(x==0){k.push(Y.slice(i,n).trim());i=n+1}$=n+1}}return k}function T(Y){var A=d(Y,"{","}"),t={};
for(var k=0;k<A.length;k+=2){var i=A[k].split(",");for(var $=0;$<i.length;$++){var x=i[$].trim();if(t[x]==null)t[x]="";
t[x]+=A[k+1]}}return t}function L(Y){var A=d(Y,"(",")"),t=[1,0,0,1,0,0];for(var k=0;k<A.length;k+=2){var i=t;
t=e(A[k],A[k+1]);h.concat(t,i)}return t}function e(Y,A){var t=[1,0,0,1,0,0],k=!0;for(var i=0;i<A.length;
i++){var $=A.charAt(i);if($==","||$==" ")k=!0;else if($=="."){if(!k){A=A.slice(0,i)+","+A.slice(i);i++}k=!1}else if($=="-"&&i>0&&A[i-1]!="e"){A=A.slice(0,i)+" "+A.slice(i);
i++;k=!0}}A=A.split(/\s*[\s,]\s*/).map(parseFloat);if(!1){}else if(Y=="translate"){if(A.length==1)h.translate(t,A[0],0);
else h.translate(t,A[0],A[1])}else if(Y=="scale"){if(A.length==1)h.scale(t,A[0],A[0]);else h.scale(t,A[0],A[1])}else if(Y=="rotate"){var x=0,m=0;
if(A.length!=1){x=A[1];m=A[2]}h.translate(t,-x,-m);h.rotate(t,-Math.PI*A[0]/180);h.translate(t,x,m)}else if(Y=="matrix")t=A;
else console.log("unknown transform: ",Y);return t}function G(Y){var A={B:[],b:[]};if(Y==null)return A;
var t=new DOMParser,k=t.parseFromString(Y,"image/svg+xml"),i=k.getElementsByTagName("svg")[0],$=i.getAttribute("viewBox");
if($)$=$.trim().split(" ").map(parseFloat);else $=[0,0,1e3,1e3];B(i.children,A);for(var x=0;x<A.b.length;
x+=2){var m=A.b[x],n=A.b[x+1];m-=$[0];n-=$[1];n=-n;A.b[x]=m;A.b[x+1]=n}return A}function B(Y,A,t){for(var k=0;
k<Y.length;k++){var i=Y[k],$=i.tagName,x=i.getAttribute("fill");if(x==null)x=t;if($=="g"){var m={b:[],B:[]};
B(i.children,m,x);var n=i.getAttribute("transform");if(n){var u=L(n);h.ap(u,m.b)}A.b=A.b.concat(m.b);
A.B=A.B.concat(m.B)}else if($=="path"||$=="circle"||$=="ellipse"){A.B.push(x?x:"#000000");var z;if($=="path")z=i.getAttribute("d");
if($=="circle"||$=="ellipse"){var F=[0,0,0,0],a=["cx","cy","rx","ry","r"];for(var V=0;V<5;V++){var H=i.getAttribute(a[V]);
if(H){H=parseFloat(H);if(V<4)F[V]=H;else F[2]=F[3]=H}}var b=F[0],g=F[1],j=F[2],K=F[3];z=["M",b-j,g,"a",j,K,0,1,0,j*2,0,"a",j,K,0,1,0,-j*2,0].join(" ")}s(z,A);
A.B.push("X")}else if($=="defs"){}else console.log($,i)}}function f(Y){var A=[],t=0,k=!1,i="",$="",x="",m=0;
while(t<Y.length){var n=Y.charCodeAt(t),u=Y.charAt(t);t++;var z=48<=n&&n<=57||u=="."||u=="-"||u=="e"||u=="E";
if(k){if(u=="-"&&$!="e"||u=="."&&i.indexOf(".")!=-1||z&&(x=="a"||x=="A")&&(m%7==3||m%7==4)){A.push(parseFloat(i));
m++;i=u}else if(z)i+=u;else{A.push(parseFloat(i));m++;if(u!=","&&u!=" "){A.push(u);x=u;m=0}k=!1}}else{if(z){i=u;
k=!0}else if(u!=","&&u!=" "){A.push(u);x=u;m=0}}$=u}if(k)A.push(parseFloat(i));return A}function O(Y,A,t){var k=A;
while(k<Y.length){if(typeof Y[k]=="string")break;k+=t}return(k-A)/t}function s(Y,A){var t=f(Y),k=0,i=0,$=0,x=0,m=0,n=A.b.length,u={M:2,L:2,H:1,V:1,T:2,S:4,A:7,Q:4,C:6},z=A.B,F=A.b;
while(k<t.length){var H=t[k];k++;var b=H.toUpperCase();if(b=="Z"){z.push("Z");i=x;$=m}else{var g=u[b],j=O(t,k,g);
for(var K=0;K<j;K++){if(K==1&&b=="M"){H=H==b?"L":"l";b="L"}var J=0,y=0;if(H!=b){J=i;y=$}if(!1){}else if(b=="M"){i=J+t[k++];
$=y+t[k++];z.push("M");F.push(i,$);x=i;m=$}else if(b=="L"){i=J+t[k++];$=y+t[k++];z.push("L");F.push(i,$)}else if(b=="H"){i=J+t[k++];
z.push("L");F.push(i,$)}else if(b=="V"){$=y+t[k++];z.push("L");F.push(i,$)}else if(b=="Q"){var l=J+t[k++],D=y+t[k++],Q=J+t[k++],o=y+t[k++];
z.push("Q");F.push(l,D,Q,o);i=Q;$=o}else if(b=="T"){var p=Math.max(F.length-(z[z.length-1]=="Q"?4:2),n),l=i+i-F[p],D=$+$-F[p+1],Q=J+t[k++],o=y+t[k++];
z.push("Q");F.push(l,D,Q,o);i=Q;$=o}else if(b=="C"){var l=J+t[k++],D=y+t[k++],Q=J+t[k++],o=y+t[k++],r=J+t[k++],_=y+t[k++];
z.push("C");F.push(l,D,Q,o,r,_);i=r;$=_}else if(b=="S"){var p=Math.max(F.length-(z[z.length-1]=="C"?4:2),n),l=i+i-F[p],D=$+$-F[p+1],Q=J+t[k++],o=y+t[k++],r=J+t[k++],_=y+t[k++];
z.push("C");F.push(l,D,Q,o,r,_);i=r;$=_}else if(b=="A"){var l=i,D=$,I=t[k++],v=t[k++],ah=t[k++]*(Math.PI/180),a6=t[k++],ae=t[k++],Q=J+t[k++],o=y+t[k++];
if(Q==i&&o==$&&I==0&&v==0)continue;var a4=(l-Q)/2,C=(D-o)/2,S=Math.cos(ah),q=Math.sin(ah),X=S*a4+q*C,c=-q*a4+S*C,aa=I*I,a3=v*v,ar=X*X,at=c*c,ap=(aa*a3-aa*at-a3*ar)/(aa*at+a3*ar),af=(a6!=ae?1:-1)*Math.sqrt(Math.max(ap,0)),ao=af*(I*c)/v,a2=-af*(v*X)/I,aq=S*ao-q*a2+(l+Q)/2,a0=q*ao+S*a2+(D+o)/2,ab=function(R,P,M,E){var a5=Math.sqrt(R*R+P*P),N=Math.sqrt(M*M+E*E),as=(R*M+P*E)/(a5*N);
return(R*E-P*M>=0?1:-1)*Math.acos(Math.max(-1,Math.min(1,as)))},a7=(X-ao)/I,aj=(c-a2)/v,am=ab(1,0,a7,aj),au=ab(a7,aj,(-X-ao)/I,(-c-a2)/v);
au=au%(2*Math.PI);var ac=function(a8,i,$,R,P,M,E){var a5=function(w,Z){var an=Math.sin(Z),p=Math.cos(Z),Z=w[0],ai=w[1],ad=w[2],Y=w[3];
w[0]=Z*p+ai*an;w[1]=-Z*an+ai*p;w[2]=ad*p+Y*an;w[3]=-ad*an+Y*p},N=function(w,Z){for(var K=0;K<Z.length;
K+=2){var i=Z[K],$=Z[K+1];Z[K]=w[0]*i+w[2]*$+w[4];Z[K+1]=w[1]*i+w[3]*$+w[5]}},as=function(w,Z){for(var K=0;
K<Z.length;K++)w.push(Z[K])},a1=function(w,R){as(w.B,R.B);as(w.b,R.b)};if(E)while(M>P)M-=2*Math.PI;else while(M<P)M+=2*Math.PI;
var ag=(M-P)/4,ak=Math.cos(ag/2),al=-Math.sin(ag/2),l=(4-ak)/3,D=al==0?al:(1-ak)*(3-ak)/(3*al),Q=l,o=-D,r=ak,_=-al,g=[l,D,Q,o,r,_],A={B:["C","C","C","C"],b:g.slice(0)},W=[1,0,0,1,0,0];
a5(W,-ag);for(var K=0;K<3;K++){N(W,g);as(A.b,g)}a5(W,-P+ag/2);W[0]*=R;W[1]*=R;W[2]*=R;W[3]*=R;W[4]=i;
W[5]=$;N(W,A.b);N(a8.aX,A.b);a1(a8.aH,A)},a8={aH:A,aX:[I*S,I*q,-v*q,v*S,aq,a0]};ac(a8,0,0,1,am,am+au,ae==0);
i=Q;$=o}else console.log("Unknown SVG command "+H)}}}}return{cssMap:T,readTrnf:L,a1:s,b7:G}}(),initHB:function(h,d){var T=function(L){var e=0;
if((L&4294967295-(1<<7)+1)==0){e=1}else if((L&4294967295-(1<<11)+1)==0){e=2}else if((L&4294967295-(1<<16)+1)==0){e=3}else if((L&4294967295-(1<<21)+1)==0){e=4}return e};
fetch(h).then(function(L){return L.arrayBuffer()}).then(function(L){return WebAssembly.instantiate(L)}).then(function(L){console.log("HB ready");
var e=L.instance.exports,G=e.memory,B,f,O,s,Y,A,t,k;G.grow(30);U.U.shapeHB=function(){var i=function(x){var m=e.hb_buffer_get_length(x),n=[],u=e.hb_buffer_get_glyph_infos(x,0)>>>2,z=e.hb_buffer_get_glyph_positions(x,0)>>>2;
for(var F=0;F<m;++F){var a=u+F*5,V=z+F*5;n.push({g:f[a+0],cl:f[a+2],ax:O[V+0],ay:O[V+1],dx:O[V+2],dy:O[V+3]})}return n},$;
return function(x,m,n){var u=x._data,z=x.name.postScriptName,F=G.buffer.byteLength,a=2*u.length+m.length*16+4e6,J=0,y=0;
if(F<a){G.grow((a-F>>>16)+4)}B=new Uint8Array(G.buffer);f=new Uint32Array(G.buffer);O=new Int32Array(G.buffer);
if(s!=z){if(Y!=null){e.hb_blob_destroy(Y);e.free(A);e.hb_face_destroy(t);e.hb_font_destroy(k)}A=e.malloc(u.byteLength);
B.set(u,A);Y=e.hb_blob_create(A,u.byteLength,2,0,0);t=e.hb_face_create(Y,0);k=e.hb_font_create(t);s=z}if(window.TextEncoder==null){alert("Your browser is too old. Please, update it.");
return}if($==null)$=new window.TextEncoder("utf8");var V=e.hb_buffer_create(),H=$.encode(m),b=H.length,g=e.malloc(b);
B.set(H,g);e.hb_buffer_add_utf8(V,g,b,0,b);e.free(g);e.hb_buffer_set_direction(V,n?4:5);e.hb_buffer_guess_segment_properties(V);
e.hb_shape(k,V,0,0);var j=i(V);e.hb_buffer_destroy(V);var K=j.slice(0);if(!n)K.reverse();for(var l=1;
l<K.length;l++){var D=K[l],Q=D.cl;while(!0){var o=m.codePointAt(J),p=T(o);if(y+p<=Q){y+=p;J+=o<=65535?1:2}else break}D.cl=J}return j}}();
d()})}};return U}()

var UZIP = {};
if(typeof module == "object") module.exports = UZIP;


UZIP["parse"] = function(buf, onlyNames)	// ArrayBuffer
{
	var rUs = UZIP.bin.readUshort, rUi = UZIP.bin.readUint, o = 0, out = {};
	var data = new Uint8Array(buf);
	var eocd = data.length-4;
	
	while(rUi(data, eocd)!=0x06054b50) eocd--;
	
	var o = eocd;
	o+=4;	// sign  = 0x06054b50
	o+=4;  // disks = 0;
	var cnu = rUs(data, o);  o+=2;
	var cnt = rUs(data, o);  o+=2;
			
	var csize = rUi(data, o);  o+=4;
	var coffs = rUi(data, o);  o+=4;
	
	o = coffs;
	for(var i=0; i<cnu; i++)
	{
		var sign = rUi(data, o);  o+=4;
		o += 4;  // versions;
		o += 4;  // flag + compr
		o += 4;  // time
		
		var crc32 = rUi(data, o);  o+=4;
		var csize = rUi(data, o);  o+=4;
		var usize = rUi(data, o);  o+=4;
		
		var nl = rUs(data, o), el = rUs(data, o+2), cl = rUs(data, o+4);  o += 6;  // name, extra, comment
		o += 8;  // disk, attribs
		
		var roff = rUi(data, o);  o+=4;
		o += nl + el + cl;
		
		UZIP._readLocal(data, roff, out, csize, usize, onlyNames);
	}
	//console.log(out);
	return out;
}

UZIP._readLocal = function(data, o, out, csize, usize, onlyNames)
{
	var rUs = UZIP.bin.readUshort, rUi = UZIP.bin.readUint;
	var sign  = rUi(data, o);  o+=4;
	var ver   = rUs(data, o);  o+=2;
	var gpflg = rUs(data, o);  o+=2;
	//if((gpflg&8)!=0) throw "unknown sizes";
	var cmpr  = rUs(data, o);  o+=2;
	
	var time  = rUi(data, o);  o+=4;
	
	var crc32 = rUi(data, o);  o+=4;
	//var csize = rUi(data, o);  o+=4;
	//var usize = rUi(data, o);  o+=4;
	o+=8;
		
	var nlen  = rUs(data, o);  o+=2;
	var elen  = rUs(data, o);  o+=2;
		
	var name =  (gpflg&2048)==0 ? UZIP.bin.readIBM(data,o,nlen) : UZIP.bin.readUTF8(data, o, nlen);  o+=nlen;  //console.log(name);
	o += elen;
			
	//console.log(sign.toString(16), ver, gpflg, cmpr, crc32.toString(16), "csize, usize", csize, usize, nlen, elen, name, o);
	if(onlyNames) {  out[name]={size:usize, csize:csize};  return;  }   
	var file = new Uint8Array(data.buffer, o);
	if(false) {}
	else if(cmpr==0) out[name] = new Uint8Array(file.buffer.slice(o, o+csize));
	else if(cmpr==8) {
		var buf = new Uint8Array(usize);  UZIP.inflateRaw(file, buf);
		/*var nbuf = pako["inflateRaw"](file);
		if(usize>8514000) {
			//console.log(PUtils.readASCII(buf , 8514500, 500));
			//console.log(PUtils.readASCII(nbuf, 8514500, 500));
		}
		for(var i=0; i<buf.length; i++) if(buf[i]!=nbuf[i]) {  console.log(buf.length, nbuf.length, usize, i);  throw "e";  }
		*/
		out[name] = buf;
	}
	else throw "unknown compression method: "+cmpr;
}

UZIP.inflateRaw = function(file, buf) {  return UZIP.F.inflate(file, buf);  }
UZIP.inflate    = function(file, buf) { 
	var CMF = file[0], FLG = file[1];
	var CM = (CMF&15), CINFO = (CMF>>>4);
	//console.log(CM, CINFO,CMF,FLG);
	return UZIP.inflateRaw(new Uint8Array(file.buffer, file.byteOffset+2, file.length-6), buf);  
}
UZIP.deflate    = function(data, opts/*, buf, off*/) {
	if(opts==null) opts={level:6};
	var off=0, buf=new Uint8Array(50+Math.floor(data.length*1.1));
	buf[off]=120;  buf[off+1]=156;  off+=2;
	off = UZIP.F.deflateRaw(data, buf, off, opts.level);
	var crc = UZIP.adler(data, 0, data.length);
	buf[off+0]=((crc>>>24)&255); 
	buf[off+1]=((crc>>>16)&255); 
	buf[off+2]=((crc>>> 8)&255); 
	buf[off+3]=((crc>>> 0)&255); 	
	return new Uint8Array(buf.buffer, 0, off+4);
}
UZIP.deflateRaw = function(data, opts) {
	if(opts==null) opts={level:6};
	var buf=new Uint8Array(50+Math.floor(data.length*1.1));
	var off = UZIP.F.deflateRaw(data, buf, off, opts.level);
	return new Uint8Array(buf.buffer, 0, off);
}


UZIP.encode = function(obj, noCmpr) {
	if(noCmpr==null) noCmpr=false;
	var tot = 0, wUi = UZIP.bin.writeUint, wUs = UZIP.bin.writeUshort;
	var zpd = {};
	for(var p in obj) {  var cpr = !UZIP._noNeed(p) && !noCmpr, buf = obj[p], crc = UZIP.crc.crc(buf,0,buf.length); 
		zpd[p] = {  cpr:cpr, usize:buf.length, crc:crc, file: (cpr ? UZIP.deflateRaw(buf) : buf)  };  }
	
	for(var p in zpd) tot += zpd[p].file.length + 30 + 46 + 2*UZIP.bin.sizeUTF8(p);
	tot +=  22;
	
	var data = new Uint8Array(tot), o = 0;
	var fof = []
	
	for(var p in zpd) {
		var file = zpd[p];  fof.push(o);
		o = UZIP._writeHeader(data, o, p, file, 0);
	}
	var i=0, ioff = o;
	for(var p in zpd) {
		var file = zpd[p];  fof.push(o);
		o = UZIP._writeHeader(data, o, p, file, 1, fof[i++]);		
	}
	var csize = o-ioff;
	
	wUi(data, o, 0x06054b50);  o+=4;
	o += 4;  // disks
	wUs(data, o, i);  o += 2;
	wUs(data, o, i);  o += 2;	// number of c d records
	wUi(data, o, csize);  o += 4;
	wUi(data, o, ioff );  o += 4;
	o += 2;
	return data.buffer;
}
// no need to compress .PNG, .ZIP, .JPEG ....
UZIP._noNeed = function(fn) {  var ext = fn.split(".").pop().toLowerCase();  return "png,jpg,jpeg,zip".indexOf(ext)!=-1;  }

UZIP._writeHeader = function(data, o, p, obj, t, roff)
{
	var wUi = UZIP.bin.writeUint, wUs = UZIP.bin.writeUshort;
	var file = obj.file;
	
	wUi(data, o, t==0 ? 0x04034b50 : 0x02014b50);  o+=4; // sign
	if(t==1) o+=2;  // ver made by
	wUs(data, o, 20);  o+=2;	// ver
	wUs(data, o,  2048);  o+=2;    // gflip
	wUs(data, o,  obj.cpr?8:0);  o+=2;	// cmpr
		
	wUi(data, o,  0);  o+=4;	// time		
	wUi(data, o, obj.crc);  o+=4;	// crc32
	wUi(data, o, file.length);  o+=4;	// csize
	wUi(data, o, obj.usize);  o+=4;	// usize
		
	wUs(data, o, UZIP.bin.sizeUTF8(p));  o+=2;	// nlen
	wUs(data, o, 0);  o+=2;	// elen
	
	if(t==1) {
		o += 2;  // comment length
		o += 2;  // disk number
		o += 6;  // attributes
		wUi(data, o, roff);  o+=4;	// usize
	}
	var nlen = UZIP.bin.writeUTF8(data, o, p);  o+= nlen;	
	if(t==0) {  data.set(file, o);  o += file.length;  }
	return o;
}





UZIP.crc = {
	table : ( function() {
	   var tab = new Uint32Array(256);
	   for (var n=0; n<256; n++) {
			var c = n;
			for (var k=0; k<8; k++) {
				if (c & 1)  c = 0xedb88320 ^ (c >>> 1);
				else        c = c >>> 1;
			}
			tab[n] = c;  }    
		return tab;  })(),
	update : function(c, buf, off, len) {
		for (var i=0; i<len; i++)  c = UZIP.crc.table[(c ^ buf[off+i]) & 0xff] ^ (c >>> 8);
		return c;
	},
	crc : function(b,o,l)  {  return UZIP.crc.update(0xffffffff,b,o,l) ^ 0xffffffff;  }
}
UZIP.adler = function(data,o,len) {
	var a = 1, b = 0;
	var off = o, end=o+len;
	while(off<end) {
		var eend = Math.min(off+5552, end);
		while(off<eend) {
			a += data[off++];
			b += a;
		}
		a=a%65521;
		b=b%65521;
	}
    return (b << 16) | a;
}

UZIP.bin = {
	readUshort : function(buff,p)  {  return (buff[p]) | (buff[p+1]<<8);  },
	writeUshort: function(buff,p,n){  buff[p] = (n)&255;  buff[p+1] = (n>>8)&255;  },
	readUint   : function(buff,p)  {  return (buff[p+3]*(256*256*256)) + ((buff[p+2]<<16) | (buff[p+1]<< 8) | buff[p]);  },
	writeUint  : function(buff,p,n){  buff[p]=n&255;  buff[p+1]=(n>>8)&255;  buff[p+2]=(n>>16)&255;  buff[p+3]=(n>>24)&255;  },
	readASCII  : function(buff,p,l){  var s = "";  for(var i=0; i<l; i++) s += String.fromCharCode(buff[p+i]);  return s;    },
	writeASCII : function(data,p,s){  for(var i=0; i<s.length; i++) data[p+i] = s.charCodeAt(i);  },
	pad : function(n) { return n.length < 2 ? "0" + n : n; },
	readIBM  : function(buff, p, l) {
		var codes = [
			0xc7, 0xfc, 0xe9, 0xe2, 0xe4, 0xe0, 0xe5, 0xe7, 0xea,   0xeb, 0xe8, 0xef, 0xee, 0xec, 0xc4, 0xc5,
			0xc9, 0xe6, 0xc6, 0xf4, 0xf6, 0xf2, 0xfb, 0xf9, 0xff,   0xd6, 0xdc, 0xa2, 0xa3, 0xa5, 0xa7, 0x192,
			0xe1, 0xed, 0xf3, 0xfa, 0xf1, 0xd1, 0xaa, 0xba, 0xbf, 0x2310, 0xac, 0xbd, 0xbc, 0xa1, 0xab, 0xbb
		]
		var out = "";
		for(var i=0; i<l; i++) {
			var cc = buff[p+i];
			if     (cc<0x80) cc = cc;
			else if(cc<0xb0) cc = codes[cc-0x80];
			else             cc = 32;
			out += String.fromCharCode(cc);
		}
		return out;
	},
	readUTF8 : function(buff, p, l) {
		var s = "", ns;
		for(var i=0; i<l; i++) s += "%" + UZIP.bin.pad(buff[p+i].toString(16));
		try {  ns = decodeURIComponent(s); }
		catch(e) {  return UZIP.bin.readASCII(buff, p, l);  }
		return  ns;
	},
	writeUTF8 : function(buff, p, str) {
		var strl = str.length, i=0;
		for(var ci=0; ci<strl; ci++)
		{
			var code = str.charCodeAt(ci);
			if     ((code&(0xffffffff-(1<< 7)+1))==0) {  buff[p+i] = (     code     );  i++;  }
			else if((code&(0xffffffff-(1<<11)+1))==0) {  buff[p+i] = (192|(code>> 6));  buff[p+i+1] = (128|((code>> 0)&63));  i+=2;  }
			else if((code&(0xffffffff-(1<<16)+1))==0) {  buff[p+i] = (224|(code>>12));  buff[p+i+1] = (128|((code>> 6)&63));  buff[p+i+2] = (128|((code>>0)&63));  i+=3;  }
			else if((code&(0xffffffff-(1<<21)+1))==0) {  buff[p+i] = (240|(code>>18));  buff[p+i+1] = (128|((code>>12)&63));  buff[p+i+2] = (128|((code>>6)&63));  buff[p+i+3] = (128|((code>>0)&63)); i+=4;  }
			else throw "e";
		}
		return i;
	},
	sizeUTF8 : function(str) {
		var strl = str.length, i=0;
		for(var ci=0; ci<strl; ci++)
		{
			var code = str.charCodeAt(ci);
			if     ((code&(0xffffffff-(1<< 7)+1))==0) {  i++ ;  }
			else if((code&(0xffffffff-(1<<11)+1))==0) {  i+=2;  }
			else if((code&(0xffffffff-(1<<16)+1))==0) {  i+=3;  }
			else if((code&(0xffffffff-(1<<21)+1))==0) {  i+=4;  }
			else throw "e";
		}
		return i;
	}
}





















UZIP.F = {};

UZIP.F.deflateRaw = function(data, out, opos, lvl) {	
	var opts = [
	/*
		 ush good_length; /* reduce lazy search above this match length 
		 ush max_lazy;    /* do not perform lazy search above this match length 
         ush nice_length; /* quit search above this match length 
	*/
	/*      good lazy nice chain */
	/* 0 */ [ 0,   0,   0,    0,0],  /* store only */
	/* 1 */ [ 4,   4,   8,    4,0], /* max speed, no lazy matches */
	/* 2 */ [ 4,   5,  16,    8,0],
	/* 3 */ [ 4,   6,  16,   16,0],

	/* 4 */ [ 4,  10,  16,   32,0],  /* lazy matches */
	/* 5 */ [ 8,  16,  32,   32,0],
	/* 6 */ [ 8,  16, 128,  128,0],
	/* 7 */ [ 8,  32, 128,  256,0],
	/* 8 */ [32, 128, 258, 1024,1],
	/* 9 */ [32, 258, 258, 4096,1]]; /* max compression */
	
	var opt = opts[lvl];
	
	
	var U = UZIP.F.U, goodIndex = UZIP.F._goodIndex, hash = UZIP.F._hash, putsE = UZIP.F._putsE;
	var i = 0, pos = opos<<3, cvrd = 0, dlen = data.length;
	
	if(lvl==0) {
		while(i<dlen) {   var len = Math.min(0xffff, dlen-i);
			putsE(out, pos, (i+len==dlen ? 1 : 0));  pos = UZIP.F._copyExact(data, i, len, out, pos+8);  i += len;  }
		return pos>>>3;
	}

	var lits = U.lits, strt=U.strt, prev=U.prev, li=0, lc=0, bs=0, ebits=0, c=0, nc=0;  // last_item, literal_count, block_start
	if(dlen>2) {  nc=UZIP.F._hash(data,0);  strt[nc]=0;  }
	var nmch=0,nmci=0;
	
	for(i=0; i<dlen; i++)  {
		c = nc;
		//*
		if(i+1<dlen-2) {
			nc = UZIP.F._hash(data, i+1);
			var ii = ((i+1)&0x7fff);
			prev[ii]=strt[nc];
			strt[nc]=ii;
		} //*/
		if(cvrd<=i) {
			if((li>14000 || lc>26697) && (dlen-i)>100) {
				if(cvrd<i) {  lits[li]=i-cvrd;  li+=2;  cvrd=i;  }
				pos = UZIP.F._writeBlock(((i==dlen-1) || (cvrd==dlen))?1:0, lits, li, ebits, data,bs,i-bs, out, pos);  li=lc=ebits=0;  bs=i;
			}
			
			var mch = 0;
			//if(nmci==i) mch= nmch;  else 
			if(i<dlen-2) mch = UZIP.F._bestMatch(data, i, prev, c, Math.min(opt[2],dlen-i), opt[3]);
			/*
			if(mch!=0 && opt[4]==1 && (mch>>>16)<opt[1] && i+1<dlen-2) {
				nmch = UZIP.F._bestMatch(data, i+1, prev, nc, opt[2], opt[3]);  nmci=i+1;
				//var mch2 = UZIP.F._bestMatch(data, i+2, prev, nnc);  //nmci=i+1;
				if((nmch>>>16)>(mch>>>16)) mch=0;
			}//*/
			var len = mch>>>16, dst = mch&0xffff;  //if(i-dst<0) throw "e";
			if(mch!=0) { 
				var len = mch>>>16, dst = mch&0xffff;  //if(i-dst<0) throw "e";
				var lgi = goodIndex(len, U.of0);  U.lhst[257+lgi]++; 
				var dgi = goodIndex(dst, U.df0);  U.dhst[    dgi]++;  ebits += U.exb[lgi] + U.dxb[dgi]; 
				lits[li] = (len<<23)|(i-cvrd);  lits[li+1] = (dst<<16)|(lgi<<8)|dgi;  li+=2;
				cvrd = i + len;  
			}
			else {	U.lhst[data[i]]++;  }
			lc++;
		}
	}
	if(bs!=i || data.length==0) {
		if(cvrd<i) {  lits[li]=i-cvrd;  li+=2;  cvrd=i;  }
		pos = UZIP.F._writeBlock(1, lits, li, ebits, data,bs,i-bs, out, pos);  li=0;  lc=0;  li=lc=ebits=0;  bs=i;
	}
	while((pos&7)!=0) pos++;
	return pos>>>3;
}
UZIP.F._bestMatch = function(data, i, prev, c, nice, chain) {
	var ci = (i&0x7fff), pi=prev[ci];  
	//console.log("----", i);
	var dif = ((ci-pi + (1<<15)) & 0x7fff);  if(pi==ci || c!=UZIP.F._hash(data,i-dif)) return 0;
	var tl=0, td=0;  // top length, top distance
	var dlim = Math.min(0x7fff, i);
	while(dif<=dlim && --chain!=0 && pi!=ci /*&& c==UZIP.F._hash(data,i-dif)*/) {
		if(tl==0 || (data[i+tl]==data[i+tl-dif])) {
			var cl = UZIP.F._howLong(data, i, dif);
			if(cl>tl) {  
				tl=cl;  td=dif;  if(tl>=nice) break;    //* 
				if(dif+2<cl) cl = dif+2;
				var maxd = 0; // pi does not point to the start of the word
				for(var j=0; j<cl-2; j++) {
					var ei =  (i-dif+j+ (1<<15)) & 0x7fff;
					var li = prev[ei];
					var curd = (ei-li + (1<<15)) & 0x7fff;
					if(curd>maxd) {  maxd=curd;  pi = ei; }
				}  //*/
			}
		}
		
		ci=pi;  pi = prev[ci];
		dif += ((ci-pi + (1<<15)) & 0x7fff);
	}
	return (tl<<16)|td;
}
UZIP.F._howLong = function(data, i, dif) {
	if(data[i]!=data[i-dif] || data[i+1]!=data[i+1-dif] || data[i+2]!=data[i+2-dif]) return 0;
	var oi=i, l = Math.min(data.length, i+258);  i+=3;
	//while(i+4<l && data[i]==data[i-dif] && data[i+1]==data[i+1-dif] && data[i+2]==data[i+2-dif] && data[i+3]==data[i+3-dif]) i+=4;
	while(i<l && data[i]==data[i-dif]) i++;
	return i-oi;
}
UZIP.F._hash = function(data, i) {
	return (((data[i]<<8) | data[i+1])+(data[i+2]<<4))&0xffff;
	//var hash_shift = 0, hash_mask = 255;
	//var h = data[i+1] % 251;
	//h = (((h << 8) + data[i+2]) % 251);
	//h = (((h << 8) + data[i+2]) % 251);
	//h = ((h<<hash_shift) ^ (c) ) & hash_mask;
	//return h | (data[i]<<8);
	//return (data[i] | (data[i+1]<<8));
}
//UZIP.___toth = 0;
UZIP.saved = 0;
UZIP.F._writeBlock = function(BFINAL, lits, li, ebits, data,o0,l0, out, pos) {
	var U = UZIP.F.U, putsF = UZIP.F._putsF, putsE = UZIP.F._putsE;
	
	//*
	var T, ML, MD, MH, numl, numd, numh, lset, dset;  U.lhst[256]++;
	T = UZIP.F.getTrees(); ML=T[0]; MD=T[1]; MH=T[2]; numl=T[3]; numd=T[4]; numh=T[5]; lset=T[6]; dset=T[7];
	
	var cstSize = (((pos+3)&7)==0 ? 0 : 8-((pos+3)&7)) + 32 + (l0<<3);
	var fxdSize = ebits + UZIP.F.contSize(U.fltree, U.lhst) + UZIP.F.contSize(U.fdtree, U.dhst);
	var dynSize = ebits + UZIP.F.contSize(U.ltree , U.lhst) + UZIP.F.contSize(U.dtree , U.dhst);
	dynSize    += 14 + 3*numh + UZIP.F.contSize(U.itree, U.ihst) + (U.ihst[16]*2 + U.ihst[17]*3 + U.ihst[18]*7);
	
	for(var j=0; j<286; j++) U.lhst[j]=0;   for(var j=0; j<30; j++) U.dhst[j]=0;   for(var j=0; j<19; j++) U.ihst[j]=0;
	//*/
	var BTYPE = (cstSize<fxdSize && cstSize<dynSize) ? 0 : ( fxdSize<dynSize ? 1 : 2 );
	putsF(out, pos, BFINAL);  putsF(out, pos+1, BTYPE);  pos+=3;
	
	var opos = pos;
	if(BTYPE==0) {
		while((pos&7)!=0) pos++;
		pos = UZIP.F._copyExact(data, o0, l0, out, pos);
	}
	else {
		var ltree, dtree;
		if(BTYPE==1) {  ltree=U.fltree;  dtree=U.fdtree;  }
		if(BTYPE==2) {	
			UZIP.F.makeCodes(U.ltree, ML);  UZIP.F.revCodes(U.ltree, ML);
			UZIP.F.makeCodes(U.dtree, MD);  UZIP.F.revCodes(U.dtree, MD);
			UZIP.F.makeCodes(U.itree, MH);  UZIP.F.revCodes(U.itree, MH);
			
			ltree = U.ltree;  dtree = U.dtree;
			
			putsE(out, pos,numl-257);  pos+=5;  // 286
			putsE(out, pos,numd-  1);  pos+=5;  // 30
			putsE(out, pos,numh-  4);  pos+=4;  // 19
			
			for(var i=0; i<numh; i++) putsE(out, pos+i*3, U.itree[(U.ordr[i]<<1)+1]);   pos+=3* numh;
			pos = UZIP.F._codeTiny(lset, U.itree, out, pos);
			pos = UZIP.F._codeTiny(dset, U.itree, out, pos);
		}
		
		var off=o0;
		for(var si=0; si<li; si+=2) {
			var qb=lits[si], len=(qb>>>23), end = off+(qb&((1<<23)-1));
			while(off<end) pos = UZIP.F._writeLit(data[off++], ltree, out, pos);
			
			if(len!=0) {
				var qc = lits[si+1], dst=(qc>>16), lgi=(qc>>8)&255, dgi=(qc&255);
				pos = UZIP.F._writeLit(257+lgi, ltree, out, pos);
				putsE(out, pos, len-U.of0[lgi]);  pos+=U.exb[lgi];
				
				pos = UZIP.F._writeLit(dgi, dtree, out, pos);
				putsF(out, pos, dst-U.df0[dgi]);  pos+=U.dxb[dgi];  off+=len;
			}
		}
		pos = UZIP.F._writeLit(256, ltree, out, pos);
	}
	//console.log(pos-opos, fxdSize, dynSize, cstSize);
	return pos;
}
UZIP.F._copyExact = function(data,off,len,out,pos) {
	var p8 = (pos>>>3);
	out[p8]=(len);  out[p8+1]=(len>>>8);  out[p8+2]=255-out[p8];  out[p8+3]=255-out[p8+1];  p8+=4;
	out.set(new Uint8Array(data.buffer, off, len), p8);
	//for(var i=0; i<len; i++) out[p8+i]=data[off+i];
	return pos + ((len+4)<<3);
}
/*
	Interesting facts:
	- decompressed block can have bytes, which do not occur in a Huffman tree (copied from the previous block by reference)
*/

UZIP.F.getTrees = function() {
	var U = UZIP.F.U;
	var ML = UZIP.F._hufTree(U.lhst, U.ltree, 15);
	var MD = UZIP.F._hufTree(U.dhst, U.dtree, 15);
	var lset = [], numl = UZIP.F._lenCodes(U.ltree, lset);
	var dset = [], numd = UZIP.F._lenCodes(U.dtree, dset);
	for(var i=0; i<lset.length; i+=2) U.ihst[lset[i]]++;
	for(var i=0; i<dset.length; i+=2) U.ihst[dset[i]]++;
	var MH = UZIP.F._hufTree(U.ihst, U.itree,  7);
	var numh = 19;  while(numh>4 && U.itree[(U.ordr[numh-1]<<1)+1]==0) numh--;
	return [ML, MD, MH, numl, numd, numh, lset, dset];
}
UZIP.F.getSecond= function(a) {  var b=[];  for(var i=0; i<a.length; i+=2) b.push  (a[i+1]);  return b;  }
UZIP.F.nonZero  = function(a) {  var b= "";  for(var i=0; i<a.length; i+=2) if(a[i+1]!=0)b+=(i>>1)+",";  return b;  }
UZIP.F.contSize = function(tree, hst) {  var s=0;  for(var i=0; i<hst.length; i++) s+= hst[i]*tree[(i<<1)+1];  return s;  }
UZIP.F._codeTiny = function(set, tree, out, pos) {
	for(var i=0; i<set.length; i+=2) {
		var l = set[i], rst = set[i+1];  //console.log(l, pos, tree[(l<<1)+1]);
		pos = UZIP.F._writeLit(l, tree, out, pos);
		var rsl = l==16 ? 2 : (l==17 ? 3 : 7);
		if(l>15) {  UZIP.F._putsE(out, pos, rst, rsl);  pos+=rsl;  }
	}
	return pos;
}
UZIP.F._lenCodes = function(tree, set) {
	var len=tree.length;  while(len!=2 && tree[len-1]==0) len-=2;  // when no distances, keep one code with length 0
	for(var i=0; i<len; i+=2) {
		var l = tree[i+1], nxt = (i+3<len ? tree[i+3]:-1),  nnxt = (i+5<len ? tree[i+5]:-1),  prv = (i==0 ? -1 : tree[i-1]);
		if(l==0 && nxt==l && nnxt==l) {
			var lz = i+5;
			while(lz+2<len && tree[lz+2]==l) lz+=2;
			var zc = Math.min((lz+1-i)>>>1, 138);
			if(zc<11) set.push(17, zc-3);
			else set.push(18, zc-11);
			i += zc*2-2;
		}
		else if(l==prv && nxt==l && nnxt==l) {
			var lz = i+5;
			while(lz+2<len && tree[lz+2]==l) lz+=2;
			var zc = Math.min((lz+1-i)>>>1, 6);
			set.push(16, zc-3);
			i += zc*2-2;
		}
		else set.push(l, 0);
	}
	return len>>>1;
}
UZIP.F._hufTree   = function(hst, tree, MAXL) {
	var list=[], hl = hst.length, tl=tree.length, i=0;
	for(i=0; i<tl; i+=2) {  tree[i]=0;  tree[i+1]=0;  }	
	for(i=0; i<hl; i++) if(hst[i]!=0) list.push({lit:i, f:hst[i]});
	var end = list.length, l2=list.slice(0);
	if(end==0) return 0;  // empty histogram (usually for dist)
	if(end==1) {  var lit=list[0].lit, l2=lit==0?1:0;  tree[(lit<<1)+1]=1;  tree[(l2<<1)+1]=1;  return 1;  }
	list.sort(function(a,b){return a.f-b.f;});
	var a=list[0], b=list[1], i0=0, i1=1, i2=2;  list[0]={lit:-1,f:a.f+b.f,l:a,r:b,d:0};
	while(i1!=end-1) {
		if(i0!=i1 && (i2==end || list[i0].f<list[i2].f)) {  a=list[i0++];  }  else {  a=list[i2++];  }
		if(i0!=i1 && (i2==end || list[i0].f<list[i2].f)) {  b=list[i0++];  }  else {  b=list[i2++];  }
		list[i1++]={lit:-1,f:a.f+b.f, l:a,r:b};
	}
	var maxl = UZIP.F.setDepth(list[i1-1], 0);
	if(maxl>MAXL) {  UZIP.F.restrictDepth(l2, MAXL, maxl);  maxl = MAXL;  }
	for(i=0; i<end; i++) tree[(l2[i].lit<<1)+1]=l2[i].d;
	return maxl;
}

UZIP.F.setDepth  = function(t, d) {
	if(t.lit!=-1) {  t.d=d;  return d;  }
	return Math.max( UZIP.F.setDepth(t.l, d+1),  UZIP.F.setDepth(t.r, d+1) );
}

UZIP.F.restrictDepth = function(dps, MD, maxl) {
	var i=0, bCost=1<<(maxl-MD), dbt=0;
	dps.sort(function(a,b){return b.d==a.d ? a.f-b.f : b.d-a.d;});
	
	for(i=0; i<dps.length; i++) if(dps[i].d>MD) {  var od=dps[i].d;  dps[i].d=MD;  dbt+=bCost-(1<<(maxl-od));  }  else break;
	dbt = dbt>>>(maxl-MD);
	while(dbt>0) {  var od=dps[i].d;  if(od<MD) {  dps[i].d++;  dbt-=(1<<(MD-od-1));  }  else  i++;  }
	for(; i>=0; i--) if(dps[i].d==MD && dbt<0) {  dps[i].d--;  dbt++;  }  if(dbt!=0) console.log("debt left");
}

UZIP.F._goodIndex = function(v, arr) {
	var i=0;  if(arr[i|16]<=v) i|=16;  if(arr[i|8]<=v) i|=8;  if(arr[i|4]<=v) i|=4;  if(arr[i|2]<=v) i|=2;  if(arr[i|1]<=v) i|=1;  return i;
}
UZIP.F._writeLit = function(ch, ltree, out, pos) {
	UZIP.F._putsF(out, pos, ltree[ch<<1]);
	return pos+ltree[(ch<<1)+1];
}








UZIP.F.inflate = function(data, buf) {
	var u8=Uint8Array;
	if(data[0]==3 && data[1]==0) return (buf ? buf : new u8(0));
	var F=UZIP.F, bitsF = F._bitsF, bitsE = F._bitsE, decodeTiny = F._decodeTiny, makeCodes = F.makeCodes, codes2map=F.codes2map, get17 = F._get17;
	var U = F.U;
	
	var noBuf = (buf==null);
	if(noBuf) buf = new u8((data.length>>>2)<<3);
	
	var BFINAL=0, BTYPE=0, HLIT=0, HDIST=0, HCLEN=0, ML=0, MD=0; 	
	var off = 0, pos = 0;
	var lmap, dmap;
	
	while(BFINAL==0) {		
		BFINAL = bitsF(data, pos  , 1);
		BTYPE  = bitsF(data, pos+1, 2);  pos+=3;
		//console.log(BFINAL, BTYPE);
		
		if(BTYPE==0) {
			if((pos&7)!=0) pos+=8-(pos&7);
			var p8 = (pos>>>3)+4, len = data[p8-4]|(data[p8-3]<<8);  //console.log(len);//bitsF(data, pos, 16), 
			if(noBuf) buf=UZIP.F._check(buf, off+len);
			buf.set(new u8(data.buffer, data.byteOffset+p8, len), off);
			//for(var i=0; i<len; i++) buf[off+i] = data[p8+i];
			//for(var i=0; i<len; i++) if(buf[off+i] != data[p8+i]) throw "e";
			pos = ((p8+len)<<3);  off+=len;  continue;
		}
		if(noBuf) buf=UZIP.F._check(buf, off+(1<<17));  // really not enough in many cases (but PNG and ZIP provide buffer in advance)
		if(BTYPE==1) {  lmap = U.flmap;  dmap = U.fdmap;  ML = (1<<9)-1;  MD = (1<<5)-1;   }
		if(BTYPE==2) {
			HLIT  = bitsE(data, pos   , 5)+257;  
			HDIST = bitsE(data, pos+ 5, 5)+  1;  
			HCLEN = bitsE(data, pos+10, 4)+  4;  pos+=14;
			
			var ppos = pos;
			for(var i=0; i<38; i+=2) {  U.itree[i]=0;  U.itree[i+1]=0;  }
			var tl = 1;
			for(var i=0; i<HCLEN; i++) {  var l=bitsE(data, pos+i*3, 3);  U.itree[(U.ordr[i]<<1)+1] = l;  if(l>tl)tl=l;  }     pos+=3*HCLEN;  //console.log(itree);
			makeCodes(U.itree, tl);
			codes2map(U.itree, tl, U.imap);
			
			lmap = U.lmap;  dmap = U.dmap;
			
			pos = decodeTiny(U.imap, (1<<tl)-1, HLIT+HDIST, data, pos, U.ttree);
			var mx0 = F._copyOut(U.ttree,    0, HLIT , U.ltree);  ML = (1<<mx0)-1;
			var mx1 = F._copyOut(U.ttree, HLIT, HDIST, U.dtree);  MD = (1<<mx1)-1;
			
			//var ml = decodeTiny(U.imap, (1<<tl)-1, HLIT , data, pos, U.ltree); ML = (1<<(ml>>>24))-1;  pos+=(ml&0xffffff);
			makeCodes(U.ltree, mx0);
			codes2map(U.ltree, mx0, lmap);
			
			//var md = decodeTiny(U.imap, (1<<tl)-1, HDIST, data, pos, U.dtree); MD = (1<<(md>>>24))-1;  pos+=(md&0xffffff);
			makeCodes(U.dtree, mx1);
			codes2map(U.dtree, mx1, dmap);
		}
		//var ooff=off, opos=pos;
		while(true) {
			var code = lmap[get17(data, pos) & ML];  pos += code&15;
			var lit = code>>>4;  //U.lhst[lit]++;  
			if((lit>>>8)==0) {  buf[off++] = lit;  }
			else if(lit==256) {  break;  }
			else {
				var end = off+lit-254;
				if(lit>264) { var ebs = U.ldef[lit-257];  end = off + (ebs>>>3) + bitsE(data, pos, ebs&7);  pos += ebs&7;  }
				//UZIP.F.dst[end-off]++;
				
				var dcode = dmap[get17(data, pos) & MD];  pos += dcode&15;
				var dlit = dcode>>>4;
				var dbs = U.ddef[dlit], dst = (dbs>>>4) + bitsF(data, pos, dbs&15);  pos += dbs&15;
				
				//var o0 = off-dst, stp = Math.min(end-off, dst);
				//if(stp>20) while(off<end) {  buf.copyWithin(off, o0, o0+stp);  off+=stp;  }  else
				//if(end-dst<=off) buf.copyWithin(off, off-dst, end-dst);  else
				//if(dst==1) buf.fill(buf[off-1], off, end);  else
				if(noBuf) buf=UZIP.F._check(buf, off+(1<<17));
				while(off<end) {  buf[off]=buf[off++-dst];    buf[off]=buf[off++-dst];  buf[off]=buf[off++-dst];  buf[off]=buf[off++-dst];  }   
				off=end;
				//while(off!=end) {  buf[off]=buf[off++-dst];  }
			}
		}
		//console.log(off-ooff, (pos-opos)>>>3);
	}
	//console.log(UZIP.F.dst);
	//console.log(tlen, dlen, off-tlen+tcnt);
	return buf.length==off ? buf : buf.slice(0,off);
}
UZIP.F._check=function(buf, len) {
	var bl=buf.length;  if(len<=bl) return buf;
	var nbuf = new Uint8Array(Math.max(bl<<1,len));  nbuf.set(buf,0);
	//for(var i=0; i<bl; i+=4) {  nbuf[i]=buf[i];  nbuf[i+1]=buf[i+1];  nbuf[i+2]=buf[i+2];  nbuf[i+3]=buf[i+3];  }
	return nbuf;
}

UZIP.F._decodeTiny = function(lmap, LL, len, data, pos, tree) {
	var bitsE = UZIP.F._bitsE, get17 = UZIP.F._get17;
	var i = 0;
	while(i<len) {
		var code = lmap[get17(data, pos)&LL];  pos+=code&15;
		var lit = code>>>4; 
		if(lit<=15) {  tree[i]=lit;  i++;  }
		else {
			var ll = 0, n = 0;
			if(lit==16) {
				n = (3  + bitsE(data, pos, 2));  pos += 2;  ll = tree[i-1];
			}
			else if(lit==17) {
				n = (3  + bitsE(data, pos, 3));  pos += 3;
			}
			else if(lit==18) {
				n = (11 + bitsE(data, pos, 7));  pos += 7;
			}
			var ni = i+n;
			while(i<ni) {  tree[i]=ll;  i++; }
		}
	}
	return pos;
}
UZIP.F._copyOut = function(src, off, len, tree) {
	var mx=0, i=0, tl=tree.length>>>1;
	while(i<len) {  var v=src[i+off];  tree[(i<<1)]=0;  tree[(i<<1)+1]=v;  if(v>mx)mx=v;  i++;  }
	while(i<tl ) {  tree[(i<<1)]=0;  tree[(i<<1)+1]=0;  i++;  }
	return mx;
}

UZIP.F.makeCodes = function(tree, MAX_BITS) {  // code, length
	var U = UZIP.F.U;
	var max_code = tree.length;
	var code, bits, n, i, len;
	
	var bl_count = U.bl_count;  for(var i=0; i<=MAX_BITS; i++) bl_count[i]=0;
	for(i=1; i<max_code; i+=2) bl_count[tree[i]]++;
	
	var next_code = U.next_code;	// smallest code for each length
	
	code = 0;
	bl_count[0] = 0;
	for (bits = 1; bits <= MAX_BITS; bits++) {
		code = (code + bl_count[bits-1]) << 1;
		next_code[bits] = code;
	}
	
	for (n = 0; n < max_code; n+=2) {
		len = tree[n+1];
		if (len != 0) {
			tree[n] = next_code[len];
			next_code[len]++;
		}
	}
}
UZIP.F.codes2map = function(tree, MAX_BITS, map) {
	var max_code = tree.length;
	var U=UZIP.F.U, r15 = U.rev15;
	for(var i=0; i<max_code; i+=2) if(tree[i+1]!=0)  {
		var lit = i>>1;
		var cl = tree[i+1], val = (lit<<4)|cl; // :  (0x8000 | (U.of0[lit-257]<<7) | (U.exb[lit-257]<<4) | cl);
		var rest = (MAX_BITS-cl), i0 = tree[i]<<rest, i1 = i0 + (1<<rest);
		//tree[i]=r15[i0]>>>(15-MAX_BITS);
		while(i0!=i1) {
			var p0 = r15[i0]>>>(15-MAX_BITS);
			map[p0]=val;  i0++;
		}
	}
}
UZIP.F.revCodes = function(tree, MAX_BITS) {
	var r15 = UZIP.F.U.rev15, imb = 15-MAX_BITS;
	for(var i=0; i<tree.length; i+=2) {  var i0 = (tree[i]<<(MAX_BITS-tree[i+1]));  tree[i] = r15[i0]>>>imb;  }
}

// used only in deflate
UZIP.F._putsE= function(dt, pos, val   ) {  val = val<<(pos&7);  var o=(pos>>>3);  dt[o]|=val;  dt[o+1]|=(val>>>8);                        }
UZIP.F._putsF= function(dt, pos, val   ) {  val = val<<(pos&7);  var o=(pos>>>3);  dt[o]|=val;  dt[o+1]|=(val>>>8);  dt[o+2]|=(val>>>16);  }

UZIP.F._bitsE= function(dt, pos, length) {  return ((dt[pos>>>3] | (dt[(pos>>>3)+1]<<8)                        )>>>(pos&7))&((1<<length)-1);  }
UZIP.F._bitsF= function(dt, pos, length) {  return ((dt[pos>>>3] | (dt[(pos>>>3)+1]<<8) | (dt[(pos>>>3)+2]<<16))>>>(pos&7))&((1<<length)-1);  }
/*
UZIP.F._get9 = function(dt, pos) {
	return ((dt[pos>>>3] | (dt[(pos>>>3)+1]<<8))>>>(pos&7))&511;
} */
UZIP.F._get17= function(dt, pos) {	// return at least 17 meaningful bytes
	return (dt[pos>>>3] | (dt[(pos>>>3)+1]<<8) | (dt[(pos>>>3)+2]<<16) )>>>(pos&7);
}
UZIP.F._get25= function(dt, pos) {	// return at least 17 meaningful bytes
	return (dt[pos>>>3] | (dt[(pos>>>3)+1]<<8) | (dt[(pos>>>3)+2]<<16) | (dt[(pos>>>3)+3]<<24) )>>>(pos&7);
}
UZIP.F.U = function(){
	var u16=Uint16Array, u32=Uint32Array;
	return {
		next_code : new u16(16),
		bl_count  : new u16(16),
		ordr : [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ],
		of0  : [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],
		exb  : [0,0,0,0,0,0,0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,  4,  5,  5,  5,  5,  0,  0,  0,  0],
		ldef : new u16(32),
		df0  : [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577, 65535, 65535],
		dxb  : [0,0,0,0,1,1,2, 2, 3, 3, 4, 4, 5, 5,  6,  6,  7,  7,  8,  8,   9,   9,  10,  10,  11,  11,  12,   12,   13,   13,     0,     0],
		ddef : new u32(32),
		flmap: new u16(  512),  fltree: [],
		fdmap: new u16(   32),  fdtree: [],
		lmap : new u16(32768),  ltree : [],  ttree:[],
		dmap : new u16(32768),  dtree : [],
		imap : new u16(  512),  itree : [],
		//rev9 : new u16(  512)
		rev15: new u16(1<<15),
		lhst : new u32(286), dhst : new u32( 30), ihst : new u32(19),
		lits : new u32(15000),
		strt : new u16(1<<16),
		prev : new u16(1<<15)
	};  
} ();

(function(){	
	var U = UZIP.F.U;
	var len = 1<<15;
	for(var i=0; i<len; i++) {
		var x = i;
		x = (((x & 0xaaaaaaaa) >>> 1) | ((x & 0x55555555) << 1));
		x = (((x & 0xcccccccc) >>> 2) | ((x & 0x33333333) << 2));
		x = (((x & 0xf0f0f0f0) >>> 4) | ((x & 0x0f0f0f0f) << 4));
		x = (((x & 0xff00ff00) >>> 8) | ((x & 0x00ff00ff) << 8));
		U.rev15[i] = (((x >>> 16) | (x << 16)))>>>17;
	}
	
	function pushV(tgt, n, sv) {  while(n--!=0) tgt.push(0,sv);  }
	
	for(var i=0; i<32; i++) {  U.ldef[i]=(U.of0[i]<<3)|U.exb[i];  U.ddef[i]=(U.df0[i]<<4)|U.dxb[i];  }
	
	pushV(U.fltree, 144, 8);  pushV(U.fltree, 255-143, 9);  pushV(U.fltree, 279-255, 7);  pushV(U.fltree,287-279,8);
	/*
	var i = 0;
	for(; i<=143; i++) U.fltree.push(0,8);
	for(; i<=255; i++) U.fltree.push(0,9);
	for(; i<=279; i++) U.fltree.push(0,7);
	for(; i<=287; i++) U.fltree.push(0,8);
	*/
	UZIP.F.makeCodes(U.fltree, 9);
	UZIP.F.codes2map(U.fltree, 9, U.flmap);
	UZIP.F.revCodes (U.fltree, 9)
	
	pushV(U.fdtree,32,5);
	//for(i=0;i<32; i++) U.fdtree.push(0,5);
	UZIP.F.makeCodes(U.fdtree, 5);
	UZIP.F.codes2map(U.fdtree, 5, U.fdmap);
	UZIP.F.revCodes (U.fdtree, 5)
	
	pushV(U.itree,19,0);  pushV(U.ltree,286,0);  pushV(U.dtree,30,0);  pushV(U.ttree,320,0);
	/*
	for(var i=0; i< 19; i++) U.itree.push(0,0);
	for(var i=0; i<286; i++) U.ltree.push(0,0);
	for(var i=0; i< 30; i++) U.dtree.push(0,0);
	for(var i=0; i<320; i++) U.ttree.push(0,0);
	*/
})()


var paper=function(t,e){var i=(t=t||require("./node/self.js")).window,n=t.document,r=new function(){function t(t,e,r,s,a){function u(n,u){"string"==typeof(u=u||(u=o(e,n))&&(u.get?u:u.value))&&"#"===u[0]&&(u=t[u.substring(1)]||u);var c,f="function"==typeof u,d=u,_=a||f&&!u.base?u&&u.get?n in t:t[n]:null;a&&_||(f&&_&&(u.base=_),f&&!1!==s&&(c=n.match(/^([gs]et|is)(([A-Z])(.*))$/))&&(l[c[3].toLowerCase()+c[4]]=c[2]),d&&!f&&d.get&&"function"==typeof d.get&&i.isPlainObject(d)||(d={value:d,writable:!0}),(o(t,n)||{configurable:!0}).configurable&&(d.configurable=!0,d.enumerable=null!=r?r:!c),h(t,n,d))}var l={};if(e){for(var c in e)e.hasOwnProperty(c)&&!n.test(c)&&u(c);for(var c in l){var f=l[c],d=t["set"+f],_=t["get"+f]||d&&t["is"+f];!_||!0!==s&&0!==_.length||u(c,{get:_,set:d})}}return t}function i(){for(var t=0,e=arguments.length;t<e;t++){var i=arguments[t];i&&c(this,i)}return this}var n=/^(statics|enumerable|beans|preserve)$/,r=[],s=r.slice,a=Object.create,o=Object.getOwnPropertyDescriptor,h=Object.defineProperty,u=r.forEach||function(t,e){for(var i=0,n=this.length;i<n;i++)t.call(e,this[i],i,this)},l=function(t,e){for(var i in this)this.hasOwnProperty(i)&&t.call(e,this[i],i,this)},c=Object.assign||function(t){for(var e=1,i=arguments.length;e<i;e++){var n=arguments[e];for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r])}return t},f=function(t,e,i){if(t){var n=o(t,"length");(n&&"number"==typeof n.value?u:l).call(t,e,i=i||t)}return i};return t(i,{inject:function(e){if(e){var i=!0===e.statics?e:e.statics,n=e.beans,r=e.preserve;i!==e&&t(this.prototype,e,e.enumerable,n,r),t(this,i,null,n,r)}for(var s=1,a=arguments.length;s<a;s++)this.inject(arguments[s]);return this},extend:function(){for(var e,i,n,r=this,s=0,o=arguments.length;s<o&&(!e||!i);s++)n=arguments[s],e=e||n.initialize,i=i||n.prototype;return e=e||function(){r.apply(this,arguments)},i=e.prototype=i||a(this.prototype),h(i,"constructor",{value:e,writable:!0,configurable:!0}),t(e,this),arguments.length&&this.inject.apply(e,arguments),e.base=r,e}}).inject({enumerable:!1,initialize:i,set:i,inject:function(){for(var e=0,i=arguments.length;e<i;e++){var n=arguments[e];n&&t(this,n,n.enumerable,n.beans,n.preserve)}return this},extend:function(){var t=a(this);return t.inject.apply(t,arguments)},each:function(t,e){return f(this,t,e)},clone:function(){return new this.constructor(this)},statics:{set:c,each:f,create:a,define:h,describe:o,clone:function(t){return c(new t.constructor,t)},isPlainObject:function(t){var e=null!=t&&t.constructor;return e&&(e===Object||e===i||"Object"===e.name)},pick:function(t,i){return t!==e?t:i},slice:function(t,e,i){return s.call(t,e,i)}}})};"undefined"!=typeof module&&(module.exports=r),r.inject({enumerable:!1,toString:function(){return null!=this._id?(this._class||"Object")+(this._name?" '"+this._name+"'":" @"+this._id):"{ "+r.each(this,function(t,e){if(!/^_/.test(e)){var i=typeof t;this.push(e+": "+("number"===i?h.instance.number(t):"string"===i?"'"+t+"'":t))}},[]).join(", ")+" }"},getClassName:function(){return this._class||""},importJSON:function(t){return r.importJSON(t,this)},exportJSON:function(t){return r.exportJSON(this,t)},toJSON:function(){return r.serialize(this)},set:function(t,e){return t&&r.filter(this,t,e,this._prioritize),this}},{beans:!1,statics:{exports:{},extend:function t(){var e=t.base.apply(this,arguments),i=e.prototype._class;return i&&!r.exports[i]&&(r.exports[i]=e),e},equals:function(t,e){if(t===e)return!0;if(t&&t.equals)return t.equals(e);if(e&&e.equals)return e.equals(t);if(t&&e&&"object"==typeof t&&"object"==typeof e){if(Array.isArray(t)&&Array.isArray(e)){if((n=t.length)!==e.length)return!1;for(;n--;)if(!r.equals(t[n],e[n]))return!1}else{var i=Object.keys(t),n=i.length;if(n!==Object.keys(e).length)return!1;for(;n--;){var s=i[n];if(!e.hasOwnProperty(s)||!r.equals(t[s],e[s]))return!1}}return!0}return!1},read:function(t,i,n,s){if(this===r){var a=this.peek(t,i);return t.__index++,a}var o=this.prototype,h=o._readIndex,u=i||h&&t.__index||0,l=t.length,c=t[u];if(s=s||l-u,c instanceof this||n&&n.readNull&&null==c&&s<=1)return h&&(t.__index=u+1),c&&n&&n.clone?c.clone():c;if(c=r.create(o),h&&(c.__read=!0),c=c.initialize.apply(c,u>0||u+s<l?r.slice(t,u,u+s):t)||c,h){t.__index=u+c.__read;var f=c.__filtered;f&&(t.__filtered=f,c.__filtered=e),c.__read=e}return c},peek:function(t,e){return t[t.__index=e||t.__index||0]},remain:function(t){return t.length-(t.__index||0)},readList:function(t,e,i,n){for(var r,s=[],a=e||0,o=n?a+n:t.length,h=a;h<o;h++)s.push(Array.isArray(r=t[h])?this.read(r,0,i):this.read(t,h,i,1));return s},readNamed:function(t,i,n,s,a){var o=this.getNamed(t,i),h=o!==e;if(h){var u=t.__filtered;u||((u=t.__filtered=r.create(t[0])).__unfiltered=t[0]),u[i]=e}var l=h?[o]:t;return this.read(l,n,s,a)},getNamed:function(t,i){var n=t[0];if(t._hasObject===e&&(t._hasObject=1===t.length&&r.isPlainObject(n)),t._hasObject)return i?n[i]:t.__filtered||n},hasNamed:function(t,e){return!!this.getNamed(t,e)},filter:function(t,i,n,r){function s(r){if(!(n&&r in n||a&&r in a)){var s=i[r];s!==e&&(t[r]=s)}}var a;if(r){for(var o,h={},u=0,l=r.length;u<l;u++)(o=r[u])in i&&(s(o),h[o]=!0);a=h}return Object.keys(i.__unfiltered||i).forEach(s),t},isPlainValue:function(t,e){return r.isPlainObject(t)||Array.isArray(t)||e&&"string"==typeof t},serialize:function(t,e,i,n){e=e||{};var s,a=!n;if(a&&(e.formatter=new h(e.precision),n={length:0,definitions:{},references:{},add:function(t,e){var i="#"+t._id,n=this.references[i];if(!n){this.length++;var r=e.call(t),s=t._class;s&&r[0]!==s&&r.unshift(s),this.definitions[i]=r,n=this.references[i]=[i]}return n}}),t&&t._serialize){s=t._serialize(e,n);var o=t._class;!o||t._compactSerialize||!a&&i||s[0]===o||s.unshift(o)}else if(Array.isArray(t)){s=[];for(var u=0,l=t.length;u<l;u++)s[u]=r.serialize(t[u],e,i,n)}else if(r.isPlainObject(t)){s={};for(var c=Object.keys(t),u=0,l=c.length;u<l;u++){var f=c[u];s[f]=r.serialize(t[f],e,i,n)}}else s="number"==typeof t?e.formatter.number(t,e.precision):t;return a&&n.length>0?[["dictionary",n.definitions],s]:s},deserialize:function(t,e,i,n,s){var a=t,o=!i,h=o&&t&&t.length&&"dictionary"===t[0][0];if(i=i||{},Array.isArray(t)){var u=t[0],l="dictionary"===u;if(1==t.length&&/^#/.test(u))return i.dictionary[u];a=[];for(var c=(u=r.exports[u])?1:0,f=t.length;c<f;c++)a.push(r.deserialize(t[c],e,i,l,h));if(u){var d=a;e?a=e(u,d,o||s):(a=r.create(u.prototype),u.apply(a,d))}}else if(r.isPlainObject(t)){a={},n&&(i.dictionary=a);for(var _ in t)a[_]=r.deserialize(t[_],e,i)}return h?a[1]:a},exportJSON:function(t,e){var i=r.serialize(t,e);return e&&0==e.asString?i:JSON.stringify(i)},importJSON:function(t,e){return r.deserialize("string"==typeof t?JSON.parse(t):t,function(t,i,n){var s=n&&e&&e.constructor===t,a=s?e:r.create(t.prototype);if(1===i.length&&a instanceof w&&(s||!(a instanceof b))){var o=i[0];r.isPlainObject(o)&&(o.insert=!1)}return(s?a.set:t).apply(a,i),s&&(e=null),a})},splice:function(t,i,n,r){var s=i&&i.length,a=n===e;(n=a?t.length:n)>t.length&&(n=t.length);for(u=0;u<s;u++)i[u]._index=n+u;if(a)return t.push.apply(t,i),[];var o=[n,r];i&&o.push.apply(o,i);for(var h=t.splice.apply(t,o),u=0,l=h.length;u<l;u++)h[u]._index=e;for(var u=n+s,l=t.length;u<l;u++)t[u]._index=u;return h},capitalize:function(t){return t.replace(/\b[a-z]/g,function(t){return t.toUpperCase()})},camelize:function(t){return t.replace(/-(.)/g,function(t,e){return e.toUpperCase()})},hyphenate:function(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}}});var s={on:function(t,e){if("string"!=typeof t)r.each(t,function(t,e){this.on(e,t)},this);else{var i=this._eventTypes,n=i&&i[t],s=this._callbacks=this._callbacks||{};-1===(s=s[t]=s[t]||[]).indexOf(e)&&(s.push(e),n&&n.install&&1===s.length&&n.install.call(this,t))}return this},off:function(t,e){if("string"==typeof t){var i,n=this._eventTypes,s=n&&n[t],a=this._callbacks&&this._callbacks[t];return a&&(!e||-1!==(i=a.indexOf(e))&&1===a.length?(s&&s.uninstall&&s.uninstall.call(this,t),delete this._callbacks[t]):-1!==i&&a.splice(i,1)),this}r.each(t,function(t,e){this.off(e,t)},this)},once:function(t,e){return this.on(t,function(){e.apply(this,arguments),this.off(t,e)})},emit:function(t,e){var i=this._callbacks&&this._callbacks[t];if(!i)return!1;var n=r.slice(arguments,1),s=e&&e.target&&!e.currentTarget;i=i.slice(),s&&(e.currentTarget=this);for(var a=0,o=i.length;a<o;a++)if(0==i[a].apply(this,n)){e&&e.stop&&e.stop();break}return s&&delete e.currentTarget,!0},responds:function(t){return!(!this._callbacks||!this._callbacks[t])},attach:"#on",detach:"#off",fire:"#emit",_installEvents:function(t){var e=this._eventTypes,i=this._callbacks,n=t?"install":"uninstall";if(e)for(var r in i)if(i[r].length>0){var s=e[r],a=s&&s[n];a&&a.call(this,r)}},statics:{inject:function t(e){var i=e._events;if(i){var n={};r.each(i,function(t,i){var s="string"==typeof t,a=s?t:i,o=r.capitalize(a),h=a.substring(2).toLowerCase();n[h]=s?{}:t,a="_"+a,e["get"+o]=function(){return this[a]},e["set"+o]=function(t){var e=this[a];e&&this.off(h,e),t&&this.on(h,t),this[a]=t}}),e._eventTypes=n}return t.base.apply(this,arguments)}}},a=r.extend({_class:"PaperScope",initialize:function e(){paper=this,this.settings=new r({applyMatrix:!0,insertItems:!0,handleSize:4,hitTolerance:0}),this.project=null,this.projects=[],this.tools=[],this._id=e._id++,e._scopes[this._id]=this;var i=e.prototype;if(!this.support){var n=Q.getContext(1,1)||{};i.support={nativeDash:"setLineDash"in n||"mozDash"in n,nativeBlendModes:tt.nativeModes},Q.release(n)}if(!this.agent){var s=t.navigator.userAgent.toLowerCase(),a=(/(darwin|win|mac|linux|freebsd|sunos)/.exec(s)||[])[0],o="darwin"===a?"mac":a,h=i.agent=i.browser={platform:o};o&&(h[o]=!0),s.replace(/(opera|chrome|safari|webkit|firefox|msie|trident|atom|node)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:v?([.\d]+))?/g,function(t,e,i,n,r){if(!h.chrome){var s="opera"===e?n:/^(node|trident)$/.test(e)?r:i;h.version=s,h.versionNumber=parseFloat(s),e="trident"===e?"msie":e,h.name=e,h[e]=!0}}),h.chrome&&delete h.webkit,h.atom&&delete h.chrome}},version:"0.11.5",getView:function(){var t=this.project;return t&&t._view},getPaper:function(){return this},execute:function(t,e){paper.PaperScript.execute(t,this,e),U.updateFocus()},install:function(t){var e=this;r.each(["project","view","tool"],function(i){r.define(t,i,{configurable:!0,get:function(){return e[i]}})});for(var i in this)!/^_/.test(i)&&this[i]&&(t[i]=this[i])},setup:function(t){return paper=this,this.project=new y(t),this},createCanvas:function(t,e){return Q.getCanvas(t,e)},activate:function(){paper=this},clear:function(){for(var t=this.projects,e=this.tools,i=t.length-1;i>=0;i--)t[i].remove();for(i=e.length-1;i>=0;i--)e[i].remove()},remove:function(){this.clear(),delete a._scopes[this._id]},statics:new function(){function t(t){return t+="Attribute",function(e,i){return e[t](i)||e[t]("data-paper-"+i)}}return{_scopes:{},_id:0,get:function(t){return this._scopes[t]||null},getAttribute:t("get"),hasAttribute:t("has")}}}),o=r.extend(s,{initialize:function(t){this._scope=paper,this._index=this._scope[this._list].push(this)-1,!t&&this._scope[this._reference]||this.activate()},activate:function(){if(!this._scope)return!1;var t=this._scope[this._reference];return t&&t!==this&&t.emit("deactivate"),this._scope[this._reference]=this,this.emit("activate",t),!0},isActive:function(){return this._scope[this._reference]===this},remove:function(){return null!=this._index&&(r.splice(this._scope[this._list],null,this._index,1),this._scope[this._reference]==this&&(this._scope[this._reference]=null),this._scope=null,!0)},getView:function(){return this._scope.getView()}}),h=r.extend({initialize:function(t){this.precision=r.pick(t,5),this.multiplier=Math.pow(10,this.precision)},number:function(t){return this.precision<16?Math.round(t*this.multiplier)/this.multiplier:t},pair:function(t,e,i){return this.number(t)+(i||",")+this.number(e)},point:function(t,e){return this.number(t.x)+(e||",")+this.number(t.y)},size:function(t,e){return this.number(t.width)+(e||",")+this.number(t.height)},rectangle:function(t,e){return this.point(t,e)+(e||",")+this.size(t,e)}});h.instance=new h;var u=new function(){function t(t,e,i){return t<e?e:t>i?i:t}function e(t,e,i){function n(t){var e=134217729*t,i=t-e+e;return[i,t-i]}var r=e*e-t*i,a=e*e+t*i;if(3*s(r)<a){var o=n(t),h=n(e),u=n(i),l=e*e,c=t*i;r=l-c+(h[0]*h[0]-l+2*h[0]*h[1]+h[1]*h[1]-(o[0]*u[0]-c+o[0]*u[1]+o[1]*u[0]+o[1]*u[1]))}return r}function i(){var t=Math.max.apply(Math,arguments);return t&&(t<1e-8||t>1e8)?o(2,-Math.round(h(t))):0}var n=[[.5773502691896257],[0,.7745966692414834],[.33998104358485626,.8611363115940526],[0,.5384693101056831,.906179845938664],[.2386191860831969,.6612093864662645,.932469514203152],[0,.4058451513773972,.7415311855993945,.9491079123427585],[.1834346424956498,.525532409916329,.7966664774136267,.9602898564975363],[0,.3242534234038089,.6133714327005904,.8360311073266358,.9681602395076261],[.14887433898163122,.4333953941292472,.6794095682990244,.8650633666889845,.9739065285171717],[0,.26954315595234496,.5190961292068118,.7301520055740494,.8870625997680953,.978228658146057],[.1252334085114689,.3678314989981802,.5873179542866175,.7699026741943047,.9041172563704749,.9815606342467192],[0,.2304583159551348,.44849275103644687,.6423493394403402,.8015780907333099,.9175983992229779,.9841830547185881],[.10805494870734367,.31911236892788974,.5152486363581541,.6872929048116855,.827201315069765,.9284348836635735,.9862838086968123],[0,.20119409399743451,.3941513470775634,.5709721726085388,.7244177313601701,.8482065834104272,.937273392400706,.9879925180204854],[.09501250983763744,.2816035507792589,.45801677765722737,.6178762444026438,.755404408355003,.8656312023878318,.9445750230732326,.9894009349916499]],r=[[1],[.8888888888888888,.5555555555555556],[.6521451548625461,.34785484513745385],[.5688888888888889,.47862867049936647,.23692688505618908],[.46791393457269104,.3607615730481386,.17132449237917036],[.4179591836734694,.3818300505051189,.27970539148927664,.1294849661688697],[.362683783378362,.31370664587788727,.22238103445337448,.10122853629037626],[.3302393550012598,.31234707704000286,.26061069640293544,.1806481606948574,.08127438836157441],[.29552422471475287,.26926671930999635,.21908636251598204,.1494513491505806,.06667134430868814],[.2729250867779006,.26280454451024665,.23319376459199048,.18629021092773426,.1255803694649046,.05566856711617366],[.24914704581340277,.2334925365383548,.20316742672306592,.16007832854334622,.10693932599531843,.04717533638651183],[.2325515532308739,.22628318026289723,.2078160475368885,.17814598076194574,.13887351021978725,.09212149983772845,.04048400476531588],[.2152638534631578,.2051984637212956,.18553839747793782,.15720316715819355,.12151857068790319,.08015808715976021,.03511946033175186],[.2025782419255613,.19843148532711158,.1861610000155622,.16626920581699392,.13957067792615432,.10715922046717194,.07036604748810812,.03075324199611727],[.1894506104550685,.18260341504492358,.16915651939500254,.14959598881657674,.12462897125553388,.09515851168249279,.062253523938647894,.027152459411754096]],s=Math.abs,a=Math.sqrt,o=Math.pow,h=Math.log2||function(t){return Math.log(t)*Math.LOG2E};return{EPSILON:1e-12,MACHINE_EPSILON:1.12e-16,CURVETIME_EPSILON:1e-8,GEOMETRIC_EPSILON:1e-7,TRIGONOMETRIC_EPSILON:1e-8,KAPPA:4*(a(2)-1)/3,isZero:function(t){return t>=-1e-12&&t<=1e-12},clamp:t,integrate:function(t,e,i,s){for(var a=n[s-2],o=r[s-2],h=.5*(i-e),u=h+e,l=0,c=s+1>>1,f=1&s?o[l++]*t(u):0;l<c;){var d=h*a[l];f+=o[l++]*(t(u+d)+t(u-d))}return h*f},findRoot:function(e,i,n,r,a,o,h){for(var u=0;u<o;u++){var l=e(n),c=l/i(n),f=n-c;if(s(c)<h){n=f;break}l>0?(a=n,n=f<=r?.5*(r+a):f):(r=n,n=f>=a?.5*(r+a):f)}return t(n,r,a)},solveQuadratic:function(n,r,o,h,u,l){var c,f=1/0;if(s(n)<1e-12){if(s(r)<1e-12)return s(o)<1e-12?-1:0;c=-o/r}else{var d=e(n,r*=-.5,o);if(d&&s(d)<1.12e-16){var _=i(s(n),s(r),s(o));_&&(d=e(n*=_,r*=_,o*=_))}if(d>=-1.12e-16){var g=d<0?0:a(d),v=r+(r<0?-g:g);0===v?f=-(c=o/n):(c=v/n,f=o/v)}}var p=0,m=null==u,y=u-1e-12,w=l+1e-12;return isFinite(c)&&(m||c>y&&c<w)&&(h[p++]=m?c:t(c,u,l)),f!==c&&isFinite(f)&&(m||f>y&&f<w)&&(h[p++]=m?f:t(f,u,l)),p},solveCubic:function(e,n,r,h,l,c,f){function d(t){var i=e*(_=t);p=(i+(g=i+n))*_+(v=g*_+r),m=v*_+h}var _,g,v,p,m,y=i(s(e),s(n),s(r),s(h));if(y&&(e*=y,n*=y,r*=y,h*=y),s(e)<1e-12)e=n,g=r,v=h,_=1/0;else if(s(h)<1e-12)g=n,v=r,_=0;else{d(-n/e/3);var w=m/e,x=o(s(w),1/3),b=w<0?-1:1,C=-p/e,S=C>0?1.324717957244746*Math.max(x,a(C)):x,P=_-b*S;if(P!==_){do{d(P),P=0===p?_:_-m/p/(1+1.12e-16)}while(b*P>b*_);s(e)*_*_>s(h/_)&&(g=((v=-h/_)-r)/_)}}var I=u.solveQuadratic(e,g,v,l,c,f),M=null==c;return isFinite(_)&&(0===I||I>0&&_!==l[0]&&_!==l[1])&&(M||_>c-1e-12&&_<f+1e-12)&&(l[I++]=M?_:t(_,c,f)),I}}},l={_id:1,_pools:{},get:function(t){if(t){var e=this._pools[t];return e||(e=this._pools[t]={_id:1}),e._id++}return this._id++}},c=r.extend({_class:"Point",_readIndex:!0,initialize:function(t,e){var i=typeof t,n=this.__read,r=0;if("number"===i){var s="number"==typeof e;this._set(t,s?e:t),n&&(r=s?2:1)}else if("undefined"===i||null===t)this._set(0,0),n&&(r=null===t?1:0);else{var a="string"===i?t.split(/[\s,]+/)||[]:t;r=1,Array.isArray(a)?this._set(+a[0],+(a.length>1?a[1]:a[0])):"x"in a?this._set(a.x||0,a.y||0):"width"in a?this._set(a.width||0,a.height||0):"angle"in a?(this._set(a.length||0,0),this.setAngle(a.angle||0)):(this._set(0,0),r=0)}return n&&(this.__read=r),this},set:"#initialize",_set:function(t,e){return this.x=t,this.y=e,this},equals:function(t){return this===t||t&&(this.x===t.x&&this.y===t.y||Array.isArray(t)&&this.x===t[0]&&this.y===t[1])||!1},clone:function(){return new c(this.x,this.y)},toString:function(){var t=h.instance;return"{ x: "+t.number(this.x)+", y: "+t.number(this.y)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.x),e.number(this.y)]},getLength:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},setLength:function(t){if(this.isZero()){var e=this._angle||0;this._set(Math.cos(e)*t,Math.sin(e)*t)}else{var i=t/this.getLength();u.isZero(i)&&this.getAngle(),this._set(this.x*i,this.y*i)}},getAngle:function(){return 180*this.getAngleInRadians.apply(this,arguments)/Math.PI},setAngle:function(t){this.setAngleInRadians.call(this,t*Math.PI/180)},getAngleInDegrees:"#getAngle",setAngleInDegrees:"#setAngle",getAngleInRadians:function(){if(arguments.length){var t=c.read(arguments),e=this.getLength()*t.getLength();if(u.isZero(e))return NaN;var i=this.dot(t)/e;return Math.acos(i<-1?-1:i>1?1:i)}return this.isZero()?this._angle||0:this._angle=Math.atan2(this.y,this.x)},setAngleInRadians:function(t){if(this._angle=t,!this.isZero()){var e=this.getLength();this._set(Math.cos(t)*e,Math.sin(t)*e)}},getQuadrant:function(){return this.x>=0?this.y>=0?1:4:this.y>=0?2:3}},{beans:!1,getDirectedAngle:function(){var t=c.read(arguments);return 180*Math.atan2(this.cross(t),this.dot(t))/Math.PI},getDistance:function(){var t=c.read(arguments),e=t.x-this.x,i=t.y-this.y,n=e*e+i*i;return r.read(arguments)?n:Math.sqrt(n)},normalize:function(t){t===e&&(t=1);var i=this.getLength(),n=0!==i?t/i:0,r=new c(this.x*n,this.y*n);return n>=0&&(r._angle=this._angle),r},rotate:function(t,e){if(0===t)return this.clone();t=t*Math.PI/180;var i=e?this.subtract(e):this,n=Math.sin(t),r=Math.cos(t);return i=new c(i.x*r-i.y*n,i.x*n+i.y*r),e?i.add(e):i},transform:function(t){return t?t._transformPoint(this):this},add:function(){var t=c.read(arguments);return new c(this.x+t.x,this.y+t.y)},subtract:function(){var t=c.read(arguments);return new c(this.x-t.x,this.y-t.y)},multiply:function(){var t=c.read(arguments);return new c(this.x*t.x,this.y*t.y)},divide:function(){var t=c.read(arguments);return new c(this.x/t.x,this.y/t.y)},modulo:function(){var t=c.read(arguments);return new c(this.x%t.x,this.y%t.y)},negate:function(){return new c(-this.x,-this.y)},isInside:function(){return g.read(arguments).contains(this)},isClose:function(){var t=c.read(arguments),e=r.read(arguments);return this.getDistance(t)<=e},isCollinear:function(){var t=c.read(arguments);return c.isCollinear(this.x,this.y,t.x,t.y)},isColinear:"#isCollinear",isOrthogonal:function(){var t=c.read(arguments);return c.isOrthogonal(this.x,this.y,t.x,t.y)},isZero:function(){var t=u.isZero;return t(this.x)&&t(this.y)},isNaN:function(){return isNaN(this.x)||isNaN(this.y)},isInQuadrant:function(t){return this.x*(t>1&&t<4?-1:1)>=0&&this.y*(t>2?-1:1)>=0},dot:function(){var t=c.read(arguments);return this.x*t.x+this.y*t.y},cross:function(){var t=c.read(arguments);return this.x*t.y-this.y*t.x},project:function(){var t=c.read(arguments),e=t.isZero()?0:this.dot(t)/t.dot(t);return new c(t.x*e,t.y*e)},statics:{min:function(){var t=c.read(arguments),e=c.read(arguments);return new c(Math.min(t.x,e.x),Math.min(t.y,e.y))},max:function(){var t=c.read(arguments),e=c.read(arguments);return new c(Math.max(t.x,e.x),Math.max(t.y,e.y))},random:function(){return new c(Math.random(),Math.random())},isCollinear:function(t,e,i,n){return Math.abs(t*n-e*i)<=1e-8*Math.sqrt((t*t+e*e)*(i*i+n*n))},isOrthogonal:function(t,e,i,n){return Math.abs(t*i+e*n)<=1e-8*Math.sqrt((t*t+e*e)*(i*i+n*n))}}},r.each(["round","ceil","floor","abs"],function(t){var e=Math[t];this[t]=function(){return new c(e(this.x),e(this.y))}},{})),f=c.extend({initialize:function(t,e,i,n){this._x=t,this._y=e,this._owner=i,this._setter=n},_set:function(t,e,i){return this._x=t,this._y=e,i||this._owner[this._setter](this),this},getX:function(){return this._x},setX:function(t){this._x=t,this._owner[this._setter](this)},getY:function(){return this._y},setY:function(t){this._y=t,this._owner[this._setter](this)},isSelected:function(){return!!(this._owner._selection&this._getSelection())},setSelected:function(t){this._owner._changeSelection(this._getSelection(),t)},_getSelection:function(){return"setPosition"===this._setter?4:0}}),d=r.extend({_class:"Size",_readIndex:!0,initialize:function(t,e){var i=typeof t,n=this.__read,r=0;if("number"===i){var s="number"==typeof e;this._set(t,s?e:t),n&&(r=s?2:1)}else if("undefined"===i||null===t)this._set(0,0),n&&(r=null===t?1:0);else{var a="string"===i?t.split(/[\s,]+/)||[]:t;r=1,Array.isArray(a)?this._set(+a[0],+(a.length>1?a[1]:a[0])):"width"in a?this._set(a.width||0,a.height||0):"x"in a?this._set(a.x||0,a.y||0):(this._set(0,0),r=0)}return n&&(this.__read=r),this},set:"#initialize",_set:function(t,e){return this.width=t,this.height=e,this},equals:function(t){return t===this||t&&(this.width===t.width&&this.height===t.height||Array.isArray(t)&&this.width===t[0]&&this.height===t[1])||!1},clone:function(){return new d(this.width,this.height)},toString:function(){var t=h.instance;return"{ width: "+t.number(this.width)+", height: "+t.number(this.height)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.width),e.number(this.height)]},add:function(){var t=d.read(arguments);return new d(this.width+t.width,this.height+t.height)},subtract:function(){var t=d.read(arguments);return new d(this.width-t.width,this.height-t.height)},multiply:function(){var t=d.read(arguments);return new d(this.width*t.width,this.height*t.height)},divide:function(){var t=d.read(arguments);return new d(this.width/t.width,this.height/t.height)},modulo:function(){var t=d.read(arguments);return new d(this.width%t.width,this.height%t.height)},negate:function(){return new d(-this.width,-this.height)},isZero:function(){var t=u.isZero;return t(this.width)&&t(this.height)},isNaN:function(){return isNaN(this.width)||isNaN(this.height)},statics:{min:function(t,e){return new d(Math.min(t.width,e.width),Math.min(t.height,e.height))},max:function(t,e){return new d(Math.max(t.width,e.width),Math.max(t.height,e.height))},random:function(){return new d(Math.random(),Math.random())}}},r.each(["round","ceil","floor","abs"],function(t){var e=Math[t];this[t]=function(){return new d(e(this.width),e(this.height))}},{})),_=d.extend({initialize:function(t,e,i,n){this._width=t,this._height=e,this._owner=i,this._setter=n},_set:function(t,e,i){return this._width=t,this._height=e,i||this._owner[this._setter](this),this},getWidth:function(){return this._width},setWidth:function(t){this._width=t,this._owner[this._setter](this)},getHeight:function(){return this._height},setHeight:function(t){this._height=t,this._owner[this._setter](this)}}),g=r.extend({_class:"Rectangle",_readIndex:!0,beans:!0,initialize:function(t,i,n,s){var a,o=typeof t;if("number"===o?(this._set(t,i,n,s),a=4):"undefined"===o||null===t?(this._set(0,0,0,0),a=null===t?1:0):1===arguments.length&&(Array.isArray(t)?(this._set.apply(this,t),a=1):t.x!==e||t.width!==e?(this._set(t.x||0,t.y||0,t.width||0,t.height||0),a=1):t.from===e&&t.to===e&&(this._set(0,0,0,0),r.filter(this,t),a=1)),a===e){var h,u,l=c.readNamed(arguments,"from"),f=r.peek(arguments),_=l.x,g=l.y;if(f&&f.x!==e||r.hasNamed(arguments,"to")){var v=c.readNamed(arguments,"to");h=v.x-_,u=v.y-g,h<0&&(_=v.x,h=-h),u<0&&(g=v.y,u=-u)}else{var p=d.read(arguments);h=p.width,u=p.height}this._set(_,g,h,u),a=arguments.__index;var m=arguments.__filtered;m&&(this.__filtered=m)}return this.__read&&(this.__read=a),this},set:"#initialize",_set:function(t,e,i,n){return this.x=t,this.y=e,this.width=i,this.height=n,this},clone:function(){return new g(this.x,this.y,this.width,this.height)},equals:function(t){var e=r.isPlainValue(t)?g.read(arguments):t;return e===this||e&&this.x===e.x&&this.y===e.y&&this.width===e.width&&this.height===e.height||!1},toString:function(){var t=h.instance;return"{ x: "+t.number(this.x)+", y: "+t.number(this.y)+", width: "+t.number(this.width)+", height: "+t.number(this.height)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.x),e.number(this.y),e.number(this.width),e.number(this.height)]},getPoint:function(t){return new(t?c:f)(this.x,this.y,this,"setPoint")},setPoint:function(){var t=c.read(arguments);this.x=t.x,this.y=t.y},getSize:function(t){return new(t?d:_)(this.width,this.height,this,"setSize")},_fw:1,_fh:1,setSize:function(){var t=d.read(arguments),e=this._sx,i=this._sy,n=t.width,r=t.height;e&&(this.x+=(this.width-n)*e),i&&(this.y+=(this.height-r)*i),this.width=n,this.height=r,this._fw=this._fh=1},getLeft:function(){return this.x},setLeft:function(t){if(!this._fw){var e=t-this.x;this.width-=.5===this._sx?2*e:e}this.x=t,this._sx=this._fw=0},getTop:function(){return this.y},setTop:function(t){if(!this._fh){var e=t-this.y;this.height-=.5===this._sy?2*e:e}this.y=t,this._sy=this._fh=0},getRight:function(){return this.x+this.width},setRight:function(t){if(!this._fw){var e=t-this.x;this.width=.5===this._sx?2*e:e}this.x=t-this.width,this._sx=1,this._fw=0},getBottom:function(){return this.y+this.height},setBottom:function(t){if(!this._fh){var e=t-this.y;this.height=.5===this._sy?2*e:e}this.y=t-this.height,this._sy=1,this._fh=0},getCenterX:function(){return this.x+this.width/2},setCenterX:function(t){this._fw||.5===this._sx?this.x=t-this.width/2:(this._sx&&(this.x+=2*(t-this.x)*this._sx),this.width=2*(t-this.x)),this._sx=.5,this._fw=0},getCenterY:function(){return this.y+this.height/2},setCenterY:function(t){this._fh||.5===this._sy?this.y=t-this.height/2:(this._sy&&(this.y+=2*(t-this.y)*this._sy),this.height=2*(t-this.y)),this._sy=.5,this._fh=0},getCenter:function(t){return new(t?c:f)(this.getCenterX(),this.getCenterY(),this,"setCenter")},setCenter:function(){var t=c.read(arguments);return this.setCenterX(t.x),this.setCenterY(t.y),this},getArea:function(){return this.width*this.height},isEmpty:function(){return 0===this.width||0===this.height},contains:function(t){return t&&t.width!==e||4===(Array.isArray(t)?t:arguments).length?this._containsRectangle(g.read(arguments)):this._containsPoint(c.read(arguments))},_containsPoint:function(t){var e=t.x,i=t.y;return e>=this.x&&i>=this.y&&e<=this.x+this.width&&i<=this.y+this.height},_containsRectangle:function(t){var e=t.x,i=t.y;return e>=this.x&&i>=this.y&&e+t.width<=this.x+this.width&&i+t.height<=this.y+this.height},intersects:function(){var t=g.read(arguments),e=r.read(arguments)||0;return t.x+t.width>this.x-e&&t.y+t.height>this.y-e&&t.x<this.x+this.width+e&&t.y<this.y+this.height+e},intersect:function(){var t=g.read(arguments),e=Math.max(this.x,t.x),i=Math.max(this.y,t.y),n=Math.min(this.x+this.width,t.x+t.width),r=Math.min(this.y+this.height,t.y+t.height);return new g(e,i,n-e,r-i)},unite:function(){var t=g.read(arguments),e=Math.min(this.x,t.x),i=Math.min(this.y,t.y),n=Math.max(this.x+this.width,t.x+t.width),r=Math.max(this.y+this.height,t.y+t.height);return new g(e,i,n-e,r-i)},include:function(){var t=c.read(arguments),e=Math.min(this.x,t.x),i=Math.min(this.y,t.y),n=Math.max(this.x+this.width,t.x),r=Math.max(this.y+this.height,t.y);return new g(e,i,n-e,r-i)},expand:function(){var t=d.read(arguments),e=t.width,i=t.height;return new g(this.x-e/2,this.y-i/2,this.width+e,this.height+i)},scale:function(t,i){return this.expand(this.width*t-this.width,this.height*(i===e?t:i)-this.height)}},r.each([["Top","Left"],["Top","Right"],["Bottom","Left"],["Bottom","Right"],["Left","Center"],["Top","Center"],["Right","Center"],["Bottom","Center"]],function(t,e){var i=t.join(""),n=/^[RL]/.test(i);e>=4&&(t[1]+=n?"Y":"X");var r=t[n?0:1],s=t[n?1:0],a="get"+r,o="get"+s,h="set"+r,u="set"+s,l="set"+i;this["get"+i]=function(t){return new(t?c:f)(this[a](),this[o](),this,l)},this[l]=function(){var t=c.read(arguments);this[h](t.x),this[u](t.y)}},{beans:!0})),v=g.extend({initialize:function(t,e,i,n,r,s){this._set(t,e,i,n,!0),this._owner=r,this._setter=s},_set:function(t,e,i,n,r){return this._x=t,this._y=e,this._width=i,this._height=n,r||this._owner[this._setter](this),this}},new function(){var t=g.prototype;return r.each(["x","y","width","height"],function(t){var e=r.capitalize(t),i="_"+t;this["get"+e]=function(){return this[i]},this["set"+e]=function(t){this[i]=t,this._dontNotify||this._owner[this._setter](this)}},r.each(["Point","Size","Center","Left","Top","Right","Bottom","CenterX","CenterY","TopLeft","TopRight","BottomLeft","BottomRight","LeftCenter","TopCenter","RightCenter","BottomCenter"],function(e){var i="set"+e;this[i]=function(){this._dontNotify=!0,t[i].apply(this,arguments),this._dontNotify=!1,this._owner[this._setter](this)}},{isSelected:function(){return!!(2&this._owner._selection)},setSelected:function(t){var e=this._owner;e._changeSelection&&e._changeSelection(2,t)}}))}),p=r.extend({_class:"Matrix",initialize:function t(e,i){var n=arguments.length,r=!0;if(n>=6?this._set.apply(this,arguments):1===n||2===n?e instanceof t?this._set(e._a,e._b,e._c,e._d,e._tx,e._ty,i):Array.isArray(e)?this._set.apply(this,i?e.concat([i]):e):r=!1:n?r=!1:this.reset(),!r)throw new Error("Unsupported matrix parameters");return this},set:"#initialize",_set:function(t,e,i,n,r,s,a){return this._a=t,this._b=e,this._c=i,this._d=n,this._tx=r,this._ty=s,a||this._changed(),this},_serialize:function(t,e){return r.serialize(this.getValues(),t,!0,e)},_changed:function(){var t=this._owner;t&&(t._applyMatrix?t.transform(null,!0):t._changed(9))},clone:function(){return new p(this._a,this._b,this._c,this._d,this._tx,this._ty)},equals:function(t){return t===this||t&&this._a===t._a&&this._b===t._b&&this._c===t._c&&this._d===t._d&&this._tx===t._tx&&this._ty===t._ty},toString:function(){var t=h.instance;return"[["+[t.number(this._a),t.number(this._c),t.number(this._tx)].join(", ")+"], ["+[t.number(this._b),t.number(this._d),t.number(this._ty)].join(", ")+"]]"},reset:function(t){return this._a=this._d=1,this._b=this._c=this._tx=this._ty=0,t||this._changed(),this},apply:function(t,e){var i=this._owner;return!!i&&(i.transform(null,!0,r.pick(t,!0),e),this.isIdentity())},translate:function(){var t=c.read(arguments),e=t.x,i=t.y;return this._tx+=e*this._a+i*this._c,this._ty+=e*this._b+i*this._d,this._changed(),this},scale:function(){var t=c.read(arguments),e=c.read(arguments,0,{readNull:!0});return e&&this.translate(e),this._a*=t.x,this._b*=t.x,this._c*=t.y,this._d*=t.y,e&&this.translate(e.negate()),this._changed(),this},rotate:function(t){t*=Math.PI/180;var e=c.read(arguments,1),i=e.x,n=e.y,r=Math.cos(t),s=Math.sin(t),a=i-i*r+n*s,o=n-i*s-n*r,h=this._a,u=this._b,l=this._c,f=this._d;return this._a=r*h+s*l,this._b=r*u+s*f,this._c=-s*h+r*l,this._d=-s*u+r*f,this._tx+=a*h+o*l,this._ty+=a*u+o*f,this._changed(),this},shear:function(){var t=c.read(arguments),e=c.read(arguments,0,{readNull:!0});e&&this.translate(e);var i=this._a,n=this._b;return this._a+=t.y*this._c,this._b+=t.y*this._d,this._c+=t.x*i,this._d+=t.x*n,e&&this.translate(e.negate()),this._changed(),this},skew:function(){var t=c.read(arguments),e=c.read(arguments,0,{readNull:!0}),i=Math.PI/180,n=new c(Math.tan(t.x*i),Math.tan(t.y*i));return this.shear(n,e)},append:function(t,e){if(t){var i=this._a,n=this._b,r=this._c,s=this._d,a=t._a,o=t._c,h=t._b,u=t._d,l=t._tx,c=t._ty;this._a=a*i+h*r,this._c=o*i+u*r,this._b=a*n+h*s,this._d=o*n+u*s,this._tx+=l*i+c*r,this._ty+=l*n+c*s,e||this._changed()}return this},prepend:function(t,e){if(t){var i=this._a,n=this._b,r=this._c,s=this._d,a=this._tx,o=this._ty,h=t._a,u=t._c,l=t._b,c=t._d,f=t._tx,d=t._ty;this._a=h*i+u*n,this._c=h*r+u*s,this._b=l*i+c*n,this._d=l*r+c*s,this._tx=h*a+u*o+f,this._ty=l*a+c*o+d,e||this._changed()}return this},appended:function(t){return this.clone().append(t)},prepended:function(t){return this.clone().prepend(t)},invert:function(){var t=this._a,e=this._b,i=this._c,n=this._d,r=this._tx,s=this._ty,a=t*n-e*i,o=null;return a&&!isNaN(a)&&isFinite(r)&&isFinite(s)&&(this._a=n/a,this._b=-e/a,this._c=-i/a,this._d=t/a,this._tx=(i*s-n*r)/a,this._ty=(e*r-t*s)/a,o=this),o},inverted:function(){return this.clone().invert()},concatenate:"#append",preConcatenate:"#prepend",chain:"#appended",_shiftless:function(){return new p(this._a,this._b,this._c,this._d,0,0)},_orNullIfIdentity:function(){return this.isIdentity()?null:this},isIdentity:function(){return 1===this._a&&0===this._b&&0===this._c&&1===this._d&&0===this._tx&&0===this._ty},isInvertible:function(){var t=this._a*this._d-this._c*this._b;return t&&!isNaN(t)&&isFinite(this._tx)&&isFinite(this._ty)},isSingular:function(){return!this.isInvertible()},transform:function(t,e,i){return arguments.length<3?this._transformPoint(c.read(arguments)):this._transformCoordinates(t,e,i)},_transformPoint:function(t,e,i){var n=t.x,r=t.y;return e||(e=new c),e._set(n*this._a+r*this._c+this._tx,n*this._b+r*this._d+this._ty,i)},_transformCoordinates:function(t,e,i){for(var n=0,r=2*i;n<r;n+=2){var s=t[n],a=t[n+1];e[n]=s*this._a+a*this._c+this._tx,e[n+1]=s*this._b+a*this._d+this._ty}return e},_transformCorners:function(t){var e=t.x,i=t.y,n=e+t.width,r=i+t.height,s=[e,i,n,i,n,r,e,r];return this._transformCoordinates(s,s,4)},_transformBounds:function(t,e,i){for(var n=this._transformCorners(t),r=n.slice(0,2),s=r.slice(),a=2;a<8;a++){var o=n[a],h=1&a;o<r[h]?r[h]=o:o>s[h]&&(s[h]=o)}return e||(e=new g),e._set(r[0],r[1],s[0]-r[0],s[1]-r[1],i)},inverseTransform:function(){return this._inverseTransform(c.read(arguments))},_inverseTransform:function(t,e,i){var n=this._a,r=this._b,s=this._c,a=this._d,o=this._tx,h=this._ty,u=n*a-r*s,l=null;if(u&&!isNaN(u)&&isFinite(o)&&isFinite(h)){var f=t.x-this._tx,d=t.y-this._ty;e||(e=new c),l=e._set((f*a-d*s)/u,(d*n-f*r)/u,i)}return l},decompose:function(){var t,e,i,n=this._a,r=this._b,s=this._c,a=this._d,o=n*a-r*s,h=Math.sqrt,u=Math.atan2,l=180/Math.PI;if(0!==n||0!==r){var f=h(n*n+r*r);t=Math.acos(n/f)*(r>0?1:-1),e=[f,o/f],i=[u(n*s+r*a,f*f),0]}else if(0!==s||0!==a){var d=h(s*s+a*a);t=Math.asin(s/d)*(a>0?1:-1),e=[o/d,d],i=[0,u(n*s+r*a,d*d)]}else t=0,i=e=[0,0];return{translation:this.getTranslation(),rotation:t*l,scaling:new c(e),skewing:new c(i[0]*l,i[1]*l)}},getValues:function(){return[this._a,this._b,this._c,this._d,this._tx,this._ty]},getTranslation:function(){return new c(this._tx,this._ty)},getScaling:function(){return(this.decompose()||{}).scaling},getRotation:function(){return(this.decompose()||{}).rotation},applyToContext:function(t){this.isIdentity()||t.transform(this._a,this._b,this._c,this._d,this._tx,this._ty)}},r.each(["a","b","c","d","tx","ty"],function(t){var e=r.capitalize(t),i="_"+t;this["get"+e]=function(){return this[i]},this["set"+e]=function(t){this[i]=t,this._changed()}},{})),m=r.extend({_class:"Line",initialize:function(t,e,i,n,r){var s=!1;arguments.length>=4?(this._px=t,this._py=e,this._vx=i,this._vy=n,s=r):(this._px=t.x,this._py=t.y,this._vx=e.x,this._vy=e.y,s=i),s||(this._vx-=this._px,this._vy-=this._py)},getPoint:function(){return new c(this._px,this._py)},getVector:function(){return new c(this._vx,this._vy)},getLength:function(){return this.getVector().getLength()},intersect:function(t,e){return m.intersect(this._px,this._py,this._vx,this._vy,t._px,t._py,t._vx,t._vy,!0,e)},getSide:function(t,e){return m.getSide(this._px,this._py,this._vx,this._vy,t.x,t.y,!0,e)},getDistance:function(t){return Math.abs(this.getSignedDistance(t))},getSignedDistance:function(t){return m.getSignedDistance(this._px,this._py,this._vx,this._vy,t.x,t.y,!0)},isCollinear:function(t){return c.isCollinear(this._vx,this._vy,t._vx,t._vy)},isOrthogonal:function(t){return c.isOrthogonal(this._vx,this._vy,t._vx,t._vy)},statics:{intersect:function(t,e,i,n,r,s,a,o,h,l){h||(i-=t,n-=e,a-=r,o-=s);var f=i*o-n*a;if(!u.isZero(f)){var d=t-r,_=e-s,g=(a*_-o*d)/f,v=(i*_-n*d)/f;if(l||-1e-12<g&&g<1+1e-12&&-1e-12<v&&v<1+1e-12)return l||(g=g<=0?0:g>=1?1:g),new c(t+g*i,e+g*n)}},getSide:function(t,e,i,n,r,s,a,o){a||(i-=t,n-=e);var h=r-t,l=h*n-(s-e)*i;return!o&&u.isZero(l)&&(l=(h*i+h*i)/(i*i+n*n))>=0&&l<=1&&(l=0),l<0?-1:l>0?1:0},getSignedDistance:function(t,e,i,n,r,s,a){return a||(i-=t,n-=e),0===i?n>0?r-t:t-r:0===n?i<0?s-e:e-s:((r-t)*n-(s-e)*i)/Math.sqrt(i*i+n*n)},getDistance:function(t,e,i,n,r,s,a){return Math.abs(m.getSignedDistance(t,e,i,n,r,s,a))}}}),y=o.extend({_class:"Project",_list:"projects",_reference:"project",_compactSerialize:!0,initialize:function(t){o.call(this,!0),this._children=[],this._namedChildren={},this._activeLayer=null,this._currentStyle=new V(null,null,this),this._view=U.create(this,t||Q.getCanvas(1,1)),this._selectionItems={},this._selectionCount=0,this._updateVersion=0},_serialize:function(t,e){return r.serialize(this._children,t,!0,e)},_changed:function(t,e){if(1&t){var i=this._view;i&&(i._needsUpdate=!0,!i._requested&&i._autoUpdate&&i.requestUpdate())}var n=this._changes;if(n&&e){var r=this._changesById,s=e._id,a=r[s];a?a.flags|=t:n.push(r[s]={item:e,flags:t})}},clear:function(){for(var t=this._children,e=t.length-1;e>=0;e--)t[e].remove()},isEmpty:function(){return!this._children.length},remove:function t(){return!!t.base.call(this)&&(this._view&&this._view.remove(),!0)},getView:function(){return this._view},getCurrentStyle:function(){return this._currentStyle},setCurrentStyle:function(t){this._currentStyle.set(t)},getIndex:function(){return this._index},getOptions:function(){return this._scope.settings},getLayers:function(){return this._children},getActiveLayer:function(){return this._activeLayer||new b({project:this,insert:!0})},getSymbolDefinitions:function(){var t=[],e={};return this.getItems({class:P,match:function(i){var n=i._definition,r=n._id;return e[r]||(e[r]=!0,t.push(n)),!1}}),t},getSymbols:"getSymbolDefinitions",getSelectedItems:function(){var t=this._selectionItems,e=[];for(var i in t){var n=t[i],r=n._selection;1&r&&n.isInserted()?e.push(n):r||this._updateSelection(n)}return e},_updateSelection:function(t){var e=t._id,i=this._selectionItems;t._selection?i[e]!==t&&(this._selectionCount++,i[e]=t):i[e]===t&&(this._selectionCount--,delete i[e])},selectAll:function(){for(var t=this._children,e=0,i=t.length;e<i;e++)t[e].setFullySelected(!0)},deselectAll:function(){var t=this._selectionItems;for(var e in t)t[e].setFullySelected(!1)},addLayer:function(t){return this.insertLayer(e,t)},insertLayer:function(t,e){if(e instanceof b){e._remove(!1,!0),r.splice(this._children,[e],t,0),e._setProject(this,!0);var i=e._name;i&&e.setName(i),this._changes&&e._changed(5),this._activeLayer||(this._activeLayer=e)}else e=null;return e},_insertItem:function(t,i,n){return i=this.insertLayer(t,i)||(this._activeLayer||this._insertItem(e,new b(w.NO_INSERT),!0)).insertChild(t,i),n&&i.activate&&i.activate(),i},getItems:function(t){return w._getItems(this,t)},getItem:function(t){return w._getItems(this,t,null,null,!0)[0]||null},importJSON:function(t){this.activate();var e=this._activeLayer;return r.importJSON(t,e&&e.isEmpty()&&e)},removeOn:function(t){var e=this._removeSets;if(e){"mouseup"===t&&(e.mousedrag=null);var i=e[t];if(i){for(var n in i){var r=i[n];for(var s in e){var a=e[s];a&&a!=i&&delete a[r._id]}r.remove()}e[t]=null}}},draw:function(t,e,i){this._updateVersion++,t.save(),e.applyToContext(t);for(var n=this._children,s=new r({offset:new c(0,0),pixelRatio:i,viewMatrix:e.isIdentity()?null:e,matrices:[new p],updateMatrix:!0}),a=0,o=n.length;a<o;a++)n[a].draw(t,s);if(t.restore(),this._selectionCount>0){t.save(),t.strokeWidth=1;var h=this._selectionItems,u=this._scope.settings.handleSize,l=this._updateVersion;for(var f in h)h[f]._drawSelection(t,e,u,h,l);t.restore()}}}),w=r.extend(s,{statics:{extend:function t(e){return e._serializeFields&&(e._serializeFields=r.set({},this.prototype._serializeFields,e._serializeFields)),t.base.apply(this,arguments)},NO_INSERT:{insert:!1}},_class:"Item",_name:null,_applyMatrix:!0,_canApplyMatrix:!0,_canScaleStroke:!1,_pivot:null,_visible:!0,_blendMode:"normal",_opacity:1,_locked:!1,_guide:!1,_clipMask:!1,_selection:0,_selectBounds:!0,_selectChildren:!1,_serializeFields:{name:null,applyMatrix:null,matrix:new p,pivot:null,visible:!0,blendMode:"normal",opacity:1,locked:!1,guide:!1,clipMask:!1,selected:!1,data:{}},_prioritize:["applyMatrix"]},new function(){var t=["onMouseDown","onMouseUp","onMouseDrag","onClick","onDoubleClick","onMouseMove","onMouseEnter","onMouseLeave"];return r.each(t,function(t){this._events[t]={install:function(t){this.getView()._countItemEvent(t,1)},uninstall:function(t){this.getView()._countItemEvent(t,-1)}}},{_events:{onFrame:{install:function(){this.getView()._animateItem(this,!0)},uninstall:function(){this.getView()._animateItem(this,!1)}},onLoad:{},onError:{}},statics:{_itemHandlers:t}})},{initialize:function(){},_initialize:function(t,i){var n=t&&r.isPlainObject(t),s=n&&!0===t.internal,a=this._matrix=new p,o=n&&t.project||paper.project,h=paper.settings;return this._id=s?null:l.get(),this._parent=this._index=null,this._applyMatrix=this._canApplyMatrix&&h.applyMatrix,i&&a.translate(i),a._owner=this,this._style=new V(o._currentStyle,this,o),s||n&&0==t.insert||!h.insertItems&&(!n||!0!==t.insert)?this._setProject(o):(n&&t.parent||o)._insertItem(e,this,!0),n&&t!==w.NO_INSERT&&this.set(t,{internal:!0,insert:!0,project:!0,parent:!0}),n},_serialize:function(t,e){function i(i){for(var a in i){var o=s[a];r.equals(o,"leading"===a?1.2*i.fontSize:i[a])||(n[a]=r.serialize(o,t,"data"!==a,e))}}var n={},s=this;return i(this._serializeFields),this instanceof x||i(this._style._defaults),[this._class,n]},_changed:function(t){var i=this._symbol,n=this._parent||i,r=this._project;8&t&&(this._bounds=this._position=this._decomposed=this._globalMatrix=e),n&&40&t&&w._clearBoundsCache(n),2&t&&w._clearBoundsCache(this),r&&r._changed(t,this),i&&i._changed(t)},getId:function(){return this._id},getName:function(){return this._name},setName:function(t){if(this._name&&this._removeNamed(),t===+t+"")throw new Error("Names consisting only of numbers are not supported.");var i=this._getOwner();if(t&&i){var n=i._children,r=i._namedChildren;(r[t]=r[t]||[]).push(this),t in n||(n[t]=this)}this._name=t||e,this._changed(128)},getStyle:function(){return this._style},setStyle:function(t){this.getStyle().set(t)}},r.each(["locked","visible","blendMode","opacity","guide"],function(t){var e=r.capitalize(t),i="_"+t,n={locked:128,visible:137};this["get"+e]=function(){return this[i]},this["set"+e]=function(e){e!=this[i]&&(this[i]=e,this._changed(n[t]||129))}},{}),{beans:!0,getSelection:function(){return this._selection},setSelection:function(t){if(t!==this._selection){this._selection=t;var e=this._project;e&&(e._updateSelection(this),this._changed(129))}},_changeSelection:function(t,e){var i=this._selection;this.setSelection(e?i|t:i&~t)},isSelected:function(){if(this._selectChildren)for(var t=this._children,e=0,i=t.length;e<i;e++)if(t[e].isSelected())return!0;return!!(1&this._selection)},setSelected:function(t){if(this._selectChildren)for(var e=this._children,i=0,n=e.length;i<n;i++)e[i].setSelected(t);this._changeSelection(1,t)},isFullySelected:function(){var t=this._children,e=!!(1&this._selection);if(t&&e){for(var i=0,n=t.length;i<n;i++)if(!t[i].isFullySelected())return!1;return!0}return e},setFullySelected:function(t){var e=this._children;if(e)for(var i=0,n=e.length;i<n;i++)e[i].setFullySelected(t);this._changeSelection(1,t)},isClipMask:function(){return this._clipMask},setClipMask:function(t){this._clipMask!=(t=!!t)&&(this._clipMask=t,t&&(this.setFillColor(null),this.setStrokeColor(null)),this._changed(129),this._parent&&this._parent._changed(1024))},getData:function(){return this._data||(this._data={}),this._data},setData:function(t){this._data=t},getPosition:function(t){var e=this._position,i=t?c:f;if(!e){var n=this._pivot;e=this._position=n?this._matrix._transformPoint(n):this.getBounds().getCenter(!0)}return new i(e.x,e.y,this,"setPosition")},setPosition:function(){this.translate(c.read(arguments).subtract(this.getPosition(!0)))},getPivot:function(){var t=this._pivot;return t?new f(t.x,t.y,this,"setPivot"):null},setPivot:function(){this._pivot=c.read(arguments,0,{clone:!0,readNull:!0}),this._position=e}},r.each({getStrokeBounds:{stroke:!0},getHandleBounds:{handle:!0},getInternalBounds:{internal:!0}},function(t,e){this[e]=function(e){return this.getBounds(e,t)}},{beans:!0,getBounds:function(t,e){var i=e||t instanceof p,n=r.set({},i?e:t,this._boundsOptions);n.stroke&&!this.getStrokeScaling()||(n.cacheItem=this);var s=this._getCachedBounds(i&&t,n).rect;return arguments.length?s:new v(s.x,s.y,s.width,s.height,this,"setBounds")},setBounds:function(){var t=g.read(arguments),e=this.getBounds(),i=this._matrix,n=new p,r=t.getCenter();n.translate(r),t.width==e.width&&t.height==e.height||(i.isInvertible()||(i.set(i._backup||(new p).translate(i.getTranslation())),e=this.getBounds()),n.scale(0!==e.width?t.width/e.width:0,0!==e.height?t.height/e.height:0)),r=e.getCenter(),n.translate(-r.x,-r.y),this.transform(n)},_getBounds:function(t,e){var i=this._children;return i&&i.length?(w._updateBoundsCache(this,e.cacheItem),w._getBounds(i,t,e)):new g},_getBoundsCacheKey:function(t,e){return[t.stroke?1:0,t.handle?1:0,e?1:0].join("")},_getCachedBounds:function(t,e,i){t=t&&t._orNullIfIdentity();var n=e.internal&&!i,r=e.cacheItem,s=n?null:this._matrix._orNullIfIdentity(),a=r&&(!t||t.equals(s))&&this._getBoundsCacheKey(e,n),o=this._bounds;if(w._updateBoundsCache(this._parent||this._symbol,r),a&&o&&a in o)return{rect:(f=o[a]).rect.clone(),nonscaling:f.nonscaling};var h=this._getBounds(t||s,e),u=h.rect||h,l=this._style,c=h.nonscaling||l.hasStroke()&&!l.getStrokeScaling();if(a){o||(this._bounds=o={});var f=o[a]={rect:u.clone(),nonscaling:c,internal:n}}return{rect:u,nonscaling:c}},_getStrokeMatrix:function(t,e){var i=this.getStrokeScaling()?null:e&&e.internal?this:this._parent||this._symbol&&this._symbol._item,n=i?i.getViewMatrix().invert():t;return n&&n._shiftless()},statics:{_updateBoundsCache:function(t,e){if(t&&e){var i=e._id,n=t._boundsCache=t._boundsCache||{ids:{},list:[]};n.ids[i]||(n.list.push(e),n.ids[i]=e)}},_clearBoundsCache:function(t){var i=t._boundsCache;if(i){t._bounds=t._position=t._boundsCache=e;for(var n=0,r=i.list,s=r.length;n<s;n++){var a=r[n];a!==t&&(a._bounds=a._position=e,a._boundsCache&&w._clearBoundsCache(a))}}},_getBounds:function(t,e,i){var n=1/0,r=-n,s=n,a=r,o=!1;i=i||{};for(var h=0,u=t.length;h<u;h++){var l=t[h];if(l._visible&&!l.isEmpty()){var c=l._getCachedBounds(e&&e.appended(l._matrix),i,!0),f=c.rect;n=Math.min(f.x,n),s=Math.min(f.y,s),r=Math.max(f.x+f.width,r),a=Math.max(f.y+f.height,a),c.nonscaling&&(o=!0)}}return{rect:isFinite(n)?new g(n,s,r-n,a-s):new g,nonscaling:o}}}}),{beans:!0,_decompose:function(){return this._applyMatrix?null:this._decomposed||(this._decomposed=this._matrix.decompose())},getRotation:function(){var t=this._decompose();return t?t.rotation:0},setRotation:function(t){var e=this.getRotation();if(null!=e&&null!=t){var i=this._decomposed;this.rotate(t-e),i&&(i.rotation=t,this._decomposed=i)}},getScaling:function(){var t=this._decompose(),e=t&&t.scaling;return new f(e?e.x:1,e?e.y:1,this,"setScaling")},setScaling:function(){var t=this.getScaling(),e=c.read(arguments,0,{clone:!0,readNull:!0});if(t&&e&&!t.equals(e)){var i=this.getRotation(),n=this._decomposed,r=new p,s=this.getPosition(!0);r.translate(s),i&&r.rotate(i),r.scale(e.x/t.x,e.y/t.y),i&&r.rotate(-i),r.translate(s.negate()),this.transform(r),n&&(n.scaling=e,this._decomposed=n)}},getMatrix:function(){return this._matrix},setMatrix:function(){var t=this._matrix;t.initialize.apply(t,arguments)},getGlobalMatrix:function(t){var e=this._globalMatrix,i=this._project._updateVersion;if(e&&e._updateVersion!==i&&(e=null),!e){e=this._globalMatrix=this._matrix.clone();var n=this._parent;n&&e.prepend(n.getGlobalMatrix(!0)),e._updateVersion=i}return t?e:e.clone()},getViewMatrix:function(){return this.getGlobalMatrix().prepend(this.getView()._matrix)},getApplyMatrix:function(){return this._applyMatrix},setApplyMatrix:function(t){(this._applyMatrix=this._canApplyMatrix&&!!t)&&this.transform(null,!0)},getTransformContent:"#getApplyMatrix",setTransformContent:"#setApplyMatrix"},{getProject:function(){return this._project},_setProject:function(t,e){if(this._project!==t){this._project&&this._installEvents(!1),this._project=t;for(var i=this._children,n=0,r=i&&i.length;n<r;n++)i[n]._setProject(t);e=!0}e&&this._installEvents(!0)},getView:function(){return this._project._view},_installEvents:function t(e){t.base.call(this,e);for(var i=this._children,n=0,r=i&&i.length;n<r;n++)i[n]._installEvents(e)},getLayer:function(){for(var t=this;t=t._parent;)if(t instanceof b)return t;return null},getParent:function(){return this._parent},setParent:function(t){return t.addChild(this)},_getOwner:"#getParent",getChildren:function(){return this._children},setChildren:function(t){this.removeChildren(),this.addChildren(t)},getFirstChild:function(){return this._children&&this._children[0]||null},getLastChild:function(){return this._children&&this._children[this._children.length-1]||null},getNextSibling:function(){var t=this._getOwner();return t&&t._children[this._index+1]||null},getPreviousSibling:function(){var t=this._getOwner();return t&&t._children[this._index-1]||null},getIndex:function(){return this._index},equals:function(t){return t===this||t&&this._class===t._class&&this._style.equals(t._style)&&this._matrix.equals(t._matrix)&&this._locked===t._locked&&this._visible===t._visible&&this._blendMode===t._blendMode&&this._opacity===t._opacity&&this._clipMask===t._clipMask&&this._guide===t._guide&&this._equals(t)||!1},_equals:function(t){return r.equals(this._children,t._children)},clone:function(t){var i=new this.constructor(w.NO_INSERT),n=this._children,s=r.pick(t?t.insert:e,t===e||!0===t),a=r.pick(t?t.deep:e,!0);n&&i.copyAttributes(this),n&&!a||i.copyContent(this),n||i.copyAttributes(this),s&&i.insertAbove(this);var o=this._name,h=this._parent;if(o&&h){for(var n=h._children,u=o,l=1;n[o];)o=u+" "+l++;o!==u&&i.setName(o)}return i},copyContent:function(t){for(var e=t._children,i=0,n=e&&e.length;i<n;i++)this.addChild(e[i].clone(!1),!0)},copyAttributes:function(t,e){this.setStyle(t._style);for(var i=["_locked","_visible","_blendMode","_opacity","_clipMask","_guide"],n=0,s=i.length;n<s;n++){var a=i[n];t.hasOwnProperty(a)&&(this[a]=t[a])}e||this._matrix.set(t._matrix,!0),this.setApplyMatrix(t._applyMatrix),this.setPivot(t._pivot),this.setSelection(t._selection);var o=t._data,h=t._name;this._data=o?r.clone(o):null,h&&this.setName(h)},rasterize:function(t,i){var n=this.getStrokeBounds(),s=(t||this.getView().getResolution())/72,a=n.getTopLeft().floor(),o=n.getBottomRight().ceil(),h=new d(o.subtract(a)),u=new S(w.NO_INSERT);if(!h.isZero()){var l=Q.getCanvas(h.multiply(s)),c=l.getContext("2d"),f=(new p).scale(s).translate(a.negate());c.save(),f.applyToContext(c),this.draw(c,new r({matrices:[f]})),c.restore(),u.setCanvas(l)}return u.transform((new p).translate(a.add(h.divide(2))).scale(1/s)),(i===e||i)&&u.insertAbove(this),u},contains:function(){return!!this._contains(this._matrix._inverseTransform(c.read(arguments)))},_contains:function(t){var e=this._children;if(e){for(var i=e.length-1;i>=0;i--)if(e[i].contains(t))return!0;return!1}return t.isInside(this.getInternalBounds())},isInside:function(){return g.read(arguments).contains(this.getBounds())},_asPathItem:function(){return new L.Rectangle({rectangle:this.getInternalBounds(),matrix:this._matrix,insert:!1})},intersects:function(t,e){return t instanceof w&&this._asPathItem().getIntersections(t._asPathItem(),null,e,!0).length>0}},new function(){function t(){return this._hitTest(c.read(arguments),M.getOptions(arguments))}function e(){var t=c.read(arguments),e=M.getOptions(arguments),i=[];return this._hitTest(t,r.set({all:i},e)),i}function i(t,e,i,n){var r=this._children;if(r)for(var s=r.length-1;s>=0;s--){var a=r[s],o=a!==n&&a._hitTest(t,e,i);if(o&&!e.all)return o}return null}return y.inject({hitTest:t,hitTestAll:e,_hitTest:i}),{hitTest:t,hitTestAll:e,_hitTestChildren:i}},{_hitTest:function(t,e,i){function n(t){return t&&_&&!_(t)&&(t=null),t&&e.all&&e.all.push(t),t}function s(e,i){var n=i?l["get"+i]():g.getPosition();if(t.subtract(n).divide(u).length<=1)return new M(e,g,{name:i?r.hyphenate(i):e,point:n})}if(this._locked||!this._visible||this._guide&&!e.guides||this.isEmpty())return null;var a=this._matrix,o=i?i.appended(a):this.getGlobalMatrix().prepend(this.getView()._matrix),h=Math.max(e.tolerance,1e-12),u=e._tolerancePadding=new d(L._getStrokePadding(h,a._shiftless().invert()));if(!(t=a._inverseTransform(t))||!this._children&&!this.getBounds({internal:!0,stroke:!0,handle:!0}).expand(u.multiply(2))._containsPoint(t))return null;var l,c,f=!(e.guides&&!this._guide||e.selected&&!this.isSelected()||e.type&&e.type!==r.hyphenate(this._class)||e.class&&!(this instanceof e.class)),_=e.match,g=this,v=e.position,p=e.center,m=e.bounds;if(f&&this._parent&&(v||p||m)){if((p||m)&&(l=this.getInternalBounds()),!(c=v&&s("position")||p&&s("center","Center"))&&m)for(var y=["TopLeft","TopRight","BottomLeft","BottomRight","LeftCenter","TopCenter","RightCenter","BottomCenter"],w=0;w<8&&!c;w++)c=s("bounds",y[w]);c=n(c)}return c||(c=this._hitTestChildren(t,e,o)||f&&n(this._hitTestSelf(t,e,o,this.getStrokeScaling()?null:o._shiftless().invert()))||null),c&&c.point&&(c.point=a.transform(c.point)),c},_hitTestSelf:function(t,e){if(e.fill&&this.hasFill()&&this._contains(t))return new M("fill",this)},matches:function(t,e){function i(t,e){for(var n in t)if(t.hasOwnProperty(n)){var s=t[n],a=e[n];if(r.isPlainObject(s)&&r.isPlainObject(a)){if(!i(s,a))return!1}else if(!r.equals(s,a))return!1}return!0}var n=typeof t;if("object"===n){for(var s in t)if(t.hasOwnProperty(s)&&!this.matches(s,t[s]))return!1;return!0}if("function"===n)return t(this);if("match"===t)return e(this);var a=/^(empty|editable)$/.test(t)?this["is"+r.capitalize(t)]():"type"===t?r.hyphenate(this._class):this[t];if("class"===t){if("function"==typeof e)return this instanceof e;a=this._class}if("function"==typeof e)return!!e(a);if(e){if(e.test)return e.test(a);if(r.isPlainObject(e))return i(e,a)}return r.equals(a,e)},getItems:function(t){return w._getItems(this,t,this._matrix)},getItem:function(t){return w._getItems(this,t,this._matrix,null,!0)[0]||null},statics:{_getItems:function t(e,i,n,s,a){if(!s){var o="object"==typeof i&&i,h=o&&o.overlapping,u=o&&o.inside,l=(w=h||u)&&g.read([w]);s={items:[],recursive:o&&!1!==o.recursive,inside:!!u,overlapping:!!h,rect:l,path:h&&new L.Rectangle({rectangle:l,insert:!1})},o&&(i=r.filter({},i,{recursive:!0,inside:!0,overlapping:!0}))}var c=e._children,f=s.items;n=(l=s.rect)&&(n||new p);for(var d=0,_=c&&c.length;d<_;d++){var v=c[d],m=n&&n.appended(v._matrix),y=!0;if(l){var w=v.getBounds(m);if(!l.intersects(w))continue;l.contains(w)||s.overlapping&&(w.contains(l)||s.path.intersects(v,m))||(y=!1)}if(y&&v.matches(i)&&(f.push(v),a))break;if(!1!==s.recursive&&t(v,i,m,s,a),a&&f.length>0)break}return f}}},{importJSON:function(t){var e=r.importJSON(t,this);return e!==this?this.addChild(e):e},addChild:function(t){return this.insertChild(e,t)},insertChild:function(t,e){var i=e?this.insertChildren(t,[e]):null;return i&&i[0]},addChildren:function(t){return this.insertChildren(this._children.length,t)},insertChildren:function(t,e){var i=this._children;if(i&&e&&e.length>0){for(var n={},s=(e=r.slice(e)).length-1;s>=0;s--){var a=(l=e[s])&&l._id;!l||n[a]?e.splice(s,1):(l._remove(!1,!0),n[a]=!0)}r.splice(i,e,t,0);for(var o=this._project,h=o._changes,s=0,u=e.length;s<u;s++){var l=e[s],c=l._name;l._parent=this,l._setProject(o,!0),c&&l.setName(c),h&&l._changed(5)}this._changed(11)}else e=null;return e},_insertItem:"#insertChild",_insertAt:function(t,e){var i=t&&t._getOwner(),n=t!==this&&i?this:null;return n&&(n._remove(!1,!0),i._insertItem(t._index+e,n)),n},insertAbove:function(t){return this._insertAt(t,1)},insertBelow:function(t){return this._insertAt(t,0)},sendToBack:function(){var t=this._getOwner();return t?t._insertItem(0,this):null},bringToFront:function(){var t=this._getOwner();return t?t._insertItem(e,this):null},appendTop:"#addChild",appendBottom:function(t){return this.insertChild(0,t)},moveAbove:"#insertAbove",moveBelow:"#insertBelow",addTo:function(t){return t._insertItem(e,this)},copyTo:function(t){return this.clone(!1).addTo(t)},reduce:function(t){var e=this._children;if(e&&1===e.length){var i=e[0].reduce(t);return this._parent?(i.insertAbove(this),this.remove()):i.remove(),i}return this},_removeNamed:function(){var t=this._getOwner();if(t){var e=t._children,i=t._namedChildren,n=this._name,r=i[n],s=r?r.indexOf(this):-1;-1!==s&&(e[n]==this&&delete e[n],r.splice(s,1),r.length?e[n]=r[0]:delete i[n])}},_remove:function(t,e){var i=this._getOwner(),n=this._project,s=this._index;return!!i&&(this._name&&this._removeNamed(),null!=s&&(n._activeLayer===this&&(n._activeLayer=this.getNextSibling()||this.getPreviousSibling()),r.splice(i._children,null,s,1)),this._installEvents(!1),t&&n._changes&&this._changed(5),e&&i._changed(11,this),this._parent=null,!0)},remove:function(){return this._remove(!0,!0)},replaceWith:function(t){var e=t&&t.insertBelow(this);return e&&this.remove(),e},removeChildren:function(t,e){if(!this._children)return null;t=t||0,e=r.pick(e,this._children.length);for(var i=r.splice(this._children,null,t,e-t),n=i.length-1;n>=0;n--)i[n]._remove(!0,!1);return i.length>0&&this._changed(11),i},clear:"#removeChildren",reverseChildren:function(){if(this._children){this._children.reverse();for(var t=0,e=this._children.length;t<e;t++)this._children[t]._index=t;this._changed(11)}},isEmpty:function(){var t=this._children;return!t||!t.length},isEditable:function(){for(var t=this;t;){if(!t._visible||t._locked)return!1;t=t._parent}return!0},hasFill:function(){return this.getStyle().hasFill()},hasStroke:function(){return this.getStyle().hasStroke()},hasShadow:function(){return this.getStyle().hasShadow()},_getOrder:function(t){function e(t){var e=[];do{e.unshift(t)}while(t=t._parent);return e}for(var i=e(this),n=e(t),r=0,s=Math.min(i.length,n.length);r<s;r++)if(i[r]!=n[r])return i[r]._index<n[r]._index?1:-1;return 0},hasChildren:function(){return this._children&&this._children.length>0},isInserted:function(){return!!this._parent&&this._parent.isInserted()},isAbove:function(t){return-1===this._getOrder(t)},isBelow:function(t){return 1===this._getOrder(t)},isParent:function(t){return this._parent===t},isChild:function(t){return t&&t._parent===this},isDescendant:function(t){for(var e=this;e=e._parent;)if(e===t)return!0;return!1},isAncestor:function(t){return!!t&&t.isDescendant(this)},isSibling:function(t){return this._parent===t._parent},isGroupedWith:function(t){for(var e=this._parent;e;){if(e._parent&&/^(Group|Layer|CompoundPath)$/.test(e._class)&&t.isDescendant(e))return!0;e=e._parent}return!1}},r.each(["rotate","scale","shear","skew"],function(t){var e="rotate"===t;this[t]=function(){var i=(e?r:c).read(arguments),n=c.read(arguments,0,{readNull:!0});return this.transform((new p)[t](i,n||this.getPosition(!0)))}},{translate:function(){var t=new p;return this.transform(t.translate.apply(t,arguments))},transform:function(t,e,i,n){var r=this._matrix,s=t&&!t.isIdentity(),a=(e||this._applyMatrix)&&(!r.isIdentity()||s||e&&i&&this._children);if(!s&&!a)return this;if(s){!t.isInvertible()&&r.isInvertible()&&(r._backup=r.getValues()),r.prepend(t,!0);var o=this._style,h=o.getFillColor(!0),u=o.getStrokeColor(!0);h&&h.transform(t),u&&u.transform(t)}if(a&&(a=this._transformContent(r,i,n))){var l=this._pivot;l&&r._transformPoint(l,l,!0),r.reset(!0),n&&this._canApplyMatrix&&(this._applyMatrix=!0)}var c=this._bounds,f=this._position;(s||a)&&this._changed(9);var d=s&&c&&t.decompose();if(d&&d.skewing.isZero()&&d.rotation%90==0){for(var _ in c){var g=c[_];if(g.nonscaling)delete c[_];else if(a||!g.internal){var v=g.rect;t._transformBounds(v,v)}}this._bounds=c;var p=c[this._getBoundsCacheKey(this._boundsOptions||{})];p&&(this._position=p.rect.getCenter(!0))}else s&&f&&this._pivot&&(this._position=t._transformPoint(f,f));return this},_transformContent:function(t,e,i){var n=this._children;if(n){for(var r=0,s=n.length;r<s;r++)n[r].transform(t,!0,e,i);return!0}},globalToLocal:function(){return this.getGlobalMatrix(!0)._inverseTransform(c.read(arguments))},localToGlobal:function(){return this.getGlobalMatrix(!0)._transformPoint(c.read(arguments))},parentToLocal:function(){return this._matrix._inverseTransform(c.read(arguments))},localToParent:function(){return this._matrix._transformPoint(c.read(arguments))},fitBounds:function(t,e){t=g.read(arguments);var i=this.getBounds(),n=i.height/i.width,r=t.height/t.width,s=(e?n>r:n<r)?t.width/i.width:t.height/i.height,a=new g(new c,new d(i.width*s,i.height*s));a.setCenter(t.getCenter()),this.setBounds(a)}}),{_setStyles:function(t,e,i){var n=this._style,r=this._matrix;if(n.hasFill()&&(t.fillStyle=n.getFillColor().toCanvasStyle(t,r)),n.hasStroke()){t.strokeStyle=n.getStrokeColor().toCanvasStyle(t,r),t.lineWidth=n.getStrokeWidth();var s=n.getStrokeJoin(),a=n.getStrokeCap(),o=n.getMiterLimit();if(s&&(t.lineJoin=s),a&&(t.lineCap=a),o&&(t.miterLimit=o),paper.support.nativeDash){var h=n.getDashArray(),u=n.getDashOffset();h&&h.length&&("setLineDash"in t?(t.setLineDash(h),t.lineDashOffset=u):(t.mozDash=h,t.mozDashOffset=u))}}if(n.hasShadow()){var l=e.pixelRatio||1,f=i._shiftless().prepend((new p).scale(l,l)),d=f.transform(new c(n.getShadowBlur(),0)),_=f.transform(this.getShadowOffset());t.shadowColor=n.getShadowColor().toCanvasStyle(t),t.shadowBlur=d.getLength(),t.shadowOffsetX=_.x,t.shadowOffsetY=_.y}},draw:function(t,e,i){var n=this._updateVersion=this._project._updateVersion;if(this._visible&&0!==this._opacity){var r=e.matrices,s=e.viewMatrix,a=this._matrix,o=r[r.length-1].appended(a);if(o.isInvertible()){s=s?s.appended(o):o,r.push(o),e.updateMatrix&&(o._updateVersion=n,this._globalMatrix=o);var h,u,l,c=this._blendMode,f=this._opacity,d="normal"===c,_=tt.nativeModes[c],g=d&&1===f||e.dontStart||e.clip||(_||d&&f<1)&&this._canComposite(),v=e.pixelRatio||1;if(!g){var p=this.getStrokeBounds(s);if(!p.width||!p.height)return;l=e.offset,u=e.offset=p.getTopLeft().floor(),h=t,t=Q.getContext(p.getSize().ceil().add(1).multiply(v)),1!==v&&t.scale(v,v)}t.save();var m=i?i.appended(a):this._canScaleStroke&&!this.getStrokeScaling(!0)&&s,y=!g&&e.clipItem,w=!m||y;if(g?(t.globalAlpha=f,_&&(t.globalCompositeOperation=c)):w&&t.translate(-u.x,-u.y),w&&(g?a:s).applyToContext(t),y&&e.clipItem.draw(t,e.extend({clip:!0})),m){t.setTransform(v,0,0,v,0,0);var x=e.offset;x&&t.translate(-x.x,-x.y)}this._draw(t,e,s,m),t.restore(),r.pop(),e.clip&&!e.dontFinish&&t.clip(),g||(tt.process(c,t,h,f,u.subtract(l).multiply(v)),Q.release(t),e.offset=l)}}},_isUpdated:function(t){var e=this._parent;if(e instanceof N)return e._isUpdated(t);var i=this._updateVersion===t;return!i&&e&&e._visible&&e._isUpdated(t)&&(this._updateVersion=t,i=!0),i},_drawSelection:function(t,e,i,n,r){var s=this._selection,a=1&s,o=2&s||a&&this._selectBounds,h=4&s;if(this._drawSelected||(a=!1),(a||o||h)&&this._isUpdated(r)){var u,l=this.getSelectedColor(!0)||(u=this.getLayer())&&u.getSelectedColor(!0),c=e.appended(this.getGlobalMatrix(!0)),f=i/2;if(t.strokeStyle=t.fillStyle=l?l.toCanvasStyle(t):"#009dec",a&&this._drawSelected(t,c,n),h){var d=this.getPosition(!0),_=d.x,g=d.y;t.beginPath(),t.arc(_,g,f,0,2*Math.PI,!0),t.stroke();for(var v=[[0,-1],[1,0],[0,1],[-1,0]],p=f,m=i+1,y=0;y<4;y++){var w=v[y],x=w[0],b=w[1];t.moveTo(_+x*p,g+b*p),t.lineTo(_+x*m,g+b*m),t.stroke()}}if(o){var C=c._transformCorners(this.getInternalBounds());t.beginPath();for(y=0;y<8;y++)t[y?"lineTo":"moveTo"](C[y],C[++y]);t.closePath(),t.stroke();for(y=0;y<8;y++)t.fillRect(C[y]-f,C[++y]-f,i,i)}}},_canComposite:function(){return!1}},r.each(["down","drag","up","move"],function(t){this["removeOn"+r.capitalize(t)]=function(){var e={};return e[t]=!0,this.removeOn(e)}},{removeOn:function(t){for(var e in t)if(t[e]){var i="mouse"+e,n=this._project,r=n._removeSets=n._removeSets||{};r[i]=r[i]||{},r[i][this._id]=this}return this}})),x=w.extend({_class:"Group",_selectBounds:!1,_selectChildren:!0,_serializeFields:{children:[]},initialize:function(t){this._children=[],this._namedChildren={},this._initialize(t)||this.addChildren(Array.isArray(t)?t:arguments)},_changed:function t(i){t.base.call(this,i),1026&i&&(this._clipItem=e)},_getClipItem:function(){var t=this._clipItem;if(t===e){t=null;for(var i=this._children,n=0,r=i.length;n<r;n++)if(i[n]._clipMask){t=i[n];break}this._clipItem=t}return t},isClipped:function(){return!!this._getClipItem()},setClipped:function(t){var e=this.getFirstChild();e&&e.setClipMask(t)},_getBounds:function t(e,i){var n=this._getClipItem();return n?n._getCachedBounds(e&&e.appended(n._matrix),r.set({},i,{stroke:!1})):t.base.call(this,e,i)},_hitTestChildren:function t(e,i,n){var r=this._getClipItem();return(!r||r.contains(e))&&t.base.call(this,e,i,n,r)},_draw:function(t,e){var i=e.clip,n=!i&&this._getClipItem();e=e.extend({clipItem:n,clip:!1}),i?(t.beginPath(),e.dontStart=e.dontFinish=!0):n&&n.draw(t,e.extend({clip:!0}));for(var r=this._children,s=0,a=r.length;s<a;s++){var o=r[s];o!==n&&o.draw(t,e)}}}),b=x.extend({_class:"Layer",initialize:function(){x.apply(this,arguments)},_getOwner:function(){return this._parent||null!=this._index&&this._project},isInserted:function t(){return this._parent?t.base.call(this):null!=this._index},activate:function(){this._project._activeLayer=this},_hitTestSelf:function(){}}),C=w.extend({_class:"Shape",_applyMatrix:!1,_canApplyMatrix:!1,_canScaleStroke:!0,_serializeFields:{type:null,size:null,radius:null},initialize:function(t,e){this._initialize(t,e)},_equals:function(t){return this._type===t._type&&this._size.equals(t._size)&&r.equals(this._radius,t._radius)},copyContent:function(t){this.setType(t._type),this.setSize(t._size),this.setRadius(t._radius)},getType:function(){return this._type},setType:function(t){this._type=t},getShape:"#getType",setShape:"#setType",getSize:function(){var t=this._size;return new _(t.width,t.height,this,"setSize")},setSize:function(){var t=d.read(arguments);if(this._size){if(!this._size.equals(t)){var e=this._type,i=t.width,n=t.height;"rectangle"===e?this._radius.set(d.min(this._radius,t.divide(2))):"circle"===e?(i=n=(i+n)/2,this._radius=i/2):"ellipse"===e&&this._radius._set(i/2,n/2),this._size._set(i,n),this._changed(9)}}else this._size=t.clone()},getRadius:function(){var t=this._radius;return"circle"===this._type?t:new _(t.width,t.height,this,"setRadius")},setRadius:function(t){var e=this._type;if("circle"===e){if(t===this._radius)return;i=2*t;this._radius=t,this._size._set(i,i)}else if(t=d.read(arguments),this._radius){if(this._radius.equals(t))return;if(this._radius.set(t),"rectangle"===e){var i=d.max(this._size,t.multiply(2));this._size.set(i)}else"ellipse"===e&&this._size._set(2*t.width,2*t.height)}else this._radius=t.clone();this._changed(9)},isEmpty:function(){return!1},toPath:function(t){var i=new(L[r.capitalize(this._type)])({center:new c,size:this._size,radius:this._radius,insert:!1});return i.copyAttributes(this),paper.settings.applyMatrix&&i.setApplyMatrix(!0),(t===e||t)&&i.insertAbove(this),i},toShape:"#clone",_asPathItem:function(){return this.toPath(!1)},_draw:function(t,e,i,n){var r=this._style,s=r.hasFill(),a=r.hasStroke(),o=e.dontFinish||e.clip,h=!n;if(s||a||o){var u=this._type,l=this._radius,c="circle"===u;if(e.dontStart||t.beginPath(),h&&c)t.arc(0,0,l,0,2*Math.PI,!0);else{var f=c?l:l.width,d=c?l:l.height,_=this._size,g=_.width,v=_.height;if(h&&"rectangle"===u&&0===f&&0===d)t.rect(-g/2,-v/2,g,v);else{var p=g/2,m=v/2,y=.44771525016920644,w=f*y,x=d*y,b=[-p,-m+d,-p,-m+x,-p+w,-m,-p+f,-m,p-f,-m,p-w,-m,p,-m+x,p,-m+d,p,m-d,p,m-x,p-w,m,p-f,m,-p+f,m,-p+w,m,-p,m-x,-p,m-d];n&&n.transform(b,b,32),t.moveTo(b[0],b[1]),t.bezierCurveTo(b[2],b[3],b[4],b[5],b[6],b[7]),p!==f&&t.lineTo(b[8],b[9]),t.bezierCurveTo(b[10],b[11],b[12],b[13],b[14],b[15]),m!==d&&t.lineTo(b[16],b[17]),t.bezierCurveTo(b[18],b[19],b[20],b[21],b[22],b[23]),p!==f&&t.lineTo(b[24],b[25]),t.bezierCurveTo(b[26],b[27],b[28],b[29],b[30],b[31])}}t.closePath()}o||!s&&!a||(this._setStyles(t,e,i),s&&(t.fill(r.getFillRule()),t.shadowColor="rgba(0,0,0,0)"),a&&t.stroke())},_canComposite:function(){return!(this.hasFill()&&this.hasStroke())},_getBounds:function(t,e){var i=new g(this._size).setCenter(0,0),n=this._style,r=e.stroke&&n.hasStroke()&&n.getStrokeWidth();return t&&(i=t._transformBounds(i)),r?i.expand(L._getStrokePadding(r,this._getStrokeMatrix(t,e))):i}},new function(){function t(t,e,i){var n=t._radius;if(!n.isZero())for(var r=t._size.divide(2),s=1;s<=4;s++){var a=new c(s>1&&s<4?-1:1,s>2?-1:1),o=a.multiply(r),h=o.subtract(a.multiply(n));if(new g(i?o.add(a.multiply(i)):o,h).contains(e))return{point:h,quadrant:s}}}function e(t,e,i,n){var r=t.divide(e);return(!n||r.isInQuadrant(n))&&r.subtract(r.normalize()).multiply(e).divide(i).length<=1}return{_contains:function e(i){if("rectangle"===this._type){var n=t(this,i);return n?i.subtract(n.point).divide(this._radius).getLength()<=1:e.base.call(this,i)}return i.divide(this.size).getLength()<=.5},_hitTestSelf:function i(n,r,s,a){var o=!1,h=this._style,u=r.stroke&&h.hasStroke(),l=r.fill&&h.hasFill();if(u||l){var c=this._type,f=this._radius,d=u?h.getStrokeWidth()/2:0,_=r._tolerancePadding.add(L._getStrokePadding(d,!h.getStrokeScaling()&&a));if("rectangle"===c){var v=_.multiply(2),p=t(this,n,v);if(p)o=e(n.subtract(p.point),f,_,p.quadrant);else{var m=new g(this._size).setCenter(0,0),y=m.expand(v),w=m.expand(v.negate());o=y._containsPoint(n)&&!w._containsPoint(n)}}else o=e(n,f,_)}return o?new M(u?"stroke":"fill",this):i.base.apply(this,arguments)}}},{statics:new function(){function t(t,e,i,n,s){var a=new C(r.getNamed(s),e);return a._type=t,a._size=i,a._radius=n,a}return{Circle:function(){var e=c.readNamed(arguments,"center"),i=r.readNamed(arguments,"radius");return t("circle",e,new d(2*i),i,arguments)},Rectangle:function(){var e=g.readNamed(arguments,"rectangle"),i=d.min(d.readNamed(arguments,"radius"),e.getSize(!0).divide(2));return t("rectangle",e.getCenter(!0),e.getSize(!0),i,arguments)},Ellipse:function(){var e=C._readEllipse(arguments),i=e.radius;return t("ellipse",e.center,i.multiply(2),i,arguments)},_readEllipse:function(t){var e,i;if(r.hasNamed(t,"radius"))e=c.readNamed(t,"center"),i=d.readNamed(t,"radius");else{var n=g.readNamed(t,"rectangle");e=n.getCenter(!0),i=n.getSize(!0).divide(2)}return{center:e,radius:i}}}}}),S=w.extend({_class:"Raster",_applyMatrix:!1,_canApplyMatrix:!1,_boundsOptions:{stroke:!1,handle:!1},_serializeFields:{crossOrigin:null,source:null},_prioritize:["crossOrigin"],initialize:function(t,i){if(!this._initialize(t,i!==e&&c.read(arguments,1))){var r="string"==typeof t?n.getElementById(t):t;r?this.setImage(r):this.setSource(t)}this._size||(this._size=new d,this._loaded=!1)},_equals:function(t){return this.getSource()===t.getSource()},copyContent:function(t){var e=t._image,i=t._canvas;if(e)this._setImage(e);else if(i){var n=Q.getCanvas(t._size);n.getContext("2d").drawImage(i,0,0),this._setImage(n)}this._crossOrigin=t._crossOrigin},getSize:function(){var t=this._size;return new _(t?t.width:0,t?t.height:0,this,"setSize")},setSize:function(){var t=d.read(arguments);if(!t.equals(this._size))if(t.width>0&&t.height>0){var e=this.getElement();this._setImage(Q.getCanvas(t)),e&&this.getContext(!0).drawImage(e,0,0,t.width,t.height)}else this._canvas&&Q.release(this._canvas),this._size=t.clone()},getWidth:function(){return this._size?this._size.width:0},setWidth:function(t){this.setSize(t,this.getHeight())},getHeight:function(){return this._size?this._size.height:0},setHeight:function(t){this.setSize(this.getWidth(),t)},getLoaded:function(){return this._loaded},isEmpty:function(){var t=this._size;return!t||0===t.width&&0===t.height},getResolution:function(){var t=this._matrix,e=new c(0,0).transform(t),i=new c(1,0).transform(t).subtract(e),n=new c(0,1).transform(t).subtract(e);return new d(72/i.getLength(),72/n.getLength())},getPpi:"#getResolution",getImage:function(){return this._image},setImage:function(t){function e(t){var e=i.getView(),n=t&&t.type||"load";e&&i.responds(n)&&(paper=e._scope,i.emit(n,new G(t)))}var i=this;this._setImage(t),this._loaded?setTimeout(e,0):t&&Z.add(t,{load:function(n){i._setImage(t),e(n)},error:e})},_setImage:function(t){this._canvas&&Q.release(this._canvas),t&&t.getContext?(this._image=null,this._canvas=t,this._loaded=!0):(this._image=t,this._canvas=null,this._loaded=!!(t&&t.src&&t.complete)),this._size=new d(t?t.naturalWidth||t.width:0,t?t.naturalHeight||t.height:0),this._context=null,this._changed(521)},getCanvas:function(){if(!this._canvas){var t=Q.getContext(this._size);try{this._image&&t.drawImage(this._image,0,0),this._canvas=t.canvas}catch(e){Q.release(t)}}return this._canvas},setCanvas:"#setImage",getContext:function(t){return this._context||(this._context=this.getCanvas().getContext("2d")),t&&(this._image=null,this._changed(513)),this._context},setContext:function(t){this._context=t},getSource:function(){var t=this._image;return t&&t.src||this.toDataURL()},setSource:function(e){var i=new t.Image,n=this._crossOrigin;n&&(i.crossOrigin=n),i.src=e,this.setImage(i)},getCrossOrigin:function(){var t=this._image;return t&&t.crossOrigin||this._crossOrigin||""},setCrossOrigin:function(t){this._crossOrigin=t;var e=this._image;e&&(e.crossOrigin=t)},getElement:function(){return this._canvas||this._loaded&&this._image}},{beans:!1,getSubCanvas:function(){var t=g.read(arguments),e=Q.getContext(t.getSize());return e.drawImage(this.getCanvas(),t.x,t.y,t.width,t.height,0,0,t.width,t.height),e.canvas},getSubRaster:function(){var t=g.read(arguments),e=new S(w.NO_INSERT);return e._setImage(this.getSubCanvas(t)),e.translate(t.getCenter().subtract(this.getSize().divide(2))),e._matrix.prepend(this._matrix),e.insertAbove(this),e},toDataURL:function(){var t=this._image,e=t&&t.src;if(/^data:/.test(e))return e;var i=this.getCanvas();return i?i.toDataURL.apply(i,arguments):null},drawImage:function(t){var e=c.read(arguments,1);this.getContext(!0).drawImage(t,e.x,e.y)},getAverageColor:function(t){var e,i;if(t?t instanceof A?(i=t,e=t.getBounds()):"object"==typeof t&&("width"in t?e=new g(t):"x"in t&&(e=new g(t.x-.5,t.y-.5,1,1))):e=this.getBounds(),!e)return null;var n=Math.min(e.width,32),s=Math.min(e.height,32),a=S._sampleContext;a?a.clearRect(0,0,33,33):a=S._sampleContext=Q.getContext(new d(32)),a.save();var o=(new p).scale(n/e.width,s/e.height).translate(-e.x,-e.y);o.applyToContext(a),i&&i.draw(a,new r({clip:!0,matrices:[o]})),this._matrix.applyToContext(a);var h=this.getElement(),u=this._size;h&&a.drawImage(h,-u.width/2,-u.height/2),a.restore();for(var l=a.getImageData(.5,.5,Math.ceil(n),Math.ceil(s)).data,c=[0,0,0],f=0,_=0,v=l.length;_<v;_+=4){var m=l[_+3];f+=m,m/=255,c[0]+=l[_]*m,c[1]+=l[_+1]*m,c[2]+=l[_+2]*m}for(_=0;_<3;_++)c[_]/=f;return f?F.read(c):null},getPixel:function(){var t=c.read(arguments),e=this.getContext().getImageData(t.x,t.y,1,1).data;return new F("rgb",[e[0]/255,e[1]/255,e[2]/255],e[3]/255)},setPixel:function(){var t=c.read(arguments),e=F.read(arguments),i=e._convert("rgb"),n=e._alpha,r=this.getContext(!0),s=r.createImageData(1,1),a=s.data;a[0]=255*i[0],a[1]=255*i[1],a[2]=255*i[2],a[3]=null!=n?255*n:255,r.putImageData(s,t.x,t.y)},createImageData:function(){var t=d.read(arguments);return this.getContext().createImageData(t.width,t.height)},getImageData:function(){var t=g.read(arguments);return t.isEmpty()&&(t=new g(this._size)),this.getContext().getImageData(t.x,t.y,t.width,t.height)},setImageData:function(t){var e=c.read(arguments,1);this.getContext(!0).putImageData(t,e.x,e.y)},_getBounds:function(t,e){var i=new g(this._size).setCenter(0,0);return t?t._transformBounds(i):i},_hitTestSelf:function(t){if(this._contains(t)){var e=this;return new M("pixel",e,{offset:t.add(e._size.divide(2)).round(),color:{get:function(){return e.getPixel(this.offset)}}})}},_draw:function(t){var e=this.getElement();e&&(t.globalAlpha=this._opacity,t.drawImage(e,-this._size.width/2,-this._size.height/2))},_canComposite:function(){return!0}}),P=w.extend({_class:"SymbolItem",_applyMatrix:!1,_canApplyMatrix:!1,_boundsOptions:{stroke:!0},_serializeFields:{symbol:null},initialize:function(t,i){this._initialize(t,i!==e&&c.read(arguments,1))||this.setDefinition(t instanceof I?t:new I(t))},_equals:function(t){return this._definition===t._definition},copyContent:function(t){this.setDefinition(t._definition)},getDefinition:function(){return this._definition},setDefinition:function(t){this._definition=t,this._changed(9)},getSymbol:"#getDefinition",setSymbol:"#setDefinition",isEmpty:function(){return this._definition._item.isEmpty()},_getBounds:function(t,e){var i=this._definition._item;return i._getCachedBounds(i._matrix.prepended(t),e)},_hitTestSelf:function(t,e,i){var n=this._definition._item._hitTest(t,e,i);return n&&(n.item=this),n},_draw:function(t,e){this._definition._item.draw(t,e)}}),I=r.extend({_class:"SymbolDefinition",initialize:function(t,e){this._id=l.get(),this.project=paper.project,t&&this.setItem(t,e)},_serialize:function(t,e){return e.add(this,function(){return r.serialize([this._class,this._item],t,!1,e)})},_changed:function(t){8&t&&w._clearBoundsCache(this),1&t&&this.project._changed(t)},getItem:function(){return this._item},setItem:function(t,e){t._symbol&&(t=t.clone()),this._item&&(this._item._symbol=null),this._item=t,t.remove(),t.setSelected(!1),e||t.setPosition(new c),t._symbol=this,this._changed(9)},getDefinition:"#getItem",setDefinition:"#setItem",place:function(t){return new P(this,t)},clone:function(){return new I(this._item.clone(!1))},equals:function(t){return t===this||t&&this._item.equals(t._item)||!1}}),M=r.extend({_class:"HitResult",initialize:function(t,e,i){this.type=t,this.item=e,i&&this.inject(i)},statics:{getOptions:function(t){var e=t&&r.read(t);return r.set({type:null,tolerance:paper.settings.hitTolerance,fill:!e,stroke:!e,segments:!e,handles:!1,ends:!1,position:!1,center:!1,bounds:!1,guides:!1,selected:!1},e)}}}),T=r.extend({_class:"Segment",beans:!0,_selection:0,initialize:function(t,i,n,r,s,a){var o,h,u,l,c=arguments.length;c>0&&(null==t||"object"==typeof t?1===c&&t&&"point"in t?(o=t.point,h=t.handleIn,u=t.handleOut,l=t.selection):(o=t,h=i,u=n,l=r):(o=[t,i],h=n!==e?[n,r]:null,u=s!==e?[s,a]:null)),new z(o,this,"_point"),new z(h,this,"_handleIn"),new z(u,this,"_handleOut"),l&&this.setSelection(l)},_serialize:function(t,e){var i=this._point,n=this._selection,s=n||this.hasHandles()?[i,this._handleIn,this._handleOut]:i;return n&&s.push(n),r.serialize(s,t,!0,e)},_changed:function(t){var e=this._path;if(e){var i,n=e._curves,r=this._index;n&&(t&&t!==this._point&&t!==this._handleIn||!(i=r>0?n[r-1]:e._closed?n[n.length-1]:null)||i._changed(),t&&t!==this._point&&t!==this._handleOut||!(i=n[r])||i._changed()),e._changed(25)}},getPoint:function(){return this._point},setPoint:function(){this._point.set(c.read(arguments))},getHandleIn:function(){return this._handleIn},setHandleIn:function(){this._handleIn.set(c.read(arguments))},getHandleOut:function(){return this._handleOut},setHandleOut:function(){this._handleOut.set(c.read(arguments))},hasHandles:function(){return!this._handleIn.isZero()||!this._handleOut.isZero()},isSmooth:function(){var t=this._handleIn,e=this._handleOut;return!t.isZero()&&!e.isZero()&&t.isCollinear(e)},clearHandles:function(){this._handleIn._set(0,0),this._handleOut._set(0,0)},getSelection:function(){return this._selection},setSelection:function(t){var e=this._selection,i=this._path;this._selection=t=t||0,i&&t!==e&&(i._updateSelection(this,e,t),i._changed(129))},_changeSelection:function(t,e){var i=this._selection;this.setSelection(e?i|t:i&~t)},isSelected:function(){return!!(7&this._selection)},setSelected:function(t){this._changeSelection(7,t)},getIndex:function(){return this._index!==e?this._index:null},getPath:function(){return this._path||null},getCurve:function(){var t=this._path,e=this._index;return t?(e>0&&!t._closed&&e===t._segments.length-1&&e--,t.getCurves()[e]||null):null},getLocation:function(){var t=this.getCurve();return t?new O(t,this===t._segment1?0:1):null},getNext:function(){var t=this._path&&this._path._segments;return t&&(t[this._index+1]||this._path._closed&&t[0])||null},smooth:function(t,i,n){var r=t||{},s=r.type,a=r.factor,o=this.getPrevious(),h=this.getNext(),u=(o||this)._point,l=this._point,f=(h||this)._point,d=u.getDistance(l),_=l.getDistance(f);if(s&&"catmull-rom"!==s){if("geometric"!==s)throw new Error("Smoothing method '"+s+"' not supported.");if(o&&h){var g=u.subtract(f),v=a===e?.4:a,p=v*d/(d+_);i||this.setHandleIn(g.multiply(p)),n||this.setHandleOut(g.multiply(p-v))}}else{var m=a===e?.5:a,y=Math.pow(d,m),w=y*y,x=Math.pow(_,m),b=x*x;if(!i&&o){var C=2*b+3*x*y+w,S=3*x*(x+y);this.setHandleIn(0!==S?new c((b*u._x+C*l._x-w*f._x)/S-l._x,(b*u._y+C*l._y-w*f._y)/S-l._y):new c)}if(!n&&h){var C=2*w+3*y*x+b,S=3*y*(y+x);this.setHandleOut(0!==S?new c((w*f._x+C*l._x-b*u._x)/S-l._x,(w*f._y+C*l._y-b*u._y)/S-l._y):new c)}}},getPrevious:function(){var t=this._path&&this._path._segments;return t&&(t[this._index-1]||this._path._closed&&t[t.length-1])||null},isFirst:function(){return!this._index},isLast:function(){var t=this._path;return t&&this._index===t._segments.length-1||!1},reverse:function(){var t=this._handleIn,e=this._handleOut,i=t.clone();t.set(e),e.set(i)},reversed:function(){return new T(this._point,this._handleOut,this._handleIn)},remove:function(){return!!this._path&&!!this._path.removeSegment(this._index)},clone:function(){return new T(this._point,this._handleIn,this._handleOut)},equals:function(t){return t===this||t&&this._class===t._class&&this._point.equals(t._point)&&this._handleIn.equals(t._handleIn)&&this._handleOut.equals(t._handleOut)||!1},toString:function(){var t=["point: "+this._point];return this._handleIn.isZero()||t.push("handleIn: "+this._handleIn),this._handleOut.isZero()||t.push("handleOut: "+this._handleOut),"{ "+t.join(", ")+" }"},transform:function(t){this._transformCoordinates(t,new Array(6),!0),this._changed()},interpolate:function(t,e,i){var n=1-i,r=i,s=t._point,a=e._point,o=t._handleIn,h=e._handleIn,u=e._handleOut,l=t._handleOut;this._point._set(n*s._x+r*a._x,n*s._y+r*a._y,!0),this._handleIn._set(n*o._x+r*h._x,n*o._y+r*h._y,!0),this._handleOut._set(n*l._x+r*u._x,n*l._y+r*u._y,!0),this._changed()},_transformCoordinates:function(t,e,i){var n=this._point,r=i&&this._handleIn.isZero()?null:this._handleIn,s=i&&this._handleOut.isZero()?null:this._handleOut,a=n._x,o=n._y,h=2;return e[0]=a,e[1]=o,r&&(e[h++]=r._x+a,e[h++]=r._y+o),s&&(e[h++]=s._x+a,e[h++]=s._y+o),t&&(t._transformCoordinates(e,e,h/2),a=e[0],o=e[1],i?(n._x=a,n._y=o,h=2,r&&(r._x=e[h++]-a,r._y=e[h++]-o),s&&(s._x=e[h++]-a,s._y=e[h++]-o)):(r||(e[h++]=a,e[h++]=o),s||(e[h++]=a,e[h++]=o))),e}}),z=c.extend({initialize:function(t,i,n){var r,s,a;if(t)if((r=t[0])!==e)s=t[1];else{var o=t;(r=o.x)===e&&(r=(o=c.read(arguments)).x),s=o.y,a=o.selected}else r=s=0;this._x=r,this._y=s,this._owner=i,i[n]=this,a&&this.setSelected(!0)},_set:function(t,e){return this._x=t,this._y=e,this._owner._changed(this),this},getX:function(){return this._x},setX:function(t){this._x=t,this._owner._changed(this)},getY:function(){return this._y},setY:function(t){this._y=t,this._owner._changed(this)},isZero:function(){var t=u.isZero;return t(this._x)&&t(this._y)},isSelected:function(){return!!(this._owner._selection&this._getSelection())},setSelected:function(t){this._owner._changeSelection(this._getSelection(),t)},_getSelection:function(){var t=this._owner;return this===t._point?1:this===t._handleIn?2:this===t._handleOut?4:0}}),k=r.extend({_class:"Curve",beans:!0,initialize:function(t,e,i,n,r,s,a,o){var h,u,l,c,f,d,_=arguments.length;3===_?(this._path=t,h=e,u=i):_?1===_?"segment1"in t?(h=new T(t.segment1),u=new T(t.segment2)):"point1"in t?(l=t.point1,f=t.handle1,d=t.handle2,c=t.point2):Array.isArray(t)&&(l=[t[0],t[1]],c=[t[6],t[7]],f=[t[2]-t[0],t[3]-t[1]],d=[t[4]-t[6],t[5]-t[7]]):2===_?(h=new T(t),u=new T(e)):4===_?(l=t,f=e,d=i,c=n):8===_&&(l=[t,e],c=[a,o],f=[i-t,n-e],d=[r-a,s-o]):(h=new T,u=new T),this._segment1=h||new T(l,null,f),this._segment2=u||new T(c,d,null)},_serialize:function(t,e){return r.serialize(this.hasHandles()?[this.getPoint1(),this.getHandle1(),this.getHandle2(),this.getPoint2()]:[this.getPoint1(),this.getPoint2()],t,!0,e)},_changed:function(){this._length=this._bounds=e},clone:function(){return new k(this._segment1,this._segment2)},toString:function(){var t=["point1: "+this._segment1._point];return this._segment1._handleOut.isZero()||t.push("handle1: "+this._segment1._handleOut),this._segment2._handleIn.isZero()||t.push("handle2: "+this._segment2._handleIn),t.push("point2: "+this._segment2._point),"{ "+t.join(", ")+" }"},classify:function(){return k.classify(this.getValues())},remove:function(){var t=!1;if(this._path){var e=this._segment2,i=e._handleOut;(t=e.remove())&&this._segment1._handleOut.set(i)}return t},getPoint1:function(){return this._segment1._point},setPoint1:function(){this._segment1._point.set(c.read(arguments))},getPoint2:function(){return this._segment2._point},setPoint2:function(){this._segment2._point.set(c.read(arguments))},getHandle1:function(){return this._segment1._handleOut},setHandle1:function(){this._segment1._handleOut.set(c.read(arguments))},getHandle2:function(){return this._segment2._handleIn},setHandle2:function(){this._segment2._handleIn.set(c.read(arguments))},getSegment1:function(){return this._segment1},getSegment2:function(){return this._segment2},getPath:function(){return this._path},getIndex:function(){return this._segment1._index},getNext:function(){var t=this._path&&this._path._curves;return t&&(t[this._segment1._index+1]||this._path._closed&&t[0])||null},getPrevious:function(){var t=this._path&&this._path._curves;return t&&(t[this._segment1._index-1]||this._path._closed&&t[t.length-1])||null},isFirst:function(){return!this._segment1._index},isLast:function(){var t=this._path;return t&&this._segment1._index===t._curves.length-1||!1},isSelected:function(){return this.getPoint1().isSelected()&&this.getHandle1().isSelected()&&this.getHandle2().isSelected()&&this.getPoint2().isSelected()},setSelected:function(t){this.getPoint1().setSelected(t),this.getHandle1().setSelected(t),this.getHandle2().setSelected(t),this.getPoint2().setSelected(t)},getValues:function(t){return k.getValues(this._segment1,this._segment2,t)},getPoints:function(){for(var t=this.getValues(),e=[],i=0;i<8;i+=2)e.push(new c(t[i],t[i+1]));return e}},{getLength:function(){return null==this._length&&(this._length=k.getLength(this.getValues(),0,1)),this._length},getArea:function(){return k.getArea(this.getValues())},getLine:function(){return new m(this._segment1._point,this._segment2._point)},getPart:function(t,e){return new k(k.getPart(this.getValues(),t,e))},getPartLength:function(t,e){return k.getLength(this.getValues(),t,e)},divideAt:function(t){return this.divideAtTime(t&&t.curve===this?t.time:this.getTimeAt(t))},divideAtTime:function(t,e){var i=null;if(t>=1e-8&&t<=1-1e-8){var n=k.subdivide(this.getValues(),t),r=n[0],s=n[1],a=e||this.hasHandles(),o=this._segment1,h=this._segment2,u=this._path;a&&(o._handleOut._set(r[2]-r[0],r[3]-r[1]),h._handleIn._set(s[4]-s[6],s[5]-s[7]));var l=r[6],f=r[7],d=new T(new c(l,f),a&&new c(r[4]-l,r[5]-f),a&&new c(s[2]-l,s[3]-f));u?(u.insert(o._index+1,d),i=this.getNext()):(this._segment2=d,this._changed(),i=new k(d,h))}return i},splitAt:function(t){var e=this._path;return e?e.splitAt(t):null},splitAtTime:function(t){return this.splitAt(this.getLocationAtTime(t))},divide:function(t,i){return this.divideAtTime(t===e?.5:i?t:this.getTimeAt(t))},split:function(t,i){return this.splitAtTime(t===e?.5:i?t:this.getTimeAt(t))},reversed:function(){return new k(this._segment2.reversed(),this._segment1.reversed())},clearHandles:function(){this._segment1._handleOut._set(0,0),this._segment2._handleIn._set(0,0)},statics:{getValues:function(t,e,i,n){var r=t._point,s=t._handleOut,a=e._handleIn,o=e._point,h=r.x,u=r.y,l=o.x,c=o.y,f=n?[h,u,h,u,l,c,l,c]:[h,u,h+s._x,u+s._y,l+a._x,c+a._y,l,c];return i&&i._transformCoordinates(f,f,4),f},subdivide:function(t,i){var n=t[0],r=t[1],s=t[2],a=t[3],o=t[4],h=t[5],u=t[6],l=t[7];i===e&&(i=.5);var c=1-i,f=c*n+i*s,d=c*r+i*a,_=c*s+i*o,g=c*a+i*h,v=c*o+i*u,p=c*h+i*l,m=c*f+i*_,y=c*d+i*g,w=c*_+i*v,x=c*g+i*p,b=c*m+i*w,C=c*y+i*x;return[[n,r,f,d,m,y,b,C],[b,C,w,x,v,p,u,l]]},getMonoCurves:function(t,e){var i=[],n=e?0:1,r=t[n+0],s=t[n+2],a=t[n+4],o=t[n+6];if(r>=s==s>=a&&s>=a==a>=o||k.isStraight(t))i.push(t);else{var h=3*(s-a)-r+o,l=2*(r+a)-4*s,c=s-r,f=[],d=u.solveQuadratic(h,l,c,f,1e-8,1-1e-8);if(d){f.sort();var _=f[0],g=k.subdivide(t,_);i.push(g[0]),d>1&&(_=(f[1]-_)/(1-_),g=k.subdivide(g[1],_),i.push(g[0])),i.push(g[1])}else i.push(t)}return i},solveCubic:function(t,e,i,n,r,s){var a=t[e],o=t[e+2],h=t[e+4],l=t[e+6],c=0;if(!(a<i&&l<i&&o<i&&h<i||a>i&&l>i&&o>i&&h>i)){var f=3*(o-a),d=3*(h-o)-f,_=l-a-f-d;c=u.solveCubic(_,d,f,a-i,n,r,s)}return c},getTimeOf:function(t,e){var i=new c(t[0],t[1]),n=new c(t[6],t[7]);if(null===(e.isClose(i,1e-12)?0:e.isClose(n,1e-12)?1:null))for(var r=[e.x,e.y],s=[],a=0;a<2;a++)for(var o=k.solveCubic(t,a,r[a],s,0,1),h=0;h<o;h++){var u=s[h];if(e.isClose(k.getPoint(t,u),1e-7))return u}return e.isClose(i,1e-7)?0:e.isClose(n,1e-7)?1:null},getNearestTime:function(t,e){function i(i){if(i>=0&&i<=1){var n=e.getDistance(k.getPoint(t,i),!0);if(n<u)return u=n,l=i,!0}}if(k.isStraight(t)){var n=t[0],r=t[1],s=t[6]-n,a=t[7]-r,o=s*s+a*a;if(0===o)return 0;var h=((e.x-n)*s+(e.y-r)*a)/o;return h<1e-12?0:h>.999999999999?1:k.getTimeOf(t,new c(n+h*s,r+h*a))}for(var u=1/0,l=0,f=0;f<=100;f++)i(f/100);for(var d=.005;d>1e-8;)i(l-d)||i(l+d)||(d/=2);return l},getPart:function(t,e,i){var n=e>i;if(n){var r=e;e=i,i=r}return e>0&&(t=k.subdivide(t,e)[1]),i<1&&(t=k.subdivide(t,(i-e)/(1-e))[0]),n?[t[6],t[7],t[4],t[5],t[2],t[3],t[0],t[1]]:t},isFlatEnough:function(t,e){var i=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],h=t[6],u=t[7],l=3*r-2*i-h,c=3*s-2*n-u,f=3*a-2*h-i,d=3*o-2*u-n;return Math.max(l*l,f*f)+Math.max(c*c,d*d)<=16*e*e},getArea:function(t){var e=t[0],i=t[1],n=t[2],r=t[3],s=t[4],a=t[5],o=t[6],h=t[7];return 3*((h-i)*(n+s)-(o-e)*(r+a)+r*(e-s)-n*(i-a)+h*(s+e/3)-o*(a+i/3))/20},getBounds:function(t){for(var e=t.slice(0,2),i=e.slice(),n=[0,0],r=0;r<2;r++)k._addBounds(t[r],t[r+2],t[r+4],t[r+6],r,0,e,i,n);return new g(e[0],e[1],i[0]-e[0],i[1]-e[1])},_addBounds:function(t,e,i,n,r,s,a,o,h){function l(t,e){var i=t-e,n=t+e;i<a[r]&&(a[r]=i),n>o[r]&&(o[r]=n)}s/=2;var c=a[r]-s,f=o[r]+s;if(t<c||e<c||i<c||n<c||t>f||e>f||i>f||n>f)if(e<t!=e<n&&i<t!=i<n)l(t,s),l(n,s);else{var d=3*(e-i)-t+n,_=2*(t+i)-4*e,g=e-t,v=u.solveQuadratic(d,_,g,h);l(n,0);for(var p=0;p<v;p++){var m=h[p],y=1-m;1e-8<=m&&m<=1-1e-8&&l(y*y*y*t+3*y*y*m*e+3*y*m*m*i+m*m*m*n,s)}}}}},r.each(["getBounds","getStrokeBounds","getHandleBounds"],function(t){this[t]=function(){this._bounds||(this._bounds={});var e=this._bounds[t];return e||(e=this._bounds[t]=L[t]([this._segment1,this._segment2],!1,this._path)),e.clone()}},{}),r.each({isStraight:function(t,e,i,n){if(e.isZero()&&i.isZero())return!0;var r=n.subtract(t);if(r.isZero())return!1;if(r.isCollinear(e)&&r.isCollinear(i)){var s=new m(t,n);if(s.getDistance(t.add(e))<1e-7&&s.getDistance(n.add(i))<1e-7){var a=r.dot(r),o=r.dot(e)/a,h=r.dot(i)/a;return o>=0&&o<=1&&h<=0&&h>=-1}}return!1},isLinear:function(t,e,i,n){var r=n.subtract(t).divide(3);return e.equals(r)&&i.negate().equals(r)}},function(t,e){this[e]=function(e){var i=this._segment1,n=this._segment2;return t(i._point,i._handleOut,n._handleIn,n._point,e)},this.statics[e]=function(e,i){var n=e[0],r=e[1],s=e[6],a=e[7];return t(new c(n,r),new c(e[2]-n,e[3]-r),new c(e[4]-s,e[5]-a),new c(s,a),i)}},{statics:{},hasHandles:function(){return!this._segment1._handleOut.isZero()||!this._segment2._handleIn.isZero()},hasLength:function(t){return(!this.getPoint1().equals(this.getPoint2())||this.hasHandles())&&this.getLength()>(t||0)},isCollinear:function(t){return t&&this.isStraight()&&t.isStraight()&&this.getLine().isCollinear(t.getLine())},isHorizontal:function(){return this.isStraight()&&Math.abs(this.getTangentAtTime(.5).y)<1e-8},isVertical:function(){return this.isStraight()&&Math.abs(this.getTangentAtTime(.5).x)<1e-8}}),{beans:!1,getLocationAt:function(t,e){return this.getLocationAtTime(e?t:this.getTimeAt(t))},getLocationAtTime:function(t){return null!=t&&t>=0&&t<=1?new O(this,t):null},getTimeAt:function(t,e){return k.getTimeAt(this.getValues(),t,e)},getParameterAt:"#getTimeAt",getOffsetAtTime:function(t){return this.getPartLength(0,t)},getLocationOf:function(){return this.getLocationAtTime(this.getTimeOf(c.read(arguments)))},getOffsetOf:function(){var t=this.getLocationOf.apply(this,arguments);return t?t.getOffset():null},getTimeOf:function(){return k.getTimeOf(this.getValues(),c.read(arguments))},getParameterOf:"#getTimeOf",getNearestLocation:function(){var t=c.read(arguments),e=this.getValues(),i=k.getNearestTime(e,t),n=k.getPoint(e,i);return new O(this,i,n,null,t.getDistance(n))},getNearestPoint:function(){var t=this.getNearestLocation.apply(this,arguments);return t?t.getPoint():t}},new function(){var t=["getPoint","getTangent","getNormal","getWeightedTangent","getWeightedNormal","getCurvature"];return r.each(t,function(t){this[t+"At"]=function(e,i){var n=this.getValues();return k[t](n,i?e:k.getTimeAt(n,e))},this[t+"AtTime"]=function(e){return k[t](this.getValues(),e)}},{statics:{_evaluateMethods:t}})},new function(){function t(t){var e=t[0],i=t[1],n=t[2],r=t[3],s=t[4],a=t[5],o=9*(n-s)+3*(t[6]-e),h=6*(e+s)-12*n,u=3*(n-e),l=9*(r-a)+3*(t[7]-i),c=6*(i+a)-12*r,f=3*(r-i);return function(t){var e=(o*t+h)*t+u,i=(l*t+c)*t+f;return Math.sqrt(e*e+i*i)}}function i(t,e){return Math.max(2,Math.min(16,Math.ceil(32*Math.abs(e-t))))}function n(t,e,i,n){if(null==e||e<0||e>1)return null;var r=t[0],s=t[1],a=t[2],o=t[3],h=t[4],l=t[5],f=t[6],d=t[7],_=u.isZero;_(a-r)&&_(o-s)&&(a=r,o=s),_(h-f)&&_(l-d)&&(h=f,l=d);var g,v,p=3*(a-r),m=3*(h-a)-p,y=f-r-p-m,w=3*(o-s),x=3*(l-o)-w,b=d-s-w-x;if(0===i)g=0===e?r:1===e?f:((y*e+m)*e+p)*e+r,v=0===e?s:1===e?d:((b*e+x)*e+w)*e+s;else{if(e<1e-8?(g=p,v=w):e>1-1e-8?(g=3*(f-h),v=3*(d-l)):(g=(3*y*e+2*m)*e+p,v=(3*b*e+2*x)*e+w),n){0===g&&0===v&&(e<1e-8||e>1-1e-8)&&(g=h-a,v=l-o);var C=Math.sqrt(g*g+v*v);C&&(g/=C,v/=C)}if(3===i){var h=6*y*e+2*m,l=6*b*e+2*x,S=Math.pow(g*g+v*v,1.5);g=0!==S?(g*l-v*h)/S:0,v=0}}return 2===i?new c(v,-g):new c(g,v)}return{statics:{classify:function(t){function i(t,i,n){var r=i!==e,s=r&&i>0&&i<1,a=r&&n>0&&n<1;return!r||(s||a)&&("loop"!==t||s&&a)||(t="arch",s=a=!1),{type:t,roots:s||a?s&&a?i<n?[i,n]:[n,i]:[s?i:n]:null}}var n=t[0],r=t[1],s=t[2],a=t[3],o=t[4],h=t[5],l=t[6],c=t[7],f=s*(r-c)+a*(l-n)+n*c-r*l,d=3*(o*(a-r)+h*(n-s)+s*r-a*n),_=d-f,g=_-f+(n*(c-h)+r*(o-l)+l*h-c*o),v=Math.sqrt(g*g+_*_+d*d),p=0!==v?1/v:0,m=u.isZero;if(g*=p,_*=p,d*=p,m(g))return m(_)?i(m(d)?"line":"quadratic"):i("serpentine",d/(3*_));var y=3*_*_-4*g*d;if(m(y))return i("cusp",_/(2*g));var w=y>0?Math.sqrt(y/3):Math.sqrt(-y),x=2*g;return i(y>0?"serpentine":"loop",(_+w)/x,(_-w)/x)},getLength:function(n,r,s,a){if(r===e&&(r=0),s===e&&(s=1),k.isStraight(n)){var o=n;s<1&&(o=k.subdivide(o,s)[0],r/=s),r>0&&(o=k.subdivide(o,r)[1]);var h=o[6]-o[0],l=o[7]-o[1];return Math.sqrt(h*h+l*l)}return u.integrate(a||t(n),r,s,i(r,s))},getTimeAt:function(n,r,s){if(s===e&&(s=r<0?1:0),0===r)return s;var a=Math.abs,o=r>0,h=o?s:0,l=o?1:s,c=t(n),f=k.getLength(n,h,l,c),d=a(r)-f;if(a(d)<1e-12)return o?l:h;if(d>1e-12)return null;var _=r/f,g=0;return u.findRoot(function(t){return g+=u.integrate(c,s,t,i(s,t)),s=t,g-r},c,s+_,h,l,32,1e-12)},getPoint:function(t,e){return n(t,e,0,!1)},getTangent:function(t,e){return n(t,e,1,!0)},getWeightedTangent:function(t,e){return n(t,e,1,!1)},getNormal:function(t,e){return n(t,e,2,!0)},getWeightedNormal:function(t,e){return n(t,e,2,!1)},getCurvature:function(t,e){return n(t,e,3,!1).x},getPeaks:function(t){var e=t[0],i=t[1],n=t[2],r=t[3],s=t[4],a=t[5],o=3*n-e-3*s+t[6],h=3*e-6*n+3*s,l=-3*e+3*n,c=3*r-i-3*a+t[7],f=3*i-6*r+3*a,d=-3*i+3*r,_=[];return u.solveCubic(9*(o*o+c*c),9*(o*h+f*c),2*(h*h+f*f)+3*(l*o+d*c),l*h+f*d,_,1e-8,1-1e-8),_.sort()}}}},new function(){function t(t,e,i,n,r,s,a){var o=!a&&i.getPrevious()===r,h=!a&&i!==r&&i.getNext()===r;if(null!==n&&n>=(o?1e-8:0)&&n<=(h?1-1e-8:1)&&null!==s&&s>=(h?1e-8:0)&&s<=(o?1-1e-8:1)){var u=new O(i,n,null,a),l=new O(r,s,null,a);u._intersection=l,l._intersection=u,e&&!e(u)||O.insert(t,u,!0)}}function e(r,s,a,o,h,u,l,c,f,d,_,g,v){if(++f>=4096||++c>=40)return f;var p,y,w=s[0],x=s[1],b=s[6],C=s[7],S=m.getSignedDistance,P=S(w,x,b,C,s[2],s[3]),I=S(w,x,b,C,s[4],s[5]),M=P*I>0?.75:4/9,T=M*Math.min(0,P,I),z=M*Math.max(0,P,I),O=S(w,x,b,C,r[0],r[1]),A=S(w,x,b,C,r[2],r[3]),L=S(w,x,b,C,r[4],r[5]),N=S(w,x,b,C,r[6],r[7]),B=i(O,A,L,N),D=B[0],j=B[1];if(0===P&&0===I&&0===O&&0===A&&0===L&&0===N||null==(p=n(D,j,T,z))||null==(y=n(D.reverse(),j.reverse(),T,z)))return f;var E=d+(_-d)*p,F=d+(_-d)*y;if(Math.max(v-g,F-E)<1e-9){var R=(E+F)/2,q=(g+v)/2;t(h,u,l?o:a,l?q:R,l?a:o,l?R:q)}else if(r=k.getPart(r,p,y),y-p>.8)if(F-E>v-g){R=(E+F)/2;f=e(s,(V=k.subdivide(r,.5))[0],o,a,h,u,!l,c,f,g,v,E,R),f=e(s,V[1],o,a,h,u,!l,c,f,g,v,R,F)}else{var V=k.subdivide(s,.5),q=(g+v)/2;f=e(V[0],r,o,a,h,u,!l,c,f,g,q,E,F),f=e(V[1],r,o,a,h,u,!l,c,f,q,v,E,F)}else f=v-g>=1e-9?e(s,r,o,a,h,u,!l,c,f,g,v,E,F):e(r,s,a,o,h,u,l,c,f,E,F,g,v);return f}function i(t,e,i,n){var r,s=[0,t],a=[1/3,e],o=[2/3,i],h=[1,n],u=e-(2*t+n)/3,l=i-(t+2*n)/3;if(u*l<0)r=[[s,a,h],[s,o,h]];else{var c=u/l;r=[c>=2?[s,a,h]:c<=.5?[s,o,h]:[s,a,o,h],[s,h]]}return(u||l)<0?r.reverse():r}function n(t,e,i,n){return t[0][1]<i?r(t,!0,i):e[0][1]>n?r(e,!1,n):t[0][0]}function r(t,e,i){for(var n=t[0][0],r=t[0][1],s=1,a=t.length;s<a;s++){var o=t[s][0],h=t[s][1];if(e?h>=i:h<=i)return h===i?o:n+(i-r)*(o-n)/(h-r);n=o,r=h}return null}function s(t,e,i,n,r){var s=u.isZero;if(s(n)&&s(r)){var a=k.getTimeOf(t,new c(e,i));return null===a?[]:[a]}for(var o=Math.atan2(-r,n),h=Math.sin(o),l=Math.cos(o),f=[],d=[],_=0;_<8;_+=2){var g=t[_]-e,v=t[_+1]-i;f.push(g*l-v*h,g*h+v*l)}return k.solveCubic(f,1,0,d,0,1),d}function a(e,i,n,r,a,o,h){for(var u=i[0],l=i[1],c=s(e,u,l,i[6]-u,i[7]-l),f=0,d=c.length;f<d;f++){var _=c[f],g=k.getPoint(e,_),v=k.getTimeOf(i,g);null!==v&&t(a,o,h?r:n,h?v:_,h?n:r,h?_:v)}}function o(e,i,n,r,s,a){var o=m.intersect(e[0],e[1],e[6],e[7],i[0],i[1],i[6],i[7]);o&&t(s,a,n,k.getTimeOf(e,o),r,k.getTimeOf(i,o))}function h(i,n,r,s,h,u){var l=Math.min,d=Math.max;if(d(i[0],i[2],i[4],i[6])+1e-12>l(n[0],n[2],n[4],n[6])&&l(i[0],i[2],i[4],i[6])-1e-12<d(n[0],n[2],n[4],n[6])&&d(i[1],i[3],i[5],i[7])+1e-12>l(n[1],n[3],n[5],n[7])&&l(i[1],i[3],i[5],i[7])-1e-12<d(n[1],n[3],n[5],n[7])){var _=f(i,n);if(_)for(x=0;x<2;x++){var g=_[x];t(h,u,r,g[0],s,g[1],!0)}else{var v=k.isStraight(i),p=k.isStraight(n),m=v&&p,y=v&&!p,w=h.length;if((m?o:v||p?a:e)(y?n:i,y?i:n,y?s:r,y?r:s,h,u,y,0,0,0,1,0,1),!m||h.length===w)for(var x=0;x<4;x++){var b=x>>1,C=1&x,S=6*b,P=6*C,I=new c(i[S],i[S+1]),M=new c(n[P],n[P+1]);I.isClose(M,1e-12)&&t(h,u,r,b,s,C)}}}return h}function l(e,i,n,r){var s=k.classify(e);if("loop"===s.type){var a=s.roots;t(n,r,i,a[0],i,a[1])}return n}function f(t,e){function i(t){var e=t[6]-t[0],i=t[7]-t[1];return e*e+i*i}var n=Math.abs,r=m.getDistance,s=k.isStraight(t),a=k.isStraight(e),o=s&&a,h=i(t)<i(e),u=h?e:t,l=h?t:e,f=u[0],d=u[1],_=u[6]-f,g=u[7]-d;if(r(f,d,_,g,l[0],l[1],!0)<1e-7&&r(f,d,_,g,l[6],l[7],!0)<1e-7)!o&&r(f,d,_,g,u[2],u[3],!0)<1e-7&&r(f,d,_,g,u[4],u[5],!0)<1e-7&&r(f,d,_,g,l[2],l[3],!0)<1e-7&&r(f,d,_,g,l[4],l[5],!0)<1e-7&&(s=a=o=!0);else if(o)return null;if(s^a)return null;for(var v=[t,e],p=[],y=0;y<4&&p.length<2;y++){var w=1&y,x=1^w,b=y>>1,C=k.getTimeOf(v[w],new c(v[x][b?6:0],v[x][b?7:1]));if(null!=C){var S=w?[b,C]:[C,b];(!p.length||n(S[0]-p[0][0])>1e-8&&n(S[1]-p[0][1])>1e-8)&&p.push(S)}if(y>2&&!p.length)break}if(2!==p.length)p=null;else if(!o){var P=k.getPart(t,p[0][0],p[1][0]),I=k.getPart(e,p[0][1],p[1][1]);(n(I[2]-P[2])>1e-7||n(I[3]-P[3])>1e-7||n(I[4]-P[4])>1e-7||n(I[5]-P[5])>1e-7)&&(p=null)}return p}return{getIntersections:function(t){var e=this.getValues(),i=t&&t!==this&&t.getValues();return i?h(e,i,this,t,[]):l(e,this,[])},statics:{getOverlaps:f,getIntersections:function(t,e,i,n,r,s){var a=!e;a&&(e=t);for(var o,u,c=t.length,f=e.length,d=[],_=[],g=0;g<f;g++)d[g]=e[g].getValues(r);for(g=0;g<c;g++){var v=t[g],p=a?d[g]:v.getValues(n),m=v.getPath();m!==u&&(u=m,o=[],_.push(o)),a&&l(p,v,o,i);for(var y=a?g+1:0;y<f;y++){if(s&&o.length)return o;h(p,d[y],v,e[y],o,i)}}o=[];for(var g=0,w=_.length;g<w;g++)o.push.apply(o,_[g]);return o},getCurveLineIntersections:s}}}),O=r.extend({_class:"CurveLocation",initialize:function(t,e,i,n,r){if(e>=.99999999){var s=t.getNext();s&&(e=0,t=s)}this._setCurve(t),this._time=e,this._point=i||t.getPointAtTime(e),this._overlap=n,this._distance=r,this._intersection=this._next=this._previous=null},_setCurve:function(t){var e=t._path;this._path=e,this._version=e?e._version:0,this._curve=t,this._segment=null,this._segment1=t._segment1,this._segment2=t._segment2},_setSegment:function(t){this._setCurve(t.getCurve()),this._segment=t,this._time=t===this._segment1?0:1,this._point=t._point.clone()},getSegment:function(){var t=this._segment;if(!t){var e=this.getCurve(),i=this.getTime();0===i?t=e._segment1:1===i?t=e._segment2:null!=i&&(t=e.getPartLength(0,i)<e.getPartLength(i,1)?e._segment1:e._segment2),this._segment=t}return t},getCurve:function(){function t(t){var e=t&&t.getCurve();if(e&&null!=(i._time=e.getTimeOf(i._point)))return i._setCurve(e),e}var e=this._path,i=this;return e&&e._version!==this._version&&(this._time=this._offset=this._curveOffset=this._curve=null),this._curve||t(this._segment)||t(this._segment1)||t(this._segment2.getPrevious())},getPath:function(){var t=this.getCurve();return t&&t._path},getIndex:function(){var t=this.getCurve();return t&&t.getIndex()},getTime:function(){var t=this.getCurve(),e=this._time;return t&&null==e?this._time=t.getTimeOf(this._point):e},getParameter:"#getTime",getPoint:function(){return this._point},getOffset:function(){var t=this._offset;if(null==t){t=0;var e=this.getPath(),i=this.getIndex();if(e&&null!=i)for(var n=e.getCurves(),r=0;r<i;r++)t+=n[r].getLength();this._offset=t+=this.getCurveOffset()}return t},getCurveOffset:function(){var t=this._curveOffset;if(null==t){var e=this.getCurve(),i=this.getTime();this._curveOffset=t=null!=i&&e&&e.getPartLength(0,i)}return t},getIntersection:function(){return this._intersection},getDistance:function(){return this._distance},divide:function(){var t=this.getCurve(),e=t&&t.divideAtTime(this.getTime());return e&&this._setSegment(e._segment1),e},split:function(){var t=this.getCurve(),e=t._path,i=t&&t.splitAtTime(this.getTime());return i&&this._setSegment(e.getLastSegment()),i},equals:function(t,e){var i=this===t;if(!i&&t instanceof O){var n=this.getCurve(),r=t.getCurve(),s=n._path;if(s===r._path){var a=Math.abs,o=a(this.getOffset()-t.getOffset()),h=!e&&this._intersection,u=!e&&t._intersection;i=(o<1e-7||s&&a(s.getLength()-o)<1e-7)&&(!h&&!u||h&&u&&h.equals(u,!0))}}return i},toString:function(){var t=[],e=this.getPoint(),i=h.instance;e&&t.push("point: "+e);var n=this.getIndex();null!=n&&t.push("index: "+n);var r=this.getTime();return null!=r&&t.push("time: "+i.number(r)),null!=this._distance&&t.push("distance: "+i.number(this._distance)),"{ "+t.join(", ")+" }"},isTouching:function(){var t=this._intersection;if(t&&this.getTangent().isCollinear(t.getTangent())){var e=this.getCurve(),i=t.getCurve();return!(e.isStraight()&&i.isStraight()&&e.getLine().intersect(i.getLine()))}return!1},isCrossing:function(){function t(t,e){var i=t.getValues(),n=k.classify(i).roots||k.getPeaks(i),r=n.length,s=e&&r>1?n[r-1]:r>0?n[0]:.5;c.push(k.getLength(i,e?s:0,e?1:s)/2)}function e(t,e,i){return e<i?t>e&&t<i:t>e||t<i}var i=this._intersection;if(!i)return!1;var n=this.getTime(),r=i.getTime(),s=n>=1e-8&&n<=1-1e-8,a=r>=1e-8&&r<=1-1e-8;if(s&&a)return!this.isTouching();var o=this.getCurve(),h=n<1e-8?o.getPrevious():o,u=i.getCurve(),l=r<1e-8?u.getPrevious():u;if(n>1-1e-8&&(o=o.getNext()),r>1-1e-8&&(u=u.getNext()),!(h&&o&&l&&u))return!1;var c=[];s||(t(h,!0),t(o,!1)),a||(t(l,!0),t(u,!1));var f=this.getPoint(),d=Math.min.apply(Math,c),_=s?o.getTangentAtTime(n):o.getPointAt(d).subtract(f),g=s?_.negate():h.getPointAt(-d).subtract(f),v=a?u.getTangentAtTime(r):u.getPointAt(d).subtract(f),p=a?v.negate():l.getPointAt(-d).subtract(f),m=g.getAngle(),y=_.getAngle(),w=p.getAngle(),x=v.getAngle();return!!(s?e(m,w,x)^e(y,w,x)&&e(m,x,w)^e(y,x,w):e(w,m,y)^e(x,m,y)&&e(w,y,m)^e(x,y,m))},hasOverlap:function(){return!!this._overlap}},r.each(k._evaluateMethods,function(t){var e=t+"At";this[t]=function(){var t=this.getCurve(),i=this.getTime();return null!=i&&t&&t[e](i,!0)}},{preserve:!0}),new function(){function t(t,e,i){function n(i,n){for(var s=i+n;s>=-1&&s<=r;s+=n){var a=t[(s%r+r)%r];if(!e.getPoint().isClose(a.getPoint(),1e-7))break;if(e.equals(a))return a}return null}for(var r=t.length,s=0,a=r-1;s<=a;){var o,h=s+a>>>1,u=t[h];if(i&&(o=e.equals(u)?u:n(h,-1)||n(h,1)))return e._overlap&&(o._overlap=o._intersection._overlap=!0),o;var l=e.getPath(),c=u.getPath();(l!==c?l._id-c._id:e.getIndex()+e.getTime()-(u.getIndex()+u.getTime()))<0?a=h-1:s=h+1}return t.splice(s,0,e),e}return{statics:{insert:t,expand:function(e){for(var i=e.slice(),n=e.length-1;n>=0;n--)t(i,e[n]._intersection,!1);return i}}}}),A=w.extend({_class:"PathItem",_selectBounds:!1,_canScaleStroke:!0,beans:!0,initialize:function(){},statics:{create:function(t){var e,i,n;if(r.isPlainObject(t)?(i=t.segments,e=t.pathData):Array.isArray(t)?i=t:"string"==typeof t&&(e=t),i){var s=i[0];n=s&&Array.isArray(s[0])}else e&&(n=(e.match(/m/gi)||[]).length>1||/z\s*\S+/i.test(e));return new(n?N:L)(t)}},_asPathItem:function(){return this},isClockwise:function(){return this.getArea()>=0},setClockwise:function(t){this.isClockwise()!=(t=!!t)&&this.reverse()},setPathData:function(t){function e(t,e){var i=+n[t];return o&&(i+=h[e]),i}function i(t){return new c(e(t,"x"),e(t+1,"y"))}var n,r,s,a=t&&t.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/gi),o=!1,h=new c,u=new c;this.clear();for(var l=0,f=a&&a.length;l<f;l++){var _=a[l],g=_[0],v=g.toLowerCase(),p=(n=_.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g))&&n.length;switch(o=g===v,"z"!==r||/[mz]/.test(v)||this.moveTo(h),v){case"m":case"l":for(var m="m"===v,y=0;y<p;y+=2)this[m?"moveTo":"lineTo"](h=i(y)),m&&(u=h,m=!1);s=h;break;case"h":case"v":var w="h"===v?"x":"y";h=h.clone();for(y=0;y<p;y++)h[w]=e(y,w),this.lineTo(h);s=h;break;case"c":for(y=0;y<p;y+=6)this.cubicCurveTo(i(y),s=i(y+2),h=i(y+4));break;case"s":for(y=0;y<p;y+=4)this.cubicCurveTo(/[cs]/.test(r)?h.multiply(2).subtract(s):h,s=i(y),h=i(y+2)),r=v;break;case"q":for(y=0;y<p;y+=4)this.quadraticCurveTo(s=i(y),h=i(y+2));break;case"t":for(y=0;y<p;y+=2)this.quadraticCurveTo(s=/[qt]/.test(r)?h.multiply(2).subtract(s):h,h=i(y)),r=v;break;case"a":for(y=0;y<p;y+=7)this.arcTo(h=i(y+5),new d(+n[y],+n[y+1]),+n[y+2],+n[y+4],+n[y+3]);break;case"z":this.closePath(1e-12),h=u}r=v}},_canComposite:function(){return!(this.hasFill()&&this.hasStroke())},_contains:function(t){var e=t.isInside(this.getBounds({internal:!0,handle:!0}))?this._getWinding(t):{};return e.onPath||!!("evenodd"===this.getFillRule()?1&e.windingL||1&e.windingR:e.winding)},getIntersections:function(t,e,i,n){var r=this===t||!t,s=this._matrix._orNullIfIdentity(),a=r?s:(i||t._matrix)._orNullIfIdentity();return r||this.getBounds(s).intersects(t.getBounds(a),1e-12)?k.getIntersections(this.getCurves(),!r&&t.getCurves(),e,s,a,n):[]},getCrossings:function(t){return this.getIntersections(t,function(t){return t.hasOverlap()||t.isCrossing()})},getNearestLocation:function(){for(var t=c.read(arguments),e=this.getCurves(),i=1/0,n=null,r=0,s=e.length;r<s;r++){var a=e[r].getNearestLocation(t);a._distance<i&&(i=a._distance,n=a)}return n},getNearestPoint:function(){var t=this.getNearestLocation.apply(this,arguments);return t?t.getPoint():t},interpolate:function(t,e,i){var n=!this._children,r=n?"_segments":"_children",s=t[r],a=e[r],o=this[r];if(!s||!a||s.length!==a.length)throw new Error("Invalid operands in interpolate() call: "+t+", "+e);var h=o.length,u=a.length;if(h<u)for(var l=n?T:L,c=h;c<u;c++)this.add(new l);else h>u&&this[n?"removeSegments":"removeChildren"](u,h);for(c=0;c<u;c++)o[c].interpolate(s[c],a[c],i);n&&(this.setClosed(t._closed),this._changed(9))},compare:function(t){var e=!1;if(t){var i=this._children||[this],n=t._children?t._children.slice():[t],r=i.length,s=n.length,a=[],o=0;e=!0;for(var h=r-1;h>=0&&e;h--){var u=i[h];e=!1;for(var l=s-1;l>=0&&!e;l--)u.compare(n[l])&&(a[l]||(a[l]=!0,o++),e=!0)}e=e&&o===s}return e}}),L=A.extend({_class:"Path",_serializeFields:{segments:[],closed:!1},initialize:function(t){this._closed=!1,this._segments=[],this._version=0;var i=Array.isArray(t)?"object"==typeof t[0]?t:arguments:!t||t.size!==e||t.x===e&&t.point===e?null:arguments;i&&i.length>0?this.setSegments(i):(this._curves=e,this._segmentSelection=0,i||"string"!=typeof t||(this.setPathData(t),t=null)),this._initialize(!i&&t)},_equals:function(t){return this._closed===t._closed&&r.equals(this._segments,t._segments)},copyContent:function(t){this.setSegments(t._segments),this._closed=t._closed},_changed:function t(i){if(t.base.call(this,i),8&i){if(this._length=this._area=e,16&i)this._version++;else if(this._curves)for(var n=0,r=this._curves.length;n<r;n++)this._curves[n]._changed()}else 32&i&&(this._bounds=e)},getStyle:function(){var t=this._parent;return(t instanceof N?t:this)._style},getSegments:function(){return this._segments},setSegments:function(t){var i=this.isFullySelected(),n=t&&t.length;if(this._segments.length=0,this._segmentSelection=0,this._curves=e,n){var r=t[n-1];"boolean"==typeof r&&(this.setClosed(r),n--),this._add(T.readList(t,0,{},n))}i&&this.setFullySelected(!0)},getFirstSegment:function(){return this._segments[0]},getLastSegment:function(){return this._segments[this._segments.length-1]},getCurves:function(){var t=this._curves,e=this._segments;if(!t){var i=this._countCurves();t=this._curves=new Array(i);for(var n=0;n<i;n++)t[n]=new k(this,e[n],e[n+1]||e[0])}return t},getFirstCurve:function(){return this.getCurves()[0]},getLastCurve:function(){var t=this.getCurves();return t[t.length-1]},isClosed:function(){return this._closed},setClosed:function(t){if(this._closed!=(t=!!t)){if(this._closed=t,this._curves){var e=this._curves.length=this._countCurves();t&&(this._curves[e-1]=new k(this,this._segments[e-1],this._segments[0]))}this._changed(25)}}},{beans:!0,getPathData:function(t,e){function i(e,i){if(e._transformCoordinates(t,g),n=g[0],r=g[1],v)p.push("M"+_.pair(n,r)),v=!1;else if(o=g[2],u=g[3],o===n&&u===r&&l===s&&c===a){if(!i){var h=n-s,f=r-a;p.push(0===h?"v"+_.number(f):0===f?"h"+_.number(h):"l"+_.pair(h,f))}}else p.push("c"+_.pair(l-s,c-a)+" "+_.pair(o-s,u-a)+" "+_.pair(n-s,r-a));s=n,a=r,l=g[4],c=g[5]}var n,r,s,a,o,u,l,c,f=this._segments,d=f.length,_=new h(e),g=new Array(6),v=!0,p=[];if(!d)return"";for(var m=0;m<d;m++)i(f[m]);return this._closed&&d>0&&(i(f[0],!0),p.push("z")),p.join("")},isEmpty:function(){return!this._segments.length},_transformContent:function(t){for(var e=this._segments,i=new Array(6),n=0,r=e.length;n<r;n++)e[n]._transformCoordinates(t,i,!0);return!0},_add:function(t,e){for(var i=this._segments,n=this._curves,r=t.length,s=null==e,e=s?i.length:e,a=0;a<r;a++){var o=t[a];o._path&&(o=t[a]=o.clone()),o._path=this,o._index=e+a,o._selection&&this._updateSelection(o,0,o._selection)}if(s)i.push.apply(i,t);else{i.splice.apply(i,[e,0].concat(t));for(var a=e+r,h=i.length;a<h;a++)i[a]._index=a}if(n){var u=this._countCurves(),l=e>0&&e+r-1===u?e-1:e,c=l,f=Math.min(l+r,u);t._curves&&(n.splice.apply(n,[l,0].concat(t._curves)),c+=t._curves.length);for(a=c;a<f;a++)n.splice(a,0,new k(this,null,null));this._adjustCurves(l,f)}return this._changed(25),t},_adjustCurves:function(t,e){for(var i,n=this._segments,r=this._curves,s=t;s<e;s++)(i=r[s])._path=this,i._segment1=n[s],i._segment2=n[s+1]||n[0],i._changed();(i=r[this._closed&&!t?n.length-1:t-1])&&(i._segment2=n[t]||n[0],i._changed()),(i=r[e])&&(i._segment1=n[e],i._changed())},_countCurves:function(){var t=this._segments.length;return!this._closed&&t>0?t-1:t},add:function(t){return arguments.length>1&&"number"!=typeof t?this._add(T.readList(arguments)):this._add([T.read(arguments)])[0]},insert:function(t,e){return arguments.length>2&&"number"!=typeof e?this._add(T.readList(arguments,1),t):this._add([T.read(arguments,1)],t)[0]},addSegment:function(){return this._add([T.read(arguments)])[0]},insertSegment:function(t){return this._add([T.read(arguments,1)],t)[0]},addSegments:function(t){return this._add(T.readList(t))},insertSegments:function(t,e){return this._add(T.readList(e),t)},removeSegment:function(t){return this.removeSegments(t,t+1)[0]||null},removeSegments:function(t,e,i){t=t||0,e=r.pick(e,this._segments.length);var n=this._segments,s=this._curves,a=n.length,o=n.splice(t,e-t),h=o.length;if(!h)return o;for(l=0;l<h;l++){var u=o[l];u._selection&&this._updateSelection(u,u._selection,0),u._index=u._path=null}for(var l=t,c=n.length;l<c;l++)n[l]._index=l;if(s){for(var f=t>0&&e===a+(this._closed?1:0)?t-1:t,l=(s=s.splice(f,h)).length-1;l>=0;l--)s[l]._path=null;i&&(o._curves=s.slice(1)),this._adjustCurves(f,f)}return this._changed(25),o},clear:"#removeSegments",hasHandles:function(){for(var t=this._segments,e=0,i=t.length;e<i;e++)if(t[e].hasHandles())return!0;return!1},clearHandles:function(){for(var t=this._segments,e=0,i=t.length;e<i;e++)t[e].clearHandles()},getLength:function(){if(null==this._length){for(var t=this.getCurves(),e=0,i=0,n=t.length;i<n;i++)e+=t[i].getLength();this._length=e}return this._length},getArea:function(){var t=this._area;if(null==t){var e=this._segments,i=this._closed;t=0;for(var n=0,r=e.length;n<r;n++){var s=n+1===r;t+=k.getArea(k.getValues(e[n],e[s?0:n+1],null,s&&!i))}this._area=t}return t},isFullySelected:function(){var t=this._segments.length;return this.isSelected()&&t>0&&this._segmentSelection===7*t},setFullySelected:function(t){t&&this._selectSegments(!0),this.setSelected(t)},setSelection:function t(e){1&e||this._selectSegments(!1),t.base.call(this,e)},_selectSegments:function(t){var e=this._segments,i=e.length,n=t?7:0;this._segmentSelection=n*i;for(var r=0;r<i;r++)e[r]._selection=n},_updateSelection:function(t,e,i){t._selection=i,(this._segmentSelection+=i-e)>0&&this.setSelected(!0)},divideAt:function(t){var e,i=this.getLocationAt(t);return i&&(e=i.getCurve().divideAt(i.getCurveOffset()))?e._segment1:null},splitAt:function(t){var e=this.getLocationAt(t),i=e&&e.index,n=e&&e.time;n>1-1e-8&&(i++,n=0);var r=this.getCurves();if(i>=0&&i<r.length){n>=1e-8&&r[i++].divideAtTime(n);var s,a=this.removeSegments(i,this._segments.length,!0);return this._closed?(this.setClosed(!1),s=this):((s=new L(w.NO_INSERT)).insertAbove(this),s.copyAttributes(this)),s._add(a,0),this.addSegment(a[0]),s}return null},split:function(t,i){var n,r=i===e?t:(n=this.getCurves()[t])&&n.getLocationAtTime(i);return null!=r?this.splitAt(r):null},join:function(t,e){var i=e||0;if(t&&t!==this){var n=t._segments,r=this.getLastSegment(),s=t.getLastSegment();if(!s)return this;r&&r._point.isClose(s._point,i)&&t.reverse();var a=t.getFirstSegment();if(r&&r._point.isClose(a._point,i))r.setHandleOut(a._handleOut),this._add(n.slice(1));else{var o=this.getFirstSegment();o&&o._point.isClose(a._point,i)&&t.reverse(),s=t.getLastSegment(),o&&o._point.isClose(s._point,i)?(o.setHandleIn(s._handleIn),this._add(n.slice(0,n.length-1),0)):this._add(n.slice())}t._closed&&this._add([n[0]]),t.remove()}var h=this.getFirstSegment(),u=this.getLastSegment();return h!==u&&h._point.isClose(u._point,i)&&(h.setHandleIn(u._handleIn),u.remove(),this.setClosed(!0)),this},reduce:function(t){for(var e=this.getCurves(),i=t&&t.simplify,n=i?1e-7:0,r=e.length-1;r>=0;r--){var s=e[r];!s.hasHandles()&&(!s.hasLength(n)||i&&s.isCollinear(s.getNext()))&&s.remove()}return this},reverse:function(){this._segments.reverse();for(var t=0,e=this._segments.length;t<e;t++){var i=this._segments[t],n=i._handleIn;i._handleIn=i._handleOut,i._handleOut=n,i._index=t}this._curves=null,this._changed(9)},flatten:function(t){for(var e=new B(this,t||.25,256,!0).parts,i=e.length,n=[],r=0;r<i;r++)n.push(new T(e[r].curve.slice(0,2)));!this._closed&&i>0&&n.push(new T(e[i-1].curve.slice(6))),this.setSegments(n)},simplify:function(t){var e=new D(this).fit(t||2.5);return e&&this.setSegments(e),!!e},smooth:function(t){function i(t,e){var i=t&&t.index;if(null!=i){var r=t.path;if(r&&r!==n)throw new Error(t._class+" "+i+" of "+r+" is not part of "+n);e&&t instanceof k&&i++}else i="number"==typeof t?t:e;return Math.min(i<0&&h?i%o:i<0?i+o:i,o-1)}var n=this,r=t||{},s=r.type||"asymmetric",a=this._segments,o=a.length,h=this._closed,u=h&&r.from===e&&r.to===e,l=i(r.from,0),c=i(r.to,o-1);if(l>c)if(h)l-=o;else{var f=l;l=c,c=f}if(/^(?:asymmetric|continuous)$/.test(s)){var d="asymmetric"===s,_=Math.min,g=c-l+1,v=g-1,p=u?_(g,4):1,m=p,y=p,w=[];if(h||(m=_(1,l),y=_(1,o-c-1)),(v+=m+y)<=1)return;for(var x=0,b=l-m;x<=v;x++,b++)w[x]=a[(b<0?b+o:b)%o]._point;for(var C=w[0]._x+2*w[1]._x,S=w[0]._y+2*w[1]._y,P=2,I=v-1,M=[C],T=[S],z=[P],O=[],A=[],x=1;x<v;x++){var L=x<I,N=L?1:d?1:2,B=L?4:d?2:7,D=L?4:d?3:8,j=L?2:d?0:1,E=N/P;P=z[x]=B-E,C=M[x]=D*w[x]._x+j*w[x+1]._x-E*C,S=T[x]=D*w[x]._y+j*w[x+1]._y-E*S}O[I]=M[I]/z[I],A[I]=T[I]/z[I];for(x=v-2;x>=0;x--)O[x]=(M[x]-O[x+1])/z[x],A[x]=(T[x]-A[x+1])/z[x];O[v]=(3*w[v]._x-O[I])/2,A[v]=(3*w[v]._y-A[I])/2;for(var x=m,F=v-y,b=l;x<=F;x++,b++){var R=a[b<0?b+o:b],q=R._point,V=O[x]-q._x,H=A[x]-q._y;(u||x<F)&&R.setHandleOut(V,H),(u||x>m)&&R.setHandleIn(-V,-H)}}else for(x=l;x<=c;x++)a[x<0?x+o:x].smooth(r,!u&&x===l,!u&&x===c)},toShape:function(t){function i(t,e){var i=l[t],n=i.getNext(),r=l[e],s=r.getNext();return i._handleOut.isZero()&&n._handleIn.isZero()&&r._handleOut.isZero()&&s._handleIn.isZero()&&n._point.subtract(i._point).isCollinear(s._point.subtract(r._point))}function n(t){var e=l[t],i=e.getNext(),n=e._handleOut,r=i._handleIn;if(n.isOrthogonal(r)){var s=e._point,a=i._point,o=new m(s,n,!0).intersect(new m(a,r,!0),!0);return o&&u.isZero(n.getLength()/o.subtract(s).getLength()-.5522847498307936)&&u.isZero(r.getLength()/o.subtract(a).getLength()-.5522847498307936)}return!1}function r(t,e){return l[t]._point.getDistance(l[e]._point)}if(!this._closed)return null;var s,a,o,h,l=this._segments;if(!this.hasHandles()&&4===l.length&&i(0,2)&&i(1,3)&&function(t){var e=l[t],i=e.getPrevious(),n=e.getNext();return i._handleOut.isZero()&&e._handleIn.isZero()&&e._handleOut.isZero()&&n._handleIn.isZero()&&e._point.subtract(i._point).isOrthogonal(n._point.subtract(e._point))}(1)?(s=C.Rectangle,a=new d(r(0,3),r(0,1)),h=l[1]._point.add(l[2]._point).divide(2)):8===l.length&&n(0)&&n(2)&&n(4)&&n(6)&&i(1,5)&&i(3,7)?(s=C.Rectangle,o=(a=new d(r(1,6),r(0,3))).subtract(new d(r(0,7),r(1,2))).divide(2),h=l[3]._point.add(l[4]._point).divide(2)):4===l.length&&n(0)&&n(1)&&n(2)&&n(3)&&(u.isZero(r(0,2)-r(1,3))?(s=C.Circle,o=r(0,2)/2):(s=C.Ellipse,o=new d(r(2,0)/2,r(3,1)/2)),h=l[1]._point),s){var c=this.getPosition(!0),f=new s({center:c,size:a,radius:o,insert:!1});return f.copyAttributes(this,!0),f._matrix.prepend(this._matrix),f.rotate(h.subtract(c).getAngle()+90),(t===e||t)&&f.insertAbove(this),f}return null},toPath:"#clone",compare:function t(e){if(!e||e instanceof N)return t.base.call(this,e);var i=this.getCurves(),n=e.getCurves(),r=i.length,s=n.length;if(!r||!s)return r==s;for(var a,o,h=i[0].getValues(),u=[],l=0,c=0,f=0;f<s;f++){g=n[f].getValues();if(u.push(g),v=k.getOverlaps(h,g)){a=!f&&v[0][0]>0?s-1:f,o=v[0][1];break}}for(var d,_=Math.abs,g=u[a];h&&g;){var v=k.getOverlaps(h,g);if(v&&_(v[0][0]-c)<1e-8){1===(c=v[1][0])&&(h=++l<r?i[l].getValues():null,c=0);var p=v[0][1];if(_(p-o)<1e-8){if(d||(d=[a,p]),1===(o=v[1][1])&&(++a>=s&&(a=0),g=u[a]||n[a].getValues(),o=0),!h)return d[0]===a&&d[1]===o;continue}}break}return!1},_hitTestSelf:function(t,e,i,n){function r(e,i){return t.subtract(e).divide(i).length<=1}function s(t,i,n){if(!e.selected||i.isSelected()){var s=t._point;if(i!==s&&(i=i.add(s)),r(i,x))return new M(n,g,{segment:t,point:i})}}function a(t,i){return(i||e.segments)&&s(t,t._point,"segment")||!i&&e.handles&&(s(t,t._handleIn,"handle-in")||s(t,t._handleOut,"handle-out"))}function o(t){f.add(t)}function h(e){var i=y||e._index>0&&e._index<m-1;if("round"===(i?u:l))return r(e._point,x);if(f=new L({internal:!0,closed:!0}),i?e.isSmooth()||L._addBevelJoin(e,u,P,c,null,n,o,!0):"square"===l&&L._addSquareCap(e,l,P,null,n,o,!0),!f.isEmpty()){var s;return f.contains(t)||(s=f.getNearestLocation(t))&&r(s.getPoint(),w)}}var u,l,c,f,d,_,g=this,v=this.getStyle(),p=this._segments,m=p.length,y=this._closed,w=e._tolerancePadding,x=w,b=e.stroke&&v.hasStroke(),C=e.fill&&v.hasFill(),S=e.curves,P=b?v.getStrokeWidth()/2:C&&e.tolerance>0||S?0:null;if(null!==P&&(P>0?(u=v.getStrokeJoin(),l=v.getStrokeCap(),c=v.getMiterLimit(),x=x.add(L._getStrokePadding(P,n))):u=l="round"),!e.ends||e.segments||y){if(e.segments||e.handles)for(T=0;T<m;T++)if(_=a(p[T]))return _}else if(_=a(p[0],!0)||a(p[m-1],!0))return _;if(null!==P){if(d=this.getNearestLocation(t)){var I=d.getTime();0===I||1===I&&m>1?h(d.getSegment())||(d=null):r(d.getPoint(),x)||(d=null)}if(!d&&"miter"===u&&m>1)for(var T=0;T<m;T++){var z=p[T];if(t.getDistance(z._point)<=c*P&&h(z)){d=z.getLocation();break}}}return!d&&C&&this._contains(t)||d&&!b&&!S?new M("fill",this):d?new M(b?"stroke":"curve",this,{location:d,point:d.getPoint()}):null}},r.each(k._evaluateMethods,function(t){this[t+"At"]=function(e){var i=this.getLocationAt(e);return i&&i[t]()}},{beans:!1,getLocationOf:function(){for(var t=c.read(arguments),e=this.getCurves(),i=0,n=e.length;i<n;i++){var r=e[i].getLocationOf(t);if(r)return r}return null},getOffsetOf:function(){var t=this.getLocationOf.apply(this,arguments);return t?t.getOffset():null},getLocationAt:function(t){if("number"==typeof t){for(var e=this.getCurves(),i=0,n=0,r=e.length;n<r;n++){var s=i,a=e[n];if((i+=a.getLength())>t)return a.getLocationAt(t-s)}if(e.length>0&&t<=this.getLength())return new O(e[e.length-1],1)}else if(t&&t.getPath&&t.getPath()===this)return t;return null}}),new function(){function t(t,e,i,n){function r(e){var i=h[e],n=h[e+1];s==i&&a==n||(t.beginPath(),t.moveTo(s,a),t.lineTo(i,n),t.stroke(),t.beginPath(),t.arc(i,n,o,0,2*Math.PI,!0),t.fill())}for(var s,a,o=n/2,h=new Array(6),u=0,l=e.length;u<l;u++){var c=e[u],f=c._selection;if(c._transformCoordinates(i,h),s=h[0],a=h[1],2&f&&r(2),4&f&&r(4),t.fillRect(s-o,a-o,n,n),!(1&f)){var d=t.fillStyle;t.fillStyle="#ffffff",t.fillRect(s-o+1,a-o+1,n-2,n-2),t.fillStyle=d}}}function e(t,e,i){function n(e){if(i)e._transformCoordinates(i,_),r=_[0],s=_[1];else{var n=e._point;r=n._x,s=n._y}if(g)t.moveTo(r,s),g=!1;else{if(i)h=_[2],u=_[3];else{f=e._handleIn;h=r+f._x,u=s+f._y}h===r&&u===s&&l===a&&c===o?t.lineTo(r,s):t.bezierCurveTo(l,c,h,u,r,s)}if(a=r,o=s,i)l=_[4],c=_[5];else{var f=e._handleOut;l=a+f._x,c=o+f._y}}for(var r,s,a,o,h,u,l,c,f=e._segments,d=f.length,_=new Array(6),g=!0,v=0;v<d;v++)n(f[v]);e._closed&&d>0&&n(f[0])}return{_draw:function(t,i,n,r){function s(t){return c[(t%f+f)%f]}var a=i.dontStart,o=i.dontFinish||i.clip,h=this.getStyle(),u=h.hasFill(),l=h.hasStroke(),c=h.getDashArray(),f=!paper.support.nativeDash&&l&&c&&c.length;if(a||t.beginPath(),(u||l&&!f||o)&&(e(t,this,r),this._closed&&t.closePath()),!o&&(u||l)&&(this._setStyles(t,i,n),u&&(t.fill(h.getFillRule()),t.shadowColor="rgba(0,0,0,0)"),l)){if(f){a||t.beginPath();var d,_=new B(this,.25,32,!1,r),g=_.length,v=-h.getDashOffset(),p=0;for(v%=g;v>0;)v-=s(p--)+s(p--);for(;v<g;)d=v+s(p++),(v>0||d>0)&&_.drawPart(t,Math.max(v,0),Math.max(d,0)),v=d+s(p++)}t.stroke()}},_drawSelected:function(i,n){i.beginPath(),e(i,this,n),i.stroke(),t(i,this._segments,n,paper.settings.handleSize)}}},new function(){function t(t){var e=t._segments;if(!e.length)throw new Error("Use a moveTo() command first");return e[e.length-1]}return{moveTo:function(){var t=this._segments;1===t.length&&this.removeSegment(0),t.length||this._add([new T(c.read(arguments))])},moveBy:function(){throw new Error("moveBy() is unsupported on Path items.")},lineTo:function(){this._add([new T(c.read(arguments))])},cubicCurveTo:function(){var e=c.read(arguments),i=c.read(arguments),n=c.read(arguments),r=t(this);r.setHandleOut(e.subtract(r._point)),this._add([new T(n,i.subtract(n))])},quadraticCurveTo:function(){var e=c.read(arguments),i=c.read(arguments),n=t(this)._point;this.cubicCurveTo(e.add(n.subtract(e).multiply(1/3)),e.add(i.subtract(e).multiply(1/3)),i)},curveTo:function(){var e=c.read(arguments),i=c.read(arguments),n=r.pick(r.read(arguments),.5),s=1-n,a=t(this)._point,o=e.subtract(a.multiply(s*s)).subtract(i.multiply(n*n)).divide(2*n*s);if(o.isNaN())throw new Error("Cannot put a curve through points with parameter = "+n);this.quadraticCurveTo(o,i)},arcTo:function(){var e,i,n,s,a=Math.abs,o=Math.sqrt,h=t(this),l=h._point,f=c.read(arguments),_=r.peek(arguments);if("boolean"==typeof(x=r.pick(_,!0)))var g=(C=l.add(f).divide(2)).add(C.subtract(l).rotate(x?-90:90));else if(r.remain(arguments)<=2)g=f,f=c.read(arguments);else{var v=d.read(arguments),y=u.isZero;if(y(v.width)||y(v.height))return this.lineTo(f);var w=r.read(arguments),x=!!r.read(arguments),b=!!r.read(arguments),C=l.add(f).divide(2),S=(W=l.subtract(C).rotate(-w)).x,P=W.y,I=a(v.width),M=a(v.height),z=I*I,k=M*M,O=S*S,A=P*P,L=o(O/z+A/k);if(L>1&&(z=(I*=L)*I,k=(M*=L)*M),L=(z*k-z*A-k*O)/(z*A+k*O),a(L)<1e-12&&(L=0),L<0)throw new Error("Cannot create an arc with the given arguments");e=new c(I*P/M,-M*S/I).multiply((b===x?-1:1)*o(L)).rotate(w).add(C),i=(n=(s=(new p).translate(e).rotate(w).scale(I,M))._inverseTransform(l)).getDirectedAngle(s._inverseTransform(f)),!x&&i>0?i-=360:x&&i<0&&(i+=360)}if(g){var N=new m(l.add(g).divide(2),g.subtract(l).rotate(90),!0),B=new m(g.add(f).divide(2),f.subtract(g).rotate(90),!0),D=new m(l,f),j=D.getSide(g);if(!(e=N.intersect(B,!0))){if(!j)return this.lineTo(f);throw new Error("Cannot create an arc with the given arguments")}i=(n=l.subtract(e)).getDirectedAngle(f.subtract(e));var E=D.getSide(e);0===E?i=j*a(i):j===E&&(i+=i<0?360:-360)}for(var F=a(i),R=F>=360?4:Math.ceil((F-1e-7)/90),q=i/R,V=q*Math.PI/360,H=4/3*Math.sin(V)/(1+Math.cos(V)),Z=[],U=0;U<=R;U++){var W=f,G=null;if(U<R&&(G=n.rotate(90).multiply(H),s?(W=s._transformPoint(n),G=s._transformPoint(n.add(G)).subtract(W)):W=e.add(n)),U){var J=n.rotate(-90).multiply(H);s&&(J=s._transformPoint(n.add(J)).subtract(W)),Z.push(new T(W,J,G))}else h.setHandleOut(G);n=n.rotate(q)}this._add(Z)},lineBy:function(){var e=c.read(arguments),i=t(this)._point;this.lineTo(i.add(e))},curveBy:function(){var e=c.read(arguments),i=c.read(arguments),n=r.read(arguments),s=t(this)._point;this.curveTo(s.add(e),s.add(i),n)},cubicCurveBy:function(){var e=c.read(arguments),i=c.read(arguments),n=c.read(arguments),r=t(this)._point;this.cubicCurveTo(r.add(e),r.add(i),r.add(n))},quadraticCurveBy:function(){var e=c.read(arguments),i=c.read(arguments),n=t(this)._point;this.quadraticCurveTo(n.add(e),n.add(i))},arcBy:function(){var e=t(this)._point,i=e.add(c.read(arguments)),n=r.pick(r.peek(arguments),!0);"boolean"==typeof n?this.arcTo(i,n):this.arcTo(i,e.add(c.read(arguments)))},closePath:function(t){this.setClosed(!0),this.join(this,t)}}},{_getBounds:function(t,e){var i=e.handle?"getHandleBounds":e.stroke?"getStrokeBounds":"getBounds";return L[i](this._segments,this._closed,this,t,e)},statics:{getBounds:function(t,e,i,n,r,s){function a(t){t._transformCoordinates(n,h);for(var e=0;e<2;e++)k._addBounds(u[e],u[e+4],h[e+2],h[e],e,s?s[e]:0,l,c,f);var i=u;u=h,h=i}var o=t[0];if(!o)return new g;for(var h=new Array(6),u=o._transformCoordinates(n,new Array(6)),l=u.slice(0,2),c=l.slice(),f=new Array(2),d=1,_=t.length;d<_;d++)a(t[d]);return e&&a(o),new g(l[0],l[1],c[0]-l[0],c[1]-l[1])},getStrokeBounds:function(t,e,i,n,r){function s(t){v=v.include(t)}function a(t){v=v.unite(x.setCenter(t._point.transform(n)))}function o(t,e){"round"===e||t.isSmooth()?a(t):L._addBevelJoin(t,e,p,w,n,f,s)}function h(t,e){"round"===e?a(t):L._addSquareCap(t,e,p,n,f,s)}var u=i.getStyle(),l=u.hasStroke(),c=u.getStrokeWidth(),f=l&&i._getStrokeMatrix(n,r),_=l&&L._getStrokePadding(c,f),v=L.getBounds(t,e,i,n,r,_);if(!l)return v;for(var p=c/2,m=u.getStrokeJoin(),y=u.getStrokeCap(),w=u.getMiterLimit(),x=new g(new d(_)),b=t.length-(e?0:1),C=1;C<b;C++)o(t[C],m);return e?o(t[0],m):b>0&&(h(t[0],y),h(t[t.length-1],y)),v},_getStrokePadding:function(t,e){if(!e)return[t,t];var i=new c(t,0).transform(e),n=new c(0,t).transform(e),r=i.getAngleInRadians(),s=i.getLength(),a=n.getLength(),o=Math.sin(r),h=Math.cos(r),u=Math.tan(r),l=Math.atan2(a*u,s),f=Math.atan2(a,u*s);return[Math.abs(s*Math.cos(l)*h+a*Math.sin(l)*o),Math.abs(a*Math.sin(f)*h+s*Math.cos(f)*o)]},_addBevelJoin:function(t,e,i,n,r,s,a,o){var h=t.getCurve(),u=h.getPrevious(),l=h.getPoint1().transform(r),f=u.getNormalAtTime(1).multiply(i).transform(s),d=h.getNormalAtTime(0).multiply(i).transform(s);if(f.getDirectedAngle(d)<0&&(f=f.negate(),d=d.negate()),o&&a(l),a(l.add(f)),"miter"===e){var _=new m(l.add(f),new c(-f.y,f.x),!0).intersect(new m(l.add(d),new c(-d.y,d.x),!0),!0);_&&l.getDistance(_)<=n*i&&a(_)}a(l.add(d))},_addSquareCap:function(t,e,i,n,r,s,a){var o=t._point.transform(n),h=t.getLocation(),u=h.getNormal().multiply(0===h.getTime()?i:-i).transform(r);"square"===e&&(a&&(s(o.subtract(u)),s(o.add(u))),o=o.add(u.rotate(-90))),s(o.add(u)),s(o.subtract(u))},getHandleBounds:function(t,e,i,n,r){var s,a,o=i.getStyle();if(r.stroke&&o.hasStroke()){var h=i._getStrokeMatrix(n,r),u=o.getStrokeWidth()/2,l=u;"miter"===o.getStrokeJoin()&&(l=u*o.getMiterLimit()),"square"===o.getStrokeCap()&&(l=Math.max(l,u*Math.SQRT2)),s=L._getStrokePadding(u,h),a=L._getStrokePadding(l,h)}for(var c=new Array(6),f=1/0,d=-f,_=f,v=d,p=0,m=t.length;p<m;p++){t[p]._transformCoordinates(n,c);for(var y=0;y<6;y+=2){var w=y?s:a,x=w?w[0]:0,b=w?w[1]:0,C=c[y],S=c[y+1],P=C-x,I=C+x,M=S-b,T=S+b;P<f&&(f=P),I>d&&(d=I),M<_&&(_=M),T>v&&(v=T)}}return new g(f,_,d-f,v-_)}}});L.inject({statics:new function(){function t(t,e,i){var n=r.getNamed(i),s=new L(n&&0==n.insert&&w.NO_INSERT);return s._add(t),s._closed=e,s.set(n,{insert:!0})}function e(e,i,r){for(var s=new Array(4),a=0;a<4;a++){var o=n[a];s[a]=new T(o._point.multiply(i).add(e),o._handleIn.multiply(i),o._handleOut.multiply(i))}return t(s,!0,r)}var i=.5522847498307936,n=[new T([-1,0],[0,i],[0,-i]),new T([0,-1],[-i,0],[i,0]),new T([1,0],[0,-i],[0,i]),new T([0,1],[i,0],[-i,0])];return{Line:function(){return t([new T(c.readNamed(arguments,"from")),new T(c.readNamed(arguments,"to"))],!1,arguments)},Circle:function(){var t=c.readNamed(arguments,"center"),i=r.readNamed(arguments,"radius");return e(t,new d(i),arguments)},Rectangle:function(){var e,n=g.readNamed(arguments,"rectangle"),r=d.readNamed(arguments,"radius",0,{readNull:!0}),s=n.getBottomLeft(!0),a=n.getTopLeft(!0),o=n.getTopRight(!0),h=n.getBottomRight(!0);if(!r||r.isZero())e=[new T(s),new T(a),new T(o),new T(h)];else{var u=(r=d.min(r,n.getSize(!0).divide(2))).width,l=r.height,c=u*i,f=l*i;e=[new T(s.add(u,0),null,[-c,0]),new T(s.subtract(0,l),[0,f]),new T(a.add(0,l),null,[0,-f]),new T(a.add(u,0),[-c,0],null),new T(o.subtract(u,0),null,[c,0]),new T(o.add(0,l),[0,-f],null),new T(h.subtract(0,l),null,[0,f]),new T(h.subtract(u,0),[c,0])]}return t(e,!0,arguments)},RoundRectangle:"#Rectangle",Ellipse:function(){var t=C._readEllipse(arguments);return e(t.center,t.radius,arguments)},Oval:"#Ellipse",Arc:function(){var t=c.readNamed(arguments,"from"),e=c.readNamed(arguments,"through"),i=c.readNamed(arguments,"to"),n=r.getNamed(arguments),s=new L(n&&0==n.insert&&w.NO_INSERT);return s.moveTo(t),s.arcTo(e,i),s.set(n)},RegularPolygon:function(){for(var e=c.readNamed(arguments,"center"),i=r.readNamed(arguments,"sides"),n=r.readNamed(arguments,"radius"),s=360/i,a=i%3==0,o=new c(0,a?-n:n),h=a?-1:.5,u=new Array(i),l=0;l<i;l++)u[l]=new T(e.add(o.rotate((l+h)*s)));return t(u,!0,arguments)},Star:function(){for(var e=c.readNamed(arguments,"center"),i=2*r.readNamed(arguments,"points"),n=r.readNamed(arguments,"radius1"),s=r.readNamed(arguments,"radius2"),a=360/i,o=new c(0,-1),h=new Array(i),u=0;u<i;u++)h[u]=new T(e.add(o.rotate(a*u).multiply(u%2?s:n)));return t(h,!0,arguments)}}}});var N=A.extend({_class:"CompoundPath",_serializeFields:{children:[]},beans:!0,initialize:function(t){this._children=[],this._namedChildren={},this._initialize(t)||("string"==typeof t?this.setPathData(t):this.addChildren(Array.isArray(t)?t:arguments))},insertChildren:function t(e,i){var n=i,s=n[0];s&&"number"==typeof s[0]&&(n=[n]);for(var a=i.length-1;a>=0;a--){var o=n[a];n!==i||o instanceof L||(n=r.slice(n)),Array.isArray(o)?n[a]=new L({segments:o,insert:!1}):o instanceof N&&(n.splice.apply(n,[a,1].concat(o.removeChildren())),o.remove())}return t.base.call(this,e,n)},reduce:function t(e){for(var i=this._children,n=i.length-1;n>=0;n--)(r=i[n].reduce(e)).isEmpty()&&r.remove();if(!i.length){var r=new L(w.NO_INSERT);return r.copyAttributes(this),r.insertAbove(this),this.remove(),r}return t.base.call(this)},isClosed:function(){for(var t=this._children,e=0,i=t.length;e<i;e++)if(!t[e]._closed)return!1;return!0},setClosed:function(t){for(var e=this._children,i=0,n=e.length;i<n;i++)e[i].setClosed(t)},getFirstSegment:function(){var t=this.getFirstChild();return t&&t.getFirstSegment()},getLastSegment:function(){var t=this.getLastChild();return t&&t.getLastSegment()},getCurves:function(){for(var t=this._children,e=[],i=0,n=t.length;i<n;i++)e.push.apply(e,t[i].getCurves());return e},getFirstCurve:function(){var t=this.getFirstChild();return t&&t.getFirstCurve()},getLastCurve:function(){var t=this.getLastChild();return t&&t.getLastCurve()},getArea:function(){for(var t=this._children,e=0,i=0,n=t.length;i<n;i++)e+=t[i].getArea();return e},getLength:function(){for(var t=this._children,e=0,i=0,n=t.length;i<n;i++)e+=t[i].getLength();return e},getPathData:function(t,e){for(var i=this._children,n=[],r=0,s=i.length;r<s;r++){var a=i[r],o=a._matrix;n.push(a.getPathData(t&&!o.isIdentity()?t.appended(o):t,e))}return n.join("")},_hitTestChildren:function t(e,i,n){return t.base.call(this,e,i.class===L||"path"===i.type?i:r.set({},i,{fill:!1}),n)},_draw:function(t,e,i,n){var r=this._children;if(r.length){e=e.extend({dontStart:!0,dontFinish:!0}),t.beginPath();for(var s=0,a=r.length;s<a;s++)r[s].draw(t,e,n);if(!e.clip){this._setStyles(t,e,i);var o=this._style;o.hasFill()&&(t.fill(o.getFillRule()),t.shadowColor="rgba(0,0,0,0)"),o.hasStroke()&&t.stroke()}}},_drawSelected:function(t,e,i){for(var n=this._children,r=0,s=n.length;r<s;r++){var a=n[r],o=a._matrix;i[a._id]||a._drawSelected(t,o.isIdentity()?e:e.appended(o))}}},new function(){function t(t,e){var i=t._children;if(e&&!i.length)throw new Error("Use a moveTo() command first");return i[i.length-1]}return r.each(["lineTo","cubicCurveTo","quadraticCurveTo","curveTo","arcTo","lineBy","cubicCurveBy","quadraticCurveBy","curveBy","arcBy"],function(e){this[e]=function(){var i=t(this,!0);i[e].apply(i,arguments)}},{moveTo:function(){var e=t(this),i=e&&e.isEmpty()?e:new L(w.NO_INSERT);i!==e&&this.addChild(i),i.moveTo.apply(i,arguments)},moveBy:function(){var e=t(this,!0),i=e&&e.getLastSegment(),n=c.read(arguments);this.moveTo(i?n.add(i._point):n)},closePath:function(e){t(this,!0).closePath(e)}})},r.each(["reverse","flatten","simplify","smooth"],function(t){this[t]=function(e){for(var i,n=this._children,r=0,s=n.length;r<s;r++)i=n[r][t](e)||i;return i}},{}));A.inject(new function(){function t(t,e){var i=t.clone(!1).reduce({simplify:!0}).transform(null,!0,!0);return e?i.resolveCrossings().reorient("nonzero"===i.getFillRule(),!0):i}function i(t,e,i,n,r){var s=new N(w.NO_INSERT);return s.addChildren(t,!0),s=s.reduce({simplify:e}),r&&0==r.insert||s.insertAbove(n&&i.isSibling(n)&&i.getIndex()<n.getIndex()?n:i),s.copyAttributes(i,!0),s}function n(e,n,r,a){function o(t){for(var e=0,i=t.length;e<i;e++){var n=t[e];w.push.apply(w,n._segments),x.push.apply(x,n.getCurves()),n._overlapsOnly=!0}}if(a&&(0==a.trace||a.stroke)&&/^(subtract|intersect)$/.test(r))return s(e,n,r);var u=t(e,!0),c=n&&e!==n&&t(n,!0),_=p[r];_[r]=!0,c&&(_.subtract||_.exclude)^c.isClockwise()^u.isClockwise()&&c.reverse();var g,v=l(O.expand(u.getCrossings(c))),m=u._children||[u],y=c&&(c._children||[c]),w=[],x=[];if(v.length){o(m),y&&o(y);for(var b=0,C=v.length;b<C;b++)f(v[b]._segment,u,c,x,_);for(var b=0,C=w.length;b<C;b++){var S=w[b],P=S._intersection;S._winding||f(S,u,c,x,_),P&&P._overlap||(S._path._overlapsOnly=!1)}g=d(w,_)}else g=h(y?m.concat(y):m.slice(),function(t){return!!_[t]});return i(g,!0,e,n,a)}function s(e,n,r){function s(t){if(!c[t._id]&&(l||o.contains(t.getPointAt(t.getLength()/2))^u))return f.unshift(t),c[t._id]=!0}for(var a=t(e),o=t(n),h=a.getCrossings(o),u="subtract"===r,l="divide"===r,c={},f=[],d=h.length-1;d>=0;d--){var _=h[d].split();_&&(s(_)&&_.getFirstSegment().setHandleIn(0,0),a.getLastSegment().setHandleOut(0,0))}return s(a),i(f,!1,e,n)}function a(t,e){for(var i=t;i;){if(i===e)return;i=i._previous}for(;t._next&&t._next!==e;)t=t._next;if(!t._next){for(;e._previous;)e=e._previous;t._next=e,e._previous=t}}function o(t){for(var e=t.length-1;e>=0;e--)t[e].clearHandles()}function h(t,e,i){var n=t&&t.length;if(n){var s=r.each(t,function(t,e){this[t._id]={container:null,winding:t.isClockwise()?1:-1,index:e}},{}),a=t.slice().sort(function(t,e){return v(e.getArea())-v(t.getArea())}),o=a[0];null==i&&(i=o.isClockwise());for(var h=0;h<n;h++){for(var u=a[h],l=s[u._id],c=u.getInteriorPoint(),f=0,d=h-1;d>=0;d--){var _=a[d];if(_.contains(c)){var g=s[_._id];f=g.winding,l.winding+=f,l.container=g.exclude?g.container:_;break}}if(e(l.winding)===e(f))l.exclude=!0,t[l.index]=null;else{var p=l.container;u.setClockwise(p?!p.isClockwise():i)}}}return t}function l(t,e,i){function n(t){return t._path._id+"."+t._segment1._index}for(var r,s,h,u=e&&[],l=!1,c=i||[],f=i&&{},d=(i&&i.length)-1;d>=0;d--)(y=i[d])._path&&(f[n(y)]=!0);for(d=t.length-1;d>=0;d--){var _,g=t[d],v=g._time,p=v,m=e&&!e(g),y=g._curve;if(y&&(y!==s?(l=!y.hasHandles()||f&&f[n(y)],r=[],h=null,s=y):h>=1e-8&&(v/=h)),m)r&&r.push(g);else{if(e&&u.unshift(g),h=p,v<1e-8)_=y._segment1;else if(v>1-1e-8)_=y._segment2;else{var w=y.divideAtTime(v,!0);l&&c.push(y,w),_=w._segment1;for(var x=r.length-1;x>=0;x--){var b=r[x];b._time=(b._time-v)/(1-v)}}g._setSegment(_);var C=_._intersection,S=g._intersection;if(C){a(C,S);for(var P=C;P;)a(P._intersection,C),P=P._next}else _._intersection=S}}return i||o(c),u||t}function c(t,e,i,n,r){function s(s){var a=s[l+0],h=s[l+6];if(!(p<_(a,h)||p>g(a,h))){var f=s[u+0],v=s[u+2],x=s[u+4],b=s[u+6];if(a!==h){var I=p===a?0:p===h?1:y>g(f,v,x,b)||w<_(f,v,x,b)?1:k.solveCubic(s,l,p,T,0,1)>0?T[0]:1,z=0===I?f:1===I?b:k.getPoint(s,I)[i?"y":"x"],O=a>h?1:-1,A=o[l]>o[l+6]?1:-1,L=o[u+6];return p!==a?(z<y?C+=O:z>w?S+=O:P=!0,z>d-m&&z<d+m&&(M/=2)):(O!==A?f<y?C+=O:f>w&&(S+=O):f!=L&&(L<w&&z>w?(S+=O,P=!0):L>y&&z<y&&(C+=O,P=!0)),M=0),o=s,!r&&z>y&&z<w&&0===k.getTangent(s,I)[i?"x":"y"]&&c(t,e,!i,n,!0)}(f<w&&b>y||b<w&&f>y)&&(P=!0)}}function a(t){var e=t[l+0],n=t[l+2],r=t[l+4],a=t[l+6];if(p<=g(e,n,r,a)&&p>=_(e,n,r,a))for(var o,h=t[u+0],c=t[u+2],f=t[u+4],d=t[u+6],v=y>g(h,c,f,d)||w<_(h,c,f,d)?[t]:k.getMonoCurves(t,i),m=0,x=v.length;m<x;m++)if(o=s(v[m]))return o}for(var o,h,u=i?1:0,l=1^u,f=[t.x,t.y],d=f[u],p=f[l],m=1e-6,y=d-1e-9,w=d+1e-9,x=0,b=0,C=0,S=0,P=!1,I=!1,M=1,T=[],z=0,O=e.length;z<O;z++){var A,L=e[z],N=L._path,B=L.getValues();if(!(z&&e[z-1]._path===N||(o=null,N._closed||(h=k.getValues(N.getLastCurve().getSegment2(),L.getSegment1(),null,!n))[l]!==h[l+6]&&(o=h),o))){o=B;for(var D=N.getLastCurve();D&&D!==L;){var j=D.getValues();if(j[l]!==j[l+6]){o=j;break}D=D.getPrevious()}}if(A=a(B))return A;if(z+1===O||e[z+1]._path!==N){if(h&&(A=a(h)))return A;!P||C||S||(C=S=N.isClockwise(n)^i?1:-1),x+=C,b+=S,C=S=0,P&&(I=!0,P=!1),h=null}}return x=v(x),b=v(b),{winding:g(x,b),windingL:x,windingR:b,quality:M,onPath:I}}function f(t,e,i,n,r){var s=[],a=t,o=0;do{d=(y=t.getCurve()).getLength();s.push({segment:t,curve:y,length:d}),o+=d,t=t.getNext()}while(t&&!t._intersection&&t!==a);for(var h=[.5,.25,.75],l={winding:0,quality:-1},f=0;f<h.length&&l.quality<.5;f++)for(var d=o*h[f],_=0,g=s.length;_<g;_++){var p=s[_],m=p.length;if(d<=m){var y=p.curve,w=y._path,x=w._parent,b=x instanceof N?x:w,C=u.clamp(y.getTimeAt(d),1e-8,1-1e-8),S=y.getPointAtTime(C),P=v(y.getTangentAtTime(C).y)<Math.SQRT1_2,I=r.subtract&&i&&(b===e&&i._getWinding(S,P,!0).winding||b===i&&!e._getWinding(S,P,!0).winding)?{winding:0,quality:1}:c(S,n,P,!0);I.quality>l.quality&&(l=I);break}d-=m}for(_=s.length-1;_>=0;_--)s[_].segment._winding=l}function d(t,e){function i(t){var i;return!(!t||t._visited||e&&(!e[(i=t._winding||{}).winding]||e.unite&&2===i.winding&&i.windingL&&i.windingR))}function n(t){if(t)for(var e=0,i=s.length;e<i;e++)if(t===s[e])return!0;return!1}function r(t){for(var e=t._segments,i=0,n=e.length;i<n;i++)e[i]._visited=!0}var s,a=[];t.sort(function(t,e){var i=t._intersection,n=e._intersection,r=!(!i||!i._overlap),s=!(!n||!n._overlap),a=t._path,o=e._path;return r^s?r?1:-1:!i^!n?i?1:-1:a!==o?a._id-o._id:t._index-e._index});for(var o=0,h=t.length;o<h;o++){var u,l,c,f=t[o],d=i(f),_=null,g=!1,v=!0,p=[];if(d&&f._path._overlapsOnly){var m=f._path,y=f._intersection._segment._path;m.compare(y)&&(m.getArea()&&a.push(m.clone(!1)),r(m),r(y),d=!1)}for(;d;){var x=!_,b=function(t,e){function r(r,a){for(;r&&r!==a;){var o=r._segment,u=o&&o._path;if(u){var l=o.getNext()||u.getFirstSegment(),c=l._intersection;o!==t&&(n(o)||n(l)||l&&i(o)&&(i(l)||c&&i(c._segment)))&&h.push(o),e&&s.push(o)}r=r._next}}var a=t._intersection,o=a,h=[];if(e&&(s=[t]),a){for(r(a);a&&a._prev;)a=a._prev;r(a,o)}return h}(f,x),C=b.shift(),S=!(g=!x&&(n(f)||n(C)))&&C;if(x&&(_=new L(w.NO_INSERT),u=null),g){(f.isFirst()||f.isLast())&&(v=f._path._closed),f._visited=!0;break}if(S&&u&&(p.push(u),u=null),u||(S&&b.push(f),u={start:_._segments.length,crossings:b,visited:l=[],handleIn:c}),S&&(f=C),!i(f)){_.removeSegments(u.start);for(var P=0,I=l.length;P<I;P++)l[P]._visited=!1;l.length=0;do{(f=u&&u.crossings.shift())&&f._path||(f=null,(u=p.pop())&&(l=u.visited,c=u.handleIn))}while(u&&!i(f));if(!f)break}var M=f.getNext();_.add(new T(f._point,c,M&&f._handleOut)),f._visited=!0,l.push(f),f=M||f._path.getFirstSegment(),c=M&&M._handleIn}g&&(v&&(_.getFirstSegment().setHandleIn(c),_.setClosed(v)),0!==_.getArea()&&a.push(_))}return a}var _=Math.min,g=Math.max,v=Math.abs,p={unite:{1:!0,2:!0},intersect:{2:!0},subtract:{1:!0},exclude:{1:!0,"-1":!0}};return{_getWinding:function(t,e,i){return c(t,this.getCurves(),e,i)},unite:function(t,e){return n(this,t,"unite",e)},intersect:function(t,e){return n(this,t,"intersect",e)},subtract:function(t,e){return n(this,t,"subtract",e)},exclude:function(t,e){return n(this,t,"exclude",e)},divide:function(t,e){return e&&(0==e.trace||e.stroke)?s(this,t,"divide"):i([this.subtract(t,e),this.intersect(t,e)],!0,this,t,e)},resolveCrossings:function(){function t(t,e){var i=t&&t._intersection;return i&&i._overlap&&i._path===e}var e=this._children,i=e||[this],n=!1,s=!1,a=this.getIntersections(null,function(t){return t.hasOverlap()&&(n=!0)||t.isCrossing()&&(s=!0)}),h=n&&s&&[];if(a=O.expand(a),n)for(var u=l(a,function(t){return t.hasOverlap()},h),c=u.length-1;c>=0;c--){var f=u[c],_=f._path,g=f._segment,v=g.getPrevious(),p=g.getNext();t(v,_)&&t(p,_)&&(g.remove(),v._handleOut._set(0,0),p._handleIn._set(0,0),v===g||v.getCurve().hasLength()||(p._handleIn.set(v._handleIn),v.remove()))}s&&(l(a,n&&function(t){var e=t.getCurve(),i=t.getSegment(),n=t._intersection,r=n._curve,s=n._segment;if(e&&r&&e._path&&r._path)return!0;i&&(i._intersection=null),s&&(s._intersection=null)},h),h&&o(h),i=d(r.each(i,function(t){this.push.apply(this,t._segments)},[])));var m,y=i.length;return y>1&&e?(i!==e&&this.setChildren(i),m=this):1!==y||e||(i[0]!==this&&this.setSegments(i[0].removeSegments()),m=this),m||((m=new N(w.NO_INSERT)).addChildren(i),(m=m.reduce()).copyAttributes(this),this.replaceWith(m)),m},reorient:function(t,i){var n=this._children;return n&&n.length?this.setChildren(h(this.removeChildren(),function(e){return!!(t?e:1&e)},i)):i!==e&&this.setClockwise(i),this},getInteriorPoint:function(){var t=this.getBounds().getCenter(!0);if(!this.contains(t)){for(var e=this.getCurves(),i=t.y,n=[],r=[],s=0,a=e.length;s<a;s++){var o=e[s].getValues(),h=o[1],u=o[3],l=o[5],c=o[7];if(i>=_(h,u,l,c)&&i<=g(h,u,l,c))for(var f=k.getMonoCurves(o),d=0,v=f.length;d<v;d++){var p=f[d],m=p[1],y=p[7];if(m!==y&&(i>=m&&i<=y||i>=y&&i<=m)){var w=i===m?p[0]:i===y?p[6]:1===k.solveCubic(p,1,i,r,0,1)?k.getPoint(p,r[0]).x:(p[0]+p[6])/2;n.push(w)}}}n.length>1&&(n.sort(function(t,e){return t-e}),t.x=(n[0]+n[1])/2)}return t}}});var B=r.extend({_class:"PathFlattener",initialize:function(t,e,i,n,r){function s(t,e){var i=k.getValues(t,e,r);h.push(i),a(i,t._index,0,1)}function a(t,i,r,s){if(!(s-r>c)||n&&k.isStraight(t)||k.isFlatEnough(t,e||.25)){var o=t[6]-t[0],h=t[7]-t[1],f=Math.sqrt(o*o+h*h);f>0&&(l+=f,u.push({offset:l,curve:t,index:i,time:s}))}else{var d=k.subdivide(t,.5),_=(r+s)/2;a(d[0],i,r,_),a(d[1],i,_,s)}}for(var o,h=[],u=[],l=0,c=1/(i||32),f=t._segments,d=f[0],_=1,g=f.length;_<g;_++)s(d,o=f[_]),d=o;t._closed&&s(o,f[0]),this.curves=h,this.parts=u,this.length=l,this.index=0},_get:function(t){for(var e,i=this.parts,n=i.length,r=this.index;e=r,r&&!(i[--r].offset<t););for(;e<n;e++){var s=i[e];if(s.offset>=t){this.index=e;var a=i[e-1],o=a&&a.index===s.index?a.time:0,h=a?a.offset:0;return{index:s.index,time:o+(s.time-o)*(t-h)/(s.offset-h)}}}return{index:i[n-1].index,time:1}},drawPart:function(t,e,i){for(var n=this._get(e),r=this._get(i),s=n.index,a=r.index;s<=a;s++){var o=k.getPart(this.curves[s],s===n.index?n.time:0,s===r.index?r.time:1);s===n.index&&t.moveTo(o[0],o[1]),t.bezierCurveTo.apply(t,o.slice(2))}}},r.each(k._evaluateMethods,function(t){this[t+"At"]=function(e){var i=this._get(e);return k[t](this.curves[i.index],i.time)}},{})),D=r.extend({initialize:function(t){for(var e,i=this.points=[],n=t._segments,r=t._closed,s=0,a=n.length;s<a;s++){var o=n[s].point;e&&e.equals(o)||i.push(e=o.clone())}r&&(i.unshift(i[i.length-1]),i.push(i[1])),this.closed=r},fit:function(t){var e=this.points,i=e.length,n=null;return i>0&&(n=[new T(e[0])],i>1&&(this.fitCubic(n,t,0,i-1,e[1].subtract(e[0]),e[i-2].subtract(e[i-1])),this.closed&&(n.shift(),n.pop()))),n},fitCubic:function(t,e,i,n,r,s){var a=this.points;if(n-i!=1){for(var o,h=this.chordLengthParameterize(i,n),u=Math.max(e,e*e),l=!0,c=0;c<=4;c++){var f=this.generateBezier(i,n,h,r,s),d=this.findMaxError(i,n,f,h);if(d.error<e&&l)return void this.addCurve(t,f);if(o=d.index,d.error>=u)break;l=this.reparameterize(i,n,h,f),u=d.error}var _=a[o-1].subtract(a[o+1]);this.fitCubic(t,e,i,o,r,_),this.fitCubic(t,e,o,n,_.negate(),s)}else{var g=a[i],v=a[n],p=g.getDistance(v)/3;this.addCurve(t,[g,g.add(r.normalize(p)),v.add(s.normalize(p)),v])}},addCurve:function(t,e){t[t.length-1].setHandleOut(e[1].subtract(e[0])),t.push(new T(e[3],e[2].subtract(e[3])))},generateBezier:function(t,e,i,n,r){for(var s=Math.abs,a=this.points,o=a[t],h=a[e],u=[[0,0],[0,0]],l=[0,0],c=0,f=e-t+1;c<f;c++){var d=i[c],_=1-d,g=3*d*_,v=_*_*_,p=g*_,m=g*d,y=d*d*d,w=n.normalize(p),x=r.normalize(m),b=a[t+c].subtract(o.multiply(v+p)).subtract(h.multiply(m+y));u[0][0]+=w.dot(w),u[0][1]+=w.dot(x),u[1][0]=u[0][1],u[1][1]+=x.dot(x),l[0]+=w.dot(b),l[1]+=x.dot(b)}var C,S,P=u[0][0]*u[1][1]-u[1][0]*u[0][1];if(s(P)>1e-12){var I=u[0][0]*l[1]-u[1][0]*l[0];C=(l[0]*u[1][1]-l[1]*u[0][1])/P,S=I/P}else{var M=u[0][0]+u[0][1],T=u[1][0]+u[1][1];C=S=s(M)>1e-12?l[0]/M:s(T)>1e-12?l[1]/T:0}var z,k,O=h.getDistance(o),A=1e-12*O;if(C<A||S<A)C=S=O/3;else{var L=h.subtract(o);z=n.normalize(C),k=r.normalize(S),z.dot(L)-k.dot(L)>O*O&&(C=S=O/3,z=k=null)}return[o,o.add(z||n.normalize(C)),h.add(k||r.normalize(S)),h]},reparameterize:function(t,e,i,n){for(r=t;r<=e;r++)i[r-t]=this.findRoot(n,this.points[r],i[r-t]);for(var r=1,s=i.length;r<s;r++)if(i[r]<=i[r-1])return!1;return!0},findRoot:function(t,e,i){for(var n=[],r=[],s=0;s<=2;s++)n[s]=t[s+1].subtract(t[s]).multiply(3);for(s=0;s<=1;s++)r[s]=n[s+1].subtract(n[s]).multiply(2);var a=this.evaluate(3,t,i),o=this.evaluate(2,n,i),h=this.evaluate(1,r,i),l=a.subtract(e),c=o.dot(o)+l.dot(h);return u.isZero(c)?i:i-l.dot(o)/c},evaluate:function(t,e,i){for(var n=e.slice(),r=1;r<=t;r++)for(var s=0;s<=t-r;s++)n[s]=n[s].multiply(1-i).add(n[s+1].multiply(i));return n[0]},chordLengthParameterize:function(t,e){for(var i=[0],n=t+1;n<=e;n++)i[n-t]=i[n-t-1]+this.points[n].getDistance(this.points[n-1]);for(var n=1,r=e-t;n<=r;n++)i[n]/=i[r];return i},findMaxError:function(t,e,i,n){for(var r=Math.floor((e-t+1)/2),s=0,a=t+1;a<e;a++){var o=this.evaluate(3,i,n[a-t]).subtract(this.points[a]),h=o.x*o.x+o.y*o.y;h>=s&&(s=h,r=a)}return{error:s,index:r}}}),j=w.extend({_class:"TextItem",_applyMatrix:!1,_canApplyMatrix:!1,_serializeFields:{content:null},_boundsOptions:{stroke:!1,handle:!1},initialize:function(t){this._content="",this._lines=[];var i=t&&r.isPlainObject(t)&&t.x===e&&t.y===e;this._initialize(i&&t,!i&&c.read(arguments))},_equals:function(t){return this._content===t._content},copyContent:function(t){this.setContent(t._content)},getContent:function(){return this._content},setContent:function(t){this._content=""+t,this._lines=this._content.split(/\r\n|\n|\r/gm),this._changed(265)},isEmpty:function(){return!this._content},getCharacterStyle:"#getStyle",setCharacterStyle:"#setStyle",getParagraphStyle:"#getStyle",setParagraphStyle:"#setStyle"}),E=j.extend({_class:"PointText",initialize:function(){j.apply(this,arguments)},getPoint:function(){var t=this._matrix.getTranslation();return new f(t.x,t.y,this,"setPoint")},setPoint:function(){var t=c.read(arguments);this.translate(t.subtract(this._matrix.getTranslation()))},_draw:function(t,e,i){if(this._content){this._setStyles(t,e,i);var n=this._lines,r=this._style,s=r.hasFill(),a=r.hasStroke(),o=r.getLeading(),h=t.shadowColor;t.font=r.getFontStyle(),t.textAlign=r.getJustification();for(var u=0,l=n.length;u<l;u++){t.shadowColor=h;var c=n[u];s&&(t.fillText(c,0,0),t.shadowColor="rgba(0,0,0,0)"),a&&t.strokeText(c,0,0),t.translate(0,o)}}},_getBounds:function(t,e){var i=this._style,n=this._lines,r=n.length,s=i.getJustification(),a=i.getLeading(),o=this.getView().getTextWidth(i.getFontStyle(),n),h=0;"left"!==s&&(h-=o/("center"===s?2:1));var u=new g(h,r?-.75*a:0,o,r*a);return t?t._transformBounds(u,u):u}}),F=r.extend(new function(){function t(t){var n,r=t.match(/^#(\w{1,2})(\w{1,2})(\w{1,2})$/);if(r){n=[0,0,0];for(s=0;s<3;s++){h=r[s+1];n[s]=parseInt(1==h.length?h+h:h,16)/255}}else if(r=t.match(/^rgba?\((.*)\)$/))for(var s=0,o=(n=r[1].split(",")).length;s<o;s++){var h=+n[s];n[s]=s<3?h/255:h}else if(i){var u=a[t];if(!u){e||((e=Q.getContext(1,1)).globalCompositeOperation="copy"),e.fillStyle="rgba(0,0,0,0)",e.fillStyle=t,e.fillRect(0,0,1,1);var l=e.getImageData(0,0,1,1).data;u=a[t]=[l[0]/255,l[1]/255,l[2]/255]}n=u.slice()}else n=[0,0,0];return n}var e,n={gray:["gray"],rgb:["red","green","blue"],hsb:["hue","saturation","brightness"],hsl:["hue","saturation","lightness"],gradient:["gradient","origin","destination","highlight"]},s={},a={},o=[[0,3,1],[2,0,1],[1,0,3],[1,2,0],[3,1,0],[0,1,2]],u={"rgb-hsb":function(t,e,i){var n=Math.max(t,e,i),r=n-Math.min(t,e,i);return[0===r?0:60*(n==t?(e-i)/r+(e<i?6:0):n==e?(i-t)/r+2:(t-e)/r+4),0===n?0:r/n,n]},"hsb-rgb":function(t,e,i){t=(t/60%6+6)%6;var n=Math.floor(t),r=t-n,s=[i,i*(1-e),i*(1-e*r),i*(1-e*(1-r))];return[s[(n=o[n])[0]],s[n[1]],s[n[2]]]},"rgb-hsl":function(t,e,i){var n=Math.max(t,e,i),r=Math.min(t,e,i),s=n-r,a=0===s,o=(n+r)/2;return[a?0:60*(n==t?(e-i)/s+(e<i?6:0):n==e?(i-t)/s+2:(t-e)/s+4),a?0:o<.5?s/(n+r):s/(2-n-r),o]},"hsl-rgb":function(t,e,i){if(t=(t/360%1+1)%1,0===e)return[i,i,i];for(var n=[t+1/3,t,t-1/3],r=i<.5?i*(1+e):i+e-i*e,s=2*i-r,a=[],o=0;o<3;o++){var h=n[o];h<0&&(h+=1),h>1&&(h-=1),a[o]=6*h<1?s+6*(r-s)*h:2*h<1?r:3*h<2?s+(r-s)*(2/3-h)*6:s}return a},"rgb-gray":function(t,e,i){return[.2989*t+.587*e+.114*i]},"gray-rgb":function(t){return[t,t,t]},"gray-hsb":function(t){return[0,0,t]},"gray-hsl":function(t){return[0,0,t]},"gradient-rgb":function(){return[]},"rgb-gradient":function(){return[]}};return r.each(n,function(t,e){s[e]=[],r.each(t,function(t,i){var a=r.capitalize(t),o=/^(hue|saturation)$/.test(t),h=s[e][i]="gradient"===t?function(t){var e=this._components[0];return t=R.read(Array.isArray(t)?t:arguments,0,{readNull:!0}),e!==t&&(e&&e._removeOwner(this),t&&t._addOwner(this)),t}:"gradient"===e?function(){return c.read(arguments,0,{readNull:"highlight"===t,clone:!0})}:function(t){return null==t||isNaN(t)?0:t};this["get"+a]=function(){return this._type===e||o&&/^hs[bl]$/.test(this._type)?this._components[i]:this._convert(e)[i]},this["set"+a]=function(t){this._type===e||o&&/^hs[bl]$/.test(this._type)||(this._components=this._convert(e),this._properties=n[e],this._type=e),this._components[i]=h.call(this,t),this._changed()}},this)},{_class:"Color",_readIndex:!0,initialize:function e(i){var a,o,h,u,l=arguments,c=this.__read,f=0;Array.isArray(i)&&(i=(l=i)[0]);var d=null!=i&&typeof i;if("string"===d&&i in n&&(a=i,i=l[1],Array.isArray(i)?(o=i,h=l[2]):(c&&(f=1),l=r.slice(l,1),d=typeof i)),!o){if(u="number"===d?l:"object"===d&&null!=i.length?i:null){a||(a=u.length>=3?"rgb":"gray");var _=n[a].length;h=u[_],c&&(f+=u===arguments?_+(null!=h?1:0):1),u.length>_&&(u=r.slice(u,0,_))}else if("string"===d)a="rgb",4===(o=t(i)).length&&(h=o[3],o.length--);else if("object"===d)if(i.constructor===e){if(a=i._type,o=i._components.slice(),h=i._alpha,"gradient"===a)for(var g=1,v=o.length;g<v;g++){var p=o[g];p&&(o[g]=p.clone())}}else if(i.constructor===R)a="gradient",u=l;else{var m=n[a="hue"in i?"lightness"in i?"hsl":"hsb":"gradient"in i||"stops"in i||"radial"in i?"gradient":"gray"in i?"gray":"rgb"],y=s[a];this._components=o=[];for(var g=0,v=m.length;g<v;g++)null==(w=i[m[g]])&&!g&&"gradient"===a&&"stops"in i&&(w={stops:i.stops,radial:i.radial}),null!=(w=y[g].call(this,w))&&(o[g]=w);h=i.alpha}c&&a&&(f=1)}if(this._type=a||"rgb",!o){this._components=o=[];for(var g=0,v=(y=s[this._type]).length;g<v;g++){var w=y[g].call(this,u&&u[g]);null!=w&&(o[g]=w)}}return this._components=o,this._properties=n[this._type],this._alpha=h,c&&(this.__read=f),this},set:"#initialize",_serialize:function(t,e){var i=this.getComponents();return r.serialize(/^(gray|rgb)$/.test(this._type)?i:[this._type].concat(i),t,!0,e)},_changed:function(){this._canvasStyle=null,this._owner&&this._owner._changed(65)},_convert:function(t){var e;return this._type===t?this._components.slice():(e=u[this._type+"-"+t])?e.apply(this,this._components):u["rgb-"+t].apply(this,u[this._type+"-rgb"].apply(this,this._components))},convert:function(t){return new F(t,this._convert(t),this._alpha)},getType:function(){return this._type},setType:function(t){this._components=this._convert(t),this._properties=n[t],this._type=t},getComponents:function(){var t=this._components.slice();return null!=this._alpha&&t.push(this._alpha),t},getAlpha:function(){return null!=this._alpha?this._alpha:1},setAlpha:function(t){this._alpha=null==t?null:Math.min(Math.max(t,0),1),this._changed()},hasAlpha:function(){return null!=this._alpha},equals:function(t){var e=r.isPlainValue(t,!0)?F.read(arguments):t;return e===this||e&&this._class===e._class&&this._type===e._type&&this.getAlpha()===e.getAlpha()&&r.equals(this._components,e._components)||!1},toString:function(){for(var t=this._properties,e=[],i="gradient"===this._type,n=h.instance,r=0,s=t.length;r<s;r++){var a=this._components[r];null!=a&&e.push(t[r]+": "+(i?a:n.number(a)))}return null!=this._alpha&&e.push("alpha: "+n.number(this._alpha)),"{ "+e.join(", ")+" }"},toCSS:function(t){function e(t){return Math.round(255*(t<0?0:t>1?1:t))}var i=this._convert("rgb"),n=t||null==this._alpha?1:this._alpha;return i=[e(i[0]),e(i[1]),e(i[2])],n<1&&i.push(n<0?0:n),t?"#"+((1<<24)+(i[0]<<16)+(i[1]<<8)+i[2]).toString(16).slice(1):(4==i.length?"rgba(":"rgb(")+i.join(",")+")"},toCanvasStyle:function(t,e){if(this._canvasStyle)return this._canvasStyle;if("gradient"!==this._type)return this._canvasStyle=this.toCSS();var i,n=this._components,r=n[0],s=r._stops,a=n[1],o=n[2],h=n[3],u=e&&e.inverted();if(u&&(a=u._transformPoint(a),o=u._transformPoint(o),h&&(h=u._transformPoint(h))),r._radial){var l=o.getDistance(a);if(h){var c=h.subtract(a);c.getLength()>l&&(h=a.add(c.normalize(l-.1)))}var f=h||a;i=t.createRadialGradient(f.x,f.y,0,a.x,a.y,l)}else i=t.createLinearGradient(a.x,a.y,o.x,o.y);for(var d=0,_=s.length;d<_;d++){var g=s[d],v=g._offset;i.addColorStop(null==v?d/(_-1):v,g._color.toCanvasStyle())}return this._canvasStyle=i},transform:function(t){if("gradient"===this._type){for(var e=this._components,i=1,n=e.length;i<n;i++){var r=e[i];t._transformPoint(r,r,!0)}this._changed()}},statics:{_types:n,random:function(){var t=Math.random;return new F(t(),t(),t())}}})},new function(){var t={add:function(t,e){return t+e},subtract:function(t,e){return t-e},multiply:function(t,e){return t*e},divide:function(t,e){return t/e}};return r.each(t,function(t,e){this[e]=function(e){e=F.read(arguments);for(var i=this._type,n=this._components,r=e._convert(i),s=0,a=n.length;s<a;s++)r[s]=t(n[s],r[s]);return new F(i,r,null!=this._alpha?t(this._alpha,e.getAlpha()):null)}},{})}),R=r.extend({_class:"Gradient",initialize:function(t,e){this._id=l.get(),t&&r.isPlainObject(t)&&(this.set(t),t=e=null),null==this._stops&&this.setStops(t||["white","black"]),null==this._radial&&this.setRadial("string"==typeof e&&"radial"===e||e||!1)},_serialize:function(t,e){return e.add(this,function(){return r.serialize([this._stops,this._radial],t,!0,e)})},_changed:function(){for(var t=0,e=this._owners&&this._owners.length;t<e;t++)this._owners[t]._changed()},_addOwner:function(t){this._owners||(this._owners=[]),this._owners.push(t)},_removeOwner:function(t){var i=this._owners?this._owners.indexOf(t):-1;-1!=i&&(this._owners.splice(i,1),this._owners.length||(this._owners=e))},clone:function(){for(var t=[],e=0,i=this._stops.length;e<i;e++)t[e]=this._stops[e].clone();return new R(t,this._radial)},getStops:function(){return this._stops},setStops:function(t){if(t.length<2)throw new Error("Gradient stop list needs to contain at least two stops.");var i=this._stops;if(i)for(var n=0,r=i.length;n<r;n++)i[n]._owner=e;for(var n=0,r=(i=this._stops=q.readList(t,0,{clone:!0})).length;n<r;n++)i[n]._owner=this;this._changed()},getRadial:function(){return this._radial},setRadial:function(t){this._radial=t,this._changed()},equals:function(t){if(t===this)return!0;if(t&&this._class===t._class){var e=this._stops,i=t._stops,n=e.length;if(n===i.length){for(var r=0;r<n;r++)if(!e[r].equals(i[r]))return!1;return!0}}return!1}}),q=r.extend({_class:"GradientStop",initialize:function(t,i){var n=t,r=i;"object"==typeof t&&i===e&&(Array.isArray(t)&&"number"!=typeof t[0]?(n=t[0],r=t[1]):("color"in t||"offset"in t||"rampPoint"in t)&&(n=t.color,r=t.offset||t.rampPoint||0)),this.setColor(n),this.setOffset(r)},clone:function(){return new q(this._color.clone(),this._offset)},_serialize:function(t,e){var i=this._color,n=this._offset;return r.serialize(null==n?[i]:[i,n],t,!0,e)},_changed:function(){this._owner&&this._owner._changed(65)},getOffset:function(){return this._offset},setOffset:function(t){this._offset=t,this._changed()},getRampPoint:"#getOffset",setRampPoint:"#setOffset",getColor:function(){return this._color},setColor:function(){var t=F.read(arguments,0,{clone:!0});t&&(t._owner=this),this._color=t,this._changed()},equals:function(t){return t===this||t&&this._class===t._class&&this._color.equals(t._color)&&this._offset==t._offset||!1}}),V=r.extend(new function(){var t={fillColor:null,fillRule:"nonzero",strokeColor:null,strokeWidth:1,strokeCap:"butt",strokeJoin:"miter",strokeScaling:!0,miterLimit:10,dashOffset:0,dashArray:[],shadowColor:null,shadowBlur:0,shadowOffset:new c,selectedColor:null},i=r.set({},t,{fontFamily:"sans-serif",fontWeight:"normal",fontSize:12,leading:null,justification:"left"}),n=r.set({},i,{fillColor:new F}),s={strokeWidth:97,strokeCap:97,strokeJoin:97,strokeScaling:105,miterLimit:97,fontFamily:9,fontWeight:9,fontSize:9,font:9,leading:9,justification:9},a={beans:!0},o={_class:"Style",beans:!0,initialize:function(e,r,s){this._values={},this._owner=r,this._project=r&&r._project||s||paper.project,this._defaults=!r||r instanceof x?i:r instanceof j?n:t,e&&this.set(e)}};return r.each(i,function(t,i){var n=/Color$/.test(i),h="shadowOffset"===i,u=r.capitalize(i),l=s[i],f="set"+u,d="get"+u;o[f]=function(t){var r=this._owner,s=r&&r._children;if(s&&s.length>0&&!(r instanceof N))for(var a=0,o=s.length;a<o;a++)s[a]._style[f](t);else if(i in this._defaults){var h=this._values[i];h!==t&&(n&&(h&&h._owner!==e&&(h._owner=e),t&&t.constructor===F&&(t._owner&&(t=t.clone()),t._owner=r)),this._values[i]=t,r&&r._changed(l||65))}},o[d]=function(t){var s,a=this._owner,o=a&&a._children;if(i in this._defaults&&(!o||!o.length||t||a instanceof N))if((s=this._values[i])===e)(s=this._defaults[i])&&s.clone&&(s=s.clone());else{var u=n?F:h?c:null;!u||s&&s.constructor===u||(this._values[i]=s=u.read([s],0,{readNull:!0,clone:!0}),s&&n&&(s._owner=a))}else if(o)for(var l=0,f=o.length;l<f;l++){var _=o[l]._style[d]();if(l){if(!r.equals(s,_))return e}else s=_}return s},a[d]=function(t){return this._style[d](t)},a[f]=function(t){this._style[f](t)}}),r.each({Font:"FontFamily",WindingRule:"FillRule"},function(t,e){var i="get"+e,n="set"+e;o[i]=a[i]="#get"+t,o[n]=a[n]="#set"+t}),w.inject(a),o},{set:function(t){var e=t instanceof V,i=e?t._values:t;if(i)for(var n in i)if(n in this._defaults){var r=i[n];this[n]=r&&e&&r.clone?r.clone():r}},equals:function(t){function i(t,i,n){var s=t._values,a=i._values,o=i._defaults;for(var h in s){var u=s[h],l=a[h];if(!(n&&h in a||r.equals(u,l===e?o[h]:l)))return!1}return!0}return t===this||t&&this._class===t._class&&i(this,t)&&i(t,this,!0)||!1},hasFill:function(){var t=this.getFillColor();return!!t&&t.alpha>0},hasStroke:function(){var t=this.getStrokeColor();return!!t&&t.alpha>0&&this.getStrokeWidth()>0},hasShadow:function(){var t=this.getShadowColor();return!!t&&t.alpha>0&&(this.getShadowBlur()>0||!this.getShadowOffset().isZero())},getView:function(){return this._project._view},getFontStyle:function(){var t=this.getFontSize();return this.getFontWeight()+" "+t+(/[a-z]/i.test(t+"")?" ":"px ")+this.getFontFamily()},getFont:"#getFontFamily",setFont:"#setFontFamily",getLeading:function t(){var e=t.base.call(this),i=this.getFontSize();return/pt|em|%|px/.test(i)&&(i=this.getView().getPixelSize(i)),null!=e?e:1.2*i}}),H=new function(){function t(t,e,i,n){for(var r=["","webkit","moz","Moz","ms","o"],s=e[0].toUpperCase()+e.substring(1),a=0;a<6;a++){var o=r[a],h=o?o+s:e;if(h in t){if(!i)return t[h];t[h]=n;break}}}return{getStyles:function(t){var e=t&&9!==t.nodeType?t.ownerDocument:t,i=e&&e.defaultView;return i&&i.getComputedStyle(t,"")},getBounds:function(t,e){var i,n=t.ownerDocument,r=n.body,s=n.documentElement;try{i=t.getBoundingClientRect()}catch(t){i={left:0,top:0,width:0,height:0}}var a=i.left-(s.clientLeft||r.clientLeft||0),o=i.top-(s.clientTop||r.clientTop||0);if(!e){var h=n.defaultView;a+=h.pageXOffset||s.scrollLeft||r.scrollLeft,o+=h.pageYOffset||s.scrollTop||r.scrollTop}return new g(a,o,i.width,i.height)},getViewportBounds:function(t){var e=t.ownerDocument,i=e.defaultView,n=e.documentElement;return new g(0,0,i.innerWidth||n.clientWidth,i.innerHeight||n.clientHeight)},getOffset:function(t,e){return H.getBounds(t,e).getPoint()},getSize:function(t){return H.getBounds(t,!0).getSize()},isInvisible:function(t){return H.getSize(t).equals(new d(0,0))},isInView:function(t){return!H.isInvisible(t)&&H.getViewportBounds(t).intersects(H.getBounds(t,!0))},isInserted:function(t){return n.body.contains(t)},getPrefixed:function(e,i){return e&&t(e,i)},setPrefixed:function(e,i,n){if("object"==typeof i)for(var r in i)t(e,r,!0,i[r]);else t(e,i,!0,n)}}},Z={add:function(t,e){if(t)for(var i in e)for(var n=e[i],r=i.split(/[\s,]+/g),s=0,a=r.length;s<a;s++)t.addEventListener(r[s],n,!1)},remove:function(t,e){if(t)for(var i in e)for(var n=e[i],r=i.split(/[\s,]+/g),s=0,a=r.length;s<a;s++)t.removeEventListener(r[s],n,!1)},getPoint:function(t){var e=t.targetTouches?t.targetTouches.length?t.targetTouches[0]:t.changedTouches[0]:t;return new c(e.pageX||e.clientX+n.documentElement.scrollLeft,e.pageY||e.clientY+n.documentElement.scrollTop)},getTarget:function(t){return t.target||t.srcElement},getRelatedTarget:function(t){return t.relatedTarget||t.toElement},getOffset:function(t,e){return Z.getPoint(t).subtract(H.getOffset(e||Z.getTarget(t)))}};Z.requestAnimationFrame=new function(){function t(){var e=s;s=[];for(var i=0,a=e.length;i<a;i++)e[i]();(r=n&&s.length)&&n(t)}var e,n=H.getPrefixed(i,"requestAnimationFrame"),r=!1,s=[];return function(i){s.push(i),n?r||(n(t),r=!0):e||(e=setInterval(t,1e3/60))}};var U=r.extend(s,{_class:"View",initialize:function t(e,r){function s(t){return r[t]||parseInt(r.getAttribute(t),10)}function o(){var t=H.getSize(r);return t.isNaN()||t.isZero()?new d(s("width"),s("height")):t}var h;if(i&&r){this._id=r.getAttribute("id"),null==this._id&&r.setAttribute("id",this._id="view-"+t._id++),Z.add(r,this._viewEvents);if(H.setPrefixed(r.style,{userDrag:"none",userSelect:"none",touchCallout:"none",contentZooming:"none",tapHighlightColor:"rgba(0,0,0,0)"}),a.hasAttribute(r,"resize")){var u=this;Z.add(i,this._windowEvents={resize:function(){u.setViewSize(o())}})}if(h=o(),a.hasAttribute(r,"stats")&&"undefined"!=typeof Stats){this._stats=new Stats;var l=this._stats.domElement,c=l.style,f=H.getOffset(r);c.position="absolute",c.left=f.x+"px",c.top=f.y+"px",n.body.appendChild(l)}}else h=new d(r),r=null;this._project=e,this._scope=e._scope,this._element=r,this._pixelRatio||(this._pixelRatio=i&&i.devicePixelRatio||1),this._setElementSize(h.width,h.height),this._viewSize=h,t._views.push(this),t._viewsById[this._id]=this,(this._matrix=new p)._owner=this,t._focused||(t._focused=this),this._frameItems={},this._frameItemCount=0,this._itemEvents={native:{},virtual:{}},this._autoUpdate=!paper.agent.node,this._needsUpdate=!1},remove:function(){if(!this._project)return!1;U._focused===this&&(U._focused=null),U._views.splice(U._views.indexOf(this),1),delete U._viewsById[this._id];var t=this._project;return t._view===this&&(t._view=null),Z.remove(this._element,this._viewEvents),Z.remove(i,this._windowEvents),this._element=this._project=null,this.off("frame"),this._animate=!1,this._frameItems={},!0},_events:r.each(w._itemHandlers.concat(["onResize","onKeyDown","onKeyUp"]),function(t){this[t]={}},{onFrame:{install:function(){this.play()},uninstall:function(){this.pause()}}}),_animate:!1,_time:0,_count:0,getAutoUpdate:function(){return this._autoUpdate},setAutoUpdate:function(t){this._autoUpdate=t,t&&this.requestUpdate()},update:function(){},draw:function(){this.update()},requestUpdate:function(){if(!this._requested){var t=this;Z.requestAnimationFrame(function(){if(t._requested=!1,t._animate){t.requestUpdate();var e=t._element;H.getPrefixed(n,"hidden")&&"true"!==a.getAttribute(e,"keepalive")||!H.isInView(e)||t._handleFrame()}t._autoUpdate&&t.update()}),this._requested=!0}},play:function(){this._animate=!0,this.requestUpdate()},pause:function(){this._animate=!1},_handleFrame:function(){paper=this._scope;var t=Date.now()/1e3,e=this._last?t-this._last:0;this._last=t,this.emit("frame",new r({delta:e,time:this._time+=e,count:this._count++})),this._stats&&this._stats.update()},_animateItem:function(t,e){var i=this._frameItems;e?(i[t._id]={item:t,time:0,count:0},1==++this._frameItemCount&&this.on("frame",this._handleFrameItems)):(delete i[t._id],0==--this._frameItemCount&&this.off("frame",this._handleFrameItems))},_handleFrameItems:function(t){for(var e in this._frameItems){var i=this._frameItems[e];i.item.emit("frame",new r(t,{time:i.time+=t.delta,count:i.count++}))}},_changed:function(){this._project._changed(2049),this._bounds=this._decomposed=e},getElement:function(){return this._element},getPixelRatio:function(){return this._pixelRatio},getResolution:function(){return 72*this._pixelRatio},getViewSize:function(){var t=this._viewSize;return new _(t.width,t.height,this,"setViewSize")},setViewSize:function(){var t=d.read(arguments),e=t.subtract(this._viewSize);e.isZero()||(this._setElementSize(t.width,t.height),this._viewSize.set(t),this._changed(),this.emit("resize",{size:t,delta:e}),this._autoUpdate&&this.update())},_setElementSize:function(t,e){var i=this._element;i&&(i.width!==t&&(i.width=t),i.height!==e&&(i.height=e))},getBounds:function(){return this._bounds||(this._bounds=this._matrix.inverted()._transformBounds(new g(new c,this._viewSize))),this._bounds},getSize:function(){return this.getBounds().getSize()},isVisible:function(){return H.isInView(this._element)},isInserted:function(){return H.isInserted(this._element)},getPixelSize:function(t){var e,i=this._element;if(i){var r=i.parentNode,s=n.createElement("div");s.style.fontSize=t,r.appendChild(s),e=parseFloat(H.getStyles(s).fontSize),r.removeChild(s)}else e=parseFloat(e);return e},getTextWidth:function(t,e){return 0}},r.each(["rotate","scale","shear","skew"],function(t){var e="rotate"===t;this[t]=function(){var i=(e?r:c).read(arguments),n=c.read(arguments,0,{readNull:!0});return this.transform((new p)[t](i,n||this.getCenter(!0)))}},{_decompose:function(){return this._decomposed||(this._decomposed=this._matrix.decompose())},translate:function(){var t=new p;return this.transform(t.translate.apply(t,arguments))},getCenter:function(){return this.getBounds().getCenter()},setCenter:function(){var t=c.read(arguments);this.translate(this.getCenter().subtract(t))},getZoom:function(){var t=this._decompose(),e=t&&t.scaling;return e?(e.x+e.y)/2:0},setZoom:function(t){this.transform((new p).scale(t/this.getZoom(),this.getCenter()))},getRotation:function(){var t=this._decompose();return t&&t.rotation},setRotation:function(t){var e=this.getRotation();null!=e&&null!=t&&this.rotate(t-e)},getScaling:function(){var t=this._decompose(),i=t&&t.scaling;return i?new f(i.x,i.y,this,"setScaling"):e},setScaling:function(){var t=this.getScaling(),e=c.read(arguments,0,{clone:!0,readNull:!0});t&&e&&this.scale(e.x/t.x,e.y/t.y)},getMatrix:function(){return this._matrix},setMatrix:function(){var t=this._matrix;t.initialize.apply(t,arguments)},transform:function(t){this._matrix.append(t)},scrollBy:function(){this.translate(c.read(arguments).negate())}}),{projectToView:function(){return this._matrix._transformPoint(c.read(arguments))},viewToProject:function(){return this._matrix._inverseTransform(c.read(arguments))},getEventPoint:function(t){return this.viewToProject(Z.getOffset(t,this._element))}},{statics:{_views:[],_viewsById:{},_id:0,create:function(t,e){return n&&"string"==typeof e&&(e=n.getElementById(e)),new(i?W:U)(t,e)}}},new function(){function t(t){var e=Z.getTarget(t);return e.getAttribute&&U._viewsById[e.getAttribute("id")]}function e(){var t=U._focused;if(!t||!t.isVisible())for(var e=0,i=U._views.length;e<i;e++)if((t=U._views[e]).isVisible()){U._focused=h=t;break}}function r(t,e,i){t._handleMouseEvent("mousemove",e,i)}function s(t,e,i,n,r,s,a){function o(t,i){if(t.responds(i)){if(h||(h=new X(i,n,r,e||t,s?r.subtract(s):null)),t.emit(i,h)&&(I=!0,h.prevented&&(M=!0),h.stopped))return u=!0}else{var a=T[i];if(a)return o(t,a)}}for(var h,u=!1;t&&t!==a&&!o(t,i);)t=t._parent;return u}function a(t,e,i,n,r,a){return t._project.removeOn(i),M=I=!1,b&&s(b,null,i,n,r,a)||e&&e!==b&&!e.isDescendant(b)&&s(e,null,i,n,r,a,b)||s(t,b||e||t,i,n,r,a)}if(i){var o,h,u,l,c,f=!1,d=!1,_=i.navigator;_.pointerEnabled||_.msPointerEnabled?(u="pointerdown MSPointerDown",l="pointermove MSPointerMove",c="pointerup pointercancel MSPointerUp MSPointerCancel"):(u="touchstart",l="touchmove",c="touchend touchcancel","ontouchstart"in i&&_.userAgent.match(/mobile|tablet|ip(ad|hone|od)|android|silk/i)||(u+=" mousedown",l+=" mousemove",c+=" mouseup"));var g={},v={mouseout:function(t){var e=U._focused,i=Z.getRelatedTarget(t);if(e&&(!i||"HTML"===i.nodeName)){var n=Z.getOffset(t,e._element),s=n.x,a=Math.abs,o=a(s),h=o-(1<<25);n.x=a(h)<o?h*(s<0?-1:1):s,r(e,t,e.viewToProject(n))}},scroll:e};g[u]=function(e){var i=U._focused=t(e);f||(f=!0,i._handleMouseEvent("mousedown",e))},v[l]=function(i){var n=U._focused;if(!d){var s=t(i);s?n!==s&&(n&&r(n,i),o||(o=n),n=U._focused=h=s):h&&h===n&&(o&&!o.isInserted()&&(o=null),n=U._focused=o,o=null,e())}n&&r(n,i)},v[u]=function(){d=!0},v[c]=function(t){var e=U._focused;e&&f&&e._handleMouseEvent("mouseup",t),d=f=!1},Z.add(n,v),Z.add(i,{load:e});var p,m,y,w,x,b,C,S,P,I=!1,M=!1,T={doubleclick:"click",mousedrag:"mousemove"},z=!1,k={mousedown:{mousedown:1,mousedrag:1,click:1,doubleclick:1},mouseup:{mouseup:1,mousedrag:1,click:1,doubleclick:1},mousemove:{mousedrag:1,mousemove:1,mouseenter:1,mouseleave:1}};return{_viewEvents:g,_handleMouseEvent:function(t,e,i){function n(t){return r.virtual[t]||l.responds(t)||u&&u.responds(t)}var r=this._itemEvents,o=r.native[t],h="mousemove"===t,u=this._scope.tool,l=this;h&&f&&n("mousedrag")&&(t="mousedrag"),i||(i=this.getEventPoint(e));var c=this.getBounds().contains(i),d=o&&c&&l._project.hitTest(i,{tolerance:0,fill:!0,stroke:!0}),_=d&&d.item||null,g=!1,v={};if(v[t.substr(5)]=!0,o&&_!==x&&(x&&s(x,null,"mouseleave",e,i),_&&s(_,null,"mouseenter",e,i),x=_),z^c&&(s(this,null,c?"mouseenter":"mouseleave",e,i),p=c?this:null,g=!0),!c&&!v.drag||i.equals(y)||(a(this,_,h?t:"mousemove",e,i,y),g=!0),z=c,v.down&&c||v.up&&m){if(a(this,_,t,e,i,m),v.down){if(P=_===C&&Date.now()-S<300,w=C=_,!M&&_){for(var T=_;T&&!T.responds("mousedrag");)T=T._parent;T&&(b=_)}m=i}else v.up&&(M||_!==w||(S=Date.now(),a(this,_,P?"doubleclick":"click",e,i,m),P=!1),w=b=null);z=!1,g=!0}y=i,g&&u&&(I=u._handleMouseEvent(t,e,i,v)||I),(I&&!v.move||v.down&&n("mouseup"))&&e.preventDefault()},_handleKeyEvent:function(t,e,i,n){function r(r){r.responds(t)&&(paper=a,r.emit(t,s=s||new J(t,e,i,n)))}var s,a=this._scope,o=a.tool;this.isVisible()&&(r(this),o&&o.responds(t)&&r(o))},_countItemEvent:function(t,e){var i=this._itemEvents,n=i.native,r=i.virtual;for(var s in k)n[s]=(n[s]||0)+(k[s][t]||0)*e;r[t]=(r[t]||0)+e},statics:{updateFocus:e}}}}),W=U.extend({_class:"CanvasView",initialize:function(t,e){if(!(e instanceof i.HTMLCanvasElement)){var n=d.read(arguments,1);if(n.isZero())throw new Error("Cannot create CanvasView with the provided argument: "+r.slice(arguments,1));e=Q.getCanvas(n)}var s=this._context=e.getContext("2d");if(s.save(),this._pixelRatio=1,!/^off|false$/.test(a.getAttribute(e,"hidpi"))){var o=i.devicePixelRatio||1,h=H.getPrefixed(s,"backingStorePixelRatio")||1;this._pixelRatio=o/h}U.call(this,t,e),this._needsUpdate=!0},remove:function t(){return this._context.restore(),t.base.call(this)},_setElementSize:function t(e,i){var n=this._pixelRatio;if(t.base.call(this,e*n,i*n),1!==n){var r=this._element,s=this._context;if(!a.hasAttribute(r,"resize")){var o=r.style;o.width=e+"px",o.height=i+"px"}s.restore(),s.save(),s.scale(n,n)}},getPixelSize:function t(e){var i,n=paper.agent;if(n&&n.firefox)i=t.base.call(this,e);else{var r=this._context,s=r.font;r.font=e+" serif",i=parseFloat(r.font),r.font=s}return i},getTextWidth:function(t,e){var i=this._context,n=i.font,r=0;i.font=t;for(var s=0,a=e.length;s<a;s++)r=Math.max(r,i.measureText(e[s]).width);return i.font=n,r},update:function(){if(!this._needsUpdate)return!1;var t=this._project,e=this._context,i=this._viewSize;return e.clearRect(0,0,i.width+1,i.height+1),t&&t.draw(e,this._matrix,this._pixelRatio),this._needsUpdate=!1,!0}}),G=r.extend({_class:"Event",initialize:function(t){this.event=t,this.type=t&&t.type},prevented:!1,stopped:!1,preventDefault:function(){this.prevented=!0,this.event.preventDefault()},stopPropagation:function(){this.stopped=!0,this.event.stopPropagation()},stop:function(){this.stopPropagation(),this.preventDefault()},getTimeStamp:function(){return this.event.timeStamp},getModifiers:function(){return $.modifiers}}),J=G.extend({_class:"KeyEvent",initialize:function(t,e,i,n){this.type=t,this.event=e,this.key=i,this.character=n},toString:function(){return"{ type: '"+this.type+"', key: '"+this.key+"', character: '"+this.character+"', modifiers: "+this.getModifiers()+" }"}}),$=new function(){function t(t){var i=t.key||t.keyIdentifier;return i=/^U\+/.test(i)?String.fromCharCode(parseInt(i.substr(2),16)):/^Arrow[A-Z]/.test(i)?i.substr(5):"Unidentified"===i||i===e?String.fromCharCode(t.keyCode):i,h[i]||(i.length>1?r.hyphenate(i):i.toLowerCase())}function s(t,e,i,n){var o,h=U._focused;if(l[e]=t,t?c[e]=i:delete c[e],e.length>1&&(o=r.camelize(e))in f){f[o]=t;var u=paper&&paper.agent;if("meta"===o&&u&&u.mac)if(t)a={};else{for(var d in a)d in c&&s(!1,d,a[d],n);a=null}}else t&&a&&(a[e]=i);h&&h._handleKeyEvent(t?"keydown":"keyup",n,e,i)}var a,o,h={"\t":"tab"," ":"space","\b":"backspace","":"delete",Spacebar:"space",Del:"delete",Win:"meta",Esc:"escape"},u={tab:"\t",space:" ",enter:"\r"},l={},c={},f=new r({shift:!1,control:!1,alt:!1,meta:!1,capsLock:!1,space:!1}).inject({option:{get:function(){return this.alt}},command:{get:function(){var t=paper&&paper.agent;return t&&t.mac?this.meta:this.control}}});return Z.add(n,{keydown:function(e){var i=t(e),n=paper&&paper.agent;i.length>1||n&&n.chrome&&(e.altKey||n.mac&&e.metaKey||!n.mac&&e.ctrlKey)?s(!0,i,u[i]||(i.length>1?"":i),e):o=i},keypress:function(e){if(o){var i=t(e),n=e.charCode,r=n>=32?String.fromCharCode(n):i.length>1?"":i;i!==o&&(i=r.toLowerCase()),s(!0,i,r,e),o=null}},keyup:function(e){var i=t(e);i in c&&s(!1,i,c[i],e)}}),Z.add(i,{blur:function(t){for(var e in c)s(!1,e,c[e],t)}}),{modifiers:f,isDown:function(t){return!!l[t]}}},X=G.extend({_class:"MouseEvent",initialize:function(t,e,i,n,r){this.type=t,this.event=e,this.point=i,this.target=n,this.delta=r},toString:function(){return"{ type: '"+this.type+"', point: "+this.point+", target: "+this.target+(this.delta?", delta: "+this.delta:"")+", modifiers: "+this.getModifiers()+" }"}}),Y=G.extend({_class:"ToolEvent",_item:null,initialize:function(t,e,i){this.tool=t,this.type=e,this.event=i},_choosePoint:function(t,e){return t||(e?e.clone():null)},getPoint:function(){return this._choosePoint(this._point,this.tool._point)},setPoint:function(t){this._point=t},getLastPoint:function(){return this._choosePoint(this._lastPoint,this.tool._lastPoint)},setLastPoint:function(t){this._lastPoint=t},getDownPoint:function(){return this._choosePoint(this._downPoint,this.tool._downPoint)},setDownPoint:function(t){this._downPoint=t},getMiddlePoint:function(){return!this._middlePoint&&this.tool._lastPoint?this.tool._point.add(this.tool._lastPoint).divide(2):this._middlePoint},setMiddlePoint:function(t){this._middlePoint=t},getDelta:function(){return!this._delta&&this.tool._lastPoint?this.tool._point.subtract(this.tool._lastPoint):this._delta},setDelta:function(t){this._delta=t},getCount:function(){return this.tool[/^mouse(down|up)$/.test(this.type)?"_downCount":"_moveCount"]},setCount:function(t){this.tool[/^mouse(down|up)$/.test(this.type)?"downCount":"count"]=t},getItem:function(){if(!this._item){var t=this.tool._scope.project.hitTest(this.getPoint());if(t){for(var e=t.item,i=e._parent;/^(Group|CompoundPath)$/.test(i._class);)e=i,i=i._parent;this._item=e}}return this._item},setItem:function(t){this._item=t},toString:function(){return"{ type: "+this.type+", point: "+this.getPoint()+", count: "+this.getCount()+", modifiers: "+this.getModifiers()+" }"}}),K=(o.extend({_class:"Tool",_list:"tools",_reference:"tool",_events:["onMouseDown","onMouseUp","onMouseDrag","onMouseMove","onActivate","onDeactivate","onEditOptions","onKeyDown","onKeyUp"],initialize:function(t){o.call(this),this._moveCount=-1,this._downCount=-1,this.set(t)},getMinDistance:function(){return this._minDistance},setMinDistance:function(t){this._minDistance=t,null!=t&&null!=this._maxDistance&&t>this._maxDistance&&(this._maxDistance=t)},getMaxDistance:function(){return this._maxDistance},setMaxDistance:function(t){this._maxDistance=t,null!=this._minDistance&&null!=t&&t<this._minDistance&&(this._minDistance=t)},getFixedDistance:function(){return this._minDistance==this._maxDistance?this._minDistance:null},setFixedDistance:function(t){this._minDistance=this._maxDistance=t},_handleMouseEvent:function(t,e,i,n){function r(t,e){var r=i,s=a?c._point:c._downPoint||r;if(a){if(c._moveCount&&r.equals(s))return!1;if(s&&(null!=t||null!=e)){var o=r.subtract(s),h=o.getLength();if(h<(t||0))return!1;e&&(r=s.add(o.normalize(Math.min(h,e))))}c._moveCount++}return c._point=r,c._lastPoint=s||r,n.down&&(c._moveCount=-1,c._downPoint=r,c._downCount++),!0}function s(){o&&(l=c.emit(t,new Y(c,t,e))||l)}paper=this._scope,n.drag&&!this.responds(t)&&(t="mousemove");var a=n.move||n.drag,o=this.responds(t),h=this.minDistance,u=this.maxDistance,l=!1,c=this;if(n.down)r(),s();else if(n.up)r(null,u),s();else if(o)for(;r(h,u);)s();return l}}),{request:function(e){var i=new t.XMLHttpRequest;return i.open((e.method||"get").toUpperCase(),e.url,r.pick(e.async,!0)),e.mimeType&&i.overrideMimeType(e.mimeType),i.onload=function(){var t=i.status;0===t||200===t?e.onLoad&&e.onLoad.call(i,i.responseText):i.onerror()},i.onerror=function(){var t=i.status,n='Could not load "'+e.url+'" (Status: '+t+")";if(!e.onError)throw new Error(n);e.onError(n,t)},i.send(null)}}),Q={canvases:[],getCanvas:function(t,e){if(!i)return null;var r,s=!0;"object"==typeof t&&(e=t.height,t=t.width),this.canvases.length?r=this.canvases.pop():(r=n.createElement("canvas"),s=!1);var a=r.getContext("2d");if(!a)throw new Error("Canvas "+r+" is unable to provide a 2D context.");return r.width===t&&r.height===e?s&&a.clearRect(0,0,t+1,e+1):(r.width=t,r.height=e),a.save(),r},getContext:function(t,e){var i=this.getCanvas(t,e);return i?i.getContext("2d"):null},release:function(t){var e=t&&t.canvas?t.canvas:t;e&&e.getContext&&(e.getContext("2d").restore(),this.canvases.push(e))}},tt=new function(){function t(t,e,i){return.2989*t+.587*e+.114*i}function e(e,i,n,r){var s=r-t(e,i,n),r=t(d=e+s,_=i+s,g=n+s),a=v(d,_,g),o=p(d,_,g);if(a<0){var h=r-a;d=r+(d-r)*r/h,_=r+(_-r)*r/h,g=r+(g-r)*r/h}if(o>255){var u=255-r,l=o-r;d=r+(d-r)*u/l,_=r+(_-r)*u/l,g=r+(g-r)*u/l}}function i(t,e,i){return p(t,e,i)-v(t,e,i)}function n(t,e,i,n){var r,s=[t,e,i],a=p(t,e,i),o=v(t,e,i);r=0===v(o=o===t?0:o===e?1:2,a=a===t?0:a===e?1:2)?1===p(o,a)?2:1:0,s[a]>s[o]?(s[r]=(s[r]-s[o])*n/(s[a]-s[o]),s[a]=n):s[r]=s[a]=0,s[o]=0,d=s[0],_=s[1],g=s[2]}var s,a,o,h,u,l,c,f,d,_,g,v=Math.min,p=Math.max,m=Math.abs,y={multiply:function(){d=u*s/255,_=l*a/255,g=c*o/255},screen:function(){d=u+s-u*s/255,_=l+a-l*a/255,g=c+o-c*o/255},overlay:function(){d=u<128?2*u*s/255:255-2*(255-u)*(255-s)/255,_=l<128?2*l*a/255:255-2*(255-l)*(255-a)/255,g=c<128?2*c*o/255:255-2*(255-c)*(255-o)/255},"soft-light":function(){var t=s*u/255;d=t+u*(255-(255-u)*(255-s)/255-t)/255,_=(t=a*l/255)+l*(255-(255-l)*(255-a)/255-t)/255,g=(t=o*c/255)+c*(255-(255-c)*(255-o)/255-t)/255},"hard-light":function(){d=s<128?2*s*u/255:255-2*(255-s)*(255-u)/255,_=a<128?2*a*l/255:255-2*(255-a)*(255-l)/255,g=o<128?2*o*c/255:255-2*(255-o)*(255-c)/255},"color-dodge":function(){d=0===u?0:255===s?255:v(255,255*u/(255-s)),_=0===l?0:255===a?255:v(255,255*l/(255-a)),g=0===c?0:255===o?255:v(255,255*c/(255-o))},"color-burn":function(){d=255===u?255:0===s?0:p(0,255-255*(255-u)/s),_=255===l?255:0===a?0:p(0,255-255*(255-l)/a),g=255===c?255:0===o?0:p(0,255-255*(255-c)/o)},darken:function(){d=u<s?u:s,_=l<a?l:a,g=c<o?c:o},lighten:function(){d=u>s?u:s,_=l>a?l:a,g=c>o?c:o},difference:function(){(d=u-s)<0&&(d=-d),(_=l-a)<0&&(_=-_),(g=c-o)<0&&(g=-g)},exclusion:function(){d=u+s*(255-u-u)/255,_=l+a*(255-l-l)/255,g=c+o*(255-c-c)/255},hue:function(){n(s,a,o,i(u,l,c)),e(d,_,g,t(u,l,c))},saturation:function(){n(u,l,c,i(s,a,o)),e(d,_,g,t(u,l,c))},luminosity:function(){e(u,l,c,t(s,a,o))},color:function(){e(s,a,o,t(u,l,c))},add:function(){d=v(u+s,255),_=v(l+a,255),g=v(c+o,255)},subtract:function(){d=p(u-s,0),_=p(l-a,0),g=p(c-o,0)},average:function(){d=(u+s)/2,_=(l+a)/2,g=(c+o)/2},negation:function(){d=255-m(255-s-u),_=255-m(255-a-l),g=255-m(255-o-c)}},w=this.nativeModes=r.each(["source-over","source-in","source-out","source-atop","destination-over","destination-in","destination-out","destination-atop","lighter","darker","copy","xor"],function(t){this[t]=!0},{}),x=Q.getContext(1,1);x&&(r.each(y,function(t,e){var i="darken"===e,n=!1;x.save();try{x.fillStyle=i?"#300":"#a00",x.fillRect(0,0,1,1),x.globalCompositeOperation=e,x.globalCompositeOperation===e&&(x.fillStyle=i?"#a00":"#300",x.fillRect(0,0,1,1),n=x.getImageData(0,0,1,1).data[0]!==i?170:51)}catch(t){}x.restore(),w[e]=n}),Q.release(x)),this.process=function(t,e,i,n,r){var v=e.canvas,p="normal"===t;if(p||w[t])i.save(),i.setTransform(1,0,0,1,0,0),i.globalAlpha=n,p||(i.globalCompositeOperation=t),i.drawImage(v,r.x,r.y),i.restore();else{var m=y[t];if(!m)return;for(var x=i.getImageData(r.x,r.y,v.width,v.height),b=x.data,C=e.getImageData(0,0,v.width,v.height).data,S=0,P=b.length;S<P;S+=4){s=C[S],u=b[S],a=C[S+1],l=b[S+1],o=C[S+2],c=b[S+2],h=C[S+3],f=b[S+3],m();var I=h*n/255,M=1-I;b[S]=I*d+M*u,b[S+1]=I*_+M*l,b[S+2]=I*g+M*c,b[S+3]=h*n+M*f}i.putImageData(x,r.x,r.y)}}},et=new function(){function t(t,e,i){for(var n in e){var r=e[n],a=s[n];"number"==typeof r&&i&&(r=i.number(r)),a?t.setAttributeNS(a,n,r):t.setAttribute(n,r)}return t}var e="http://www.w3.org/2000/svg",i="http://www.w3.org/2000/xmlns",r="http://www.w3.org/1999/xlink",s={href:r,xlink:i,xmlns:i+"/","xmlns:xlink":i+"/"};return{svg:e,xmlns:i,xlink:r,create:function(i,r,s){return t(n.createElementNS(e,i),r,s)},get:function(t,e){var i=s[e],n=i?t.getAttributeNS(i,e):t.getAttribute(e);return"null"===n?null:n},set:t}},it=r.each({fillColor:["fill","color"],fillRule:["fill-rule","string"],strokeColor:["stroke","color"],strokeWidth:["stroke-width","number"],strokeCap:["stroke-linecap","string"],strokeJoin:["stroke-linejoin","string"],strokeScaling:["vector-effect","lookup",{true:"none",false:"non-scaling-stroke"},function(t,e){return!e&&(t instanceof A||t instanceof C||t instanceof j)}],miterLimit:["stroke-miterlimit","number"],dashArray:["stroke-dasharray","array"],dashOffset:["stroke-dashoffset","number"],fontFamily:["font-family","string"],fontWeight:["font-weight","string"],fontSize:["font-size","number"],justification:["text-anchor","lookup",{left:"start",center:"middle",right:"end"}],opacity:["opacity","number"],blendMode:["mix-blend-mode","style"]},function(t,e){var i=r.capitalize(e),n=t[2];this[e]={type:t[1],property:e,attribute:t[0],toSVG:n,fromSVG:n&&r.each(n,function(t,e){this[t]=e},{}),exportFilter:t[3],get:"get"+i,set:"set"+i}},{});return new function(){function e(t,e,i){var n=new r,s=t.getTranslation();if(e){var a=(t=t._shiftless())._inverseTransform(s);n[i?"cx":"x"]=a.x,n[i?"cy":"y"]=a.y,s=null}if(!t.isIdentity()){var o=t.decompose();if(o){var h=[],l=o.rotation,c=o.scaling,f=o.skewing;s&&!s.isZero()&&h.push("translate("+v.point(s)+")"),l&&h.push("rotate("+v.number(l)+")"),u.isZero(c.x-1)&&u.isZero(c.y-1)||h.push("scale("+v.point(c)+")"),f.x&&h.push("skewX("+v.number(f.x)+")"),f.y&&h.push("skewY("+v.number(f.y)+")"),n.transform=h.join(" ")}else n.transform="matrix("+t.getValues().join(",")+")"}return n}function i(t,i){for(var n=e(t._matrix),r=t._children,s=et.create("g",n,v),a=0,o=r.length;a<o;a++){var h=r[a],u=d(h,i);if(u)if(h.isClipMask()){var l=et.create("clipPath");l.appendChild(u),c(h,l,"clip"),et.set(s,{"clip-path":"url(#"+l.id+")"})}else s.appendChild(u)}return s}function n(t){var i=t._type,n=t._radius,r=e(t._matrix,!0,"rectangle"!==i);if("rectangle"===i){i="rect";var s=t._size,a=s.width,o=s.height;r.x-=a/2,r.y-=o/2,r.width=a,r.height=o,n.isZero()&&(n=null)}return n&&("circle"===i?r.r=n:(r.rx=n.width,r.ry=n.height)),et.create(i,r,v)}function s(t){var e=o(t,"color");if(!e){var i,n=t.getGradient(),r=n._radial,s=t.getOrigin(),a=t.getDestination();if(r){i={cx:s.x,cy:s.y,r:s.getDistance(a)};var h=t.getHighlight();h&&(i.fx=h.x,i.fy=h.y)}else i={x1:s.x,y1:s.y,x2:a.x,y2:a.y};i.gradientUnits="userSpaceOnUse",e=et.create((r?"radial":"linear")+"Gradient",i,v);for(var u=n._stops,l=0,f=u.length;l<f;l++){var d=u[l],_=d._color,g=_.getAlpha(),p=d._offset;i={offset:null==p?l/(f-1):p},_&&(i["stop-color"]=_.toCSS(!0)),g<1&&(i["stop-opacity"]=g),e.appendChild(et.create("stop",i,v))}c(t,e,"color")}return"url(#"+e.id+")"}function a(t,e,i){var n={},a=!i&&t.getParent(),o=[];return null!=t._name&&(n.id=t._name),r.each(it,function(e){var i=e.get,h=e.type,u=t[i]();if(e.exportFilter?e.exportFilter(t,u):!a||!r.equals(a[i](),u)){if("color"===h&&null!=u){var l=u.getAlpha();l<1&&(n[e.attribute+"-opacity"]=l)}"style"===h?o.push(e.attribute+": "+u):n[e.attribute]=null==u?"none":"color"===h?u.gradient?s(u,t):u.toCSS(!0):"array"===h?u.join(","):"lookup"===h?e.toSVG[u]:u}}),o.length&&(n.style=o.join(";")),1===n.opacity&&delete n.opacity,t._visible||(n.visibility="hidden"),et.set(e,n,v)}function o(t,e){return m||(m={ids:{},svgs:{}}),t&&m.svgs[e+"-"+(t._id||t.__id||(t.__id=l.get("svg")))]}function c(t,e,i){m||o();var n=m.ids[i]=(m.ids[i]||0)+1;e.id=i+"-"+n,m.svgs[i+"-"+(t._id||t.__id)]=e}function f(e,i){var n=e,r=null;if(m){n="svg"===e.nodeName.toLowerCase()&&e;for(var s in m.svgs)r||(n||(n=et.create("svg")).appendChild(e),r=n.insertBefore(et.create("defs"),n.firstChild)),r.appendChild(m.svgs[s]);m=null}return i.asString?(new t.XMLSerializer).serializeToString(n):n}function d(t,e,i){var n=x[t._class],r=n&&n(t,e);if(r){var s=e.onExport;s&&(r=s(t,r,e)||r);var o=JSON.stringify(t._data);o&&"{}"!==o&&"null"!==o&&r.setAttribute("data-paper-data",o)}return r&&a(t,r,i)}function _(t){return t||(t={}),v=new h(t.precision),t}var v,m,x={Group:i,Layer:i,Raster:function(t,i){var n=e(t._matrix,!0),r=t.getSize(),s=t.getImage();return n.x-=r.width/2,n.y-=r.height/2,n.width=r.width,n.height=r.height,n.href=0==i.embedImages&&s&&s.src||t.toDataURL(),et.create("image",n,v)},Path:function(t,i){var r=i.matchShapes;if(r){var s=t.toShape(!1);if(s)return n(s)}var a,o=t._segments,h=o.length,u=e(t._matrix);if(r&&h>=2&&!t.hasHandles())if(h>2){a=t._closed?"polygon":"polyline";for(var l=[],c=0;c<h;c++)l.push(v.point(o[c]._point));u.points=l.join(" ")}else{a="line";var f=o[0]._point,d=o[1]._point;u.set({x1:f.x,y1:f.y,x2:d.x,y2:d.y})}else a="path",u.d=t.getPathData(null,i.precision);return et.create(a,u,v)},Shape:n,CompoundPath:function(t,i){var n=e(t._matrix),r=t.getPathData(null,i.precision);return r&&(n.d=r),et.create("path",n,v)},SymbolItem:function(t,i){var n=e(t._matrix,!0),r=t._definition,s=o(r,"symbol"),a=r._item,h=a.getBounds();return s||((s=et.create("symbol",{viewBox:v.rectangle(h)})).appendChild(d(a,i)),c(r,s,"symbol")),n.href="#"+s.id,n.x+=h.x,n.y+=h.y,n.width=h.width,n.height=h.height,n.overflow="visible",et.create("use",n,v)},PointText:function(t){var i=et.create("text",e(t._matrix,!0),v);return i.textContent=t._content,i}};w.inject({exportSVG:function(t){return t=_(t),f(d(this,t,!0),t)}}),y.inject({exportSVG:function(t){t=_(t);var i=this._children,n=this.getView(),s=r.pick(t.bounds,"view"),a=t.matrix||"view"===s&&n._matrix,o=a&&p.read([a]),h="view"===s?new g([0,0],n.getViewSize()):"content"===s?w._getBounds(i,o,{stroke:!0}).rect:g.read([s],0,{readNull:!0}),u={version:"1.1",xmlns:et.svg,"xmlns:xlink":et.xlink};h&&(u.width=h.width,u.height=h.height,(h.x||h.y)&&(u.viewBox=v.rectangle(h)));var l=et.create("svg",u,v),c=l;o&&!o.isIdentity()&&(c=l.appendChild(et.create("g",e(o),v)));for(var m=0,y=i.length;m<y;m++)c.appendChild(d(i[m],t,!0));return f(l,t)}})},new function(){function s(t,e,i,n,r){var s=et.get(t,e),a=null==s?n?null:i?"":0:i?s:parseFloat(s);return/%\s*$/.test(s)?a/100*(r?1:z[/x|^width/.test(e)?"width":"height"]):a}function a(t,e,i,n,r){return e=s(t,e||"x",!1,n,r),i=s(t,i||"y",!1,n,r),!n||null!=e&&null!=i?new c(e,i):null}function o(t,e,i,n,r){return e=s(t,e||"width",!1,n,r),i=s(t,i||"height",!1,n,r),!n||null!=e&&null!=i?new d(e,i):null}function h(t,e,i){return"none"===t?null:"number"===e?parseFloat(t):"array"===e?t?t.split(/[\s,]+/g).map(parseFloat):[]:"color"===e?P(t)||t:"lookup"===e?i[t]:t}function u(t,e,i,n){var r=t.childNodes,s="clippath"===e,a="defs"===e,o=new x,h=o._project,u=h._currentStyle,l=[];if(s||a||(o=b(o,t,n),h._currentStyle=o._style.clone()),n)for(var c=t.querySelectorAll("defs"),f=0,d=c.length;f<d;f++)M(c[f],i,!1);for(var f=0,d=r.length;f<d;f++){var _,g=r[f];1!==g.nodeType||/^defs$/i.test(g.nodeName)||!(_=M(g,i,!1))||_ instanceof I||l.push(_)}return o.addChildren(l),s&&(o=b(o.reduce(),t,n)),h._currentStyle=u,(s||a)&&(o.remove(),o=null),o}function l(t,e){for(var i=t.getAttribute("points").match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g),n=[],r=0,s=i.length;r<s;r+=2)n.push(new c(parseFloat(i[r]),parseFloat(i[r+1])));var a=new L(n);return"polygon"===e&&a.closePath(),a}function f(t,e){var i,n=(s(t,"href",!0)||"").substring(1),r="radialgradient"===e;if(n)(i=k[n].getGradient())._radial^r&&((i=i.clone())._radial=r);else{for(var o=t.childNodes,h=[],u=0,l=o.length;u<l;u++){var c=o[u];1===c.nodeType&&h.push(b(new q,c))}i=new R(h,r)}var f,d,_,g="userSpaceOnUse"!==s(t,"gradientUnits",!0);return r?(d=(f=a(t,"cx","cy",!1,g)).add(s(t,"r",!1,!1,g),0),_=a(t,"fx","fy",!0,g)):(f=a(t,"x1","y1",!1,g),d=a(t,"x2","y2",!1,g)),b(new F(i,f,d,_),t)._scaleToBounds=g,null}function _(t,e,i,n){if(t.transform){for(var r=(n.getAttribute(i)||"").split(/\)\s*/g),s=new p,a=0,o=r.length;a<o;a++){var h=r[a];if(!h)break;for(var u=h.split(/\(\s*/),l=u[0],c=u[1].split(/[\s,]+/g),f=0,d=c.length;f<d;f++)c[f]=parseFloat(c[f]);switch(l){case"matrix":s.append(new p(c[0],c[1],c[2],c[3],c[4],c[5]));break;case"rotate":s.rotate(c[0],c[1],c[2]);break;case"translate":s.translate(c[0],c[1]);break;case"scale":s.scale(c);break;case"skewX":s.skew(c[0],0);break;case"skewY":s.skew(0,c[0])}}t.transform(s)}}function v(t,e,i){var n="fill-opacity"===i?"getFillColor":"getStrokeColor",r=t[n]&&t[n]();r&&r.setAlpha(parseFloat(e))}function m(t,i,n){var s=t.attributes[i],a=s&&s.value;if(!a){var o=r.camelize(i);(a=t.style[o])||n.node[o]===n.parent[o]||(a=n.node[o])}return a?"none"===a?null:a:e}function b(t,i,n){if(i.style){var s=i.parentNode,a={node:H.getStyles(i)||{},parent:!n&&!/^defs$/i.test(s.tagName)&&H.getStyles(s)||{}};r.each(N,function(n,r){var s=m(i,r,a);t=s!==e&&n(t,s,r,i,a)||t})}return t}function P(t){var e=t&&t.match(/\((?:["'#]*)([^"')]+)/),n=e&&e[1],r=n&&k[i?n.replace(i.location.href.split("#")[0]+"#",""):n];return r&&r._scaleToBounds&&((r=r.clone())._scaleToBounds=!0),r}function M(t,e,i){var s,a,h,u=t.nodeName.toLowerCase(),l="#document"!==u,c=n.body;i&&l&&(z=paper.getView().getSize(),z=o(t,null,null,!0)||z,s=et.create("svg",{style:"stroke-width: 1px; stroke-miterlimit: 10"}),a=t.parentNode,h=t.nextSibling,s.appendChild(t),c.appendChild(s));var f=paper.settings,d=f.applyMatrix,_=f.insertItems;f.applyMatrix=!1,f.insertItems=!1;var g=O[u],v=g&&g(t,u,e,i)||null;if(f.insertItems=_,f.applyMatrix=d,v){!l||v instanceof x||(v=b(v,t,i));var p=e.onImport,m=l&&t.getAttribute("data-paper-data");p&&(v=p(t,v,e)||v),e.expandShapes&&v instanceof C&&(v.remove(),v=v.toPath()),m&&(v._data=JSON.parse(m))}return s&&(c.removeChild(s),a&&(h?a.insertBefore(t,h):a.appendChild(t))),i&&(k={},v&&r.pick(e.applyMatrix,d)&&v.matrix.apply(!0,!0)),v}function T(i,r,s){function a(n){try{var a="object"==typeof n?n:(new t.DOMParser).parseFromString(n,"image/svg+xml");if(!a.nodeName)throw a=null,new Error("Unsupported SVG source: "+i);paper=h,u=M(a,r,!0),r&&!1===r.insert||s._insertItem(e,u);var l=r.onLoad;l&&l(u,n)}catch(t){o(t)}}function o(t,e){var i=r.onError;if(!i)throw new Error(t);i(t,e)}if(!i)return null;r="function"==typeof r?{onLoad:r}:r||{};var h=paper,u=null;if("string"!=typeof i||/^.*</.test(i)){if("undefined"!=typeof File&&i instanceof File){var l=new FileReader;return l.onload=function(){a(l.result)},l.onerror=function(){o(l.error)},l.readAsText(i)}a(i)}else{var c=n.getElementById(i);c?a(c):K.request({url:i,async:!0,onLoad:a,onError:o})}return u}var z,k={},O={"#document":function(t,e,i,n){for(var r=t.childNodes,s=0,a=r.length;s<a;s++){var o=r[s];if(1===o.nodeType)return M(o,i,n)}},g:u,svg:u,clippath:u,polygon:l,polyline:l,path:function(t){return A.create(t.getAttribute("d"))},lineargradient:f,radialgradient:f,image:function(t){var e=new S(s(t,"href",!0));return e.on("load",function(){var e=o(t);this.setSize(e);var i=this._matrix._transformPoint(a(t).add(e.divide(2)));this.translate(i)}),e},symbol:function(t,e,i,n){return new I(u(t,e,i,n),!0)},defs:u,use:function(t){var e=(s(t,"href",!0)||"").substring(1),i=k[e],n=a(t);return i?i instanceof I?i.place(n):i.clone().translate(n):null},circle:function(t){return new C.Circle(a(t,"cx","cy"),s(t,"r"))},ellipse:function(t){return new C.Ellipse({center:a(t,"cx","cy"),radius:o(t,"rx","ry")})},rect:function(t){return new C.Rectangle(new g(a(t),o(t)),o(t,"rx","ry"))},line:function(t){return new L.Line(a(t,"x1","y1"),a(t,"x2","y2"))},text:function(t){var e=new E(a(t).add(a(t,"dx","dy")));return e.setContent(t.textContent.trim()||""),e}},N=r.set(r.each(it,function(t){this[t.attribute]=function(e,i){if(e[t.set]&&(e[t.set](h(i,t.type,t.fromSVG)),"color"===t.type)){var n=e[t.get]();if(n&&n._scaleToBounds){var r=e.getBounds();n.transform((new p).translate(r.getPoint()).scale(r.getSize()))}}}},{}),{id:function(t,e){k[e]=t,t.setName&&t.setName(e)},"clip-path":function(t,e){var i=P(e);if(i){if((i=i.clone()).setClipMask(!0),!(t instanceof x))return new x(i,t);t.insertChild(0,i)}},gradientTransform:_,transform:_,"fill-opacity":v,"stroke-opacity":v,visibility:function(t,e){t.setVisible&&t.setVisible("visible"===e)},display:function(t,e){t.setVisible&&t.setVisible(null!==e)},"stop-color":function(t,e){t.setColor&&t.setColor(e)},"stop-opacity":function(t,e){t._color&&t._color.setAlpha(parseFloat(e))},offset:function(t,e){if(t.setOffset){var i=e.match(/(.*)%$/);t.setOffset(i?i[1]/100:parseFloat(e))}},viewBox:function(t,e,i,n,r){var s,a=new g(h(e,"array")),u=o(n,null,null,!0);if(t instanceof x){var l=u?u.divide(a.getSize()):1,c=(new p).scale(l).translate(a.getPoint().negate());s=t}else t instanceof I&&(u&&a.setSize(u),s=t._item);if(s){if("visible"!==m(n,"overflow",r)){var f=new C.Rectangle(a);f.setClipMask(!0),s.addChild(f)}c&&s.transform(c)}}});w.inject({importSVG:function(t,e){return T(t,e,this)}}),y.inject({importSVG:function(t,e){return this.activate(),T(t,e,this)}})},(paper=new(a.inject(r.exports,{Base:r,Numerical:u,Key:$,DomEvent:Z,DomElement:H,document:n,window:i,Symbol:I,PlacedSymbol:P}))).agent.node&&require("./node/extend.js")(paper),"function"==typeof define&&define.amd?define("paper",paper):"object"==typeof module&&module&&(module.exports=paper),paper}.call(this,"object"==typeof self?self:null);/*
Script: RectanglePacker.js
	An algorithm implementation in JavaScript for rectangle packing.

Author:
	Iván Montes <drslump@drslump.biz>, <http://blog.netxus.es>

License:
	LGPL - Lesser General Public License

Credits:
	- Algorithm based on <http://www.blackpawn.com/texts/lightmaps/default.html>
*/

/*
	Class: NETXUS.RectanglePacker
	A class that finds an 'efficient' position for a rectangle inside another rectangle
	without overlapping the space already taken.
	
	Algorithm based on <http://www.blackpawn.com/texts/lightmaps/default.html>
	
	It uses a binary tree to partition the space of the parent rectangle and allocate the 
	passed rectangles by dividing the partitions into filled and empty.
*/


// Create a NETXUS namespace object if it doesn't exists
if (typeof NETXUS === 'undefined')
	var NETXUS = function() {};		
	

/*	
	Constructor: NETXUS.RectanglePacker
	Initializes the object with the given maximum dimensions
	
	Parameters:
	
		width - The containing rectangle maximum width as integer
		height - The containing rectangle maximum height as integer
		
*/	
NETXUS.RectanglePacker = function ( width, height ) {
	
	this.root = {};

	// initialize
	this.reset( width, height );	
}


/*
	Resets the object to its initial state by initializing the internal variables

	Parameters:
	
		width - The containing rectangle maximum width as integer
		height - The containing rectangle maximum height as integer
*/
NETXUS.RectanglePacker.prototype.reset = function ( width, height ) {
	this.root.x = 0;
	this.root.y = 0;
	this.root.w = width;
	this.root.h = height;
	delete this.root.lft;
	delete this.root.rgt;
	
	this.usedWidth = 0;
	this.usedHeight = 0;	
}
	

/*
	Returns the actual used dimensions of the containing rectangle.
	
	Returns:
	
		A object composed of the properties: 'w' for width and 'h' for height. 
*/
NETXUS.RectanglePacker.prototype.getDimensions = function () {
	return { w: this.usedWidth, h: this.usedHeight };	
}
	
	
/*
 	Finds a suitable place for the given rectangle
 	
	Parameters:
	
		w - The rectangle width as integer.
		h - The rectangle height as integer.
		
	Returns:
	
		If there is room for the rectangle then returns the coordinates as an object 
		composed of 'x' and 'y' properties. 
		If it doesn't fit returns null
*/  	
NETXUS.RectanglePacker.prototype.findCoords = function ( w, h ) {
	
	// private function to traverse the node tree by recursion
	function recursiveFindCoords ( node, w, h ) {

		// private function to clone a node coords and size
		function cloneNode ( node ) {
			return {
				x: node.x,
				y: node.y,
				w: node.w,
				h: node.h	
			};
		}		
		
		// if we are not at a leaf then go deeper
		if ( node.lft ) {
			// check first the left branch if not found then go by the right
			var coords = recursiveFindCoords( node.lft, w, h );
			return coords ? coords : recursiveFindCoords( node.rgt, w, h );	
		}
		else
		{
			// if already used or it's too big then return
			if ( node.used || w > node.w || h > node.h )
				return null;
				
			// if it fits perfectly then use this gap
			if ( w == node.w && h == node.h ) {
				node.used = true;
				return { x: node.x, y: node.y };
			}
			
			// initialize the left and right leafs by clonning the current one
			node.lft = cloneNode( node );
			node.rgt = cloneNode( node );
			
			// checks if we partition in vertical or horizontal
			if ( node.w - w > node.h - h ) {
				node.lft.w = w;
				node.rgt.x = node.x + w;
				node.rgt.w = node.w - w;	
			} else {
				node.lft.h = h;
				node.rgt.y = node.y + h;
				node.rgt.h = node.h - h;							
			}
			
			return recursiveFindCoords( node.lft, w, h );		
		}
	}
		
	// perform the search
	var coords = recursiveFindCoords( this.root, w, h );
	// if fitted then recalculate the used dimensions
	if (coords) {
		if ( this.usedWidth < coords.x + w )
			this.usedWidth = coords.x + w;
		if ( this.usedHeight < coords.y + h )
			this.usedHeight = coords.y + h;
	}
	return coords;
}

function UnionFind(count) {
	this.roots = new Array(count);
	this.ranks = new Array(count);
	
	for(var i=0; i<count; ++i) {
		this.roots[i] = i;
		this.ranks[i] = 0;
	}
}
// Two calls find(x) always return the same result, if link(..) has not been called in between (unique representatives)
UnionFind.prototype.find = function(x) {
	var x0 = x;
	var roots = this.roots;
	while(roots[x] != x)  x = roots[x];
  
	while(roots[x0] != x) {
		var y = roots[x0];
		roots[x0] = x;
		x0 = y;
	} 
	return x;
}

UnionFind.prototype.link = function(x, y) {
	var xr = this.find(x), yr = this.find(y);
	if(xr == yr)  return;

	var ranks = this.ranks, roots = this.roots, xd = ranks[xr], yd = ranks[yr];
 
	if     (xd < yd) {  roots[xr] = yr;  }
	else if(yd < xd) {  roots[yr] = xr;  }
	else {  roots[yr] = xr;  ++ranks[xr];  }
}

var ICC=function(){var v=new Int16Array(1),C=new Uint8Array(v.buffer);function a(e,n){return e[n]<<8|e[n+1]}function G(e,n){C[0]=e[n+1];
C[1]=e[n];return v[0]}function I(e,n){return e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3]}function t(e,n,A){var L="";
for(var k=0;k<A;k++)L+=String.fromCharCode(e[n+k]);return L}function E(e,n,A){var L=[];for(var k=0;k<A;
k++)L.push(String.fromCharCode(e[n+k]));return L}function i(e,n,A){var L="";for(var k=0;k<A;k++){var z=e[n++]<<8|e[n++];
L+=String.fromCharCode(z)}return L}function B(e){var n=new Uint8Array(e);return{header:h(n,0),tags:F(n,128)}}function h(e,n){var A=t,L=I,k={};
k.I=A(e,4,4);k.version=e[8]+"."+(e[9]>>>4)+"."+(e[9]&15);k.P=A(e,12,4);k.a=A(e,16,4);k.p=A(e,20,4);k.v=a(e,24);
for(var z=0;z<5;z++)k.v+="."+a(e,26+2*z);k.platform=A(e,40,4);k.d=L(e,44);k.k=A(e,48,4);k.l=L(e,52);
k.Q=[L(e,56),L(e,60)];k.U=L(e,64);k.A=d(e,68);k.h=A(e,80,4);return k}function F(e,n){var A=I,L={},k=A(e,n);
n+=4;for(var z=0;z<k;z++){var r=t(e,n,4);n+=4;var s=A(e,n);n+=4;var x=A(e,n);n+=4;L[r]=o(e,s,x)}return L}function o(e,n,A){var L=t(e,n,4),k={C:L,T:A};
n+=4;n+=4;if(L=="mluc"){var z=[];for(var r=0;r<A;r++)z.push(e[n-8+r])}if(L=="mluc")D(k,e,n,A);else if(L=="text")M(k,e,n,A);
else if(L=="desc")u(k,e,n,A);else if(L=="mAB ")H(k,e,n,A);else if(L=="mft1")w(k,e,n,A);else if(L=="XYZ ")J(k,e,n,A);
else if(L=="para")l(k,e,n,A);else if(L=="curv")K(k,e,n,A);else if(L!="pseq"){console.log("unknown tag",L,n,n,A)}if((k.T&3)!=0)k.T+=4-(k.T&3);
return k}function D(e,n,A,L){var k=A-8,z=I(n,A);A+=4;var r=I(n,A);A+=4;e.b=[];for(var s=0;s<z;s++){var x={};
e.b.push(x);x.code=t(n,A,4);var j=I(n,A+4),b=I(n,A+8);A+=12;x.text=i(n,k+b,j>>>1)}}function u(e,n,A,L){var k=I(n,A);
A+=4;e.r=t(n,A,k-1);A+=k;var z=I(n,A);A+=4;var r=I(n,A);A+=4;e.e=i(n,A,r);A+=r;var s=a(n,A);A+=2;var x=n[A];
A++;e.z=t(n,A,x)}function H(e,n,A,L){var k=A-8;e.L=n[A];A++;e.u=n[A];A++;A+=2;var z=I(n,A);A+=4;var r=I(n,A);
A+=4;var s=I(n,A);A+=4;var x=I(n,A);A+=4;var j=I(n,A);A+=4;if(z!=0){e.S=[];A=k+z;for(var b=0;b<e.u;b++){var f=o(n,A,0);
A+=f.T;e.S.push(f)}}if(r!=0){e.F=[];for(var b=0;b<12;b++)e.F.push(p(n,k+r+b*4))}if(s!=0){e.o=[];A=k+s;
for(var b=0;b<e.u;b++){var f=o(n,A,0);A+=f.T;e.o.push(f)}}if(x!=0){e.c=[];A=k+x;e.n=[];for(var b=0;b<e.L;
b++)e.n.push(n[A+b]);A+=16;var y=n[A];A+=4;var g=e.u;for(var b=0;b<e.L;b++)g*=e.n[b];if(y==1)for(var b=0;
b<g;b++)e.c.push(n[A+b]*(1/255));if(y==2)for(var b=0;b<g;b++)e.c.push(a(n,A+2*b)*(1/65535))}if(j!=0){e.V=[];
A=k+j;for(var b=0;b<e.L;b++){var f=o(n,A,0);A+=f.T;e.V.push(f)}}}function w(e,n,A,L){q(e,n,A);A+=40;
e.K=m(n,A,e.L,256);A+=e.L*256;e.c=[];var k=Math.round(Math.pow(e.q,e.L))*e.u;for(var z=0;z<k;z++)e.c.push(n[A+z]*(1/255));
A+=k;e.D=m(n,A,e.u,256);A+=e.u*256}function q(e,n,A){e.L=n[A];A++;e.u=n[A];A++;e.q=n[A];A++;A++;e.F=[];
for(var L=0;L<9;L++){e.F.push(p(n,A));A+=4}}function m(e,n,A,L){var k=[];for(var z=0;z<A;z++){var r=[];
k.push(r);for(var s=0;s<L;s++){r.push(e[n]);n++}}return k}function l(e,n,A,L){e.s=a(n,A);A+=2;A+=2;var k=[1,3,4,5,7];
e.f=[];for(var z=0;z<k[e.s];z++)e.f.push(p(n,A+z*4))}function K(e,n,A,L){var k=I(n,A);A+=4;e.b=[];if(k==1)e.b.push(c(n,A));
else for(var z=0;z<k;z++)e.b.push(a(n,A+z*2));e.T=12+2*k}function J(e,n,A){e.value=d(n,A)}function M(e,n,A,L){e.value=t(n,A,L-9)}function c(e,n){return e[n]+e[n+1]/256}function p(e,n){return G(e,n)+a(e,n+2)*(1/65536)}function d(e,n){var A=[];
for(var L=0;L<3;L++)A.push(p(e,n+L*4));return A}return{R:B}}();ICC.U=function(){var v={O:[3.1338561,-1.6168667,-.4906146,-.9787684,1.9161415,.033454,.0719453,-.2289914,1.4052427],H:[.4360747,.3850649,.14308038,.2225045,.7168786,.0606169,.0139322,.0971045,.7141733],m:function(F){return F<.0031308?12.92*F:1.055*Math.pow(F,1/2.4)-.055},G:function(F){return F<.04045?F/12.92:Math.pow((F+.055)/1.055,2.4)},J:function(F,o,D){var u=v.R[0],H=v.R[1];
F=u[~~(F*(1e3/255))];o=u[~~(o*(1e3/255))];D=u[~~(D*(1e3/255))];var w=v.H,q=w[0]*F+w[1]*o+w[2]*D,l=w[3]*F+w[4]*o+w[5]*D,K=w[6]*F+w[7]*o+w[8]*D;
q=q*(100/96.72);l=l*(100/100);K=K*(100/81.427);return v.i(q,l,K)},i:function(F,o,D){var u=v.R[1],H=u[~~(F*1e3)],w=u[~~(o*1e3)],q=u[~~(D*1e3)];
return{t:116*w-16,j:500*(H-w),N:200*(w-q)}},w:function(F,o,D){var u=903.3,H=.008856,w=(F+16)/116,q=w*w*w,m=w-D/200,l=m*m*m,K=o/500+w,J=K*K*K,M=l>H?l:(116*m-16)/u,c=q>H?q:(116*w-16)/u,p=J>H?J:(116*K-16)/u,d=p*96.72,e=c*100,n=M*81.427,A=d/100,k=e/100,D=n/100,z=v.O,r=[z[0]*A+z[1]*k+z[2]*D,z[3]*A+z[4]*k+z[5]*D,z[6]*A+z[7]*k+z[8]*D];
for(var s=0;s<3;s++)r[s]=Math.max(0,Math.min(255,v.m(r[s])*255));return{g:r[0],q:r[1],N:r[2]}}};v.R=function(){var F=[],o=[];
for(var D=0;D<2e3;D++){var u=D/1e3;F[D]=v.G(u);o[D]=u>.008856?Math.pow(u,1/3):(903.3*u+16)*(1/116)}return[F,o]}();
function C(F,o){var D=o*o*o,u=D*3,H=1/(o-1),w=[];for(var q=0;q<o;q++)for(var l=0;l<o;l++)for(var K=0;
K<o;K++)w.push(q*H,l*H,K*H);var J=F.tags.A2B0,M=F.header.a.toLowerCase();if(J.C=="mAB "){var c=J.F,p=J.o&&J.o[0].b.length>1?J.o:null;
for(var d=0;d<u;d+=3){if(p)G(w,d,p);t(w,d,J.c,J.n[0]);if(J.F)a(w,d,J.F)}}else if(J.C=="mft1"){if(M=="rgb ")for(var d=0;
d<u;d+=3){t(w,d,J.c,J.q)}else for(var d=0;d<u;d+=3){var e=v.J(w[d]*255,w[d+1]*255,w[d+2]*255);w[d]=e.t/100;
w[d+1]=(128+e.j)/255;w[d+2]=(128+e.N)/255;t(w,d,J.c,J.q);var n=v.w(w[d]*100,-128+255*w[d+1],-128+255*w[d+2]);
w[d]=n.g/255;w[d+1]=n.q/255;w[d+2]=n.N/255}}return w}function a(F,o,D){var u=F[o],H=F[o+1],w=F[o+2];
F[o]=Math.max(0,Math.min(1,D[0]*u+D[1]*H+D[2]*w+D[9]));F[o+1]=Math.max(0,Math.min(1,D[3]*u+D[4]*H+D[5]*w+D[10]));
F[o+2]=Math.max(0,Math.min(1,D[6]*u+D[7]*H+D[8]*w+D[11]))}function G(F,o,D){F[o]=I(F[o],D[0].b);F[o+1]=I(F[o+1],D[1].b);
F[o+2]=I(F[o+2],D[2].b)}function I(F,o){var D=o.length,u=F*(D-1)*.99999,H=~~u,w=u-H;return((1-w)*o[H]+w*o[H+1])*(1/65535)}function t(F,o,D,u){var H=[0,0,0,0,0,0,0,0,0,0,0,0],w=u-1.000001,q=w*F[o+0],l=w*F[o+1],K=w*F[o+2],J=~~q,M=~~l,c=~~K;
E(3*(c+u*M+u*u*J),3*(c+1+u*M+u*u*J),D,K-c,0,H);E(3*(c+u*(M+1)+u*u*J),3*(c+1+u*(M+1)+u*u*J),D,K-c,3,H);
E(0,3,H,l-M,6,H);E(3*(c+u*M+u*u*(J+1)),3*(c+1+u*M+u*u*(J+1)),D,K-c,0,H);E(3*(c+u*(M+1)+u*u*(J+1)),3*(c+1+u*(M+1)+u*u*(J+1)),D,K-c,3,H);
E(0,3,H,l-M,9,H);E(6,9,H,q-J,0,H);F[o]=H[0];F[o+1]=H[1];F[o+2]=H[2]}function E(F,o,D,u,H,w){var q=1-u;
w[H+0]=q*D[F]+u*D[o];w[H+1]=q*D[F+1]+u*D[o+1];w[H+2]=q*D[F+2]+u*D[o+2]}function i(F,o){var D=o*o*o,u=new Uint8Array(D*4);
for(var H=0;H<D;H++){var w=H*3,q=w+H,m=Math.max(0,Math.min(1,F[w])),l=Math.max(0,Math.min(1,F[w+1])),K=Math.max(0,Math.min(1,F[w+2]));
u[q]=~~(.5+m*255);u[q+1]=~~(.5+l*255);u[q+2]=~~(.5+K*255);u[q+3]=255;F[w]=m;F[w+1]=l;F[w+2]=K}return u}function B(F,o,D,u,H,w){var q=1-u;
w[H+0]=q*D[F]+u*D[o];w[H+1]=q*D[F+1]+u*D[o+1];w[H+2]=q*D[F+2]+u*D[o+2]}function h(F,o,D,u){var H=[0,0,0,0,0,0,0,0,0,0,0,0],w=(o-1.000001)/255,q=3;
for(var m=0;m<D.length;m+=4){var l=w*D[m],K=w*D[m+1],J=w*D[m+2],M=~~l,c=~~K,p=~~J;B(q*(p+o*c+o*o*M),q*(p+1+o*c+o*o*M),F,J-p,0,H);
B(q*(p+o*(c+1)+o*o*M),q*(p+1+o*(c+1)+o*o*M),F,J-p,3,H);B(0,3,H,K-c,6,H);B(q*(p+o*c+o*o*(M+1)),q*(p+1+o*c+o*o*(M+1)),F,J-p,0,H);
B(q*(p+o*(c+1)+o*o*(M+1)),q*(p+1+o*(c+1)+o*o*(M+1)),F,J-p,3,H);B(0,3,H,K-c,9,H);B(6,9,H,l-M,0,H);u[m]=~~(.5+H[0]*255);
u[m+1]=~~(.5+H[1]*255);u[m+2]=~~(.5+H[2]*255)}}return{rgba8LUT:i,sampleLUT:C,applyLUT:h}}()/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";function t(t){t?(f[0]=f[16]=f[1]=f[2]=f[3]=f[4]=f[5]=f[6]=f[7]=f[8]=f[9]=f[10]=f[11]=f[12]=f[13]=f[14]=f[15]=0,this.blocks=f):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}var h="object"==typeof window?window:{},s=!h.JS_SHA1_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;s&&(h=global);var i=!h.JS_SHA1_NO_COMMON_JS&&"object"==typeof module&&module.exports,e="function"==typeof define&&define.amd,r="0123456789abcdef".split(""),o=[-2147483648,8388608,32768,128],n=[24,16,8,0],a=["hex","array","digest","arrayBuffer"],f=[],u=function(h){return function(s){return new t(!0).update(s)[h]()}},c=function(){var h=u("hex");s&&(h=p(h)),h.create=function(){return new t},h.update=function(t){return h.create().update(t)};for(var i=0;i<a.length;++i){var e=a[i];h[e]=u(e)}return h},p=function(t){var h=eval("require('crypto')"),s=eval("require('buffer').Buffer"),i=function(i){if("string"==typeof i)return h.createHash("sha1").update(i,"utf8").digest("hex");if(i.constructor===ArrayBuffer)i=new Uint8Array(i);else if(void 0===i.length)return t(i);return h.createHash("sha1").update(new s(i)).digest("hex")};return i};t.prototype.update=function(t){if(!this.finalized){var s="string"!=typeof t;s&&t.constructor===h.ArrayBuffer&&(t=new Uint8Array(t));for(var i,e,r=0,o=t.length||0,a=this.blocks;r<o;){if(this.hashed&&(this.hashed=!1,a[0]=this.block,a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),s)for(e=this.start;r<o&&e<64;++r)a[e>>2]|=t[r]<<n[3&e++];else for(e=this.start;r<o&&e<64;++r)(i=t.charCodeAt(r))<128?a[e>>2]|=i<<n[3&e++]:i<2048?(a[e>>2]|=(192|i>>6)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):i<55296||i>=57344?(a[e>>2]|=(224|i>>12)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++r)),a[e>>2]|=(240|i>>18)<<n[3&e++],a[e>>2]|=(128|i>>12&63)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.block=a[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,h=this.lastByteIndex;t[16]=this.block,t[h>>2]|=o[3&h],this.block=t[16],h>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,h,s=this.h0,i=this.h1,e=this.h2,r=this.h3,o=this.h4,n=this.blocks;for(t=16;t<80;++t)h=n[t-3]^n[t-8]^n[t-14]^n[t-16],n[t]=h<<1|h>>>31;for(t=0;t<20;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i&e|~i&r)+o+1518500249+n[t]<<0)<<5|o>>>27)+(s&(i=i<<30|i>>>2)|~s&e)+r+1518500249+n[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|~o&i)+e+1518500249+n[t+2]<<0)<<5|e>>>27)+(r&(o=o<<30|o>>>2)|~r&s)+i+1518500249+n[t+3]<<0)<<5|i>>>27)+(e&(r=r<<30|r>>>2)|~e&o)+s+1518500249+n[t+4]<<0,e=e<<30|e>>>2;for(;t<40;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i^e^r)+o+1859775393+n[t]<<0)<<5|o>>>27)+(s^(i=i<<30|i>>>2)^e)+r+1859775393+n[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^i)+e+1859775393+n[t+2]<<0)<<5|e>>>27)+(r^(o=o<<30|o>>>2)^s)+i+1859775393+n[t+3]<<0)<<5|i>>>27)+(e^(r=r<<30|r>>>2)^o)+s+1859775393+n[t+4]<<0,e=e<<30|e>>>2;for(;t<60;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i&e|i&r|e&r)+o-1894007588+n[t]<<0)<<5|o>>>27)+(s&(i=i<<30|i>>>2)|s&e|i&e)+r-1894007588+n[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|o&i|s&i)+e-1894007588+n[t+2]<<0)<<5|e>>>27)+(r&(o=o<<30|o>>>2)|r&s|o&s)+i-1894007588+n[t+3]<<0)<<5|i>>>27)+(e&(r=r<<30|r>>>2)|e&o|r&o)+s-1894007588+n[t+4]<<0,e=e<<30|e>>>2;for(;t<80;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i^e^r)+o-899497514+n[t]<<0)<<5|o>>>27)+(s^(i=i<<30|i>>>2)^e)+r-899497514+n[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^i)+e-899497514+n[t+2]<<0)<<5|e>>>27)+(r^(o=o<<30|o>>>2)^s)+i-899497514+n[t+3]<<0)<<5|i>>>27)+(e^(r=r<<30|r>>>2)^o)+s-899497514+n[t+4]<<0,e=e<<30|e>>>2;this.h0=this.h0+s<<0,this.h1=this.h1+i<<0,this.h2=this.h2+e<<0,this.h3=this.h3+r<<0,this.h4=this.h4+o<<0},t.prototype.hex=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return r[t>>28&15]+r[t>>24&15]+r[t>>20&15]+r[t>>16&15]+r[t>>12&15]+r[t>>8&15]+r[t>>4&15]+r[15&t]+r[h>>28&15]+r[h>>24&15]+r[h>>20&15]+r[h>>16&15]+r[h>>12&15]+r[h>>8&15]+r[h>>4&15]+r[15&h]+r[s>>28&15]+r[s>>24&15]+r[s>>20&15]+r[s>>16&15]+r[s>>12&15]+r[s>>8&15]+r[s>>4&15]+r[15&s]+r[i>>28&15]+r[i>>24&15]+r[i>>20&15]+r[i>>16&15]+r[i>>12&15]+r[i>>8&15]+r[i>>4&15]+r[15&i]+r[e>>28&15]+r[e>>24&15]+r[e>>20&15]+r[e>>16&15]+r[e>>12&15]+r[e>>8&15]+r[e>>4&15]+r[15&e]},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return[t>>24&255,t>>16&255,t>>8&255,255&t,h>>24&255,h>>16&255,h>>8&255,255&h,s>>24&255,s>>16&255,s>>8&255,255&s,i>>24&255,i>>16&255,i>>8&255,255&i,e>>24&255,e>>16&255,e>>8&255,255&e]},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(20),h=new DataView(t);return h.setUint32(0,this.h0),h.setUint32(4,this.h1),h.setUint32(8,this.h2),h.setUint32(12,this.h3),h.setUint32(16,this.h4),t};var y=c();i?module.exports=y:(h.sha1=y,e&&define(function(){return y}))}();var EXRLoader={parse:function(e){var r={FloatType:1,UnsignedByteType:2,HalfFloatType:3,RGBEFormat:4};this.type=r.FloatType;var a=65536,n=a>>3,t=14,i=65537,o=1<<t,f=o-1,l=32768,u=65535,s=59,v=63,c=2+v-s,h=8,w=4,p=4,y=2,d=1,g=0,A=1,S=0,U=1,b=2,m=Math.pow(2.7182818,2.2),M=new DataView(new ArrayBuffer(8));function C(e){if(0===e)return[e,0];M.setFloat64(0,e);var r=M.getUint32(0)>>>20&2047;0===r&&(M.setFloat64(0,e*Math.pow(2,64)),r=(M.getUint32(0)>>>20&2047)-64);var a=r-1022;return[function(e,r){for(var a=Math.min(3,Math.ceil(Math.abs(r)/1023)),n=e,t=0;t<a;t++)n*=Math.pow(2,Math.floor((r+t)/a));return n}(e,-a),a]}var O={l:0,c:0,lc:0};function I(e,r,a,n,t){for(;a<e;)r=r<<8|te(n,t),a+=8;a-=e,O.l=r>>a&(1<<e)-1,O.c=r,O.lc=a}var E=new Array(59);function R(e,r,a,n,t,o,f){for(var l=a,u=0,h=0;t<=o;t++){if(l.value-a.value>n)return!1;I(6,u,h,e,l);var w=O.l;if(u=O.c,h=O.lc,f[t]=w,w==v){if(l.value-a.value>n)throw"Something wrong with hufUnpackEncTable";I(8,u,h,e,l);var p=O.l+c;if(u=O.c,h=O.lc,t+p>o+1)throw"Something wrong with hufUnpackEncTable";for(;p--;)f[t++]=0;t--}else if(w>=s){if(t+(p=w-s+2)>o+1)throw"Something wrong with hufUnpackEncTable";for(;p--;)f[t++]=0;t--}}!function(e){for(var r=0;r<=58;++r)E[r]=0;for(r=0;r<i;++r)E[e[r]]+=1;var a=0;for(r=58;r>0;--r){var n=a+E[r]>>1;E[r]=a,a=n}for(r=0;r<i;++r){var t=e[r];t>0&&(e[r]=t|E[t]++<<6)}}(f)}function x(e){return 63&e}function P(e){return e>>6}var z={c:0,lc:0};function N(e,r,a,n){e=e<<8|te(a,n),r+=8,z.c=e,z.lc=r}var T={c:0,lc:0};function k(e,r,a,n,t,i,o,f,l,u){if(e==r){n<8&&(N(a,n,t,o),a=z.c,n=z.lc);var s=a>>(n-=8);s=new Uint8Array([s])[0];if(l.value+s>u)return!1;for(var v=f[l.value-1];s-- >0;)f[l.value++]=v}else{if(!(l.value<u))return!1;f[l.value++]=e}T.c=a,T.lc=n}function _(e){return 65535&e}function D(e){var r=_(e);return r>32767?r-65536:r}var F={a:0,b:0};function B(e,r){var a=D(e),n=D(r),t=a+(1&n)+(n>>1),i=t,o=t-n;F.a=i,F.b=o}function L(e,r){var a=_(e),n=_(r),t=a-(n>>1)&u,i=n+t-l&u;F.a=i,F.b=t}function X(e,r,a,n,t,i,o){for(var f,l=o<16384,u=a>t?t:a,s=1;s<=u;)s<<=1;for(f=s>>=1,s>>=1;s>=1;){for(var v,c,h,w,p=0,y=p+i*(t-f),d=i*s,g=i*f,A=n*s,S=n*f;p<=y;p+=g){for(var U=p,b=p+n*(a-f);U<=b;U+=S){var m=U+A,M=(C=U+d)+A;l?(B(e[U+r],e[C+r]),v=F.a,h=F.b,B(e[m+r],e[M+r]),c=F.a,w=F.b,B(v,c),e[U+r]=F.a,e[m+r]=F.b,B(h,w),e[C+r]=F.a,e[M+r]=F.b):(L(e[U+r],e[C+r]),v=F.a,h=F.b,L(e[m+r],e[M+r]),c=F.a,w=F.b,L(v,c),e[U+r]=F.a,e[m+r]=F.b,L(h,w),e[C+r]=F.a,e[M+r]=F.b)}if(a&s){var C=U+d;l?B(e[U+r],e[C+r]):L(e[U+r],e[C+r]),v=F.a,e[C+r]=F.b,e[U+r]=v}}if(t&s)for(U=p,b=p+n*(a-f);U<=b;U+=S){m=U+A;l?B(e[U+r],e[m+r]):L(e[U+r],e[m+r]),v=F.a,e[m+r]=F.b,e[U+r]=v}f=s,s>>=1}return p}function V(e,r,a,n,l,u){var s=a.value,v=ne(r,a),c=ne(r,a);a.value+=4;var h=ne(r,a);if(a.value+=4,v<0||v>=i||c<0||c>=i)throw"Something wrong with HUF_ENCSIZE";var w=new Array(i),p=new Array(o);if(function(e){for(var r=0;r<o;r++)e[r]={},e[r].len=0,e[r].lit=0,e[r].p=null}(p),R(e,0,a,n-(a.value-s),v,c,w),h>8*(n-(a.value-s)))throw"Something wrong with hufUncompress";!function(e,r,a,n){for(;r<=a;r++){var i=P(e[r]),o=x(e[r]);if(i>>o)throw"Invalid table entry";if(o>t){if((s=n[i>>o-t]).len)throw"Invalid table entry";if(s.lit++,s.p){var f=s.p;s.p=new Array(s.lit);for(var l=0;l<s.lit-1;++l)s.p[l]=f[l]}else s.p=new Array(1);s.p[s.lit-1]=r}else if(o){var u=0;for(l=1<<t-o;l>0;l--){var s;if((s=n[(i<<t-o)+u]).len||s.p)throw"Invalid table entry";s.len=o,s.lit=r,u++}}}}(w,v,c,p),function(e,r,a,n,i,o,l,u,s,v){for(var c=0,h=0,w=u,p=Math.trunc(i.value+(o+7)/8);i.value<p;)for(N(c,h,a,i),c=z.c,h=z.lc;h>=t;)if((A=r[c>>h-t&f]).len)h-=A.len,k(A.lit,l,c,h,a,0,i,s,v,w),c=T.c,h=T.lc;else{if(!A.p)throw"hufDecode issues";var y;for(y=0;y<A.lit;y++){for(var d=x(e[A.p[y]]);h<d&&i.value<p;)N(c,h,a,i),c=z.c,h=z.lc;if(h>=d&&P(e[A.p[y]])==(c>>h-d&(1<<d)-1)){h-=d,k(A.p[y],l,c,h,a,0,i,s,v,w),c=T.c,h=T.lc;break}}if(y==A.lit)throw"hufDecode issues"}var g=8-o&7;for(c>>=g,h-=g;h>0;){var A;if(!(A=r[c<<t-h&f]).len)throw"hufDecode issues";h-=A.len,k(A.lit,l,c,h,a,0,i,s,v,w),c=T.c,h=T.lc}}(w,p,e,0,a,h,c,u,l,{value:0})}function Z(e){for(var r=1;r<e.length;r++){var a=e[r-1]+e[r]-128;e[r]=a}}function H(e,r){for(var a=0,n=Math.floor((e.length+1)/2),t=0,i=e.length-1;!(t>i||(r[t++]=e[a++],t>i));)r[t++]=e[n++]}function W(e){for(var r=e.byteLength,a=new Array,n=0,t=new DataView(e);r>0;){var i=t.getInt8(n++);if(i<0){r-=(f=-i)+1;for(var o=0;o<f;o++)a.push(t.getUint8(n++))}else{var f=i;r-=2;var l=t.getUint8(n++);for(o=0;o<f+1;o++)a.push(l)}}return a}function G(e,r,a){for(var n,t=1;t<64;)65280==(n=r[e.value])?t=64:n>>8==255?t+=255&n:(a[t]=n,t++),e.value++}function Y(e,r){r[0]=le(e[0]),r[1]=le(e[1]),r[2]=le(e[5]),r[3]=le(e[6]),r[4]=le(e[14]),r[5]=le(e[15]),r[6]=le(e[27]),r[7]=le(e[28]),r[8]=le(e[2]),r[9]=le(e[4]),r[10]=le(e[7]),r[11]=le(e[13]),r[12]=le(e[16]),r[13]=le(e[26]),r[14]=le(e[29]),r[15]=le(e[42]),r[16]=le(e[3]),r[17]=le(e[8]),r[18]=le(e[12]),r[19]=le(e[17]),r[20]=le(e[25]),r[21]=le(e[30]),r[22]=le(e[41]),r[23]=le(e[43]),r[24]=le(e[9]),r[25]=le(e[11]),r[26]=le(e[18]),r[27]=le(e[24]),r[28]=le(e[31]),r[29]=le(e[40]),r[30]=le(e[44]),r[31]=le(e[53]),r[32]=le(e[10]),r[33]=le(e[19]),r[34]=le(e[23]),r[35]=le(e[32]),r[36]=le(e[39]),r[37]=le(e[45]),r[38]=le(e[52]),r[39]=le(e[54]),r[40]=le(e[20]),r[41]=le(e[22]),r[42]=le(e[33]),r[43]=le(e[38]),r[44]=le(e[46]),r[45]=le(e[51]),r[46]=le(e[55]),r[47]=le(e[60]),r[48]=le(e[21]),r[49]=le(e[34]),r[50]=le(e[37]),r[51]=le(e[47]),r[52]=le(e[50]),r[53]=le(e[56]),r[54]=le(e[59]),r[55]=le(e[61]),r[56]=le(e[35]),r[57]=le(e[36]),r[58]=le(e[48]),r[59]=le(e[49]),r[60]=le(e[57]),r[61]=le(e[58]),r[62]=le(e[62]),r[63]=le(e[63])}function j(e){for(var r=.5*Math.cos(.7853975),a=.5*Math.cos(.196349375),n=.5*Math.cos(.39269875),t=.5*Math.cos(3*3.14159/16),i=.5*Math.cos(.981746875),o=.5*Math.cos(3*3.14159/8),f=.5*Math.cos(1.374445625),l=new Array(4),u=new Array(4),s=new Array(4),v=new Array(4),c=0;c<8;++c){var h=8*c;l[0]=n*e[h+2],l[1]=o*e[h+2],l[2]=n*e[h+6],l[3]=o*e[h+6],u[0]=a*e[h+1]+t*e[h+3]+i*e[h+5]+f*e[h+7],u[1]=t*e[h+1]-f*e[h+3]-a*e[h+5]-i*e[h+7],u[2]=i*e[h+1]-a*e[h+3]+f*e[h+5]+t*e[h+7],u[3]=f*e[h+1]-i*e[h+3]+t*e[h+5]-a*e[h+7],s[0]=r*(e[h+0]+e[h+4]),s[3]=r*(e[h+0]-e[h+4]),s[1]=l[0]+l[3],s[2]=l[1]-l[2],v[0]=s[0]+s[1],v[1]=s[3]+s[2],v[2]=s[3]-s[2],v[3]=s[0]-s[1],e[h+0]=v[0]+u[0],e[h+1]=v[1]+u[1],e[h+2]=v[2]+u[2],e[h+3]=v[3]+u[3],e[h+4]=v[3]-u[3],e[h+5]=v[2]-u[2],e[h+6]=v[1]-u[1],e[h+7]=v[0]-u[0]}for(var w=0;w<8;++w)l[0]=n*e[16+w],l[1]=o*e[16+w],l[2]=n*e[48+w],l[3]=o*e[48+w],u[0]=a*e[8+w]+t*e[24+w]+i*e[40+w]+f*e[56+w],u[1]=t*e[8+w]-f*e[24+w]-a*e[40+w]-i*e[56+w],u[2]=i*e[8+w]-a*e[24+w]+f*e[40+w]+t*e[56+w],u[3]=f*e[8+w]-i*e[24+w]+t*e[40+w]-a*e[56+w],s[0]=r*(e[w]+e[32+w]),s[3]=r*(e[w]-e[32+w]),s[1]=l[0]+l[3],s[2]=l[1]-l[2],v[0]=s[0]+s[1],v[1]=s[3]+s[2],v[2]=s[3]-s[2],v[3]=s[0]-s[1],e[0+w]=v[0]+u[0],e[8+w]=v[1]+u[1],e[16+w]=v[2]+u[2],e[24+w]=v[3]+u[3],e[32+w]=v[3]-u[3],e[40+w]=v[2]-u[2],e[48+w]=v[1]-u[1],e[56+w]=v[0]-u[0]}function q(e){for(var r=0;r<64;++r){var a=e[0][r],n=e[1][r],t=e[2][r];e[0][r]=a+1.5747*t,e[1][r]=a-.1873*n-.4682*t,e[2][r]=a+1.8556*n}}function J(e,r,a){for(var n=0;n<64;++n)r[a+n]=ue(K(e[n]))}function K(e){return e<=1?Math.sign(e)*Math.pow(Math.abs(e),2.2):Math.sign(e)*Math.pow(m,Math.abs(e)-1)}function Q(e){var r=e.array.slice(e.offset.value,e.offset.value+e.size),a=new Uint8Array(pako.inflate(r).buffer),n=new Uint8Array(a.length);return Z(a),H(a,n),new DataView(n.buffer)}function $(e){var r=e.viewer,a={value:e.offset.value},n=new Uint8Array(e.width*e.lines*(we.channels.length*e.type*y)),t={version:oe(r,a),unknownUncompressedSize:oe(r,a),unknownCompressedSize:oe(r,a),acCompressedSize:oe(r,a),dcCompressedSize:oe(r,a),rleCompressedSize:oe(r,a),rleUncompressedSize:oe(r,a),rleRawSize:oe(r,a),totalAcUncompressedCount:oe(r,a),totalDcUncompressedCount:oe(r,a),acCompression:oe(r,a)};if(t.version<2)throw"EXRLoader.parse: "+we.compression+" version "+t.version+" is unsupported";for(var i=new Array,o=se(r,a)-y;o>0;){var f=ee(r.buffer,a),l=ie(r,a),u=l>>2&3,s=new Int8Array([(l>>4)-1])[0],v=ie(r,a);i.push({name:f,index:s,type:v,compression:u}),o-=f.length+3}for(var c=we.channels,h=new Array(e.channels),w=0;w<e.channels;++w){var p=h[w]={},d=c[w];p.name=d.name,p.compression=S,p.decoded=!1,p.type=d.pixelType,p.pLinear=d.pLinear,p.width=e.width,p.height=e.lines}for(var m={idx:new Array(3)},M=0;M<e.channels;++M)for(p=h[M],w=0;w<i.length;++w){var C=i[w];p.name==C.name&&(p.compression=C.compression,C.index>=0&&(m.idx[C.index]=M),p.offset=M)}if(t.acCompressedSize>0)switch(t.acCompression){case g:var O=new Uint16Array(t.totalAcUncompressedCount);V(e.array,r,a,t.acCompressedSize,O,t.totalAcUncompressedCount);break;case A:var I=e.array.slice(a.value,a.value+t.totalAcUncompressedCount);O=new Uint16Array(pako.inflate(I).buffer);a.value+=t.totalAcUncompressedCount}if(t.dcCompressedSize>0){var E={array:e.array,offset:a,size:t.dcCompressedSize},R=new Uint16Array(Q(E).buffer);a.value+=t.dcCompressedSize}if(t.rleRawSize>0){I=e.array.slice(a.value,a.value+t.rleCompressedSize);var x=W(pako.inflate(I).buffer);a.value+=t.rleCompressedSize}var P=0,z=new Array(h.length);for(w=0;w<z.length;++w)z[w]=new Array;for(var N=0;N<e.lines;++N)for(var T=0;T<h.length;++T)z[T].push(P),P+=h[T].width*e.type*y;!function(e,r,a,n,t,i){for(var o=new DataView(i.buffer),f=a[e.idx[0]].width,l=a[e.idx[0]].height,u=Math.floor(f/8),s=Math.ceil(f/8),v=Math.ceil(l/8),c=f-8*(s-1),h=l-8*(v-1),w={value:0},p=new Array(3),d=new Array(3),g=new Array(3),A=new Array(3),S=new Array(3),U=0;U<3;++U)S[U]=r[e.idx[U]],p[U]=U<1?0:p[U-1]+s*v,d[U]=new Float32Array(64),g[U]=new Uint16Array(64),A[U]=new Uint16Array(64*s);for(var b=0;b<v;++b){var m=8;b==v-1&&(m=h);for(var M=8,C=0;C<s;++C){for(C==s-1&&(M=c),U=0;U<3;++U)g[U].fill(0),g[U][0]=t[p[U]++],G(w,n,g[U]),Y(g[U],d[U]),j(d[U]);for(q(d),U=0;U<3;++U)J(d[U],A[U],64*C)}var O=0;for(U=0;U<3;++U){for(var I=a[e.idx[U]].type,E=8*b;E<8*b+m;++E)for(O=S[U][E],C=0;C<u;++C){var R=64*C+8*(7&E);o.setUint16(O+0*y*I,A[U][R+0],!0),o.setUint16(O+1*y*I,A[U][R+1],!0),o.setUint16(O+2*y*I,A[U][R+2],!0),o.setUint16(O+3*y*I,A[U][R+3],!0),o.setUint16(O+4*y*I,A[U][R+4],!0),o.setUint16(O+5*y*I,A[U][R+5],!0),o.setUint16(O+6*y*I,A[U][R+6],!0),o.setUint16(O+7*y*I,A[U][R+7],!0),O+=8*y*I}if(u!=s)for(E=8*b;E<8*b+m;++E){O=S[U][E]+8*u*y*I,R=64*u+8*(7&E);for(var x=0;x<M;++x)o.setUint16(O+x*y*I,A[U][R+x],!0)}}}var P=new Uint16Array(f);for(o=new DataView(i.buffer),U=0;U<3;++U)if(a[e.idx[U]].decoded=!0,I=a[e.idx[U]].type,2==a[U].type)for(E=0;E<l;++E){for(O=S[U][E],x=0;x<f;++x)P[x]=o.getUint16(O+x*y*I,!0);for(x=0;x<f;++x)o.setFloat32(O+x*y*I,le(P[x]),!0)}}(m,z,h,O,R,n);for(w=0;w<h.length;++w){if(!(p=h[w]).decoded)switch(p.compression){case b:var k=0,_=0;for(N=0;N<e.lines;++N){for(var D=z[w][k],F=0;F<p.width;++F){for(var B=0;B<y*p.type;++B)n[D++]=x[_+B*p.width*p.height];_++}k++}break;case U:default:throw"EXRLoader.parse: unsupported channel compression"}}return new DataView(n.buffer)}function ee(e,r){for(var a=new Uint8Array(e),n=0;0!=a[r.value+n];)n+=1;var t=(new TextDecoder).decode(a.slice(r.value,r.value+n));return r.value=r.value+n+1,t}function re(e,r){var a=e.getUint32(0,!0);return r.value=r.value+h,a}function ae(e,r){var a=e.getInt32(r.value,!0);return r.value=r.value+p,a}function ne(e,r){var a=e.getUint32(r.value,!0);return r.value=r.value+p,a}function te(e,r){var a=e[r.value];return r.value=r.value+d,a}function ie(e,r){var a=e.getUint8(r.value);return r.value=r.value+d,a}function oe(e,r){var a=Number(e.getBigInt64(r.value,!0));return r.value+=h,a}function fe(e,r){var a=e.getFloat32(r.value,!0);return r.value+=w,a}function le(e){var r=(31744&e)>>10,a=1023&e;return(e>>15?-1:1)*(r?31===r?a?NaN:1/0:Math.pow(2,r-15)*(1+a/1024):a/1024*6103515625e-14)}function ue(e){M.setFloat32(0,e);var r=M.getInt32(0),a=r>>16&32768,n=r>>12&2047,t=r>>23&255;return t<103?a:t>142?(a|=31744,a|=(255==t?0:1)&&8388607&r):t<113?a|=((n|=2048)>>114-t)+(n>>113-t&1):(a|=t-112<<10|n>>1,a+=1&n)}function se(e,r){var a=e.getUint16(r.value,!0);return r.value+=y,a}function ve(e,r,a,n,t){return"string"===n||"stringvector"===n||"iccProfile"===n?function(e,r,a){var n=(new TextDecoder).decode(new Uint8Array(e).slice(r.value,r.value+a));return r.value=r.value+a,n}(r,a,t):"chlist"===n?function(e,r,a,n){for(var t=a.value,i=[];a.value<t+n-1;){var o=ee(r,a),f=ae(e,a),l=ie(e,a);a.value+=3;var u=ae(e,a),s=ae(e,a);i.push({name:o,pixelType:f,pLinear:l,xSampling:u,ySampling:s})}return a.value+=1,i}(e,r,a,t):"chromaticities"===n?function(e,r){return{redX:fe(e,r),redY:fe(e,r),greenX:fe(e,r),greenY:fe(e,r),blueX:fe(e,r),blueY:fe(e,r),whiteX:fe(e,r),whiteY:fe(e,r)}}(e,a):"compression"===n?function(e,r){return["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"][ie(e,r)]}(e,a):"box2i"===n?function(e,r){return{xMin:ne(e,r),yMin:ne(e,r),xMax:ne(e,r),yMax:ne(e,r)}}(e,a):"lineOrder"===n?function(e,r){return["INCREASING_Y"][ie(e,r)]}(e,a):"float"===n?fe(e,a):"v2f"===n?function(e,r){return[fe(e,r),fe(e,r)]}(e,a):"v3f"===n?function(e,r){return[fe(e,r),fe(e,r),fe(e,r)]}(e,a):"int"===n?ae(e,a):"rational"===n?function(e,r){return[ae(e,r),ne(e,r)]}(e,a):"timecode"===n?function(e,r){return[ne(e,r),ne(e,r)]}(e,a):(a.value+=t,void console.log("Cannot parse value for unsupported type: "+n))}var ce=new DataView(e),he=new Uint8Array(e),we={};ce.getUint32(0,!0),ce.getUint8(4,!0),ce.getUint8(5,!0);for(var pe={value:8},ye=!0;ye;){var de=ee(e,pe);if(0==de)ye=!1;else{var ge=ve(ce,e,pe,ee(e,pe),ne(ce,pe));we[de]=ge}}var Ae,Se,Ue,be,me=we.dataWindow.yMax+1;switch(we.compression){case"NO_COMPRESSION":Se=1,Ae=function(e){return new DataView(e.array.buffer,e.offset.value,e.size)};break;case"RLE_COMPRESSION":Se=1,Ae=function(e){var r=e.viewer.buffer.slice(e.offset.value,e.offset.value+e.size),a=new Uint8Array(W(r)),n=new Uint8Array(a.length);return Z(a),H(a,n),new DataView(n.buffer)};break;case"ZIPS_COMPRESSION":Se=1,Ae=Q;break;case"ZIP_COMPRESSION":Se=16,Ae=Q;break;case"PXR24_COMPRESSION":Se=16,Ae=function(e){for(var r=e.array.slice(e.offset.value,e.offset.value+e.size),a=new Uint8Array(pako.inflate(r).buffer),n=new Uint8Array(a.length),t=n,i=Ee,o=0;o<t.length;o+=2*i){for(var f=0;f<i;f++)t[o+2*f]=a[o+f+i],t[o+2*f+1]=a[o+f];var l=new Uint16Array(t.buffer,o,i);for(f=1;f<i;f++)l[f]=l[f-1]+l[f]&65535}return new DataView(n.buffer)};break;case"PIZ_COMPRESSION":Se=32,Ae=function(e){for(var r=e.viewer,t={value:e.offset.value},i=e.width*Se*(we.channels.length*e.type),o=new Uint16Array(i),f=new Uint8Array(n),l=0,u=new Array(e.channels),s=0;s<e.channels;s++)u[s]={},u[s].start=l,u[s].end=u[s].start,u[s].nx=e.width,u[s].ny=e.lines,u[s].size=e.type,l+=u[s].nx*u[s].ny*u[s].size;var v=se(r,t),c=se(r,t);if(c>=n)throw"Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";if(v<=c)for(s=0;s<c-v+1;s++)f[s+v]=ie(r,t);var h=new Uint16Array(a),w=function(e,r){for(var n=0,t=0;t<a;++t)(0==t||e[t>>3]&1<<(7&t))&&(r[n++]=t);for(var i=n-1;n<a;)r[n++]=0;return i}(f,h),p=ne(r,t);for(V(e.array,r,t,p,o,l),s=0;s<e.channels;++s)for(var d=u[s],g=0;g<u[s].size;++g)X(o,d.start+g,d.nx,d.size,d.ny,d.nx*d.size,w);!function(e,r,a){for(var n=0;n<a;++n)r[n]=e[r[n]]}(h,o,l);for(var A=0,S=new Uint8Array(o.buffer.byteLength),U=0;U<e.lines;U++)for(var b=0;b<e.channels;b++){var m=(d=u[b]).nx*d.size,M=new Uint8Array(o.buffer,d.end*y,m*y);S.set(M,A),A+=m*y,d.end+=m}return new DataView(S.buffer)};break;case"DWAA_COMPRESSION":Se=32,Ae=$;break;case"DWAB_COMPRESSION":Se=256,Ae=$;break;default:throw"EXRLoader.parse: "+we.compression+" is unsupported"}var Me=we.channels[0].pixelType;if(1===Me)switch(this.type){case r.UnsignedByteType:case r.FloatType:be=function(e,r){return le(se(e,r))},Ue=y;break;case r.HalfFloatType:be=se,Ue=y}else{if(2!==Me)throw"EXRLoader.parse: unsupported pixelType "+Me+" for "+we.compression+".";switch(this.type){case r.UnsignedByteType:case r.FloatType:be=fe,Ue=w;break;case r.HalfFloatType:be=function(e,r){return ue(fe(e,r))},Ue=w}}for(var Ce=me/Se,Oe=0;Oe<Ce;Oe++)re(ce,pe);var Ie=we.dataWindow,Ee=Ie.xMax-Ie.xMin+1,Re=Ie.yMax-Ie.yMin+1,xe=Ee*Re*4;switch(this.type){case r.UnsignedByteType:case r.FloatType:var Pe=new Float32Array(xe);we.channels.length<4&&Pe.fill(1,0,xe);break;case r.HalfFloatType:Pe=new Uint16Array(xe);we.channels.length<4&&Pe.fill(15360,0,xe);break;default:console.error("THREE.EXRLoader: unsupported type: ",this.type)}for(var ze,Ne,Te={R:0,G:1,B:2,A:3},ke={size:0,width:Ee,lines:Se,offset:pe,array:he,viewer:ce,type:Me,channels:we.channels.length},_e={value:0},De=0;De<Re/Se;De++){ze=ne(ce,pe),xe=ne(ce,pe),ke.lines=ze+Se>Re?Re-ze:Se,ke.offset=pe,ke.size=xe,Ne=Ae(ke),pe.value+=xe;for(var Fe=0;Fe<Se;Fe++){var Be=Fe+De*Se;if(Be>=Re)break;for(var Le=0;Le<we.channels.length;Le++)for(var Xe=Te[we.channels[Le].name],Ve=0;Ve<Ee;Ve++){var Ze=Fe*(we.channels.length*Ee)+Le*Ee+Ve;_e.value=Ze*Ue;var He=be(Ne,_e);Pe[4*Ee*(Re-1-Be)+4*Ve+Xe]=He}}}if(this.type===r.UnsignedByteType){xe=Pe.length;for(var We,Ge=new Uint8Array(xe),Ye=0;Ye<Re;++Ye)for(var je=0;je<Ee;++je){var qe=Pe[Oe=Ye*Ee*4+4*je],Je=Pe[Oe+1],Ke=Pe[Oe+2];if((We=Ke>(We=qe>Je?qe:Je)?Ke:We)<1e-32)Ge[Oe]=Ge[Oe+1]=Ge[Oe+2]=Ge[Oe+3]=0;else{var Qe=C(We);We=256*Qe[0]/We,Ge[Oe]=qe*We,Ge[Oe+1]=Je*We,Ge[Oe+2]=Ke*We,Ge[Oe+3]=Qe[1]+128}}Pe=Ge}var $e=this.type===r.UnsignedByteType?r.RGBEFormat:r.RGBAFormat;return{header:we,width:Ee,height:Re,data:Pe,format:$e,type:this.type}}};