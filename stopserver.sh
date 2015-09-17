#!/bin/bash

pid=$(ps aux | pgrep -f app.js)

kill -2 $pid
