const strToObject = str => {
  const obj = {};
  const cookies = str.split('; ');

  cookies.forEach(cookie => {
    const splited = cookie.split('=');
    const key = splited[0];
    const value = splited[1];

    obj[key] = value;
  });

  return obj;
};

const operateCookie = {
  set: obj => {
    const keys = Object.keys(obj);

    keys.forEach(key => {
      document.cookie = `${key}=${obj[key]}`;
    });
  },

  get: str => {
    const cookieObj = strToObject(document.cookie);

    return cookieObj[str];
  },

  remove: key => {
    const pastTime = new Date();
    pastTime.setYear(pastTime.getYear() - 1);

    document.cookie = `${key}=;expires=${pastTime.toGMTString()}`;
  }
};

export default operateCookie;
