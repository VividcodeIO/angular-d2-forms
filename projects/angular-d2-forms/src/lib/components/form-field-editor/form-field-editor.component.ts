import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormFieldConfig } from '../../form';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ad2forms-form-field-editor',
  templateUrl: './form-field-editor.component.html',
  styleUrls: ['./form-field-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldEditorComponent<T> implements OnInit, OnDestroy {
  @Input() formFieldConfig: FormFieldConfig<T>;

  private _subscription: Subscription;

  constructor() {
  }

  protected onInitialValueSet(value: T) {
  }

  protected setValue(value: T) {
    this.formFieldConfig.formControl.setValue(value, {
      emitEvent: false,
    });
  }

  protected save() {}

  ngOnInit(): void {
    this._subscription = this.formFieldConfig.formControl.valueChanges.pipe(
      take(1),
    ).subscribe(value => this.onInitialValueSet(value));
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }


}
