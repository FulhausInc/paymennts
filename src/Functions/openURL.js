const openURL = (url) => {
  const _window = window.location.replace(url);
  if (_window != null) {
    _window.focus();
  }
};

export default openURL;
