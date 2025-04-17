- https://v0-zettelkasten-note-app.vercel.app
- https://v0.dev/chat/projects/x1PSWTYbQJ0
- 
# ZettelTweet


![image](https://github.com/user-attachments/assets/4edc1abf-c1f5-45cd-ae3c-76aa2984d4fd) ![image](https://github.com/user-attachments/assets/7935cb8b-d8ee-46e4-963b-68ec529352d0)


ZettelTweet is a note-taking application inspired by the concept of using Twitter as a Zettelkasten system. It allows users to create short-form notes (similar to tweets) that can be interconnected through tags, mentions, and threading.

## Features

- **Short-form Notes**: Create concise notes with a 280-character limit
- **Threading**: Build on ideas by creating threads of interconnected notes
- **Tagging System**: Organize notes with hashtags for easy categorization
- **Timeline View**: Display notes chronologically
- **Graph View**: Visualize connections between notes
- **Search Functionality**: Quickly find notes by content or tags
- **Offline Support**: Full functionality even without internet connection
- **Local Storage**: All notes are saved in your browser's local storage

*Automatically synced with your [v0.dev](https://v0.dev) deployments*
 
 [![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/evan-schultzs-projects/v0-zettelkasten-note-app)
 [![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/x1PSWTYbQJ0)
 
 ## Overview
 
 This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
 Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).
 
 ## Deployment
 
 Your project is live at:
 
 **[https://vercel.com/evan-schultzs-projects/v0-zettelkasten-note-app](https://vercel.com/evan-schultzs-projects/v0-zettelkasten-note-app)**
 
## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/zetteltweet.git
   cd zetteltweet
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Creating Notes

1. Click the "New Note" button in the top right corner
2. Enter your note content (max 280 characters)
3. Add tags by typing in the tags field
4. Toggle "Start a thread" if you want to create a thread
5. Click "Save Note" or "Start Thread"

### Using Tags

- Add hashtags directly in your note content: `#productivity`
- Or add them using the tags field below the note content
- Click on tags to view all notes with that tag

### Creating Threads

- Toggle "Start a thread" when creating a new note to start a thread
- From any note, click "Continue this thread" to add to an existing thread
- View full threads by clicking "View Thread" on any note in a thread

## Roadmap

### Current Status

ZettelTweet is currently in **Alpha** stage with the following implemented:

- ✅ Basic note creation and viewing
- ✅ Tagging system
- ✅ Threading functionality
- ✅ Timeline and graph views
- ✅ Local storage persistence
- ✅ Offline support

### Short-term Goals (1-3 months)

- Rich Text Formatting
- User Experience Improvements
- Search Enhancements
- Improved Export/Import
- Data Visualization

### Medium-term Goals (3-6 months)

- Supabase Integration
- User Authentication
- Cloud Storage
- Collaboration Features
- AI Assistance

### Long-term Vision (6+ months)

- Mobile Applications
- Desktop Applications
- Advanced Knowledge Management
- Spaced Repetition

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
