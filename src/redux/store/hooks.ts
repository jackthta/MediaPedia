import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from ".";

// Typed `useDispatch` and `useSelector`.
// Use these throughout the app instead of the hooks
// from the `react-redux` library.
type DispatchFunction = () => AppDispatch;
export const useDispatch: DispatchFunction = _useDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
