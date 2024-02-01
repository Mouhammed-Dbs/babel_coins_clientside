import { useEffect, useRef } from "react";

export default function Canva(props){
    const canvaRef = useRef(null);
    let step = 0
    if(props.step != undefined)
        step = props.step
    useEffect(() => {
        const element = canvaRef.current;
        if (element) {
            const w = element.width;
            const h = element.height;
            const ctx = element.getContext("2d");
            ctx.lineWidth = 2;
            // ctx.lineJoin= 'round';
            ctx.strokeStyle = props.color
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 7;
            ctx.shadowBlur    = 10;
            ctx.shadowColor   = props.color
            ctx.beginPath();
            // ctx.moveTo(0,-h);
            // ctx.moveTo(0,h*(1-norm(props.value, step, 0)));
            for(var i=0; i<10; i++){
                draw(w, h, ctx, i, step, props.value)
            }
            ctx.stroke();
        }
    }, []);
    return (
        <div>
            <canvas className='w-18 h-10 md:h-10 md:w-32 lg:w-36' ref={canvaRef} id="myCanvas" style={{width:props.width,height:props.height}}></canvas>
        </div>
    )
}

function draw(w, h, ctx, i, step, value){
    // console.log(norm(value,i))
    // ctx.moveTo(((w/10)-5)*(i+1),h*(1-norm(value, step, i)));
    let paddingLast = 0
    if (step!=0){
        paddingLast = w*1.5/140;
    }
    ctx.lineTo(((w/(9+parseInt(Math.round(step*10))))-paddingLast)*(i+parseInt(Math.round(step*10))),h*(1-norm(value, step, i)));
}

function norm(x, step, i){
    var normalized = (x[i]-Math.min(...x))/(Math.max(...x)-Math.min(...x))
    if (normalized <step)
        return step
    if (normalized >1-step)
        return 1-step
    return normalized+(step/2)
}
