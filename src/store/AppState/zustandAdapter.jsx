import { isFunction } from 'lodash-es';
import { createStore, useStore } from 'zustand';

/**
 * Create a new global state store (like jotaiAtom)
 */
export const createGlobalState = ({ default: defaultValue }) =>
    createStore(() => ({ value: defaultValue }));

/**
 * Hook to use global state (like useRecoilState / useAtom)
 */
export const useGlobalState = (store) => {
  const value = useStore(store, (s) => s.value);
  const setValue = (valOrUpdater) => {
    if (isFunction(valOrUpdater)) {
      const curr = store.getState().value;
      store.setState({ value: valOrUpdater(curr) });
    } else {
      store.setState({ value: valOrUpdater });
    }
  };
  return [value, setValue];
};

/**
 * Hook to get just the value (like useRecoilValue / useAtomValue)
 */
export const useGlobalValue = (store) =>
    useStore(store, (state) => state.value);

/**
 * Hook to set just the value (like useSetRecoilState / useSetAtom)
 */
export const useSetGlobalState = (store) => (val) =>
    store.setState({ value: val });

/**
 * No-op provider for API compatibility
 */
export const AppStateProvider = ({ children }) => children;
