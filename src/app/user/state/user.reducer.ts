import { createAction, createReducer, on } from '@ngrx/store';

export const userReducer = createReducer(
  { maskUsername: true },
  on(createAction('[User] Toggle Username'), (state) => {
    console.log(state);
    return {
      ...state,
      maskUsername: !state.maskUsername,
    };
  })
);
