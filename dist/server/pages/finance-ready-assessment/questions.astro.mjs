/* empty css                                    */
import { b as createAstro, c as createComponent, m as maybeRenderHead, a as renderTemplate, e as addAttribute, r as renderComponent, d as renderScript } from '../../chunks/astro/server_BL0ualZl.mjs';
import 'kleur/colors';
import { $ as $$Layout, c as $$Header } from '../../chunks/Layout_D_HeogzB.mjs';
import 'clsx';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://www.edgeviewfinance.com.au");
const $$AssessmentQuestion = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AssessmentQuestion;
  const {
    questionNumber,
    questionText,
    questionType = "radio",
    options,
    selectedValue,
    isChecklist = false,
    checklistItems = [],
    checkedCount = 0
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white border border-gray-200 shadow-sm p-4 sm:p-6"> <div class="text-sm font-medium text-orange-500 uppercase tracking-wider">
QUESTION ${questionNumber} OF 5
</div> <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mt-2 mb-4"> ${questionText} </h2> ${questionType === "checkbox" ? renderTemplate`<div> <div class="space-y-2 mb-4"> ${options.map((option) => renderTemplate`<label class="flex items-start cursor-pointer group"> <input type="checkbox"${addAttribute(`question-${questionNumber}-checkbox`, "name")}${addAttribute(option.value, "value")} class="mt-1 h-5 w-5 text-orange-500 border-gray-300 focus:ring-orange-500"> <div class="ml-3"> <span class="text-gray-700 group-hover:text-gray-900 font-medium">${option.label}</span> ${option.description && renderTemplate`<div class="text-sm text-gray-500 mt-1">${option.description}</div>`} </div> </label>`)} </div> <div class="text-sm text-gray-500 mb-6">
Items checked: <span${addAttribute("checked-count-" + questionNumber, "id")}>0</span> / ${options.length} </div> </div>` : renderTemplate`<div class="space-y-3"> ${options.map((option) => renderTemplate`<label class="block cursor-pointer group"> <div${addAttribute(`
            border-2 p-3 transition-all hover:transform hover:translate-x-1
            ${selectedValue === option.value ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-500 hover:bg-orange-50"}
          `, "class")}> <div class="flex items-start"> <input type="radio"${addAttribute(`question-${questionNumber}`, "name")}${addAttribute(option.value, "value")}${addAttribute(selectedValue === option.value, "checked")} class="mt-1 h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"> <div class="ml-3 flex-1"> <div class="font-medium text-gray-700">${option.label}</div> ${option.description && renderTemplate`<div class="text-sm text-gray-500 mt-1">${option.description}</div>`} </div> ${selectedValue === option.value && renderTemplate`<svg class="w-6 h-6 text-orange-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>`} </div> </div> </label>`)} </div>`} </div> ${questionType === "checkbox" && renderTemplate(_a || (_a = __template(['<script type="text/javascript">\n    // Update checkbox count for question\n    const questionNum = {questionNumber};\n    const checkboxes = document.querySelectorAll(`input[name="question-${questionNum}-checkbox"]`);\n    const countSpan = document.getElementById(`checked-count-${questionNum}`);\n    \n    function updateCount() {\n      const checkedCount = document.querySelectorAll(`input[name="question-${questionNum}-checkbox"]:checked`).length;\n      if (countSpan) countSpan.textContent = checkedCount;\n    }\n    \n    checkboxes.forEach(checkbox => {\n      checkbox.addEventListener(\'change\', updateCount);\n    });\n  <\/script>'], ['<script type="text/javascript">\n    // Update checkbox count for question\n    const questionNum = {questionNumber};\n    const checkboxes = document.querySelectorAll(\\`input[name="question-\\${questionNum}-checkbox"]\\`);\n    const countSpan = document.getElementById(\\`checked-count-\\${questionNum}\\`);\n    \n    function updateCount() {\n      const checkedCount = document.querySelectorAll(\\`input[name="question-\\${questionNum}-checkbox"]:checked\\`).length;\n      if (countSpan) countSpan.textContent = checkedCount;\n    }\n    \n    checkboxes.forEach(checkbox => {\n      checkbox.addEventListener(\'change\', updateCount);\n    });\n  <\/script>'])))}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/assessment/AssessmentQuestion.astro", void 0);

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
const $$ProgressBar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProgressBar;
  const { current, total, percentage } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="mb-8"> <div class="flex justify-between text-sm text-gray-600 mb-2"> <span>Question ${current} of ${total}</span> <span>${percentage}% complete</span> </div> <div class="h-2 bg-gray-200"> <div class="h-full bg-orange-500 transition-all duration-300"${addAttribute(`width: ${percentage}%`, "style")}></div> </div> <div class="mt-2 text-xs text-gray-500 text-center">
Less than ${Math.ceil((total - current) * 0.5)} minute${Math.ceil((total - current) * 0.5) !== 1 ? "s" : ""} remaining
</div> </div>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/assessment/ProgressBar.astro", void 0);

const $$Questions = createComponent(async ($$result, $$props, $$slots) => {
  const title = "Finance Ready Assessment Questions | Edgeview Finance";
  const description = "Complete your professional business finance readiness assessment";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="min-h-screen bg-gray-50"> <!-- Assessment Container --> <section class="py-4 lg:py-6"> <div class="container-default"> <div class="max-w-4xl mx-auto"> <!-- Progress Bar --> <div id="progress-container" class="mb-4"> ${renderComponent($$result2, "ProgressBar", $$ProgressBar, { "currentStep": 1, "totalSteps": 5 })} </div> <!-- Question Container --> <div id="question-container" class="bg-white shadow-lg border border-gray-200 p-4 lg:p-6"> <!-- Questions will be dynamically loaded here --> <div id="q1" class="question-slide"> ${renderComponent($$result2, "AssessmentQuestion", $$AssessmentQuestion, { "questionNumber": 1, "questionText": "How current are your business financial records?", "questionType": "radio", "options": [
    { value: "fully-current", label: "Fully Current", description: "Management accounts updated monthly, cash flow monitored, BAS and tax returns up to date" },
    { value: "mostly-current", label: "Mostly Current", description: "Quarterly BAS up to date, last financial year completed, some management reporting" },
    { value: "basic-compliance", label: "Basic Compliance", description: "Tax returns lodged, BAS generally current, annual accounts only" },
    { value: "behind", label: "Behind", description: "Outstanding obligations, incomplete records, rely on accountant for everything" }
  ] })} </div> <div id="q2" class="question-slide hidden"> ${renderComponent($$result2, "AssessmentQuestion", $$AssessmentQuestion, { "questionNumber": 2, "questionText": "What's your annual business turnover?", "questionType": "radio", "options": [
    { value: "10m-plus", label: "$10M+", description: "Established business, multiple revenue streams, professional financial management" },
    { value: "3m-10m", label: "$3M - $10M", description: "Growing business, solid revenue base, structured operations" },
    { value: "1m-3m", label: "$1M - $3M", description: "Owner working in business, established but growing, key person dependency" },
    { value: "under-1m", label: "Under $1M", description: "Owner is key person, limited debt history, may need alternative lending" }
  ] })} </div> <div id="q3" class="question-slide hidden"> ${renderComponent($$result2, "AssessmentQuestion", $$AssessmentQuestion, { "questionNumber": 3, "questionText": "How well do you know your current financial position?", "questionType": "radio", "options": [
    { value: "complete-visibility", label: "Complete Visibility", description: "All contracts accessible, commitment schedule maintained, security position clear, asset register current" },
    { value: "good-understanding", label: "Good Understanding", description: "Know major assets and debts, most documentation available, some detail gaps" },
    { value: "basic-knowledge", label: "Basic Knowledge", description: "General position awareness, would need to gather information, unsure of some details" },
    { value: "limited-visibility", label: "Limited Visibility", description: "Unclear on total obligations, no central records, would need significant work" }
  ] })} </div> <div id="q4" class="question-slide hidden"> ${renderComponent($$result2, "AssessmentQuestion", $$AssessmentQuestion, { "questionNumber": 4, "questionText": "If a lender asked today, could you provide these documents? (Tick all items you could provide within 24 hours)", "questionType": "checkbox", "options": [
    { value: "financial-statements", label: "Last 2 years' financial statements" },
    { value: "ytd-reports", label: "Year to Date Profit & Loss and Balance Sheet" },
    { value: "commitment-schedule", label: "Commitment Schedule", description: "List of all debts & repayment details" },
    { value: "position-statement", label: "Statement of Position", description: "List of assets and debts" },
    { value: "bank-statements", label: "6 months' bank statements", description: "All accounts" },
    { value: "lease-agreements", label: "Current lease agreement(s)" },
    { value: "ato-access", label: "ATO portal access/tax account statements" },
    { value: "aged-reports", label: "Aged debtors/creditors reports" },
    { value: "insurance-policies", label: "Current insurance policies" }
  ] })} </div> <div id="q5" class="question-slide hidden"> ${renderComponent($$result2, "AssessmentQuestion", $$AssessmentQuestion, { "questionNumber": 5, "questionText": "When did you last apply for business finance?", "questionType": "radio", "options": [
    { value: "currently-active", label: "Currently Active", description: "Applied in last 6 months, know current requirements, understand the process" },
    { value: "recent-experience", label: "Recent Experience", description: "Within last 2 years, some process understanding, may need requirement updates" },
    { value: "some-time-ago", label: "Some Time Ago", description: "2-5 years ago, requirements have likely changed, market has evolved" },
    { value: "never-long-ago", label: "Never/Very Long Ago", description: "No recent experience, unaware of current requirements, need full guidance" }
  ] })} </div> <!-- Navigation --> <div class="flex justify-between mt-8"> <button id="back-btn" class="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium hidden"> <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg>
Back
</button> <button id="next-btn" class="ml-auto px-8 py-3 bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
Next
<svg class="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </button> <button id="submit-btn" class="ml-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hidden" disabled>
See My Results
<svg class="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </button> </div> <!-- Trust indicators (below navigation) --> <div class="mt-6 flex flex-wrap gap-4 text-xs text-gray-500 justify-center"> <div class="flex items-center"> <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-9a2 2 0 00-2-2H6a2 2 0 00-2 2v9a2 2 0 002 2zm10-12V6a4 4 0 00-8 0v3h8z"></path> </svg>
Secure & Confidential
</div> <div class="flex items-center"> <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>
3 minutes average
</div> <div class="flex items-center"> <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg>
100+ businesses
</div> </div> </div> <!-- Results Container (Initially Hidden) --> <div id="results-container" class="hidden"> <div class="bg-white shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 min-h-[200px]"> <h2 class="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-4 sm:mb-6">Your Finance Readiness Score</h2> <div id="score-display" class="min-h-[100px] flex items-center justify-center"></div> </div> <div id="result-card"></div> <div id="lead-capture" class="mt-8"></div> </div> </div> </div> </section> </main> ` })} ${renderScript($$result, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/finance-ready-assessment/questions.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/finance-ready-assessment/questions.astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/finance-ready-assessment/questions.astro";
const $$url = "/finance-ready-assessment/questions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Questions,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
