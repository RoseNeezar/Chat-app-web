import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "../reducers/rootReducer";

export type RootStore = ReturnType<typeof RootReducer>;

export const initStore = () => {
  const middlewares = [thunk];
  const store = createStore(
    RootReducer,
    compose(composeWithDevTools(applyMiddleware(...middlewares)))
  );
  return store;
};

export const wrapper = createWrapper(initStore);
