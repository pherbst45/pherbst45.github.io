const params = new URLSearchParams(window.location.search);
const server = params.get("server");

const container = document.getElementById("details");

if (!server) {
  container.innerHTML = "<p>No server specified</p>";
} else {
  fetch(`https://api.mcsrvstat.us/3/${server}`)
    .then(res => res.json())
    .then(data => {

      if (!data.online) {
        container.innerHTML = "<h4 class='text-danger'>Server Offline</h4>";
        return;
      }

      const players = data.players.list
        ? data.players.list.join(", ")
        : "Not available";

      const motd = data.motd.clean
        ? data.motd.clean.join(" ")
        : "No description";

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
    .catch(() => {
      container.innerHTML = "<p>Error loading details</p>";
    });
}