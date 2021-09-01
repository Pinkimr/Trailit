const browser = window.chrome || window.browser
export const chromeSendMessage = (req, callback) => {
  const extensionId = process.env.REACT_APP_EXTENSION_ID
  if (browser && browser.runtime) {
    return (
      browser.runtime &&
      browser.runtime.sendMessage(extensionId, {...req}, function (response) {
        callback(response)
      })
    )
  }
  window.localStorage.setItem('extension_status', 'inactive')
}
