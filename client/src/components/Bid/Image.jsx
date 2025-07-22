import React from "react";

 const Image =({src,alt,name})=>{
    return(
        <div className="imgcontainer">
            <img src={src}  alt={alt} className="image" />
            <p className="image-name">{name}</p>
        </div>
    )

} 

export  default Image;





















