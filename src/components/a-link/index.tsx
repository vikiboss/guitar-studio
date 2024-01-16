interface ALinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  rel?: string
  href?: string
  target?: string
}

export const ALink = (props: ALinkProps) => {
  return <a rel='noreferrer' target='_blank' {...props} />
}
