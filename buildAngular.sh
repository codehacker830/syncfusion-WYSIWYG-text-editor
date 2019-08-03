#!/usr/bin/env bash
cd public/
rm *.js
rm *.css
rm *.ico
cd ..
cd resources/views/
rm index.html
cd ../../Angular/
rm -rf dist/
# ng build
ng build --prod
# ng build --prod --aot
cd dist/frontend/
cp *.js ../../../public/
cp *.css ../../../public/
cp *.ico ../../../public/
cp index.html ../../../resources/views/