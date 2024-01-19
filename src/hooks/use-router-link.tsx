import { pathToRegexp } from 'path-to-regexp'
import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/utils'

import type { LinkProps } from 'react-router-dom'

export const useRouterLink = () => {
  const { pathname } = useLocation()

  const isActive = (to: string) => pathToRegexp(to).test(pathname)

  return {
    pathname,
    isActive,
    Link: (props: LinkProps & { activeClsName?: string; inactiveClsName?: string }) => {
      const { to, activeClsName, inactiveClsName, className, ...rest } = props
      const target = (typeof to === 'object' ? to.pathname : to) || ''

      return (
        <Link
          className={cn(
            'text-lg font-semibold',
            isActive(target) ? activeClsName : inactiveClsName,
            className,
          )}
          to={to}
          {...rest}
        />
      )
    },
  } as const
}
