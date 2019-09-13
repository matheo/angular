# Reactive Datasource

<a href="https://opensource.org/licenses/MIT"><img src="http://img.shields.io/badge/license-MIT-brightgreen.svg" alt="MIT badge"/></a>
<a href="https://david-dm.org/matheo/datasource"><img src="https://david-dm.org/matheo/datasource.svg" alt="npm dependencies"/></a>
<a href="https://david-dm.org/matheo/datasource?type=dev"><img src="https://david-dm.org/matheo/datasource/dev-status.svg" alt="npm devDependencies"/></a>

This library provides an abstract `ReactiveDataSource` and `MatDataSource` classes to build custom datasources on Angular.

You can pass it to a Material Table:

```
<mat-datasource [dataSource]="source">
  <mat-table [dataSource]="source">
    ...
  </mat-table>
  <footer [attr.hidden]="source.total <= source.pageSize ? '' : null">
    <mat-paginator
      [length]="source.total"
      [pageSize]="source.pageSize"
    ></mat-paginator>
  </footer>
</mat-datasource>

```

Or consume it via the `dataSource` pipe:

```
<ng-container *ngIf="source | dataSource as items">
  <mat-nav-list>
    <mat-list-item *ngFor="let item of items">
      ...
    </mat-list-item>
  </mat-nav-list>
</ng-container>
```

## Demo

An example of how it can work with a Firebase backend it's here:  
https://stackblitz.com/edit/matdatasource

And the concepts behind are explained here:  
https://medium.com/@matheo/reactive-datasource-for-angular-1d869b0155f6
