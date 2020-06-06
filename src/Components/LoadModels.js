import * as faceapi from 'face-api.js';

export async function loadModels () {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';

    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
    await faceapi.loadAgeGenderModel(MODEL_URL);
    // console.log('load Models -->', faceapi.nets)
}

export async function getFullFaceDescription(blob, inputSize) {
    // tiny_face_detector options
    let scoreThreshold = 0.5;
    const OPTION = new faceapi.TinyFaceDetectorOptions({
      inputSize,
      scoreThreshold
    });
    const useTinyModel = true;
  
    // fetch image to api
    let img = await faceapi.fetchImage(blob);
  
    // detect all faces and generate full description from image
    // including landmark and descriptor of each face

    let fullDesc = await faceapi
      .detectAllFaces(img, OPTION)
      .withFaceLandmarks(useTinyModel)
      .withFaceDescriptors()
      .withFaceExpressions()
      .withAgeAndGender;
    return fullDesc;
  }