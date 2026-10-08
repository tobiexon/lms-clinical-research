import Link from 'next/link';
import Image from 'next/image';

interface Props {
  /** 'navbar' = compact horizontal for the navbar
   *  'footer' = same but smaller
   *  'hero'   = large centred version for hero sections
   */
  variant?: 'navbar' | 'footer' | 'hero';
  href?: string;
}

// Height values per variant — width is always auto
const variantHeights: Record<string, number> = {
  navbar: 75,
  footer: 50,
  hero:   100,
};

export default function Logo({ variant = 'navbar', href = '/' }: Props) {
  const h = variantHeights[variant];

  const img = (
    <Image
      src="/logo.png"
      alt="Clinical Research Nexus"
      width={0}
      height={0}
      sizes="300px"
      className="object-contain"
      style={{ height: `${h}px`, width: 'auto', marginTop: variant === 'navbar' ? '15%' : undefined }}
      priority={variant === 'navbar'}
    />
  );

  if (!href) return img;

  return (
    <Link href={href} aria-label="Clinical Research Nexus — Home">
      {img}
    </Link>
  );
}
