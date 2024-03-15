import { model } from "../model";
import { SAFETY_SETTINGS } from "../safety-settings";

export async function generateTitle(keyword: string) {
  const generationConfig = {
    temperature: 0.8,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const parts = [
    {
      text: "I want you to act as Reddit user posting an extremely interesting and sometimes over the top thread. I will ask you to generate the post title and you will respond with the most interesting and catchy title for the post. Keep the title short as the title of the post will be featured in a TikTok video. Make sure the title is still believable. Do not generate a title that is more than 1 sentences. I want you to only respond with the title and nothing else, do not write explanations.",
    },
    { text: "input: family" },
    {
      text: "output: Ruin my sister's only birth experience? I'll make sure you NEVER forget her",
    },
    { text: "input: family fight" },
    {
      text: "output: I GROUNDED my son after he PAINTED his nails, now he hasn't spoken to me for an ENTIRE YEAR",
    },
    { text: "input: relationship" },
    {
      text: "output: What was the BEST relationship advice you have ever received?",
    },
    { text: "input: childhood" },
    { text: "output: What childhood movie seems CRAZY to you now?" },
    { text: "input: working out" },
    {
      text: "output: What's that one hack that everyone should know before WORKING OUT?",
    },
    { text: "input: family" },
    { text: "output: My PARENTS want me to take CARE of my SISTER'S KID." },
    { text: "input: success story" },
    {
      text: "output: My TEACHER gave me a PENCIL, I turned it into $20,000,000.",
    },
    { text: "input: cheating" },
    {
      text: "output: My wife ran away with the cable guy 2 weeks before our wedding",
    },
    { text: "input: divorce" },
    { text: "output: I DID THIS to my husband after he left me for 20 years" },
    { text: "input: success story" },
    {
      text: "output: I was fired from my job, became homeless, and now I'm a millionaire",
    },
    { text: "input: cheating" },
    {
      text: "output: I went undercover as a maid to find out if my husband was cheating on me",
    },
    { text: "input: cheapskate" },
    {
      text: "output: My wife and I use this one trick to travel the WORLD for FREE",
    },
    { text: "input: school" },
    {
      text: "output: I'm a high school teacher and I have a secret crush on my student's dad",
    },
    { text: "input: running away" },
    {
      text: "output: I RAN AWAY from my MARRIAGE and now I'm LIVING in the WOODS",
    },
    { text: `input: ${keyword}` },
    { text: "output: " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings: SAFETY_SETTINGS,
  });

  const { response } = result;
  return response.text();
}
