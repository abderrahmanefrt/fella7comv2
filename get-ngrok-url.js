import http from 'http';

function check() {
  http.get('http://127.0.0.1:4040/api/tunnels', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.tunnels && parsed.tunnels.length > 0) {
          console.log('\n======================================');
          console.log('ACTIVE NGROK TUNNELS DETECTED:');
          parsed.tunnels.forEach(t => {
            console.log(`- Name: ${t.name}, Proto: ${t.proto}, URL: ${t.public_url}`);
          });
          console.log('======================================\n');
        } else {
          console.log('No tunnels open. Check if ngrok requires authentication (run `npx ngrok config add-authtoken <your-token>`).');
        }
      } catch (e) {
        console.log('Error parsing ngrok response:', e.message);
      }
    });
  }).on('error', (err) => {
    console.log('Ngrok is starting up or not running on port 4040 yet...');
  });
}

check();
