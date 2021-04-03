# @myndpm/dyn-forms

Abstract layer to easily generate Dynamic Forms for Angular.

With this library we are able to dynamically create the Form Controls hierarchy from a Configuration Object, this is comprised of nested configuration objects which corresponds one-to-one with the form fields.

Each nested field configuration supports the default options from Angular's form framework, while avoiding boilerplate.

The general overview is shown at this [Prezi](https://prezi.com/view/4Ok1bgCWvf0g26FMVwfx/)ntation.

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

where [SelectComponent](https://github.com/Mynd-Management/open-source/blob/master/libs/forms/material/src/components/select/select.component.ts)
and [InputComponent](https://github.com/Mynd-Management/open-source/blob/master/libs/forms/material/src/components/input/input.component.ts)
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
<dyn-form [form]="form" [controls]="controls"></dyn-form>
```

and that's it!  
now you can customize the styles and build some custom controls.

## Helpers

The `DynFormsMaterialModule` provides a typed _Factory Method_ to easily create
the config objects corresponding to its DynControls; for example:

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

This factory will warn you if the provided config object doesn't correspond to the ControlType,
for example if you try to set an `action` parameter for the `CARD` which is not supported.

## DynControl

A Dynamic Control is an Angular component that has a `static dynControl` field which acts as an unique ID.
We can reference any component from the configuration object with this ID.

While creating a new form the library recursively instantiates these Dynamic Controls components, and populates their core fields:

1. Its corresponding `config`,
2. the `control` instance (`FormControl`, `FormGroup` or `FormArray`),
3. any `params` values specified in the config.

From there, we have the required tools for the component to provide any control functionality.

## Extending

You can check out the example [source code of @myndpm/dyn-forms/material](https://github.com/matheo/angular/tree/master/libs/forms/material/src).
Basically your custom controls need to extend the respective `abstract class`
(`DynFormControl`, `DynFormArray`, `DynFormGroup` or `DynFormContainer`).

Those abstract classes build the Form Control hierarchy as specified in the nexted Config Object,
and compose the `AbstractFormControl` in the `control` property.

You just need to implement the `completeParams` method, which is useful to ensure that any
configured parameters will have any required fields and the component won't break.
Also, if you implement OnInit be sure to call the base class too, with `super.ngOnInit()`.

As mentioned in the _Installation_ section, you can provide your controls with the useful
`DynFormsModule.forFeature({ controls })` to avoid boilerplate.

## Share your Feedback

Please share your experience and ideas!  
Impressions, sugestions, improvements, use cases are welcome at [GitHub Discussions](https://github.com/Mynd-Management/open-source/discussions).  
As usual, please report any [Issue](https://github.com/Mynd-Management/open-source/issues/new?labels=bug&template=bug-report.md)
or request a [Feature](https://github.com/Mynd-Management/open-source/issues/new?labels=enhancement&template=feature-request.md).

Enjoy!

&#8722; Mynd.co Frontend Engineering
