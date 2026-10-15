const { contextBridge, ipcRenderer } = require('electron');
const invoke = (channel, payload) => ipcRenderer.invoke(channel, payload);
contextBridge.exposeInMainWorld('crisperDesktop', {
 projects: { list: () => invoke('db:projects:list'), create: input => invoke('db:projects:create', input) },
 sequences: { list: projectId => invoke('db:sequences:list', projectId), create: input => invoke('db:sequences:create', input) },
 simulations: { list: projectId => invoke('db:simulations:list', projectId), create: input => invoke('db:simulations:create', input) },
 notes: { list: projectId => invoke('db:notes:list', projectId), create: input => invoke('db:notes:create', input) },
 audit: { list: () => invoke('db:audit:list') }
});
