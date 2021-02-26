import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonTableList = (cols) => {
    const { number } = cols
    return (
        <tr className="list w-full">
            {Array(number)
                .fill()
                .map((item, index) => (
                    <td className=" px-4 py-4" key={index}>
                        <p width={`100%`} className="card-channel">
                            <Skeleton />
                        </p>
                    </td>
                ))}
        </tr>
    )
}

export default SkeletonTableList