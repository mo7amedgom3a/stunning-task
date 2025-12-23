interface IdeaRequest {
  idea: string
}

interface IdeaResponse {
  improved_content: string
}

const API_BASE_URL =  "http://ec2-54-227-78-194.compute-1.amazonaws.com:8000" // server dns 

export async function improveIdea(idea: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/improve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idea } as IdeaRequest),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const data: IdeaResponse = await response.json()
  return data.improved_content
}
