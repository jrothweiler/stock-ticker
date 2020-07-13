import React from "react"
//import {displayWrapper} from './generics/displayWrapper'
import { Badge } from './generics/badge'
import { useDispatch, useSelector } from "react-redux"

export const VisualDisplay = () => {
    //Call necessary selectors for display data
    const dispatch = useDispatch()

    return (
        //<displayWrapper>
        <Badge color="white" bg="blue">
            Badge
        </Badge>
        //</displayWrapper>
    )
}
