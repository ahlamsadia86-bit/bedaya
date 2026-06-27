export function calculateReadiness({
  formData,
  selectedSkills,
  timeAvailable,
  customerInterviewDone,
  marketingDone,
}) {
  const breakdown = [];

  function add(title, score, max, status, recommendation = "") {
    breakdown.push({ title, score, max, status, recommendation });
  }

  add(
    "Business Idea Clarity",
    formData.idea ? 10 : 0,
    10,
    formData.idea ? "Idea entered" : "Missing",
    formData.idea ? "" : "Write your idea clearly."
  );

  add(
    "Target Customer Definition",
    formData.customer ? 15 : 0,
    15,
    formData.customer ? "Customer defined" : "Missing",
    formData.customer ? "" : "Define who will buy."
  );

  add(
    "Budget Readiness",
    formData.budget === "Less than AED 1,000"
      ? 8
      : formData.budget === "AED 1,000 - AED 5,000"
      ? 12
      : 15,
    15,
    formData.budget
  );

  add(
    "Location Context",
    formData.location ? 10 : 0,
    10,
    formData.location ? "Location available" : "Missing",
    formData.location ? "" : "Add your area."
  );

  add(
    "Founder Experience",
    formData.experience === "Experienced"
      ? 10
      : formData.experience === "Some experience"
      ? 7
      : 5,
    10,
    formData.experience
  );

  add(
    "Problem Awareness",
    formData.challenge ? 10 : 0,
    10,
    formData.challenge ? "Challenge identified" : "Missing",
    formData.challenge ? "" : "Describe your biggest obstacle."
  );

  add(
    "Skill Match",
    selectedSkills.length > 0 ? 15 : 8,
    15,
    selectedSkills.length > 0
      ? `${selectedSkills.length} skill(s) selected`
      : "Not selected",
    selectedSkills.length > 0
      ? ""
      : "Use Opportunity Finder to select matching skills."
  );

  add(
    "Time Commitment",
    timeAvailable === "Full-time"
      ? 15
      : timeAvailable === "Part-time"
      ? 12
      : timeAvailable === "5–10 hours/week"
      ? 10
      : 8,
    15,
    timeAvailable
  );

  const rawScore = breakdown.reduce((total, item) => total + item.score, 0);
  const max = breakdown.reduce((total, item) => total + item.max, 0);

  let bonus = 0;
  if (customerInterviewDone) bonus += 5;
  if (marketingDone) bonus += 5;

  const score = Math.min(100, Math.round((rawScore / max) * 100 + bonus));

  let improvementActions = breakdown
    .filter((item) => item.recommendation)
    .map((item) => item.recommendation);

  if (!customerInterviewDone) {
    improvementActions.push("Complete five customer interviews.");
  }

  if (!marketingDone) {
    improvementActions.push(
      "Create your first WhatsApp Business or Instagram page."
    );
  }

  if (improvementActions.length === 0) {
    improvementActions.push(
      "Test one price with real customers.",
      "Prepare your first sample or demo offer."
    );
  }

  const progressTasks = [
    { task: "Business idea selected", done: Boolean(formData.idea) },
    { task: "Target customer defined", done: Boolean(formData.customer) },
    { task: "Budget selected", done: Boolean(formData.budget) },
    { task: "Location added", done: Boolean(formData.location) },
    { task: "Main challenge identified", done: Boolean(formData.challenge) },
    { task: "Skills selected", done: selectedSkills.length > 0 },
    { task: "Customer interviews completed", done: customerInterviewDone },
    { task: "First marketing channel prepared", done: marketingDone },
  ];

  const progressPercent = Math.round(
    (progressTasks.filter((task) => task.done).length / progressTasks.length) *
      100
  );

  return {
    score,
    breakdown,
    improvementActions,
    progressTasks,
    progressPercent,
    projectedScore: Math.min(100, score + improvementActions.length * 5),
  };
}