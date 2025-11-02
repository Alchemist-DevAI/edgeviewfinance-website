let n=1;const c=5,o={q1:null,q2:null,q3:null,q4:[],q5:null},v=document.getElementById("back-btn"),i=document.getElementById("next-btn"),l=document.getElementById("submit-btn"),w=document.getElementById("question-container"),k=document.getElementById("results-container"),b=document.getElementById("progress-container");function q(){S(),f()}function S(){document.querySelectorAll('input[type="radio"]').forEach(e=>{e.addEventListener("change",L)}),document.querySelectorAll('input[type="checkbox"]').forEach(e=>{e.addEventListener("change",N)}),v?.addEventListener("click",E),i?.addEventListener("click",B),l?.addEventListener("click",$)}function L(e){const t=`q${n}`;o[t]=e.target.value,n===c?l.disabled=!1:i.disabled=!1}function N(e){const t=`q${n}`;e.target.checked?o[t].includes(e.target.value)||o[t].push(e.target.value):o[t]=o[t].filter(s=>s!==e.target.value),i.disabled=o[t].length===0}function E(){n>1&&(document.getElementById(`q${n}`).classList.add("hidden"),n--,document.getElementById(`q${n}`).classList.remove("hidden"),f(),x(),window.scrollTo({top:0,behavior:"smooth"}))}function B(){if(n<c){document.getElementById(`q${n}`).classList.add("hidden"),n++,document.getElementById(`q${n}`).classList.remove("hidden"),f(),x();const e=`q${n}`;n===4?i.disabled=o[e].length===0:i.disabled=!o[e],window.scrollTo({top:0,behavior:"smooth"})}}function x(){if(v.classList.toggle("hidden",n===1),n===c){i.classList.add("hidden"),l.classList.remove("hidden");const e=`q${n}`;l.disabled=!o[e]||o[e]===""}else i.classList.remove("hidden"),l.classList.add("hidden")}function f(){const e=b.querySelector(".bg-orange-500");if(e){const s=n/c*100;e.style.width=`${s}%`}const t=b.querySelector("[data-step-text]");t&&(t.textContent=`Question ${n} of ${c}`)}function C(){let e=0;e+={"fully-current":10,"mostly-current":7,"basic-compliance":4,behind:1}[o.q1]||0,e+={"10m-plus":10,"3m-10m":7,"1m-3m":4,"under-1m":2}[o.q2]||0,e+={"complete-visibility":10,"good-understanding":7,"basic-knowledge":4,"limited-visibility":1}[o.q3]||0;const r=Math.min(10,o.q4.length/9*10);return e+=r,e+={"currently-active":10,"recent-experience":7,"some-time-ago":4,"never-long-ago":1}[o.q5]||0,Math.round(e)}function R(e){return e>=45?{level:"Elite",color:"green"}:e>=35?{level:"Professional",color:"blue"}:e>=25?{level:"Nearly Ready",color:"amber"}:e>=15?{level:"Foundation",color:"orange"}:{level:"Support Needed",color:"red"}}async function $(){if(l.disabled)return;const e=C(),{level:t,color:s}=R(e);sessionStorage.setItem("assessmentScore",e),sessionStorage.setItem("assessmentLevel",t),sessionStorage.setItem("assessmentAnswers",JSON.stringify(o)),w.classList.add("hidden"),b.classList.add("hidden"),k.classList.remove("hidden"),I(e,t,s),window.scrollTo({top:0,behavior:"smooth"})}function I(e,t,s){const a=document.getElementById("score-display"),r={green:"text-green-600",blue:"text-blue-600",amber:"text-amber-600",orange:"text-orange-600",red:"text-red-600"},u={green:"border-green-500",blue:"border-blue-500",amber:"border-amber-500",orange:"border-orange-500",red:"border-red-500"};a.innerHTML=`
      <div class="text-center py-4">
        <div class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ${r[s]} mb-2">${e}/50</div>
        <div class="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">${t}</div>
      </div>
    `;const p=document.getElementById("result-card"),m=F(t);p.innerHTML=`
      <div class="bg-gray-50 p-6 border-l-4 ${u[s]}">
        <h3 class="text-xl font-bold mb-4">${m.headline}</h3>
        <p class="mb-4 text-gray-700">${m.description}</p>
      </div>
    `;const d=document.getElementById("lead-capture");d.innerHTML=`
      <div class="bg-white shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">
        <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-center mb-4">Get Your Free Finance Ready Package - valued at $1,035</h3>
        <p class="text-center text-gray-600 mb-6">Congratulations on completing your Finance Ready Assessment! Now unlock your exclusive Finance Ready Package with everything you need to secure funding.</p>
        
        <!-- Value Stack -->
        <div class="bg-gray-50 p-4 sm:p-6 mb-6 border border-gray-200">
          <h4 class="font-semibold text-lg mb-4 text-center">Your Complete Finance Ready Package Includes:</h4>
          <div class="space-y-3">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>
                <span class="font-medium">Personalised Finance Ready Report</span>
                <span class="text-gray-600"> - Your custom roadmap to funding (Value: $497)</span>
              </div>
            </div>
            <div class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>
                <span class="font-medium">Finance Ready Lending Playbook</span>
                <span class="text-gray-600"> - 47-page insider guide to securing business finance (Value: $197)</span>
              </div>
            </div>
            <div class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>
                <span class="font-medium">Business Finance Calculator Suite</span>
                <span class="text-gray-600"> - Calculate borrowing power & repayments (Value: $97)</span>
              </div>
            </div>
            <div class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>
                <span class="font-medium">7-Day Email Course</span>
                <span class="text-gray-600"> - Master the funding process step-by-step (Value: $147)</span>
              </div>
            </div>
            <div class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>
                <span class="font-medium">Document Preparation Checklist</span>
                <span class="text-gray-600"> - Never miss a requirement (Value: $97)</span>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-300 text-center">
            <div class="text-sm text-gray-600">Total Package Value: <span class="line-through">$1,035</span></div>
            <div class="text-lg font-bold text-green-600">Your Price Today: FREE</div>
          </div>
        </div>
        
        <p class="text-center text-gray-600 mb-6">Enter your details below to receive instant access to your complete Finance Ready Package.</p>
        
        <form id="lead-form" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input type="text" id="firstName" name="firstName" required 
                class="w-full px-4 py-2 border border-gray-300 focus:border-orange-500 focus:outline-none">
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input type="text" id="lastName" name="lastName" required 
                class="w-full px-4 py-2 border border-gray-300 focus:border-orange-500 focus:outline-none">
            </div>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input type="email" id="email" name="email" required 
              class="w-full px-4 py-2 border border-gray-300 focus:border-orange-500 focus:outline-none">
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="tel" id="phone" name="phone" 
              class="w-full px-4 py-2 border border-gray-300 focus:border-orange-500 focus:outline-none">
          </div>
          
          <div>
            <label for="businessName" class="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input type="text" id="businessName" name="businessName" 
              class="w-full px-4 py-2 border border-gray-300 focus:border-orange-500 focus:outline-none">
          </div>
          
          <div class="pt-4">
            <button type="submit" 
              class="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-lg hover:shadow-lg transition-all">
              Get My Free Report & Resources
            </button>
          </div>
          
          <p class="text-xs text-gray-500 text-center">
            We respect your privacy. Your information will only be used to send your assessment results and follow-up resources.
          </p>
        </form>
        
        <div id="form-message" class="mt-4 hidden"></div>
      </div>
    `,document.getElementById("lead-form").addEventListener("submit",P)}function F(e){const t={Elite:{headline:"Outstanding! You're in the Top 10%",description:"Your business demonstrates exceptional financial management and documentation standards. You're perfectly positioned to strategically plan your finance requirements for the next 12 months."},Professional:{headline:"Excellent! You're Well-Prepared",description:"You have strong fundamentals with some areas that could be enhanced to join the elite 10%. Your business shows good financial management and reasonable documentation systems."},"Nearly Ready":{headline:"Good Foundation with Strategic Gaps",description:"You have solid fundamentals but several gaps that could trigger information requests during applications. The good news is these gaps are strategic and addressable with the right guidance."},Foundation:{headline:"Foundation Building Required",description:"Your business would benefit from systematic preparation before engaging with mainstream lenders. This isn't uncommon - many successful businesses start here."},"Support Needed":{headline:"Strategic Support Recommended",description:"Your assessment indicates several areas need attention. With the right support and systematic preparation, you can build a strong foundation for future finance applications."}};return t[e]||t.Foundation}async function P(e){e.preventDefault();const t=e.target,s=t.querySelector('button[type="submit"]'),a=document.getElementById("form-message");s.disabled=!0,s.textContent="Submitting...";const r=new FormData(t),u=parseInt(sessionStorage.getItem("assessmentScore")),p=sessionStorage.getItem("assessmentLevel"),m=JSON.parse(sessionStorage.getItem("assessmentAnswers")),d=new URLSearchParams(window.location.search),y={firstName:r.get("firstName"),lastName:r.get("lastName"),email:r.get("email"),phone:r.get("phone"),businessName:r.get("businessName"),totalScore:u,readinessLevel:p,answers:m,utmSource:d.get("utm_source"),utmMedium:d.get("utm_medium"),utmCampaign:d.get("utm_campaign"),referrerUrl:document.referrer};try{const g=await fetch("/api/assessment-submit.json",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(y)}),h=await g.json();g.ok&&h.success?(a.className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700",a.innerHTML=`
          <div class="font-semibold mb-2">Success! Your Finance Ready Package is on its way.</div>
          <div class="text-sm">
            <p class="mb-2">We've received your assessment results and will send your personalised report to ${y.email} shortly.</p>
            <p>You can also <a href="/finance-ready-assessment/thank-you" class="underline font-semibold">view your results now</a>.</p>
          </div>
        `,a.classList.remove("hidden"),s.textContent="✓ Successfully Submitted",s.classList.add("bg-green-600"),setTimeout(()=>{window.location.href="/finance-ready-assessment/thank-you"},3e3)):(a.className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700",a.textContent=h.error||"Something went wrong. Please try again.",a.classList.remove("hidden"),s.disabled=!1,s.textContent="Get My Free Report & Resources")}catch(g){a.className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700",a.textContent="Network error. Please check your connection and try again.",a.classList.remove("hidden"),s.disabled=!1,s.textContent="Get My Free Report & Resources",console.error("Submission error:",g)}}q();
