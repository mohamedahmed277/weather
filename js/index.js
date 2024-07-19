'use strict'
let wavi = document.querySelector('.waviy');
setTimeout(function(){
    wavi.parentElement.classList.add('d-none');
    }, 1000);let weatherForcast =[];
let search = document.querySelector('#search')
let cityName ;
async function weatherData(city , country){
    let waviy = document.querySelector('.w-75 .loader')
    let row =document.querySelector('.w-75 .row')
    waviy.classList.remove('d-none');
    row.classList.toggle('d-none');
    if(city){
        const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0da0cc2100c8428695921344240101&q=${city}&days=3`);
        const result =await data.json();
        weatherForcast = result.forecast.forecastday;
    // console.log(result.forecast.forecastday[0].day.mintemp_c);
    // console.log(result.forecast.forecastday[0].day.maxtemp_c);
    // console.log(result.forecast.forecastday[0].day.condition.text);
    // console.log(result.forecast.forecastday[0].day.condition.icon);
    // console.log(result.forecast.forecastday[0].date);
    // console.log(weatherForcast);
    // let temp = document.querySelector('.temp');
    // temp.innerHTML =weatherForcast[0].day.maxtemp_c+'°';
    // temp.previousElementSibling.setAttribute('src',`https:${weatherForcast[0].day.condition.icon}`) 
    // temp.previousElementSibling.previousElementSibling.innerHTML = weatherForcast[0].day.condition.text
    // temp.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML = `${city}`
    // let maxTemp = document.querySelector('.max');
    // maxTemp.lastElementChild.innerHTML = weatherForcast[0].day.maxtemp_c + '°';
    // maxTemp.previousElementSibling.lastElementChild.innerHTML = weatherForcast[0].day.mintemp_c + '°';
    let cartona =''
    for(let i = 0; i < weatherForcast.length; i++) {
        cartona +=`
        <div class="col-lg-4 ">
        <div class="cardContainer w-100">
            <div class="card w-100">
                <p class="city text-capitalize text-muted lead fs-4 p-0 m-0 letter text-center w-100">${country}</p>
                <p class="city text-capitalize text-muted lead fs-3">${city}</p>
                <p class="weather text-capitalize">${weatherForcast[i].day.condition.text}</p>
                <div class="d-flex w-100 justify-content-around align-item-center"> <p class="text-center fs-4  text-info lead">${getDayName(weatherForcast[i].date)[0]}</p> <p class="lead fs-4 text-info">${getDayName(weatherForcast[i].date)[1] +' '+ getDayName(weatherForcast[i].date)[2]}</p></div>
                <img src="https:${weatherForcast[i].day.condition.icon}" class="my-0 mx-auto rounded-circle" " alt="">
                <p class="temp">${weatherForcast[i].day.avgtemp_c+'°'}</p>
                <div class="minmaxContainer">
                    <div class="min">
                        <p class="minHeading">Min</p>
                        <p class="minTemp">${weatherForcast[i].day.mintemp_c + '°'}</p>
                    </div>
                    <div class="max">
                        <p class="maxHeading">Max</p>
                        <p class="maxTemp">${weatherForcast[i].day.maxtemp_c + '°'}</p>
                    </div>
                </div>
            </div>
        </div>                              
    </div>
        `
    }       
    waviy.classList.add('d-none');
    row.innerHTML = cartona;
    row.classList.toggle('d-none');
    }
}
search.addEventListener('input',async function(eventInfo){
    if( Array.from(this.value).length < 3){
        
    }else {
        const data = await fetch(`https://api.weatherapi.com/v1/search.json?key=0da0cc2100c8428695921344240101&q=${this.value}`);
        const result = await data.json();
        let back = result[0].name;
        let country = result[0].country;
        console.log(result);
        switch (country) {
            case "United Kingdom":
                country = 'UK'
            break;
            case "United States of America":
                country ='USA'
            break;
            case "Democratic Republic of Congo":
            country = 'D.Congo'
            break;
            case "United Arab Emirates":
                country = 'UAE'
            break;
        }
        if(back){
            weatherData(back , country);
        }
    }
})
// async function searchWeather(searchResult){
//     const data = await fetch(`https://api.weatherapi.com/v1/search.json?key=0da0cc2100c8428695921344240101&q=${searchResult}`);
//     const result = await data.json();
//     cityName = result[0].name;
//     return result[0].name;
// }
function getDayName(dateString) {
    // const dateObject = new Date(dateString);
    // const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // const dayOfWeek = dateObject.getDay();
    // const dayName = daysOfWeek[dayOfWeek];
    // // console.log('day',dateObject.getDate());
    // // console.log('month',dateObject.getMonth());
    // const test = dateObject
    // // const arrayExample = Object.entries(test);
    // console.log(test);
    // return dayName;
    const dateObject = new Date(dateString);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const dayOfWeek = dateObject.getDay();
    const dayName = daysOfWeek[dayOfWeek];
    
    const dayNumber = dateObject.getDate();
    
    const monthIndex = dateObject.getMonth();
    const monthName = months[monthIndex];

    // console.log(`Day: ${dayName}`);
    // console.log(`Day Number: ${dayNumber}`);
    // console.log(`Month: ${monthName}`);
    let data =[dayName , dayNumber , monthName];
    return data;
}
// function getDay(){
//     const day = new Date();
//     console.log(day.toLocaleString());
//     const f = new Intl.DateTimeFormat("en-US",{
//         dateStyle: "full",
//     })
//     console.log(f.format(day));
// }
// getDay()
async function getId(ip){
    let id =await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=59fd8a190e8244f5a16b4864c0ae9e0e&ip_address=${ip}`)
    let data = await id.json()
    weatherData(data.city, data.country)
    console.log(data);
}
// getId()
const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-example'
})
async function getipAddress(){
    // Use a third-party service to get the user's IP address
fetch('https://api64.ipify.org?format=json')
.then(response => response.json())
.then(data => {
  // Access the IP address from the response
  const userIP = data.ip;
//   console.log('User IP Address:', userIP);
getId(userIP)
})
.catch(error => {console.error('Error fetching IP address:', error)
alert('there is no internet connection')
});

}
getipAddress();