import { Component, HostBinding, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormComponentConfig, FormConfig } from '../../form';
import { FormBuilderService } from '../../services/form-builder.service';
import { Store } from '@ngrx/store';
import { InitAction, UpdateValueAction } from '../../store/action';
import { FormService } from '../../services/form.service';
import { selectState } from '../../store/state';
import { filter } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { FormTransformationService } from '../../services/form-transformation.service';

@Component({
  selector: 'ad2forms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnChanges, OnDestroy {
  @Input() config: FormComponentConfig<any>;
  @HostBinding('class') classes = 'ad2forms-form';
  formConfig: FormConfig<any>;
  _subscription: Subscription;
  _valueChangeSubscription: Subscription;
  _valueChanges: Subject<any> = new BehaviorSubject<any>(null);

  constructor(private formBuilderService: FormBuilderService,
              private formTransformationService: FormTransformationService,
              private formService: FormService,
              private store: Store<any>) {
  }

  get formId(): string {
    return this.config.descriptor.id;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.config.currentValue) {
      return;
    }
    this.reset();
    const config: FormComponentConfig<any> = changes.config.currentValue;
    const formId = config.descriptor.id;
    this.formTransformationService.set(formId, config.transformations);

    this.store.dispatch(new InitAction({
      descriptor: config.descriptor,
      value: config.initialValue,
    }));

    this._subscription = this.store.select(selectState(formId)).pipe(
      filter(value => !!value),
    ).subscribe(state => {
      if (state.descriptorChanged) {
        this.clearValueChangeSubscription();
        const formConfig = this.formBuilderService.build(state.descriptor);
        this._valueChangeSubscription = formConfig.formGroup.valueChanges.subscribe(value => {
          this.store.dispatch(new UpdateValueAction({
            formId,
            value,
          }));
        });
        this.formService.addForm(formId, formConfig.formGroup);
        this.formConfig = formConfig;
      }
      if ((state.valueChanged || state.descriptorChanged) && this.formConfig) {
        this.formConfig.formGroup.patchValue(state.value, {
          emitEvent: false,
        });
      }
      this._valueChanges.next(state.value);
    });
  }

  ngOnDestroy(): void {
    this.formService.removeForm(this.formId);
    this.reset();
  }

  private reset() {
    this.clearValueChangeSubscription();
    if (this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = undefined;
    }
  }

  private clearValueChangeSubscription() {
    if (this._valueChangeSubscription) {
      this._valueChangeSubscription.unsubscribe();
      this._valueChangeSubscription = undefined;
    }
  }

  get valid(): boolean {
    return this.formConfig && this.formConfig.valid;
  }

  get invalid(): boolean {
    return this.formConfig && this.formConfig.invalid;
  }

  get value(): any {
    return this.formService.getValue(this.formId);
  }

  get valueChanges(): Observable<any> {
    return this._valueChanges;
  }

  save() {
    this.formService.save(this.formId);
  }
}
