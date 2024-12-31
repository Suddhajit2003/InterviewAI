import { varchar, text, serial, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const AiInterview = pgTable('ai_interview', {
  id: serial('id').primaryKey(),
  jsonInterviewResp: text('json_interview_resp').notNull(),
  jobPosition: varchar('job_position', 255).notNull(),
  jobDesc: text('job_desc').notNull(),
  jobExperience: varchar('job_experience', 255).notNull(),
  createdBy: varchar('created_by', 255).notNull(),
  createdAt: timestamp('created_at', { precision: 6 }).defaultNow(),
  interviewId: varchar('interview_id', 255).notNull()
});
