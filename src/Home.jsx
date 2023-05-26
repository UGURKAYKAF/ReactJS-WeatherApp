import React, { useState } from "react";
import axios from "axios";
import './style.css';

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: '/img/Bulutlu.png'
    })

    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleClick = () => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e4bf7f87294e09f8ba29dbb016eb8556&&units=metric`;
            axios.get(apiUrl)
                .then(res => {
                    let imagePath = '';
                    if(res.data.weather[0].main == "Clouds"){ //parçalı bulutlu
                        imagePath = '/img/ParcaliBulutlu.png'
                    } else if(res.data.weather[0].main == "Clear"){ //güneşli
                        imagePath = '/img/Gunesli.png'
                    } else if(res.data.weather[0].main == "Rain"){ //yağmurlu
                        imagePath = '/img/Yagmurlu.png'
                    } else if(res.data.weather[0].main == "Drizzle"){ // çiseleme
                        imagePath = '/img/Ruzgar.png'
                    } else if(res.data.weather[0].main == "Mist"){ //Sisli
                        imagePath = '/img/Karli.png'
                    } else {                                        //Bulutlu
                        imagePath = '/img/Bulutlu.png'
                    }
                    console.log(res.data);
                    setData({
                        ...data,
                        celcius: res.data.main.temp,
                        name: res.data.name,
                        humidity: res.data.main.humidity,
                        speed: res.data.wind.speed,
                        image: imagePath
                    })
                    setError('');
                })
                .catch(err => {
                    if(err.response.status == 404){
                        setError("Hatalı Şehir Adı")
                    }else if(err.response.status == 429){
                        setError("Çok fazla deneme yaptın daha sonra tekrar deneyiniz!!!")
                    }else{
                        setError('');
                    }
                    console.log(err)
                });
        }
    }

    return (
        <div className="container">
            <div className="weather">
                <div className="search">
                    <input type="text" placeholder="Şehir İsmi Girin" onChange={e => setName(e.target.value)} />
                    <button><img src="/img/search.png" onClick={handleClick} alt="" /></button>
                </div>
                <div className="error">
                    <p>{error}</p>
                </div>
                <div className="winfo">
                    <img src={data.image} alt="" className="icon" />
                    <h1>{Math.round(data.celcius)}°C</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src="/img/Nem.png" alt="" />
                            <div className="nem">
                                <p>{data.humidity}%</p>
                                <p>Nem</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src="/img/Ruzgar.png" alt="" />
                            <div className="ruzgar">
                                <p>{Math.round(data.speed)} km/h</p>
                                <p>Rüzgar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Home;