// bezpečná tokenizace textu
const tokenize = (text: string): string[] => {
  return text
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[\p{C}]/gu, "")
    .toLowerCase()
    .replace(/[.,!?;:]/g, "")
    .split(/\s+/)
    .filter(Boolean);
};

// jednoduchá funkce na skóre shody
const computeScore = (userText: string, jobText: string): number => {
  const userTokens = new Set(tokenize(userText));
  const jobTokens = tokenize(jobText);

  let matchCount = 0;
  for (const token of jobTokens) {
    if (userTokens.has(token)) matchCount++;
  }

  return matchCount / jobTokens.length; // jednoduché % shody
};

// funkce na vyhledání nejlepších nabídek
const findBestJobs = (userProfile: { about: string }, jobs: { title: string; description: string }[]) => {
  const results = jobs.map((job) => {
    return {
      ...job,
      score: computeScore(userProfile.about, job.description),
    };
  });

  // seřadíme od nejlepší shody po nejhorší
  return results.sort((a, b) => b.score - a.score);
};

export { findBestJobs, computeScore, tokenize };
// Příklad použití


//const bestJobs = findBestJobs(user, jobs);
//console.log(bestJobs);
