# MCP Server Setup Guide

This project includes a Model Context Protocol (MCP) server that exposes your Mastra tools and agents to other MCP clients.

## What's Included

The MCP server exposes:

### 🛠️ **Tools**
- **Documentation Tools**: Search Mastra docs, examples, blog posts, and changelogs
- **Link Checker**: Validate URLs before sharing them
- **Weather Tools**: Get current weather information

### 🤖 **Agents** (as Tools)
- **`ask_docs`**: Specialized documentation agent
- **`ask_weather`**: Weather information agent

## Running the MCP Server

### Option 1: Stdio (Command Line)
```bash
pnpm run mcp:stdio
```
This starts the server using stdio transport, perfect for connecting from other processes.

### Option 2: HTTP/SSE (Web Server)
```bash
pnpm run mcp:http
```
This starts an HTTP server on port 8080 with SSE support at `http://localhost:8080/mcp`.

## Using the MCP Server

### From Another Mastra Project
```typescript
import { MCPClient } from '@mastra/mcp';
import { Agent } from '@mastra/core/agent';

// Connect to your MCP server
const mcpClient = new MCPClient({
  servers: {
    docsChatbot: {
      command: 'pnpm',
      args: ['run', 'mcp:stdio'],
      // Or use HTTP:
      // url: new URL('http://localhost:8080/mcp'),
    },
  },
});

// Create an agent with MCP tools
const agent = new Agent({
  name: 'My Agent',
  instructions: 'You can use the documentation and weather tools.',
  model: openai('gpt-4'),
  tools: await mcpClient.getTools(),
});
```

### From Cursor/Windsurf IDE
Add to your `.cursor/mcp.json` or `~/.codeium/windsurf/mcp_config.json`:
```json
{
  "mcpServers": {
    "template-docs-chatbot": {
      "command": "pnpm",
      "args": ["run", "mcp:stdio"],
      "cwd": "/path/to/this/project"
    }
  }
}
```

### Tool Usage Examples

Once connected, you can use:

1. **Documentation Search**:
   - "Search for information about Mastra workflows"
   - "Find examples of agent creation"
   - "Look up the latest changelog entries"

2. **Agent Delegation**:
   - Use `ask_docs` tool: "Ask the docs agent about tool creation"
   - Use `ask_weather` tool: "Ask the weather agent about current conditions"

3. **Link Validation**:
   - "Check if this URL is valid: https://mastra.ai/docs"

## Demo Script

Run the included demo to see how everything works:
```bash
pnpm run mcp:demo
```

This will demonstrate:
- Static tool usage (tools loaded at agent creation)
- Dynamic tool usage (tools loaded at runtime)
- Agent delegation via MCP tools

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   MCP Client    │────│   MCP Server    │────│  Mastra Tools   │
│   (Your IDE/    │    │  (This Project) │    │  & Agents       │
│    Other Agent) │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

The MCP server acts as a bridge, exposing your Mastra tools and agents to any MCP-compatible client.

## Key Benefits

1. **Tool Sharing**: Share your specialized tools across different projects
2. **Agent Delegation**: Let other agents ask your specialized agents questions
3. **IDE Integration**: Use your tools directly in Cursor, Windsurf, or other MCP-enabled IDEs
4. **Microservices**: Create focused tool servers for specific domains

## Troubleshooting

### Server Won't Start
- Check that all dependencies are installed: `pnpm install`
- Verify TypeScript compilation: `pnpm run build`
- Check for port conflicts (if using HTTP mode)

### Client Can't Connect
- Ensure the server is running
- Check the command/URL in your MCP client configuration
- Verify the working directory is correct (for stdio)

### Tools Not Working
- Check that your `.env` file has the required API keys
- Verify network connectivity for external tools
- Check server logs for error messages

## Next Steps

- Add more custom tools to `src/mastra/tools/`
- Create specialized agents for different domains
- Connect from other Mastra projects or MCP clients
- Deploy the MCP server for team-wide access
