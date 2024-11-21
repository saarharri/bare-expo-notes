import { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { Worklet } from 'react-native-bare-kit'

export default function () {
  const [response, setReponse] = useState<string | null>(null)

  useEffect(() => {
    const worklet = new Worklet()

    worklet.start(
      '/app.js',
      `
      const rpc = new BareKit.RPC((req) => {
        if (req.command === 'ping') {
          req.reply('Pong from Bare!')
        }
      })

      const req = rpc.request('ping')

      req.send('Ping from Bare!')

      req.reply('utf8').then((res) => console.log(res))
      `
    )

    const rpc = new worklet.RPC((req) => {
      if (req.command === 'ping') {
        req.reply('Pong from React Native!')
      }
    })

    const req = rpc.request('ping')

    req.send('Ping from React Native!')

    req.reply('utf8').then((res: string) => setReponse(res))
  }, [])

  return <Text>{response}</Text>
}
