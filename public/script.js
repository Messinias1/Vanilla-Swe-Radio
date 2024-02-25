const playStations = async () => {
  const response = await fetch(
    "http://api.sr.se/api/v2/channels/?format=json&indent=true&size=60"
  );

  const myJson = await response.json();
  //   let audio = new Audio(myJson.data.channels);
  console.log(myJson.channels[0]);
  const container = document.getElementById("card");
  // Clear previous content
  container.innerHTML = "";
  myJson.channels.forEach((channel) => {
    // Create a new img element
    let img = document.createElement("img");
    img.src = channel.image;
    img.alt = `Image for ${channel.name}`;
    img.id = "radio-img";

    // Optional: Set image width or add classes for styling
    img.style.width = "15%"; // Example width, adjust as needed

    // Append the new img element to the container
    container.appendChild(img);

    // Log the live audio URL to the console
    console.log(channel.liveaudio.url);
    let audio = new Audio(channel.liveaudio.url);
    audio.play(document.getElementById("radio-img"));
  });
  console.log(audio);
};

playStations();
