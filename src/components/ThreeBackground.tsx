import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  className?: string;
  showSphere?: boolean;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  className = '',
  showSphere = true,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 25);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 1. Particle Wave Grid (Textile digital fabric mesh)
    const countX = 45;
    const countZ = 45;
    const numParticles = countX * countZ;
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    // Color palette: eXelentex red (#dc0c1c) and slate blue (#8691a8)
    const colorRed = new THREE.Color(0xdc0c1c);
    const colorSlate = new THREE.Color(0x8691a8);
    const colorDark = new THREE.Color(0x25293d);

    let idx = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iz = 0; iz < countZ; iz++) {
        // Positions
        positions[idx * 3] = (ix - countX / 2) * 1.2;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = (iz - countZ / 2) * 1.2;

        // Colors
        const mixedColor = colorSlate.clone().lerp(colorDark, Math.random() * 0.5);
        if (Math.random() < 0.12) {
          mixedColor.lerp(colorRed, 0.9);
        }

        colors[idx * 3] = mixedColor.r;
        colors[idx * 3 + 1] = mixedColor.g;
        colors[idx * 3 + 2] = mixedColor.b;

        idx++;
      }
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    particleSystem.position.y = -6;
    particleSystem.rotation.x = 0.2;
    scene.add(particleSystem);

    // 2. Geometric Wireframe Sphere (Signature eXelentex 3D orb)
    let sphereGroup: THREE.Group | null = null;
    if (showSphere) {
      sphereGroup = new THREE.Group();

      const sphereGeo = new THREE.IcosahedronGeometry(7, 3);
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: 0x8691a8,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const wireframeMesh = new THREE.Mesh(sphereGeo, wireframeMat);
      sphereGroup.add(wireframeMesh);

      // Inner points of sphere
      const spherePointsGeo = new THREE.IcosahedronGeometry(6.8, 2);
      const spherePointsMat = new THREE.PointsMaterial({
        color: 0xdc0c1c,
        size: 0.14,
        transparent: true,
        opacity: 0.65,
      });
      const spherePointsMesh = new THREE.Points(spherePointsGeo, spherePointsMat);
      sphereGroup.add(spherePointsMesh);

      sphereGroup.position.set(12, 1, -5);
      scene.add(sphereGroup);
    }

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Damped camera rotation towards mouse
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX * 10;
      camera.position.y = 5 - targetY * 6;
      camera.lookAt(0, 0, 0);

      // Wave physics on particles
      const posArray = particlesGeometry.attributes.position.array as Float32Array;
      let pIdx = 0;
      for (let ix = 0; ix < countX; ix++) {
        for (let iz = 0; iz < countZ; iz++) {
          const wave1 = Math.sin(ix * 0.35 + elapsedTime * 1.5) * 1.2;
          const wave2 = Math.cos(iz * 0.35 + elapsedTime * 1.2) * 1.2;
          posArray[pIdx * 3 + 1] = wave1 + wave2;
          pIdx++;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Rotate 3D sphere
      if (sphereGroup) {
        sphereGroup.rotation.y = elapsedTime * 0.15;
        sphereGroup.rotation.x = elapsedTime * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [showSphere]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
    />
  );
};
