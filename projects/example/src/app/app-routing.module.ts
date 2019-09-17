import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnableDisableControlsComponent } from './components/enable-disable-controls/enable-disable-controls.component';
import { ShowHideControlsComponent } from './components/show-hide-controls/show-hide-controls.component';
import { DependencyValuesComponent } from './components/dependency-values/dependency-values.component';
import { FormValidationComponent } from './components/form-validation/form-validation.component';
import { UseFormValuesComponent } from './components/use-form-values/use-form-values.component';
import { SetControlValuesComponent } from './components/set-control-values/set-control-values.component';
import { CustomFormFieldEditorsComponent } from './components/custom-form-field-editors/custom-form-field-editors.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
