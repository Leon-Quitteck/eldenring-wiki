export async function fetchDaten(name) {
  const url = 'https://eldenring.fanapis.com/api/bosses?name=';
    try {
      const response = await fetch(url+name); // API-URL anpassen
      if (!response.ok) {
        throw new Error('Netzwerkantwort war nicht ok');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      throw error; // Fehler weiterwerfen
    }
  }
  