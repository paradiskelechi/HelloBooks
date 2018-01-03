const Alert = (alertType, alertMessage, callback) => {
  if (callback) {
    Materialize.toast(
      alertMessage,
      6000,
      `${alertType !== 'error' ? 'blue' : 'red'} rounded`, () => {
        callback();
      }
    );
  } else {
    Materialize.toast(
      alertMessage,
      6000,
      `${alertType !== 'error' ? 'blue' : 'red'} rounded`,
    );
  }
};

export default Alert;