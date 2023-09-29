import axios from "axios";
import { animMap } from "../common/maps";
import { getRoomFromPath } from "./utils";
var imagesMap;
var animCounters;
let oldMap = null;

export function updateAnim(map, ctx, top_x, top_y, objectSizes) {
  if (!animMap[map]) {
    return;
  }

  if (!imagesMap || map !== oldMap) {
    imagesMap = [];
    animCounters = [];
    animMap[map].forEach((animation) => {
      let tempFrames = [];
      animation.frames.forEach((frame) => {
        let tempFrame = new Image();
        tempFrame.src = frame;
        tempFrame.id = animation?.name;
        tempFrames.push(tempFrame);
      });
      imagesMap.push(tempFrames);
      animCounters.push(0);
    });
  }

  imagesMap.forEach((frames, idx) => {
    let animation = animMap[map][idx];
    ctx.drawImage(
      frames[Math.floor(animCounters[idx] / animation.frameGap)],
      objectSizes * animation.pos[1] - top_x,
      objectSizes * animation.pos[0] - top_y
    );

    animCounters[idx] =
      (animCounters[idx] + 1) % (animation.frameGap * frames.length);
  });

  oldMap = map;
}

export const listenerIdObject = (map, top_x, top_y, objectSizes) => {
  let isImageClicked = false;

  const canvas = document.getElementById("canvas");
  const handleClick = async (event) => {
    if (isImageClicked) {
      return; // Return early if an image has already been clicked
    }

    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;

    for (let idx = 0; idx < imagesMap.length; idx++) {
      let animation = animMap[map][idx];
      const imageX = objectSizes * animation.pos[1] - top_x;
      const imageY = objectSizes * animation.pos[0] - top_y;

      for (
        let frameIndex = 0;
        frameIndex < imagesMap[idx].length;
        frameIndex++
      ) {
        const frame = imagesMap[idx][frameIndex];
        const frameWidth = frame.width;
        const frameHeight = frame.height;

        if (
          clickX >= imageX &&
          clickX <= imageX + frameWidth &&
          clickY >= imageY &&
          clickY <= imageY + frameHeight
        ) {
          isImageClicked = true; // Set the flag to true when an image is clicked
          // read('rooms', getRoomFromPath())
          const res = await axios.get(
            window.location.origin + "/zoom_url/" + getRoomFromPath()
          );

          if (res?.data) {
            // window.open(res?.data?.zoomUrl, "_blank");
            let zoomIframe = document.getElementById("iframe-zoom");
            zoomIframe.src = res?.data?.zoomUrl;
            zoomIframe.style.display = "block";
          }

          console.warn(getRoomFromPath());
          canvas.removeEventListener("click", handleClick);
          break; // Break out of the inner loop when an image is clicked
        }
      }

      if (isImageClicked) {
        break; // Break out of the outer loop when an image is clicked
      }
    }
  };

  canvas.addEventListener("click", handleClick);

  canvas.addEventListener("mousemove", (event) => {
    const hoverX = event.clientX - canvas.getBoundingClientRect().left;
    const hoverY = event.clientY - canvas.getBoundingClientRect().top;

    let isHovering = false; // Flag to track whether the mouse is hovering over any image

    imagesMap.forEach((frames, idx) => {
      let animation = animMap[map][idx];
      const imageX = objectSizes * animation.pos[1] - top_x;
      const imageY = objectSizes * animation.pos[0] - top_y;

      frames.forEach((frame) => {
        const frameWidth = frame.width;
        const frameHeight = frame.height;
        // Add a red border to the image

        if (
          hoverX >= imageX &&
          hoverX <= imageX + frameWidth &&
          hoverY >= imageY &&
          hoverY <= imageY + frameHeight
        ) {
          // const ctx = canvas.getContext('2d');
          // ctx.strokeStyle = 'red';
          // ctx.lineWidth = 3;

          // // Define the coordinates and dimensions of the rectangle
          // const rectX = hoverX;
          // const rectY = hoverY;
          // const rectWidth = frameWidth;
          // const rectHeight = frameHeight;

          // // Draw the rectangle
          // ctx.beginPath();
          // ctx.rect(rectX, rectY, rectWidth, rectHeight);
          // ctx.stroke(); // Outline the rectangle with the red border
          // ctx.closePath();
          canvas.style.cursor = "pointer"; // Change cursor to pointer

          isHovering = true; // Set the flag to true when hovering over an image
        } else {
          // frame.style.border = 'none'; // Remove the border from other images
        }
      });
    });

    if (!isHovering) {
      canvas.style.cursor = "default"; // Restore the default cursor style when not hovering over any image
    }
  });
};
