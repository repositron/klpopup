#!/bin/bash
cp typescript/*.ts bin/
google-chrome --load-extension=bin/ test/test1.html