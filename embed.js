const currentScript = (document.currentScript && document.currentScript.src) || 'https://app.slickstream.com/e2/embed.js';
console.log('script start', currentScript);


if ('serviceWorker' in navigator) {
  const onLoad = async () => {
    try {
      const swUrl = (new URL('./slick-worker.js', currentScript)).href;
      const registration = await navigator.serviceWorker.register(swUrl);
      console.log('Slick service worker registration successful with scope: ', registration.scope);
    } catch (err) {
      console.log('Slick service worker registration failed', err);
    }
  };

  if (document.readyState === 'complete') {
    onload();
  } else {
    window.addEventListener('load', onLoad);
  }
}

console.log('script end');