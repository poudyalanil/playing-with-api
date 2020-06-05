// Github username set to user variable
const user = "itsmdsameerkhan";
// Change above username with your github username

async function getInfo(username) {
  let response = await fetch(`https://api.github.com/users/${username}`);
  let data = await response.json();
  return data;
}

async function getRepoInfo(username) {
  let response = await fetch(`https://api.github.com/users/${username}/repos`);
  let data = await response.json();
  return data;
}

getInfo(user).then((data) => {
  document.querySelector(".profile-photo").setAttribute("src", data.avatar_url);
  document.getElementById("name").innerHTML = data.name;

  document.querySelector(
    ".twitter-url"
  ).innerHTML = `@${data.twitter_username}`;

  document
    .querySelector(".twitter-url")
    .setAttribute("href", `https://twitter.com/${data.twitter_username}`);

  document
    .querySelector(".website-url")
    .setAttribute("href", `https://${data.blog}`);

  document.querySelector(".website-url").innerHTML = `&#9872 ${data.blog}`;

  document.querySelector(
    ".follow-info"
  ).innerHTML = `Followed by: ${data.followers} | Following: ${data.following}`;

  // Repositories List Out

  getRepoInfo(user).then((data) => {
    let allRepoArr = data.map((eachRepo) => eachRepo.name);

    allRepoArr.forEach((element) => {
      let node = document.createElement("a");
      let textOfNode = document.createTextNode(`${element}`);
      node.appendChild(textOfNode);
      node.className = "collection-item";
      node.setAttribute("href", `https://github.com/${user}/${element}`);
      document.querySelector(".repo-collection").appendChild(node);
    });

    document.querySelector(
      ".repo-count"
    ).innerHTML = `Total Public Repositories: ${allRepoArr.length}`;
  });

  // End of Repo
});
