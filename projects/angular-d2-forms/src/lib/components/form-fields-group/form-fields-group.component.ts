import { Component, Injector, Input, OnChanges, TemplateRef, ViewChild } from '@angular/core';
import {
  FORM_FIELD,
  FormFieldConfig,
  FormFieldsGroupConfig,
  includesInFieldPaths,
  SECTION_FIELDS,
  SECTION_NAME,
  SECTION_TEMPLATE
} from '../../form';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import groupBy from 'lodash.groupby';
import sortBy from 'lodash.sortby';
import get from 'lodash.get';

@Component({
  selector: 'ad2forms-form-fields-group',
  templateUrl: './form-fields-group.component.html',
  styleUrls: ['./form-fields-group.component.css'],
})
export class FormFieldsGroupComponent implements OnChanges {
  @Input() config: FormFieldsGroupConfig<any>;
  @Input() hiddenFormFields: Observable<string[]>;
  _formFields$: Observable<FormFieldConfig<any>[]>;
  _enableSections$: Observable<boolean>;
  _fieldsBySection$: Observable<any>;
  @ViewChild('formFieldsTemplateRef', {static: true}) formFieldsTemplateRef: TemplateRef<any>;

  constructor(public injector: Injector) {

  }


  ngOnChanges() {
    this._formFields$ = this.hiddenFormFields.pipe(
      map((hiddenFormFields) =>
        this.config.fields.filter(field => !includesInFieldPaths(hiddenFormFields, field.fieldPathString))),
    );
    this._enableSections$ = this._formFields$.pipe(
      map(fields => this._enableSections(fields)),
    );
    this._fieldsBySection$ = this._formFields$.pipe(
      filter(fields => this._enableSections(fields)),
      map(fields => groupBy(fields, f => f.section || 'default')),
      map(fieldsBySection => {
        const sections = sortBy(Object.keys(fieldsBySection), section =>
          (get(this.config, 'sectionConfig.orders', [])).indexOf(section), s => s);
        return sections.map(section => {
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
      }),
    );
  }

  private _enableSections(fields: FormFieldConfig<any>[]): boolean {
    return get(this.config, 'sectionConfig.component') && fields.some(v => !!v.section);
  }
}
