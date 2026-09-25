"use client";

// Geofence Radar — visual 3D hero yang engineered, bukan dekorasi generik.
// Konsep: replika abstrak cara kerja produk unggulan (presensi geofencing) —
// pin lokasi di tengah radius, ring radar berdenyut, sweep berputar, dan
// node satelit mengorbit. Semua material Basic (unlit = murah), tanpa
// tekstur/postprocessing, geometri dishare. Budget: <60 draw calls,
// DPR clamp 1.75. File ini HANYA dirender bila lolos gate di Hero.jsx
// (pointer halus + tanpa reduced-motion + WebGL tersedia).

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VOID = 0x07090d;
const LINE = 0x2a3444;
const GRID = 0x151c28;
const SIGNAL = 0xff5c1c;
const INK = 0xe9eef5;

const ORBITS = [2.4, 3.6, 4.8];

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- renderer / scene / kamera ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(VOID, 0.024);

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 6.4, 14);
    camera.lookAt(0, 0.2, 0);

    const world = new THREE.Group();
    scene.add(world);
    const flat = (obj) => {
      obj.rotation.x = -Math.PI / 2;
      return obj;
    };

    // --- grid koordinat (lantai) ---
    const grid = new THREE.GridHelper(44, 44, LINE, GRID);
    grid.position.y = -2.2;
    grid.material.transparent = true;
    grid.material.opacity = 0.55;
    world.add(grid);

    // --- garis orbit statis ---
    const orbitMat = new THREE.LineBasicMaterial({
      color: LINE,
      transparent: true,
      opacity: 0.9,
    });
    for (const r of ORBITS) {
      const pts = new THREE.EllipseCurve(0, 0, r, r).getPoints(96);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      world.add(flat(new THREE.LineLoop(geo, orbitMat)));
    }

    // --- ring denyut radar (scale + fade berjenjang) ---
    const ringGeo = new THREE.RingGeometry(0.97, 1.0, 72);
    const pulses = ORBITS.map((r, i) => {
      const mat = new THREE.MeshBasicMaterial({
        color: SIGNAL,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const mesh = flat(new THREE.Mesh(ringGeo, mat));
      mesh.userData = { radius: r, offset: i / ORBITS.length };
      world.add(mesh);
      return mesh;
    });

    // --- sweep radar (kipas berputar pelan) ---
    const sweep = flat(
      new THREE.Mesh(
        new THREE.CircleGeometry(5.6, 48, 0, 0.55),
        new THREE.MeshBasicMaterial({
          color: SIGNAL,
          transparent: true,
          opacity: 0.1,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      )
    );
    world.add(sweep);

    // --- pin lokasi tengah + beam + ring kecil ---
    const pin = new THREE.Group();
    const pinHead = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.3),
      new THREE.MeshBasicMaterial({ color: SIGNAL })
    );
    pinHead.scale.y = 1.7;
    pinHead.position.y = 1.0;
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 1.6, 8),
      new THREE.MeshBasicMaterial({
        color: SIGNAL,
        transparent: true,
        opacity: 0.35,
      })
    );
    beam.position.y = 0.1;
    const pinRing = flat(
      new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({
          color: SIGNAL,
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      )
    );
    pin.add(pinHead, beam, pinRing);
    world.add(pin);

    // --- node satelit di tiap orbit ---
    const nodeGeo = new THREE.OctahedronGeometry(0.13);
    const nodeMats = [
      new THREE.MeshBasicMaterial({ color: SIGNAL }),
      new THREE.MeshBasicMaterial({ color: INK }),
    ];
    const nodes = Array.from({ length: 6 }, (_, i) => {
      const mesh = new THREE.Mesh(nodeGeo, nodeMats[i % 2]);
      mesh.userData = {
        radius: ORBITS[i % ORBITS.length],
        speed: (i % 2 === 0 ? 1 : -1) * (0.18 + (i % 3) * 0.07),
        phase: (i / 6) * Math.PI * 2,
      };
      mesh.position.y = 0.06;
      world.add(mesh);
      return mesh;
    });

    // --- debu partikel (drift lambat) ---
    const pCount = 280;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 24;
      pPos[i * 3 + 1] = -2 + Math.random() * 6;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const dust = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: 0x9aa3b2,
        size: 0.045,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      })
    );
    world.add(dust);

    // --- interaksi: parallax mouse (lolos gate pointer:fine) ---
    const mouse = { x: 0, y: 0 };
    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // --- pause saat offscreen / tab hidden (hemat baterai) ---
    let running = true;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !document.hidden;
        if (running) loop();
      },
      { threshold: 0.02 }
    );
    io.observe(mount);
    const onVis = () => {
      running = !document.hidden;
      if (running) loop();
    };
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(mount);

    // --- loop animasi ---
    const clock = new THREE.Clock();
    function loop() {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();

      sweep.rotation.z -= 0.008;

      for (const p of pulses) {
        const k = (t * 0.35 + p.userData.offset) % 1;
        const s = p.userData.radius * (0.25 + 0.75 * k);
        p.scale.set(s, s, s);
        p.material.opacity = (1 - k) * 0.45;
      }

      pinHead.position.y = 1.0 + Math.sin(t * 1.6) * 0.08;
      const pk = (t * 0.6) % 1;
      const ps = 0.5 + pk * 1.1;
      pinRing.scale.set(ps, ps, ps);
      pinRing.material.opacity = (1 - pk) * 0.5;

      for (const n of nodes) {
        const a = n.userData.phase + t * n.userData.speed;
        n.position.x = Math.cos(a) * n.userData.radius;
        n.position.z = Math.sin(a) * n.userData.radius;
      }
      dust.rotation.y = t * 0.02;

      // parallax: lerp agar gerakan halus, bukan menempel kursor
      world.rotation.y += (mouse.x * 0.35 - world.rotation.y) * 0.04;
      world.rotation.x += (mouse.y * 0.1 - world.rotation.x) * 0.04;

      renderer.render(scene, camera);
    }
    loop();

    // --- cleanup total (hindari leak saat HMR/unmount) ---
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("mousemove", onMouse);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach(
            (m) => m.dispose()
          );
        }
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
