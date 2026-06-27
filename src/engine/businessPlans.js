export const defaultPermits = [
  {
    name: "UAE business information",
    url: "https://u.ae/en/information-and-services/business",
  },
  {
    name: "Abu Dhabi business services",
    url: "https://www.tamm.abudhabi/en/life-events/individual/Business",
  },
];

function buildSevenDayPlan(opportunity) {
  if (!opportunity) {
    return [
      "Day 1: Write the idea in one clear sentence",
      "Day 2: Define the first customer group",
      "Day 3: Interview 5 potential customers",
      "Day 4: Estimate startup costs",
      "Day 5: Create a WhatsApp or Instagram promotion message",
      "Day 6: Prepare one sample or demo service",
      "Day 7: Review feedback and decide the next step",
    ];
  }

  return [
    `Day 1: Research ${opportunity.name} and define the first small version`,
    `Day 2: Speak to 5 potential customers: ${opportunity.customers}`,
    `Day 3: Estimate the cost of ${opportunity.costs.slice(0, 3).join(", ")}`,
    `Day 4: Prepare a simple sample, offer, or demo for ${opportunity.name}`,
    `Day 5: Promote through ${opportunity.marketing.slice(0, 2).join(" and ")}`,
    "Day 6: Collect customer feedback and note objections",
    "Day 7: Decide whether to continue, improve, or pivot",
  ];
}

export function generateBusinessPlan({ formData, opportunities }) {
  const opportunity =
    opportunities.find((item) => item.name === formData.idea) || null;

  return {
    summary: opportunity
      ? `${opportunity.name} is a ${opportunity.category.toLowerCase()} opportunity that can be tested in ${
          formData.location || "the local community"
        }. It is suitable for ${opportunity.customers}. The safest first step is to validate demand before spending heavily.`
      : `${formData.idea || "This business idea"} can be tested as a small local business in ${
          formData.location || "the community"
        }. The safest first step is to validate demand with ${
          formData.customer || "local customers"
        } before spending heavily.`,

    firstAction: opportunity
      ? opportunity.firstAction
      : "Speak to 5 nearby potential customers this week and ask whether they would buy it, what price feels fair, and what would make them trust you.",

    whyThisPlan: opportunity
      ? [
          `This plan is based on the selected business: ${opportunity.name}.`,
          `It targets: ${opportunity.customers}.`,
          `Main marketing channels: ${opportunity.marketing.join(", ")}.`,
          `Main cost areas: ${opportunity.costs.join(", ")}.`,
          `Main risks considered: ${opportunity.risks.join(", ")}.`,
        ]
      : [
          "This plan is based on the business idea entered by the founder.",
          "It uses the selected budget, location, customer group, and experience level.",
        ],

    locationAdvice: opportunity
      ? [
          `Use ${formData.location || "your local area"} as the first test market for ${opportunity.name}.`,
          `Best early customers: ${opportunity.customers}.`,
          `Recommended marketing channels: ${opportunity.marketing.join(", ")}.`,
          "Start small, collect feedback, then expand only after demand is proven.",
        ]
      : [
          `Use ${formData.location || "your local area"} as your first testing zone before expanding.`,
          "Start with nearby residents because trust and word-of-mouth are powerful in smaller communities.",
          "Use WhatsApp groups, Instagram stories, school/family networks, and local community events as low-cost selling channels.",
          "Avoid buying large stock first. Test with a small sample, collect feedback, then improve the offer.",
        ],

    localResources: [
      "Use TAMM or official UAE government portals to check business setup requirements.",
      "Use Instagram, WhatsApp Business, and Google Maps listing to make the business discoverable.",
      "Ask local shops, farms, schools, or community groups whether they can help you reach first customers.",
      "Look for ADU, youth, and entrepreneurship programs that may provide mentoring or incubation support.",
    ],

    checklist: opportunity
      ? [
          `Confirm demand for ${opportunity.name}`,
          `Speak to 5 potential customers: ${opportunity.customers}`,
          "Prepare a small sample or pilot version",
          `Estimate the cost of: ${opportunity.costs.slice(0, 3).join(", ")}`,
          `Test marketing through: ${opportunity.marketing.slice(0, 2).join(", ")}`,
          "Collect feedback and improve before scaling",
        ]
      : [
          "Write the business idea in one clear sentence",
          "Define the first customer group",
          "Ask 5 people if they would pay for it",
          "Estimate basic startup costs",
          "Create a WhatsApp or Instagram promotion message",
          "Prepare one small sample or demo service",
        ],

    sevenDayPlan: buildSevenDayPlan(opportunity),

    roadmap: opportunity
      ? [
          `Week 1: Validate ${opportunity.name} with real customers`,
          "Week 2: Prepare a small pilot offer and simple pricing",
          `Week 3: Promote using ${opportunity.marketing.slice(0, 2).join(" and ")}`,
          "Week 4: Review feedback, improve the offer, and decide whether to continue",
        ]
      : [
          "Week 1: Validate the idea with real people nearby",
          "Week 2: Prepare a simple offer, price, and sample",
          "Week 3: Promote through WhatsApp, Instagram, family, and community networks",
          "Week 4: Collect feedback, improve the offer, and decide whether to continue",
        ],

    costs: opportunity
      ? opportunity.costs.map((item) => `${item}: estimated cost depends on scale`)
      : [
          "Basic materials: AED 300 - 800",
          "Marketing: AED 100 - 300",
          "Packaging or presentation: AED 100 - 500",
          "Emergency buffer: AED 300 - 700",
        ],

    questions: opportunity
      ? [
          `Would you buy ${opportunity.name}?`,
          "What price feels reasonable for the first version?",
          "What would make you trust this new business?",
          "Where do you currently get something similar?",
          "What should be improved before launch?",
        ]
      : [
          "Who needs this product or service most?",
          "How often would they buy it?",
          "What price feels reasonable?",
          "Where do they currently get something similar?",
          "What would make them trust a new seller?",
        ],

    risks: opportunity
      ? opportunity.risks
      : [
          "Spending money before validating demand",
          "Unclear pricing",
          "Weak customer awareness",
          "Depending on only one selling channel",
        ],

    permits: opportunity?.permits || defaultPermits,
  };
}