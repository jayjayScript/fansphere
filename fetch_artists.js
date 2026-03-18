const https = require('https');

https.get('https://fanspherebackend.vercel.app/api/artists', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.data && Array.isArray(json.data)) {
        const names = json.data.map(artist => artist.name);
        console.log(JSON.stringify(names));
      } else {
        console.log("No data found");
      }
    } catch (e) {
      console.error("Error parsing JSON:", e.message);
    }
  });
}).on('error', (err) => {
  console.error("Error fetching data:", err.message);
});
