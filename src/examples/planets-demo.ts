#!/usr/bin/env tsx

import { RuntimeContext } from '@mastra/core/di';
import { planetsAgent } from '../mastra/agents/planets-agent.js';
import { planetsInfoTool } from '../mastra/tools/planets-tool.js';

async function main() {
  console.log('🪐 Starting Planets Demo...\n');

  try {
    // Demo 1: Test the planets tool directly
    console.log('📝 Demo 1: Using Planets Tool Directly');
    console.log('Getting random planet information...\n');

        const randomPlanetResult = await planetsInfoTool.execute({
      context: { includeRandomFact: true },
      runtimeContext: new RuntimeContext()
    });

    console.log('Random Planet Result:');
    console.log(`Planet: ${randomPlanetResult.planet.name}`);
    console.log(`Type: ${randomPlanetResult.planet.type}`);
    console.log(`Distance from Sun: ${randomPlanetResult.planet.distanceFromSun}`);
    console.log(`Random Fact: ${randomPlanetResult.randomFact}`);
    console.log('\n' + '='.repeat(80) + '\n');

    // Demo 2: Test the planets tool with a specific planet
    console.log('📝 Demo 2: Getting Information About Mars');

    const marsResult = await planetsInfoTool.execute({
      context: { planet: 'mars', includeRandomFact: true },
      runtimeContext: new RuntimeContext()
    });

    console.log('Mars Information:');
    console.log(`Name: ${marsResult.planet.name}`);
    console.log(`Diameter: ${marsResult.planet.diameter}`);
    console.log(`Day Length: ${marsResult.planet.dayLength}`);
    console.log(`Moons: ${marsResult.planet.moons}`);
    console.log(`Atmosphere: ${marsResult.planet.atmosphere}`);
    console.log(`Fun Fact: ${marsResult.randomFact}`);
    console.log('\n' + '='.repeat(80) + '\n');

    // Demo 3: Use the planets agent
    console.log('📝 Demo 3: Using Planets Agent');
    console.log('Asking the agent about Jupiter...\n');

    const agentResponse1 = await planetsAgent.generate(
      'Tell me about Jupiter and what makes it special'
    );

    console.log('Agent Response about Jupiter:');
    console.log(agentResponse1.text);
    console.log('\n' + '='.repeat(80) + '\n');

    // Demo 4: Ask for a comparison
    console.log('📝 Demo 4: Asking for Planet Comparison');
    console.log('Asking the agent to compare Earth and Venus...\n');

    const agentResponse2 = await planetsAgent.generate(
      'Compare Earth and Venus - what are the main differences?'
    );

    console.log('Agent Response comparing Earth and Venus:');
    console.log(agentResponse2.text);
    console.log('\n' + '='.repeat(80) + '\n');

    // Demo 5: Ask for a random planet
    console.log('📝 Demo 5: Surprise Me with a Random Planet');

    const agentResponse3 = await planetsAgent.generate(
      'Surprise me with information about a random planet!'
    );

    console.log('Agent Response with random planet:');
    console.log(agentResponse3.text);
    console.log('\n' + '='.repeat(80) + '\n');

    console.log('✅ Planets Demo completed successfully!');
    console.log('🪐 The planets agent and tool are working perfectly!');
    console.log('🚀 Ready to be accessed via MCP server!');

  } catch (error) {
    console.error('❌ Error during planets demo:', error);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️  Shutting down gracefully...');
  process.exit(0);
});

// Run the demo
main().catch(console.error);
