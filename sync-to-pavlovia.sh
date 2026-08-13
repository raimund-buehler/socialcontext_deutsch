#!/usr/bin/env bash
#
# Push code from this repository to the Pavlovia GitLab project.
#
# Why this exists, rather than a shared remote:
#   Pavlovia writes every participant's results back into its own GitLab repo.
#   That repo therefore holds real participant data and must never be pushed to
#   the public GitHub repository. Code flows one way only:
#
#       GitHub (this repo, code, data/ ignored)  ──►  Pavlovia GitLab  ──►  live app
#
#   Nothing is ever pulled back.
#
# Usage:
#   ./sync-to-pavlovia.sh /path/to/pavlovia/clone ["commit message"]
#
# After running, open the project in PsychoPy Builder and press the globe/sync
# button if you changed the .psyexp, so the JavaScript is regenerated from it.
# Then set the project to PILOTING (free) or RUNNING (uses credits) in the
# Pavlovia dashboard.

set -euo pipefail

PAVLOVIA_DIR="${1:-}"
MESSAGE="${2:-Sync code from GitHub}"

if [[ -z "$PAVLOVIA_DIR" ]]; then
  echo "usage: $0 /path/to/pavlovia/clone [\"commit message\"]" >&2
  exit 1
fi

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ ! -d "$PAVLOVIA_DIR/.git" ]]; then
  echo "error: $PAVLOVIA_DIR is not a git repository" >&2
  exit 1
fi

if ! git -C "$PAVLOVIA_DIR" remote get-url origin | grep -q 'pavlovia\.org'; then
  echo "error: $PAVLOVIA_DIR does not point at pavlovia.org - refusing to push" >&2
  exit 1
fi

echo "source : $SRC"
echo "target : $PAVLOVIA_DIR"
echo

# Copy code only. data/ is excluded in both directions: it belongs to Pavlovia
# and is not tracked here.
rsync -a --delete \
  --exclude='.git/' \
  --exclude='data/' \
  --exclude='.DS_Store' \
  --exclude='sync-to-pavlovia.sh' \
  "$SRC"/ "$PAVLOVIA_DIR"/

cd "$PAVLOVIA_DIR"

if git diff --quiet && git diff --cached --quiet; then
  echo "no changes to push - Pavlovia is already up to date"
  exit 0
fi

echo "changes to be pushed:"
git status --short | grep -v '^?? data/' | sed 's/^/  /'
echo

read -r -p "push these to Pavlovia? [y/N] " reply
[[ "$reply" =~ ^[Yy]$ ]] || { echo "aborted"; exit 1; }

git add -A -- ':!data'
git commit -q -m "$MESSAGE"
git push origin HEAD

echo
echo "done. If you changed RALT_PLD.psyexp, open it in PsychoPy Builder and press"
echo "the sync button so the JavaScript is regenerated, then set the project to"
echo "PILOTING in the Pavlovia dashboard."
