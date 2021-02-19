// sun-moon longitude / description
export const moonPhases = new Map<number, string>([
  [0, 'Luna Nueva'],
  [45, 'semicuadcrec'],
  [90, 'Luna Creciente'],
  [135, 'sesquicuadcrec'],
  [180, 'Luna Llena'],
  [225, 'sesqcuadmeng'],
  [270, 'Luna Menguante'],
  [315, 'semicuadmeng'],
]);

export const SYNODIC_MONTH = 29.530588853;

// age = date % SYNODIC_MONTH
export const MOON_PHASES = [
  { name: 'new-moon', age: 1 },
  { name: 'waxing-crescent', age: 6.38264692644 },
  { name: 'first-quarter', age: 8.38264692644 },
  { name: 'waxing-gibbous', age: 13.76529385288 },
  { name: 'full-moon', age: 15.76529385288 },
  { name: 'waning-gibbous', age: 21.14794077932 },
  { name: 'last-quarter', age: 23.14794077932 },
  { name: 'waning-crescent', age: 28.53058770576 },
  { name: 'new-moon', age: SYNODIC_MONTH },
];
