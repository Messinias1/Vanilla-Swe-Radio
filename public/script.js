// const playStations = async () => {
//   const response = await fetch(
//     "http://api.sr.se/api/v2/channels/?format=json&indent=true&size=60"
//   );

//   const myJson = await response.json();
//   const container = document.getElementById("card");
//   // Clear previous content
//   container.innerHTML = "";
//   myJson.channels.forEach((channel) => {
//     // Create a new img element
//     let img = document.createElement("img");
//     img.src = channel.image;
//     img.alt = `Image for ${channel.name}`;
//     img.id = "radio-img";
//     img.style.width = "15%";

//     let audio = new Audio(channel.liveaudio.url);
//     // Toggle play/pause on click
// img.addEventListener("click", function () {
//   if (audio.paused) {
//     // Stop all other audios playing
//     document.querySelectorAll("audio").forEach((el) => el.pause());
//     audio.play();
//   } else {
//     audio.pause();
//   }
// });

//     // Append the new img element to the container
//     container.appendChild(img);

//     // Log the live audio URL to the console
//     console.log(channel);
//   });
//   console.log(audio);
//   console.log("hi");
// };

// playStations();

const playStations = async () => {
  const response = await fetch(
    "http://api.sr.se/api/v2/channels/?format=json&indent=true&size=60"
  );

  const myJson = await response.json();
  const container = document.getElementById("card");
  // Clear previous content
  container.innerHTML = "";

  // Create play bar container at the bottom of the screen
  const playBar = document.createElement("div");
  playBar.id = "play-bar";
  playBar.style.position = "fixed";
  playBar.style.bottom = "0";
  playBar.style.left = "0";
  playBar.style.width = "100%";
  playBar.style.backgroundColor = "#333";
  playBar.style.color = "#fff";
  playBar.style.display = "flex";
  playBar.style.justifyContent = "center";
  playBar.style.alignItems = "center";
  playBar.style.padding = "10px";
  document.body.appendChild(playBar);

  // Create play/pause button
  const playPauseBtn = document.createElement("button");
  playPauseBtn.innerText = "Play/Pause";
  playPauseBtn.borderRadius = "25px";
  playBar.appendChild(playPauseBtn);

  // Create label for the channel name
  const channelName = document.createElement("span");
  channelName.style.marginLeft = "20px";
  playBar.appendChild(channelName);

  let currentAudio = new Audio();

  myJson.channels.forEach((channel) => {
    // Create a new img element
    let img = document.createElement("img");
    img.src = channel.image;
    img.alt = `Image for ${channel.name}`;
    img.id = "radio-img";
    img.style.width = "15%";

    img.addEventListener("click", function () {
      // Stop the currently playing audio
      if (!currentAudio.paused) {
        currentAudio.pause();
      }

      img.addEventListener("click", function () {
        if (currentAudio.paused) {
          // Stop all other audios playing
          document.querySelectorAll("audio").forEach((el) => el.pause());
          currentAudio.play();
        } else {
          currentAudio.pause();
        }
      });

      // Update the source and play the new audio
      currentAudio.src = channel.liveaudio.url;
      currentAudio.play();

      // Update the play bar with the current channel's name
      channelName.textContent = channel.name;

      // Show the play bar if it's not already visible
      playBar.style.visibility = "visible";
    });

    // Append the new img element to the container
    container.appendChild(img);
  });

  // Toggle play/pause with the play bar button
  playPauseBtn.addEventListener("click", function () {
    if (currentAudio.paused) {
      currentAudio.play();
    } else {
      currentAudio.pause();
    }
  });
};

playStations();
