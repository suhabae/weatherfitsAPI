// OpenWeatherMap API URL과 API 키 설정
const apiKey = "e4b6982389d0177d54999e9bae325d02"; // 발급받은 API 키로 대체하세요

async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        document.getElementById("weather").innerHTML = `<p>Please enter a city name.</p>`;
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // 로딩 메시지 추가
    document.getElementById("weather").innerHTML = `<p>Loading...</p>`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const temperature = data.main.temp;
        const description = data.weather[0].description;

        document.getElementById("weather").innerHTML = `
            <h2>${data.name} Weather</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${description}</p>
        `;

        // 온도에 따른 옷차림 추천
        let recommendation = "";
        if (temperature < 5) {
            recommendation = "It's very cold! Wear a heavy coat, gloves, and a scarf.";
        } else if (temperature >= 5 && temperature < 15) {
            recommendation = "It's chilly. A light coat or sweater is recommended.";
        } else if (temperature >= 15 && temperature < 25) {
            recommendation = "The weather is mild. A long-sleeve shirt or a light jacket would be good.";
        } else {
            recommendation = "It's warm. Short sleeves and light clothing are suitable.";
        }

        // 추천을 HTML에 표시
        document.getElementById("recommendation").innerText = recommendation;

        // 추천 스타일 적용
        document.getElementById("recommendation").className = "recommendation " + getRecommendationClass(temperature);

        // 온도에 맞는 배경 이미지 설정
        setBackgroundImage(temperature);
        
    } catch (error) {
        document.getElementById("weather").innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// 온도에 따라 CSS 클래스를 반환하는 함수
function getRecommendationClass(temp) {
    if (temp < 5) return "cold";
    if (temp >= 5 && temp < 15) return "chilly";
    if (temp >= 15 && temp < 25) return "mild";
    return "warm";
}

// 온도에 맞는 배경 이미지를 설정하는 함수
function setBackgroundImage(temperature) {
    const body = document.body;
    let backgroundImage = "";

    if (temperature < 5) {
        backgroundImage = "url('winter.jpg')";  // 겨울 배경
    } else if (temperature >= 5 && temperature < 15) {
        backgroundImage = "url('fall.jpg')";   // 가을 배경
    } else if (temperature >= 15 && temperature < 25) {
        backgroundImage = "url('spring.jpg')";  // 봄 배경
    } else {
        backgroundImage = "url('summer.jpg')";  // 여름 배경
    }

    body.style.backgroundImage = backgroundImage;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
}
