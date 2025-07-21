#!/usr/bin/env node
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
const chalk = require('chalk');

dotenv.config();

const memoryPath = path.join(__dirname, '../Memory/traxovo-memory.json');
const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

(async () => {
  console.log(chalk.cyan("\n🚀 TRAXOVO Agent starting..."));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://replit.dev/login');
  const content = await page.content();

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a dashboard analyst.' },
      { role: 'user', content: `Analyze this HTML and describe its purpose:\n${content}` }
    ]
  });

  const analysis = response.data.choices[0].message.content;
  fs.writeFileSync(memoryPath, JSON.stringify({ date: new Date(), analysis }, null, 2));

  console.log(chalk.green("📊 Analysis complete and saved to memory."));
  await browser.close();
})();
