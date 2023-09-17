const CLASS_PLAYBACKRATE_LISTITEM_VISIBLE = " vjs-playback-rate-visible";

const QUERY_ALERT = ".alert.alert-message.alert-danger";
const QUERY_PLAYBACKRATE = ".vjs-playback-rate";
const QUERY_PLAYBACKRATE_BUTTON = "button.vjs-playback-rate.vjs-menu-button";
const QUERY_PLAYBACKRATE_LISTITEM =
  ".vjs-playback-rate.vjs-menu-button .vjs-menu-content > *";
const QUERY_PLAYBACKRATE_VALUE_TEXT = ".vjs-menu-item-text";
const QUERY_PLAYBACKRATE_VALUE = ".vjs-playback-rate-value";

const REGEX_PLAYBACKRATE_LISTITEM_VISIBLE = / vjs-playback-rate-visible/g;

const PLAYBACKRATE_TIME_INTERVAL = 50;

class PlaybackRateLocalStorageController {
  KEY_PLAYBACK_RATE = "playbackRate";

  constructor() {}

  setPlaybackRate(value) {
    localStorage.setItem(this.KEY_PLAYBACK_RATE, value);
  }

  getPlaybackRate() {
    return localStorage.getItem(this.KEY_PLAYBACK_RATE);
  }
}

const playbackRateLocalStorageController =
  new PlaybackRateLocalStorageController();

let videoEl = undefined;

window.onload = () => {
  if (isEnableToChangePlaybackRate()) {
    replacePlaybackRateElement();
  }
};

const isEnableToChangePlaybackRate = () => {
  return document.querySelector(QUERY_PLAYBACKRATE_BUTTON) !== undefined;
};

const replacePlaybackRateElement = () => {
  videoEl = document.querySelector("video");
  addEventListenerToVideoElement();
}

const addEventListenerToVideoElement = () => {
  videoEl.addEventListener("canplaythrough", () => {
    removeControllerElement();
    createControllerElement();
    addEventListenerToControllerElements();

    playbackRateLocalStorageController.setPlaybackRate(1.0);
  });
}

removeControllerElement= ()=> {
  const e = document.querySelector(QUERY_PLAYBACKRATE);
  if (e !== null) {
    console.dir(e);
    e.parentElement.removeChild(e);
  }
}

createControllerElement = () => {
  const controllerEl = document.createElement("div");

  let html = `<div class="vjs-playback-rate-value" id="vjs-playback-rate-value-label-my-video_component_222">1x</div><button class="vjs-playback-rate vjs-menu-button vjs-menu-button-popup vjs-button" type="button" aria-disabled="false" title="Playback Rate" aria-haspopup="true" aria-expanded="false" aria-describedby="vjs-playback-rate-value-label-my-video_component_222"><span class="vjs-icon-placeholder" aria-hidden="true"></span><span class="vjs-control-text" aria-live="polite">Playback Rate</span></button><div class="vjs-menu"><ul class="vjs-menu-content" role="menu">`;
  const playbackRateList = [
    0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9,
    2.0,
  ];
  playbackRateList.reverse().forEach((playbackRate) => {
    html += `<li class="vjs-menu-item" tabindex="-1" role="menuitemradio" aria-disabled="false" aria-checked="false"><span class="vjs-menu-item-text">${playbackRate}x</span><span class="vjs-control-text" aria-live="polite"></span></li>`;
  });
  html += `</ul></div>`;
  controllerEl.innerHTML = html;

  const classNameList = [
    "vjs-playback-rate",
    "vjs-menu-button",
    "vjs-menu-button-popup",
    "vjs-control",
    "vjs-button",
  ];
  classNameList.forEach((className) => controllerEl.classList.add(className));

  const spacerEl = document.querySelector(
    ".vjs-custom-control-spacer.vjs-spacer"
  );
  spacerEl.after(controllerEl);
}

addEventListenerToControllerElements = () => {
  addEventListenerToMenuButton();
  addEventListenerToPlaybackRateListItems();
}

const addEventListenerToMenuButton = () => {
  const buttonEl = document.querySelector(QUERY_PLAYBACKRATE_BUTTON);

  buttonEl.addEventListener("click", (event) => {
    togglePlaybackRateList();
  });
};

const togglePlaybackRateList = () => {
  const playbackRateElement = document.querySelector(QUERY_PLAYBACKRATE);
  const isVisible = playbackRateElement.classList.contains(
    CLASS_PLAYBACKRATE_LISTITEM_VISIBLE.trim()
  );

  if (isVisible) {
    hidePlaybackRateListElement();
  } else {
    showPlaybackRateListElement();
  }
};

const showPlaybackRateListElement = () => {
  const element = document.querySelector(QUERY_PLAYBACKRATE);
  const newClassName =
    element.getAttribute("class") + CLASS_PLAYBACKRATE_LISTITEM_VISIBLE;
  element.setAttribute("class", newClassName);
};

const hidePlaybackRateListElement = () => {
  const element = document.querySelector(QUERY_PLAYBACKRATE);
  const newClassName = element
    .getAttribute("class")
    .replace(REGEX_PLAYBACKRATE_LISTITEM_VISIBLE, "");
  element.setAttribute("class", newClassName);
};

const addEventListenerToPlaybackRateListItems = () => {
  const playbackRateListItemElements = document.querySelectorAll(
    QUERY_PLAYBACKRATE_LISTITEM
  );

  for (let i = 0; i < playbackRateListItemElements.length; i++) {
    const child = playbackRateListItemElements[i];
    child.addEventListener("click", (event) => {
      const playbackRate = child
        .querySelector(QUERY_PLAYBACKRATE_VALUE_TEXT)
        .textContent.slice(0, -1);
      playbackRateLocalStorageController.setPlaybackRate(playbackRate);

      hidePlaybackRateListElement();
    });
  }
};

const updatePlaybackRateValueElement = () => {
  const playbackRateValueElement = document.querySelector(
    QUERY_PLAYBACKRATE_VALUE
  );
  playbackRateValueElement.textContent = `${playbackRateLocalStorageController.getPlaybackRate()}x`;
};

const removeAllAlertMessageElement = () => {
  const alertMessageElements = document.querySelectorAll(QUERY_ALERT);
  alertMessageElements.forEach((e) => e.parentElement.removeChild(e));
};

// Disabled by ecampus policy
//
// const run = () => {
//   setInterval(() => {
//     videoEl.playbackRate =
//       playbackRateLocalStorageController.getPlaybackRate();

//     updatePlaybackRateValueElement();
//     removeAllAlertMessageElement();
//   }, PLAYBACKRATE_TIME_INTERVAL);
// }
