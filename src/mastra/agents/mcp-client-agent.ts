import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { MCPClient } from '@mastra/mcp';

// Create an MCP client to connect to our local MCP server
const mcpClient = new MCPClient({
  servers: {
    // Connect to local MCP server via stdio
    localTools: {
      command: 'pnpm',
      args: ['run', 'mcp:stdio'],
    },

    // Alternative: Connect via HTTP/SSE (if you prefer)
    // localToolsHttp: {
    //   url: new URL('http://localhost:8080/mcp'),
    // },
  },
});

// Create an agent that uses tools from the MCP server
export const mcpClientAgent = new Agent({
  name: 'MCP Client Agent',
  instructions: `You are a helpful assistant that can use tools provided by an MCP server.

    You have access to:
    - Documentation tools for searching Mastra docs, examples, blog posts, and changelogs
    - Link checking tools to validate URLs
    - Weather tools for getting current weather information
    - Agent tools (ask_docs and ask_weather) that let you delegate questions to specialized agents

    When users ask questions:
    1. Use the appropriate tools to gather information
    2. If you need specialized help, use the ask_docs or ask_weather agent tools
    3. Always validate any URLs you share using the link checker
    4. Provide comprehensive, accurate responses based on the tool results
    `,
  model: openai('gpt-4.1'),
  // Get tools dynamically from the MCP server
  tools: await mcpClient.getTools(),
});

// Export the client for cleanup if needed
export { mcpClient };

// Example function to demonstrate dynamic tool usage
export async function useMcpClientWithDynamicTools() {
  const exampleAgent = new Agent({
    name: 'Dynamic MCP Agent',
    instructions: 'You can use tools from the MCP server dynamically.',
    model: openai('gpt-4.1'),
    // No tools defined here - we'll pass them at runtime
  });

  // Get toolsets for dynamic usage
  const toolsets = await mcpClient.getToolsets();

  const response = await exampleAgent.generate(
    'What is the latest information about Mastra workflows?',
    {
      toolsets,
    }
  );

  return response;
}

// Cleanup function
export async function cleanup() {
  await mcpClient.disconnect();
}
