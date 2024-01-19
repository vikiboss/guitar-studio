interface AnchorProps extends React.HTMLAttributes<HTMLAnchorElement> {}

export const Anchor = (props: AnchorProps) => {
  return <a rel='noreferrer' target='_blank' {...props} />
}
