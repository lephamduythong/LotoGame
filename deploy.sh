#!/bin/expect

set timeout 60

cd frontend

spawn npm run build:prod

expect eof

spawn bash

expect "$"

send "cp -R ./assets ./dist; echo DONE"

expect -nocase "DONE"

send "exit\r"

cd dist

spawn surge --domain http://thonglee.surge.sh

expect -nocase "project:"

send "\r"

expect eof