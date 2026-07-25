# Study Management Platform

A professional-grade web application tailored for managing educational modules, dynamically generating question papers, and providing an AI-powered continuous study assistant.

## ✨ Key Features

- **Role-Based Portals**: Differentiated interfaces for Admins (managing assigned modules) and Students (taking modules, generating tests).
- **Dynamic AI Question Generation**: Uses the **Groq API** (`llama3-8b-8192`) to dynamically fetch relevant important study questions for the student's assigned modules (e.g., CBSE Class 8 Science, NEET Biology).
- **Continuous Free Search Chatbot**: A floating assistant built into the application that acts as an educational tutor. It utilizes the **Free Wikipedia Search API** to summarize study material directly within the chat without requiring any API keys.
- **DOCX Exporting**: Functionality to easily select dynamically generated questions and instantly export them as a `.docx` file for offline study or test preview formatting.
- **Resilient Fallbacks**: If the Groq API key is unconfigured or fails, the platform seamlessly falls back to real, hardcoded previous-year questions for core modules (CBSE Class 8, NEET).

## 🛠 Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with localStorage persistence 
- **Icons**: [Lucide React](https://lucide.dev/)
- **Document Exporting**: [docx](https://github.com/dolanmiu/docx) & [file-saver](https://github.com/eligrey/FileSaver.js)
- **AI Integrations**: 
  - `groq-sdk` for dynamic question generation.
  - Native `fetch` with Wikipedia Action API for continuous web search tracking.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository and navigate to the project root.
2. Install project dependencies:
   ```bash
   npm install
   ```

### Environment Setup
To utilize the dynamic question generation feature, you need a Groq API key (the Web Search Chatbot will work regardless):
1. In the root directory, you will find an `.env.example` file.
2. Ensure you have a `.env` file containing:
   ```env
   VITE_GROQ_API_KEY=your_actual_groq_api_key
   ```

### Running Locally
To launch the development server, run:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

## 📦 Building for Production

If you wish to deploy the application or build the optimized production assets:
```bash
npm run build
```
You can view the production payload locally by subsequently running `npm run preview`.
