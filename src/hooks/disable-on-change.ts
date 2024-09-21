import { useEffect, useState } from 'react';

export function useDisableOnChange(def: boolean, ms: number, dependencies: any[]) {
  const [disabled, setDisabled] = useState(def);

  useEffect(() => {
    setDisabled(true);

    const timeout = setTimeout(() => {
      setDisabled(false);
    }, ms);

    return () => {
      clearTimeout(timeout);
    };
  }, [ms, ...dependencies]);

  return disabled;
}
