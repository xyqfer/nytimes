vue-cli-service lint --fix
vue-cli-service build --modern
cd ../youpin
git checkout dev-poliwag
rm -r public/poliwag/*
cp -r ../nytimes/dist/* public/poliwag