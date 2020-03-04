#!/usr/bin/env bash
npm version patch
npm run-script build
docker build -t anthonyrawlinsuom/frozone .
