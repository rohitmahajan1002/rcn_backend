const authorizePermissions = (...required) => {
    return (req, res, next) => {
        const userPermissions = req.user.permissions || [];
        
        const allowed = required.every(
            (pr) => userPermissions.includes(pr)
        );

        if(!allowed) {
            return res.status(403).json({
                success: false,
                message: "Permission denied",
            });
        }

        next();
    }
}

export default authorizePermissions;