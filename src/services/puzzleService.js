// src/services/puzzleService.js
export async function fetchPuzzle() {
  const res = await fetch('./data/puzzle.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('No se pudo cargar el puzzle: ' + res.status);
  return res.json();
}

