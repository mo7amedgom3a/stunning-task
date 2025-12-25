import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

if not os.getenv("GOOGLE_API_KEY"):
    raise ValueError("GOOGLE_API_KEY is missing from .env file")

app = FastAPI(title="Gemini Idea Improver")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class IdeaRequest(BaseModel):
    idea: str

class IdeaResponse(BaseModel):
    improved_content: str

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.7,
    timeout=None,
    max_retries=5,
)
template_text = """You are a product expert helping users turn rough website ideas
into clear, detailed prompts they can use to build a website.

User idea:
"{idea}"

Rewrite it as a clear, structured website prompt.
Focus on:
- Website purpose
- Key sections
- Target users
- Design tone

Improved prompt:"""

prompt_template = ChatPromptTemplate.from_template(template_text)
output_parser = StrOutputParser()

# Create the Chain (LCEL)
chain = prompt_template | llm | output_parser


@app.post("/improve")
async def improve_idea(request: IdeaRequest):
    async def stream_generator():
        try:
            # Stream tokens from LangChain using astream()
            async for chunk in chain.astream({"idea": request.idea}):
                # Send each chunk as it arrives
                yield chunk
        except Exception as e:
            # In case of error, send error message
            yield f"\n\nError: {str(e)}"
    
    return StreamingResponse(
        stream_generator(),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no"  # Disable buffering for nginx
        }
    )

@app.get("/health")
def health_check():
    return {"status": "ok"}