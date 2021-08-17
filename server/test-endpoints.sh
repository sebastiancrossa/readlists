#!/bin/bash

echo "Testing main page"
code=$(curl -s -o /dev/null -w "%{http_code}" 'http://kuration.tech/')
if (( $code >= 300 && $code <= 599 )); then
    echo "Fail: Error code $code"
else echo "Success"
fi

echo "Testing 'all playlists' page"
code=$(curl -s -o /dev/null -w "%{http_code}" 'http://kuration.tech/allplaylists"')
if (( $code >= 300 && $code <= 599 )); then
    echo "Fail: Error code $code"
else echo "Success"
fi

echo "Testing 'create playlist' page"
code=$(curl -s -o /dev/null -w "%{http_code}" 'http://kuration.tech/createplaylist')
if (( $code >= 300 && $code <= 599 )); then
    echo "Fail: Error code $code"
else echo "Success"
fi

echo "Testing register"
code=$(curl -s -o /dev/null -w "%{http_code}" 'http://kuration.tech/register')
if (( $code >= 300 && $code <= 599 )); then
    echo "Fail: Error code $code"
else echo "Success"
fi

echo "Testing login"
code=$(curl -s -o /dev/null -w "%{http_code}" 'http://kuration.tech/login')
if (( $code >= 300 && $code <= 599 )); then
    echo "Fail: Error code $code"
else echo "Success"
fi

echo "Testing logout"
code=$(curl -s -o /dev/null -w "%{http_code}" 'http://kuration.tech/logout')
if (( $code >= 300 && $code <= 599 )); then
    echo "Fail: Error code $code"
else echo "Success"
fi

echo "Testing Complete"
