import React from 'react';

const ItemList = ({ daten }) => {
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
              <td class="Table">Type:</td>
              <td class="Table">{eintrag.type}</td>
            </tr>
            <tr>
              <td class="Table">Effect:</td>
              <td class="Table">{eintrag.effect}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default ItemList;
