import { Injectable, NgZone } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardGuard extends KeycloakAuthGuard {
  constructor(
    protected override router: Router,
    protected override keycloakAngular: KeycloakService,
    protected ngZone: NgZone
  ) {
    super(router, keycloakAngular);
  }

  public getUserRoles(): any {
    return this.roles;
  }

  isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        this.router.navigate(['unauthorised']);
        this.keycloakAngular.login();
        return;
      }

      console.log(route.data);
      const requiredRoles = route.data['roles'];
      console.log(requiredRoles);
      console.log(this.roles);

      if (!requiredRoles || requiredRoles.length === 0) {
        this.router.navigate(['unauthorised']);
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          this.router.navigate(['unauthorised']);
          resolve(false);
        }

        let granted: boolean = false;
        for (const requiredRole of requiredRoles) {
          if (this.roles.indexOf(requiredRole) > -1) {
            granted = true;
            break;
          } else {
            this.ngZone
              .run(() => this.router.navigate(['unauthorized']))
              .then();
          }
        }
        resolve(granted);
      }
    });
  }
}
