//Open popup function
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
  popup.addEventListener('click', closeModalOverlay);
};

//Close popup function
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
  popup.removeEventListener('click', closeModalOverlay);
};

//CLose popup on ESC function
function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  };
};

//Close modal on overlay click function
function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  };
};

//Close modal on X function
function setClosePopupByCrossListeners(allXButtons) {
  allXButtons.forEach(button => {
    button.addEventListener('click', function () {
      const popup = button.closest('.popup');
      closeModal(popup);
    });
  });
};

export { openModal, closeModal, setClosePopupByCrossListeners };