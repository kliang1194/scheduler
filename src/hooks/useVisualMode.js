import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const popHistory = () =>
    setHistory((prev) => [...prev.slice(0, prev.length - 1)]);

  function transition(newMode, replace = false) {
    if (replace) {
      popHistory();
    }
    setMode(newMode);
    setHistory((prev) => [...prev, newMode]);
  }

  function back() {
    if (history.length === 1) {
      return;
    }
    setMode(history[history.length - 2]);
    popHistory();
  }

  return { mode, transition, back };
}
