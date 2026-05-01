interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'green' | 'gray' | 'yellow' | 'blue' | 'purple' | 'orange';
  className?: string;
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  red: 'bg-dark/10 text-accent border-accent/30',
  green: 'bg-green-500/10 text-green-400 border-green-500/30',
  gray: 'bg-[#888888]/10 text-muted border-[#888888]/30',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
};

export function Badge({ children, variant = 'gray', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 font-sans text-xs uppercase tracking-wider border ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

