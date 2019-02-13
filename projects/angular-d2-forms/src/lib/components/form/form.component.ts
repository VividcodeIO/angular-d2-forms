import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormConfig, FormDescriptor } from '../../form';
import { FormBuilderService } from '../../services/form-builder.service';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InitAction, UpdateValueAction } from '../../store/action';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'ad2forms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() formDescriptor: FormDescriptor<any>;
  @Input() initValue: any;
  formConfig: FormConfig<any>;
  formGroup: FormGroup;

  constructor(private formBuilderService: FormBuilderService,
              private formService: FormService,
              private store: Store<any>) {

  }

  ngOnInit() {
    this.formConfig = this.formBuilderService.build(this.formDescriptor);
    this.formGroup = this.formConfig.formGroup;
    this.formGroup.setValue(this.initValue);

    this.store.dispatch(new InitAction({
      descriptor: this.formDescriptor,
      value: this.initValue,
    }));
    this.formGroup.valueChanges.subscribe(value => this.store.dispatch(new UpdateValueAction({
      formId: this.formConfig.id,
      value,
    })));

    this.formService.addForm(this.formDescriptor.id, this.formGroup);
  }

  ngOnDestroy(): void {
    this.formService.removeForm(this.formDescriptor.id);
  }

}
