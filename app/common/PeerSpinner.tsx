import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'

interface Props {
  text?: string
  size?: number
}

export default function PearSpinner(props: Props) {
  const { text, size = 24 } = props
  const scaleAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const startScaling = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
          })
        ])
      ).start()
    }
    startScaling()
  }, [scaleAnim])

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.pearIcon,
          { fontSize: size, transform: [{ scale: scaleAnim }] }
        ]}
      >
        🍐
      </Animated.Text>
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10
  },
  pearIcon: {
    fontSize: 24
  },
  text: {
    color: '#b0d943',
    fontSize: 14,
    marginTop: 8
  }
})
