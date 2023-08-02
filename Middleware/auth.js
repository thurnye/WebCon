import jwt from 'jsonwebtoken';
// verify all routes for authorizations
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if(!token){
            return res.status(403).send("Access Denied")
        }
        if (token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimleft()
        }
        const verified = jet.verify(token, process.evt.SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}