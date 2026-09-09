import { saveData } from "./db";

/*
========================================
SYNC LIBRARY DATA
========================================
*/

export async function syncLibraryData() {
  if (!navigator.onLine) {
    console.log("Offline. Using saved library data.");
    return null;
  }

  try {
    const response = await fetch(
      `/data/library.json?update=${Date.now()}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Library data could not be downloaded.");
    }

    const data = await response.json();

    await saveData("library", data);

    await saveData("lastSync", {
      timestamp: Date.now(),
    });

    console.log("Latest library data downloaded.");

    return data;
  } catch (error) {
    console.log(
      "Sync failed. Existing offline data will continue to be used.",
      error
    );

    return null;
  }
}

/*
========================================
SYNC EVERYTHING
========================================
*/

export async function syncAllData() {
  if (!navigator.onLine) {
    return;
  }

  await syncLibraryData();
}
