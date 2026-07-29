# ตารางเรียน ปี 3 รหัส 67 — Weekly Class Schedule

A single-file, no-install weekly timetable for Year‑3 Semester‑1 (3 Aug – 11 Dec 2026), built from the faculty's spreadsheet. Pick **Pharm Sci** or **Pharm Care** once and page through the 19 weeks of the term — desktop shows a time grid, phones get a scannable agenda list.

## Use it

**Live site:** https://supakiat999.github.io/pharm-schedule/ — free, public, works on any device, nothing to install.

Or double-click [`index.html`](index.html) locally — it works fully offline too.

- **‹ ›** or **arrow keys** or **swipe** — move between weeks
- **Today** — jump to the current week
- **☀ / ☾ / ◐** — light, dark, or auto (follows your device) theme
- **Week number strip** — jump anywhere in the term; a red dot marks weeks with an exam
- **ไทย / EN** — switch UI language (course names stay as written in the source)
- Your track and language choice are remembered on this device

## Editing the schedule

Everything lives in **one file**, [`index.html`](index.html), in a few clearly marked blocks:

| Data | Look for |
|---|---|
| Class sessions | the `SESSIONS` array — one `S(date, startHour, endHour, courseKey, sessionLabel, room, track)` line per class block |
| Courses & colours | the `COURSES` object |
| Holidays | the `HOLIDAYS` object |
| Flagged uncertainties | the `NOTES` object — shown as an on-page warning banner on the affected week |

`track` on a session is `"all"` (default), `"sci"`, or `"care"`. Example:

```js
S("2026-11-18", 9,12, "IDQ1_LAB", "17-19", "201, 301", "sci");
S("2026-11-20", 9,12, "IDQ1_LAB", "17-19", "201, 301", "care");
```

After editing, just reopen `index.html` — there's no build step.

### A few cells worth double-checking against the official notice

These were hard to read in the source screenshot and are flagged live in the app with a warning banner on the relevant week (search `NOTES` in `index.html` to fix them once confirmed):

- Thu 24 Sep — session 74 was not clearly legible
- Mon 12 Oct — whether `IDQ 4 LAB SCI` really moved to Monday (Tue 13 Oct is a holiday)
- Fri 16 Oct — the row is greyed in the source but still shows `PIL 3`
- Mon 23 Nov — `IDQ LAB 1 (31-34)` is coloured differently from other IDQ LAB 1 sessions in the source

The console also logs a self-check on every load (open DevTools) confirming session counts total correctly: IDT4 → 75, IDQ 1 lecture → 30, IDQ 1 lab → 22.5, IDQ LAB 1 → 45, IDG 3 → 10.

## Publishing an update

`index.html` is the single source of truth. To regenerate the standalone body used for the published web link:

```bash
node make-artifact.js
```

This writes `artifact/schedule.html` (no `<html>`/`<head>` wrapper — just the app), which is what gets published.
