// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Surpressing act warnings as they are no longer required
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#react:~:text=In%20tests%2C%20act%20warnings%20are%20now%20opt%2Din
const ACT_WRAPPED_WARNING = (
  "was not wrapped in act(...)"
);
const originalWarning = console.error.bind(console.error);
console.error = (...args) => !args.toString().includes(ACT_WRAPPED_WARNING)
  && originalWarning(...args);