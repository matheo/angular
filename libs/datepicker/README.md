# @matheo/datepicker

Fork of the official Material Datepicker for Angular with timepicker support.

The datepicker allows users to enter a date either through text input, or by choosing a date from the calendar.

Further documentation can be found at the official docs:
<https://material.angular.io/components/datepicker/overview>

## Installation

As usual, just execute `yarn add @matheo/datepicker` or `npm install @matheo/datepicker`.  
Then add the modules to your Angular module:

```typescript
import { MatDatepickerModule, MatNativeDateModule } from '@matheo/datepicker';

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

```html
<mat-form-field>
  <mat-label>Choose a datetime</mat-label>
  <input matInput [matDatepicker]="picker" formControlName="datetime" />
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker type="datetime" #picker></mat-datepicker>
</mat-form-field>
```

## API

Some relevant _input_ parameters of the `mat-datepicker`:

- `type`: `date | datetime | time | month | year` output type. default: date
- `startView`: `multi-year | year | month | hour | minute` initial view to load. default: month
- `startAt`: start Date, otherwise the current selected value
- `clockStep`: interval to use in the minute view. default: 1
- `twelveHour`: whether to use 12 or 24 hrs format. default: true
- `color`: `primary | accent | warn`
- `touchUi`: calendar UI mode. default: false

and `matInput[matDatepicker]` can receive:

- `matDatepickerFilter`: date filter to exclude with a particular algorithm.

For a complete API reference please check the official docs: <https://material.angular.io/components/datepicker/api>

## Date Formats Customization

This fork uses an extended set of DateFormats,  
so please check [this file](https://github.com/matheo/angular/blob/master/libs/datepicker/src/core/datetime/native-date-formats.ts) if you're building your own.

## Internationalization

You will need to override the default implementation of [MatDatepickerIntl](https://github.com/matheo/angular/blob/master/libs/datepicker/src/lib/datepicker-intl.ts) and provide its strings.

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

### DateTime picker (starting on the clock view)

```html
<mat-datepicker color="accent" type="datetime" startView="clock" #clockPicker></mat-datepicker>
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

Enjoy!
