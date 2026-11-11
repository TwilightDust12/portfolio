export type SkyBand = 'dawn' | 'morning' | 'midday' | 'afternoon' | 'sunset' | 'evening' | 'night';

export interface SkyBandDef {
  id: SkyBand;
  /** Minutes after 00:00 PHT (UTC+8, no DST). */
  start: number;
  label: string;
  mocha: string;
  latte: string;
}

export const SKY_LIGHT_BASE = '#eff1f5';
export const SKY_DARK_BASE = '#1e1e2e';

export const SKY_BANDS: readonly SkyBandDef[] = [
  { id: 'dawn', start: 300, label: "It's early morning in Lucena City.", mocha: '#f2cdcd', latte: '#a15858' },
  { id: 'morning', start: 420, label: "It's morning in Lucena City.", mocha: '#89dceb', latte: '#0375a3' },
  { id: 'midday', start: 660, label: "It's midday in Lucena City.", mocha: '#f9e2af', latte: '#986114' },
  { id: 'afternoon', start: 900, label: "It's late afternoon in Lucena City.", mocha: '#fab387', latte: '#bc4a08' },
  { id: 'sunset', start: 1050, label: "It's sunset in Lucena City.", mocha: '#f5c2e7', latte: '#a1518c' },
  { id: 'evening', start: 1140, label: "It's evening in Lucena City.", mocha: '#cba6f7', latte: '#8839ef' },
  { id: 'night', start: 1320, label: "It's late at night in Lucena City.", mocha: '#89b4fa', latte: '#1d63ee' },
];

export function skyBandAt(date: Date): SkyBand {
  const minutes = (date.getUTCHours() * 60 + date.getUTCMinutes() + 480) % 1440;
  let current = SKY_BANDS[SKY_BANDS.length - 1];
  for (const band of SKY_BANDS) {
    if (minutes >= band.start) current = band;
  }
  return current.id;
}

export function skyScript(): string {
  const table = JSON.stringify(SKY_BANDS.map(({ id, start }) => ({ id, start })));
  return `(function(){var b=${table};var d=new Date();var m=(d.getUTCHours()*60+d.getUTCMinutes()+480)%1440;var c=b[b.length-1].id;for(var i=0;i<b.length;i++){if(m>=b[i].start)c=b[i].id;}document.documentElement.dataset.sky=c;})();`;
}

export function skyCss(): string {
  return SKY_BANDS.map(
    (b) =>
      `html[data-sky="${b.id}"]{--accent-text:${b.latte};--on-accent:#ffffff}` +
      `html.dark[data-sky="${b.id}"]{--accent-text:${b.mocha};--on-accent:#11111b}`,
  ).join('\n');
}
