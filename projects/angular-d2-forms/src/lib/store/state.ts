import { FormState } from '../form';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FormActionTypes, UpdateStateAction } from './action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export type State = EntityState<FormState<any>>;

const stateAdapter = createEntityAdapter<FormState<any>>({
  selectId: model => model.descriptor.id,
  sortComparer: false,
});

const initialState = stateAdapter.getInitialState();

export function reducer(state: State = initialState, action) {
  switch (action.type) {
    case FormActionTypes.UPDATE_STATE:
      return stateAdapter.upsertOne((action as UpdateStateAction).payload, state);
    default:
      return state;
  }
}

export const getFormState = createFeatureSelector('ad2forms');

export const getFormStates = createSelector(
  getFormState,
  stateAdapter.getSelectors().selectEntities,
);

export const selectFormState = (formId: string) => createSelector(
  getFormStates,
  (entities) => entities[formId],
);
