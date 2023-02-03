import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules/*:## Primer estrategia de Precarga*/} from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService/*:## Segunda estrategia de Precarga*/ } from './services/custom-preload.service';
import { QuicklinkStrategy /*:## Tercer estrategia de Precarga*/ } from 'ngx-quicklink';

import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    }
  },
  // Para renderizar un modulo se hace de la siguiente manera
  // cms "sistema de administracion de contenido" o se puede colocar admin
  // se importa de forma diferente con una arrow function y se resuelve el import con un .then
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  // Cuando en el link no se encuantra nada se representa con **
  {
    path: '**',
    component: NotFoundComponent
  }
];

// ## Segunda estrategia de Precarga
//Para usar el servicio de precarga en el routing principal se hace diferente la estrategia de precarga
// ya no se usa el PreloadAllModules sino con la ayuda del servicio creado: CustomPreloadService


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // ## Primer estrategia de Precarga
    // preloadingStrategy: PreloadAllModules

    // ## Segunda estrategia de Precarga
    // preloadingStrategy: CustomPreloadService

    // ## Tercer estrategia de Precarga
    preloadingStrategy:  QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
