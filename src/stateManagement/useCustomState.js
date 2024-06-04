import { useState, useEffect, useMemo } from "react";
import CustomState from "./CustomState";

export const useCustomState = (initialState) => {
  const [state, setState] = useState(initialState);
  const customState = useMemo(() => new CustomState(initialState), []);

  useEffect(() => {
    const unsubscribe = customState.subscribe(setState);
    return () => unsubscribe();
  }, [customState]);

  const dispatch = (action) => customState.dispatch(action);

  return [state, dispatch];
};
