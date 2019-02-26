import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, ViewChild } from '@angular/core';
import { SingleFormFieldConfig } from '../../form';
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { FieldEditorComponentService } from '../../services/field-editor-component.service';
import { Store } from '@ngrx/store';
import { selectFields } from '../../store/state';
import { distinctUntilChanged } from 'rxjs/operators';
import isEqual from 'lodash.isequal';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'ad2forms-single-form-field',
  templateUrl: './single-form-field.component.html',
  styleUrls: ['./single-form-field.component.css']
})
export class SingleFormFieldComponent implements AfterViewInit, OnDestroy {
  @Input() formId: string;
  @Input() config: SingleFormFieldConfig<any, any>;
  @ViewChild(CdkPortalOutlet) _portalOutlet: CdkPortalOutlet;

  @HostBinding('class')
  get hostClasses(): string {
    return this.config ? [
      'ad2forms-field--name-' + this.config.fieldName,
      'ad2forms-field--type-' + this.config.fieldType
    ].join(' ') : '';
  }

  private _instance: any;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private fieldEditorComponentService: FieldEditorComponentService,
              private store: Store<any>) {
  }

  ngAfterViewInit(): void {
    const componentRef = this._portalOutlet.attachComponentPortal(new ComponentPortal<any>(this.config.componentType));
    const instance = componentRef.instance;
    instance.formFieldConfig = this.config;
    instance.dependencyValues =
      this.config.dependencies.length > 0 ?
        this.store.select(selectFields(this.formId, this.config.dependencies)).pipe(
          distinctUntilChanged(isEqual)
        ) : EMPTY;
    this.fieldEditorComponentService.registerComponent(this.formId, instance);
    this.changeDetectorRef.detectChanges();
    this._instance = instance;
  }

  ngOnDestroy(): void {
    if (this._instance) {
      this.fieldEditorComponentService.unregisterComponent(this.formId, this._instance);
    }
  }

}
