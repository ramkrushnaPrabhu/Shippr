import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const Rating = ({rating,set,style}) => {
  return (
    <div style={{display:'flex'}}>
    {
        [...Array(5)].map((_,i) => (
            <span key={i}  onClick={()=>set(i)} style={style}>
            {rating>i?(
                <AiFillStar fontSize='15px' color='yellow' size={"24px"}/>
            )
            :
            (
                <AiOutlineStar fontSize='15px' size={"24px"}/>
            )}
            </span>
        ))
    }
</div>
  )
}

export default Rating