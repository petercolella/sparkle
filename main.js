const footerDiv = document.querySelector('.footer-text');
const year = new Date().getFullYear();
const footerText = `\u00A9${year} Daria Naumova`;
const footerTextArr = footerText.split('');

footerTextArr.forEach(char => {
  const node = document.createElement('span');
  node.classList.add('footer-char');
  node.innerText = char;
  footerDiv.appendChild(node);
});

const charSpanNodeArr = document.querySelectorAll('.footer-char');
console.log(charSpanNodeArr);
let timeout = 0;

const loop = (forwardBoolean, addBoolean, speed) => {
  const arr = forwardBoolean ? charSpanNodeArr : [...charSpanNodeArr].reverse();

  const styleArr = [];
  const shadowPx = 1;
  const shadowIncrement = (shadowPx / arr.length) * 2;

  let hShadow = forwardBoolean ? -shadowPx : shadowPx;
  let vShadowTop = 0;
  let vShadowBottom = 0;

  arr.forEach((char, i) => {
    const pastHalfway = i + 1 <= arr.length / 2 ? 1 : -1;

    // console.log(`
    // forwardBoolean: ${forwardBoolean}
    // addBoolean: ${addBoolean}
    // i: ${i}
    // pastHalfway: ${pastHalfway}
    // top: ${-hShadow} ${vShadowTop}
    // bottom: ${hShadow} ${vShadowBottom}

    // `);

    const style = `text-shadow: ${-hShadow}px ${vShadowTop}px ${shadowPx *
      4}px #fff, ${hShadow}px ${vShadowBottom}px ${shadowPx * 4}px #fff`;
    styleArr.push(style);

    setTimeout(() => {
      addBoolean
        ? char.classList.add('sparkle')
        : char.classList.remove('sparkle');
      addBoolean
        ? char.setAttribute('style', `${styleArr[i]}`)
        : char.setAttribute('style', null);
    }, (timeout += speed));

    vShadowTop -= pastHalfway * shadowIncrement;
    vShadowBottom += pastHalfway * shadowIncrement;
  });
};

const sparkle = charArr => {
  const speedIncrement = 25;

  loop(true, true, speedIncrement);
  timeout -= (charArr.length - 2) * speedIncrement;
  loop(true, false, speedIncrement);
  timeout += 100;
  loop(false, true, speedIncrement);
  timeout -= (charArr.length - 2) * speedIncrement;
  loop(false, false, speedIncrement);

  setTimeout(() => {
    sparkle(charArr);
  }, 4000);
};

sparkle(charSpanNodeArr);
