import React, { useRef, useState } from 'react';
import './App.css';

function App() {

  const inputFile = useRef<HTMLInputElement | null>(null);
  let fileReader: any;
  const [devices, setDevices] = useState([])

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current?.click();
  };

  const handleFileRead = () => {
    const content = fileReader!!.result;
    console.log(content);
    var XMLParser = require('react-xml-parser');
    var xml = new XMLParser().parseFromString(content);
    console.log(xml)

    const devices = processXML(xml);
    console.log(devices);
    setDevices(devices);
  }

  const processXML = (xml: any) => {
    for (const ch of xml.children) {
      if (ch.attributes.name.includes("s_home_data")) {
        console.log(ch.value);

        return JSON.parse(ch.value).deviceRespBeen;
      }
    }
  }

  const onFileChange = (event: any) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    var file = event.target.files[0];
    fileReader.readAsText(file);
  }

  return (
    <div className="App">
      <body>
        <input onChange={onFileChange} type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
        <button onClick={onButtonClick}>Open file upload window</button>
        {
          devices.map((d: any) => <div>
            <h3>{d.name}</h3>
            <img src={d.iconUrl}></img>
            <p><b>Local Key:</b> {d.localKey}</p>
            <p><b>Device Id:</b> {d.devId}</p>
          </div>)
        }
      </body>
    </div>
  );
}

export default App;
