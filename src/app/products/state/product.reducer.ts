import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';

// State
export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

// Initial State
const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
};

// Selector
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  (state) => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

// Reducer
export const productReducer = createReducer<ProductState>(
  initialState,
  on(
    createAction('[Product] Toggle Product Code'),
    (state): ProductState => {
      return {
        ...state,
        showProductCode: !state.showProductCode,
      };
    }
  )
);
