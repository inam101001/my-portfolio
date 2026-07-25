import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ProjectArtifactProps {
  type: string;
}

const ProjectArtifact: React.FC<ProjectArtifactProps> = ({ type }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Dynamic color and shape based on type
    const color = new THREE.Color(0x00ff99);
    let geometry;
    
    const typeLower = type.toLowerCase();
    if (typeLower.includes("banking")) {
      geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    } else if (typeLower.includes("mistle")) {
      geometry = new THREE.TorusGeometry(1.2, 0.4, 16, 100);
    } else if (typeLower.includes("portfolio")) {
      geometry = new THREE.IcosahedronGeometry(1.5, 0);
    } else {
      geometry = new THREE.SphereGeometry(1.5, 32, 32);
    }

    const material = new THREE.MeshPhongMaterial({
      color: color,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      shininess: 100
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ff99, 10, 10);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      mesh.rotation.x = time * 0.5;
      mesh.rotation.y = time * 0.3;
      
      // Floating effect
      mesh.position.y = Math.sin(time * 1.5) * 0.15;
      
      // Pulsing opacity
      material.opacity = 0.4 + Math.sin(time * 2) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const newW = mount.clientWidth;
      const newH = mount.clientHeight || 300;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, [type]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full min-h-[300px] flex items-center justify-center bg-black/40 rounded-2xl border border-[#00ff99]/10 shadow-[inner_0_0_20px_rgba(0,255,153,0.05)] overflow-hidden" 
    />
  );
};

export default ProjectArtifact;
