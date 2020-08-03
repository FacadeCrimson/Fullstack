import Link from 'next/link'
import starGenerator from '../lib/starGenerator'

export default function Itemcard (props){
    let server=process.env.NEXT_PUBLIC_SERVER
    const src=server+props.img
    return <div className='card'>
        <Link href="/item/[name]" as={`/item/${props.name}`}><img src={src}></img></Link>
        <div className="text">
            <div>{props.name}</div>
            <div>{"$ " + props.price}</div>
            <div>{starGenerator(props.ratings)}</div>
        </div>
        <style jsx>{`
        .card{
            display:inline-block;
            height:100%;
            width:auto;
            margin-right:15px;
            border:1px solid #606060;
        }
        .card img{
            display:inline;
            height:100%;
            width:auto;
        }
        .text{
            height:100%;
            float:right;
            text-align:right;
        }
      `}</style>
    </div>

}