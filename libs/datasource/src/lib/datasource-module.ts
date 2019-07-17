import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DataSourceContainer } from './container';
import {
  DataSourceContent,
  DataSourceEmpty,
  DataSourceError,
  DataSourceLoading
} from './directives';
import { DataSourceOverlay } from './overlay';
import { DataSourcePipe } from './datasource-pipe';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [
    DataSourceContainer,
    DataSourceContent,
    DataSourceEmpty,
    DataSourceError,
    DataSourceLoading,
    DataSourceOverlay,
    DataSourcePipe
  ],
  exports: [
    MatProgressSpinnerModule,
    DataSourceContainer,
    DataSourceContent,
    DataSourceEmpty,
    DataSourceError,
    DataSourceLoading,
    DataSourcePipe
  ]
})
export class MatDataSourceModule {}
