import { useMemo } from 'react';

export type ExperienceInfo = {
  years: number;
  months: number; // remaining months after full years
  totalMonths: number;
  label: string; // e.g., "3+ anos" or "3 anos"
};

export function useExperience(startDate: string): ExperienceInfo {
  return useMemo(() => {
    const start = new Date(startDate);
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();

    // If current day is before start day within the month, month not completed
    if (now.getDate() < start.getDate()) {
      months -= 1;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalMonths = years * 12 + months;
    const label = months > 0 ? `${years}+ anos` : `${years} anos`;

    return { years, months, totalMonths, label };
  }, [startDate]);
}

