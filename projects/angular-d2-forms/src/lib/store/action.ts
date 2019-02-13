import { Action } from '@ngrx/store';
import { FormConfig, FormDescriptor } from '../form';

export enum FormActionTypes {
  INIT = '[Form] Init',
  UPDATE_VALUE = '[Form] Update Value',
}

export interface UpdateActionPayload {
  formId: string;
  value: any;
}

export interface InitActionPayload {
  descriptor: FormDescriptor<any>;
  value: any;
}

export class InitAction implements Action {
  public readonly type: string = FormActionTypes.INIT;

  constructor(public payload: InitActionPayload) {}
}

export class UpdateValueAction implements Action {
  public readonly type: string = FormActionTypes.UPDATE_VALUE;

  constructor(public payload: UpdateActionPayload) {
  }
}
