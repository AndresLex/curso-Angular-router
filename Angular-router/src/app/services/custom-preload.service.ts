import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy {

  constructor() { }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    //implementacion de la estrategia de precarga
    // solo las rutas que tengan data y en data tengan la bandera preload: true
      if(route.data && route.data['preload']){
        return load();
      }
      return of(null)
  }
}
