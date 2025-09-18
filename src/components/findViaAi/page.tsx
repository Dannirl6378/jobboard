"use client"
import { useEffect, useState } from "react";
import { useAppStore } from "@/app/hook/useAppStore";
import { Paper, Typography, Button, List, ListItem } from "@mui/material";
import { computeScore } from "./findViaAi";
import { useRouter } from "next/navigation";


export default function AIButtonExample() {
  const router = useRouter();
   const [results, setResults] = useState<any[]>([]);
  const jobs = Object.values(useAppStore((state) => state.jobs));
  const LogIn = useAppStore((state) => state.LogIn);
  const profile = LogIn?.about || "";

  useEffect(() => {
    if (profile && jobs.length > 0) {
      const matches = jobs
        .map((job) => ({
          ...job,
          score: computeScore(profile, job.description),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
      setResults(matches);
    }
  }, [profile]);

  const handleGoToJob = (jobId: string) => {
    router.push(`/pages/job/jobDetail/${jobId}`);
  };

  return (
    <Paper sx={{ p: 4, mt: 4, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Vyhledávání pracovních nabídek pomocí AI
      </Typography>

      {results.length > 0 && (
        <List>
          {results.map((job) => (
            <ListItem key={job.id} sx={{ mb: 1, p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {job.title}
              </Typography>
              <Button variant="text" onClick={() => handleGoToJob(job.id)}>Zobrazit nabídku</Button>
              <Typography variant="body2" color="text.secondary">
                Shoda: {(job.score * 100).toFixed(0)}%
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}

// Funkce tokenize a calculateMatchScore budeš mít ve stejném souboru
/*"use client";
import { useState } from "react";
import { Button, Paper, Typography, List, ListItem } from "@mui/material";
import { useAppStore } from "@/app/hook/useAppStore";

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

const computeScore = (userText: string, jobText: string): number => {
  const userTokens = new Set(tokenize(userText));
  const jobTokens = tokenize(jobText);
  let matchCount = 0;
  for (const token of jobTokens) if (userTokens.has(token)) matchCount++;
  return matchCount / jobTokens.length;
};

export default function AIButtonExample() {
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const jobs = Object.values(useAppStore((state) => state.jobs));
  const LogIn = useAppStore((state) => state.LogIn);
  const profile = LogIn?.about || "";

  const handleClick = () => {
    const matches = jobs
      .map((job) => ({
        ...job,
        score: computeScore(profile, job.description),
      }))
      .sort((a, b) => b.score - a.score);

    setResults(matches);
    setShowResults(true);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Vyhledat pomocí AI
      </Button>

      {showResults && (
        <Paper sx={{ p: 4, mt: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>
            Vyhledávání pracovních nabídek pomocí AI
          </Typography>

          {results.length > 0 ? (
            <List>
              {results.map((job) => (
                <ListItem
                  key={job.id}
                  sx={{
                    mb: 1,
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Shoda: {(job.score * 100).toFixed(0)}%
                  </Typography>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Prosím vyplňte svůj profil 'O sobě'.
            </Typography>
          )}
        </Paper>
      )}
    </>
  );
}
 */