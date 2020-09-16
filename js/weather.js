const weather = document.querySelector('.weather');
const city = document.querySelector('.city');
const temperature = document.querySelector('.temperature');

const COORDS = 'coords';
const API_KEY = '1070b713021a872a496e8bda334ec375';

function getWeater(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            const icon = json.weather[0].icon;
            const place = json.name;
            const temp = Math.floor(json.main.temp - 273);
            weather.innerHTML = `
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="weather__image" />
                <div class="weather__info">
                    <p class="city">${place}</p>
                    <p class="temperature">${temp}º</p>
                </div>
            `;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 위치 불러오기 수락
function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // 객체에 넣기
    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
    getWeater(latitude, longitude);
}

// 위치 불러오기 거절
function handleGeoError() {
    console.log('cant data access');
}

// 위치 묻기
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        // 저장된 좌표 없는 경우
        askForCoords();
    }else {
        // 저장된 좌표 있는 경우
        const parseCoords = JSON.parse(loadedCoords);
        getWeater(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();