import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormConfig, FormDescriptor, FormTransformation } from '../../form';
import { FormBuilderService } from '../../services/form-builder.service';
import { Store } from '@ngrx/store';
import { InitAction, UpdateValueAction } from '../../store/action';
import { FormService } from '../../services/form.service';
import { selectState } from '../../store/state';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
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
  formConfig: FormConfig<any>;
  _subscription: Subscription;
  _valueChangeSubscription: Subscription;

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

    this._subscription = this.store.select(selectState(this.formId)).pipe(
      filter(value => !!value),
    ).subscribe(state => {
      if (state.descriptorChanged) {
        this.clearValueChangeSubscription();
        const formConfig = this.formBuilderService.build(state.descriptor);
        this._valueChangeSubscription = formConfig.formGroup.valueChanges.subscribe(value => this.store.dispatch(new UpdateValueAction({
          formId: this.formId,
          value,
        })));
        this.formService.addForm(this.formId, formConfig.formGroup);
        this.formConfig = formConfig;
      }
      this.formConfig.formGroup.patchValue(state.value, {
        emitEvent: false,
      });
    });

    this.store.dispatch(new InitAction({
      descriptor: this.formDescriptor,
      value: this.initValue,
    }));
  }

  ngOnDestroy(): void {
    this.formService.removeForm(this.formDescriptor.id);
    this.clearValueChangeSubscription();
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private clearValueChangeSubscription() {
    if (this._valueChangeSubscription) {
      this._valueChangeSubscription.unsubscribe();
      this._valueChangeSubscription = undefined;
    }
  }
}
