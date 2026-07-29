import { useEffect, useRef, useState, type ReactNode } from "react";

type ArtifactBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

export function ArtifactBoundary({
  children,
  fallback,
}: ArtifactBoundaryProps) {
  const boundaryRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const boundary = boundaryRef.current;
    if (!boundary || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: "120% 0px" },
    );
    observer.observe(boundary);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={boundaryRef} className="artifact-boundary">
      {shouldRender ? children : fallback}
    </div>
  );
}
