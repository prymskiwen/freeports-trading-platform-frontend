import { shallowEqual, useDispatch, useSelector } from "react-redux";

import reduxActions from "../store/actions";

const { setTheme } = reduxActions;

function useTheme(): any {
  const dispatch = useDispatch();

  const { theme } = useSelector(
    (state: any) => ({
      theme: state.global.theme,
    }),
    shallowEqual
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    dispatch(setTheme(newTheme));
  };

  return {
    toggleTheme,
    theme,
  };
}

export default useTheme;
