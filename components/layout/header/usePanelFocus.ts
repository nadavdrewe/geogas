import { useEffect, useRef } from "react";

const controls = 'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

export default function usePanelFocus(open: boolean, setOpen: (value: boolean) => void) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const items = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>(controls) || []).filter((item) => item.getClientRects().length > 0);
    items()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); return; }
      if (event.key !== "Tab") return;
      const elements = items();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open, setOpen]);
  return panelRef;
}
