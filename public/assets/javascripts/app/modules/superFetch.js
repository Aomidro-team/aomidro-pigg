const handleErrors = res => {
  const json = res.json();

  if (!res.ok) {
    return json.then(err => {
      throw Error(err.message);
    });
  }

  return json;
};

const superFetch = req => {
  const reqObj = {
    method: req.type
  };

  if (req.type === 'POST') {
    reqObj.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    reqObj.body = JSON.stringify(req.data);
  }

  return fetch(req.url, reqObj)
    .then(handleErrors)
    .then(payload => ({ payload }))
    .catch(err => ({ err }));
};

export default superFetch;
