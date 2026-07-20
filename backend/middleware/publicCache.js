export function publicCache(seconds) {
  return (req, res, next) => {
    if (req.headers.authorization) return next(); // admin/authenticated requests: no caching
    res.set('Cache-Control', `public, max-age=${seconds}`);
    next();
  };
}