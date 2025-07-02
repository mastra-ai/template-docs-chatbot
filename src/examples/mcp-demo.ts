#!/usr/bin/env tsx

import { mcpClientAgent, useMcpClientWithDynamicTools, cleanup } from '../mastra/agents/mcp-client-agent.js';

async function main() {
  console.log('🚀 Starting MCP Demo...\n');

  try {
    // Example 1: Using the MCP client agent with tools already loaded
    console.log('📝 Example 1: Using MCP Client Agent');
    console.log('Asking about Mastra documentation...\n');

    const response1 = await mcpClientAgent.generate(
      'What is Mastra and how do I get started with it? Please provide a brief overview.'
    );

    console.log('Agent Response:');
    console.log(response1.text);
    console.log('\n' + '='.repeat(80) + '\n');

    // Example 2: Using dynamic tool loading
    console.log('📝 Example 2: Using Dynamic Tool Loading');
    console.log('Asking about workflows...\n');

    const response2 = await useMcpClientWithDynamicTools();

    console.log('Agent Response:');
    console.log(response2.text);
    console.log('\n' + '='.repeat(80) + '\n');

    // Example 3: Using the agent delegation feature
    console.log('📝 Example 3: Using Agent Delegation');
    console.log('Asking the docs agent directly via MCP...\n');

    const response3 = await mcpClientAgent.generate(
      'Use the ask_docs tool to get information about creating tools in Mastra.'
    );

    console.log('Agent Response:');
    console.log(response3.text);
    console.log('\n' + '='.repeat(80) + '\n');

    console.log('✅ MCP Demo completed successfully!');

  } catch (error) {
    console.error('❌ Error during MCP demo:', error);
  } finally {
    // Clean up MCP connections
    await cleanup();
    console.log('🧹 Cleanup completed');
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⏹️  Shutting down gracefully...');
  await cleanup();
  process.exit(0);
});

// Run the demo
main().catch(console.error);
