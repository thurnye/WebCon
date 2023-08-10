import jwt from 'jsonwebtoken';
// verify all routes for authorizations
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if(!token){
            return res.status(403).send("Access Denied")
        }
        if (token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trim()
        }
        const verified = jwt.verify(token, process.env.SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Internal Server Error', error: error});
    }
}