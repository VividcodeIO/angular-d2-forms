import { Action } from '@ngrx/store';
import { FormState } from '../form';

export enum FormActionTypes {
  INIT = '[Form] Init',
  UPDATE_VALUE = '[Form] Update Value',
  UPDATE_STATE = '[Form] Update State',
}

export interface UpdateActionPayload {
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

  constructor(public payload: UpdateActionPayload) {
  }
}

export class UpdateStateAction implements Action {
  public readonly type: string = FormActionTypes.UPDATE_STATE;

  constructor(public payload: FormState<any>) {
  }
}
