import { ChapterNotesAIModel, CourseOutline } from "../AIModel.js";
import Course from "../models/courseModel.js";
import ChatpterNote from "../models/chapterNotesModel.js";

export const createCourse = async (req, res) => {
  const { topic, category, level, courseId, createdBy } = req.body;

  // Log incoming request data
  console.log("Request Body:", topic, category, level, courseId, createdBy);

  try {
    // Construct the AI request message
    const message = `
Generate a course layout for the topic "${topic}" under the category "${category}". 
The difficulty level should be "${level}".  The response must be in valid JSON format, following this structure:

{
  "studyMaterial": {
    "title": "Overall title of the study material",
    "summary": "Overview of the study material",
    "emoji":"😍😍"
    "chapters": [
      {
        "title": "Chapter Title",
        "description": "Brief explanation of the chapter",
        "topics": ["Topic 1", "Topic 2", "Topic 3"]
      }
    ]
  }
}

Requirements:
1. The "studyMaterial" object must include:
   - A "title" that represents the entire study material.
   - A "summary" giving an overview of the study material's purpose and content.
   - A "chapters" array with each chapter containing:
     - A "title" for the chapter.
     - A "description" explaining the content of the chapter.
     - A "topics" array listing the key topics covered in the chapter.
2. Ensure the output adheres strictly to the provided JSON structure.
3. Be concise but ensure the information is meaningful, relevant, and detailed for all fields.
`;

    // Call the AI API to generate course content
    const aiResp = await CourseOutline.sendMessage(message);

    // Validate the AI response
    if (!aiResp?.response) {
      throw new Error("AI response is empty or invalid");
    }

    // Parse AI response into JSON
    const aiResponseText = await aiResp.response.text();
    let aiResult;
    try {
      aiResult = JSON.parse(aiResponseText);
    } catch (parseError) {
      throw new Error(`Failed to parse AI response: ${parseError.message}`);
    }

    // Create a new course object
    const newCourse = new Course({
      courseId,
      courseType: category,
      topic,
      difficultyLevel: level,
      courseLayout: aiResult,
      createdBy,
      status: "generating", // Initially set to 'generating'
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();
    if (!savedCourse) {
      return res.status(400).json({ error: "Failed to save the course" });
    }

    // Send success response to frontend
    res.status(201).json({
      message: "Course created successfully",
      courseContent: savedCourse,
    });

    // Background process for generating chapter notes
    (async () => {
      let index = 0;

      try {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        for (const item of savedCourse.courseLayout.studyMaterial.chapters) {
          console.log("Processing chapter:", item.title || "Unnamed Chapter");
          let retryCount = 0;
          const maxRetries = 4;
          const backoff = 4000; // Initial backoff in milliseconds

          while (retryCount < maxRetries) {
            try {
              const chapterTitle = item.title || "Unnamed Chapter";
              const chapterDescription =
                item.description || "No description available";
              const chapterTopics =
                item.topics?.join(", ") || "No topics listed";

              const PROMPT = `
                Generate ${category} material detail content for the chapter:
                Title: ${chapterTitle}
                Description: ${chapterDescription}
                Topics: ${chapterTopics}
                
                With deep concept so the user can understand that so easily and in simple word with some examples. Provide the content in HTML format. Do not include <html>, <head>, <body>, or <title> tags. Ensure all topics are covered in detail.
            `;

              const chapterAIResp = await ChapterNotesAIModel.sendMessage(
                PROMPT
              );
              if (!chapterAIResp?.response) {
                throw new Error("AI response is empty or invalid");
              }

              const chapterResponseText = await chapterAIResp.response.text();
              console.log("Chapter Response Text:", chapterResponseText);

              const addChapterNote = new ChatpterNote({
                courseId: courseId,
                chapterId: index,
                notes: chapterResponseText,
              });
              await addChapterNote.save();
              index++;
              break; // Exit retry loop if successful
            } catch (error) {
              retryCount++;
              console.error(
                `Error generating notes for chapter "${
                  item.title || "Unnamed Chapter"
                }":`,
                error.message
              );

              if (retryCount < maxRetries) {
                console.log(`Retrying after ${backoff * retryCount}ms...`);
                await delay(backoff * retryCount); // Exponential backoff
              } else {
                console.error(
                  "Max retries reached for chapter:",
                  item.title || "Unnamed Chapter"
                );
              }
            }
          }
        }

        await Course.findByIdAndUpdate(savedCourse._id, {
          status: "generated",
        });
        console.log("Course status updated to 'generated'");
      } catch (error) {
        console.error("Error in processing chapters:", error.message);
      }
    })();
  } catch (error) {
    // Handle errors
    console.error("Error creating course:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const getAllUserCourse = async (req, res) => {
  const userId = req.params.userId;
  try {
    const getUserCourse = await Course.find({
      createdBy: userId,
    });
    if (!getUserCourse) {
      return res.status(404).json({ message: "No Course Created yet.." });
    }
    res
      .status(201)
      .json({
        message: "User courses retrieved successfully",
        userCourses: getUserCourse,
      });
  } catch (err) {
    console.error("Error getting user courses:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const getCurrentCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const getUserCourse = await Course.findOne({
      courseId: courseId,
    });
    if (!getUserCourse) {
      return res.status(404).json({ message: "No Course Created yet.." });
    }
    res
      .status(201)
      .json({
        message: "User courses retrieved successfully",
        course: getUserCourse.courseLayout.studyMaterial,
        
      });
  } catch (err) {
    console.error("Error getting user courses:", err.message);
    return res.status(500).json({ message: err.message });
  }
};
