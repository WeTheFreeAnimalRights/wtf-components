import {
    atom as jotaiAtom,
    Provider as JotaiProvider,
    useAtom,
    useAtomValue,
    useSetAtom,
} from 'jotai';

/**
 * Create a new global state atom
 */
export const createGlobalState = ({ default: defaultValue }) => {
    return jotaiAtom(defaultValue);
};

/**
 * Hook to use global state (like useRecoilState)
 */
export const useGlobalState = (atom) => useAtom(atom);

/**
 * Hook to set the global state (like useSetRecoilState)
 */
export const useSetGlobalState = (atom) => useSetAtom(atom);

/**
 * Hook use to get the global value from a state (like useRecoilValue)
 */
export const useGlobalValue = (atom) => useAtomValue(atom);

/**
 * Provider component to wrap your app (like RecoilRoot)
 */
export const AppStateProvider = ({ children }) => {
    return <JotaiProvider>{children}</JotaiProvider>;
};
