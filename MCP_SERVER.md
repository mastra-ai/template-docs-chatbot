# MCP Server Setup Guide - HTTP/SSE Transport

This project includes a Model Context Protocol (MCP) server configured for **HTTP/SSE transport** and deployment on **Mastra Cloud**.

## What's Included

The MCP server exposes:

### 🛠️ **Tools**

- **Documentation Tools**: Search docs, examples, blog posts, and changelogs
- **Link Checker**: Validate URLs before sharing them
- **Planets Tool**: Get detailed information about planets in our solar system with random facts

### 🤖 **Agents** (as Tools)

- **`ask_planets`**: Specialized planets agent that provides fascinating information about planets

## Running the MCP Server

### Local Development

```bash
# Start the MCP server locally via HTTP/SSE
pnpm run mcp:server
```

This starts the server at `http://localhost:8080/mcp` with HTTP/SSE transport.

### Production Deployment

Deploy to **Mastra Cloud** for production use. See `deployment-guide.md` for complete instructions.

## Using the MCP Server

### From Another Mastra Project

```typescript
import { MCPClient } from '@mastra/mcp';
import { Agent } from '@mastra/core/agent';

// Connect to your MCP server
const mcpClient = new MCPClient({
  servers: {
    docsChatbot: {
      // Local development
      url: new URL('http://localhost:8080/mcp'),

      // Production (replace with your Mastra Cloud URL)
      // url: new URL('https://your-project.mastra.cloud/mcp'),
    },
  },
});

// Create an agent with MCP tools
const agent = new Agent({
  name: 'My Agent',
  instructions: 'You can use the documentation and link checking tools.',
  model: openai('gpt-4'),
  tools: await mcpClient.getTools(),
});
```

### From Web Applications

Since the server uses HTTP/SSE transport, you can connect from web applications:

```typescript
// Web client example
const response = await fetch('http://localhost:8080/mcp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    // MCP request
  }),
});
```

### Tool Usage Examples

Once connected, you can use:

1. **Documentation Search**:

   - "Search for information about Mastra workflows"
   - "Find examples of agent creation"
   - "Look up the latest changelog entries"

2. **Agent Delegation**:

   - Use `ask_docs` tool: "Ask the docs agent about tool creation"

3. **Link Validation**:
   - "Check if this URL is valid: https://mastra.ai/docs"

## Demo Scripts

### Planets Demo
Test the planets functionality:
```bash
pnpm run planets:demo
```

This demonstrates:
- Getting random planet information
- Querying specific planets
- Using the planets agent for questions and comparisons

### Tool Usage Examples

1. **Planets Information**:
   - "Tell me about Jupiter"
   - "Give me information about a random planet"
   - "Compare Mars and Earth"
   - "What are some interesting facts about Saturn?"

2. **Agent Delegation**:
   - Use `ask_planets` tool: "Ask the planets agent about Neptune"

3. **Link Validation**:
   - "Check if this URL is valid: https://mastra.ai/docs"

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   MCP Client    │────│   MCP Server    │────│  Mastra Tools   │
│   (Web/IDE/     │    │  (HTTP/SSE)     │    │  & Agents       │
│    Other Agent) │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

The MCP server uses HTTP/SSE transport, making it accessible from:

- Web applications
- Other Mastra projects
- IDEs with HTTP MCP support
- Any HTTP client

## Key Benefits

1. **HTTP/SSE Transport**: Compatible with web applications and cloud deployments
2. **Mastra Cloud Ready**: Optimized for Mastra Cloud deployment
3. **Tool Sharing**: Share your specialized tools across different projects
4. **Agent Delegation**: Let other agents ask your specialized agents questions
5. **Web Compatible**: Can be used from browsers and web applications
6. **Auto Scaling**: Mastra Cloud handles scaling automatically

## Health Monitoring

The server includes built-in health endpoints:

- **Health Check**: `GET /health` - Server status
- **MCP Info**: `GET /mcp/info` - Server details and configuration

## Troubleshooting

### Server Won't Start

- Check that all dependencies are installed: `pnpm install`
- Verify your environment variables in `.env`
- Check for port conflicts (default: 8080)

### Client Can't Connect

- Ensure the server is running: `pnpm run mcp:server`
- Check the URL in your MCP client configuration
- Verify CORS settings if connecting from a web application

### Tools Not Working

- Check that your `.env` file has the required API keys (OPENAI_API_KEY)
- Verify network connectivity for external tools
- Check server logs for error messages

## Next Steps

- **Deploy to Mastra Cloud**: Follow the `deployment-guide.md` for production deployment
- **Add more tools**: Extend `src/mastra/tools/` with custom tools
- **Connect from web apps**: Use the HTTP/SSE transport for web integrations
- **Scale automatically**: Let Mastra Cloud handle traffic and infrastructure
