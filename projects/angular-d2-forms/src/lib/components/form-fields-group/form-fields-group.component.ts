import { Component, Injector, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import {
  FORM_FIELD,
  FormFieldConfig,
  FormFieldsGroupConfig,
  includesInFieldPaths,
  SECTION_FIELDS,
  SECTION_NAME,
  SECTION_TEMPLATE
} from '../../form';
import groupBy from 'lodash.groupby';
import sortBy from 'lodash.sortby';
import get from 'lodash.get';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ad2forms-form-fields-group',
  templateUrl: './form-fields-group.component.html',
  styleUrls: ['./form-fields-group.component.css'],
})
export class FormFieldsGroupComponent implements OnChanges, OnInit, OnDestroy {
  @Input() config: FormFieldsGroupConfig<any>;
  @Input() hiddenFormFields: Observable<string[]>;
  _formFields: FormFieldConfig<any>[];
  _enableSections: boolean;
  _fieldsBySection: any;
  _fieldStyles: any = {
  };
  private _subscription: Subscription;
  @ViewChild('formFieldsTemplateRef', {static: true}) formFieldsTemplateRef: TemplateRef<any>;

  constructor(public injector: Injector) {

  }

  ngOnInit(): void {
    this._subscription = this.hiddenFormFields.subscribe(hiddenFormFields => this._updateFieldClasses(hiddenFormFields));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config && changes.config.currentValue) {
      const config: FormFieldsGroupConfig<any> = changes.config.currentValue;
      const fields: FormFieldConfig<any>[] = config.fields;
      this._formFields = fields;
      this._enableSections = this._shouldEnableSections(fields);
      if (this._enableSections) {
        const fieldsBySection = groupBy(fields, f => f.section || 'default');
        const sections = sortBy(Object.keys(fieldsBySection), section =>
          (get(this.config, 'sectionConfig.orders', [])).indexOf(section), s => s);
        this._fieldsBySection = sections.map(section => {
          const sectionName = section || 'default';
          return Injector.create({
            providers: [
              {
                provide: FORM_FIELD, useValue: this.config.formField,
              },
              {
                provide: SECTION_NAME, useValue: sectionName,
              },
              {
                provide: SECTION_TEMPLATE, useValue: this.formFieldsTemplateRef,
              },
              {
                provide: SECTION_FIELDS, useValue: fieldsBySection[section],
              }
            ],
            parent: this.injector,
          });
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private _shouldEnableSections(fields: FormFieldConfig<any>[]): boolean {
    return get(this.config, 'sectionConfig.component') && fields.some(v => !!v.section);
  }

  private _updateFieldClasses(hiddenFormFields: string[]) {
    this._fieldStyles = this._formFields.reduce((obj, field) => {
      obj[field.fieldPathString] = includesInFieldPaths(hiddenFormFields || [], field.fieldPathString) ? {display: 'none'} : {};
      return obj;
    }, {});
  }
}
