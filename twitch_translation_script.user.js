// ==UserScript==
// @name         Twitch.tv chat Translation
// @namespace    Magof - twitch-translation-script
// @version      2.0
// @description  Add a button to the Twitch.tv website that opens a menu to translate messages to the Twitch.tv chat.
// @author       Magof
// @match        https://www.twitch.tv/*
// ==/UserScript==

// Add the Bootstrap link via CDN to the document header
const bootstrapCDN = document.createElement('link');
bootstrapCDN.rel = 'stylesheet';
bootstrapCDN.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
document.head.appendChild(bootstrapCDN);

(function () {
  'use strict';

  // Function called when the button is clicked
  function toggleToolbox() {
    const toolbox = document.getElementById('toolbox');
    if (toolbox) {
      toolbox.classList.toggle('visible');
    }
  }

  function addButton() {
    // Check if the button has already been added
    const existingButton = document.getElementById('toggle-toolbox');
    if (existingButton) {
      return;
    }

    // Create the button
    const newButton = document.createElement('button');
    newButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-translate" viewBox="0 0 16 16"><path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"></path><path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"></path></svg> Translate';
    newButton.classList.add('btn', 'btn-primary');
    newButton.id = 'toggle-toolbox';
    newButton.style.marginRight = '10px'

    // Add the click event to the button
    newButton.addEventListener('click', toggleToolbox);

    // Add the button to the element with the class "chat-input__buttons-container"
    const chatButtonsContainer = document.querySelector('.chat-input__buttons-container');
    if (chatButtonsContainer) {
      chatButtonsContainer.appendChild(newButton);
    }

    // Create the button for instructions
    const instructionsButton = document.createElement('button');
    instructionsButton.textContent = 'Instructions';
    instructionsButton.classList.add('btn', 'btn-secondary', 'me-2');

    // Add the click event to the instructions button
    instructionsButton.addEventListener('click', () => {
      alert(`
        Translated Twitch.tv Chat Instructions:

        1. Click the "Translate" button to open the toolbox.
        2. Use the "Translate Chat in Real Time" checkbox to enable/disable real-time translation.
        3. Select a language from the dropdown to choose the target language for translation.
        4. New messages in the chat will be automatically translated if real-time translation is enabled.
        5. Press the "ESC" key to quickly toggle the visibility of the toolbox.

        Enjoy chatting in different languages on Twitch.tv!
      `);
    });

    // Add the instructions button to the toolbox
    const toolboxContent = document.getElementById('toolbox');
    if (toolboxContent) {
      if (!toolboxContent.querySelector('button')) {
        toolboxContent.appendChild(instructionsButton);
      }
    }

  }

  // Add a keydown event listener to the document
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toggleToolbox();
    }
  });

  // Function to check for changes in the DOM
  function checkDOMChange() {
    addButton();
    setTimeout(checkDOMChange, 1000); // Check again every 1 second
  }

  // Wait for the page to fully load and then add the button
  window.addEventListener('load', () => {
    checkDOMChange();
  });
})();

// CSS styles for the toolbox
const css = `
    /* Style for the visible toolbox */
    .tool-box.visible {
      display: block;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
    }

    /* General style for the hidden toolbox */
    .tool-box {
      position: absolute;
      top: 20px;
      right: 20px;
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      font-family: Arial, sans-serif;
      color: #333;
      display: none;
    }

    /* Style for the toolbox title */
    .tool-box h2 {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    }

    /* Style for checkboxes and labels */
    .tool-box label {
      display: block;
      margin-bottom: 10px;
    }

    /* Style for the select element */
    .tool-box select {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

`;

// Add the CSS style to the page
const style = document.createElement('style');
style.innerHTML = css;
document.head.appendChild(style);

// Add the toolbox to the document body
const toolboxHtml = `
    <div class="tool-box" id="toolbox">
        <h2>Toolbox</h2>
        <label>
            <input type="checkbox" id="real-time-translate" />
            Translate Chat in Real Time
        </label>
        <label for="language-select">Select Language:</label>
        <select id="language-select">
    <option value="af">Afrikaans</option>
    <option value="sq">Albanian</option>
    <option value="am">Amharic</option>
    <option value="ar">Arabic</option>
    <option value="hy">Armenian</option>
    <option value="az">Azerbaijani</option>
    <option value="eu">Basque</option>
    <option value="be">Belarusian</option>
    <option value="bn">Bengali</option>
    <option value="bs">Bosnian</option>
    <option value="bg">Bulgarian</option>
    <option value="ca">Catalan</option>
    <option value="ceb">Cebuano</option>
    <option value="ny">Chichewa</option>
    <option value="zh-cn">Chinese (Simplified)</option>
    <option value="zh-tw">Chinese (Traditional)</option>
    <option value="co">Corsican</option>
    <option value="hr">Croatian</option>
    <option value="cs">Czech</option>
    <option value="da">Danish</option>
    <option value="nl">Dutch</option>
    <option value="en">English</option>
    <option value="eo">Esperanto</option>
    <option value="et">Estonian</option>
    <option value="tl">Filipino</option>
    <option value="fi">Finnish</option>
    <option value="fr">French</option>
    <option value="fy">Frisian</option>
    <option value="gl">Galician</option>
    <option value="ka">Georgian</option>
    <option value="de">German</option>
    <option value="el">Greek</option>
    <option value="gu">Gujarati</option>
    <option value="ht">Haitian Creole</option>
    <option value="ha">Hausa</option>
    <option value="haw">Hawaiian</option>
    <option value="iw">Hebrew</option>
    <option value="hi">Hindi</option>
    <option value="hmn">Hmong</option>
    <option value="hu">Hungarian</option>
    <option value="is">Icelandic</option>
    <option value="ig">Igbo</option>
    <option value="id">Indonesian</option>
    <option value="ga">Irish</option>
    <option value="it">Italian</option>
    <option value="ja">Japanese</option>
    <option value="jw">Javanese</option>
    <option value="kn">Kannada</option>
    <option value="kk">Kazakh</option>
    <option value="km">Khmer</option>
    <option value="ko">Korean</option>
    <option value="ku">Kurdish (Kurmanji)</option>
    <option value="ky">Kyrgyz</option>
    <option value="lo">Lao</option>
    <option value="la">Latin</option>
    <option value="lv">Latvian</option>
    <option value="lt">Lithuanian</option>
    <option value="lb">Luxembourgish</option>
    <option value="mk">Macedonian</option>
    <option value="mg">Malagasy</option>
    <option value="ms">Malay</option>
    <option value="ml">Malayalam</option>
    <option value="mt">Maltese</option>
    <option value="mi">Maori</option>
    <option value="mr">Marathi</option>
    <option value="mn">Mongolian</option>
    <option value="my">Myanmar (Burmese)</option>
    <option value="ne">Nepali</option>
    <option value="no">Norwegian</option>
    <option value="ps">Pashto</option>
    <option value="fa">Persian</option>
    <option value="pl">Polish</option>
    <option value="pt">Portuguese</option>
    <option value="pt-br">Portuguese (Brazil)</option>
    <option value="pa">Punjabi</option>
    <option value="ro">Romanian</option>
    <option value="ru">Russian</option>
    <option value="sm">Samoan</option>
    <option value="gd">Scots Gaelic</option>
    <option value="sr">Serbian</option>
    <option value="st">Sesotho</option>
    <option value="sn">Shona</option>
    <option value="sd">Sindhi</option>
    <option value="si">Sinhala</option>
    <option value="sk">Slovak</option>
    <option value="sl">Slovenian</option>
    <option value="so">Somali</option>
    <option value="es">Spanish</option>
    <option value="su">Sundanese</option>
    <option value="sw">Swahili</option>
    <option value="sv">Swedish</option>
    <option value="tg">Tajik</option>
    <option value="ta">Tamil</option>
    <option value="te">Telugu</option>
    <option value="th">Thai</option>
    <option value="tr">Turkish</option>
    <option value="uk">Ukrainian</option>
    <option value="ur">Urdu</option>
    <option value="uz">Uzbek</option>
    <option value="vi">Vietnamese</option>
    <option value="cy">Welsh</option>
    <option value="xh">Xhosa</option>
    <option value="yi">Yiddish</option>
    <option value="yo">Yoruba</option>
    <option value="zu">Zulu</option>
</select>

    </div>
`;

const body = document.body;
const div = document.createElement('div');
div.innerHTML = toolboxHtml;
body.appendChild(div);

// Variable to store the MutationObserver reference
let observer = null;

// Store the original messages in a map (key: message element, value: original text)
const originalMessages = new Map();

// Function to translate text using the Google Translate API
function translateText(text, destinationLanguage) {
  return new Promise((resolve, reject) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${destinationLanguage}&dt=t&q=${encodeURIComponent(text)}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const translation = data[0][0][0];
        resolve(translation);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Function to translate a message
function translateMessage(messageElement, destinationLanguage) {
  const originalText = originalMessages.get(messageElement);
  return translateText(originalText, destinationLanguage)
    .then(translation => {
      messageElement.textContent = translation;
      return translation;
    })
    .catch(error => {
      console.error("Error translating message:", error);
    });
}

// ...

const checkbox = document.getElementById('real-time-translate');
checkbox.addEventListener('change', () => {
  const selectElement = document.getElementById('language-select');
  const option = selectElement.value;

  if (checkbox.checked) {
    // Start translation

    // If there is already an observation, we don't need to create another one
    if (observer) {
      return;
    }

    // Translate all existing messages and store them in the originalMessages map
    const messages = document.querySelectorAll("span.text-fragment");
    messages.forEach(messageElement => {
      const originalText = messageElement.textContent;
      originalMessages.set(messageElement, originalText);

      translateMessage(messageElement, option);
    });

    // Create the observation for new messages
    const chatContainer = document.querySelector('[data-test-selector="chat-scrollable-area__message-container"]');
    if (chatContainer && !observer) {
      observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          const newMessages = Array.from(mutation.addedNodes).filter(node => node.nodeType === Node.ELEMENT_NODE && node.closest('[data-test-selector="chat-scrollable-area__message-container"]'));
          newMessages.forEach(newMessage => {
            const messageElement = newMessage.querySelector('span.text-fragment');
            if (messageElement && !originalMessages.has(messageElement)) {
              const originalText = messageElement.textContent;
              originalMessages.set(messageElement, originalText);

              translateMessage(messageElement, option);
            }
          });
        });
      });

      const observerConfig = { childList: true, subtree: true };
      observer.observe(chatContainer, observerConfig);
    }
  } else {
    // Disable translation

    // Remove the observation
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    // Revert translated messages to their original texts
    originalMessages.forEach((originalText, messageElement) => {
      messageElement.textContent = originalText;
    });

    // Clear the map of original messages
    originalMessages.clear();
  }
});
// ...
