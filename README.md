# ตารางเรียน ปี 3 รหัส 67 — Weekly Class Schedule

A single-file, no-install weekly timetable for Year‑3, covering both **Semester 1** (3 Aug – 11 Dec 2026) and **Semester 2** (4 Jan – 21 May 2027), built from the faculty's spreadsheets. Pick a semester and **Pharm Sci** or **Pharm Care** once and page through the term — desktop shows a time grid, phones get a scannable agenda list.

## Use it

**Live site:** https://supakiat999.github.io/pharm-schedule/ — free, public, works on any device, nothing to install.

Or double-click [`index.html`](index.html) locally — it works fully offline too.

- **S1 / S2** — switch semester; defaults to whichever one contains today's date
- **‹ ›** or **arrow keys** or **swipe** — move between weeks
- **Today** — jump to the current week
- **☀ / ☾ / ◐** — light, dark, or auto (follows your device) theme
- **Week number strip** — jump anywhere in the term; a red dot marks weeks with an exam
- **ไทย / EN** — switch UI language (course names stay as written in the source)
- Your semester, track, and language choice are remembered on this device

## Editing the schedule

Everything lives in **one file**, [`index.html`](index.html), in a few clearly marked blocks. Semester 1 and Semester 2 each have their own set, prefixed `S1_`/`S2_`:

| Data | Look for |
|---|---|
| Class sessions | `S1_SESSIONS` / `S2_SESSIONS` — one `S(date, startHour, endHour, courseKey, sessionLabel, room, track)` line per class block |
| Courses & colours | the shared `COURSES` object (covers both semesters) |
| Colour-key text | `S1_LEGEND` / `S2_LEGEND` |
| Holidays | `S1_HOLIDAYS` / `S2_HOLIDAYS` |
| Flagged uncertainties | `S1_NOTES` / `S2_NOTES` — shown as an on-page warning banner on the affected week |
| Semester-wide caveat | `S2_ADVISORY` — a standing banner shown whenever Semester 2 is selected (`null` for Semester 1, which has none) |

`track` on a session is `"all"` (default), `"sci"`, or `"care"`. Example:

```js
S("2026-11-18", 9,12, "IDQ1_LAB", "17-19", "201, 301", "sci");
S("2026-11-20", 9,12, "IDQ1_LAB", "17-19", "201, 301", "care");
```

After editing, just reopen `index.html` — there's no build step.

### Semester 1 — cells worth double-checking

These were hard to read in the source screenshot and are flagged live in the app with a warning banner on the relevant week (search `S1_NOTES` in `index.html` to fix them once confirmed):

- Thu 24 Sep — session 74 was not clearly legible
- Mon 12 Oct — whether `IDQ 4 LAB SCI` really moved to Monday (Tue 13 Oct is a holiday)
- Fri 16 Oct — the row is greyed in the source but still shows `PIL 3`
- Mon 23 Nov — `IDQ LAB 1 (31-34)` is coloured differently from other IDQ LAB 1 sessions in the source

### Semester 2 — lower-confidence transcription

Semester 2 was read from a lower-resolution image than Semester 1, so confidence is lower overall (an on-page banner says so whenever Semester 2 is open). Specific things worth confirming against the official notice — search `S2_NOTES` and `S2_ADVISORY` in `index.html`:

- Several `IDQ LAB 2` afternoon blocks may actually run to 17:00 rather than the 16:00 shown
- Exam blocks (`IDG 4`, `IDQ 5`, `IDT 5`, `IDT 3`) only had a legible start time — all shown ending at 12:00 by default
- `IDT 3`'s session count (90) wasn't independently confirmed against a printed hour total
- Wed 16 Feb — whether the "Gr1"/"Gr2" case-study lab groups map to Pharm Sci/Care or are just rotation groups (currently shown to both tracks)
- Mon 22 Feb — the closure has no holiday name printed in the source; labelled "likely Makha Bucha Day" pending confirmation

The console also logs a self-check on every load (open DevTools) confirming session counts total correctly — Sem 1: IDT4 → 75, IDQ 1 lecture → 30, IDQ 1 lab → 22.5, IDQ LAB 1 → 45, IDG 3 → 10; Sem 2: IDT 5 → 75, IDT 3 → 90, IDQ 2 lecture → 30, IDG 4 → 10.

## Publishing an update

`index.html` is the single source of truth. To regenerate the standalone body used for the published web link:

```bash
node make-artifact.js
```

This writes `artifact/schedule.html` (no `<html>`/`<head>` wrapper — just the app), which is what gets published.
