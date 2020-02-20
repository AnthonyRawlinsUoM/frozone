#!/usr/bin/env bash

npm run-script build
docker build -t anthonyrawlinsuom/frozone .
