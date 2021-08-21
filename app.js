window.addEventListener('load', ()=>{
    let long;
    let lat;
    const key = '0efef7e77864a3eb39ec04ce6025d392'

    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let summery = document.querySelector('.summery')
    let temperatureSection = document.querySelector('.degree-section')
    let temperatureSpan = document.querySelector('.degree-section span')



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude
            
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${key}&units=metric`
            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    // dom elements from api info
                    temperatureDegree.textContent  = Math.floor(data.current.temp)  
                    locationTimezone.textContent = data.timezone
                    summery.textContent = data.current.weather[0].description

                    temperatureSection.addEventListener('click', event => {
                        if(temperatureSpan.textContent === 'C'){
                            temperatureSpan.textContent ='F'
                            temperatureDegree.textContent = (Math.floor(data.current.temp) * 1.8) + 32
                        }else{
                            temperatureSpan.textContent = 'C'
                            temperatureDegree.textContent  = Math.floor(data.current.temp)  
                        }
                    })
                })
        })
    }else{
        h1.textContent = 'this is not working you should allow permitions'
    }
    
})