import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FormActionTypes, UpdateStateAction } from './action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormState } from '../form';

export interface FormStateUpdate<T> extends FormState<T> {
  descriptorChanged: boolean;
  valueChanged: boolean;
}

export type State<T> = EntityState<FormStateUpdate<T>>;

const formStateAdapter = createEntityAdapter<FormStateUpdate<any>>({
  selectId: model => model.descriptor.id,
  sortComparer: false,
});

const initialFormState = formStateAdapter.getInitialState();

export function reducer(state: State<any> = initialFormState, action) {
  if (action.type === FormActionTypes.UPDATE_STATE) {
    return formStateAdapter.upsertOne((action as UpdateStateAction).payload, state);
  }
  return state;
}


export const featureName = 'ad2forms';

export const getFormState = createFeatureSelector<State<any>>(featureName);

export const getFormUpdateStates = createSelector(
  getFormState,
  formStateAdapter.getSelectors().selectEntities,
);

export const selectState = (formId: string) => createSelector(
  getFormUpdateStates,
  entities => entities[formId],
);


export const selectDescriptor = (formId: string) => createSelector(
  getFormUpdateStates,
  entities => entities[formId] && entities[formId].descriptor,
);
