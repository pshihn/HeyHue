if ('serviceWorker' in navigator) {
  const swScript = `data:application/javascript,(() => {
    console.log('Hello from slick worker');
  })();
  `;

  const onLoad = async () => {
    try {
      const swUrl = swScript;
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