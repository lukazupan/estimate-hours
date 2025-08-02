export async function getEstimation(username: string): Promise<any> {
    const response = await fetch(`http://localhost:8080/estimate-time?username=${username}`)

    const data = await response.json()

    console.log(data)

    return data
}

export async function getSpecificEstimation(username: string, repoName: string): Promise<any> {
    const response = await fetch(`http://localhost:8080/estimate-specific-time?username=${username}&repoName=${repoName}`)

    const data = await response.json()

    console.log(data)

    return data
}

export async function getSummary (data: any, estimatedTime: number): Promise<any> {
    const response = await fetch('http://localhost:8080/agent-summary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: data,
            estimatedTime: estimatedTime
        })
    })
    
    return await response.json()
}