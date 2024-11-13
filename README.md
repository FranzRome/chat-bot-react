# Chat Bot Frontend

This project is a chat bot interface built using **React** and **Redux**.
It includes a mocked API responses, states management, error handling and persistent chat history. The project is structured for easy maintenance, testing, and modularity, and the entire environment can be encapsulated in a Docker container for seamless deployment.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Design Choices](#design-choiches)
4. [Docker Setup](#docker-setup)
5. [Testing](#testing)

## Getting Started

### Prerequisites

- **Node.js** ([version 20](https://nodejs.org/en/blog/release/v20.9.0) or above recommended)
- **Docker** (optional, for containerized setup)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/FranzRome/chat-bot-react.git
   cd chat-bot-react
   ```

2. Install the dependencies:q

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

The application will run on [http://localhost:3000](http://localhost:3000).

## Project Structure

The project follows a **modular structure** to keep the code organized and promote reusability.

```bash
src/
├── components/              # UI Components
│   ├── ChatWindow.js        # Main chat interface
│   ├── Message.js           # Displays individual message
│   └── MessageInput.js      # Input field to send messages and delte chat history
│
├── slices/                  # Redux Slices
│   └── chatSlice.js
│
├── tests/                   # Unit tests
│   └── unit/
│       ├── ChatWindow.test.js
│       ├── Message.test.js
│       └── MessageInput.test.js
│
├── App.js                   # Main App component
└── index.js                 # Entry point
```

## Design Choiches

### Component-Based Architecture

Each UI component is self-contained and focused on a single responsibility:

- **`ChatWindow.js`**: Manages the chat interface, displaying messages and handling message sending
- **`Message.js`**: A stateless component that displays a single message with styling based on the user (bot or user)
- **`MessageInput.js`**: Handles user input and sends messages to the chat

### Redux State Management

[Redux](https://redux.js.org/) is used to manage the application's state, particularly to handle messages and loading states. This approach ensures consistency, especially since the chat history needs to persist across sessions

- **Persistence**: Chat history is stored in `localStorage` and restored on page reloads. Redux helps coordinate state updates and rehydrate from localStorage
- **Mock API**: Instead of a real API, we’ve created a mock `getBotResponse()` function to simulate bot responses, enabling the project to function offline

### Loading and Error States

Loading and error handling are implemented in the UI to improve the user experience:

- A loading indicator appears when the bot is processing a response
- Error messages are displayed if the bot fails to respond

### Test Strategy

To guarantee single components shows what we expect unit tests are

## Docker Setup

To simplify deployment, this project can be run in a Docker container. Here’s how to set up Docker for this project.

### Build and Run the Docker Container

**IMPORTANT**: verify your docker engine is running on your machine

1. Build the Docker image:

   ```bash
   docker build -t chat-bot .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 chat-bot
   ```

The application is accessible at [http://localhost:3000](http://localhost:3000).

## Testing

To make unit tests the application [Jest](https://jestjs.io/) was used to verify single components functionalities.
Tests are located in the `src/tests/unit` directory. To run the tests, use:

```bash
npm test
```
