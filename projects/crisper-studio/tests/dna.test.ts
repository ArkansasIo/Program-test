import { describe, expect, it } from 'vitest';
import { analyzeSequence, normalizeSequence, reverseComplement, scoreSequenceWindows, simulateEdit } from '../src/core/dna';

describe('DNA sequence utilities', () => {
  it('normalizes case and whitespace', () => expect(normalizeSequence(' ac gt\nN ')).toBe('ACGTN'));
  it('rejects empty and invalid sequences', () => {
    expect(() => normalizeSequence('  ')).toThrow(/Enter a DNA sequence/);
    expect(() => normalizeSequence('ACGTX')).toThrow(/Only A, C, G, T, and N/);
  });
  it('computes counts, GC percentage and reverse complement', () => {
    const result = analyzeSequence('AACCGTNN');
    expect(result.counts).toEqual({ A: 2, C: 2, G: 1, T: 1, N: 2 });
    expect(result.gcPercent).toBe(37.5);
    expect(result.reverseComplement).toBe('NNACGGTT');
  });
  it('previews substitutions, insertions and deletions', () => {
    expect(simulateEdit('ACGT', { kind: 'substitute', position: 2, value: 'T' }).edited).toBe('ATGT');
    expect(simulateEdit('ACGT', { kind: 'insert', position: 2, value: 'AA' }).edited).toBe('AACGT');
    expect(simulateEdit('ACGT', { kind: 'delete', position: 2, length: 2 }).edited).toBe('AT');
  });
  it('scores only complete windows and rejects invalid widths', () => {
    expect(scoreSequenceWindows('ACGTACGT', 4)).toHaveLength(5);
    expect(() => scoreSequenceWindows('ACGT', 0)).toThrow(/Window width/);
  });
});