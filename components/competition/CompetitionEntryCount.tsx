"use client";

import { useCallback, useEffect, useState } from "react";

type CompetitionEntryCountProps = {
  variant?: "default" | "dark";
};

const formatCount = (count: number | null) => {
  if (count === null) return "Join the Everyday Heroes draw";
  if (count === 1) return "1 person has entered";

  return `${new Intl.NumberFormat("en-GB").format(count)} people have entered`;
};

const CompetitionEntryCount = ({ variant = "default" }: CompetitionEntryCountProps) => {
  const [count, setCount] = useState<number | null>(null);

  const refreshCount = useCallback(async () => {
    try {
      const response = await fetch("/api/competition/entry-count", { cache: "no-store" });
      if (!response.ok) return;

      const data = (await response.json()) as { count?: unknown };
      if (typeof data.count === "number" && Number.isFinite(data.count)) {
        setCount(data.count);
      }
    } catch {
      // The entry form remains available if the count cannot be loaded.
    }
  }, []);

  useEffect(() => {
    void refreshCount();
    const intervalId = window.setInterval(refreshCount, 30000);
    window.addEventListener("competition-entry-created", refreshCount);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("competition-entry-created", refreshCount);
    };
  }, [refreshCount]);

  return (
    <p className={`competition-entry-count${variant === "dark" ? " is-dark" : ""}`}>
      <i className="fa-solid fa-users" aria-hidden="true" />
      <span>{formatCount(count)}</span>
    </p>
  );
};

export default CompetitionEntryCount;
