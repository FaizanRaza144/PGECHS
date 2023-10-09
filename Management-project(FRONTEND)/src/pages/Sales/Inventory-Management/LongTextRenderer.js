import React, { useState } from 'react'
import "../Inventory-Management/LongTextRenderer.css"

const LongTextRenderer = ({ value }) => {
    const [showFullContent, setShowFullContent] = useState(false);
    console.log("value", value)
    const toggleShowContent = () => {
        setShowFullContent(!showFullContent);
    };
    return (
        <div>
            <div className="">
                <span>{showFullContent ? <span>{value}</span> : <span className='long-text-column'> {`${value.slice(0, 50)}...`}</span>}</span>
                {value.length > 50 && (
                    <span className="show-more" onClick={toggleShowContent}>
                        {showFullContent ? "Show Less" : "Show More"}
                    </span>
                )}
            </div>
        </div>
    )
}

export default LongTextRenderer

