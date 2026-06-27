export function budgetValue(budget) {
  return Number(budget) || 0;
}

function stars(score) {
  if (score >= 90) return "★★★★★";
  if (score >= 75) return "★★★★☆";
  if (score >= 60) return "★★★☆☆";
  if (score >= 40) return "★★☆☆☆";
  return "★☆☆☆☆";
}

export function findRecommendedOpportunities({
  opportunities,
  selectedSkills,
  budget,
}) {
  const maxBudget = budgetValue(budget);

  if (!selectedSkills || selectedSkills.length === 0) {
    return [];
  }

  return opportunities
    .map((item) => {
      const matchedSkills = item.skills.filter((skill) =>
        selectedSkills.includes(skill)
      );

      if (matchedSkills.length === 0) return null;

      const skillPercent = Math.min(100, matchedSkills.length * 50);
      const budgetPercent = item.cost <= maxBudget ? 100 : 45;
      const demandPercent =
        item.demand === "High" ? 100 : item.demand === "Medium" ? 70 : 45;
      const difficultyPercent =
        item.difficulty === "Easy" ? 100 : item.difficulty === "Medium" ? 75 : 50;

      const score = Math.round(
        skillPercent * 0.4 +
          budgetPercent * 0.25 +
          demandPercent * 0.2 +
          difficultyPercent * 0.15
      );

      return {
        ...item,
        score,
        confidence: score >= 85 ? "High" : score >= 65 ? "Medium" : "Low",
        matchedSkills,
        matchBreakdown: [
          { label: "Skills", value: skillPercent, stars: stars(skillPercent) },
          { label: "Budget", value: budgetPercent, stars: stars(budgetPercent) },
          { label: "Demand", value: demandPercent, stars: stars(demandPercent) },
          { label: "Difficulty", value: difficultyPercent, stars: stars(difficultyPercent) },
        ],
        reasons: [
          `Matches selected skill(s): ${matchedSkills.join(", ")}`,
          item.cost <= maxBudget
            ? `Fits your budget. Estimated startup cost: AED ${item.cost}`
            : `Budget gap: estimated startup cost is AED ${item.cost}`,
          `${item.demand} demand opportunity`,
          `${item.difficulty} difficulty level`,
          `Suitable customers: ${item.customers}`,
        ],
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}