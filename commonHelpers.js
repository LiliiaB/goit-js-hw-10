import"./assets/modulepreload-polyfill-3cfb730f.js";import{f,i as h}from"./assets/vendor-77e16229.js";const e=document.querySelector("button"),s=document.querySelector(".timer"),g=s.querySelector(".value[data-days]"),v=s.querySelector(".value[data-hours]"),w=s.querySelector(".value[data-minutes]"),b=s.querySelector(".value[data-seconds]");let n,u;e.addEventListener("click",()=>{n=new Date(q.selectedDates[0]);const t=()=>{const o=n-new Date;o<=0?(clearInterval(u),i(0),d()):i(o)};t(),u=setInterval(t,1e3)});function i(t){const{days:r,hours:o,minutes:c,seconds:l}=a(t);g.textContent=r,v.textContent=o,w.textContent=c,b.textContent=l}const k={enableTime:!0,time_24hr:!0,dateFormat:"Y-m-d H:i",defaultDate:new Date,minuteIncrement:1,onClose(t){n=t[0],d(),console.log(t[0])}};function d(){n<new Date?(h.error({position:"topRight",message:"Please choose a date in the future"}),e.disabled=!0,e.style.color="#989898",e.style.background="#cfcfcf",e.style.pointerEvents="none"):(e.disabled=!1,e.style.color="",e.style.background="",e.style.pointerEvents="")}const q=f("#datetime-picker",k);function a(t){const m=Math.floor(t/864e5).toString().padStart(2,"0"),y=Math.floor(t%864e5/36e5).toString().padStart(2,"0"),S=Math.floor(t%864e5%36e5/6e4).toString().padStart(2,"0"),p=Math.floor(t%864e5%36e5%6e4/1e3).toString().padStart(2,"0");return{days:m,hours:y,minutes:S,seconds:p}}console.log(a(2e3));console.log(a(14e4));console.log(a(2414e4));
//# sourceMappingURL=commonHelpers.js.map
