interface AnchorProps extends React.HTMLAttributes<HTMLAnchorElement> {
  rel?: string
  href?: string
  target?: string
}

export const Anchor = (props: AnchorProps) => {
  return <a rel='noreferrer' target='_blank' {...props} />
}
