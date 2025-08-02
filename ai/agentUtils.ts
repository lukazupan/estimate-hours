import { generateGeminiSummary } from './summaryAgent.js'

export async function getSummary (data: any, estimatedTime: number): Promise<string> {

    const repoName = data.name
    const owner = data.owner.login

    try {
        const summary = await generateGeminiSummary(`
            Repo: ${repoName}
            Owner: ${owner}

            Detailed repository data(in JSON format):
            ${JSON.stringify(data)}

            Time spent writing code in the repo(in hours):
            ${estimatedTime}
        
            I provided you with all the necessary data, summarise based on the repo data,
            time spent coding, write a short summary of the repository, what kind of work,
            how much work went into making it.
        `)

        return summary
    } catch (error) {
        console.error('Error generating summary:', error)
        throw new Error('Failed to generate repository summary')
    }
}
