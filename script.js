import * as THREE from './three.module.js';

let camera, scene, renderer;

document.getElementById("enter-ar").addEventListener("click", () => {
  navigator.xr.requestSession("immersive-ar", {
    requiredFeatures: ["hit-test"]
  }).then(onSessionStarted);
});

function onSessionStarted(session) {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local');

  session.addEventListener('end', () => {
    document.body.removeChild(canvas);
  });

  renderer.xr.setSession(session);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera();

  // Add object to the scene (cube)
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0, -1); // 1 meter in front of camera
  scene.add(cube);

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}
