throw new Error("Supabase configuration missing. Please set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY environment variables.");function m(e){let t=0;t+={A:10,B:7,C:4,D:0}[e.q1]||0,t+={A:10,B:7,C:4,D:0}[e.q2]||0,t+={A:10,B:7,C:4,D:0}[e.q3]||0;const o=parseInt(e.q4)||0;return o>=7?t+=10:o>=5?t+=7:o>=3?t+=4:t+=0,t+={A:10,B:7,C:4,D:0}[e.q5]||0,t}function g(e){return e>=45?"elite":e>=35?"professional":e>=25?"nearly-ready":e>=15?"foundation":"support"}function l(e){return{elite:"Finance Ready - Elite Level",professional:"Finance Ready - Professional Level","nearly-ready":"Nearly Ready - Strategic Gaps Identified",foundation:"Foundation Building Required",support:"Strategic Support Recommended"}[e]||"Assessment Complete"}function c(e){return{elite:"#22C55E",professional:"#3B82F6","nearly-ready":"#F59E0B",foundation:"#F97316",support:"#EF4444"}[e]||"#6B7280"}let s={currentQuestion:1,answers:{},score:0,level:"",completed:!1};const p={elite:{congratsMessage:"Outstanding! You're in the top 10% of trades businesses for finance readiness.",mainCopy:"Your business demonstrates exceptional financial management and documentation standards. You're perfectly positioned to strategically plan your finance requirements for the next 12 months, aligning funding decisions with your business strategy and forecasted cash flow position. With your level of preparation, we can map out optimal timing for equipment purchases, working capital injections, and growth investments - removing surprises and ensuring you access finance on your terms, not when you're desperate.",industryBenchmark:"You scored higher than most businesses at the assessment stage. This level of readiness typically results in streamlined approvals and better terms.",ctaText:"Book Elite Strategy Session",ctaSubtext:"Priority consultation slots for elite-ready businesses"},professional:{congratsMessage:"Excellent! You're well-prepared with minor optimisation opportunities available.",mainCopy:"You have strong fundamentals with some areas that could be enhanced to join the elite 10%. Your business shows good financial management and reasonable documentation systems. With focused optimisation, you could achieve even better terms and streamlined approvals.",industryBenchmark:"You're in the professional category where strategic optimisation delivers significant value.",ctaText:"Get My Optimisation Plan",ctaSubtext:"Join businesses that secure better terms faster"},"nearly-ready":{congratsMessage:"Good foundation! You're ahead of most businesses with some key gaps to address.",mainCopy:"You have solid fundamentals but several gaps that could trigger information requests during applications. These back-and-forth requests often cause frustration and can impact your negotiating position. The good news is these gaps are strategic and addressable with the right guidance.",industryBenchmark:"You're in the range where professional guidance delivers maximum value.",ctaText:"Get My Strategic Gap Analysis",ctaSubtext:"Don't let gaps delay your next opportunity"},foundation:{congratsMessage:"Several areas need attention before applying for traditional finance.",mainCopy:"Your business would benefit from systematic preparation before engaging with mainstream lenders. This isn't uncommon - many successful businesses start here. The key is building the right foundation systematically rather than applying prematurely and facing potential declines.",industryBenchmark:"With structured preparation, most businesses move to professional readiness within 3-6 months.",ctaText:"Get My Foundation Roadmap",ctaSubtext:"Most businesses achieve professional readiness in 3-6 months"},support:{congratsMessage:"Let us help you build a strong finance foundation.",mainCopy:"Your business would benefit significantly from strategic finance preparation. Currently, you're in a reactive position which limits options if finance is needed urgently. This often leads to accepting alternative finance at higher costs or missing opportunities entirely.",industryBenchmark:"Our most successful client transformations start exactly where you are today. With structured guidance, we can build your finance foundation systematically.",ctaText:"Book Foundation Strategy Session",ctaSubtext:"Every successful business starts somewhere - let's start your transformation"}},v=[{number:1,text:"How current are your business financial records?",options:[{value:"A",label:"Fully Current",description:"Management accounts updated monthly, cash flow monitored, BAS and tax returns up to date"},{value:"B",label:"Mostly Current",description:"Quarterly BAS up to date, last financial year completed, some management reporting"},{value:"C",label:"Basic Compliance",description:"Tax returns lodged, BAS generally current, annual accounts only"},{value:"D",label:"Behind",description:"Outstanding obligations, incomplete records, rely on accountant for everything"}]},{number:2,text:"What's your annual business turnover?",options:[{value:"A",label:"$10M+",description:"Established business, multiple revenue streams, professional financial management"},{value:"B",label:"$3M - $10M",description:"Growing business, solid revenue base, structured operations"},{value:"C",label:"$1M - $3M",description:"Owner working in business, established but growing, key person dependency"},{value:"D",label:"Under $1M",description:"Owner is key person, limited debt history, may need alternative lending"}]},{number:3,text:"How well do you know your current financial position?",options:[{value:"A",label:"Complete Visibility",description:"All contracts accessible, commitment schedule maintained, security position clear, asset register current"},{value:"B",label:"Good Understanding",description:"Know major assets and debts, most documentation available, some detail gaps"},{value:"C",label:"Basic Knowledge",description:"General position awareness, would need to gather information, unsure of some details"},{value:"D",label:"Limited Visibility",description:"Unclear on total obligations, no central records, would need significant work"}]},{number:4,text:"If a lender asked today, could you provide these documents?",isChecklist:!0,checklistItems:["Last 2 years' financial statements","Year to Date Profit & Loss and Balance Sheet","Commitment Schedule (list of all debts & repayment details)","Statement of Position (list of assets and debts)","6 months' bank statements (all accounts)","Current lease agreement(s)","ATO portal access/tax account statements","Aged debtors/creditors reports","Current insurance policies"]},{number:5,text:"When did you last apply for business finance?",options:[{value:"A",label:"Currently Active",description:"Applied in last 6 months, know current requirements, understand the process"},{value:"B",label:"Recent Experience",description:"Within last 2 years, some process understanding, may need requirement updates"},{value:"C",label:"Some Time Ago",description:"2-5 years ago, requirements have likely changed, market has evolved"},{value:"D",label:"Never/Very Long Ago",description:"No recent experience, unaware of current requirements, need full guidance"}]}];document.addEventListener("DOMContentLoaded",function(){h()});function h(){document.getElementById("hero-cta-btn")?.addEventListener("click",()=>{window.location.href="/finance-ready-assessment/start"}),document.getElementById("assessment-start-btn")?.addEventListener("click",()=>{window.location.href="/finance-ready-assessment/start"}),document.getElementById("next-btn")?.addEventListener("click",b),document.getElementById("prev-btn")?.addEventListener("click",w),document.addEventListener("checklistUpdated",function(e){s.answers.q4=e.detail.count,a()})}function d(){const e=v[s.currentQuestion-1],t=(s.currentQuestion-1)/5*100;document.getElementById("progress-container").innerHTML=`
      <div class="mb-8">
        <div class="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question ${s.currentQuestion} of 5</span>
          <span>${t.toFixed(0)}% complete</span>
        </div>
        <div class="h-2 bg-gray-200">
          <div class="h-full bg-orange-500 transition-all duration-300" style="width: ${t}%"></div>
        </div>
        <div class="mt-2 text-xs text-gray-500 text-center">
          Less than ${Math.ceil((5-s.currentQuestion)*.5)} minute${Math.ceil((5-s.currentQuestion)*.5)!==1?"s":""} remaining
        </div>
      </div>
    `,e.isChecklist?f(e):y(e),x()}function y(e){const t=s.answers[`q${e.number}`],n=e.options.map(r=>`
      <label class="block cursor-pointer group">
        <div class="border-2 p-5 transition-all hover:transform hover:translate-x-1 ${t===r.value?"border-orange-500 bg-orange-50":"border-gray-200 hover:border-orange-500 hover:bg-orange-50"}">
          <div class="flex items-start">
            <input
              type="radio"
              name="question-${e.number}"
              value="${r.value}"
              ${t===r.value?"checked":""}
              class="mt-1 h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
              onchange="handleAnswerChange('q${e.number}', '${r.value}')"
            />
            <div class="ml-3 flex-1">
              <div class="font-medium text-gray-700">${r.label}</div>
              <div class="text-sm text-gray-500 mt-1">${r.description}</div>
            </div>
            ${t===r.value?`
              <svg class="w-6 h-6 text-orange-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            `:""}
          </div>
        </div>
      </label>
    `).join("");document.getElementById("question-container").innerHTML=`
      <div class="bg-white border border-gray-200 shadow-sm p-8 sm:p-12">
        <div class="text-sm font-medium text-orange-500 uppercase tracking-wider">
          QUESTION ${e.number} OF 5
        </div>
        <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mt-4 mb-8">
          ${e.text}
        </h2>
        <div class="space-y-4">
          ${n}
        </div>
        ${u()}
      </div>
    `}function f(e){const t=s.answers[`q${e.number}`]||0,n=e.checklistItems.map((r,i)=>`
      <label class="flex items-start cursor-pointer group">
        <input
          type="checkbox"
          name="checklist-item"
          value="${i}"
          class="mt-1 h-5 w-5 text-orange-500 border-gray-300 focus:ring-orange-500"
          onchange="updateChecklistCount()"
        />
        <span class="ml-3 text-gray-700 group-hover:text-gray-900">${r}</span>
      </label>
    `).join("");document.getElementById("question-container").innerHTML=`
      <div class="bg-white border border-gray-200 shadow-sm p-8 sm:p-12">
        <div class="text-sm font-medium text-orange-500 uppercase tracking-wider">
          QUESTION ${e.number} OF 5
        </div>
        <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mt-4 mb-8">
          ${e.text}
        </h2>
        <p class="text-base text-gray-700 mb-6">
          Tick all items you could provide within 24 hours:
        </p>
        <div class="space-y-3 mb-8">
          ${n}
        </div>
        <div class="text-sm text-gray-500 mb-6">
          Items checked: <span id="checked-count">${t}</span> / ${e.checklistItems.length}
        </div>
        ${u()}
      </div>
    `}function u(){return`
      <div class="mt-8 flex flex-wrap gap-6 text-xs text-gray-500">
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-9a2 2 0 00-2-2H6a2 2 0 00-2 2v9a2 2 0 002 2zm10-12V6a4 4 0 00-8 0v3h8z"></path>
          </svg>
          Secure & Confidential Assessment
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Takes 3 minutes on average
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          Used by 100+ businesses
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          No sensitive information required
        </div>
      </div>
    `}function x(){const e=document.getElementById("prev-btn");document.getElementById("next-btn");const t=document.getElementById("next-btn-text");s.currentQuestion>1?e.style.display="inline-flex":e.style.display="none",s.currentQuestion===5?t.textContent="Get My Results":t.textContent="Next Question",a()}function a(){const e=document.getElementById("next-btn");s.answers[`q${s.currentQuestion}`]!==void 0?e.disabled=!1:e.disabled=!0}window.handleAnswerChange=function(e,t){s.answers[e]=t,a()};window.updateChecklistCount=function(){const t=document.querySelectorAll('input[name="checklist-item"]:checked').length;document.getElementById("checked-count").textContent=t,s.answers[`q${s.currentQuestion}`]=t,a()};function b(){s.currentQuestion<5?(s.currentQuestion++,d()):k()}function w(){s.currentQuestion>1&&(s.currentQuestion--,d())}function k(){document.getElementById("question-container").style.display="none",document.getElementById("calculating-results").style.display="block",setTimeout(()=>{s.score=m(s.answers),s.level=g(s.score),s.completed=!0,sessionStorage.setItem("assessmentData",JSON.stringify({...s.answers,score:s.score,level:s.level})),document.getElementById("assessment-interface").style.display="none",B()},2e3)}function B(){const e=p[s.level],t=l(s.level);document.getElementById("results-section").style.display="block",document.getElementById("score-display-container").innerHTML=C(),document.getElementById("result-card-container").innerHTML=M(e,t),document.getElementById("recommendations-container").innerHTML=$(),document.getElementById("lead-capture-section").style.display="block",document.getElementById("lead-capture-container").innerHTML=S(),document.getElementById("results-section").scrollIntoView({behavior:"smooth"})}function C(){const e=c(s.level),t=s.score/50*100,n=2*Math.PI*88,r=`${t/100*n} ${n}`;return`
      <div class="text-center py-4 sm:py-8 lg:py-12 w-full">
        <div class="relative inline-flex items-center justify-center max-w-full">
          <svg class="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 transform -rotate-90 max-w-full" viewBox="0 0 192 192">
            <circle cx="96" cy="96" r="88" stroke="#E5E7EB" stroke-width="12" fill="none"/>
            <circle cx="96" cy="96" r="88" stroke="${e}" stroke-width="12" fill="none" 
                    stroke-dasharray="${r}" stroke-linecap="round" class="animate-draw-circle"/>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <div class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-none" style="color: ${e}">
              ${s.score}
            </div>
            <div class="text-xs sm:text-sm text-gray-500 mt-1">out of 50</div>
          </div>
        </div>
        <div class="mt-4 sm:mt-6 text-sm text-gray-600">
          <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" 
               style="background-color: ${e}20; color: ${e}">
            ${t.toFixed(0)}% Finance Ready
          </div>
        </div>
      </div>
    `}function M(e,t){const n=c(s.level);return`
      <div class="bg-white border-2 shadow-lg p-6 sm:p-8" style="border-color: ${n}">
        <div class="text-center mb-8">
          <div class="text-lg sm:text-xl font-bold mb-2" style="color: ${n}">
            ${t}
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
            ${e.congratsMessage}
          </h2>
        </div>
        <div class="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
          <p>${e.mainCopy}</p>
          <div class="bg-gray-50 p-6 border-l-4" style="border-left-color: ${n}">
            <div class="flex items-start">
              <svg class="w-6 h-6 mt-1 mr-3 flex-shrink-0" style="color: ${n}" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">Industry Benchmark</h3>
                <p class="text-gray-700">${e.industryBenchmark}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 p-6 sm:p-8 mt-8 text-center">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Ready for Your Next Step?</h3>
          <button class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  style="background: linear-gradient(135deg, ${n}, ${n}dd)"
                  onclick="document.getElementById('lead-capture').scrollIntoView({ behavior: 'smooth' })">
            ${e.ctaText}
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </button>
          <p class="text-sm text-gray-600 mt-3">${e.ctaSubtext}</p>
        </div>
      </div>
    `}function $(){return`
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center p-6 bg-gray-50">
          <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Download Your Report</h3>
          <p class="text-sm text-gray-600 mb-4">Get your personalised Finance Ready checklist and detailed analysis.</p>
          <button class="text-orange-600 hover:text-orange-700 text-sm font-medium"
                  onclick="document.getElementById('lead-capture').scrollIntoView({ behavior: 'smooth' })">
            Access Report →
          </button>
        </div>
        
        <div class="text-center p-6 bg-gray-50">
          <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Lending Playbook</h3>
          <p class="text-sm text-gray-600 mb-4">Insider guide to Australia's best trades lending options and qualification requirements.</p>
          <button class="text-orange-600 hover:text-orange-700 text-sm font-medium"
                  onclick="document.getElementById('lead-capture').scrollIntoView({ behavior: 'smooth' })">
            Get Playbook →
          </button>
        </div>
        
        <div class="text-center p-6 bg-gray-50">
          <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Strategy Session</h3>
          <p class="text-sm text-gray-600 mb-4">15-minute consultation with our finance specialists to discuss your specific situation.</p>
          <button class="text-orange-600 hover:text-orange-700 text-sm font-medium"
                  onclick="document.getElementById('lead-capture').scrollIntoView({ behavior: 'smooth' })">
            Book Session →
          </button>
        </div>
      </div>
    `}function S(){const e=l(s.level);return`
      <div id="lead-capture" class="bg-white border-2 border-orange-500 p-6 sm:p-8 max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Get Your Complete Finance Ready Package
          </h3>
          <p class="text-gray-600 text-lg">
            Detailed report plus exclusive resources - $1,035 value
          </p>
          <div class="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 text-sm font-medium mt-4">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Your Score: ${s.score}/50 - ${e}
          </div>
        </div>

        <!-- Value Stack Reminder -->
        <div class="bg-gray-50 p-6 mb-8">
          <h4 class="font-semibold text-gray-900 mb-4">Here's everything in your complete package:</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div class="flex items-start">
              <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Personalised Finance Readiness Report (PDF)</span>
            </div>
            <div class="flex items-start">
              <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Custom Action Checklist for Your Score Level</span>
            </div>
            <div class="flex items-start">
              <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Finance Ready Lending Playbook</span>
            </div>
            <div class="flex items-start">
              <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Business Debt Servicing Calculator (Excel)</span>
            </div>
            <div class="flex items-start">
              <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>7-Day Email Course: Days to Finance Ready</span>
            </div>
            <div class="flex items-start">
              <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Application Timeline Template</span>
            </div>
          </div>
        </div>

        <!-- Form -->
        <form id="lead-capture-form" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your@email.com"
              class="w-full px-4 py-3 border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition-colors"
            />
          </div>
          
          <div>
            <label for="business_name" class="block text-sm font-medium text-gray-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              id="business_name"
              name="business_name"
              placeholder="Your Business Pty Ltd"
              class="w-full px-4 py-3 border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition-colors"
            />
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="0400 000 000"
              class="w-full px-4 py-3 border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition-colors"
            />
          </div>

          <!-- Loading state -->
          <div id="form-loading" class="hidden text-center py-4">
            <div class="inline-flex items-center">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
              <span class="text-gray-600">Sending your package...</span>
            </div>
          </div>

          <!-- Error state -->
          <div id="form-error" class="hidden bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
            <p>There was an error sending your package. Please try again or contact us directly.</p>
          </div>
        
          <button
            type="submit"
            id="submit-btn"
            class="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
          >
            Send My $1,035 Package Now
          </button>
          
          <p class="text-xs text-gray-500 text-center">
            Instant access - check your email in 2 minutes
          </p>
        </form>
        
        <!-- Privacy Notice -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="flex flex-wrap gap-4 justify-center text-xs text-gray-500">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-9a2 2 0 00-2-2H6a2 2 0 00-2 2v9a2 2 0 002 2zm10-12V6a4 4 0 00-8 0v3h8z"/>
              </svg>
              Your information is 100% secure and confidential
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              We respect your privacy - never shared with third parties
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Unsubscribe anytime with one click
            </div>
          </div>
        </div>
      </div>
    `}
