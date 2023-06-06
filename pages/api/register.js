import bcrypt from 'bcrypt';
import connectDB from '../../utils/connectDB';
import User from '../../models/User';

connectDB()

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' + error });
    }
};

export default function handler(req, res) {
    if (req.method === 'POST') {
        register(req, res)
    }
}