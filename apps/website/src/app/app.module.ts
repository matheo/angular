import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatNativeDateModule } from '@matheo/datepicker';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';

const routes: Routes = [
  {
    path: 'demos',
    loadChildren: () =>
      import('./demos/demos.module').then((m) => m.DemosModule),
  },
  {
    path: 'lab',
    loadChildren: () => import('./lab/lab.module').then((m) => m.LabModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
    MatNativeDateModule,
    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
