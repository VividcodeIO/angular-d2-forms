import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnableDisableControlsComponent } from './components/enable-disable-controls/enable-disable-controls.component';
import { ShowHideControlsComponent } from './components/show-hide-controls/show-hide-controls.component';
import { DependencyValuesComponent } from './components/dependency-values/dependency-values.component';
import { FormValidationComponent } from './components/form-validation/form-validation.component';
import { UseFormValuesComponent } from './components/use-form-values/use-form-values.component';
import { SetControlValuesComponent } from './components/set-control-values/set-control-values.component';
import { CustomFormFieldEditorsComponent } from './components/custom-form-field-editors/custom-form-field-editors.component';
import { ExampleHomeComponent } from './components/example-home/example-home.component';
import { FormArrayValuesComponent } from './components/form-array-values/form-array-values.component';
import { CustomFormGroupEditorComponent } from './components/custom-form-group-editor/custom-form-group-editor.component';
import { DynamicFormConfigComponent } from './components/dynamic-form-config/dynamic-form-config.component';
import { FormSectionsComponent } from './components/form-sections/form-sections.component';

const routes: Routes = [
  {
    path: 'enable-disable-controls',
    component: EnableDisableControlsComponent,
  },
  {
    path: 'show-hide-controls',
    component: ShowHideControlsComponent,
  },
  {
    path: 'dependency-values',
    component: DependencyValuesComponent,
  },
  {
    path: 'form-validation',
    component: FormValidationComponent,
  },
  {
    path: 'use-form-values',
    component: UseFormValuesComponent,
  },
  {
    path: 'set-control-values',
    component: SetControlValuesComponent,
  },
  {
    path: 'custom-form-field-editors',
    component: CustomFormFieldEditorsComponent,
  },
  {
    path: 'form-array-values',
    component: FormArrayValuesComponent,
  },
  {
    path: 'custom-form-group-editor',
    component: CustomFormGroupEditorComponent,
  },
  {
    path: 'dynamic-form-config',
    component: DynamicFormConfigComponent,
  },
  {
    path: 'form-sections',
    component: FormSectionsComponent,
  },
  {
    path: '',
    component: ExampleHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
