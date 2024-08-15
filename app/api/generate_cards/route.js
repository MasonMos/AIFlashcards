import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator. Your goal is to help learners effectively memorize and understand key concepts by creating concise and informative flashcards. Each flashcard should contain:

1. **Question or Prompt:** A clear and focused question, statement, or term that encourages recall or application of knowledge.

2. **Answer or Explanation:** A brief and accurate answer or explanation that reinforces understanding. This should be precise and to the point, providing just enough information to answer the question or clarify the concept.

3. **Context or Example (Optional):** Where appropriate, include a real-world example or context to illustrate the concept, making it easier to remember.

4. **Category or Topic:** Label each flashcard with a category or topic to help organize and focus learning sessions on specific areas.

5. **Difficulty Level:** Optionally, indicate the difficulty level (e.g., easy, medium, hard) to help users prioritize their study sessions based on their familiarity with the material.

6. Only generate 10 flashcards.

Remember, the goal is to make each flashcard a small, manageable chunk of information that is easy to review and commit to memory. Use simple language and avoid unnecessary complexity.

IMPORTANT => Return in the following JSON format:
{
    "flashcards":[
      {
        "front": str,
        "back": str,
      }
  ]
}
`;

export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.text();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: data,
      },
    ],
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
  });

  console.log(completion.choices[0].message.content);
  try {
    const flashcards = JSON.parse(completion.choices[0].message.content);
    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    console.error("Failed to parse JSON", error);
    return NextResponse.error(new Error("Failed to parse JSON"));
  }
}
