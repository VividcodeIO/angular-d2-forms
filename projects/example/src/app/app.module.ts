import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularD2FormsModule, FieldEditorRegistryService } from '@vividcode/angular-d2-forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularD2FormsMaterialModule } from '@vividcode/angular-d2-forms-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormEditorUserAliasComponent } from './components/form-editor-user-alias/form-editor-user-alias.component';
import { EffectsModule } from '@ngrx/effects';
import { FormEditorCascadingSelectComponent } from './components/form-editor-cascading-select/form-editor-cascading-select.component';
import { MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

export function registerFormEditors(service: FieldEditorRegistryService) {
  const func = () => {
    service.registerField('alias', 'UserAlias', FormEditorUserAliasComponent);
    service.registerGlobal('cas-select', FormEditorCascadingSelectComponent);
  };
  return func;
}

@NgModule({
  declarations: [
    AppComponent,
    FormEditorUserAliasComponent,
    FormEditorCascadingSelectComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularD2FormsModule,
    AngularD2FormsMaterialModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'NgRx DevTools',
    }),
    MatSelectModule,
  ],
  entryComponents: [
    FormEditorUserAliasComponent,
    FormEditorCascadingSelectComponent,
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: registerFormEditors, deps: [FieldEditorRegistryService], multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
