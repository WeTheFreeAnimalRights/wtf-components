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
    const value = useStore(store, (state) => state.value);
    const setValue = (val) => store.setState({ value: val });
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
