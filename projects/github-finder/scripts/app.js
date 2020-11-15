const github = new GitHub();
const ui = new UI();

const searchUser = document.querySelector("#search-user");

searchUser.addEventListener("keyup", (e) => {
  const userText = e.target.value;

  if (userText !== "") {
    github.getUser(userText).then((data) => {
      console.log(data);
      if (data.profile.message === "Not Found") {
        ui.showAlert("User not found", "alert alert-danger");
      } else {
        ui.showProfile(data.profile);
      }
    });
  } else {
    ui.clearProfile();
  }
});
