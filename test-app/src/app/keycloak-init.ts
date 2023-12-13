import { KeycloakService } from 'keycloak-angular';
//import { environment } from './environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> =>
    keycloak.init({
      config: {
        clientId: 'jm_client',
        realm: 'jm',
        url: 'https://154.72.198.229:7070',
      },
      initOptions: {
        onLoad: 'login-required',
        enableLogging: true,
        silentCheckSsoRedirectUri: './assets/silent-check-sso.html',
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['/assets'],
    });
}
