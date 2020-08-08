import React, {
  useRef,
  useCallback,
  memo,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'
import styled, { css } from 'styled-components'

import useGlobalEvent from 'utils/hooks/useGlobalEvent'

import Ball from 'ui/Ball'

interface RootProps {
  noHover?: boolean,
  selected?: boolean,
  forceVisible?: boolean,
}

const Root = styled(Ball)<RootProps>`
  ${props => props.selected ? css`
    font-size: 0.8em;
    font-weight: bold;
    color: white;
  ` : css`
    font-size: 0;
    background: radial-gradient(#004, #002, #002);
  `}

  ${props => props.forceVisible && css`
    font-size: 0.8em;
  `}

  @media (max-width: 999px) {
    font-size: ${props => props.selected ? 8 : 0}px;
  }
`

type InputProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

type Props = RootProps & InputProps

const BowlBall = (props: Props) => {
  const ballRef = useRef<HTMLDivElement | null>(null)

  const cb = useCallback((e: KeyboardEvent) => {
    const el = ballRef.current
    if (el && document.activeElement === el && e.key === 'Enter') {
      el.click()
    }
  }, [ballRef])

  useGlobalEvent('keydown', cb)

  return (
    <Root
      {...props}
      ref={ballRef}
      tabIndex={0}
    />
  )
}

export default memo(BowlBall)
