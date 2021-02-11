import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
