let APIURL = '';

switch (window.location.hostname) {
  case 'localhost' || '127.0.0.1':
    break;

  default:
    APIURL = 'http://localhost:3001';
}

export default APIURL;
