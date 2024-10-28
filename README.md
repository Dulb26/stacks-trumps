# Stacks Top Trumps - NFT Card Game

A decentralized card game built on the Stacks blockchain that turns your NFT collection into playable cards. Challenge other players or compete against AI opponents in this unique take on the classic Top Trumps game.

## 🎮 Features

- **NFT Integration**: Use your existing Stacks NFTs as game cards
- **Multiple Game Modes**:
  - Multiplayer PvP matches
  - Single-player campaign against AI
  - Tournament mode
- **Deck Building**: Create strategic decks from your NFT collection
- **Ranking System**: Compete for monthly and all-time leaderboard positions
- **Rewards**: Earn exclusive NFTs and tokens through gameplay

## 🚀 Quick Start

### Prerequisites

- Node.js (v20.5.x or higher)
- Yarn (v4.1.0 or higher)
- A Stacks wallet (Hiro Wallet recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Dulb26/stacks-top-trumps.git
cd stacks-top-trumps
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file in the root directory with the following variables:

```env
APP_NAME=Stacks Top Trumps
GOOGLE_CLOUD_PROJECT=your-project-id
FIREBASE_APP_ID=your-app-id
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-domain
GA_MEASUREMENT_ID=your-ga-id
```

4. Start the development server:

```bash
yarn start
```

Visit `http://localhost:5173` to see the game in action!

## 🏗️ Tech Stack

- **Frontend Framework**: React with Vite
- **Styling**: MUI Joy UI with Emotion
- **Blockchain Integration**: Stacks.js & @stacks/connect
- **Authentication**: Firebase Auth
- **State Management**: Jotai
- **Testing**: Vitest with Happy DOM

## 🎯 Game Mechanics

### Deck Building

- Select 5-10 NFTs from your wallet
- Each NFT must be from a different collection
- NFTs' attributes and collection stats determine their gameplay stats

### Gameplay

1. Connect your wallet
2. Choose game mode (PvP or AI)
3. Select your deck
4. Take turns comparing NFT attributes
5. Win rounds to collect points
6. Player with most points wins

## 🔧 Development

### Project Structure

```
src/
├── app/ # Frontend application
│ ├── components/ # Reusable UI components
│ ├── core/ # Core modules and hooks
│ ├── icons/ # Custom icon components
│ ├── routes/ # Application routes
│ └── public/ # Static assets
└── scripts/ # Build and deployment scripts
```

### Available Scripts

- `yarn start` - Start development server
- `yarn build` - Build production version
- `yarn test` - Run tests
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://stackstrumps.com)
- [Bug Report](https://github.com/Dulb26/stacks-top-trumps/issues)

## 🙏 Acknowledgments

- Stacks Foundation
- Indexer.xyz

## ⚠️ Important Notes

- This game is in beta.
- Report bugs and security issues through GitHub Issues

## 🤔 FAQ

### How do I add my NFT collection to the game?

Contact us through GitHub Issues or any other means to start the integration process.

### What determines my NFT's attributes?

Attributes are derived from the NFT's metadata and collection traits.

### How often does the leaderboard reset?

Monthly leaderboards reset on the 1st of each month. All-time rankings are permanent.

For additional questions, join our [Discord community]().

---

Built with ❤️ by Dulb.btc for the Stacks community
