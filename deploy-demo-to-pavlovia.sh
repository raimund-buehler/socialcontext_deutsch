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
#   ./deploy-demo-to-pavlovia.sh https://gitlab.pavlovia.org/<user>/<project>.git [branch]
#
# Branch defaults to main. Check the project's default branch on Pavlovia first -
# it serves from that branch, so pushing to the wrong one deploys nothing.
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
STAGE_CONTENT="$(mktemp -d)"
trap 'rm -rf "$STAGE" "$STAGE_CONTENT"' EXIT

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
  --exclude='lib/' \
  "$SRC"/ "$STAGE_CONTENT"/

cd "$STAGE"

# lib/ is deliberately excluded: Pavlovia symlinks its own PsychoJS library in
# at that path, and refuses to activate the project if a lib directory already
# exists ("unable to link the PsychoJS library"). index.html references
# ./lib/psychojs-<version>.*, which Pavlovia's symlink provides.

# Pavlovia serves results into data/; give it somewhere to write.
mkdir -p "$STAGE_CONTENT/data" && touch "$STAGE_CONTENT/data/.gitkeep"

cat > "$STAGE_CONTENT/.gitignore" <<'EOF'
.DS_Store
__pycache__/
EOF

BRANCH="${2:-main}"
BASE="${3:-}"

# Build ON TOP of the history the remote already has. Pavlovia keeps its own
# server-side clone and runs `git pull` when you activate the project; if the
# remote history is replaced with an unrelated one, that pull fails with
# "refusing to merge unrelated histories" and the project cannot be activated.
git init -q -b "$BRANCH"
git remote add origin "$REMOTE"

if [[ -n "$BASE" ]]; then
  echo "basing on commit $BASE"
  git fetch -q origin "$BASE"
  git reset -q --hard FETCH_HEAD
elif git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
  echo "basing on existing origin/$BRANCH"
  git fetch -q origin "$BRANCH"
  git reset -q --hard FETCH_HEAD
else
  echo "remote branch is empty - starting a new history"
fi

# Replace the tracked tree with the staged content, keeping history intact.
git ls-files -z | xargs -0 -r rm -f 2>/dev/null || true
rsync -a --exclude='.git/' "$STAGE_CONTENT"/ ./
git add -A
git -c user.email="deploy@localhost" -c user.name="deploy" \
    commit -q -m "Social learning task - demo build

Instructions rewritten (cover story removed); participant and group default to
'test' so the task can be clicked through without entering anything." || echo "nothing to commit"

echo "files to be deployed: $(git ls-files | wc -l | tr -d ' ')"
echo

git push -u origin "$BRANCH" || {
  echo
  echo "Push rejected. That means the remote history diverged from what we built on."
  echo "Do NOT force-push: Pavlovia keeps its own clone and will refuse to pull an"
  echo "unrelated history. Delete and recreate the Pavlovia project instead, then"
  echo "run this script once against the fresh project."
  exit 1
}

echo
echo "Pushed. Now in the Pavlovia dashboard:"
echo "  1. open the project"
echo "  2. set its status to PILOTING  (free; RUNNING consumes credits)"
echo "  3. the run URL is shown there, of the form:"
echo "       https://run.pavlovia.org/<user>/<project>"
echo
echo "Share that link. participant and group are pre-filled with 'test',"
echo "so she only has to press OK."
