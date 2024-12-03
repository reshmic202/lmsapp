import express from 'express';
import { createNewUser, getUserDetailsWithToken, loginUser, userRoutesInit } from '../controllers/usersControllers.js';

const userRoutes=express.Router();

userRoutes.get("/",userRoutesInit);
userRoutes.post("/create-user",createNewUser);
userRoutes.post("/login-user",loginUser);
userRoutes.get("/getUserDetailsWithToken/:token",getUserDetailsWithToken);

export default userRoutes;