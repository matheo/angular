# @myndpm/dyn-forms

Abstract layer to easily generate Dynamic Forms on Angular.

From a Configuration Object, this library is able to load Dynamic Controls
and create the Form Controls hierarchy from it. Each control configuration supports the default
options of the Angular's Form Framework, and aims to facilitate the required setup of Angular Forms,
being able to focus the development in the bussines logic.

The general overview is shown at this [Prezi-ntation](https://prezi.com/view/4Ok1bgCWvf0g26FMVwfx/)

## Installation

Add this library to your Angular project:

```bash
npm install @myndpm/dyn-forms
```

and import the Dynamic-Form-Material module with:

```typescript
import { DynFormsMaterialModule } from '@myndpm/dyn-forms/material';

@NgModule({
  imports: [
    DynFormsMaterialModule.forFeature(),
```

you also can provide your own DynControls (explained later):

```typescript
import { DynFormsModule } from '@myndpm/dyn-forms';

@NgModule({
  imports: [
    DynFormsModule.forFeature({
      controls: [
        {
          control: SelectComponent.dynControl, // 'MYSELECT'
          component: SelectComponent,
        },
        {
          control: InputComponent.dynControl, // 'MYINPUT'
          component: InputComponent,
        },
      ],
    }),
```

where [SelectComponent](https://github.com/matheo/angular/blob/master/libs/forms/material/src/components/select/select.component.ts)
and [InputComponent](https://github.com/matheo/angular/blob/master/libs/forms/material/src/components/input/input.component.ts)
are already implemented in `DynFormsMaterialModule`.

Then with the provided controls you could use them in a Config like this:

```typescript
export class MyFormComponent {
  form = new FormGroup({});

  controls: DynFormControls = [
    {
      control: 'MYSELECT',
      instance: 'CONTROL',
      name: 'option',
      params: {
        label: 'Pick an Option',
        options: [
          { text: 'Option 1', value: 1 },
          { text: 'Option 2', value: 2 },
        ],
      },
    },
    {
      control: 'MYINPUT',
      instance: 'CONTROL',
      name: 'quantity',
      params: {
        label: 'Quantity',
        type: 'number',
      },
      options: { validators: [Validators.required] },
    },
  ];
}
```

and pass it them to the `dyn-form` component in its template:

```html
<dyn-form [controls]="controls" [form]="form"></dyn-form>
```

and that's it!
now you can customize its styles and build some custom controls.

## Helpers

The `DynFormsMaterialModule` provides a typed _Factory Method_ to easily create
the config objects corresponding to its DynControls; the controls config can look like:

```typescript
import { createConfig } from '@myndpm/dyn-forms/material';

export class MyFormComponent {
  controls: DynFormControls = [
    createConfig('CARD', {
      name: 'group',
      params: { title: 'My Card' },
      controls: [
        createConfig('INPUT', {
          name: 'firstName',
          params: { label: 'First Name' },
          options: { validators: [Validators.required] },
        }),
        createConfig('INPUT', {
          name: 'lastName',
          params: { label: 'Last Name' },
          options: { validators: [Validators.required] },
        }),
      ],
    }),
  ];
}
```

This factory will warn you if the provided Config doesn't correspond to the ControlType,
like if you try to set an `action` param for the `CARD` which is not supported.

## DynControl

A Dynamic Control has a `DynControlType` which acts as an ID to be invoked in the config.
It's stored in the `static dynControl` property as a convention to locate it easily.

Once instantiated, the library fills the corresponding `config`, sets the `control` to the
corresponding instance (`FormControl`, `FormGroup` or `FormArray`) and pass any `params` values
specified in the config, as a plain value or as an Observable.

From there, the component is autonomous to do anything to accomplish its purpose.

## Extending

You can check the example [source code of @myndpm/dyn-forms/material](https://github.com/matheo/angular/tree/master/libs/forms/material/src) and learn from its internals.
Basically your custom controls need to extend the respective `abstract class`
(`DynFormControl`, `DynFormArray`, `DynFormGroup` or `DynFormContainer`).

Those abstract classes builds the Form Control hierarchy as specified in the Config Object,
and compose the `AbstractFormControl` in the `control` property.

You just need to implement the `completeParams` method, which is useful to ensure that any
configured parameters will have any required field(s) and the component won't break.

As mentioned in the _Installation_ section, you can provide your controls with the useful
`DynFormsModule.forFeature({ controls })` that saves any boilerplate.

## Share your Feedback

Please share your experience and ideas!  
impressions, sugestions, improvements, use cases, are welcome at [GitHub Discussions](https://github.com/matheo/angular/discussions).  
as usual, please report any [Issue](https://github.com/matheo/angular/issues/new?labels=bug&template=bug-report.md)
or request a [Feature](https://github.com/matheo/angular/issues/new?labels=enhancement&template=feature-request.md).

Enjoy!
