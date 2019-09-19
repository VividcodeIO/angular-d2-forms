import { Component } from '@angular/core';
import { FormBuilderService, FormFieldGroupEditorComponent } from '@vividcode/angular-d2-forms';
import { MatDialog } from '@angular/material/dialog';
import { AppSettingsDialogComponent } from '../app-settings-dialog/app-settings-dialog.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-editor-app-settings',
  templateUrl: './form-editor-app-settings.component.html',
  styleUrls: ['./form-editor-app-settings.component.css']
})
export class FormEditorAppSettingsComponent extends FormFieldGroupEditorComponent<any> {

  constructor(public dialog: MatDialog,
              public formBuilderService: FormBuilderService,
              public fb: FormBuilder) {
    super(formBuilderService, fb);
  }

  editSettings() {
    this.dialog.open(AppSettingsDialogComponent, {
      width: '400px',
      data: {
        formFieldConfig: this.formFieldsGroupConfig,
        hiddenFormFields: this.hiddenFormFields,
      },
    });
  }
}
