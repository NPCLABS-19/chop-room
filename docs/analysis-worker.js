'use strict';
// Local estimates only: no audio leaves the browser.
self.onmessage=({data:{samples,rate}})=>{
 const hop=256,energy=[];for(let i=0;i<samples.length-hop;i+=hop){let sum=0;for(let j=0;j<hop;j++)sum+=samples[i+j]**2;energy.push(Math.sqrt(sum/hop));}
 const onset=energy.map((v,i)=>Math.max(0,v-(energy[i-1]||v)));let best=0,bpm=null;
 if(samples.length/rate>=6){for(let tempo=60;tempo<=180;tempo++){const lag=Math.round(60*rate/(tempo*hop));let score=0;for(let i=Math.ceil(lag);i<onset.length;i++){const index=i-lag,a=Math.floor(index),f=index-a;score+=onset[i]*(onset[a]*(1-f)+(onset[a+1]||0)*f);}score*=1-.25*Math.abs(Math.log2(tempo/120));if(score>best){best=score;bpm=tempo;}}}
 const chroma=new Float64Array(12),N=4096,re=new Float64Array(N),im=new Float64Array(N);let spectral=0;
 for(let frame=0;frame<Math.min(120,Math.floor(samples.length/N));frame++){
  const offset=Math.floor(frame*Math.max(1,(samples.length-N)/Math.max(1,Math.min(120,Math.floor(samples.length/N))-1)));
  for(let i=0;i<N;i++){re[i]=samples[offset+i]*(.5-.5*Math.cos(2*Math.PI*i/(N-1)));im[i]=0;}
  for(let i=1,j=0;i<N;i++){let bit=N>>1;for(;j&bit;bit>>=1)j^=bit;j^=bit;if(i<j){[re[i],re[j]]=[re[j],re[i]];}}
  for(let len=2;len<=N;len<<=1){const angle=-2*Math.PI/len;for(let i=0;i<N;i+=len)for(let j=0;j<len/2;j++){const c=Math.cos(angle*j),s=Math.sin(angle*j),a=i+j,b=a+len/2,t=re[b]*c-im[b]*s,u=re[b]*s+im[b]*c;re[b]=re[a]-t;im[b]=im[a]-u;re[a]+=t;im[a]+=u;}}
  for(let bin=1;bin<N/2;bin++){const hz=bin*rate/N;if(hz<65||hz>2100)continue;const midi=69+12*Math.log2(hz/440),note=Math.round(midi);if(Math.abs(midi-note)>.3)continue;const weight=Math.hypot(re[bin],im[bin]);chroma[(note%12+12)%12]+=weight;spectral+=weight;}
 }
 const profiles=[[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88],[6.33,2.68,3.52,5.38,2.6,3.53,2.54,4.75,3.98,2.69,3.34,3.17]],names=['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];let key=null,top=-1;
 for(let root=0;root<12;root++)for(let mode=0;mode<2;mode++){const p=profiles[mode],mean=chroma.reduce((a,b)=>a+b,0)/12,pm=p.reduce((a,b)=>a+b,0)/12;let dot=0,xx=0,yy=0;for(let i=0;i<12;i++){const x=chroma[(i+root)%12]-mean,y=p[i]-pm;dot+=x*y;xx+=x*x;yy+=y*y;}const score=dot/Math.sqrt(xx*yy);if(score>top){top=score;key=names[root]+(mode?' minor':' major');}}
 self.postMessage({bpm:best>1e-7?(bpm<90?`${bpm} / ${bpm*2}`:bpm):null,key:spectral>1&&top>.45?key:null});
};
