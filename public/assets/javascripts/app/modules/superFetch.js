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
  let reqUrl = req.url;
  const reqObj = {
    method: req.type
  };

  if (req.type === 'GET' || req.type === 'DELETE') {
    reqUrl += `${req.data}/`;
  }

  if (req.type === 'POST') {
    reqObj.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    reqObj.body = JSON.stringify(req.data);
  }

  return fetch(reqUrl, reqObj)
    .then(handleErrors)
    .then(payload => ({ payload }))
    .catch(err => ({ err }));
};

export default superFetch;
