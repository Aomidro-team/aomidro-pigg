import connectSocket from './connectSocket';

fetch('/api/auth', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  // TODO: change to login
  body: JSON.stringify({
    username: 'hoge',
    password: 'hoge'
  })
})
.then(response => response.json())
.then(json => {
  connectSocket(json.token);
});
