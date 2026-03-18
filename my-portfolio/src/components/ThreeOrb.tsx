import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeOrb: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Icosahedron wireframe
    const geo = new THREE.IcosahedronGeometry(1, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00ff99,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireOrb = new THREE.Mesh(geo, wireMat);
    scene.add(wireOrb);

    // Solid inner sphere
    const innerGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x001a0d,
      transparent: true,
      opacity: 0.85,
      roughness: 0.2,
      metalness: 0.8,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);

    // Point light (green)
    const pointLight = new THREE.PointLight(0x00ff99, 3, 8);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Ambient
    const ambient = new THREE.AmbientLight(0x004422, 0.8);
    scene.add(ambient);

    // Floating particles around the orb
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleRadii = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 1.4 + Math.random() * 0.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      particleRadii[i] = r;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00ff99,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / w - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / h - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      wireOrb.rotation.x = t * 0.3 + mouseY * 0.2;
      wireOrb.rotation.y = t * 0.5 + mouseX * 0.3;
      wireOrb.rotation.z = t * 0.15;

      innerSphere.rotation.y = t * 0.2;
      particles.rotation.y = t * 0.1;
      particles.rotation.x = t * 0.05;

      // Float
      wireOrb.position.y = Math.sin(t * 0.8) * 0.08;
      innerSphere.position.y = Math.sin(t * 0.8) * 0.08;

      // Pulse glow
      const pulse = 0.8 + Math.sin(t * 2) * 0.2;
      pointLight.intensity = 3 * pulse;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const newW = mount.clientWidth;
      const newH = mount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ minHeight: 280 }}
    />
  );
};

export default ThreeOrb;
