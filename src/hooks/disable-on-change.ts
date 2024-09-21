import { useEffect, useState } from 'react';

export function useDisableOnChange(def: boolean, dependencies: any[]) {
  const [disabled, setDisabled] = useState(def);

  useEffect(() => {
    setDisabled(true);

    const timeout = setTimeout(() => {
      setDisabled(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, dependencies);

  return disabled;
}
