import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)
  },
  // Para renderizar un modulo se hace de la siguiente manera
  // cms "sistema de administracion de contenido" o se puede colocar admin
  // se importa de forma diferente con una arrow function y se resuelve el import con un .then
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  // Cuando en el link no se encuantra nada se representa con **
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
