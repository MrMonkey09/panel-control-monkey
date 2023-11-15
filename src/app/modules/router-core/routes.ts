import { Routes } from '@angular/router';

const routesConfig: Routes = [
  {
    path: 'view-promo',
    loadChildren: () =>
      import('src/app/components/screen-view/screen-view.module').then(
        (m) => m.ScreenViewModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/components/main/main.module').then((m) => m.MainModule),
  },
];

console.log('RoutesConfig Archivo de Rutas Cargado');

export default routesConfig;
