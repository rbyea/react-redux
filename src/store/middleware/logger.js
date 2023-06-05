export function logger({getState, dispatch}) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      return next(action);
    };
  };
}
