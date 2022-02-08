# @matheo/datepicker

Fork of the official Material Datepicker for Angular with time picking support.

The datepicker allows users to enter a date either through text input, or by choosing a date from the calendar.

## Installation

As usual, just execute

```bash
npm install @matheo/datepicker
# or
yarn add @matheo/datepicker
```

Then add the modules to your Angular module, or replace the ones imported from `@angular/material/datepicker` with these:

```typescript
import { MatDatepickerModule } from '@matheo/datepicker';
import { MatNativeDateModule } from '@matheo/datepicker/core';

@NgModule({
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    ...
  ],
  ...
})
export class AppModule {}
```

**Note** that the `MatDatepickerModule` can be loaded into feature modules,  
but it requires the providers given by `MatNativeDateModule`,
so it's recommended to import the former in your root Module.
There's the `MatLuxonDateModule` at `@matheo/datepicker/luxon`
if you use luxon in your application.

```html
<mat-form-field>
  <mat-label>Choose a datetime</mat-label>
  <input matInput [matDatepicker]="picker" formControlName="datetime" />
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker type="datetime" #picker></mat-datepicker>
</mat-form-field>
```

## Theming

This module supports the Angular Material prebuilt themes that can be included in `angular.json`:

```json
"styles": [
  "node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
  "node_modules/@matheo/datepicker/prebuilt-themes/indigo-pink.css",
],
```

available themes are `deeppurple-amber`, `indigo-pink`, `pink-bluegrey` and `purple-green`.

Or you can use your customized Material Theme via mixins:

### Angular 12+

```sass
@use '@angular/material' as mat;
@use '@matheo/datepicker/theming' as datepicker;

mat.$theme-ignore-duplication-warnings: true;

@include mat.core();
...
@include mat.all-component-themes($theme);
@include datepicker.theme($theme)
```

and add `node_modules` to your preprocessor options in your`angular.json`:

```json
"projects": {
  "[your-project]": {
    "architect": {
      "build": {
        ...
        "stylePreprocessorOptions": {
          "includePaths": ["node_modules"]
        }
      }
    }
  }
```

For Angular 11 please use @matheo/datepicker@11.2.17.

## API

Some relevant _input_ parameters of the `mat-datepicker`:

- `type`: `date | datetime | time | month | year` output type. default: date
- `startView`: `multi-year | year | month | hour | minute` initial view to load. default: month
- `startAt`: start Date, otherwise the current selected value
- `clockStep`: interval to use in the minute view. default: 1
- `twelveHour`: whether to use 12 or 24 hrs format. default: true
- `color`: `primary | accent | warn`
- `touchUi`: calendar UI mode. default: false
- `dateClass`: function that can be used to add custom CSS classes to dates

and `matInput[matDatepicker]` can receive:

- `matDatepickerFilter`: function of `(D, DateUnit?) => boolean` to exclude with a particular algorithm.

For a complete API reference please check the official docs: <https://material.angular.io/components/datepicker/api>

## Internationalization

The message strings used in the datepicker's UI can be overriden providing a subclass of [MatDatepickerIntl](https://github.com/matheo/angular/blob/master/libs/datepicker/src/lib/datepicker-intl.ts) with the translated values in your application root module.

### Date Formats Customization

The display and parse formats used by the datepicker can be overriden providing a custom configuration of [MatDateFormats](https://github.com/matheo/angular/blob/master/libs/datepicker/src/core/datetime/native-date-formats.ts) via the `MAT_DATE_FORMATS` token from `@angular/material/core`, and using the `NativeDateModule` instead the `Mat`-prefixed version which does not include the default formats like:

```typescript
@NgModule({
  imports: [MatDatepickerModule, NativeDateModule],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          ...
        },
        display: {
          ...
        }
      }
    }
  ],
})
```

More information in the official docs: <https://material.angular.io/components/datepicker/overview#internationalization>.

## Usage Examples

### Datepicker by default

```html
<mat-datepicker type="date" #datePicker></mat-datepicker>
```

### DateTime picker (year, month, date and clock views)

```html
<mat-datepicker type="datetime" #datetimePicker></mat-datepicker>
```

### With accent color (starting on the year view)

```html
<mat-datepicker
  color="accent"
  type="datetime"
  startView="year"
  #clockPicker
></mat-datepicker>
```

### Time picker (clock view with 24 hours format)

```html
<mat-datepicker type="time" [twelveHour]="false" #timePicker></mat-datepicker>
```

### Month picker

```html
<mat-datepicker type="month" #monthPicker></mat-datepicker>
```

### Year picker

```html
<mat-datepicker type="year" #yearPicker></mat-datepicker>
```

See the [source code](https://github.com/matheo/angular/blob/master/apps/website/src/app/demos/components/datepicker/datepicker.component.html) of the [demo page](http://matheo.co/demos/datepicker) for more insights.

Further documentation can be found at the official docs:
<https://material.angular.io/components/datepicker/overview>

Enjoy!
