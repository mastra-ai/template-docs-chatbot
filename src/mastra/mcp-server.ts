import { MCPServer } from '@mastra/mcp';
import { docsAgent } from './agents/docs-agent';
import { weatherAgent } from './agents/weather-agent';
import { docsMcp } from './tools/docs-mcp';
import { linkCheckerTool } from './tools/link-checker-tool';
import { weatherTool } from './tools/weather-tool';

// Get all MCP tools from docs-mcp
const mcpTools = await docsMcp.getTools();

// Create MCP server with tools and agents
export const mcpServer = new MCPServer({
  name: 'Template Docs Chatbot MCP Server',
  version: '1.0.0',
  description: 'Provides access to documentation tools, weather tools, and intelligent agents',

  // Expose individual tools
  tools: {
    ...mcpTools,
    linkCheckerTool,
    weatherTool,
  },

  // Expose agents as tools (they become ask_<agentName> tools)
  agents: {
    docs: docsAgent,
    weather: weatherAgent,
  }
});

// Export a function to start the server via stdio (for command-line usage)
export async function startStdioServer() {
  console.log('Starting MCP server via stdio...');
  await mcpServer.startStdio();
}

// Export a function to start the server via HTTP/SSE (for web usage)
export async function startHttpServer(port: number = 8080) {
  const { createServer } = await import('http');

  const httpServer = createServer(async (req, res) => {
    const url = new URL(req.url || '', `http://localhost:${port}`);

    await mcpServer.startSSE({
      url,
      ssePath: '/mcp',
      messagePath: '/mcp/message',
      req,
      res,
    });
  });

  httpServer.listen(port, () => {
    console.log(`MCP server running on http://localhost:${port}/mcp`);
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('Shutting down MCP server...');
    await mcpServer.close();
    httpServer.close(() => {
      console.log('MCP server shut down complete');
      process.exit(0);
    });
  });

  return httpServer;
}

// If this file is run directly, start the stdio server
if (import.meta.url === `file://${process.argv[1]}`) {
  startStdioServer().catch(console.error);
}
