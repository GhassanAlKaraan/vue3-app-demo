# Vue3 App Demo

As a real-life project, start by creating a **login page**, a **home page** with a restful API, and store your token in local storage or cookies. Create roles for admin and user so that the admin has access to the entire system while the user’s access is limited. On the home page, implement a CRUD system using a table fetching data from the API. Make the table sortable and implement pagination via the API. For the search bar above the table, utilize something called infinite scroll down and a button for searching.

We’re incorporating sorting, pagination, and infinite scroll down because these are what big companies (websites) use to reduce the heavy load on servers, make the browser faster, and enhance the client’s experience, thus making the server more efficient.

## Project setup

Run the below then follow the prompts.

```bash
npm create vue@latest
```

## Dummy Json server

Create a data.json with the dummy data, then:

```bash
npm install -g json-server
```

```bash
npx json-server --watch data.json --port 5000
```

or add the script to package.json (without the 'npx' part) then

```bash
npm run server
```

## Toast

```bash
npm install --save vue-toastification@next
```

Add the following to main.js:

```javascript
import "vue-toastification/dist/index.css";
import Toast from 'vue-toastification';
app.use(Toast);
```

## Spinner

```bash
npm install vue-spinner
```
