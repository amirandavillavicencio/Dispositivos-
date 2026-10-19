import {test} from 'node:test';
import assert from 'node:assert/strict';
import {campusTimetable} from '../src/schedule.js';
import {consultation, reinforcement, mentorship, tpi} from '../src/data.js';

test('general CIAC schedules include every original session for each campus', () => {
  for (const campus of ['vitacura', 'sanjoaquin']) {
    const result = campusTimetable(campus);
    assert.deepEqual(result.map(section => section.device),
      ['consultation', 'reinforcement', 'mentorship', 'tpi']);
    for (const {device, rows} of result) {
      assert.equal(rows.length, {consultation, reinforcement, mentorship, tpi}[device][campus].length);
      assert.ok(rows.every(row => row.day && row.tutor));
    }
  }
});

test('general schedule is sorted by weekday and start time, without losing source details', () => {
  const order = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  for (const campus of ['vitacura', 'sanjoaquin']) {
    for (const {rows} of campusTimetable(campus)) {
      assert.deepEqual(rows, [...rows].sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day)
        || (a.time ?? '99:99').localeCompare(b.time ?? '99:99')));
    }
  }
  assert.ok(campusTimetable('vitacura').find(x => x.device === 'reinforcement')
    .rows.some(x => x.subject === 'MAT061' && x.mode === 'Online' && x.url));
  assert.ok(campusTimetable('sanjoaquin').find(x => x.device === 'tpi')
    .rows.some(x => x.questionable));
  assert.deepEqual(campusTimetable('otro'), []);
});
