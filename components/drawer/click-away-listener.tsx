import React, { useRef } from 'react'
import useHandleClickAway from './use-handle-click-away'

export default function ClickAwayListener({ onClickAway, enabled, children }: { onClickAway(prm: any): any, enabled: boolean, children: any }) {
    const ref = useRef(null)
    useHandleClickAway(ref, onClickAway, enabled)
    return <div ref={ref}>
        {children}
    </div>
}
