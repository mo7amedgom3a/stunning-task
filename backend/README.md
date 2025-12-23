# Backend - Stunning Task API

> FastAPI backend powered by Google Gemini AI and LangChain for intelligent idea improvement.

## 🚀 Overview

The backend is a high-performance FastAPI application that processes user ideas and transforms them into detailed, structured website prompts using Google's Gemini 2.5 Flash model via LangChain. It provides a RESTful API with CORS support for seamless frontend integration.

## ✨ Features

- 🤖 **AI-Powered**: Google Gemini 2.5 Flash integration
- 🔗 **LangChain**: Advanced prompt engineering and AI orchestration
- ⚡ **FastAPI**: High-performance async API framework
- 🌐 **CORS Enabled**: Seamless frontend communication
- 📝 **Auto Documentation**: Interactive API docs with Swagger UI
- 🔒 **Type Safe**: Pydantic models for request/response validation
- 🏥 **Health Checks**: Monitoring endpoint for container orchestration

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │
└────────┬────────┘
         │ HTTP POST /improve
         │ { "idea": "..." }
         ▼
┌─────────────────┐
│   FastAPI       │
│   Application   │
├─────────────────┤
│ • CORS Middleware
│ • Request Validation
│ • Error Handling
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   LangChain     │
│   Pipeline      │
├─────────────────┤
│ 1. Prompt Template
│ 2. LLM (Gemini)
│ 3. Output Parser
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Google Gemini  │
│  2.5 Flash API  │
└────────┬────────┘
         │
         ▼
    AI Response
```

## 🛠️ Technology Stack

- **Framework**: FastAPI 0.115.6
- **Language**: Python 3.10+
- **AI Integration**: LangChain 0.3.14
- **LLM**: Google Generative AI (Gemini 2.5 Flash)
- **Server**: Uvicorn (ASGI)
- **Validation**: Pydantic v2
- **Environment**: python-dotenv

## 📁 Project Structure

```
backend/
├── main.py              # Main application file
├── requirements.txt     # Python dependencies
├── Dockerfile          # Docker configuration
├── .env               # Environment variables (not in git)
├── .env.example       # Environment template
├── test-model.py      # Model testing script
└── README.md         # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.10 or higher
- Google API Key (Gemini)
- pip or poetry

### Installation

1. **Create virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file
   echo "GOOGLE_API_KEY=your_api_key_here" > .env
   ```

4. **Run the server**

   ```bash
   uvicorn main:app --reload
   ```

5. **Access the API**
   - API: http://localhost:8000
   - Docs: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## 📡 API Endpoints

### POST /improve

Improve a website idea using AI.

**Request:**

```json
{
  "idea": "I want a website for my gym"
}
```

**Response:**

```json
{
  "improved_content": "**Website Purpose:**\nThe primary goal of this website is to attract and convert new members by vividly showcasing our gym's unique atmosphere...\n\n**Key Sections:**\n- Home\n- About Us\n- Classes & Programs\n- Schedule\n- Membership & Pricing\n\n**Target Users:**\n- Prospective new members\n- Existing members\n- Local community\n\n**Design Tone:**\n- Energetic & Motivating\n- Clean & Modern\n- Community-Focused"
}
```

**Status Codes:**

- `200 OK`: Success
- `422 Unprocessable Entity`: Invalid request
- `500 Internal Server Error`: Server error

### GET /health

Health check endpoint for monitoring.

**Response:**

```json
{
  "status": "ok"
}
```

**Status Codes:**

- `200 OK`: Service is healthy

## 🤖 LangChain Integration

### Pipeline Architecture

The application uses LangChain Expression Language (LCEL) to create a processing chain:

```python
chain = prompt_template | llm | output_parser
```

**Components:**

1. **Prompt Template**: Structures the user input
2. **LLM**: Google Gemini 2.5 Flash model
3. **Output Parser**: Converts AI response to string

### Prompt Engineering

The system uses a carefully crafted prompt template:

```python
template = """You are a product expert helping users turn rough website ideas
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
```

### Model Configuration

```python
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.7,
    timeout=None,
    max_retries=5,
)
```

**Parameters:**

- `temperature`: 0.7 (balanced creativity/consistency)
- `max_retries`: 5 (automatic retry on failures)
- `timeout`: None (no timeout limit)

## 🔧 Configuration

### Environment Variables

| Variable         | Description           | Required |
| ---------------- | --------------------- | -------- |
| `GOOGLE_API_KEY` | Google Gemini API key | Yes      |

**Example .env file:**

```bash
GOOGLE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### CORS Configuration

The API allows requests from:

- `http://localhost:3000` (Frontend development)

**Configuration:**

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🐳 Docker

### Build Image

```bash
docker build -t stunning-backend .
```

### Run Container

```bash
docker run -p 8000:8000 --env-file .env stunning-backend
```

### Using Docker Compose

```bash
docker-compose up backend
```

## 📊 Request/Response Models

### IdeaRequest (Pydantic)

```python
class IdeaRequest(BaseModel):
    idea: str
```

### IdeaResponse (Pydantic)

```python
class IdeaResponse(BaseModel):
    improved_content: str
```

## 🧪 Testing

### Manual Testing

1. **Using curl:**

   ```bash
   curl -X POST "http://localhost:8000/improve" \
        -H "Content-Type: application/json" \
        -d '{"idea": "I want a website for my gym"}'
   ```

2. **Using Swagger UI:**

   - Navigate to http://localhost:8000/docs
   - Click on `/improve` endpoint
   - Click "Try it out"
   - Enter your idea
   - Click "Execute"

3. **Using test script:**
   ```bash
   python test-model.py
   ```

### Health Check

```bash
curl http://localhost:8000/health
```

## 📝 Dependencies

```txt
fastapi==0.115.6
uvicorn==0.34.0
pydantic==2.10.5
python-dotenv==1.0.1
langchain==0.3.14
langchain-google-genai==2.0.8
```

## 🔒 Security

### Best Practices

- ✅ Environment variables for secrets
- ✅ CORS restrictions
- ✅ Input validation with Pydantic
- ✅ Error handling without exposing internals
- ⚠️ Add: Rate limiting (recommended for production)
- ⚠️ Add: API key authentication (recommended for production)

## ⚡ Performance

### Optimizations

- Async/await for non-blocking operations
- Connection pooling
- Automatic retries on failures
- Efficient prompt engineering

### Monitoring

- Health check endpoint for container orchestration
- Structured error responses
- Request/response logging (add in production)

## 🚨 Error Handling

The API provides detailed error responses:

```python
try:
    response = await chain.ainvoke({"idea": request.idea})
    return IdeaResponse(improved_content=response)
except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))
```

## 📚 API Documentation

### Interactive Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### OpenAPI Schema

Access the OpenAPI schema at:

- http://localhost:8000/openapi.json

## 🔄 Development Workflow

1. **Make changes** to `main.py`
2. **Server auto-reloads** (with `--reload` flag)
3. **Test** using Swagger UI or curl
4. **Check logs** in terminal
5. **Commit** changes

## 🌐 Production Deployment

### Recommendations

1. **Use production ASGI server:**

   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
   ```

2. **Add rate limiting:**

   ```python
   from slowapi import Limiter
   ```

3. **Implement caching:**

   ```python
   from fastapi_cache import FastAPICache
   ```

4. **Add monitoring:**

   - Prometheus metrics
   - Sentry error tracking
   - CloudWatch logs

5. **Secure API:**
   - API key authentication
   - HTTPS only
   - Request validation

## 🤝 Contributing

When contributing to the backend:

1. Follow PEP 8 style guide
2. Add type hints
3. Update API documentation
4. Test with different inputs
5. Handle errors gracefully

## 📖 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [LangChain Documentation](https://python.langchain.com)
- [Google Gemini API](https://ai.google.dev)
- [Pydantic Documentation](https://docs.pydantic.dev)
