# ZettelTweet

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
