import { Routes } from '@angular/router';

const routesConfig: Routes = [
  {
    path: 'view-promo',
    loadChildren: () =>
      import('../../components/screen-view/screen-view.module').then(
        (m) => m.ScreenViewModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('../../components/main/main.module').then((m) => m.MainModule),
  },
];

console.log('RoutesConfig Archivo de Rutas Cargado');

export default routesConfig;
