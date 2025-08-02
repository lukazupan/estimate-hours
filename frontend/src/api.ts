export async function getEstimation(username: string): Promise<any> {
    const response = await fetch(`http://localhost:8080/estimate-time?username=${username}`)

    const data = await response.json()

    console.log(data)

    return data
}

export async function getSummary (data: any, estimatedTime: number): Promise<any> {
    const params = new URLSearchParams({
        data: JSON.stringify(data),
        estimatedTime: estimatedTime.toString()
    })
    
    const response = await fetch(`http://localhost:8080/agent-summary?${params}`)
    return await response.json()
}