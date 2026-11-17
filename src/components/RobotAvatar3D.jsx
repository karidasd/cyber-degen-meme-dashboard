import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RobotAvatar3D({ 
  mode = 'idle', // 'idle' | 'pump' | 'dump' | 'analyzing' | 'speaking'
  speaking = false,
  selectedCoin = null
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0x0a192f, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xb026ff, 3.0);
    rimLight.position.set(-5, -3, -4);
    scene.add(rimLight);

    const headLight = new THREE.PointLight(0x00f0ff, 3.0, 10);
    headLight.position.set(0, 1, 2.5);
    scene.add(headLight);

    // --- MAIN ROBOT GROUP ---
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // 1. Skull / Cranium (Cyber metallic)
    const skullGeo = new THREE.BoxGeometry(1.9, 2.1, 1.8);
    // Smooth corners with chamfer illusion
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x111625,
      metalness: 0.9,
      roughness: 0.25,
      wireframe: false,
    });
    const skull = new THREE.Mesh(skullGeo, darkMetalMat);
    robotGroup.add(skull);

    // Cranium top crest
    const crestGeo = new THREE.BoxGeometry(0.5, 0.4, 2.0);
    const goldMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1a2638,
      metalness: 0.8,
      roughness: 0.3,
    });
    const crest = new THREE.Mesh(crestGeo, goldMetalMat);
    crest.position.set(0, 1.15, 0);
    robotGroup.add(crest);

    // 2. Visor (The Face Display)
    const visorGeo = new THREE.BoxGeometry(1.6, 0.85, 0.4);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x000511,
      roughness: 0.1,
      metalness: 0.9,
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.2, 0.85);
    robotGroup.add(visor);

    // 3. Glowing Eyes / Optical Matrix
    const eyeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    const leftEyeGeo = new THREE.BoxGeometry(0.35, 0.15, 0.05);
    const leftEye = new THREE.Mesh(leftEyeGeo, eyeMat);
    leftEye.position.set(-0.45, 0.25, 1.06);
    robotGroup.add(leftEye);

    const rightEyeGeo = new THREE.BoxGeometry(0.35, 0.15, 0.05);
    const rightEye = new THREE.Mesh(rightEyeGeo, eyeMat);
    rightEye.position.set(0.45, 0.25, 1.06);
    robotGroup.add(rightEye);

    // Laser Beams (Activated in PUMP mode)
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x00ff66,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const laserGeo = new THREE.CylinderGeometry(0.04, 0.35, 8, 16);
    laserGeo.rotateX(Math.PI / 2);

    const leftLaser = new THREE.Mesh(laserGeo, laserMat);
    leftLaser.position.set(-0.45, 0.25, 5.0);
    robotGroup.add(leftLaser);

    const rightLaser = new THREE.Mesh(laserGeo, laserMat);
    rightLaser.position.set(0.45, 0.25, 5.0);
    robotGroup.add(rightLaser);

    // 4. Equalizer Mouth / Audio Grid
    const mouthBars = [];
    const barCount = 7;
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.45, 1.0);
    robotGroup.add(mouthGroup);

    const barMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    for (let i = 0; i < barCount; i++) {
      const bGeo = new THREE.BoxGeometry(0.1, 0.3, 0.05);
      const bar = new THREE.Mesh(bGeo, barMat);
      bar.position.x = (i - (barCount - 1) / 2) * 0.16;
      mouthBars.push(bar);
      mouthGroup.add(bar);
    }

    // 5. Side Cyber Ears / Turbines
    const earGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.4, 16);
    earGeo.rotateZ(Math.PI / 2);
    const earMat = new THREE.MeshStandardMaterial({
      color: 0x0d1527,
      metalness: 0.8,
      roughness: 0.2,
    });

    const leftEar = new THREE.Mesh(earGeo, earMat);
    leftEar.position.set(-1.1, 0.1, 0);
    robotGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, earMat);
    rightEar.position.set(1.1, 0.1, 0);
    robotGroup.add(rightEar);

    // Antennae on ears
    const antGeo = new THREE.CylinderGeometry(0.02, 0.03, 1.1, 8);
    const antMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    
    const leftAnt = new THREE.Mesh(antGeo, antMat);
    leftAnt.position.set(-1.15, 0.7, 0);
    leftAnt.rotation.z = 0.25;
    robotGroup.add(leftAnt);

    const rightAnt = new THREE.Mesh(antGeo, antMat);
    rightAnt.position.set(1.15, 0.7, 0);
    rightAnt.rotation.z = -0.25;
    robotGroup.add(rightAnt);

    // 6. Holographic Orbit Rings around the Robot
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.015, 12, 64);
    const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    scene.add(orbitRing1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xb026ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.015, 12, 64);
    const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitRing2.rotation.x = Math.PI / 3;
    scene.add(orbitRing2);

    // 7. Background Cyber Floating Dust / Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 15;
      particlePositions[i + 1] = (Math.random() - 0.5) * 15;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- MOUSE TRACKING ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.55;
      mouse.targetY = y * 0.35;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- ANIMATION LOOP ---
    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse look interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      robotGroup.rotation.y = mouse.x;
      robotGroup.rotation.x = -mouse.y;

      // Subtle breathing floating motion
      robotGroup.position.y = Math.sin(elapsed * 2.2) * 0.08;

      // Orbit rings rotation
      orbitRing1.rotation.z = elapsed * 0.35;
      orbitRing1.rotation.x = Math.sin(elapsed * 0.2) * 0.4;
      orbitRing2.rotation.y = -elapsed * 0.45;

      // Particles slow drift
      particles.rotation.y = elapsed * 0.05;

      // Color and visual reaction based on Mode
      if (mode === 'pump') {
        // Neon green laser eyes & pump vibration
        eyeMat.color.setHex(0x00ff66);
        barMat.color.setHex(0x00ff66);
        ringMat1.color.setHex(0x00ff66);
        headLight.color.setHex(0x00ff66);
        laserMat.color.setHex(0x00ff66);
        laserMat.opacity = 0.85 + Math.sin(elapsed * 25) * 0.15;
        robotGroup.position.x = (Math.random() - 0.5) * 0.02; // slight energy shake
      } else if (mode === 'dump') {
        // Red flashing alarm
        const flash = Math.sin(elapsed * 12) > 0;
        const dumpColor = flash ? 0xff0055 : 0x440011;
        eyeMat.color.setHex(dumpColor);
        barMat.color.setHex(dumpColor);
        headLight.color.setHex(dumpColor);
        laserMat.opacity = 0;
        robotGroup.position.x = 0;
      } else if (mode === 'analyzing') {
        // Cyber purple & high-speed scanner
        eyeMat.color.setHex(0xb026ff);
        barMat.color.setHex(0x00f0ff);
        headLight.color.setHex(0xb026ff);
        laserMat.opacity = 0;
      } else {
        // Default cyan
        eyeMat.color.setHex(0x00f0ff);
        barMat.color.setHex(0x00f0ff);
        ringMat1.color.setHex(0x00f0ff);
        headLight.color.setHex(0x00f0ff);
        laserMat.opacity = 0;
        robotGroup.position.x = 0;
      }

      // Mouth animation when speaking or analyzing
      if (speaking || mode === 'analyzing' || mode === 'speaking') {
        mouthBars.forEach((bar, idx) => {
          const wave = Math.sin(elapsed * 18 + idx * 1.2);
          bar.scale.y = Math.max(0.2, Math.abs(wave) * 2.2);
        });
      } else {
        mouthBars.forEach((bar, idx) => {
          bar.scale.y = 0.35 + Math.sin(elapsed * 3 + idx) * 0.2;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mode, speaking]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Three.js Container */}
      <div ref={mountRef} className="w-full h-full cursor-crosshair z-10" />

      {/* Cyber HUD Overlay Over Robot */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-20">
        {/* Top HUD Tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-cyan-500/30 font-terminal text-xs text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span>NEURAL_CORE // v3.8.4-DEGEN</span>
          </div>
          <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-purple-500/30 font-terminal text-[11px] text-purple-300">
            LATENCY: <span className="text-emerald-400 font-bold">12ms</span>
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div className="flex items-center justify-between">
          <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-cyan-500/40 text-xs font-terminal">
            <span className="text-gray-400">STATUS: </span>
            <span className={`font-bold uppercase tracking-wider ${
              mode === 'pump' ? 'text-emerald-400 animate-pulse' :
              mode === 'dump' ? 'text-red-500 animate-bounce' :
              mode === 'analyzing' ? 'text-purple-400' : 'text-cyan-400'
            }`}>
              {mode === 'pump' ? '🚀 MEGA PUMP ENGAGED' :
               mode === 'dump' ? '🚨 CRITICAL RUG/DUMP' :
               mode === 'analyzing' ? '🧠 NEURAL SCANNING...' :
               speaking ? '🗣️ AUDIO BROADCAST' : '⚡ MONITORING MEMES'}
            </span>
          </div>

          {selectedCoin && (
            <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-yellow-500/40 text-xs font-terminal text-yellow-400 flex items-center space-x-1.5">
              <span>TARGET:</span>
              <span className="font-bold">{selectedCoin.symbol}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
