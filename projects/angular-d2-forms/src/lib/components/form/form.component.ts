import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormConfig, FormDescriptor, FormTransformation } from '../../form';
import { FormBuilderService } from '../../services/form-builder.service';
import { Store } from '@ngrx/store';
import { InitAction, UpdateValueAction } from '../../store/action';
import { FormService } from '../../services/form.service';
import { selectFormState } from '../../store/state';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormTransformationService } from '../../services/form-transformation.service';

@Component({
  selector: 'ad2forms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() formDescriptor: FormDescriptor<any>;
  @Input() initValue: any;
  @Input() transformations: FormTransformation<any>[];
  formConfig$: Observable<FormConfig<any>>;

  constructor(private formBuilderService: FormBuilderService,
              private formTransformationService: FormTransformationService,
              private formService: FormService,
              private store: Store<any>) {
  }

  get formId(): string {
    return this.formDescriptor.id;
  }

  ngOnInit() {
    this.formTransformationService.set(this.formId, this.transformations);
    this.formConfig$ = this.store.select(selectFormState(this.formId)).pipe(
      map(state => {
        const formConfig = this.formBuilderService.build(state.descriptor);
        formConfig.formGroup.valueChanges.subscribe(value => this.store.dispatch(new UpdateValueAction({
          formId: this.formId,
          value,
        })));
        formConfig.formGroup.patchValue(state.value, {
          emitEvent: false,
        });
        this.formService.addForm(this.formId, formConfig.formGroup);
        return formConfig;
      })
    );

    this.store.dispatch(new InitAction({
      descriptor: this.formDescriptor,
      value: this.initValue,
    }));
  }

  ngOnDestroy(): void {
    this.formService.removeForm(this.formDescriptor.id);
  }

}
