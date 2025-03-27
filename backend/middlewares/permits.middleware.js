const authorPermition = () => {
    console.log('author')
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({ message: 'Access denied.' });
        }
        const authorId = req.params.id
        if (req.user.id !== authorId) {
            return res.status(403).send({ message: 'Access denied. You do not have the required role.' });
        }

        next();
    }
}

module.exports= authorPermition;