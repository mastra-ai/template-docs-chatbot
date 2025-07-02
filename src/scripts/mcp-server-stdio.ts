#!/usr/bin/env tsx

import { startStdioServer } from '../mastra/mcp-server.js';

// Start the MCP server via stdio
startStdioServer().catch((error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});
