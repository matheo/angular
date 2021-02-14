import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './layout/item/item.component';
import { MenuComponent } from './layout/menu/menu.component';
import { SectionComponent } from './layout/section/section.component';
import { ThemeComponent } from './layout/theme/theme.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    RouterModule,
  ],
  declarations: [
    ThemeComponent,
    MenuComponent,
    SectionComponent,
    ItemComponent,
  ],
  exports: [ThemeComponent, SectionComponent, ItemComponent],
})
export class SharedModule {}
