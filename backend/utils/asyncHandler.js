// Wraps async route handlers so rejected promises reach the error middleware instead of crashing the process.
export default function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
