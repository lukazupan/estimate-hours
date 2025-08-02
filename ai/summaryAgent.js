import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing. Please set it in your environment.');
}
const genAI = new GoogleGenerativeAI(apiKey)

export async function generateGeminiSummary(prompt) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const res = await model.generateContent(prompt)
    const response = res.response
    return response.text()
}
