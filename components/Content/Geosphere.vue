<template>
  <div class="content">
    <div id="canvas" ref="canvas" class="container"></div>
  </div>
</template>

<script>
import * as THREE from "three";
export default {
  name: "Geosphere",
  components: {},
  data() {
    return {
      ships: [],
      bases: [],
      rockets: [],
      cameraPosition: new THREE.Spherical(400, 3.14 / 2, 0),
      rotate: {
        need: false,
        x: undefined,
      },
      orbit: 109,
    };
  },
  mounted() {
    this.createScene();
    this.animate();

    window.addEventListener("mousemove", (e) => {
      if (this.rotate.need) {
        //console.log(0.01 * (e.offsetX - this.rotate.x));
        this.cameraPosition.theta -= 0.002 * (e.offsetX - this.rotate.x);
        this.rotate.x = e.offsetX;
      }
    });
    window.addEventListener("mousedown", (e) => {
      this.rotate.need = true;
      this.rotate.x = e.offsetX;
    });
    window.addEventListener("mouseup", (e) => {
      this.rotate.need = false;
      this.rotate.x = e.offsetX;
    });
  },
  methods: {
    createScene() {
      this.scene = new THREE.Scene();
      let width = this.$refs.canvas.clientWidth * 1;
      let height = this.$refs.canvas.clientHeight * 1;
      this.camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        0.01,
        10000
      );
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
      });
      this.renderer.setClearColor(0x000000, 0); // the default
      this.renderer.setSize(width, height);
      this.container = document.getElementById("canvas");

      var loader = new THREE.TextureLoader();
      /**/
      var earth_geom = new THREE.SphereGeometry(100, 256, 256);
      var earth_mat = new THREE.MeshPhongMaterial({
        map: loader.load(require("@/assets/earthmap1k.jpg")),
        bumpMap: loader.load(require("@/assets/earthbump1k.jpg")),
        bumpScale: 0.05,
        specularMap: loader.load(require("@/assets/earthspec1k.jpg")),
        specular: new THREE.Color("grey"),
      });
      this.earthMesh = new THREE.Mesh(earth_geom, earth_mat);
      this.earthMesh.position.z = 0;

      this.scene.add(this.earthMesh);
      /**/
      this.createBase();
      this.createBase();
      this.createBase();
      this.createBase();
      for (let i = 0; i < 9; i++) {
        this.createShip();
      }
      this.createLines();
      /**/
      const pointLight = new THREE.PointLight(0xffffff);
      pointLight.position.x = 10;
      pointLight.position.y = 50;
      pointLight.position.z = 400;
      this.scene.add(pointLight);

      const light = new THREE.AmbientLight(0x303030); // soft white light
      this.scene.add(light);

      this.camera.position.z = 340;
      this.renderer.domElement.classList.add("canvas");
      this.container.appendChild(this.renderer.domElement);
    },

    createLines() {
      /**/
      const line_material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const points = [];
      points.push(new THREE.Vector3(-1000, 0, 0));
      points.push(new THREE.Vector3(1000, 0, 0));
      const line_geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(line_geometry, line_material);
      this.scene.add(line);
      /**/
      const line_material2 = new THREE.LineBasicMaterial({ color: 0x00ff00 });
      const points2 = [];
      points2.push(new THREE.Vector3(0, -1000, 0));
      points2.push(new THREE.Vector3(0, 1000, 0));
      const line_geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
      const line2 = new THREE.Line(line_geometry2, line_material2);
      this.scene.add(line2);
      /**/
      const line_material3 = new THREE.LineBasicMaterial({ color: 0x0000ff });
      const points3 = [];
      points3.push(new THREE.Vector3(0, 0, -1000));
      points3.push(new THREE.Vector3(0, 0, 1000));
      const line_geometry3 = new THREE.BufferGeometry().setFromPoints(points3);
      const line3 = new THREE.Line(line_geometry3, line_material3);
      this.scene.add(line3);
    },

    createShip() {
      var radius = 2;
      var geometry = new THREE.SphereGeometry(radius, 16, 16);
      var loader = new THREE.TextureLoader();
      var earth_mat = new THREE.MeshPhongMaterial({
        map: loader.load(require("@/assets/earthmap1k.jpg")),
        bumpMap: loader.load(require("@/assets/earthbump1k.jpg")),
        bumpScale: 0.05,
        specularMap: loader.load(require("@/assets/earthspec1k.jpg")),
        specular: new THREE.Color("grey"),
      });
      this.sphere = new THREE.Mesh(geometry, earth_mat);
      let randphi = Math.random() * 3.14;
      let randtheta = Math.random() * 3.14;
      this.ships.push({
        ship: this.sphere,
        position: new THREE.Spherical(this.orbit, randphi, randtheta),
        speedphi: 0,
        speedtheta: 0,
        maxSpeed: 0.001,
        radius: radius,
      });
      this.scene.add(this.sphere);
    },

    createBase() {
      var radius = 50;
      var geometry = new THREE.BoxGeometry(4, 4, 4);
      const material = new THREE.MeshPhongMaterial({
        color: 0xff0000, // red (can also use a CSS color string here)
        flatShading: true,
      });
      this.base = new THREE.Mesh(geometry, material);
      let randphi = Math.random() * 3.14;
      let randtheta = Math.random() * 3.14;
      let pos = new THREE.Spherical(100, randphi, randtheta);
      let vec = new THREE.Vector3().setFromSpherical(pos);
      this.base.position.set(vec.x, vec.y, vec.z);
      this.base.lookAt(this.earthMesh.position);

      var radar_geometry = new THREE.SphereGeometry(radius, 64, 64);
      const radar_material = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        opacity: 0.15,
        transparent: true,
      });
      this.radar = new THREE.Mesh(radar_geometry, radar_material);
      let pos_radar = new THREE.Spherical(72, randphi, randtheta);
      let vec_radar = new THREE.Vector3().setFromSpherical(pos_radar);
      this.radar.position.set(vec_radar.x, vec_radar.y, vec_radar.z);
      this.bases.push({
        base: this.base,
        radar: this.radar,
        radius: radius,
      });

      this.scene.add(this.base);
      this.scene.add(this.radar);
    },

    createRocket(phi, theta, target) {
      var radius = 4;
      var geometry = new THREE.TetrahedronGeometry(radius);
      const material = new THREE.MeshPhongMaterial({
        color: 0xffff00,
        flatShading: true,
      });
      let rocket = new THREE.Mesh(geometry, material);
      let pos = new THREE.Spherical(this.orbit, phi, theta);
      let vec = new THREE.Vector3().setFromSpherical(pos);
      rocket.position.set(vec.x, vec.y, vec.z);

      this.rockets.push({
        rocket: rocket,
        target: target,
        speed: 0.3,
        orbit: this.orbit,
        scene: this.scene,
        countNextPosition: function(rocket, target, speed) {
          let targetPos = target.ship.position;
          let rocketPos = rocket.position;

          if (targetPos.distanceTo(rocketPos) < speed) {
            console.log("BUM");
            this.scene.remove(rocket);
            rocket.geometry.dispose();
            rocket.material.dispose();
            rocket = undefined;
            return;
          }
          let cross = new THREE.Vector3().crossVectors(targetPos, rocketPos);
          let tangent = new THREE.Vector3().crossVectors(cross, rocketPos);
          tangent = tangent.normalize().multiplyScalar(speed);
          let nextPos = new THREE.Vector3().addVectors(rocketPos, tangent);
          let nextPos2 = new THREE.Vector3().addVectors(
            rocketPos,
            tangent.negate()
          );
          if (targetPos.distanceTo(nextPos2) < targetPos.distanceTo(nextPos)) {
            nextPos = nextPos2;
          }
          let spherical = new THREE.Spherical().setFromVector3(nextPos);
          spherical.set(this.orbit, spherical.phi, spherical.theta);
          let vec = new THREE.Vector3().setFromSpherical(spherical);
          rocket.position.set(vec.x, vec.y, vec.z);
        },
      });
      this.scene.add(rocket);
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.ships_movement();
      this.check_radar();
      this.rockets_movement();

      //this.cameraPosition.phi += 0.001;
      //this.cameraPosition.theta -= 0.001;
      //
      let cam = new THREE.Vector3().setFromSpherical(this.cameraPosition);
      this.camera.position.set(cam.x, cam.y, cam.z);
      this.camera.lookAt(this.earthMesh.position);
      this.renderer.render(this.scene, this.camera);
    },

    rockets_movement() {
      this.rockets.forEach((rocketObj) => {
        rocketObj.countNextPosition(
          rocketObj.rocket,
          rocketObj.target,
          rocketObj.speed
        );
      });
    },

    ships_movement() {
      let rand = Math.random();
      this.ships.forEach((shipObj) => {
        let rand1 = Math.random() - 0.5;
        if (rand < 0.001) {
          shipObj.speedphi += rand1 * 0.1;
          shipObj.speedphi = Math.max(
            Math.min(shipObj.speedphi, shipObj.maxSpeed),
            -shipObj.maxSpeed
          );
          let rand2 = Math.random() - 0.5;
          shipObj.speedtheta += rand2 * 0.1;
          shipObj.speedtheta = Math.max(
            Math.min(shipObj.speedtheta, shipObj.maxSpeed),
            -shipObj.maxSpeed
          );
        }
        shipObj.position.phi += shipObj.speedphi;
        shipObj.position.theta += shipObj.speedtheta;
        let vec = new THREE.Vector3().setFromSpherical(shipObj.position);
        shipObj.ship.position.set(vec.x, vec.y, vec.z);
      });
    },

    check_radar() {
      if (this.counter === undefined) {
        this.counter = 0;
      }
      this.counter += 1;
      if (this.counter > 60) {
        this.counter = 0;
        this.bases.forEach((baseObj) => {
          this.ships.forEach((shipObj) => {
            if (
              baseObj.radar.position.distanceTo(shipObj.ship.position) <
              baseObj.radius
            ) {
              let spherical = new THREE.Spherical().setFromVector3(
                baseObj.base.position
              );
              this.createRocket(spherical.phi, spherical.theta, shipObj);
              console.log("foundShip");
            }
          });
        });
      }
    },
  },
};
</script>

<style scoped>
#canvas {
  background-color: rgb(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  border: 0px solid black;
  margin: 0px;
  padding: 0px;
  margin-left: auto;
  margin-right: auto;
  position: static; /* fixed or static */
}
</style>
