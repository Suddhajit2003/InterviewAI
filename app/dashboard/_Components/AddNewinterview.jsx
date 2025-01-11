"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { cleanAndParseJSON } from "@/utils/jsonParser";
import { AiInterview } from "@/utils/schema";
import { insertValues } from "@/utils/insertValues";

const InterviewSchema = Yup.object().shape({
  jobPosition: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Job position is required"),
  jobDescription: Yup.string()
    .min(10, "Please provide more details")
    .max(500, "Too Long!")
    .required("Job description is required"),
  yearsOfExperience: Yup.number()
    .min(0, "Experience cannot be negative")
    .max(100, "Experience cannot exceed 100 years")
    .required("Years of experience is required"),
});

async function AddNewInterview() {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const InputPrompt =
        "Job Position: " +
        values.jobPosition +
        ", Job Description: " +
        values.jobDescription +
        " , Years of Experience: " +
        values.yearsOfExperience +
        " , Depends on this information please give me " +
        process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
        " Interview question with Answered in Json Format, Give Question and Answered as field in JSON";

      const result = await chatSession.sendMessage(InputPrompt);
      const rawResponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", "")
        .trim();
      const parsedJSON = JSON.parse(rawResponse);
      await insertValues(...values);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about Which Skills you want to take interview
            </DialogTitle>
            <DialogDescription>
              <Formik
                initialValues={{
                  jobPosition: "",
                  jobDescription: "",
                  yearsOfExperience: "",
                }}
                validationSchema={InterviewSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div>
                      <h2>
                        Add Details about job position, Required skills and
                        years of Experience
                      </h2>

                      <div className="mt-7 my-3">
                        <label>Job Position/Role Name</label>
                        <Field name="jobPosition">
                          {({ field }) => (
                            <Input
                              {...field}
                              placeholder="Ex. Data Scientist"
                            />
                          )}
                        </Field>
                        {errors.jobPosition && touched.jobPosition && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.jobPosition}
                          </div>
                        )}
                      </div>

                      <div className="my-3">
                        <label>Job Description/Tech Stack (in Short)</label>
                        <Field name="jobDescription">
                          {({ field }) => (
                            <Textarea
                              {...field}
                              placeholder="Ex. MS Excel, Power BI, Python, MySQL etc"
                            />
                          )}
                        </Field>
                        {errors.jobDescription && touched.jobDescription && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.jobDescription}
                          </div>
                        )}
                      </div>

                      <div className="my-3">
                        <label>Years of Experience</label>
                        <Field name="yearsOfExperience">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="number"
                              placeholder="5"
                              max="100"
                            />
                          )}
                        </Field>
                        {errors.yearsOfExperience &&
                          touched.yearsOfExperience && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.yearsOfExperience}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="flex gap-5 justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setOpenDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Start Interview"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
