export function publicCache(seconds) {
  return (req, res, next) => {
    res.set('Cache-Control', `public, max-age=${seconds}`);
    next();
  };
}