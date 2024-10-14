import { FC } from "react"

interface Props { number?: number, color: string }
export const Square: FC<Props> = ({ number, color }: Props) => {
  const style = {
    backgroundColor: color,
    flexBasis: 200, flexShrink: 1, flexGrow: 1,
    height: 200,
    display: 'grid', placeItems: 'center',
  }
  return (
    <div style={style} onResize={e => console.log('resizing', e)}>
      {number}
    </div>
  )
}

