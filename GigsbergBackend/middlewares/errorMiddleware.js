
const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: `Error in request ${req.method} ${req.url}` });
};


module.exports = errorMiddleware;
