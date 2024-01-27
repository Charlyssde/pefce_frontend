export const environment = {
  production: true,
  apiUrl: window.location.origin+'/api',  // SEFIPLAN
  uriZoom: window.location.origin + '/zoomCallback', // ZOOM CALLBACK - sefiplan
  mapBoxToken: 'pk.eyJ1IjoiYW13YXNoIiwiYSI6ImNrdGtzazhyMTFveW0yd3FqejRkYmhiOWcifQ.x9EGAIGGBMjqx1tZdh55ZQ',
  mailGunApiKey: 'd6c422499c177afc88a55691f22d3ca5-8ed21946-14b4e739',
  mailGunApiBaseUrl: 'https://api.mailgun.net/v3/sandboxdc3f3aa8a50b4e0f987febb975cfa5dd.mailgun.org',
  passTemporal: 'Anfjah2390@12mads.',
  //dominioFront: 'http://centos7.soluto.mx',
  dominioFront: 'https://tuestadoindustrial.veracruz.gob.mx',

  // ZOOM S2S GENERAL
  zoomAccountCredentialsEndpoint:'https://zoom.us/oauth/token',
  zoomAPICallsEndpoint: 'https://api.zoom.us/v2/users/',
  zoomUserId: 'sedecop.zoom@gmail.com',
  zoomUserPwd: 'SDCP.20xx',
  zoomAccountId: 'wm3yn87tQkeggl5B-1Li_g',
  zoomClientId: 'leUaxPQRBiR_W_InZWUMQ',
  zoomClientSecret: 'x1gfsbJqXKqjLKlAtsbJ4XTdxMDx4Co0',
  zoomSecretToken_Features: 'ByfjTXrOTciackp38akoCQ',
  zoomSecretVerification_Features: 'bHnpXfz2QgKs5XvchkAhhQ',

}

import 'zone.js/dist/zone-error';  // Included with Angular CLI.
