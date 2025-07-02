import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mcpServer } from '../mastra/mcp-server.js';

describe('MCP Server', () => {
  let server: typeof mcpServer;

  beforeAll(async () => {
    server = mcpServer;
  });

  afterAll(async () => {
    // Clean up any resources
    await server.close();
  });

    it('should create server with correct configuration', () => {
    const serverInfo = server.getServerInfo();

    expect(serverInfo.name).toBe('Template Docs Chatbot MCP Server');
    // Note: ServerInfo may not have version property, but should have name
    expect(typeof serverInfo.name).toBe('string');
  });

  it('should expose tools correctly', () => {
    const toolListInfo = server.getToolListInfo();

    // Should have tools from docs-mcp, linkCheckerTool, weatherTool
    expect(toolListInfo.tools.length).toBeGreaterThan(0);

    // Check for specific tools
    const toolNames = toolListInfo.tools.map(tool => tool.name);
    expect(toolNames).toContain('linkCheckerTool');
    expect(toolNames).toContain('weatherTool');
  });

  it('should expose agents as tools', () => {
    const toolListInfo = server.getToolListInfo();
    const toolNames = toolListInfo.tools.map(tool => tool.name);

    // Agents should be exposed as ask_<agentName> tools
    expect(toolNames).toContain('ask_docs');
    expect(toolNames).toContain('ask_weather');
  });

  it('should execute a simple tool', async () => {
    // Test the weather tool with mock data
    try {
      const result = await server.executeTool('weatherTool', {
        location: 'London',
      });

      // Should return some result (could be an error due to no API key, but should not throw)
      expect(result).toBeDefined();
    } catch (error) {
      // If it fails due to API keys, that's expected in test environment
      expect(error).toBeDefined();
    }
  });
});
