import axios from 'axios'; 
import {useState} from 'react'; 
import styled from 'styled-components'; 


function App() {

  const [location, setLocation] = useState(''); 
  const [result, setResult] = useState({}); 
  const API_KEY = "6bedce92f708cdeb65b084ee01b825c0";
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`; 

  const searchWeather = async(e) => {
      if (e.key === 'Enter') {
        try {
          const data = await axios({
            method:'get',
            url: url,
          })
          setResult(data); 
          console.log(data); 

        }catch(err) {
          alert(err); 
        }
      } 
  }



  return (

  
    <AppWrap>
    <div className="appContentWrap">

      <input placeholder="도시명를 입력 하세요"
          type="text"  
          value={location}
          onChange={(e) => setLocation(e.target.value)} 
          onKeyDown={searchWeather}      
      />

      { /* result 의 값이 존재 할때 출력 , 아니면 오류 발생  */ }

      { Object.keys(result).length !== 0 && (
      <div>
          <div className="city"> {result.data.name} </div>
          <div className="temperature"> {
          Math.round((result.data.main.temp -273.15) *10) / 10 
          } 도(C) </div>
          <div classname="sky"> {result.data.weather[0].main} </div>
      </div>
      )}

    </div>
    </AppWrap>
  

  );
}

export default App;

const AppWrap = styled.div`
  width:100vw; 
  height:100vh; 
   
  .appContentWrap{
     left:50%; 
     top:50%; 
     position:absolute;
     padding:20px;
     transform:translate(-50%, -50%);
    
  }

  input {
    padding:16px; 
    border: 2px block solid; 
    border-radius:16px; 
  }

  `; 
