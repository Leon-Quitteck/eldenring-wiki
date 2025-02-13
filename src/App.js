import './App.css';
import React, { useState, useEffect } from 'react';
import { fetchDaten } from './api.js';
import BossList from './boss.js'; 
import ItemList from './item.js';

function App() {
  const [daten, setDaten] = useState([]);
  const [fehler, setFehler] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(0);
  const [catagory, setCategory] = useState('');
  const [selected, setSelected] = useState(null);

  const getBossData = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const ladeBossData = async (pageNum) => {
    try {
      const result = await fetchDaten(inputValue, pageNum, catagory); // API-Funktion aufrufen
      setDaten(result); // Boss-Daten speichern
      setFehler(''); // Fehler zurücksetzen
    } catch (error) {
      setFehler('Fehler beim Abrufen der Boss-Daten');
      setDaten([]); // Zurücksetzen der Boss-Daten im Fehlerfall
    }
  };

  const handleCheckboxChange = (id) => {
    // Wenn dieselbe Checkbox erneut angeklickt wird, wird sie deaktiviert, andernfalls wird sie aktiviert
    setSelected(selected === id ? null : id);  // Nur eine Checkbox kann ausgewählt sein
  };

  useEffect(() => {
    // Wenn das Eingabefeld leer ist, setze die Daten auf ein leeres Array
    if (!inputValue.trim()) {
      setDaten([]); // Alle Daten löschen, wenn das Eingabefeld leer ist
    } else {
      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          setPage(() => {
            const newPage = 0;
            ladeBossData(newPage); // Daten für die neue Seite direkt laden
            return newPage;
          });
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Cleanup
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [inputValue, page, catagory]);

  const handleNext = () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      ladeBossData(newPage); // Daten für die neue Seite direkt laden
      return newPage;
    });
  };

  const handlePrevious = () => {
    setPage((prevPage) => {
      const newPage = prevPage > 0 ? prevPage - 1 : 0; // Verhindert, dass die Seite < 1 wird
      ladeBossData(newPage); // Daten für die neue Seite direkt laden
      return newPage;
    });
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  }

  return (
    <div className="App">
      <div id="Filter">
        <center>
          <table>
            <tbody>
              <tr id="Boss">
                <td class="checkbox">
                  <label for="cars">Choose a catagory:</label>

<select id="catagorys" value={catagory} onChange={handleCategory}>
<option value=""></option>
  <option value="bosses">Bosses</option>
  <option value="items">Items</option>
</select>
                  </td>
              </tr>
            </tbody>
          </table>
        </center>
      </div>
      <div id="Searchbar">
        Suchfeld:
        <input type="text" value={inputValue} onChange={getBossData}></input>
      </div>

      {/* Anzeige der Boss-Daten */}
      <div>
        {fehler && <p>{fehler}</p>}
        {daten.length > 0 && catagory === 'bosses' && 
    <BossList daten={daten} />}
    {daten.length > 0 && catagory === 'items' && 
    <ItemList daten={daten} />}
      </div>
      <div>
        <table id="navigation">
          <tr>
            <td class="navigationRow">
              <div class="pageNavigation" ><button onClick={handlePrevious}>Previous</button></div>
            </td>
            <td class="navigatioRow">
              <div class="pageNavigation"><button onClick={handleNext}>Next</button></div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
