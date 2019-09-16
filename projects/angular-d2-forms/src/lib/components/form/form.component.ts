import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { addFieldPaths, FormComponentConfig, FormConfig, FormState, removeFieldPaths } from '../../form';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormBuilderService } from '../../services/form-builder.service';
import flatMap from 'lodash.flatmap';
import { FormGroup } from '@angular/forms';
import { FormTransformationResult } from '../../form-transformation';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ad2forms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent<T> implements OnInit, OnChanges, OnDestroy {
  @Input() config: FormComponentConfig<T>;
  _formConfig$ = new BehaviorSubject<FormConfig<T>>(null);
  _hiddenFormFields = new BehaviorSubject<string[]>([]);
  _valueChangeSubscription: Subscription;

  constructor(private _formBuilderService: FormBuilderService) {
  }

  ngOnInit(): void {
    this._valueChangeSubscription = this.valueChanges.subscribe(value => this._updateValue(value));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.config) {
      return;
    }
    const formConfig = this._formBuilderService.build(this.config);
    this._formConfig$.next(formConfig);

    if (this.config.value) {
      formConfig.formGroup.setValue(this.config.value);
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
    return flatMap(this.config.transformations || [], transformation => transformation.transform(formState));
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
        this._hiddenFormFields.next(removeFieldPaths(this._hiddenFormFields.value, fieldPath));
        break;
      case 'hide':
        this._hiddenFormFields.next(addFieldPaths(this._hiddenFormFields.value, fieldPath));
        break;
      default:
        break;
    }
  }

  get formConfig() {
    return this._formConfig$.value;
  }

  get value() {
    return this.formConfig && this.formConfig.formGroup.value;
  }

  getRawValue() {
    return this.formConfig && this.formConfig.formGroup.getRawValue();
  }

  get valid(): boolean {
    return this.formConfig && this.formConfig.valid;
  }

  get invalid(): boolean {
    return this.formConfig && this.formConfig.invalid;
  }

  get valueChanges(): Observable<T> {
    return this._formConfig$.pipe(
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
