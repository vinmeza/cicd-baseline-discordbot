const { execute } = require('../../commands/various/ping');

// Mock the entire discord.js module
jest.mock('discord.js', () => ({
  SlashCommandBuilder: jest.fn().mockImplementation(() => ({
    setName: jest.fn().mockReturnThis(),
    setDescription: jest.fn().mockReturnThis()
  })),
  Interaction: {
    isChatInputCommand: jest.fn(),
  },
}));

describe('/ping command', () => {
  test('responds with "Pong!"', async () => {
    // Create mock interaction object
    const mockInteraction = {
      isChatInputCommand: jest.fn().mockReturnValue(true),
      commandName: 'ping',
      reply: jest.fn(),
    };

    await execute(mockInteraction);
    
    expect(mockInteraction.reply).toHaveBeenCalledWith('Pong!');
  });
});