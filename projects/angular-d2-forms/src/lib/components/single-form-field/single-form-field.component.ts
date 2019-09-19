import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, Input, ViewChild } from '@angular/core';
import { SingleFormFieldConfig } from '../../form';
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { FormComponent } from '../form/form.component';
import { FormFieldEditorComponent } from '../form-field-editor/form-field-editor.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'ad2forms-single-form-field',
  templateUrl: './single-form-field.component.html',
  styleUrls: ['./single-form-field.component.css'],
})
export class SingleFormFieldComponent implements AfterViewInit {
  @Input() formId: string;
  @Input() config: SingleFormFieldConfig<any, any>;
  @Input() form: FormComponent<any>;
  @Input() hiddenFormFields: Observable<string[]>;
  @ViewChild(CdkPortalOutlet, {static: true}) _portalOutlet: CdkPortalOutlet;

  @HostBinding('class')
  get hostClasses(): string {
    return this.config ? [
      'ad2forms-field--name-' + this.config.fieldName,
      'ad2forms-field--type-' + this.config.fieldType
    ].join(' ') : '';
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    const componentRef = this._portalOutlet.attachComponentPortal(
      new ComponentPortal<FormFieldEditorComponent<any>>(this.config.componentType));
    const instance = componentRef.instance;
    instance.formFieldConfig = this.config;
    instance.form = this.form;
    instance.hiddenFormFields = this.hiddenFormFields;
    this.changeDetectorRef.detectChanges();
  }

}
