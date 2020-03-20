import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

import { navigate } from 'App'
import { saveToCameraRoll } from 'components/Create/utils'
import Header from 'components/Header'
import Body from 'components/Body'

export default function Export (props) {
  const { images } = props
  const [downloadText, setDownloadText] = useState('SAVE TO CAMERA ROLL')
  const [savedToCameraRoll, setSavedToCameraRoll] = useState(false)
  const hapticOpts = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
  }
  const onSaveToCameraRoll = images => {
    images.forEach((image, i) => {
      setTimeout(() => {
        saveToCameraRoll(image)
        setDownloadText(i === images.length ? 'SAVED!' : `SAVING ${i+1}`)
        ReactNativeHapticFeedback.trigger('impactMedium', hapticOpts)
        if (i+1 === images.length) setTimeout(() => {setDownloadText('SAVED!')}, 280)
      }, i * 280)
    })
  }

  return (
    <>
      <Header style={{ backgroundColor: 'white' }} />
      <Body style={{ backgroundColor: 'white' }}>
        <View style={{...styles.container, ...props.style}}>
          <View style={styles.sliderContainer}>
            <SliderBox
              images={images}
              sliderBoxHeight={420}
              dotColor='black'
              inactiveDotColor='grey'
              currentImageEmitter={e => ReactNativeHapticFeedback.trigger('impactLight', hapticOpts)}
              dotStyle={{
                width: 8,
                height: 8,
                borderRadius: 0,
                marginHorizontal: -20,
              }} />
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.bigButtonsContainer}>
              <TouchableOpacity
                disabled={savedToCameraRoll}
                style={styles.buttonBig}
                onPress={() => onSaveToCameraRoll(images)}>
                <Text style={styles.buttonBigText}>
                  {downloadText}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigate('create')}>
                <Text style={styles.buttonText}>BACK TO EDIT</Text>
              </TouchableOpacity>
              <View style={{ flex: 2 }} />
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigate('import')}>
                <Text style={styles.buttonText}>CREATE NEW</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Body>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bigButtonsContainer: {
    marginBottom: 80,
    marginTop: 60,
  },
  button: {
    alignSelf: 'stretch',
    flex: 1,
  },
  buttonBig: {
    backgroundColor: 'black',
    height: 60,
    width: 240,
  },
  buttonBigText: {
    color: 'white',
    padding: 16,
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: 'Oswald-Bold',
  },
  buttonsContainer: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    width: 120,
    justifyContent: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: 60,
    marginBottom: 20,
  },
  sliderContainer: {
    flex: 2,
    marginTop: 60,
    height: 340,
  },
})
