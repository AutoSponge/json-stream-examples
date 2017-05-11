// Vanilla.js version
// const cursor = {count: 0, pos: 0}
// const renderNext = (data, n) => () => {
//   document.querySelector('button').innerText = `${cursor.count} - Press to stop`
//   document.body.insertAdjacentHTML('beforeEnd', `<p>${data.hello}</p>`)
// }
// const xhr = new XMLHttpRequest()
// xhr.onprogress = () => {
//   const items = xhr.response.slice(cursor.pos).split('\n').filter((item) => item !== '').map(JSON.parse)
//   items.forEach((item) => {
//     window.requestAnimationFrame(renderNext(item, cursor.count += 1))
//   })
//   cursor.pos = xhr.response.length
// }
// xhr.onerror = () => console.err('Connection failed')
// xhr.open('GET', `/api/ldjson${window.location.search}`);
// xhr.send();
// document.querySelector('button').addEventListener('click', () => xhr.abort())

// stream-http version
const cursor = {count: 0}
const decoder = new TextDecoder('utf-8')
// another way to decode the buffer
// const decode = (buf) => String.fromCharCode.apply(null, new Uint16Array(buf))
const renderNext = (data, n) => () => {
  document.querySelector('button').innerText = `${cursor.count} - Press to stop`
  document.body.insertAdjacentHTML('beforeEnd', `<p>${data.hello}</p>`)
}
const req = streamHttp.get(`/api/ldjson${window.location.search}`, (res) => {
  res.on('data', (buf) => {
    const str = decoder.decode(buf)
    const items = str.split('\n').filter((item) => item !== '').map(JSON.parse)
    items.forEach((item) => {
      window.requestAnimationFrame(renderNext(item, cursor.count += 1))
    })
  })
})

document.querySelector('button').addEventListener('click', () => req.abort())