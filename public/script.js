const playStations = async () => {
  const response = await fetch(
    "http://api.sr.se/api/v2/channels/?format=json&indent=true&size=60"
  );

  const myJson = await response.json();
  const container = document.getElementById("card");
  // Clear previous content
  container.innerHTML = "";
  myJson.channels.forEach((channel) => {
    // Create a new img element
    let img = document.createElement("img");
    img.src = channel.image;
    img.alt = `Image for ${channel.name}`;
    img.id = "radio-img";
    img.style.width = "15%"; // Example width, adjust as needed

    let audio = new Audio(channel.liveaudio.url);
    // Toggle play/pause on click
    img.addEventListener("click", function () {
      if (audio.paused) {
        // Stop all other audios playing
        document.querySelectorAll("audio").forEach((el) => el.pause());
        audio.play();
      } else {
        audio.pause();
      }
    });

    // Append the new img element to the container
    container.appendChild(img);

    // Log the live audio URL to the console
    console.log(channel.liveaudio.url);
  });
  console.log(audio);
  console.log("hi");
};

playStations();
