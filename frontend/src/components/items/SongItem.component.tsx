import React from 'react'
import { Song } from '../../types'

export default (props:{song:Song, key:number, onClick:(s:Song)=>void})=>(<li onClick={(e)=>{
    e.preventDefault();
    props.onClick(props.song)

}}

><a href={'http://not-relevant.com'}>{props.song.title}</a></li>)