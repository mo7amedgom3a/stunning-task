interface IdeaRequest {
  idea: string
}

interface IdeaResponse {
  improved_content: string
}

const API_BASE_URL =  "http://54.227.78.194:8000" // server puplic IP

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
