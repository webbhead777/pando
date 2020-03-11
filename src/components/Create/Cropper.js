import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

import ButtonRow from './ButtonRow'
import InstagramAuth from './InstagramAuth'
import ImageEditorView from './Example'
import { executeCrop } from './utils'

const DEFAULT_URL = 'https://s3.amazonaws.com/panoawards/wp-content/uploads/2016/10/Pano_Jesus-M-Garcia.jpg'

export default function Cropper (props) {
  const { image } = props
  const [ numOfFrames, setNumOfFrames ] = useState(3)
  const [ format, setFormat ] = useState('best-fit')
  const DEVICE_WIDTH = Dimensions.get('window').width
  const getBestFit = (image, format, numOfFrames) => {
    if (format === 'square') {
      return 100
    } else if (format === 'best-fit') {
      const frameWidth = (Dimensions.get('window').width - 20) / numOfFrames // TODO get View width

      return frameWidth
    }
  }
  const framesArray = []
  // setup array to render grid lines
  for (let i = 0; i < numOfFrames; i++) { framesArray.push(true) }

  const frameWidth = getBestFit(image, format, numOfFrames)

  return (
    <View style={styles.container}>
      {/*image &&
        <ScrollView>
          <Image source={{ uri: image.path }} style={styles.cropContainer} />
        </ScrollView>

        // <ImageBackground source={{ uri: !!image ? image.path : DEFAULT_URL }} style={styles.cropContainer}>
        //   {framesArray.map((f, i) => (
        //     <View
        //       key={i}
        //       style={styles.cropLines}
        //       width={frameWidth} />
        //   ))}
        // </ImageBackground>
      */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{ alignSelf: 'stretch' }}
          onPress={() => {}}>
          <Text style={styles.textButtons}>BACK</Text>
        </TouchableOpacity>
        <View style={{ flex: 2 }} />
        <TouchableOpacity
          style={{ alignSelf: 'stretch' }}
          onPress={() => executeCrop(image, numOfFrames, format)}>
          <Text style={styles.textButtons}>NEXT</Text>
        </TouchableOpacity>
      </View>

      {image &&
        <View style={styles.editorContainer}>
          <View style={styles.editor}>
            <ImageEditorView
              image={image}
              style={styles.cropContainer} />
            <View style={styles.cropLinesRow}>
              {framesArray.map((f, i) => (
                <View
                  key={i}
                  style={styles.cropLines}
                  width={frameWidth} />
              ))}
            </View>
          </View>
        </View>
      }
      <ButtonRow
        format={format}
        numOfFrames={numOfFrames}
        onSetFormat={setFormat}
        onSetNumOfFrames={setNumOfFrames} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    position: 'relative'
  },
  cropContainer: {
    height: '100%',
    width: '100%',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  cropLines: {
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 100,
    width: 100
  },
  cropLinesRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  editor: {
    flex: 4,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    position: 'absolute'
  },
  editorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 20,
    marginBottom: 50
  },
  textButtons: {
    fontSize: 18,
    color: 'white',
    justifyContent: 'flex-start'
  }
})
