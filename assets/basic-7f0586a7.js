import{A as b,a as r,b as e,c as o,d as I,S as N,e as B,N as t}from"./states.constants-07036398.js";function O(){const S=document.getElementById("loading-container"),f=document.getElementById("view"),n=document.getElementById("arrow-back"),c=document.getElementById("btn-green"),u=document.getElementById("btn-purple"),m=document.getElementById("btn-blue"),A=document.getElementById("popup"),v=new rive.Rive({src:"/rive-animation-base-project/animations/loading.riv",canvas:document.getElementById("loading"),autoplay:!0,layout:new rive.Layout({fit:"cover"}),onLoad:()=>{v.play(),v.resizeDrawingSurfaceToCanvas(),setTimeout(()=>{f.classList.remove("opacity-0"),S.className="disabled",v.pause()},1800)}}),L=new rive.Rive({src:"/rive-animation-base-project/animations/arrow-back.riv",canvas:n,autoplay:!0,stateMachines:b.MORPH,layout:new rive.Layout({fit:rive.Fit.Fill}),onLoad:()=>{L.resizeDrawingSurfaceToCanvas();const s=L.stateMachineInputs(b.MORPH),E=s.find(g=>g.name===r.TOARROW),R=s.find(g=>g.name===r.TOMENU);n.onmouseenter=()=>E.fire(),n.onmouseleave=()=>R.fire()},onStateChange:s=>{s.data[0].includes(r.ASARROW)?(n.classList.remove("idle"),n.classList.add("active"),n.classList.value=="active"&&n.addEventListener("click",function(E){E.preventDefault(),window.location.assign(location.origin+"/rive-animation-base-project/")})):s.data[0].includes(r.TOMENU)&&(n.classList.remove("active"),n.classList.add("idle"))}}),a=new rive.Rive({src:"/rive-animation-base-project/animations/ball_0.riv",canvas:document.getElementById("ball-0-green"),autoplay:!0,animations:e.SQUASH,layout:new rive.Layout({fit:"cover",alignment:"center"}),onLoad:()=>{c.onclick=()=>{a.playingAnimationNames.includes(e.SQUASH)?(a.stop(e.SQUASH),a.play(e.FINAL)):a.playingAnimationNames.includes(e.FINAL)?(a.stop(e.FINAL),a.play(e.EASEINOUT)):a.playingAnimationNames.includes(e.EASEINOUT)?(a.stop(e.EASEINOUT),a.play(e.LINEAR)):(a.stop(e.LINEAR),a.play(e.SQUASH))}}}),i=new rive.Rive({src:"/rive-animation-base-project/animations/ball_1.riv",canvas:document.getElementById("ball-1-purple"),autoplay:!0,layout:new rive.Layout({fit:"cover",alignment:"center"}),onLoad:()=>{u.onclick=()=>{i.playingAnimationNames.includes(o.SQUASH)?(i.stop(o.SQUASH),i.play(o.EASEINOUT)):i.playingAnimationNames.includes(o.EASEINOUT)?(i.stop(o.EASEINOUT),i.play(o.LINEAR)):(i.stop(o.LINEAR),i.play(o.SQUASH))}}}),l=new rive.Rive({src:"/rive-animation-base-project/animations/ball_2.riv",canvas:document.getElementById("ball-2-blue"),autoplay:!0,layout:new rive.Layout({fit:"cover",alignment:"center"}),onLoad:()=>{m.onclick=()=>{l.isPlaying?l.pause(I.SQUASH):l.play(I.SQUASH)}},onPlay:()=>{l.isActive=!0},onPause:()=>{l.isActive=!1}}),w=new rive.Rive({src:"/rive-animation-base-project/animations/stars.riv",canvas:document.getElementById("stars"),autoplay:!0,layout:new rive.Layout({fit:"cover"}),stateMachines:N.DEFAULT,onStateChange:s=>{s.data.includes(B.FIVESTARS)&&(A.className+=" show-popup-container",setTimeout(()=>{w.pause()},500),setTimeout(()=>{A.className+=" close-popup-container"},4e3))}}),p=new rive.Rive({src:"/rive-animation-base-project/animations/nut.riv",canvas:document.getElementById("nut-green"),autoplay:!0,layout:new rive.Layout({fit:"cover",alignment:"center"}),onLoad:()=>{c.onmouseenter=()=>{p.play(t.HOVER)},c.onmouseleave=()=>{p.pause(t.HOVER),p.play(t.IDLE)}}}),d=new rive.Rive({src:"/rive-animation-base-project/animations/nut.riv",canvas:document.getElementById("nut-purple"),autoplay:!0,layout:new rive.Layout({fit:"cover",alignment:"center"}),onLoad:()=>{u.onmouseenter=()=>{d.play(t.HOVER)},u.onmouseleave=()=>{d.pause(t.HOVER),d.play(t.IDLE)}}}),y=new rive.Rive({src:"/rive-animation-base-project/animations/nut.riv",canvas:document.getElementById("nut-blue"),autoplay:!0,layout:new rive.Layout({fit:"cover",alignment:"center"}),onLoad:()=>{m.onmouseenter=()=>{y.play(t.HOVER)},m.onmouseleave=()=>{y.pause(t.HOVER),y.play(t.IDLE)}}})}function T(){O()}document.addEventListener("DOMContentLoaded",function(S){T()});
