//Open popup function
function openModal(popupName) {
  popupName.classList.add('popup_is-opened');
};

function closeModal(popupName) {
  popupName.classList.remove('.popup_is-opened');
};

//Close modal on ESC function
function closeModalEsc(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.key === "Escape" && openedPopup) {
    openedPopup.classList.remove('popup_is-opened');
  };
};

//Close modal on X function
function closeModalX(allXButtons) {
  allXButtons.forEach(button => {
    button.addEventListener('click', function () {
      const popup = button.closest('.popup');
      popup.classList.remove('popup_is-opened');
    });
  });
};

//Close modal on overlay click function
function closeModalOverlay(popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target === popup) {
      popup.classList.remove('popup_is-opened');
    };
  });
};

export { openModal, closeModal, closeModalEsc, closeModalX, closeModalOverlay };