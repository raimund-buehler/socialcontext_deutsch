# Social Learning Task

A browser-based learning task that compares how people learn from **social** and
**non-social** feedback. On every trial the participant chooses between two
symbols; the chosen symbol produces an outcome, and the participant has to work
out from the outcomes which symbol is the better choice. The two conditions are
identical in structure and differ only in what the outcome looks like: a person
reacting, or a pattern changing.

Built in PsychoPy Builder (2022.2.4) and compiled to JavaScript, so it runs
online without installing anything.

**▶ [Try the task in your browser](https://run.pavlovia.org/raimundbuehler/social-learning-task-demo)**

The demo starts immediately — participant ID and group are pre-filled with
`test`, and it advances on mouse click, so nothing needs to be typed. It is a
shortened public build of the experiment; it is not used for data collection.

## A trial

![A trial in the social condition](docs/screenshots/trial-social.png)

A social-condition trial. The two symbols are the options; the person in the
middle will react once a choice is made; the slider underneath records both
which symbol was chosen and how confident the participant is. The non-social
condition is laid out identically, with a pattern in place of the person.

## The task

Each trial shows two symbols, one left and one right, and asks which of them is
associated with the better outcome. The participant answers with a slider:
direction indicates the choice, distance from the centre indicates confidence,
so choice and certainty are captured in a single movement.

Feedback is probabilistic — the better symbol is the better bet, not a
guarantee — so the contingency has to be learned across repeated trials rather
than read off any single outcome.

| | Social condition | Non-social condition |
|---|---|---|
| Framing | The symbols stand for words said to a person | The symbols act on a pattern |
| Positive outcome | The person reacts with a happy expression | The pattern lights up in colour |
| Negative outcome | The person reacts with an angry expression | The pattern turns grey and blurred |

Both conditions use short video clips, so motion and timing are matched across
them. The manipulation is whether the outcome is a social signal or not.

**Structure.** Two training runs (one per condition) introduce the format.
The main task is 4 blocks × 6 cycles × 4 trials = **96 trials**. Block order is
randomised at the start and then alternates, giving two social and two
non-social blocks. Symbols and stimuli change between blocks, so each block is
a fresh learning problem. Which side a symbol appears on is re-randomised by
cycle, so side and symbol cannot be confounded. Comprehension checks follow the
learning phase.

Instructions and on-screen text are in German.

## Repository layout

| Path | Contents |
|---|---|
| `RALT_PLD.psyexp` | The PsychoPy Builder file — the source of truth for the design |
| `RALT_PLD.js` | Compiled PsychoJS build that actually runs online |
| `RALT_PLD-legacy-browsers.js` | Compiled build for older browsers |
| `RALT_PLD.py` / `RALT_PLD_lastrun.py` | Python builds, for running locally in PsychoPy |
| `index.html` | Page wrapper; also holds the click-to-advance shim |
| `trials_*.xlsx`, `trainingtrials_*.xlsx` | Trial lists and reinforcement probabilities |
| `Mandalas_new/` | Non-social outcome videos |
| `ADFES/` | Social outcome videos — *not included*, see *Stimuli* below |
| `kanji/`, `Gears/`, `Food/`, `deco/` | Choice symbols and screen decoration |
| `sync-to-pavlovia.sh` | Keeps the GitHub and Pavlovia copies in step |
| `deploy-demo-to-pavlovia.sh` | Publishes the public demo build |

## Running it

**Online.** The demo link above needs nothing but a browser. To host your own
copy, push this repository to a Pavlovia project and set the project to
PILOTING or RUNNING; Pavlovia serves the compiled JavaScript directly.

**Locally.** Open `RALT_PLD.psyexp` in PsychoPy Builder and press Run, or run
`RALT_PLD.py` in a PsychoPy Python environment.

> **Note for PsychoPy 2023+ users:** this file was authored in 2022.2.4. Newer
> versions rewrite it on save and will produce a build that differs from the one
> used to collect data. Open it to inspect, but do not re-save it unless you
> intend to regenerate the compiled JavaScript as well.

## Data

Each session writes a CSV with one row per trial, holding the slider response
and its reaction time, the stimulus filenames used on that trial (neutral,
positive and negative outcome), the block / cycle / trial counters from the
nested loops, and session metadata (participant, session, group, date, PsychoPy
version, OS, measured frame rate). Online runs are written by Pavlovia into the
project's `data/` directory.

Two things are left to the analysis rather than written out directly: the
**condition** of a block, which is recoverable from the stimulus filenames, and
**choice and confidence**, which are derived from the sign and magnitude of the
slider response.

## Stimuli

Non-social stimuli were produced for this study and are included here.

The social stimuli are clips from the **Amsterdam Dynamic Facial Expression Set
(ADFES)**, distributed by the University of Amsterdam under its own licence:
access is granted on application, and the set is not free to redistribute. The
clips are therefore **not included in this repository**. To run the task, request
ADFES access directly and place the clips in `ADFES/`, keeping the folder and
file names referenced in `trials_social.xlsx` and `trainingtrials_social.xlsx`.

The screenshot above shows a single frame of one ADFES actor for illustration.

## Provenance

The task was developed at the University of Vienna and used for data collection
in 2022; the `as-run-2022` tag marks the version that was run with participants.
Everything on `main` after that tag is presentation work — instruction wording,
mouse-driven navigation, and this documentation — with the design untouched.
