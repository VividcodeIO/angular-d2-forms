import { Component, Inject, OnInit } from '@angular/core';
import { FormFieldsGroupConfig } from '@vividcode/angular-d2-forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

export interface AppSettingsDialogData {
  formFieldConfig: FormFieldsGroupConfig<any>;
  hiddenFormFields: Observable<string[]>;
}


@Component({
  selector: 'app-app-settings-dialog',
  templateUrl: './app-settings-dialog.component.html',
  styleUrls: ['./app-settings-dialog.component.css']
})
export class AppSettingsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AppSettingsDialogData) {
  }

  ngOnInit() {
  }

}
