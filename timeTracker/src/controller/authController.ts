import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
interface AuthRequest extends Request {
    user?: { id: number; email: string };
  }

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

       
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

    
        const isMatch = await bcrypt.compare(password, user.getDataValue("password"));
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

      
        const token = jwt.sign(
            { id: user.getDataValue("id") },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token, user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};


export const logout = (_req: Request, res: Response) => {
    res.json({ message: "Logout successful" });
};


export const updateEmail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log("User in Request:", req.user); 

    const { newEmail } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized - No user found in request" });
      return;
    }

    console.log("New Email:", newEmail); 

    
    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.email = newEmail;
    await user.save();

    res.json({ message: "Email updated successfully", user });
  } catch (error: any) {
    console.error("Update Email Error:", error);
    res.status(500).json({ message: "Error updating email", error: error.message || error });
  }
};

  

  export const updatePassword = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { newPassword } = req.body;
  
      if (!req.user) {
         res.status(401).json({ message: "Unauthorized" });
         return
      }
  
      const user = await User.findOne({ where: { email: req.user.email } });
  
      if (!user) {
         res.status(404).json({ message: "User not found" });
         return
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating password", error });
    }
  };
  