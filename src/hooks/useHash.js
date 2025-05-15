import { useState, useEffect, useCallback } from 'react';

export function useHash() {
  const [hash, setHashState] = useState(() => window.location.hash);

  const setHash = useCallback((newHash) => {
    const formatted = newHash.startsWith('#') ? newHash : `#${newHash}`;
    if (window.location.hash !== formatted) {
      window.location.hash = formatted;
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setHashState(window.location.hash);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return {hash, setHash};
}
