export async function getEstimation(username: string): Promise<any> {
	const response = await fetch(`http://localhost:8080/estimate-time?username=${username}`)

	const data = await response.json()

	console.log(data)

	return data
}

export async function getSpecificEstimation(username: string, repoName: string): Promise<any> {
	const response = await fetch(
		`http://localhost:8080/estimate-specific-time?username=${username}&repoName=${repoName}`,
	)

	const data = await response.json()

	console.log(data)

	return data
}

export async function getSummary(data: any, estimatedTime: number): Promise<any> {
	const useMock = import.meta.env.VITE_USE_MOCK === 'true'

	const loadMock = async () => {
		try {
			const mockResp = await fetch('/mock-summary.json')
			const mockJson = await mockResp.json()
			return { summary: JSON.stringify(mockJson) }
		} catch (e) {
			console.error('Failed to load mock summary:', e)
			throw e
		}
	}

	if (useMock) {
		return await loadMock()
	}

	try {
		const response = await fetch('http://localhost:8080/agent-summary', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				data: data,
				estimatedTime: estimatedTime,
			}),
		})

		if (!response.ok) {
			throw new Error(`Agent summary request failed: ${response.status}`)
		}

		const res = await response.json()

		if (res && res.summary) {
			return res
		}
		
		return await loadMock()
	} catch(err) {
		console.error('Error fetching summary from backend, mocking instead')

		return await loadMock()
	}
}

export async function getRepos(username: string): Promise<any> {
	const response = await fetch(`http://localhost:8080/repos?username=${username}`)

	const data = await response.json()

	return data
}
