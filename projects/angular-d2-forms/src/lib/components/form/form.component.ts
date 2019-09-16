import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { addFieldPaths, FormComponentConfig, FormConfig, FormState, removeFieldPaths } from '../../form';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormBuilderService } from '../../services/form-builder.service';
import flatMap from 'lodash.flatmap';
import { FormGroup } from '@angular/forms';
import { FormTransformationResult } from '../../form-transformation';

@Component({
  selector: 'ad2forms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent<T> implements OnInit, OnChanges, OnDestroy {
  @Input() config: FormComponentConfig<T>;
  _formConfig: FormConfig<T>;
  _hiddenFormFields = new BehaviorSubject<string[]>([]);
  _valueChangeSubscription: Subscription;

  constructor(private _formBuilderService: FormBuilderService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.config) {
      return;
    }
    this._reset();
    this._formConfig = this._formBuilderService.build(this.config);
    this._valueChangeSubscription = this._formConfig.formGroup.valueChanges.subscribe(value => this._updateValue(value));
    if (this.config.value) {
      this._formConfig.formGroup.setValue(this.config.value);
    }
    this._updateValue(this._formConfig.formGroup.value);
  }

  ngOnDestroy(): void {
    this._reset();
  }

  private _reset() {
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
    results.forEach(result => this._applyTransformationResult(result, this._formConfig.formGroup));
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

  get valid(): boolean {
    return this._formConfig && this._formConfig.valid;
  }

  get invalid(): boolean {
    return this._formConfig && this._formConfig.invalid;
  }

  get valueChanges(): Observable<T> {
    return this._formConfig && this._formConfig.formGroup.valueChanges;
  }
}
