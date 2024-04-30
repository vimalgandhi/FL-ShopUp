const bcryptHelper = require("../../helpers/bcrypt.helper");
const { userModel } = require("../../models/users.model");
const jwt = require("../../helpers/jwt.helper");
const userController = {

    singUp: async (req, res) => {
        const { firstName, lastName, email, password, role } = req.body;

        const hashedPassword = await bcryptHelper.hashpassword(password, 10);
        const userRole = role ? role : "customer";

        const user = new userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role : userRole
        });
        await user.save()

        return res.status(201).json({ message: "User created successfully" })
    },

    signIn: async (req, res) => {
        const { email, role } = req.body;
        const { id } = req.me;
    
        try {
            // Assuming you have a 'userModel' defined elsewhere
            const user = await userModel.findOne({ email });
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            const token = await jwt.encode({ id, email, role });
    
            return res.status(200).json({ message: "User sign in successfully", user, token });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        }
    }
    };

module.exports = userController;
