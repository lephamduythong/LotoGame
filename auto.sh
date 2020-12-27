cd frontend
npm run build:prod
cd ..
rm -R ./mobile/www/*
cp -R ./frontend/dist/* ./mobile/www/
cp -R ./frontend/assets ./mobile/www
sleep 0.5
cd mobile
cordova run android --device
echo "DONE"