
import request from 'request'
import express from 'express'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 3000

var client_id = '';
var client_secret = '';

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
}

app.get('/test-fetch.js', (req, res) => {
  res.sendFile('test-fetch.js', {root: __dirname})
})

app.get('/', (req, res) => {
  res.sendFile('teste.html', {root: __dirname})
})

app.get('/auth-without-login', async (req, res) => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
      res.send(token)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})