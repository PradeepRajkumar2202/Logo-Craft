import { Slider } from './ui/slider'
import React, { useContext, useEffect, useState } from 'react'
import ColorPickerController from './ColorPickerController'
import { UpdateStorageContext } from '@/context/UpdateStorageContext'

function BackgroundController() {
    const storageValue=JSON.parse(localStorage.getItem('value'));

    const [rounded,setRounded]=useState(storageValue?storageValue?.bgRounded:0)
    const [Padding,setPadding]=useState(storageValue?storageValue?.bgPadding:0)
    const [color,setColor]=useState(storageValue?storageValue?.bgColor:'#000')
    
    const {updateStorage,setUpdateStorage}=useContext(UpdateStorageContext);

    useEffect(()=>{
        const updateValue={
            ...storageValue,
            bgRounded:rounded,
            bgPadding:Padding,
            bgColor:color

        }
        setUpdateStorage(updateValue);
        localStorage.setItem('value',JSON.stringify(updateValue));
    })
    
  return (
    <div>
         <div className='py-2'>
                <label className='p-2 flex justify-between items-center'>Rounded<span>{rounded} px</span></label>
                <Slider defaultValue={[0]} max={512} step={1}
                onValueChange={(event)=>setRounded(event[0])} />

            </div>
            <div className='py-2'>
                <label className='p-2 flex justify-between items-center'>Padding<span>{Padding} px</span></label>
                <Slider defaultValue={[40]} max={100} step={1}
                onValueChange={(event)=>setPadding(event[0])} />

            </div>
            <div className='py-2'>
                <label className='p-2 flex justify-between items-center'>Icon Color</label>
                <ColorPickerController hideController={false}
                selectedColor={(color)=>setColor(color)}/>

            </div>
    </div>
  )
}

export default BackgroundController