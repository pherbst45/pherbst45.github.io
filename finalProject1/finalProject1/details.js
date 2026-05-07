//get the server parameter from the URL and fetch the server details from the API
const params = new URLSearchParams(window.location.search);
const server = params.get("server");

const container = document.getElementById("details");
//checks to see if a valid server was entered
if (!server) {
  container.innerHTML = "<p>No server specified</p>";
} else {
  //calls the API to get the server details and displays them in a card format with more information than the main page
  fetch(`https://api.mcsrvstat.us/3/${server}`)
    .then(res => res.json())
    .then(data => {

      if (!data.online) {
        container.innerHTML = "<h4 class='text-danger'>Server Offline</h4>";
        return;
      }
// gets the player list if it is present and if it is displays it but usually unavailable for most servers
      const players = data.players.list
        ? data.players.list.join(", ")
        : "Not available";

//gets the MOTD and checks if it is present 
      const motd = data.motd.clean
        ? data.motd.clean.join(" ")
        : "No description";

//displays all the server details in a card format with the server icon where applicable
      container.innerHTML = `
        <div class="card bg-secondary p-4 text-center">
          <h2>${data.hostname}</h2>

          ${data.icon ? `<img src="${data.icon}" class="mb-3" width="120">` : ""}

          <p><strong>IP:</strong> ${data.ip}</p>
          <p><strong>Port:</strong> ${data.port}</p>
          <p><strong>Version:</strong> ${data.version}</p>

          <p><strong>Players:</strong> ${data.players.online}/${data.players.max}</p>

          <p><strong>MOTD:</strong> ${motd}</p>
          <p><strong>Player List:</strong> ${players}</p>
        </div>
      `;
    })
  // if there is an error fetching the data, it will display a Loading error message
    .catch(() => {
      container.innerHTML = "<p>Error loading details</p>";
    });
}