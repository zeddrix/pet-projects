class UI {
  constructor() {
    this.profile = document.querySelector("#profile");
  }

  showProfile(user) {
    console.log("user", user);
    this.profile.innerHTML = `
      <div class="card card-body mb-3">
         <div class="row">
            <div class="col-md-3">
               <img src="${user.avatar_url}" class="img-fluid mb-2">
               <a href="${user.html_url}" target="_blank_" class="btn btn-primary btn-block mb-4">View Profile</a>
            </div>
            <div class="col-md-9">
               <span class="badge badge-primary"><strong>Public Repos: </strong>${user.public_repos}</span>
               <span class="badge badge-secondary"><strong>Public Gists: </strong>${user.public_gists}</span>
               <span class="badge badge-success"><strong>Followers: </strong>${user.followers}</span>
               <span class="badge badge-info"><strong>Following: </strong>${user.following}</span>
               <br><br>
               <ul class="list-group">
                  <li class="list-group-item"><strong>Full Name: </strong>${user.name}</li>
                  <li class="list-group-item"><strong>Company: </strong>${user.company}</li>
                  <li class="list-group-item"><strong>Website/Blog: </strong><a href="${user.blog}" target="_blank_">${user.blog}</li></a>
                  <li class="list-group-item"><strong>Location: </strong>${user.location}</li>
                  <li class="list-group-item"><strong>Member Since: </strong>${user.created_at}</li>
               </ul>
            </div>
         </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div id="repos"></div>
   `;
  }

  showRepos(repos) {
    let output = "";

    repos.forEach((repo) => {
      output += `
      <div class="card card-body mb-2">
         <div class="row">
            <div class="col-md-6">
               <a href="${repo.html_url}" target="_blank_">${repo.name}</a>
            </div>
            <div class="col-md-6">
               <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
               <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
               <span class="badge badge-success">Forks: ${repo.forks_count}</span>
            </div>
         </div>
      </div>
      `;
    });

    document.querySelector("#repos").innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();
    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector("#search-container");
    const search = document.querySelector("#search");
    container.insertBefore(div, search);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearProfile() {
    this.profile.innerHTML = "";
  }
}
