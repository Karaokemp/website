import React from 'react'
import { Song } from '../../types'

export default (props:{song:Song, key:number, onClick:(s:Song)=>void})=>(<li onClick={(e)=>{e.preventDefault(); props.onClick(props.song)}}>
        <img src={props.song.image} style={{height: '20%',width: '50%'}}/>
<p>{props.song.title}</p>
        </li>)