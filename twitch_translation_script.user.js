// ==UserScript==
// @name         Twitch.tv chat Translation
// @namespace    Violentmonkey Scripts
// @version      1.0
// @description  Script to translate messages in real time on Twitch.tv using the Google Translate API
// @author       Jean Moraes
// @match        https://www.twitch.tv/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

// Function to translate a text using the Google Translate API
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

// Function to translate an individual message
function translateMessage(message, destinationLanguage) {
  const originalText = message.textContent;
  translateText(originalText, destinationLanguage)
    .then(translation => {
      message.textContent = translation;
    })
    .catch(error => {
      console.error("Error translating message:", error);
    });
}

// Function to initiate translation when the menu button is clicked
function initiateTranslation() {
  const destinationLanguage = prompt("Enter the destination language for translation (e.g., en, pt, es, pt-br):");
  if (destinationLanguage) {
    // Translate existing messages
    const messages = document.querySelectorAll("span.text-fragment");
    messages.forEach(message => {
      translateMessage(message, destinationLanguage);
    });

    // Observe new elements added to the DOM to translate them as well
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        const newMessages = Array.from(mutation.addedNodes).filter(node => node.nodeType === Node.ELEMENT_NODE && node.closest('[data-test-selector="chat-scrollable-area__message-container"]'));
        newMessages.forEach(newMessage => {
          translateMessage(newMessage.querySelector('span.text-fragment'), destinationLanguage);
        });
      });
    });

    const observerConfig = { childList: true, subtree: true };
    const chatContainer = document.querySelector('[data-test-selector="chat-scrollable-area__message-container"]');
    if (chatContainer) {
      observer.observe(chatContainer, observerConfig);
    }
  }
}

// Add button to Violentmonkey menu
GM_registerMenuCommand("Initiate Translation", initiateTranslation);
