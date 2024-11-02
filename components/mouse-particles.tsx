import dynamic from 'next/dynamic'
import type MouseParticlesType from 'react-mouse-particles'

// Define the props interface based on the library's types
interface MouseParticlesProps {
  g: number;
  num: number;
  radius: number;
  life: number;
  v: number;
  color: string[];
  alpha: number;
  level: number;
}

// Use type assertion to handle the default export
const MouseParticles = dynamic(
  () => import('react-mouse-particles') as any,
  { ssr: false }
) as unknown as React.ComponentType<MouseParticlesProps>;

export function ParticlesEffect() {
  return (
    <MouseParticles
      g={1}
      num={5}
      radius={3}
      life={1}
      v={0.9}
      color={[
        "#9333EA", // Purple
        "#A855F7", // Light Purple
        "#7C3AED", // Violet
        "#8B5CF6", // Blue Purple
        "#C084FC", // Lavender
        "#D8B4FE", // Light Lavender
        "#6D28D9", // Dark Purple
        "#B45AFF", // Bright Purple
        "#9F7AEA", // Medium Purple
        "#DDD6FE"  // Very Light Purple
      ]}
      alpha={0.4}
      level={6}
    />
  )
}
