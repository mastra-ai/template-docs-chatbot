import { MCPClient } from '@mastra/mcp';

// Create an MCP configuration for the docs server
export const docsMcp = new MCPClient({
  id: 'example-docs', // Unique identifier to prevent memory leaks
  servers: {

  },
});
