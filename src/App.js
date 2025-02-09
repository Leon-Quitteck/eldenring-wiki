import './App.css';
import React, { useState, useEffect } from 'react';
import { fetchDaten } from './api.js';

function App() {
  const [daten, setDaten] = useState([])
  const [fehler, setFehler] = useState('');
  const [inputValue, setInputValue] = useState('');
  const getBossData = (event) =>{
    const value = event.target.value;
    setInputValue(value);
  };

  const ladeBossData = async () => {
    
      try {
        const result = await fetchDaten(inputValue); // API-Funktion aufrufen
        setDaten(result); // Boss-Daten speichern
        setFehler(''); // Fehler zurücksetzen
      } catch (error) {
        setFehler('Fehler beim Abrufen der Boss-Daten');
        setDaten(null); // Zurücksetzen der Boss-Daten im Fehlerfall
    }
  };

  useEffect(() => {
    if (inputValue.trim()) {
      ladeBossData(); // Abrufen der Daten, wenn die Eingabe nicht leer ist
    }
    if (inputValue === '') {
      setInputValue(''); // Oder einen anderen gewünschten Wert
      ladeBossData();
    }
  }, [inputValue]);

  return (
    <div className="App">
      <div id="Filter">
        <center>
        <table>
          <tbody>
        <tr id="Boss">
          <td>Boss</td>
         <td><input type="checkbox" id="CheckboxBoss"></input></td>
         </tr>
         </tbody>
        </table>
        </center>
      </div>
      <div id="Searchbar">
      Suchfeld:
        <input type="text" value={inputValue} onChange={getBossData}></input>
      </div>
      <div>
      {daten.map((eintrag) => (
        <table key={eintrag.id}>
          <tbody>
          <tr>
            <th colspan="2">{eintrag.name}</th>
          </tr>
          <tr>
              <td colspan="2"><img
        src={eintrag.image}
        alt={eintrag.name}
      /></td>
          </tr>
          <tr>
            <td>Descrption:</td>
            <td>{eintrag.description}</td>
          </tr>
          <tr>
            <td>Healthpoints:</td>
            <td>{eintrag.healthPoints}❤️</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>{eintrag.location}</td>
          </tr>
          <tr>
            <td>Region:</td>
            <td>{eintrag.region}</td>
          </tr>
          <tr>
            <td>Drops:</td>
              <td>
              {eintrag.drops.map((drop) =>(
                <ul key={drop.id}>{drop}</ul>
              ))} 
              </td>           
          </tr>
          </tbody>
        </table>
        ))}
      </div>
    </div>
  );
};


export default App;
