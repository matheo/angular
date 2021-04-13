import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './layout/item/item.component';
import { MenuComponent } from './layout/menu/menu.component';
import { SectionActionsComponent } from './layout/section-actions/section-actions.component';
import { SectionBadgesComponent } from './layout/section-badges/section-badges.component';
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
    MatTooltipModule,
    RouterModule,
  ],
  declarations: [
    ThemeComponent,
    MenuComponent,
    SectionComponent,
    SectionActionsComponent,
    SectionBadgesComponent,
    ItemComponent,
  ],
  exports: [
    ThemeComponent,
    SectionComponent,
    SectionActionsComponent,
    SectionBadgesComponent,
    ItemComponent,
    // modules
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
  ],
})
export class SharedModule {}
