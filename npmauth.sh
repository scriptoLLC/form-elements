#!/bin/bash
set -o nounset
set -o errexit

npm login <<!
$NPM_USER
$NPM_PASS
$NPM_EMAIL
!
