let btn = document.querySelector(".btn-record");

btn.addEventListener("click", async function () {
  let stream = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: true
  });

  const mime = MediaRecorder.isTypeSupported("video/webm; codesc=vp9") ? "video/webm; codesc=vp9" : "video/webm"

  let mediaRecorder = new MediaRecorder(stream, {
    mimeType: mime
  });

  let chunk = [];
  mediaRecorder.addEventListener("dataavailable", function (e) {
    chunk.push(e.data);
  });

  mediaRecorder.addEventListener("stop", function () {
    let blob = new Blob(chunk, {
      type: chunk[0].type
    })

    let url = URL.createObjectURL(blob);

    let video = document.querySelector("video");
    video.src = url;

    let a = document.createElement("a");
    a.href = url;
    a.download = "video.webm";
    a.click();
  });

  mediaRecorder.start();
});