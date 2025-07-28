# 🌟 WeatherPro: Your Personal Weather Companion 🌍

**WeatherPro** is a modern, feature-rich weather application built with React, TypeScript, and Tailwind CSS. It provides real-time weather updates, detailed forecasts, air quality information, and interactive radar maps, all wrapped in a stunning, customizable user interface.

Whether you're planning your day or your next adventure, WeatherPro keeps you informed with beautiful visuals and precise data.

## ✨ Features

*   **Real-time Weather Updates**: Get current temperature, conditions, humidity, wind speed, pressure, visibility, and sunrise/sunset times for any location worldwide.
*   **Comprehensive Forecasts**:
    *   **Hourly Forecast**: See detailed weather predictions for the next 24 hours.
    *   **7-Day Daily Forecast**: Plan your week with high/low temperatures, conditions, and precipitation chances.
*   **Advanced Air Quality Monitoring**: Stay healthy with real-time Air Quality Index (AQI) and detailed pollutant levels (PM2.5, PM10, O₃, NO₂, SO₂, CO), along with health recommendations.
*   **Dynamic Weather Alerts**: Receive timely warnings for high winds, extreme temperatures, heavy rain, and more, with clear severity indicators.
*   **Interactive Weather Radar (Simulated)**: Visualize precipitation, cloud cover, and temperature distribution on a dynamic map with customizable layers.
*   **Intelligent Location Search**: Easily find any city, district, or region worldwide with a smart autocomplete search, powered by OpenWeatherMap's geocoding API.
*   **Personalized Experience**:
    *   **Customizable Backgrounds**: Choose from a selection of beautiful gradient backgrounds for both your login and dashboard screens.
    *   **Theme Toggle**: Switch between elegant light and dark modes.
    *   **Temperature Unit**: Seamlessly toggle between Celsius (°C) and Fahrenheit (°F).
*   **Stunning UI/UX**: Enjoy a clean, intuitive, and visually captivating interface with smooth animations and a modern "glassmorphism" design.
*   **Robust & Scalable**: Built with React, TypeScript, and Vite for a fast, type-safe, and maintainable codebase.

## 📸 Screenshots
<img width="1362" height="659" alt="2" src="https://github.com/user-attachments/assets/5f52c55a-cdac-4d6d-a05a-ec32c783a1b0" />
<img width="1361" height="661" alt="1" src="https://github.com/user-attachments/assets/c827ac90-05c5-4c55-8187-92bf59e3467c" />
<img width="1364" height="659" alt="3" src="https://github.com/user-attachments/assets/ecd7f1ac-5a7a-4ce5-ac4d-f45885492cf9" />





## ⚙️ Installation & Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or Yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/weatherpro.git
cd weatherpro


```
2. Install dependencies
```bash
Run
Copy code
npm install
# or
yarn install
```

3. Configure API Key
WeatherPro uses the OpenWeatherMap API. You'll need to obtain a free API key from their website.

Go to OpenWeatherMap and sign up for a free account.

Generate an API key.

Create a .env file in the root of your project (/project/.env) and add your API key:


Run
Copy code
```bash
VITE_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
VITE_OPENWEATHER_GEO_URL=https://api.openweathermap.org/geo/1.0
Replace YOUR_OPENWEATHER_API_KEY with the key you obtained.
```

```
4. Run the development server
bash
```
Run
Copy code
```
npm run dev
# or
yarn dev
```
This will start the development server, usually at http://localhost:5173.

5. Build for production
bash
```

Run
Copy code
 ```bash
npm run build
# or

yarn build
```
This will compile the application into the dist directory, ready for deployment.
```
```
🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
Distributed under the MIT License. See LICENSE for more information.

📞 Contact
Your Name/Project Maintainer - Instagram :- @_jai_pisal_ Project Link: https://github.com/your-username/weatherpro
