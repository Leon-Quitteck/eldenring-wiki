export async function fetchDaten(name, page, category, limit = 20) {
  const url = 'https://eldenring.fanapis.com/api/';
  let allData = [];
  let nextPageUrl = `${url}${category}?limit=${limit}&page=${page}&name=${name}`; // Starte mit der ersten Seite

  try {
    // Solange es eine "next"-Seite gibt
    while (nextPageUrl) {
      const response = await fetch(nextPageUrl); // Hole die Daten von der API
      if (!response.ok) {
        throw new Error('Netzwerkantwort war nicht ok');
      }

      const data = await response.json(); // Konvertiere die Antwort in JSON
      allData = [...allData, ...data.data]; // Füge die abgerufenen Daten zu allData hinzu

      // Überprüfe, ob es eine weitere Seite gibt, und setze die URL auf die nächste Seite
      nextPageUrl = data.meta?.next_page_url || null; // Hier prüfen wir, ob `meta.next_page_url` vorhanden ist
    }

    return allData; // Alle gesammelten Daten zurückgeben
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    throw error; // Fehler weiterwerfen
  }
}
