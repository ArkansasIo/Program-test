export type Project={id:string,name:string,description:string,created_at:string,updated_at:string};
export type SequenceRecord={id:string,project_id:string,name:string,sequence:string,length:number,gc_percent:number,created_at:string};
export type SimulationRecord={id:string,project_id:string,sequence_id:string|null,kind:string,input:unknown,result:unknown,created_at:string};
export type Note={id:string,project_id:string,title:string,body:string,created_at:string,updated_at:string};
type DesktopBridge = {
 projects:{list():Promise<Project[]>;create(input:{name:string;description:string}):Promise<Project>};
 sequences:{list(projectId:string):Promise<SequenceRecord[]>;create(input:{projectId:string;name:string;sequence:string}):Promise<SequenceRecord>};
 simulations:{list(projectId:string):Promise<SimulationRecord[]>;create(input:{projectId:string;sequenceId:string|null;kind:string;input:unknown;result:unknown}):Promise<SimulationRecord>};
 notes:{list(projectId:string):Promise<Note[]>;create(input:{projectId:string;title:string;body:string}):Promise<Note>};
 audit:{list():Promise<unknown[]>};
};
declare global { interface Window { crisperDesktop?: DesktopBridge } }
const key='crisper-studio-v1';
const stamp=()=>new Date().toISOString();
const uid=()=>globalThis.crypto?.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
function localData():Record<string,any>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}}
function saveData(d:Record<string,any>){localStorage.setItem(key,JSON.stringify(d))}
export const store={
 desktop:typeof window!=='undefined' && !!window.crisperDesktop,
 async projects():Promise<Project[]>{if(window.crisperDesktop)return window.crisperDesktop.projects.list();const d=localData();if(!d.projects){const t=stamp();d.projects=[{id:uid(),name:'My first project',description:'Computational sequence analysis workspace',created_at:t,updated_at:t}];saveData(d)}return d.projects},
 async createProject(name:string,description:string):Promise<Project>{if(window.crisperDesktop)return window.crisperDesktop.projects.create({name,description});const d=localData(),t=stamp(),p={id:uid(),name:name.trim(),description,created_at:t,updated_at:t};d.projects=[p,...(d.projects||[])];saveData(d);return p},
 async sequences(projectId:string):Promise<SequenceRecord[]>{if(window.crisperDesktop)return window.crisperDesktop.sequences.list(projectId);return (localData().sequences||[]).filter((x:SequenceRecord)=>x.project_id===projectId)},
 async createSequence(projectId:string,name:string,sequence:string):Promise<SequenceRecord>{if(window.crisperDesktop)return window.crisperDesktop.sequences.create({projectId,name,sequence});const d=localData(),t=stamp(),r={id:uid(),project_id:projectId,name,sequence,length:sequence.length,gc_percent:(sequence.match(/[GC]/g)||[]).length/sequence.length*100,created_at:t};d.sequences=[r,...(d.sequences||[])];saveData(d);return r},
 async simulations(projectId:string):Promise<SimulationRecord[]>{if(window.crisperDesktop)return window.crisperDesktop.simulations.list(projectId);return (localData().simulations||[]).filter((x:SimulationRecord)=>x.project_id===projectId)},
 async createSimulation(projectId:string,sequenceId:string|null,kind:string,input:unknown,result:unknown):Promise<SimulationRecord>{if(window.crisperDesktop)return window.crisperDesktop.simulations.create({projectId,sequenceId,kind,input,result});const d=localData(),r={id:uid(),project_id:projectId,sequence_id:sequenceId,kind,input,result,created_at:stamp()};d.simulations=[r,...(d.simulations||[])];saveData(d);return r},
 async notes(projectId:string):Promise<Note[]>{if(window.crisperDesktop)return window.crisperDesktop.notes.list(projectId);return (localData().notes||[]).filter((x:Note)=>x.project_id===projectId)},
 async createNote(projectId:string,title:string,body:string):Promise<Note>{if(window.crisperDesktop)return window.crisperDesktop.notes.create({projectId,title,body});const d=localData(),t=stamp(),r={id:uid(),project_id:projectId,title,body,created_at:t,updated_at:t};d.notes=[r,...(d.notes||[])];saveData(d);return r},
 async audit():Promise<unknown[]>{if(window.crisperDesktop)return window.crisperDesktop.audit.list();return (localData().audit||[]).slice(0,100)}
};