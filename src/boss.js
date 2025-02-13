import React from 'react';

const BossList = ({ daten }) => {
  return (
    <div>
      {daten.map((eintrag) => (
        <table key={eintrag.id}>
          <tbody>
            <tr>
              <th colSpan="2">{eintrag.name}</th>
            </tr>
            <tr>
              <td colSpan="2" class="Table">
                <img src={eintrag.image} alt={eintrag.name} />
              </td>
            </tr>
            <tr>
              <td class="Table">Beschreibung:</td>
              <td class="Table">{eintrag.description}</td>
            </tr>
            <tr>
              <td class="Table">Healthpoints:</td>
              <td class="Table">{eintrag.healthPoints}❤️</td>
            </tr>
            <tr>
              <td class="Table">Location:</td>
              <td class="Table">{eintrag.location}</td>
            </tr>
            <tr>
              <td class="Table">Region:</td>
              <td class="Table">{eintrag.region}</td>
            </tr>
            <tr>
              <td class="Table">Drops:</td>
              <td class="Table">
                {eintrag.drops.map((drop, index) => (
                  <ul key={index}>{drop}</ul>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default BossList;
