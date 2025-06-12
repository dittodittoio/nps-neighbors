import parkDataRaw from '../data/parklookup.json';
const parkData = parkDataRaw as ParkEntry[];

type ParkEntry = {
  zip: string;
  parkName: string;
  state: string;
  filename: string;
};

export function getParkByZip(zip: string): ParkEntry | null {
  const match = (parkData as ParkEntry[]).find(entry => entry.zip === zip);
  return match || null;
}
export function isValidZip(zip: string): boolean {
  // Assumes zip is a string of 5 digits
  return parkData.some((entry: { zip: string }) => entry.zip === zip);
}