import { spawn } from 'child_process';
import fs from 'fs';

async function capture(url, width, outputPath) {
  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--no-sandbox',
    '--disable-gpu',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  // Get target page
  const targetRes = await fetch('http://127.0.0.1:9222/json/new?' + encodeURIComponent(url), { method: 'PUT' });
  const target = await targetRes.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);

  let id = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const reqId = id++;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === reqId) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: reqId, method, params }));
  });

  await new Promise((resolve) => ws.addEventListener('open', resolve));

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: width,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: width < 600,
  });

  await send('Page.navigate', { url });
  await new Promise(r => setTimeout(r, 2000));

  const { data } = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
  });

  fs.writeFileSync(outputPath, Buffer.from(data, 'base64'));
  console.log(`Saved screenshot to ${outputPath} (${data.length} bytes base64)`);

  ws.close();
  chrome.kill();
  await new Promise(r => setTimeout(r, 800));
}

async function run() {
  fs.mkdirSync('screenshots', { recursive: true });
  console.log('Capturing 1440px desktop...');
  await capture('http://localhost:3333/', 1440, 'screenshots/round2-1440-full.png');
  console.log('Capturing 390px mobile...');
  await capture('http://localhost:3333/', 390, 'screenshots/round2-390-full.png');
  console.log('Done!');
}

run();
