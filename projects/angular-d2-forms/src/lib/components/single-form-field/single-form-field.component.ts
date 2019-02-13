import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { SingleFormFieldConfig } from '../../form';
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { FieldEditorComponentService } from '../../services/field-editor-component.service';

@Component({
  selector: 'ad2forms-single-form-field',
  templateUrl: './single-form-field.component.html',
  styleUrls: ['./single-form-field.component.css']
})
export class SingleFormFieldComponent implements AfterViewInit, OnDestroy {
  @Input() formId: string;
  @Input() config: SingleFormFieldConfig<any, any>;
  @ViewChild(CdkPortalOutlet) _portalOutlet: CdkPortalOutlet;

  private _instance: any;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private fieldEditorComponentService: FieldEditorComponentService) {
  }

  ngAfterViewInit(): void {
    const componentRef = this._portalOutlet.attachComponentPortal(new ComponentPortal<any>(this.config.componentType));
    componentRef.instance.formFieldConfig = this.config;
    this.fieldEditorComponentService.registerComponent(this.formId, componentRef.instance);
    this.changeDetectorRef.detectChanges();
    this._instance = componentRef.instance;
  }

  ngOnDestroy(): void {
    if (this._instance) {
      this.fieldEditorComponentService.unregisterComponent(this.formId, this._instance);
    }
  }

}
