export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  const logMsg = `[Error] ${req.method} ${req.path} - ${err.message}\n${err.stack}\n\n`;
  console.error(logMsg);
  
  try {
    import('fs').then(fs => fs.appendFileSync('error.log', logMsg));
  } catch(e) {}

  res.json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
