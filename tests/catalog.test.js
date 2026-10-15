import { test } from 'node:test';
import assert from 'node:assert/strict';
import { codeList, appointments, specialistFor } from '../src/catalog.js';
import { contacts, reinforcement, mentorship, tpi, consultation } from '../src/data.js';

test('every documented session is reachable from its campus and subject', () => {
  for (const campus of ['vitacura', 'sanjoaquin']) {
    for (const [device, source] of Object.entries({ reinforcement, mentorship, tpi })) {
      for (const row of source[campus]) {
        for (const subject of row.subjects || [row.subject]) {
          assert.ok(codeList(campus).includes(subject));
          assert.ok(appointments(device, campus, subject).includes(row));
        }
      }
    }
    for (const subject of codeList(campus)) {
      assert.equal(appointments('consultation', campus, subject).length, consultation[campus].length);
    }
  }
});

test('only matching sessions appear; general consultation includes all tutors with specialists first', () => {
  assert.equal(appointments('mentorship', 'vitacura', 'FIS100').length, 0);
  assert.equal(appointments('tpi', 'vitacura', 'MAT061').length, 0);
  const rows = appointments('consultation', 'vitacura', 'MAT071');
  assert.equal(rows.length, 10);
  let reachedGeneral = false;
  for (const row of rows) {
    if (!specialistFor('vitacura', row.tutor, 'MAT071')) reachedGeneral = true;
    else assert.equal(reachedGeneral, false);
  }
  assert.ok(specialistFor('sanjoaquin', 'Karla González', 'FIS111'));
  assert.ok(!codeList('sanjoaquin').includes('TODAS LAS FISICAS'));
});

test('source corrections, missing hours and contradictory TPI hours remain explicit', () => {
  const sj = reinforcement.sanjoaquin;
  assert.equal(sj.find(r => r.subject === 'MAT061' && r.mode === 'Presencial').time, '11:05–12:15');
  assert.equal(sj.find(r => r.subject === 'FIS110' && r.mode === 'Presencial').time, '12:30–13:40');
  assert.equal(sj.find(r => r.subject === 'MAT070').time, null);
  assert.equal(sj.find(r => r.subject === 'MAT022').time, null);
  assert.equal(tpi.sanjoaquin.filter(r => r.time === '10:05–17:15').length, 2);
  assert.ok(tpi.vitacura.every(r => r.mode === undefined));
});

test('registration recipients and online destinations match supplied channels', () => {
  assert.equal(contacts.tpi.vitacura.email, 'karla.delamaza@usm.cl');
  assert.equal(contacts.tpi.sanjoaquin.email, 'Katherine.Velasquez@usm.cl');
  for (const campus of ['vitacura', 'sanjoaquin']) {
    assert.equal(contacts.mentorship[campus].email, 'gleudys.martinez@usm.cl');
    for (const row of reinforcement[campus].filter(r => r.mode === 'Online')) {
      assert.equal(new URL(row.url).hostname.toLowerCase(), 'teams.microsoft.com');
    }
  }
});
