import { audioMap } from '../common/maps';
import toast, { Toaster } from 'react-hot-toast';
let oldMap;
let currentDist = 0
function getDistance(myPlayer, posX, posY) {
  let xs = myPlayer.position.x - posX;
  let ys = myPlayer.position.y - posY;
  xs *= xs;
  ys *= ys;
  return Math.sqrt(xs + ys);
}

export function updateSound(myPlayer) {
  if (!myPlayer) {
    return;
  }

  if (oldMap !== myPlayer.currentMap) {
    // Clear audio from the old map
    let audioEls = document.getElementsByTagName("audio");
    for (let i = audioEls.length - 1; i >= 0; i--) {
      document.body.removeChild(audioEls[i]);
    }
    oldMap = myPlayer.currentMap;
  }

  let backgroundAudios = audioMap[myPlayer.currentMap];
  if (backgroundAudios) {
    backgroundAudios.forEach(bgAudio => {
      let dist = getDistance(myPlayer, bgAudio.pos[1], bgAudio.pos[0]);
      if (currentDist !== dist && dist === 1) {
        currentDist = dist
        toast(`<form class="w-[500px]">
  <div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
  </div>
  <div class="flex items-start mb-6">
    <div class="flex items-center h-5">
      <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required>
    </div>
    <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>`)
      } else {
        currentDist = dist
      }
      let audioEl = document.getElementById("audio-" + bgAudio.id);
      if (Math.ceil(dist) < bgAudio.volume.length) {
        if (audioEl) {
          audioEl.volume = bgAudio.volume[Math.ceil(dist)];
        } else {
          audioEl = document.createElement("audio");
          audioEl.id = "audio-" + bgAudio.id;
          audioEl.src = bgAudio.path;
          audioEl.volume = bgAudio.volume[Math.ceil(dist)];
          audioEl.loop = true;
          audioEl.play();
          document.body.appendChild(audioEl);
        }
      } else {
        if (audioEl) {
          document.body.removeChild(audioEl);
        }
      }
    });
  }
}