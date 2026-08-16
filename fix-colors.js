const fs = require('fs');
const path = require('path');
function replaceColors(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/yellow-400/g, 'blue-500');
  content = content.replace(/yellow-500/g, 'blue-600');
  content = content.replace(/yellow-200/g, 'blue-200');
  content = content.replace(/text-black/g, 'text-white');
  content = content.replace(/bg-white text-white/g, 'bg-white text-zinc-900');
  fs.writeFileSync(filePath, content);
}
const files = [
  './src/App.tsx',
  ...fs.readdirSync('./src/components').filter(f => f.endsWith('.tsx')).map(f => './src/components/'+f),
  ...fs.readdirSync('./src/components/ui').filter(f => f.endsWith('.tsx')).map(f => './src/components/ui/'+f)
];
files.forEach(f => replaceColors(f));
