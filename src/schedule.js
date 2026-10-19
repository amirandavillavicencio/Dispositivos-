import {consultation, reinforcement, mentorship, tpi} from './data.js';

const WEEKDAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const normalize = (device, row) => ({
  day: row.day,
  time: row.time,
  tutor: row.tutor,
  subject: row.subject ?? (row.subjects ? row.subjects.join(', ') : null),
  room: row.room ?? null,
  mode: row.mode ?? null,
  block: row.block ?? null,
  url: row.url ?? null,
  questionable: device === 'tpi' && row.time === '10:05–17:15',
});

export function campusTimetable(campus) {
  if (campus !== 'vitacura' && campus !== 'sanjoaquin') return [];
  return [
    ['consultation', consultation],
    ['reinforcement', reinforcement],
    ['mentorship', mentorship],
    ['tpi', tpi],
  ].map(([device, source]) => ({
    device,
    rows: source[campus]
      .map(row => normalize(device, row))
      .sort((a, b) => WEEKDAYS.indexOf(a.day) - WEEKDAYS.indexOf(b.day)
        || (a.time ?? '99:99').localeCompare(b.time ?? '99:99')),
  }));
}
