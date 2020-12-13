import { Routes } from '@angular/router';
import { ImageSearchPageComponent } from './image-search-page/image-search-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ImageSearchPageComponent,
  },
];
