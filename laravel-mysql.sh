#!/bin/bash

/Applications/MAMP/bin/startMysql.sh
trap /Applications/MAMP/bin/stopMysql.sh INT
php artisan serve
