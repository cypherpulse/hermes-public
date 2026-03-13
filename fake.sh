#!/usr/bin/env bash
# =============================================================
# fake-commits.sh
#
# Pushes N fake commits with NO real file changes.
# Uses --allow-empty so git doesn't need a diff at all.
# Safe to run up to 10,000+ commits in one go.
# =============================================================

set -euo pipefail

# ────────────────────────────────────────────────
# Colors
# ────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BLUE='\033[0;34m'
NC='\033[0m'

# ────────────────────────────────────────────────
# Commit message pool (realistic, varied)
# ────────────────────────────────────────────────
MESSAGES=(
    "feat: initialize DualPay smart contracts"
    "docs: add setup instructions for DualPay"
    "feat: implement dual-pay-market contract"
    "fix: resolve token transfer bug in sbtc-token"
    "feat: add support for multi-token payments"
    "refactor: optimize contract storage usage"
    "feat: integrate Clarity testing framework"
    "test: add test cases for dual-pay-market"
    "feat: implement token staking feature"
    "fix: correct rounding errors in payment logic"
    "feat: add support for recurring payments"
    "chore: update dependencies for Clarity tools"
    "docs: explain contract deployment process"
    "fix: handle edge cases in token transfers"
    "style: improve readability of contract code"
    "feat: add error handling for payment failures"
    "refactor: modularize contract functions"
    "chore: add .gitignore for Clarity artifacts"
    "docs: add contributors section to README"
    "test: verify multi-token payment scenarios"
    "chore: update Clarinet configuration files"
    "refactor: improve function naming consistency"
    "feat: add support for testnet deployment"
    "feat: implement fee distribution mechanism"
    "fix: resolve overflow issue in staking logic"
    "docs: add API documentation for contracts"
    "feat: create utility functions for token math"
    "test: add edge cases for staking logic"
    "style: align comments with coding standards"
    "chore: clean up unused contract variables"
    "feat: add support for token burning"
    "docs: clarify usage of Clarity keywords"
    "refactor: optimize gas usage in contracts"
    "test: benchmark contract execution times"
    "chore: bump Clarity version in dependencies"
    "feat: implement advanced payment routing"
    "fix: resolve timeout issue in payment flow"
    "docs: add troubleshooting guide for devnet"
    "style: align formatting in Clarity contracts"
    "refactor: rename variables for better clarity"
    "test: validate contract behavior on testnet"
    "chore: remove debug print statements"
    "feat: add support for token whitelisting"
    "docs: update README with testnet details"
    "fix: handle invalid inputs in payment logic"
    "feat: allow dynamic fee adjustments"
    "refactor: split large functions into smaller ones"
    "test: add performance tests for payment flow"
    "chore: standardize code comments"
    "refactor: improve documentation for clarity"
    
)

TOTAL_MSGS=${#MESSAGES[@]}

# ────────────────────────────────────────────────
# Input: number of commits
# ────────────────────────────────────────────────
echo -e "${CYAN}╔══════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║        fake-commits.sh — empty mode      ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════╝${NC}"
echo ""

read -p "$(echo -e ${YELLOW}How many fake commits? [1-10000, default: 10]: ${NC})" COUNT
COUNT="${COUNT:-10}"

if ! [[ "$COUNT" =~ ^[0-9]+$ ]] || [[ "$COUNT" -lt 1 ]] || [[ "$COUNT" -gt 10000 ]]; then
    echo -e "${RED}Please enter a number between 1 and 10000.${NC}"
    exit 1
fi

# Push every N commits to avoid one giant push timing out on large runs
PUSH_BATCH=100

echo ""
echo -e "${YELLOW}→ Will create ${COUNT} empty commit(s) with zero file changes${NC}"
echo -e "${YELLOW}→ Pushing every ${PUSH_BATCH} commits to avoid timeouts${NC}"
echo ""
read -p "$(echo -e ${YELLOW}Proceed? \(y/N\): ${NC})" -r confirm
echo

if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo -e "${RED}Aborted.${NC}"
    exit 1
fi

# ────────────────────────────────────────────────
# Create empty commits
# ────────────────────────────────────────────────
echo -e "${BLUE}Starting...${NC}"
echo ""

START_TIME=$SECONDS

for ((i = 1; i <= COUNT; i++)); do
    MSG_INDEX=$(( (i - 1) % TOTAL_MSGS ))
    COMMIT_MSG="${MESSAGES[$MSG_INDEX]}"

    # --allow-empty = commit with absolutely zero file changes
    git commit --allow-empty -m "$COMMIT_MSG" --quiet

    # Progress indicator — print every 50 commits (not every one, too noisy for 10k)
    if (( i % 50 == 0 )) || (( i == COUNT )); then
        PCT=$(( i * 100 / COUNT ))
        ELAPSED=$(( SECONDS - START_TIME ))
        echo -e "  ${GREEN}[${i}/${COUNT}]${NC} ${PCT}% — ${ELAPSED}s elapsed"
    fi

    # Mid-run push every PUSH_BATCH commits
    if (( i % PUSH_BATCH == 0 )) && (( i < COUNT )); then
        echo -e "  ${CYAN}↑ Pushing batch at commit ${i}...${NC}"
        git push --set-upstream origin main 2>/dev/null || git push origin main
    fi
done

# ────────────────────────────────────────────────
# Final push
# ────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}↑ Final push to origin main...${NC}"
git push --set-upstream origin main 2>/dev/null || git push origin main

TOTAL_TIME=$(( SECONDS - START_TIME ))
echo ""
echo -e "${GREEN}✓ Done! ${COUNT} fake empty commit(s) pushed in ${TOTAL_TIME}s — repo files untouched.${NC}"
echo ""
echo -e "${CYAN}Tip: run  git log --oneline -20  to see your new commits.${NC}"