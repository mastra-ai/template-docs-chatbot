#!/usr/bin/env tsx

import { startHttpServer } from '../mastra/mcp-server.js';

// Get port from environment or default to 8080
const port = parseInt(process.env.PORT || '8080', 10);

// Start the MCP server via HTTP/SSE
startHttpServer(port).catch((error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});
