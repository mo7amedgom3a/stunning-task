interface IdeaRequest {
  idea: string
}

interface IdeaResponse {
  improved_content: string
}

export async function improveIdea(idea: string): Promise<string> {
  const isDev = process.env.ENV === 'dev';
  const url = isDev ? `localhost/improve` : "/api/improve";

  const response = await fetch(url, {
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
