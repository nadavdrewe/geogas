"use client";

import { ReactNode, useId, useState } from "react";

type DisclosureItem = { title: string; content: ReactNode };

export default function DisclosureList({ items, label }: { items: DisclosureItem[]; label: string }) {
  const id = useId();
  const [opened, setOpened] = useState<string[]>([]);
  const allOpen = items.length > 0 && items.every((item) => opened.includes(item.title));

  return (
    <div className="detail-list">
      <div className="detail-list__tools">
        <p>Open a topic to read the full details.</p>
        <button type="button" aria-controls={id} onClick={() => setOpened(allOpen ? [] : items.map((item) => item.title))}>
          {allOpen ? "Collapse all" : "Expand all"}
          <span className="visually-hidden"> {label}</span>
        </button>
      </div>
      <div id={id} className="detail-list__items">
        {items.map((item) => (
          <details key={item.title} open={opened.includes(item.title)} onToggle={(event) => {
            const isOpen = event.currentTarget.open;
            setOpened((previous) => isOpen
              ? previous.includes(item.title) ? previous : [...previous, item.title]
              : previous.includes(item.title) ? previous.filter((title) => title !== item.title) : previous);
          }}>
            <summary>{item.title}<span aria-hidden="true" className="detail-list__indicator" /></summary>
            <div className="detail-list__body">{item.content}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
