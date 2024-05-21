#!/bin/bash

cd "$(dirname "$0")"

python3 -m http.server &

sleep 3

open "http://localhost:8000/LMS.html"

exit 0