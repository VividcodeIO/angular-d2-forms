import { FormDescriptor } from '../form';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FormActionTypes, InitAction, UpdateValueAction } from './action';

export interface FormState {
  descriptor: FormDescriptor<any>;
  value: any;
}

export type State = EntityState<FormState>;

const stateAdapter = createEntityAdapter<FormState>({
  selectId: model => model.descriptor.id,
  sortComparer: false,
});

const initialState = stateAdapter.getInitialState();

export function reducer(state: State = initialState, action) {
  switch (action.type) {
    case FormActionTypes.INIT:
      return stateAdapter.addOne((action as InitAction).payload, state);
    case FormActionTypes.UPDATE_VALUE:
      const {formId, value} = (action as UpdateValueAction).payload;
      const config = state.entities[formId];
      if (config) {
        return stateAdapter.updateOne({
          id: formId,
          changes: {
            value,
          }
        }, state);
      }
      break;
    default:
      return state;
  }
  return state;
}
