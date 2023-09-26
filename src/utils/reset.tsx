export const reset = (setIsError: Function) => {
  setIsError(false);
  window.location.reload();
};
