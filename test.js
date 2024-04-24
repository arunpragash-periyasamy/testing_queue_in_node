const axios = require('axios');

for (i = 1; i <= 50; i++)
axios.post("http://localhost:3000", { "uname": `uname${i}`, id: i });