export type Base = 'A' | 'C' | 'G' | 'T' | 'N';

export function normalizeSequence(raw: string): string {
  const sequence = raw.toUpperCase().replace(/\s/g, '');
  if (!sequence) throw new Error('Enter a DNA sequence first.');
  if (!/^[ACGTN]+$/.test(sequence)) throw new Error('Only A, C, G, T, and N are accepted.');
  if (sequence.length > 1_000_000) throw new Error('Sequence limit is 1,000,000 bases.');
  return sequence;
}

export function reverseComplement(raw: string): string {
  const sequence = normalizeSequence(raw);
  const complement: Record<Base, Base> = { A: 'T', T: 'A', C: 'G', G: 'C', N: 'N' };
  return [...sequence].reverse().map(base => complement[base as Base]).join('');
}

export function analyzeSequence(raw: string) {
  const sequence = normalizeSequence(raw);
  const counts: Record<Base, number> = { A: 0, C: 0, G: 0, T: 0, N: 0 };
  for (const base of sequence) counts[base as Base]++;
  return {
    sequence,
    length: sequence.length,
    counts,
    gcPercent: ((counts.G + counts.C) / sequence.length) * 100,
    reverseComplement: reverseComplement(sequence)
  };
}

export type Edit =
  | { kind: 'substitute'; position: number; value: string }
  | { kind: 'insert'; position: number; value: string }
  | { kind: 'delete'; position: number; length?: number };

export function simulateEdit(raw: string, edit: Edit) {
  const sequence = normalizeSequence(raw);
  if (!Number.isFinite(edit.position)) throw new Error('Edit position must be a finite number.');
  const position = Math.max(1, Math.min(sequence.length + 1, Math.floor(edit.position)));
  let edited = sequence;
  if (edit.kind === 'substitute' || edit.kind === 'insert') {
    const value = normalizeSequence(edit.value);
    edited = sequence.slice(0, position - 1) + value + sequence.slice(position);
  } else {
    const length = Math.max(1, Math.min(100_000, Math.floor(edit.length ?? 1)));
    edited = sequence.slice(0, position - 1) + sequence.slice(Math.min(sequence.length, position - 1 + length));
  }
  if (edited.length > 1_000_000) throw new Error('Result exceeds 1,000,000 bases.');
  return {
    original: sequence, edited, originalLength: sequence.length, editedLength: edited.length,
    lengthDelta: edited.length - sequence.length, analysis: analyzeSequence(edited),
    notice: 'In-silico preview only. This is not a biological prediction or laboratory protocol.'
  };
}

// This transparent, sequence-only heuristic is for UI demonstrations, not biological prediction.
export function scoreSequenceWindows(raw: string, width = 20) {
  const sequence = normalizeSequence(raw);
  if (!Number.isInteger(width) || width < 1 || width > 200) throw new Error('Window width must be an integer from 1 to 200.');
  const candidates: Array<{ start: number; end: number; sequence: string; gcPercent: number; score: number }> = [];
  for (let i = 0; i + width <= sequence.length; i++) {
    const candidate = sequence.slice(i, i + width);
    if (candidate.includes('N')) continue;
    const gcPercent = (candidate.match(/[GC]/g) ?? []).length / width * 100;
    const score = Math.max(0, Math.round(100 - Math.abs(gcPercent - 50) * 2 - (/(A{4,}|C{4,}|G{4,}|T{4,})/.test(candidate) ? 20 : 0)));
    candidates.push({ start: i + 1, end: i + width, sequence: candidate, gcPercent, score });
  }
  return candidates.sort((a, b) => b.score - a.score).slice(0, 25);
}
