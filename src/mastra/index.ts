import { Mastra } from '@mastra/core/mastra';
import { registerApiRoute } from '@mastra/core/server';
import { PinoLogger } from '@mastra/loggers';
import { mcpClientAgent } from './agents/mcp-client-agent';
import { planetsAgent } from './agents/planets-agent';
import { mcpServer } from './mcp/mcp-server';

export const mastra = new Mastra({
  agents: {
    mcpClientAgent,
    planetsAgent,
  },
  // mcpServers: {
  //   planets: mcpServer,
  // },
  server: {
    port: parseInt(process.env.PORT || '4111', 10),
    timeout: 30000,
    // Add health check endpoint for deployment monitoring
    apiRoutes: [
      registerApiRoute('/health', {
        method: 'GET',
        handler: async (c) => {
          return c.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            services: {
              agents: ['mcpClientAgent', 'planetsAgent'],
              workflows: [],
            }
          });
        },
      }),
      registerApiRoute('/mcp/info', {
        method: 'GET',
        handler: async (c) => {
          return c.json({
            mcpServer: {
              name: 'Template Docs Chatbot MCP Server',
              version: '1.0.0',
              availableTransports: ['http', 'sse'],
              endpoints: {
                http: `http://localhost:${process.env.PORT || 8080}/mcp`,
              },
              availableTools: ['linkCheckerTool', 'planetsInfoTool'],
              availableAgents: ['ask_planets']
            }
          });
        },
      }),
    ],
  },
  logger: new PinoLogger({
    name: 'Mastra',
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  }),
});
