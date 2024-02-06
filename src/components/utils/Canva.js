import { useEffect, useRef, useState } from "react";

export default function Canva(props){
    const canvaRef = useRef(null);
        
    useEffect(() => {
        const element = canvaRef.current;
        if (element) {
            const w = element.width;
            const h = element.height;
            const ctx = element.getContext("2d")
            ctx.lineWidth = 3;
            // ctx.lineJoin= 'round';
            ctx.strokeStyle = props.color
            ctx.shadowOffsetX = 7;
            ctx.shadowOffsetY = 7;
            ctx.shadowBlur    = 10;
            ctx.shadowColor   = props.color
            ctx.beginPath()
            
            for(var i=0; i<10; i++){
                draw(w, h, ctx, i, props.vstep, props.hstep, props.value)
            }
            ctx.stroke();
        }
    }, [props.value, props.color, props.vstep, props.hstep]);
    return (
        <div>
            <canvas className='w-18 h-10 md:h-10 md:w-32 lg:w-36' ref={canvaRef} id="myCanvas" style={{width:props.width,height:props.height}}></canvas>
        </div>
    )
}

function draw(w, h, ctx, i, vstep, hstep, value){
    let paddingH = 0
    hstep!=0 && hstep != undefined?paddingH = w*1.5/140:0
    ctx.lineTo(((w/9)-paddingH)*i,h*(1-norm(value, vstep, i)));
}

function norm(x, step, i){
    var normalized = (x[i]-Math.min(...x))/(Math.max(...x)-Math.min(...x))
    if (normalized <step)
        return step
    if (normalized >1-step)
        return 1-step
    return normalized+(step/2)
}
