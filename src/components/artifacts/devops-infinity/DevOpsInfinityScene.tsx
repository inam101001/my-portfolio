import { useEffect, useRef } from "react";
import * as THREE from "three";
import { devOpsLifecycle } from "./devopsLifecycle";
import { motionTokens } from "../../../motion";

const SAMPLE_COUNT = 320;
const TAU = Math.PI * 2;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const amount = clamp((value - edge0) / Math.max(edge1 - edge0, 0.0001));
  return amount * amount * (3 - 2 * amount);
};

function infinityPoint(progress: number) {
  const angle = progress * TAU;
  return new THREE.Vector3(
    -4.25 * Math.sin(angle),
    2.25 * Math.sin(angle) * Math.cos(angle),
    0.62 * Math.cos(angle),
  );
}

function createTextSprite(label: string, rotation: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 160;
  const context = canvas.getContext("2d");

  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "600 58px Consolas, monospace";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#e9e2d0";
    context.fillText(label.toUpperCase(), canvas.width / 2, canvas.height / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;

  const material = new THREE.SpriteMaterial({
    map: texture,
    color: 0x8f897d,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    rotation,
  });
  const sprite = new THREE.Sprite(material);
  const width = label.length > 7 ? 1.52 : 1.18;
  sprite.scale.set(width, 0.38, 1);

  return sprite;
}

function createInfinityCurve() {
  const points = Array.from({ length: SAMPLE_COUNT }, (_, index) =>
    infinityPoint(index / SAMPLE_COUNT),
  );
  return new THREE.CatmullRomCurve3(points, true, "centripetal");
}

function createRibbonGeometry(
  curve: THREE.CatmullRomCurve3,
  frames: ReturnType<THREE.CatmullRomCurve3["computeFrenetFrames"]>,
  start = 0,
  end = 1,
  widthScale = 1,
) {
  const radialSegments = 20;
  const halfWidth = 0.43 * widthScale;
  const halfThickness = 0.105 * widthScale;
  const longitudinalSegments = Math.max(
    12,
    Math.ceil((end - start) * SAMPLE_COUNT),
  );
  const positions: number[] = [];
  const indices: number[] = [];

  for (let segment = 0; segment <= longitudinalSegments; segment += 1) {
    const progress = lerp(start, end, segment / longitudinalSegments);
    const frameIndex = Math.min(
      SAMPLE_COUNT,
      Math.round(progress * SAMPLE_COUNT),
    );
    const point = curve.getPointAt(progress);
    const normal = frames.normals[frameIndex];
    const binormal = frames.binormals[frameIndex];

    for (let side = 0; side < radialSegments; side += 1) {
      const angle = (side / radialSegments) * TAU;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const profileX =
        Math.sign(cosine) * Math.pow(Math.abs(cosine), 0.5) * halfWidth;
      const profileY =
        Math.sign(sine) * Math.pow(Math.abs(sine), 0.5) * halfThickness;
      const vertex = point
        .clone()
        .addScaledVector(normal, profileX)
        .addScaledVector(binormal, profileY);

      positions.push(vertex.x, vertex.y, vertex.z);
    }
  }

  for (let segment = 0; segment < longitudinalSegments; segment += 1) {
    for (let side = 0; side < radialSegments; side += 1) {
      const nextSide = (side + 1) % radialSegments;
      const current = segment * radialSegments + side;
      const currentNext = segment * radialSegments + nextSide;
      const following = (segment + 1) * radialSegments + side;
      const followingNext = (segment + 1) * radialSegments + nextSide;

      indices.push(current, following, currentNext);
      indices.push(currentNext, following, followingNext);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

type DevOpsInfinitySceneProps = {
  progressRef: { current: number };
  onPhaseChange: (index: number) => void;
};

export function DevOpsInfinityScene({
  progressRef,
  onPhaseChange,
}: DevOpsInfinitySceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseCallbackRef = useRef(onPhaseChange);

  useEffect(() => {
    phaseCallbackRef.current = onPhaseChange;
  }, [onPhaseChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    const maxPixelRatio = canvas.clientWidth < 720 ? 1.2 : 1.4;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0d0c, 0.052);

    const camera = new THREE.PerspectiveCamera(
      36,
      canvas.clientWidth / Math.max(canvas.clientHeight, 1),
      0.1,
      60,
    );
    camera.position.set(0, 0, 12.4);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0x6579ff, 0.46);
    const keyLight = new THREE.PointLight(0x1d3fe0, 24, 18, 1.8);
    keyLight.position.set(-2.5, 3.5, 5);
    const rimLight = new THREE.PointLight(0xe66332, 18, 20, 2);
    rimLight.position.set(4, -2, 3);
    scene.add(ambient, keyLight, rimLight);

    const infinityCurve = createInfinityCurve();
    const ribbonFrames = infinityCurve.computeFrenetFrames(SAMPLE_COUNT, true);

    const phaseAnchors = devOpsLifecycle.map((phase, index) => {
      const phaseStart = index / devOpsLifecycle.length;
      const phaseEnd = (index + 1) / devOpsLifecycle.length;
      const gap = 0.0045;
      const midpoint = (phaseStart + phaseEnd) / 2;
      const point = infinityCurve.getPointAt(midpoint);
      const tangent = infinityCurve.getTangentAt(midpoint);
      const segmentColor = new THREE.Color(0x1d3fe0).lerp(
        new THREE.Color(0xe66332),
        (index / (devOpsLifecycle.length - 1)) * 0.34,
      );
      const segmentMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1b1e1c,
        emissive: 0x080a09,
        emissiveIntensity: 0.18,
        metalness: 0.4,
        roughness: 0.21,
        clearcoat: 1,
        clearcoatRoughness: 0.13,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      });
      const segment = new THREE.Mesh(
        createRibbonGeometry(
          infinityCurve,
          ribbonFrames,
          phaseStart + gap,
          phaseEnd - gap,
          1.018,
        ),
        segmentMaterial,
      );
      segment.renderOrder = 2;
      root.add(segment);

      let labelRotation = Math.atan2(tangent.y, tangent.x);
      if (labelRotation > Math.PI / 2) labelRotation -= Math.PI;
      if (labelRotation < -Math.PI / 2) labelRotation += Math.PI;
      const label = createTextSprite(phase.label, labelRotation);
      label.position.copy(point);
      label.position.z += 0.23;
      root.add(label);

      return {
        point,
        label,
        labelRotation,
        segmentMaterial,
        segmentColor,
      };
    });

    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(150 * 3);
    for (let index = 0; index < 150; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 15;
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 7 - 2;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xe9e2d0,
        size: 0.025,
        transparent: true,
        opacity: 0.34,
        depthWrite: false,
      }),
    );
    scene.add(particles);

    let activePhase = -1;
    let frameId = 0;
    let isVisible = true;
    let elapsedTime = 0;
    let visualProgress = clamp(progressRef.current);
    let previousFrameTime = performance.now();
    const target = new THREE.Vector3();
    const lookTarget = new THREE.Vector3();
    const cameraTarget = new THREE.Vector3();
    const inactiveSegmentColor = new THREE.Color(0x1b1e1c);
    const inactiveSegmentEmissive = new THREE.Color(0x080a09);
    const activeLabelColor = new THREE.Color(0xe9e2d0);
    const inactiveLabelColor = new THREE.Color(0x8f897d);

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const pixelRatio = width < 720 ? 1.2 : 1.4;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatio));
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const render = () => {
      frameId = window.requestAnimationFrame(render);
      if (!isVisible || document.hidden) return;

      const frameTime = performance.now();
      const deltaTime = Math.min(
        Math.max((frameTime - previousFrameTime) / 1000, 0),
        0.05,
      );
      previousFrameTime = frameTime;
      elapsedTime += deltaTime;

      const targetProgress = clamp(progressRef.current);
      visualProgress = reducedMotion
        ? targetProgress
        : THREE.MathUtils.damp(
            visualProgress,
            targetProgress,
            motionTokens.scrollDamping,
            deltaTime,
          );
      const progress =
        Math.abs(targetProgress - visualProgress) < 0.0001
          ? targetProgress
          : visualProgress;
      const lifecycleProgress = progress;
      const scaledPhase =
        lifecycleProgress * (devOpsLifecycle.length - 1) + 0.0001;
      const currentIndex = Math.min(
        devOpsLifecycle.length - 1,
        Math.floor(scaledPhase),
      );
      const nextIndex = Math.min(
        devOpsLifecycle.length - 1,
        currentIndex + 1,
      );
      const localProgress = scaledPhase - currentIndex;
      const transition = smoothstep(0.16, 0.84, localProgress);
      const displayedIndex = transition > 0.5 ? nextIndex : currentIndex;
      const intro = smoothstep(0, 0.08, progress);

      root.rotation.y = reducedMotion
        ? -0.08
        : -0.12 + Math.sin(progress * Math.PI) * 0.2;
      root.rotation.x = reducedMotion
        ? -0.035
        : -0.035 + Math.sin(progress * TAU) * 0.045;
      root.rotation.z = reducedMotion ? 0 : lerp(-0.075, 0.075, progress);
      root.position.y = reducedMotion ? 0 : Math.sin(progress * TAU) * 0.12;
      root.updateMatrixWorld(true);

      target
        .copy(phaseAnchors[currentIndex].point)
        .lerp(phaseAnchors[nextIndex].point, transition)
        .applyMatrix4(root.matrixWorld);

      const isCompact = canvas.clientWidth < 720;
      const side =
        devOpsLifecycle[currentIndex].panelSide === "right" ? 1 : -1;
      cameraTarget.set(
        lerp(0, target.x, intro),
        lerp(0, target.y, intro),
        lerp(12.4, target.z + (isCompact ? 5.45 : 4.7), intro),
      );
      camera.position.copy(cameraTarget);
      lookTarget.set(
        lerp(0, target.x + side * (isCompact ? 0 : 0.78), intro),
        lerp(0, target.y, intro),
        lerp(0, target.z, intro),
      );
      camera.lookAt(lookTarget);

      particles.rotation.z = elapsedTime * 0.008;

      if (displayedIndex !== activePhase) {
        activePhase = displayedIndex;
        phaseCallbackRef.current(displayedIndex);
      }

      phaseAnchors.forEach(
        (
          {
            label,
            labelRotation,
            segmentMaterial,
            segmentColor,
          },
          index,
        ) => {
        const isActive = index === displayedIndex;
        segmentMaterial.color.copy(
          isActive ? segmentColor : inactiveSegmentColor,
        );
        segmentMaterial.emissive.copy(
          isActive ? segmentColor : inactiveSegmentEmissive,
        );
        segmentMaterial.emissiveIntensity = isActive ? 2.15 : 0.18;
        const labelMaterial = label.material as THREE.SpriteMaterial;
        labelMaterial.opacity = isActive ? 1 : 0.34;
        labelMaterial.color.copy(
          isActive ? activeLabelColor : inactiveLabelColor,
        );
        labelMaterial.rotation = labelRotation + root.rotation.z;
        const labelScale = isActive ? 0.44 : 0.36;
        const labelAspect = devOpsLifecycle[index].label.length > 7 ? 4 : 3.1;
        label.scale.set(labelScale * labelAspect, labelScale, 1);
      },
      );

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: "100px" },
    );
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    resize();
    render();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frameId);
      scene.traverse((object) => {
        if (
          !(
            object instanceof THREE.Mesh ||
            object instanceof THREE.Points ||
            object instanceof THREE.Sprite
          )
        ) {
          return;
        }
        object.geometry.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => {
          if (material instanceof THREE.SpriteMaterial) {
            material.map?.dispose();
          }
          material.dispose();
        });
      });
      renderer.dispose();
    };
  }, [progressRef]);

  return (
    <canvas
      ref={canvasRef}
      className="devops-infinity-canvas"
      aria-hidden="true"
    />
  );
}
