import express from 'express';
import { createCourse, getAllUserCourse,getCurrentCourse } from '../controllers/courseController.js';

const courseRoutes=express.Router();

courseRoutes.post("/create-course",createCourse);
courseRoutes.get("/get-user-course/:userId",getAllUserCourse);
courseRoutes.get("/get-single-course/:courseId",getCurrentCourse);


export default courseRoutes;