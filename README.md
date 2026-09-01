## About the app

Star Wars Search is a catalog for characters, species, planets, starships, vehicles, and films. You type a name and get matches (or a no-results screen). The last query comes back after a reload.

Data comes from [swapi.info](https://swapi.info). The app loads all six categories once, adds a description to each item, and caches the catalog in `localStorage`. After that, search is a local filter — no request per query.

HTTP errors show a toast. A failed fetch, a changed API shape, and an unexpected crash each have their own screen.

## Screens

<details>
<summary>Loading screen</summary>

![Loading screen](docs/images/loading-screen.gif)

</details>

<details>
<summary>All results</summary>

![All results](docs/images/all-resulst.png)

</details>

<details>
<summary>Found results</summary>

![Found results](docs/images/found-results.png)

</details>

<details>
<summary>No results</summary>

![No results](docs/images/no-results.png)

</details>

<details>
<summary>Failed to load</summary>

![Failed to load](docs/images/failed-to-load.png)

</details>

<details>
<summary>HTTP error toast (full screen)</summary>

![HTTP error toast, full screen](docs/images/screen-with-toast-http-error.png)

</details>

<details>
<summary>HTTP error toast</summary>

![HTTP error toast](docs/images/toast-with-http-error.png)

</details>

<details>
<summary>API changed</summary>

![API changed](docs/images/api-chaned.png)

</details>

<details>
<summary>Unexpected app crash</summary>

![Error boundary](docs/images/error-boundary.png)

</details>
