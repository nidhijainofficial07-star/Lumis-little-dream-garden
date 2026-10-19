
import { useEffect, useRef } from "react";
import * as THREE from "three";

type LumiExpression = "love" | "happy" | "surprised" | "sad" | "sleepy";

export function Lumi3D({ expression }: { expression: LumiExpression }) {
  const expressionRef = useRef<LumiExpression>(expression);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    expressionRef.current = expression;
  }, [expression]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      Math.max(container.clientWidth, 1),
      Math.max(container.clientHeight, 1)
    );
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight("#ffffff", 2));

    const light = new THREE.PointLight("#ffd6f5", 30);
    light.position.set(2, 3, 5);
    scene.add(light);

    const lumi = new THREE.Group();
    scene.add(lumi);

    // Soft pastel cloud body
    const cloudMaterial = new THREE.MeshStandardMaterial({
      color: "#f8dfff",
      roughness: 0.55,
      metalness: 0.05,
    });

    const cloudParts = [
      { x: 0, y: 0, scale: 1.05 },
      { x: -0.7, y: -0.05, scale: 0.72 },
      { x: 0.7, y: -0.05, scale: 0.72 },
      { x: -0.38, y: 0.45, scale: 0.7 },
      { x: 0.38, y: 0.45, scale: 0.7 },
    ];

    cloudParts.forEach(({ x, y, scale }) => {
      const puff = new THREE.Mesh(
        new THREE.SphereGeometry(scale, 32, 24),
        cloudMaterial
      );
      puff.position.set(x, y, 0);
      lumi.add(puff);
    });

    // Big glossy baby eyes with highlights that blink with them
    const eyeMaterial = new THREE.MeshPhysicalMaterial({
      color: "#493454",
      roughness: 0.16,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });

    const eyeMeshes: THREE.Mesh[] = [];
    const eyeBaseScales = [
      new THREE.Vector3(0.85, 1.12, 0.65),
      new THREE.Vector3(0.85, 1.12, 0.65),
    ];

    [-0.34, 0.34].forEach((x, index) => {
      const eye = new THREE.Mesh(
        new THREE.SphereGeometry(0.125, 32, 24),
        eyeMaterial
      );

      const baseScale = eyeBaseScales[index];
if (baseScale) {
  eye.scale.copy(baseScale);
}
      eye.position.set(x, 0.04, 0.96);
      lumi.add(eye);
      eyeMeshes.push(eye);

      const shine = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 12, 12),
        new THREE.MeshBasicMaterial({ color: "#ffffff" })
      );
      shine.position.set(-0.025, 0.045, 0.075);
      eye.add(shine);

      const tinyShine = new THREE.Mesh(
        new THREE.SphereGeometry(0.014, 10, 10),
        new THREE.MeshBasicMaterial({ color: "#ffffff" })
      );
      tinyShine.position.set(0.035, -0.025, 0.082);
      eye.add(tinyShine);
    });

    // Create cute curved mouths
    const makeMouth = (
      startY: number,
      controlY: number,
      endY: number,
      color = "#8e4567"
    ) => {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.09, startY, 1.045),
        new THREE.Vector3(0, controlY, 1.055),
        new THREE.Vector3(0.09, endY, 1.045)
      );

      const mouth = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 20, 0.014, 8, false),
        new THREE.MeshBasicMaterial({ color })
      );

      lumi.add(mouth);
      return mouth;
    };

    const loveMouth = makeMouth(-0.16, -0.25, -0.16);
    const happyMouth = makeMouth(-0.19, -0.28, -0.19, "#b34e79");
    const sadMouth = makeMouth(-0.22, -0.16, -0.22, "#9b6487");
    const sleepyMouth = makeMouth(-0.19, -0.23, -0.19);

    const surprisedMouth = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 20, 20),
      new THREE.MeshBasicMaterial({ color: "#8e4567" })
    );
    surprisedMouth.scale.set(0.75, 1.2, 0.35);
    surprisedMouth.position.set(0, -0.21, 1.055);
    lumi.add(surprisedMouth);

    const allMouths = [
      loveMouth,
      happyMouth,
      surprisedMouth,
      sadMouth,
      sleepyMouth,
    ];

    allMouths.forEach((mouth) => {
      mouth.visible = false;
    });

    // Rosy baby cheeks
    const blushMaterial = new THREE.MeshBasicMaterial({
      color: "#ff9fc8",
      transparent: true,
      opacity: 0.85,
    });

    const blushMeshes: THREE.Mesh[] = [];

    [-0.57, 0.57].forEach((x) => {
      const blush = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 24, 20),
        blushMaterial
      );
      blush.scale.set(1.25, 0.65, 0.35);
      blush.position.set(x, -0.13, 0.85);
      lumi.add(blush);
      blushMeshes.push(blush);
    });

    // Tiny button nose
    const nose = new THREE.Mesh(
      new THREE.SphereGeometry(0.025, 12, 12),
      new THREE.MeshBasicMaterial({ color: "#f4a0bd" })
    );
    nose.position.set(0, -0.08, 1.02);
    lumi.add(nose);

    let frameId = 0;
    let targetX = 0;
    let targetY = 0;
    let dragging = false;
    let previousX = 0;
    let previousY = 0;
    let rotationX = 0;
    let rotationY = 0;
    let disposed = false;

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      previousX = event.clientX;
      previousY = event.clientY;
      renderer.domElement.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (dragging) {
        rotationY += (event.clientX - previousX) * 0.01;
        rotationX += (event.clientY - previousY) * 0.01;
        previousX = event.clientX;
        previousY = event.clientY;
      } else {
        const rect = container.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.5;
        targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.3;
      }
    };

    const onPointerUp = () => {
      dragging = false;
    };

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.touchAction = "none";
    canvas.setAttribute(
      "aria-label",
      "Interactive 3D Lumi cloud character. Drag to rotate."
    );
    canvas.setAttribute("role", "img");

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);

    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // Expression and blinking state
    let lastExpression: LumiExpression | null = null;
    let eyeBaseScaleX = 0.85;
    let eyeBaseScaleY = 1.12;
    let eyeBaseScaleZ = 0.65;
    let blinkStart = -1;
    let nextBlink = performance.now() + 1800;

    const animate = () => {
      if (disposed) return;

      frameId = requestAnimationFrame(animate);

      const currentExpression = expressionRef.current;
      const now = performance.now();

      if (currentExpression !== lastExpression) {
        lastExpression = currentExpression;
        allMouths.forEach((mouth) => {
          mouth.visible = false;
        });

        if (currentExpression === "love") {
          loveMouth.visible = true;
          eyeBaseScaleX = 0.85;
          eyeBaseScaleY = 1.12;
          eyeBaseScaleZ = 0.65;
        } else if (currentExpression === "happy") {
          happyMouth.visible = true;
          eyeBaseScaleX = 0.9;
          eyeBaseScaleY = 0.35;
          eyeBaseScaleZ = 0.65;
        } else if (currentExpression === "surprised") {
          surprisedMouth.visible = true;
          eyeBaseScaleX = 0.95;
          eyeBaseScaleY = 1.4;
          eyeBaseScaleZ = 0.65;
        } else if (currentExpression === "sad") {
          sadMouth.visible = true;
          eyeBaseScaleX = 0.85;
          eyeBaseScaleY = 0.8;
          eyeBaseScaleZ = 0.65;
        } else {
          sleepyMouth.visible = true;
          eyeBaseScaleX = 0.9;
          eyeBaseScaleY = 0.08;
          eyeBaseScaleZ = 0.65;
        }

        eyeMeshes.forEach((eye, index) => {
          eye.scale.set(eyeBaseScaleX, eyeBaseScaleY, eyeBaseScaleZ);

const baseScale = eyeBaseScales[index];
if (!baseScale) return;

baseScale.set(
  eyeBaseScaleX,
  eyeBaseScaleY,
  eyeBaseScaleZ
);
        });
      }

      // Natural blinks; keep sleepy eyes gently closed
      if (now >= nextBlink && blinkStart < 0) {
        blinkStart = now;
      }

      let blinkFactor = 1;

      if (blinkStart >= 0) {
        const progress = (now - blinkStart) / 180;

        if (progress >= 1) {
          blinkStart = -1;
          nextBlink = now + 2200 + Math.random() * 2200;
        } else {
          blinkFactor = 1 - Math.sin(progress * Math.PI);
        }
      }

      
eyeMeshes.forEach((eye, index) => {
  const base = eyeBaseScales[index];
  if (!base) return;

  eye.scale.set(
    base.x,
    currentExpression === "sleepy"
      ? base.y
      : base.y * blinkFactor,
    base.z
  );
});


      // Gentle floating and cheek bounce
      const time = now * 0.0015;
      lumi.position.y = Math.sin(time) * 0.08;

      blushMeshes.forEach((blush, index) => {
        blush.scale.y = 0.65 + Math.sin(time * 1.4 + index * Math.PI) * 0.035;
      });

      if (!dragging) {
        lumi.rotation.y += (targetX - lumi.rotation.y) * 0.04;
        lumi.rotation.x += (targetY - lumi.rotation.x) * 0.04;
      } else {
        lumi.rotation.y = rotationY;
        lumi.rotation.x = rotationX;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();

      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerUp);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });

      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}

export default Lumi3D;
