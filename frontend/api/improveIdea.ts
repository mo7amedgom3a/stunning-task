interface IdeaRequest {
  idea: string
}

export async function improveIdea(
  idea: string,
  onChunk?: (chunk: string) => void
): Promise<string> {
  // In development, NEXT_PUBLIC_API_URL will be set (e.g., http://localhost:8000)
  // In production (Vercel), it won't be set, so we use the proxy /api/improve
  const url = process.env.NEXT_PUBLIC_API_URL 
    ? `${process.env.NEXT_PUBLIC_API_URL}/improve`  // Development: http://localhost:8000/improve
    : "/api/improve";  // Production: /api/improve (Vercel proxy)

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

  // Check if the response is streaming
  if (!response.body) {
    throw new Error("Response body is null")
  }

  // Get the reader from the response body
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let resultText = ""

  // Loop through the stream
  let charCount = 0 // Track total characters displayed
  
  while (true) {
    const { done, value } = await reader.read()
    
    if (done) {
      break // Stream finished
    }
    
    // Decode the chunk
    const chunk = decoder.decode(value, { stream: true })
    resultText += chunk
    
    // Display chunk character-by-character for typing effect
    if (onChunk) {
      for (let i = 0; i < chunk.length; i++) {
        const char = chunk[i]
        onChunk(char)
        
        let delay = 5 // default fast speed
        if (charCount < 20) {
          delay = 50 // slow start for first 20 characters
        } else if (charCount < 50) {
          delay = 30 // medium speed
        } else if (charCount < 100) {
          delay = 15 // faster
        }
        
        await new Promise(resolve => setTimeout(resolve, delay))
        charCount++
      }
    }
  }

  return resultText
}

