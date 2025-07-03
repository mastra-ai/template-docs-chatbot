import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { mcpClient } from '../mcp/mcp-client';

// Create an agent that uses tools from the MCP server
export const mcpClientAgent = new Agent({
  name: 'MCP Client Agent',
  instructions: `You are a helpful assistant that can use tools provided by an MCP server via HTTP/SSE.

    You have access to:
    - Documentation tools for searching docs
    - Link checking tools to validate URLs
    - Agent tools (ask_docs) that let you delegate questions to specialized agents

    When users ask questions:
    1. Use the appropriate tools to gather information
    2. If you need specialized help, use the ask_docs agent tool
    3. Always validate any URLs you share using the link checker
    4. Provide comprehensive, accurate responses based on the tool results
    `,
  model: openai('gpt-4.1'),
  // Get tools dynamically from the MCP server
  tools: await mcpClient.getTools(),
});
