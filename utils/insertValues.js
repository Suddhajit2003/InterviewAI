"use server"

import { v4 as uuidv4 } from "uuid";
import db from "@/utils/db";

export const insertValues = async (jobPosition, jobDescription, yearsOfExperience) => {
    const resp = await db.insert(AiInterview).values({
        id: uuidv4(),
        jobPosition, 
        jobDescription, 
        yearsOfExperience
      });
}