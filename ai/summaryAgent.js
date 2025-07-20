import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

export async function generateGeminiSummary(prompt) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const res = await model.generateContent(prompt)
    const response = res.response
    return response.text()
}
