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

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Subtle white fog to softly blend distant 3D elements into pure white background
    scene.fog = new THREE.Fog(0xffffff, 18, 62);

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

    // Helper: Anti-aliased circular particle texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };
    const circleTexture = createCircleTexture();

    // 2. Particle Wave Grid (Textile digital fabric mesh adapted for high-contrast WHITE background)
    const countX = 46;
    const countZ = 46;
    const numParticles = countX * countZ;
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    // High contrast palette against white:
    // Deep carbon/graphite (#0b0e17), rich navy slate (#1e293b), vibrant eXelentex crimson (#dc0c1c)
    const colorCrimson = new THREE.Color(0xdc0c1c);
    const colorCarbon = new THREE.Color(0x0b0e17);
    const colorSlate = new THREE.Color(0x334155);

    let idx = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iz = 0; iz < countZ; iz++) {
        // Positions
        positions[idx * 3] = (ix - countX / 2) * 1.25;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = (iz - countZ / 2) * 1.25;

        // Color blending for white background:
        // Majority are crisp dark carbon / slate, with ~18% vibrant crimson ink drops
        const mixedColor = colorCarbon.clone().lerp(colorSlate, Math.random() * 0.4);
        const rand = Math.random();
        if (rand < 0.18) {
          mixedColor.lerp(colorCrimson, 0.95);
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
      size: 0.28,
      map: circleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    particleSystem.position.y = -6;
    particleSystem.rotation.x = 0.2;
    scene.add(particleSystem);

    // 3. Geometric Wireframe Sphere (Signature eXelentex 3D orb in high-contrast graphite & crimson)
    let sphereGroup: THREE.Group | null = null;
    if (showSphere) {
      sphereGroup = new THREE.Group();

      // Outer crisp dark graphite wireframe
      const sphereGeo = new THREE.IcosahedronGeometry(7, 3);
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: 0x0b0e17,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      });
      const wireframeMesh = new THREE.Mesh(sphereGeo, wireframeMat);
      sphereGroup.add(wireframeMesh);

      // Accent crimson outer ring
      const ringGeo = new THREE.TorusGeometry(8.2, 0.04, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xdc0c1c,
        transparent: true,
        opacity: 0.45,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      sphereGroup.add(ringMesh);

      // Inner points of sphere in vibrant crimson red
      const spherePointsGeo = new THREE.IcosahedronGeometry(6.8, 2);
      const spherePointsMat = new THREE.PointsMaterial({
        color: 0xdc0c1c,
        size: 0.22,
        map: circleTexture,
        transparent: true,
        opacity: 0.90,
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
