/**
 * buildDomain: validates and fills computed cost fields on every task.
 * Each task only needs hoursPerMonth (both sides) and ai.toolCost.
 * monthlyCost is derived from domain.assumedRate so numbers stay consistent.
 */
export function buildDomain(domain) {
  const rate = domain.assumedRate;
  const tasks = domain.tasks.map((t) => {
    const tradHours = t.traditional.hoursPerMonth;
    const aiHours = t.ai.hoursPerMonth;
    const toolCost = t.ai.toolCost ?? 0;
    return {
      ...t,
      traditional: {
        ...t.traditional,
        monthlyCost: Math.round(tradHours * rate),
      },
      ai: {
        ...t.ai,
        toolCost,
        monthlyCost: Math.round(aiHours * rate + toolCost),
      },
    };
  });
  return { ...domain, tasks };
}
