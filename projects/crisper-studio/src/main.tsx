import React from 'react';
import { createRoot } from 'react-dom/client';
import { analyzeSequence, scoreSequenceWindows, simulateEdit } from './core/dna';

function App() {
  const [sequence, setSequence] = React.useState('ATGCGTACGTAGCTAGCTAG');
  const [result, setResult] = React.useState<ReturnType<typeof analyzeSequence> | null>(null);
  const [error, setError] = React.useState('');
  function analyze() {
    try { setResult(analyzeSequence(sequence)); setError(''); }
    catch (e) { setResult(null); setError(e instanceof Error ? e.message : 'Analysis failed'); }
  }
  const windows = result ? scoreSequenceWindows(result.sequence) : [];
  return <main style={{fontFamily:'system-ui,sans-serif',maxWidth:1000,margin:'40px auto',padding:24,color:'#e8eef5',background:'#101923',minHeight:'70vh',borderRadius:16}}>
    <p style={{color:'#78c8ff',letterSpacing:2}}>COMPUTATIONAL RESEARCH WORKSPACE</p>
    <h1>CRISPER Studio</h1>
    <p>DNA sequence analysis and in-silico edit preview. Results are illustrative and are not biological predictions or laboratory instructions.</p>
    <label htmlFor="sequence">DNA sequence</label>
    <textarea id="sequence" value={sequence} onChange={e=>setSequence(e.target.value)} rows={5} style={{display:'block',boxSizing:'border-box',width:'100%',margin:'10px 0 16px',padding:12,fontFamily:'monospace',background:'#172534',color:'#fff',border:'1px solid #40566c',borderRadius:8}} />
    <button onClick={analyze} style={{padding:'10px 16px',border:0,borderRadius:8,background:'#78c8ff',color:'#101923',fontWeight:700}}>Analyze sequence</button>
    {error && <p role="alert" style={{color:'#ff9e9e'}}>{error}</p>}
    {result && <section aria-live="polite">
      <h2>Analysis summary</h2>
      <p>Length: <b>{result.length}</b> bases · GC content: <b>{result.gcPercent.toFixed(2)}%</b></p>
      <p>A {result.counts.A} · C {result.counts.C} · G {result.counts.G} · T {result.counts.T} · N {result.counts.N}</p>
      <p>Reverse complement</p><code style={{overflowWrap:'anywhere'}}>{result.reverseComplement}</code>
      <h2>Illustrative sequence windows</h2>
      {windows.length ? <ul>{windows.slice(0,8).map(w=><li key={w.start}>Position {w.start}–{w.end}: <code>{w.sequence}</code> · heuristic score {w.score}/100</li>)}</ul> : <p>Sequence is shorter than the default 20-base window or contains ambiguous bases.</p>}
      <h2>Example edit preview</h2>
      <p>{simulateEdit(result.sequence,{kind:'delete',position:1,length:1}).notice}</p>
    </section>}
    <footer style={{marginTop:36,borderTop:'1px solid #40566c',paddingTop:16,fontSize:13,color:'#b5c3d1'}}>Local browser demo. This prototype does not validate biological activity, provide clinical guidance, or direct wet-lab procedures.</footer>
  </main>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);