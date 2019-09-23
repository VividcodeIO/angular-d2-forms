import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { addFieldPaths, FormComponentConfig, FormConfig, FormState, removeFieldPaths } from '../../form';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormBuilderService } from '../../services/form-builder.service';
import flatMap from 'lodash.flatmap';
import includes from 'lodash.includes';
import { FormGroup } from '@angular/forms';
import {
  EnableDisableFormTransformation,
  EnableDisableTransformation,
  FormTransformationConfig,
  FormTransformationResult,
  SetValueFormTransformation,
  SetValueTransformation,
  ShowHideFormTransformation,
  ShowHideTransformation
} from '../../form-transformation';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ad2forms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent<T> implements OnInit, OnChanges, OnDestroy {
  @Input() config: FormComponentConfig<T>;
  hiddenFormFields = new BehaviorSubject<string[]>([]);
  formConfig$ = new BehaviorSubject<FormConfig<T>>(null);
  private _valueChangeSubscription: Subscription;

  constructor(private _formBuilderService: FormBuilderService) {
    this._valueChangeSubscription = this.valueChanges.subscribe(value => this._updateValue(value));
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.config) {
      return;
    }
    const formConfig = this._formBuilderService.build(this.config);
    this.formConfig$.next(formConfig);
    this.hiddenFormFields.next([]);

    if (this.config.value) {
      formConfig.formGroup.patchValue(this.config.value);
    }
    this._updateValue(formConfig.formGroup.value);
  }

  ngOnDestroy(): void {
    this._clearValueChangeSubscription();
  }

  private _clearValueChangeSubscription() {
    if (this._valueChangeSubscription) {
      this._valueChangeSubscription.unsubscribe();
      this._valueChangeSubscription = undefined;
    }
  }

  private _updateValue(value: any) {
    const results = this._applyTransformations({
      descriptor: this.config.descriptor,
      value,
    });
    results.forEach(result => this._applyTransformationResult(result, this.formConfig.formGroup));
  }

  private _applyTransformations(formState: FormState<T>) {
    return flatMap(this.config.transformations || [], (config: FormTransformationConfig) => {
      const {type, opts, transformation} = config;
      switch (type) {
        case 'enable-disable':
          const edt = opts as EnableDisableTransformation;
          return new EnableDisableFormTransformation(edt.sourceFieldPath, edt.targetFieldPaths, edt.enableWhenIsTrue).transform(formState);
        case 'show-hide':
          const sht = opts as ShowHideTransformation;
          return new ShowHideFormTransformation(sht.sourceFieldPath, sht.sourceFieldValue, sht.targetFieldPaths, sht.showWhenValueMatches)
            .transform(formState);
        case 'setValue':
          const svt = opts as SetValueTransformation;
          return new SetValueFormTransformation(svt.sourceFieldPath, svt.sourceFieldValue, svt.targetFieldValues).transform(formState);
        case 'custom':
          return transformation.transform(formState);
        default:
          return [];
      }
    });
  }

  private _applyTransformationResult(result: FormTransformationResult, formGroup: FormGroup) {
    const {fieldPath, change} = result;
    const formControl = formGroup.get(fieldPath);
    if (!formControl) {
      return;
    }
    switch (change.type) {
      case 'disable':
        formControl.disable({
          onlySelf: true,
        });
        break;
      case 'enable':
        formControl.enable({
          onlySelf: true,
        });
        break;
      case 'show':
        if (includes(this.hiddenFormFields.value, fieldPath)) {
          this.hiddenFormFields.next(removeFieldPaths(this.hiddenFormFields.value, fieldPath));
        }
        break;
      case 'hide':
        if (!includes(this.hiddenFormFields.value, fieldPath)) {
          this.hiddenFormFields.next(addFieldPaths(this.hiddenFormFields.value, fieldPath));
        }
        break;
      case 'setValue':
        formControl.setValue(change.value, {
          onlySelf: true,
        });
        break;
      default:
        break;
    }
  }

  get formConfig() {
    return this.formConfig$.value;
  }

  get value(): T {
    return this.formConfig && this.formConfig.formGroup.value;
  }

  getRawValue(): T {
    return this.formConfig && this.formConfig.formGroup.getRawValue();
  }

  get valid(): boolean {
    return this.formConfig && this.formConfig.valid;
  }

  get invalid(): boolean {
    return this.formConfig && this.formConfig.invalid;
  }

  get valueChanges(): Observable<T> {
    return this.formConfig$.pipe(
      filter(v => !!v),
      switchMap(config => config.formGroup.valueChanges),
    );
  }

  reset(value?: any, options?: any) {
    if (this.formConfig) {
      this.formConfig.formGroup.reset(value, options);
    }
  }
}
