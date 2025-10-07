# 🎬 Movies App

React Native app to explore and search movies.

## 🚀 Features

### 🎥 Core
- 🔍 **Search Movies** – Debounced, real-time title search  
- 📜 **Infinite Scroll** – Browse popular movies with seamless pagination  
- 🧾 **Movie Details** – Ratings, cast, and plot info  
- 🔄 **Pull-to-Refresh** – Works for both popular and search results  

### ✨ Experience
- 🪄 **Animated UI** – Reanimated header and list transitions  
- ⚡ **Optimized Performance** – Zustand store, memoized components, tuned FlatList  
- 🚧 **Error & Empty States** – Clear, helpful feedback  

## 🧠 Tech Stack
- ⚛️ React Native + TypeScript   
- 🐻 Zustand  (State Management)  
- 🧭 React Navigation   
- 🎞️ Reanimated (Animations)  
- 🌐 Axios (HTTP Client)  

## ⚙️ Setup
```bash
git clone <repo-url>
cd movies
Get your TMDB_API_KEY from TMDB and add it to src/api/client.ts
yarn install          # or npm install
cd ios && pod install && cd .. # iOS setup
yarn ios              # or yarn android
```

## 🗂 Project Structure
```
src/
├── api/          # TMDB API client
├── components/   # Reusable UI parts
├── hooks/        # Custom hooks
├── screens/      # Home & MovieDetail
├── store/        # Zustand store
└── types/        # TypeScript models
```
## Demo
[Demo Video](https://drive.google.com/file/d/1xdgtWW7xpiFyeLMpTs8ccsJ7qJVvz-VC/view?usp=sharing)

## 🔧 Highlights
- 🕒 Debounced search (500 ms)
- 🧩 Optimized FlatList rendering
- 🧭 Typed navigation & API data
- 🎬 Direction-aware search header animation
- 🧼 Clean, maintainable architecture

## 🏗 API
Powered by **The Movie Database (TMDB)**  
Endpoints: popular movies, search, and movie details with credits.

## 📄 License
MIT License — see the `LICENSE` file for details.
