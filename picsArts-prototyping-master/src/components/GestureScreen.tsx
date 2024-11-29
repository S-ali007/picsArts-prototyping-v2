// import React, { useEffect, useState, useRef } from "react";
// import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Camera, CameraType } from "expo-camera/legacy";
// import * as tf from "@tensorflow/tfjs";
// import * as handpose from "@tensorflow-models/handpose";
// import "@tensorflow/tfjs-react-native"; // Initialize TensorFlow.js for React Native

// export default function GestureScreen() {
//   const [type, setType] = useState(CameraType.back); // Front/back camera state
//   const [permission, requestPermission] = Camera.useCameraPermissions();
//   const [gestureDetected, setGestureDetected] = useState<string>(""); // Store gesture status
//   const cameraRef = useRef<Camera | null>(null); // Camera reference
//   const [model, setModel] = useState<any>(null); // Handpose model state

//   // Request camera permission
//   useEffect(() => {
//     const loadModel = async () => {
//       await tf.ready(); // Ensure TensorFlow.js is ready
//       const handposeModel = await handpose.load(); // Load the Handpose model
//       setModel(handposeModel);
//     };
//     loadModel();
//   }, []);

//   // Detect gestures from the camera feed
//   const detectGesture = async (frame: any) => {
//     if (model) {
//       const imageTensor = tf.browser.fromPixels(frame); // Convert frame to tensor
//       const predictions = await model.estimateHands(imageTensor); // Get hand predictions

//       if (predictions.length > 0) {
//         const landmarks = predictions[0].landmarks;
//         const thumbTip = landmarks[4]; // Thumb tip position
//         const indexTip = landmarks[8]; // Index tip position

//         // Basic "thumb-up" gesture detection: If thumb tip is above the index tip
//         if (thumbTip[1] < indexTip[1]) {
//           setGestureDetected("Thumb-up detected!");
//         } else {
//           setGestureDetected("");
//         }
//       } else {
//         setGestureDetected("");
//       }
//     }
//   };

//   // Handle camera frame and process each frame for gesture detection
//   const onFrameCaptured = (frame: any) => {
//     detectGesture(frame); // Detect gesture for each frame
//   };

//   // Handle camera ready event and process frames
//   const onCameraReady = () => {
//     const interval = setInterval(() => {
//       if (cameraRef.current) {
//         cameraRef.current.takePictureAsync({ base64: true }).then((photo) => {
//           const image = new Image();
//           image.src = `data:image/jpeg;base64,${photo.base64}`;
//           image.onload = () => onFrameCaptured(image); // Process each captured frame
//         });
//       }
//     }, 100); // Capture frame every 100ms

//     return () => clearInterval(interval); // Clean up interval
//   };

//   if (!permission) {
//     // Camera permissions are still loading
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet
//     return (
//       <View style={styles.container}>
//         <Text style={{ textAlign: "center" }}>
//           We need your permission to show the camera
//         </Text>
//         <Button onPress={requestPermission} title="Grant permission" />
//       </View>
//     );
//   }

//   // Toggle camera type between front and back
//   const toggleCameraType = () => {
//     setType((current) =>
//       current === CameraType.back ? CameraType.front : CameraType.back
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         type={type}
//         ref={cameraRef}
//         onCameraReady={onCameraReady} // Wait until the camera is ready
//       >
//         <View style={styles.overlay}>
//           {gestureDetected && (
//             <Text style={styles.gestureText}>{gestureDetected}</Text>
//           )}
//         </View>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
//             <Text style={styles.text}>Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000",
//   },
//   camera: {
//     flex: 1,
//     width: "100%",
//   },
//   overlay: {
//     position: "absolute",
//     top: 50,
//     left: 50,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 10,
//     borderRadius: 10,
//   },
//   gestureText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   buttonContainer: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: 10,
//     borderRadius: 5,
//   },
//   text: {
//     color: "white",
//     fontSize: 18,
//   },
// });

import { Text, View } from "react-native";
import React, { Component } from "react";

export default class GestureScreen extends Component {
  render() {
    return (
      <View>
        <Text>GestureScreen</Text>
      </View>
    );
  }
}
