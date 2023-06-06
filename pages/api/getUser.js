import jwt from 'jsonwebtoken';
import connectDB from '../../utils/connectDB';
import User from '../../models/User';

connectDB();

const getUser = async (req, res) => {
    try {
        const { token } = req.body;
        console.log(token)
        const decodedToken = jwt.verify(token, 'your-secret-key');

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};

export default function handler(req, res) {
    if (req.method === 'POST') {
        getUser(req, res)
    }
}
