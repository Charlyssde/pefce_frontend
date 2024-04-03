// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  socketUrl : 'http://localhost:8080/socket',
  // apiUrl: 'http://10.1.16.171:8080/FERIAVIRTUAL',
  apiUrl: 'http://localhost:8080',
  //apiUrl: 'http://centos7-103.soluto.mx:8082/FERIAVIRTUAL',
  //socketUrl : 'http://tuestadoindustrial.veracruz.gob.mx:80/socket',
  //apiUrl: 'http://tuestadoindustrial.veracruz.gob.mx:80/',
  uriZoom: window.location.origin + '/zoomCallback',
  mapBoxToken: 'pk.eyJ1IjoiYW13YXNoIiwiYSI6ImNrdGtzazhyMTFveW0yd3FqejRkYmhiOWcifQ.x9EGAIGGBMjqx1tZdh55ZQ',
  mailGunApiKey: 'd6c422499c177afc88a55691f22d3ca5-8ed21946-14b4e739',
  mailGunApiBaseUrl: 'https://api.mailgun.net/v3/mg.soluto.mx',
  passTemporal: 'Anfjah2390@12mads.',
  dominioFront: 'http://localhost:4200',
  // ZOOM S2S
  zoomAccountCredentialsEndpoint:'https://zoom.us/oauth/token',
  zoomAPICallsEndpoint: 'https://api.zoom.us/v2/users/',
  zoomUserId: 'sedecop.zoom@gmail.com',
  zoomUserPwd: 'SDCP.20xx',
  zoomAccountId: 'wm3yn87tQkeggl5B-1Li_g',
  zoomClientId: 'leUaxPQRBiR_W_InZWUMQ',
  zoomClientSecret: 'x1gfsbJqXKqjLKlAtsbJ4XTdxMDx4Co0',
  zoomSecretToken_Features: 'ByfjTXrOTciackp38akoCQ',
  zoomSecretVerification_Features: 'bHnpXfz2QgKs5XvchkAhhQ',
},
  MINIO_ENDPOINT = 'soluto100.dyndns.org',
  MINIO_ACCESS_KEY = 'devx-minio',
  MINIO_SECRET_KEY = 'devx-minio.2021';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
