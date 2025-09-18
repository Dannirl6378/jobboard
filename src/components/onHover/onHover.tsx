// HoverHelp.tsx
"use client";
import { Tooltip, Typography } from "@mui/material";
import { ReactNode } from "react";

// Tady si nadefinuješ všechny svoje texty/tooltpy
const tooltips: Record<string, string> = {
  aiFind: "Toto je vyhledávání podle klíčových slov v profilu a nabídce práce.",
  filterOptions: "Zde můžeš filtrovat nabídky podle různých kritérií.",
  login:"Možnosti pro přihlášení: uživatel, firma, Admin ",
  jobBoard:"Hlavní stránka s nabídkami práce",

};

// Obecný wrapper pro tooltip
export function HoverHelp({
  children,
  type,
}: {
  children: ReactNode;
  type: keyof typeof tooltips;
}) {
  return (
    <Tooltip
      title={<Typography variant="body2">{tooltips[type]}</Typography>}
      arrow
      placement="top"
    >
      <span>{children}</span>
    </Tooltip>
  );
}
