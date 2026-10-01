const OWNER = "Ro-Kamath";
const REPO  = "ProjectAviation";
const PAT   = "YOUR_PAT";   // fine‑grained, this repo only, repository_dispatch:write

const modal     = document.getElementById("modal");
const openBtn   = document.getElementById("open-modal");
const closeBtn  = document.getElementById("close-modal");
const form      = document.getElementById("signup-form");
const status    = document.getElementById("status");

openBtn.onclick  = () => { modal.hidden = false; };
closeBtn.onclick = () => { modal.hidden = true; };
modal.onclick    = (e) => { if (e.target === modal) modal.hidden = true; };

form.onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  status.textContent = "Saving…";

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/dispatches`,
    {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${PAT}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ event_type: "new-signup", client_payload: { email } }),
    }
  );

  if (res.status === 204) {
    status.textContent = "🎉 You're on the list!";
    form.reset();
    setTimeout(() => (modal.hidden = true), 1500);
  } else {
    status.textContent = "Something went wrong — try again.";
  }
};   
