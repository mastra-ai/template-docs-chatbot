import { createTool } from '@mastra/core';
import { z } from 'zod';

export const linkCheckerTool = createTool({
  id: 'linkCheckerTool',
  description:
    'CRITICAL: You MUST use this tool to validate EVERY URL before sharing it in your response. Never share a URL without first validating it with this tool',
  inputSchema: z.object({
    url: z.string().describe('The URL to validate (REQUIRED for every URL)'),
  }),
  outputSchema: z.object({
    isValid: z.boolean().describe('True if URL is valid and can be shared'),
  }),
  execute: async ({ context, mastra }) => {
    const logger = mastra?.getLogger();
    try {
      const { url } = context;
      logger?.info('Checking URL:', { url });
      const response = await fetch(url, { method: 'HEAD' });
      logger?.info('Response:', { response });
      return { isValid: response.ok };
    } catch (error) {
      logger?.error('Error checking URL:', { error });
      return { isValid: false };
    }
  },
});
