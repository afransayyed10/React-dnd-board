import React from 'react';
import { useDrop } from 'react-dnd';
import ITEM_TYPE from "../data/types";
import { statuses } from '../data';

// const DropWrapper = ({ onDrop, children, status }) => {
//     const [{ isOver }, drop] = useDrop({
//         accept: ITEM_TYPE,
//         canDrop: (item, monitor) => {
//             // const itemIndex = statuses.findIndex(si => si.status === item.status);
//             // const statusIndex = statuses.findIndex(si => si.status === status);
//             // return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
//             return true;
//         },
//         drop: (item, monitor) => {
//             onDrop(item, monitor, status);
//         },
//         collect: monitor => ({
//             isOver: monitor.isOver()
//         })
//     });


const DropWrapper = ({ onDrop, children, status }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        canDrop: (item, monitor) => {
            return true;
        },
        drop: (item, monitor) => {
            const dragIndex = item.index;
            const hoverIndex = children.props.index;
            const hoverBoundingRect = monitor.getClientOffset();
            // const itemHeight = monitor.getItem().height;
            if (!hoverBoundingRect) {
                return;
            }
            const hoverMiddleY = hoverBoundingRect.y + (monitor.getItem().height / 2);
            // const hoverMiddleY = hoverBoundingRect.y + (itemHeight / 2);

            // if (!hoverBoundingRect) {
            //     return;
            // }

            if (dragIndex === hoverIndex) {
                return;
            }
            
             // If dragging downwards
            if (dragIndex < hoverIndex && monitor.getClientOffset().y < hoverMiddleY) {
                return;
            }

            // If dragging upwards
            if (dragIndex > hoverIndex && monitor.getClientOffset().y > hoverMiddleY) {
                return;
            }

            // Perform the drop
            onDrop(item, monitor, status, hoverIndex);
            item.index = hoverIndex;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });


    return (
        <div ref={drop} className="drop-wrapper">
            {React.cloneElement(children, { isOver })}
        </div>
    );
};

export default DropWrapper;
