import React from 'react';
import { Activity, Database, Dna, FlaskConical, FolderPlus, Save, FileText } from 'lucide-react';
import { analyzeSequence, simulateEdit, scoreSequenceWindows } from '../core/dna';
import { store, type Project } from '../core/store';
import './styles.css';

export default function App(){
 const [projects,setProjects]=React.useState<Project[]>([]);
 const [projectId,setProjectId]=React.useState('');
 const [projectName,setProjectName]=React.useState('My research project');
 const [sequenceName,setSequenceName]=React.useState('Example sequence');
 const [sequence,setSequence]=React.useState('ATGCGTACGTAGCTAGCTAG');
 const [result,setResult]=React.useState<ReturnType<typeof analyzeSequence>|null>(null);
 const [message,setMessage]=React.useState('');
 const [error,setError]=React.useState('');
 const [tab,setTab]=React.useState<'analysis'|'projects'|'notes'>('analysis');
 const [notes,setNotes]=React.useState<{id:string;title:string;body:string;created_at:string}[]>([]);
 const [noteTitle,setNoteTitle]=React.useState('');
 const [noteBody,setNoteBody]=React.useState('');
 React.useEffect(()=>{store.projects().then(p=>{setProjects(p);setProjectId(p[0]?.id||'')}).catch(e=>setError(String(e)))},[]);
 React.useEffect(()=>{if(projectId)store.notes(projectId).then(setNotes).catch(e=>setError(String(e)))},[projectId]);
 function analyze(){try{setResult(analyzeSequence(sequence));setError('');setMessage('Sequence analyzed locally.');}catch(e){setError(e instanceof Error?e.message:'Analysis failed');setMessage('')}}
 async function saveSequence(){try{const r=analyzeSequence(sequence);if(!projectId)throw Error('Create or select a project first.');await store.createSequence(projectId,sequenceName,r.sequence);await store.createSimulation(projectId,null,'sequence-analysis',{length:r.length},{length:r.length,gcPercent:r.gcPercent});setMessage('Sequence and analysis saved.');setError('')}catch(e){setError(e instanceof Error?e.message:'Save failed')}}
 async function addProject(){try{const p=await store.createProject(projectName,'CRISPER Studio computational research project');setProjects(await store.projects());setProjectId(p.id);setTab('analysis');setMessage('Project created.')}catch(e){setError(String(e))}}
 async function addNote(){try{if(!projectId)throw Error('Select a project first.');await store.createNote(projectId,noteTitle,noteBody);setNotes(await store.notes(projectId));setNoteTitle('');setNoteBody('');setMessage('Research note saved.');setError('')}catch(e){setError(e instanceof Error?e.message:'Could not save note')}}
 const windows=result?scoreSequenceWindows(result.sequence):[];
 return <div className="app-shell">
  <aside className="sidebar"><div className="brand"><span className="brand-mark"><Dna size={24}/></span><div><strong>CRISPER</strong><small>RESEARCH STUDIO</small></div></div>
   <div className="side-label">WORKSPACE</div>
   <button className={tab==='analysis'?'nav active':'nav'} onClick={()=>setTab('analysis')}><Activity size={17}/> Sequence analysis</button>
   <button className={tab==='projects'?'nav active':'nav'} onClick={()=>setTab('projects')}><Database size={17}/> Projects</button>
   <button className={tab==='notes'?'nav active':'nav'} onClick={()=>setTab('notes')}><FileText size={17}/> Lab notes</button>
   <div className="side-bottom"><span className="status-dot"/> Local workspace <small>{store.desktop?'SQLite desktop':'Browser storage'}</small></div>
  </aside>
  <main className="main-area"><header className="topbar"><div><span className="eyebrow">COMPUTATIONAL BIOLOGY / WORKSPACE</span><h1>{tab==='analysis'?'Sequence analysis':tab==='projects'?'Research projects':'Research notes'}</h1></div><span className="pill"><span className="status-dot"/> Prototype</span></header>
   {error&&<div className="alert error" role="alert">{error}</div>}{message&&<div className="alert success" role="status">{message}</div>}
   {tab==='analysis'&&<><section className="panel"><div className="panel-head"><div><span className="eyebrow">01 / INPUT</span><h2>DNA sequence workspace</h2><p>Enter a sequence using A, C, G, T, and optional N bases.</p></div><Dna size={24}/></div><label>Active project<select value={projectId} onChange={e=>setProjectId(e.target.value)}>{projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label><label>Sequence label<input value={sequenceName} onChange={e=>setSequenceName(e.target.value)} maxLength={120}/></label><label>Sequence data<textarea value={sequence} onChange={e=>setSequence(e.target.value)} rows={5} spellCheck={false}/></label><div className="actions"><button className="primary" onClick={analyze}><Activity size={16}/> Analyze sequence</button><button className="secondary" onClick={saveSequence}><Save size={16}/> Save to project</button></div></section>
   {result&&<><section className="metrics"><div className="metric"><span>Sequence length</span><strong>{result.length.toLocaleString()}</strong><small>base pairs / bases</small></div><div className="metric"><span>GC content</span><strong>{result.gcPercent.toFixed(2)}%</strong><small>G + C composition</small></div><div className="metric"><span>Ambiguous bases</span><strong>{result.counts.N}</strong><small>N characters</small></div></section><section className="panel"><div className="panel-head"><div><span className="eyebrow">02 / RESULTS</span><h2>Composition & reverse complement</h2></div></div><div className="base-grid">{(['A','C','G','T','N'] as const).map(base=><div className="base-card" key={base}><span>{base}</span><strong>{result.counts[base]}</strong><div className="bar"><i style={{width:(result.counts[base]/result.length*100)+'%'}}/></div></div>)}</div><label>Reverse complement<code className="sequence-output">{result.reverseComplement}</code></label></section><section className="panel"><div className="panel-head"><div><span className="eyebrow">03 / EXPLORATORY</span><h2>Sequence windows</h2><p>Transparent sequence-composition heuristic, not a biological activity prediction.</p></div><FlaskConical size={24}/></div>{windows.length?windows.slice(0,10).map(w=><div className="window-row" key={w.start}><span>Position {w.start}–{w.end}</span><code>{w.sequence}</code><span>{w.gcPercent.toFixed(0)}% GC</span><strong>{w.score}/100</strong></div>):<p className="muted">Need at least 20 unambiguous bases for the default window size.</p>}<p className="disclaimer">Simulation and heuristic scores are educational only. They are not validated biological predictions, clinical guidance, or laboratory protocols.</p></section></>}
   </>}
   {tab==='projects'&&<section className="panel"><div className="panel-head"><div><span className="eyebrow">PROJECT MANAGEMENT</span><h2>Research projects</h2><p>Organize sequence analysis and simulation records.</p></div><FolderPlus size={24}/></div><label>New project name<input value={projectName} onChange={e=>setProjectName(e.target.value)} maxLength={120}/></label><button className="primary" onClick={addProject}><FolderPlus size={16}/> Create project</button><div className="project-list">{projects.map(p=><button className={projectId===p.id?'project-row selected':'project-row'} key={p.id} onClick={()=>setProjectId(p.id)}><span><strong>{p.name}</strong><small>{p.description||'No description'}</small></span><small>{new Date(p.updated_at).toLocaleDateString()}</small></button>)}</div></section>}
   {tab==='notes'&&<section className="panel"><div className="panel-head"><div><span className="eyebrow">RESEARCH JOURNAL</span><h2>Project notes</h2><p>Notes are saved to the selected project.</p></div><FileText size={24}/></div><label>Note title<input value={noteTitle} onChange={e=>setNoteTitle(e.target.value)} maxLength={160}/></label><label>Note body<textarea rows={4} value={noteBody} onChange={e=>setNoteBody(e.target.value)} maxLength={20000}/></label><button className="primary" onClick={addNote}><Save size={16}/> Save note</button><div className="project-list">{notes.map(n=><article className="note-card" key={n.id}><strong>{n.title}</strong><small>{new Date(n.created_at).toLocaleString()}</small><p>{n.body}</p></article>)}</div></section>}
   <footer className="footer"><span>CRISPER Studio · local-first research prototype</span><span>Not for clinical or wet-lab use</span></footer>
  </main>
 </div>
}
