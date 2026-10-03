# CreatorAI

CreatorAI is a web app designed to make content creation easier for creators.

The idea is simple: instead of using different tools for writing scripts,
finding clips, editing videos and creating content for different platforms,
CreatorAI tries to bring these steps together in one place.

## What it does

The main workflow of the project is:

Upload a video  
→ Analyze the content  
→ Find useful moments  
→ Suggest short clips  
→ Edit the selected clip  
→ Create content for different platforms

The main idea is:

**One video → Multiple content pieces**

## Features

- Video upload
- AI-based content analysis
- AI suggested clips
- Clip scoring and recommendations
- AI-assisted editing
- Caption and keyword suggestions
- Content repurposing
- Script and hook generation
- Basic content analytics
- Asset management

## How the demo works

For the hackathon demo, the application uses a sample video and a simulated
AI analysis workflow.

When a demo video is selected, the app goes through:

1. Uploading the video
2. Extracting the content
3. Transcribing the video
4. Understanding the content
5. Finding important sections
6. Suggesting clips

The user can then select a clip, apply editing suggestions and generate
different versions of the content.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

## Current Version

The current version focuses mainly on the frontend and the overall user
experience.

The AI processing shown in the demo is simulated so that the complete
workflow can be demonstrated without requiring external API keys.

## Future Improvements

Some things we would like to add later:

- Real speech-to-text processing
- Real AI video analysis
- Automatic video clipping using FFmpeg
- Cloud storage for creator assets
- Direct publishing to social media platforms
- Better analytics and content recommendations
- User authentication

## Running the project

Clone the repository and install the dependencies:

```bash
npm install