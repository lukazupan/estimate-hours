import { generateGeminiSummary } from './summaryAgent.js'

export async function getSummary(data: any, estimatedTime: number): Promise<string> {
	const repoName = data.name
	const owner = data.owner.login

	try {
		const promptData = {
		task: 'repository_analysis',
		repository: {
			name: repoName,
			owner: owner,
			data: data,
		},
		metrics: {
			developmentHours: estimatedTime,
		},
		outputFormat: 'json',
		sections: [
			{
			title: 'Repository',
			type: 'text',
			value: repoName,
			},
			{
			title: 'Development Hours',
			type: 'number',
			value: estimatedTime,
			},
			{
			title: 'Languages Used',
			type: 'list',
			description: 'Main programming languages with percentages',
			},
			{
			title: 'Purpose',
			type: 'text',
			description: "Brief description of the repository's function",
			},
			{
			title: 'Size & Complexity',
			type: 'assessment',
			description: 'Brief assessment of repository size and complexity',
			},
			{
			title: 'Key Features',
			type: 'bullet_list',
			description: 'Main features of the repository',
			},
			{
			title: 'Development Effort',
			type: 'text',
			description: 'How the development time was likely spent',
			},
			{
			title: 'Overall Assessment',
			type: 'conclusion',
			description: '1-2 sentence conclusion about the repository',
			},
		],
		instructions:
			"Analyze the GitHub repository and return a JSON object with the exact structure provided in the 'sections' field. Each section should have filled values based on repository analysis.",
		}

		const promptJson = JSON.stringify(promptData, null, 2)

		const summary = await generateGeminiSummary(`
			Return a well-structured JSON response matching this format:
			${promptJson}

			CRITICAL INSTRUCTIONS:
			1. Return ONLY a valid JSON object that can be parsed
			2. Do NOT include any markdown formatting like \`\`\`json or \`\`\` 
			3. Do NOT include any explanatory text before or after the JSON
			4. Do NOT use code blocks or any formatting - just the raw JSON
			5. Start your response with "{" and end with "}"
			
			Your entire response must be parseable by JSON.parse() without any preprocessing.
		`)

		return summary
	} catch (error) {
		console.error('Error generating summary:', error)
		throw new Error('Failed to generate repository summary')
	}
}
