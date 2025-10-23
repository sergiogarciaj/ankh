#!/usr/bin/env node

const { spawn } = require('child_process');
const net = require('net');

function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
    
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    
    server.listen(port);
  });
}

async function startServer() {
  console.log('Checking port 3000...');
  
  const inUse = await isPortInUse(3000);
  
  if (inUse) {
    console.log('Port 3000 is in use. Attempting to start anyway...');
  }
  
  // Set environment variable and start Next.js
  process.env.PORT = '3000';
  
  const nextProcess = spawn('npx', ['next', 'dev', '--port', '3000'], {
    stdio: 'inherit',
    env: { ...process.env, PORT: '3000' }
  });
  
  nextProcess.on('close', (code) => {
    console.log(`Next.js process exited with code ${code}`);
  });
}

startServer();