import ReduxAction from "../store/redux-action";

export default function apiRequestAction(
  type: string,
  payload = {}
): ReduxAction {
  return {
    type,
    payload,
  };
}
