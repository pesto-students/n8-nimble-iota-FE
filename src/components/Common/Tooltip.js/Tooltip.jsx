
import React from 'react'
import {  Tooltip } from 'antd'

function Tooltip({text,color,key}) {
    return (
        <Tooltip title={text} color={color} key={key}>
          <Button>{color}</Button>
        </Tooltip>
    )
}

export default Tooltip

