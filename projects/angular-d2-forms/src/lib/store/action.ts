import { Action } from '@ngrx/store';
import { FormState } from '../form';
import { FormStateUpdate } from './state';

export enum FormActionTypes {
  INIT = '[Form] Init',
  UPDATE_VALUE = '[Form] Update Value',
  UPDATE_STATE = '[Form] Update State',
}

export interface UpdateValuePayload {
  formId: string;
  value: any;
}

export class InitAction implements Action {
  public readonly type: string = FormActionTypes.INIT;

  constructor(public payload: FormState<any>) {
  }
}

export class UpdateValueAction implements Action {
  public readonly type: string = FormActionTypes.UPDATE_VALUE;

  constructor(public payload: UpdateValuePayload) {
  }
}
export class UpdateStateAction implements Action {
  public readonly type: string = FormActionTypes.UPDATE_STATE;

  constructor(public payload: FormStateUpdate<any>) {
  }
}
