export default function logger(req, res, next) {
  console.log(`${req.host} ${req.method} ${req.originalUrl}`);
  next();
}
