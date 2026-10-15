const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const Database = require('better-sqlite3');
let db;
const now=()=>new Date().toISOString();
function initDb(){
 db=new Database(path.join(app.getPath('userData'),'crisper-studio.sqlite'));
 db.pragma('journal_mode = WAL'); db.pragma('foreign_keys = ON');
 db.exec(fs.readFileSync(path.join(__dirname,'schema.sql'),'utf8'));
 if(db.prepare('SELECT COUNT(*) AS n FROM projects').get().n===0){
  const id=crypto.randomUUID(),t=now();
  db.prepare('INSERT INTO projects(id,name,description,created_at,updated_at) VALUES(?,?,?,?,?)').run(id,'My first project','Computational sequence analysis workspace',t,t);
 }
}
function audit(type,id,detail=''){db.prepare('INSERT INTO audit_events(event_type,entity_id,detail,created_at) VALUES(?,?,?,?)').run(type,id||null,String(detail).slice(0,500),now())}
function registerIpc(){
 ipcMain.handle('db:projects:list',()=>db.prepare('SELECT * FROM projects ORDER BY updated_at DESC').all());
 ipcMain.handle('db:projects:create',(_,x)=>{if(!x||typeof x.name!=='string'||!x.name.trim())throw Error('Project name is required');const id=crypto.randomUUID(),t=now();db.prepare('INSERT INTO projects(id,name,description,created_at,updated_at) VALUES(?,?,?,?,?)').run(id,x.name.trim().slice(0,120),String(x.description||'').slice(0,2000),t,t);audit('project.created',id,x.name);return db.prepare('SELECT * FROM projects WHERE id=?').get(id)});
 ipcMain.handle('db:sequences:list',(_,id)=>db.prepare('SELECT * FROM sequences WHERE project_id=? ORDER BY created_at DESC').all(id));
 ipcMain.handle('db:sequences:create',(_,x)=>{if(!x||typeof x.projectId!=='string'||typeof x.name!=='string'||typeof x.sequence!=='string')throw Error('Invalid sequence record');const sequence=x.sequence.toUpperCase().replace(/\s/g,'');if(!sequence||sequence.length>1000000||!/^[ACGTN]+$/.test(sequence))throw Error('Sequence must contain A, C, G, T, N and be at most 1,000,000 bases');if(!x.name.trim())throw Error('Sequence name is required');const id=crypto.randomUUID(),gc=(sequence.match(/[GC]/g)||[]).length/sequence.length*100;db.prepare('INSERT INTO sequences(id,project_id,name,sequence,length,gc_percent,created_at) VALUES(?,?,?,?,?,?,?)').run(id,x.projectId,x.name.trim().slice(0,120),sequence,sequence.length,gc,now());audit('sequence.created',id,'length='+sequence.length);return db.prepare('SELECT * FROM sequences WHERE id=?').get(id)});
 ipcMain.handle('db:simulations:list',(_,id)=>db.prepare('SELECT * FROM simulations WHERE project_id=? ORDER BY created_at DESC').all(id).map(x=>({...x,input:JSON.parse(x.input_json),result:JSON.parse(x.result_json)})));
 ipcMain.handle('db:simulations:create',(_,x)=>{if(!x||typeof x.projectId!=='string'||typeof x.kind!=='string'||x.result===undefined)throw Error('Invalid simulation record');const id=crypto.randomUUID(),t=now(),input=JSON.stringify(x.input||{}),result=JSON.stringify(x.result);if(input.length>1000000||result.length>1000000)throw Error('Simulation record is too large');db.prepare('INSERT INTO simulations(id,project_id,sequence_id,kind,input_json,result_json,created_at) VALUES(?,?,?,?,?,?,?)').run(id,x.projectId,x.sequenceId||null,x.kind.slice(0,100),input,result,t);audit('simulation.created',id,x.kind);return {id,project_id:x.projectId,sequence_id:x.sequenceId||null,kind:x.kind,input:x.input||{},result:x.result,created_at:t}});
 ipcMain.handle('db:notes:list',(_,id)=>db.prepare('SELECT * FROM notes WHERE project_id=? ORDER BY updated_at DESC').all(id));
 ipcMain.handle('db:notes:create',(_,x)=>{if(!x||typeof x.projectId!=='string'||typeof x.title!=='string'||!x.title.trim())throw Error('Note title is required');const id=crypto.randomUUID(),t=now();db.prepare('INSERT INTO notes(id,project_id,title,body,created_at,updated_at) VALUES(?,?,?,?,?,?)').run(id,x.projectId,x.title.trim().slice(0,160),String(x.body||'').slice(0,20000),t,t);audit('note.created',id,x.title);return db.prepare('SELECT * FROM notes WHERE id=?').get(id)});
 ipcMain.handle('db:audit:list',()=>db.prepare('SELECT * FROM audit_events ORDER BY id DESC LIMIT 100').all());
}
function createWindow(){const win=new BrowserWindow({width:1440,height:940,minWidth:900,minHeight:650,backgroundColor:'#101923',webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true}});if(app.isPackaged)win.loadFile(path.join(__dirname,'..','dist','index.html'));else win.loadURL('http://127.0.0.1:5173')}
app.whenReady().then(()=>{initDb();registerIpc();createWindow();app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()})});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
