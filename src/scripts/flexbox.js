// document.querySelector('.hamburger').addEventListener('click', () => {
//   document.querySelector('.nav-links').classList.toggle('expanded');
// });

console.log('Flex Box');

const elStage = document.getElementById('stage');
const styles = {
  'justify-content': undefined,
};
// Find all buttons with the `alert` class on the page.
const elRadioBtns = document.querySelectorAll(
  'input[type="radio"][name="justify-content"'
);

// Handle clicks on each button.
elRadioBtns.forEach((elRadio) => {
  elRadio.addEventListener('click', (e) => {
    const className = e.target.value;

    if (styles['justify-content']) {
      elStage.classList.remove(`justify-content--${styles['justify-content']}`);
    }

    elStage.classList.add(`justify-content--${className}`);
    styles['justify-content'] = className;
  });
});

document.getElementById('add-box-btn').addEventListener('click', () => {
  const elDiv = document.createElement('div');
  elDiv.classList.add('box');
  elStage.insertAdjacentElement('beforeEnd', elDiv);
});

document.getElementById('remove-box-btn').addEventListener('click', () => {
  const elBoxes = document.querySelectorAll('.box');

  if (elBoxes.length === 1) return;

  elBoxes[elBoxes.length - 1].remove();
  return;
});
