import React, {useRef, useState} from 'react'

const WrappedIframe = props => {
  const [iFrameHeight, setIFrameHeight] = useState('0px')

  const currentRef = useRef()

  const embedVideo = htmlContent => {
    const oembed = htmlContent.split('</oembed>')
    let body = ''
    oembed.forEach((item, index) => {
      body += `${oembed[index]}</oembed>`
      const oembed1 = item.split('url="')[1]
      if (oembed1) {
        const oembed2 = oembed1.split('">')[0]
        if (oembed2) {
          const youtube = oembed2.split('https://www.youtube.com/watch?v=')[1]
          if (youtube) {
            body += `<div class="iframe-container"><iframe style="height:350px; width:550px" src="https://youtube.com/embed/${youtube}" frameborder="0"; scrolling="no";  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
          }
        }
      }
    })
    return body
  }

  return (
    <iframe
      title="title"
      style={{
        maxWidth: '100%',
        width: '100%',
        height: iFrameHeight,
        overflow: 'visible',
        fontFamily: 'Roboto',
        fontSize: '0.875rem',
      }}
      onLoad={() => {
        const myiFrame = document.getElementById('iFrame')
        const doc = myiFrame.contentDocument

        const listOfLink = doc.querySelectorAll('a')
        listOfLink.forEach(link => link.setAttribute('target', '_blank'))

        doc.body.innerHTML = `${doc.body.innerHTML}
          <style>
          body { font-family: 'Inter', 'Helvetica Neue', Arial, Helvetica, sans-serif; font-size: 15px; color: #001F3D; line-height: 1.5; }
          img{
            width:100%
          }
          </style>
          `

        setIFrameHeight(`${currentRef.current.contentWindow.document.body.scrollHeight + 100}px`)
      }}
      ref={currentRef}
      srcDoc={embedVideo(props.srcDoc)}
      width="100%"
      height={iFrameHeight}
      scrolling="no"
      frameBorder="0"
      id="iFrame"
    />
  )
}
export default WrappedIframe
