import './index.scss';

let dynamicStyles: HTMLStyleElement = null;

function addAnimation(rules: string) {
  if (!dynamicStyles) {
    dynamicStyles = document.createElement('style');
    document.head.appendChild(dynamicStyles);
  }
  dynamicStyles.sheet.insertRule(rules);
}

addAnimation(`
  @keyframes myAnimation { 
    0% { transform: rotate(0); }
    20% { transform: rotate(${ 360 * Math.random() }deg); }
    60% { transform: rotate(${ -360 * Math.random() }deg); }
    90% { transform: rotate(${ 360 * Math.random() }deg); }
    100% { transform: rotate(${ 0 }deg); }
  }
`);

document.getElementById("circle").style.animation = 'myAnimation 3s';