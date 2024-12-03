import React from "react";
import he from "he";

interface CurrentChapter{
    allMaterials: any;
    currentPage: number;
}
const CurrentChapterNote:React.FC<CurrentChapter> = ({ allMaterials, currentPage }) => {

  const notes = allMaterials[currentPage]?.notes;

  let htmlContent = "";

  try {
    // Parse the notes field to get the actual content
    const notes = JSON.parse(allMaterials[currentPage]?.notes);

    // Replace escaped newlines with proper newlines
    htmlContent = notes.content.replace(/\\n/g, "\n");
  } catch (error) {
    console.error("Error parsing notes:", error);
    htmlContent = "<p>Invalid content</p>";
  }
  return (
    <div className="prose max-w-none">
      <div
        className="whitespace-pre-wrap break-words"
        dangerouslySetInnerHTML={{
          __html: htmlContent,
        }}
      />
    </div>
  );
};

export default CurrentChapterNote;