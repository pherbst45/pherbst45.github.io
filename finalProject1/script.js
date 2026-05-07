function checkServer() {
  const server = document.getElementById("serverInput").value.trim();
  const result = document.getElementById("result");

  if (!server) {
    result.innerHTML = "<p class='text-warning'>Please enter a server IP</p>";
    return;
  }

  result.innerHTML = "<p>Loading...</p>";
//will fetch the data from the api and display it in a card format

  fetch(`https://api.mcsrvstat.us/2/${server}`)
    .then(res => res.json())
    .then(data => {
//allows us to check if the server is online or offline and display the appropriate message

      if (!data.online) {
        result.innerHTML = "<h4 class='text-danger'>❌ Server Offline</h4>";
        return;
      }
//if the server is online, it will display the server information in a card format

      result.innerHTML = `
        <div class="card bg-secondary p-4 mx-auto" style="max-width:400px;">
          <h3>${data.hostname}</h3>
          <p>🟢 Online</p>
          <p><strong>Players:</strong> ${data.players.online}/${data.players.max}</p>
          <p><strong>Version:</strong> ${data.version}</p>



          <a href="details.html?server=${server}" class="btn btn-success mt-3">
            View Full Details
          </a>
        </div>
      `;
    })
    .catch(() => {
      result.innerHTML = "<p class='text-danger'>Error fetching data</p>";
    });
}