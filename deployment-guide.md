# MCP Server Deployment Guide - Mastra Cloud

## Overview

This MCP server is configured for deployment on **Mastra Cloud** using **HTTP/SSE transport**. Mastra Cloud provides a fully managed deployment platform that automatically handles scaling, monitoring, and infrastructure.

## ✨ Mastra Cloud Deployment

### Prerequisites

1. **GitHub Repository**: Your code needs to be in a GitHub repository
2. **Mastra Cloud Access**: Sign up for the [Mastra Cloud waitlist](https://mastra.ai/cloud-beta) (currently in beta)
3. **Environment Variables**: Your OpenAI API key and other credentials

### Step 1: Prepare Your Repository

Ensure your repository contains:

- ✅ **`src/mastra/index.ts`** - Your main Mastra configuration
- ✅ **`src/mastra/mcp-server.ts`** - MCP server with HTTP/SSE transport
- ✅ **`package.json`** - Dependencies and scripts
- ✅ **Environment variables** configured

### Step 2: Configure Environment Variables

Create a `.env.production` file with your production variables:

```bash
# Copy the example file
cp env.production.example .env.production
```

Required variables:

```bash
# OpenAI API (required for your docs agent)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Server configuration
NODE_ENV=production
PORT=8080
```

### Step 3: Deploy to Mastra Cloud

1. **Connect Repository**:

   - Log into Mastra Cloud
   - Connect your GitHub repository
   - Grant necessary permissions

2. **Configure Environment**:

   - Add your environment variables in the Mastra Cloud dashboard
   - Set `OPENAI_API_KEY` and any other required variables

3. **Deploy**:
   - Mastra Cloud automatically deploys on git push
   - Your MCP server will be available at your assigned Mastra Cloud URL
   - Example: `https://your-project.mastra.cloud/mcp`

### Step 4: Test Your Deployment

Once deployed, your MCP server provides:

- **Health Check**: `GET https://your-project.mastra.cloud/health`
- **MCP Endpoint**: `https://your-project.mastra.cloud/mcp`
- **Server Info**: `GET https://your-project.mastra.cloud/mcp/info`

## 🔧 Local Development

For testing during development:

```bash
# Start the MCP server locally
pnpm run mcp:server

# Test with the demo
pnpm run mcp:demo
```

Your local server will run at: `http://localhost:8080/mcp`

## 🔗 Connecting to Your Deployed MCP Server

### From Another Mastra Project

```typescript
import { MCPClient } from '@mastra/mcp';
import { Agent } from '@mastra/core/agent';

const mcpClient = new MCPClient({
  servers: {
    deployedServer: {
      url: new URL('https://your-project.mastra.cloud/mcp'),
    },
  },
});

const agent = new Agent({
  name: 'My Agent',
  instructions: 'You can use documentation and link checking tools.',
  model: openai('gpt-4'),
  tools: await mcpClient.getTools(),
});
```

### From Cursor/Windsurf IDE

Add to your `.cursor/mcp.json` or `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "template-docs-chatbot": {
      "command": "curl",
      "args": [
        "-X",
        "POST",
        "-H",
        "Content-Type: application/json",
        "https://your-project.mastra.cloud/mcp"
      ]
    }
  }
}
```

## 📊 Available Tools

Your deployed MCP server exposes:

### 🛠️ **Documentation Tools**

- Search docs, examples, blog posts, and changelogs
- Access complete docs knowledge base

### 🔗 **Utility Tools**

- **Link Checker**: Validate URLs before sharing them

### 🪐 **Planets Tools**

- **Planets Info Tool**: Get detailed information about planets in our solar system with random facts

### 🤖 **Agent Tools**

- **`ask_planets`**: Specialized planets agent that provides fascinating information about planets

## 🔧 **Monitoring & Health Checks**

Mastra Cloud automatically monitors your deployment:

- **Health endpoint**: `GET /health` - Server status
- **MCP info**: `GET /mcp/info` - Server details
- **Automatic restarts**: If your server becomes unhealthy
- **Logs & traces**: Available in the Mastra Cloud dashboard

## 📝 **Development Workflow**

1. **Develop locally**: `pnpm run dev`
2. **Test MCP server**: `pnpm run mcp:server`
3. **Commit & push**: Git push triggers automatic deployment
4. **Monitor**: Check deployment status in Mastra Cloud dashboard

## 🚀 **Next Steps**

Once deployed, you can:

1. **Connect from IDEs**: Use your MCP server in Cursor, Windsurf, or other MCP-enabled tools
2. **Integrate with other projects**: Share your documentation tools across multiple Mastra applications
3. **Scale automatically**: Mastra Cloud handles traffic and scaling
4. **Monitor usage**: Track how your tools are being used

Your MCP server is now ready for production use on Mastra Cloud! 🎉
