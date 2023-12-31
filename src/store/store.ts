"use client";

import {
  type Action,
  type ThunkAction,
  configureStore,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { catalogReducer } from "@store/catalog";
import { shoppingCartReducer } from "@store/shoppingCart";

const makeStore = () =>
  configureStore({
    reducer: {
      catalog: catalogReducer,
      shoppingCart: shoppingCartReducer,
    },
    devTools: true,
  });

const wrappedStore = createWrapper(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export default wrappedStore;
