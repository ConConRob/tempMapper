##To setup app

```
npm install --prefix backend
npm install --prefix frontend
```

replace <> values with your values

```
echo -n "MONGODB_URI=<connectionString>
DB_NAME=<dbname>" > ./backend/.env.test
```

make sure that your db has the db name

##To run this fullstack app

```
npm start --prefix backend
npm start --prefix frontend
```
