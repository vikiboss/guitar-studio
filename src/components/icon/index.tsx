import moon from './assets/moon.svg'
import sun from './assets/sun.svg'

export type BundledIcon = 'moon' | 'sun'

export interface IconProps extends React.HTMLAttributes<HTMLImageElement> {
  name: BundledIcon
  size?: number
  className?: string
}

const iconMap: Record<BundledIcon, string> = {
  moon,
  sun,
}

export function Icon(props: IconProps) {
  const { name, size, ...rest } = props
  return (
    <img
      src={iconMap[name]}
      alt='icon'
      style={{
        height: size,
        width: size,
      }}
      {...rest}
    />
  )
}
