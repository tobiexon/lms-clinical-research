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

const variantStyles: Record<string, React.CSSProperties> = {
  navbar: {
    color: 'transparent',
    height: '75px',
    width: 'auto',
    marginTop: '14%',
  },
  footer: {
    color: 'transparent',
    height: '50px',
    width: 'auto',
  },
  hero: {
    color: 'transparent',
    height: '100px',
    width: 'auto',
  },
};

export default function Logo({ variant = 'navbar', href = '/' }: Props) {
  const style = variantStyles[variant];

  const img = (
    <Image
      src="/logo.png"
      alt="Clinical Research Nexus"
      width={240}
      height={75}
      className="object-contain"
      style={style}
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
