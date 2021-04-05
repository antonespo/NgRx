import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { maskUsername } from './user.actions';
import * as UserActions from '../state/user.actions';

// State
export interface State extends AppState.State {
  user: UserState;
}
export interface UserState {
  maskUsername: boolean;
}

// Initial state
const initialState: UserState = {
  maskUsername: true,
};

// Selector
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUsername = createSelector(
  getUserFeatureState,
  (state) => state.maskUsername
);

// Reducer
export const userReducer = createReducer(
  initialState,
  on(UserActions.maskUsername, (state: UserState) => {
    return {
      ...state,
      maskUsername: !state.maskUsername,
    };
  })
);
