const apiKey = "c0c732dbfcf66ba4e7b118d6bd5da485";

let apiCall = function(city){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
    fetch(url).then((response)=>response.json().then((weatherData)=>{
        console.log(weatherData);

        if (weatherData.cod === 200) {
            cf.innerHTML = "";
            let bloc1 = document.createElement('div'); // On crée un élément div qui va regrouper le ciel + la ville + la température
            bloc1.classList.add('bloc1'); // On lui donne la classe bloc1
            cf.appendChild(bloc1); // On l'ajoute au container cf
            //afficher ciel1
            let cielImg = document.createElement('img'); // On crée un élément img qui va contenir l'image du ciel
            bloc1.appendChild(cielImg); // On l'ajoute au bloc1
            cielImg.classList.add('cielImg');

            switch (weatherData.weather[0].main) {
                case 'Clouds':
                    cielImg.src = "img/cloudy.svg"
                    break;
                case 'Clear':
                    cielImg.src = "img/clear-day.svg"
                    break;
                case 'Mist':
                    cielImg.src = "img/mist.svg"
                    break;
                case 'Snow':
                    cielImg.src = "img/snow.svg";
                    break;
                case 'Rain':
                    cielImg.src = "img/drizzle.svg";
                    break;
                case 'Fog':
                    cielImg.src = "img/fog.svg";
                    break;
                default:
                    break;
            }

            //Bloc ville + température + ressenti
            let bloc2 = document.createElement('div'); // On crée un élément div qui va regrouper la ville + la température + le ressenti
            bloc2.classList.add('bloc2');// On lui donne la classe bloc2
            bloc1.appendChild(bloc2);// On l'ajoute au bloc1
                //afficher nom de ville
                let cityName = document.createElement('h1');
                cityName.classList.add('nomVille');
                bloc2.appendChild(cityName);
                cityName.textContent = weatherData.name;
                //afficher température
                let cityTemp = document.createElement('h1');
                cityTemp.classList.add('Temp');
                bloc2.appendChild(cityTemp);
                cityTemp.textContent =  Math.round(weatherData.main.temp) + "°C";
                //afficher Ressenti
                let cityFeels = document.createElement('h6');
                cityFeels.classList.add('Rain');
                bloc2.appendChild(cityFeels);
                cityFeels.textContent = "Ressenti " +  Math.round(weatherData.main.feels_like) + "°C";

                //second bloc
            let bloc3 = document.createElement('div'); // On crée un élément div qui va regrouper la ville + la température + le ressenti
            bloc3.classList.add('bloc3');// On lui donne la classe bloc3
            cf.appendChild(bloc3);// On l'ajoute au container cf
                //tempMax et Min
                let tempMax = document.createElement('h4');
                bloc3.appendChild(tempMax);
                tempMax.innerHTML = "Température max : " + Math.round(weatherData.main.temp_max) + "°";
                let tempMin = document.createElement('h4');
                bloc3.appendChild(tempMin);
                tempMin.innerHTML = "Température min : " + Math.round(weatherData.main.temp_min) + "°";

                let hr = document.createElement('hr');
                bloc3.appendChild(hr);

                //afficher Vent
                let cityWind = document.createElement('h4');
                cityWind.classList.add('Wind');
                bloc3.appendChild(cityWind);
                cityWind.textContent = ' Vent : ' + Math.round(weatherData.wind.speed * 3.6) + "km/h";

                //afficher humidité
                let cityHum = document.createElement('h4');
                cityHum.classList.add('Humidity');
                bloc3.appendChild(cityHum);
                cityHum.textContent = "Taux d'humidité : " + weatherData.main.humidity + "%";

                //afficher Heure levé et couché du soleil
                let dateSunrise = new Date(weatherData.sys.sunrise * 1000);
                let dateSunset = new Date(weatherData.sys.sunset  * 1000);
                
                let currentHours = dateSunrise.getHours(); // On récupère l'heure de lever du soleil
                if (currentHours < 10)  currentHours = '0'+currentHours; // On ajoute un 0 devant si l'heure est inférieure à 10
                let currentMinutes = dateSunrise.getMinutes(); // On récupère les minutes de lever du soleil
                if (currentMinutes < 10)  currentMinutes = '0'+currentMinutes; // On ajoute un 0 devant si les minutes sont inférieures à 10

                let currentHours2 = dateSunset.getHours(); // On récupère l'heure de couché du soleil
                if (currentHours2 < 10)  currentHours2 = '0'+currentHours2; // On ajoute un 0 devant si l'heure est inférieure à 10
                let currentMinutes2 = dateSunset.getMinutes(); // On récupère les minutes de couché du soleil
                if (currentMinutes2 < 10)  currentMinutes2 = '0'+currentMinutes2; // On ajoute un 0 devant si les minutes sont inférieures à 10


                let citySunrise = document.createElement('h4');
                citySunrise.classList.add('lat_lon');
                bloc3.appendChild(citySunrise);
                citySunrise.textContent = "Le soleil se lève à " + currentHours + "h" + currentMinutes;

                let citySunset = document.createElement('h4');
                citySunset.classList.add('lat_lon');
                bloc3.appendChild(citySunset);
                citySunset.textContent = "Le soleil se couche à " + currentHours2 + "h" + currentMinutes2;

        }else{
            console.log('Une erreur est survenue');
        }

        


    }))
}


document.querySelector("form").addEventListener('submit', function(e){
    e.preventDefault();
    let ville = document.getElementById("city").value;

    apiCall(ville);
})



