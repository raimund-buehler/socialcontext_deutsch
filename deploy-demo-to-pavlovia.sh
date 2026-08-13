#!/usr/bin/env bash
#
# Deploy this experiment to a Pavlovia project WITHOUT using PsychoPy Builder.
#
# This works because Pavlovia does not run the .psyexp - it serves the compiled
# JavaScript. RALT_PLD.js, RALT_PLD-legacy-browsers.js and index.html are already
# built and already contain the current instruction text, so nothing needs
# recompiling. Builder is only required when you change the .psyexp and need the
# JavaScript regenerated from it.
#
# It pushes a single fresh commit, so the demo project does not inherit this
# repository's history (which contains old pilot result files).
#
# Usage:
#   ./deploy-demo-to-pavlovia.sh https://gitlab.pavlovia.org/<user>/<project>.git
#
# You will be asked for your Pavlovia (GitLab) username and password/token.

set -euo pipefail

REMOTE="${1:-}"
if [[ -z "$REMOTE" ]]; then
  echo "usage: $0 https://gitlab.pavlovia.org/<user>/<project>.git" >&2
  exit 1
fi

if [[ "$REMOTE" != *pavlovia.org* ]]; then
  echo "error: that does not look like a Pavlovia remote - refusing" >&2
  exit 1
fi

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

echo "staging from : $SRC"
echo "deploying to : $REMOTE"
echo

# Everything except version control, participant data, and these helper scripts.
rsync -a \
  --exclude='.git/' \
  --exclude='data/' \
  --exclude='.DS_Store' \
  --exclude='*.sh' \
  --exclude='RALT_PLD_legacy.psyexp' \
  "$SRC"/ "$STAGE"/

cd "$STAGE"

# Pavlovia serves results into data/; give it somewhere to write.
mkdir -p data && touch data/.gitkeep

cat > .gitignore <<'EOF'
.DS_Store
__pycache__/
EOF

git init -q -b master
git add -A
git -c user.email="deploy@localhost" -c user.name="deploy" \
    commit -q -m "Social learning task - demo build

Instructions rewritten (cover story removed); participant and group default to
'test' so the task can be clicked through without entering anything."

echo "files to be deployed: $(git ls-files | wc -l | tr -d ' ')"
echo

git remote add origin "$REMOTE"
git push -u origin master --force

echo
echo "Pushed. Now in the Pavlovia dashboard:"
echo "  1. open the project"
echo "  2. set its status to PILOTING  (free; RUNNING consumes credits)"
echo "  3. the run URL is shown there, of the form:"
echo "       https://run.pavlovia.org/<user>/<project>"
echo
echo "Share that link. participant and group are pre-filled with 'test',"
echo "so she only has to press OK."
