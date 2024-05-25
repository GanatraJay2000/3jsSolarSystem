import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import stars from "../../public/img/stars.jpg";
import sunTex from "../../public/img/sun.jpg";
import mercuryTex from "../../public/img/mercury.jpg";
import venusTex from "../../public/img/venus.jpg";
import earthTex from "../../public/img/earth.jpg";
import marsTex from "../../public/img/mars.jpg";
import jupiterTex from "../../public/img/jupiter.jpg";
import saturnTex from "../../public/img/saturn.jpg";
import saturnRingTex from "../../public/img/saturnRings.png";
import uranusTex from "../../public/img/uranus.jpg";
import uranusRingTex from "../../public/img/uranusRing.png";
import neptuneTex from "../../public/img/neptune.jpg";
import plutoTex from "../../public/img/pluto.jpg";

const wiw = window.innerWidth;
const wih = window.innerHeight;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(wiw, wih);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load(Array(6).fill(stars));

const camera = new THREE.PerspectiveCamera(45, wiw / wih, 0.1, 1000);
camera.position.set(-10, 30, 30);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// *-------------------------------------------------------------------------------------------------------------

const texLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({ map: texLoader.load(sunTex) });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);
const pointLight = new THREE.PointLight(0xffffff, 20000, 500);
scene.add(pointLight);

function createPlanet(size, tex, x, ring) {
  const planetParentObj = new THREE.Object3D();
  const planetGeo = new THREE.SphereGeometry(size, 32, 32);
  const planetMat = new THREE.MeshStandardMaterial({
    map: texLoader.load(tex),
  });
  const planet = new THREE.Mesh(planetGeo, planetMat);
  planet.position.set(x, 0, 0);
  planetParentObj.add(planet);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(ring.innerR, ring.outerR, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      map: texLoader.load(ring.tex),
      side: THREE.DoubleSide,
    });
    const rings = new THREE.Mesh(ringGeo, ringMat);
    rings.position.set(x, 0, 0);
    rings.rotation.x = -0.5 * Math.PI;
    planetParentObj.add(rings);
  }
  scene.add(planetParentObj);
  return { obj: planetParentObj, planet };
}

const mercury = createPlanet(3.2, mercuryTex, 28);
const venus = createPlanet(5.8, venusTex, 44);
const earth = createPlanet(6, earthTex, 62);
const mars = createPlanet(4, marsTex, 78);
const jupiter = createPlanet(12, jupiterTex, 100);
const saturn = createPlanet(10, saturnTex, 138, {
  tex: saturnRingTex,
  innerR: 12,
  outerR: 22,
});
const uranus = createPlanet(7, uranusTex, 176, {
  tex: uranusRingTex,
  innerR: 9,
  outerR: 15,
});
const neptune = createPlanet(7, neptuneTex, 200);
const pluto = createPlanet(2.8, plutoTex, 216);

// *-------------------------------------------------------------------------------------------------------------

function animate() {
  sun.rotateY(0.004);
  mercury.planet.rotateY(0.04);
  venus.planet.rotateY(0.002);
  earth.planet.rotateY(0.02);
  mars.planet.rotateY(0.018);
  jupiter.planet.rotateY(0.04);
  saturn.planet.rotateY(0.038);
  uranus.planet.rotateY(0.03);
  neptune.planet.rotateY(0.032);
  pluto.planet.rotateY(0.008);

  mercury.obj.rotateY(0.04);
  venus.obj.rotateY(0.015);
  earth.obj.rotateY(0.01);
  mars.obj.rotateY(0.008);
  jupiter.obj.rotateY(0.002);
  saturn.obj.rotateY(0.0009);
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);
  pluto.obj.rotateY(0.00007);

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
