import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = `AIzaSyCfRn6fi_4QTU3TKvr0tbNWHDnMhlC6NPU`;
if (!apiKey) {
    throw new Error(
        "Google Generative AI API key is missing. Set the GOOGLE_GEN_AI_API_KEY environment variable."
    );
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

let CourseOutline, ChapterNotesAIModel;

(async () => {
    try {
        CourseOutline = model.startChat({
            generationConfig,
        });
        console.log("CourseOutline initialized successfully.");
    } catch (error) {
        console.error("Error initializing CourseOutline:", error.message);
    }
})();
(async () => {
    try {
        ChapterNotesAIModel = model.startChat({
            generationConfig,
            history: [
                {
                  role: "user",
                  parts: [
                    {text: "`Generate exam material detail content for each chapter, Make Sure to include all topic point in the content, make sure to give content in HTML format (Do not Add HTML, Head, Body,title tag), The chapters: {\n                                \"title\": \"Object-Oriented Programming in Java\",\n\"description\": \"This chapter covers the core principles of object-oriented programming (OOP) in Java.\",\n\"topics\": [\n\"Classes and Objects\",\n\"Encapsulation\",\n\"Inheritance\",\n\"Polymorphism\",\n\"Abstraction\"\n]"},
                  ],
                },
                {
                  role: "model",
                  parts: [
                    {text: "```html\n<h2>Chapter 1: Object-Oriented Programming in Java</h2>\n<p>This chapter covers the core principles of object-oriented programming (OOP) in Java.</p>\n\n<h3>Classes and Objects</h3>\n<p>Defines classes as blueprints for creating objects and explains how to create and use objects. Covers instance variables, methods, constructors, and the <code>new</code> keyword.</p>\n\n<h3>Encapsulation</h3>\n<p>Explains the concept of bundling data (variables) and methods that operate on that data within a class. Discusses access modifiers (public, private, protected) and their role in controlling access to class members.  Illustrates how encapsulation promotes data hiding and information security.</p>\n\n<h3>Inheritance</h3>\n<p>Describes how to create new classes (subclasses or derived classes) based on existing classes (superclasses or base classes).  Explains the concept of \"is-a\" relationship and how inheritance promotes code reuse. Covers the <code>extends</code> keyword, method overriding, the <code>super</code> keyword, and different types of inheritance (single, multi-level, hierarchical).</p>\n\n<h3>Polymorphism</h3>\n<p>Explains the ability of an object to take on many forms. Discusses method overloading (compile-time polymorphism) and method overriding (runtime polymorphism). Explains the use of abstract classes and interfaces to achieve polymorphism. Covers the concept of dynamic binding and its importance in polymorphism.</p>\n\n<h3>Abstraction</h3>\n<p>Explains the concept of simplifying complex systems by modeling classes based on their essential characteristics.  Discusses abstract classes and interfaces as tools for achieving abstraction.  Covers the use of the <code>abstract</code> keyword and the importance of abstract methods in defining common behavior.</p>\n```"},
                  ],
                },
              ],
        });
        console.log("ChapterNotes initialized successfully.");
    } catch (error) {
        console.error("Error initializing ChapterNotes:", error.message);
    }
})();

export { CourseOutline, ChapterNotesAIModel };
