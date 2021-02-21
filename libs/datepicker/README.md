# @matheo/datepicker

Fork of the official Material Datepicker for Angular with timepicker support.

The datepicker allows users to enter a date either through text input, or by choosing a date from the calendar.  
It is made up of several components and directives that work together.

Further documentation can be found at the official docs:
<https://material.angular.io/components/datepicker/overview>

```html
<mat-form-field>
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker" formControlName="datetime" />
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker type="datetime"></mat-datepicker>
</mat-form-field>
```

The `mat-datepicker` has the following _input_ parameters:

- `type`: `date | datetime | time | month | year` output type and available views. default: date
- `startView`: `multi-year | year | month | hour | minute` initial view to load. default: month
- `startAt`: start Date, otherwise the current selected value
- `clockStep`: interval to use in the clock view. default: 1
- `twelveHour`: whether to use 12 or 24 hrs format. default: true
- `touchUi`: calendar UI mode. default: false
- `disabled`: whether the datepicker pop-up should be disabled
- `matDatepicker`: whether the datepicker is connected to a date type one

and the `input[matDatepicker]` has the _output_:

- `dateChange`: Emits when a `change` event is fired on this `<input>`.
- `dateInput`: Emits when a `input` event is fired on this `<input>`.

## Installation

As usual run `yarn add @matheo/datepicker` or `npm install @matheo/datepicker`.  
Now add the modules to your Angular Module:

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
so it's recommended to be imported in your root Module.

## Date Formats Customization

This fork uses an extended set of DateFormats,  
so please check [this file](https://github.com/matheo/angular/blob/master/libs/datepicker/src/core/datetime/native-date-formats.ts) if you're building your own.

## Usage Examples

### DateTime picker (year, month, date and clock views)

```html
<mat-datepicker type="datetime" clockStep="5" #datetimePicker></mat-datepicker>
```

### DateTime picker (starting on the clock view)

```html
<mat-datepicker type="datetime" startView="clock" #clockPicker></mat-datepicker>
```

### Time picker (clock views, with 5 minutes jump)

```html
<mat-datepicker type="time" clockStep="5" #timePicker></mat-datepicker>
```

Enjoy!
