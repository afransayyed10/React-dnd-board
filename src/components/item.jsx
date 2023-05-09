// import React, { Fragment, useState, useRef} from 'react';
// import { useDrag, useDrop } from 'react-dnd';
// import Window from './Window';
// import ITEM_TYPE from "../data/types";

// // const Item = ({ item, index, moveItem, status}) => {
// //     const ref = useRef(null);

// //     const [, drop] = useDrop({
// //         accept: ITEM_TYPE,
// //         hover(item, monitor) {
// //             if (!ref.current) {
// //                 return;
// //             }

// //             const dragIndex = item.index;
// //             const hoverIndex = index;
// //             const hoverBoundingRect = ref.current.getBoundingClientRect();
// //             if (!hoverBoundingRect) {
// //                 return;
// //             }

// //             // if (dragIndex === hoverIndex) {
// //             //     return;
// //             // }

// //             const hoveredRect = ref.current.getBoundingClientRect();
// //             const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
// //             const mousePosition = monitor.getClientOffset();
// //             const hoverClientY = mousePosition.y - hoveredRect.top;

// // //             // const hoveredRect = ref.current.getBoundingClientRect();
// // //             // const hoverMiddleY = hoveredRect.y + hoveredRect.height / 2;
// // //             // const mousePosition = monitor.getClientOffset();
// // //             // const hoverClientY = mousePosition.y;

// // //             const hoverBoundingRect = ref.current.getBoundingClientRect();
// // //             const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
// // //             const clientOffset = monitor.getClientOffset();
// // //             const hoverClientY = clientOffset.y - hoverBoundingRect.top;
// // //             const hoverClientX = clientOffset.x - hoverBoundingRect.left;

// //             if (dragIndex === hoverIndex) {
// //                 return;
// //             }

// //             if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
// //                 return;
// //             }

// //             if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
// //                 return;
// //             }

// //             // if (hoverClientX < hoverBoundingRect.width / 2) {
// //             //     moveItem(dragIndex, hoverIndex);
// //             //     item.index = hoverIndex;
// //             //   } else {
// //             //     moveItem(dragIndex, hoverIndex + 1);
// //             //     item.index = hoverIndex + 1;
// //             //   }

// //             moveItem(dragIndex, hoverIndex);
// //             item.index = hoverIndex;
// //         },
        
// //     });
// const Item = ({ item, index, moveItem, status}) => {
//     const ref = useRef(null);

//     const [, drop] = useDrop({
//         accept: ITEM_TYPE,
//         hover(item, monitor) {
//             if (!ref.current) {
//                 return;
//             }

//             const dragIndex = item.index;
//             const hoverIndex = index;
//             const hoverBoundingRect = ref.current.getBoundingClientRect();
//             if (!hoverBoundingRect) {
//                 return;
//             }
//             const hoverMiddleY = hoverBoundingRect.y + (hoverBoundingRect.height / 2);

//             //  if (!hoverBoundingRect) {
//             //     return;
//             // }

//             if (dragIndex === hoverIndex) {
//                 return;
//             }
                
//             // If dragging downwards
//             if (dragIndex < hoverIndex && monitor.getClientOffset().y < hoverMiddleY) {
//                 return;
//             }
            
//             // If dragging upwards
//             if (dragIndex > hoverIndex && monitor.getClientOffset().y > hoverMiddleY) {
//                 return;
//             }

//             moveItem(dragIndex, hoverIndex);
//             item.index = hoverIndex;
//         },
//     });



//     const [{ isDragging }, drag] = useDrag({
//         // item: { type: ITEM_TYPE,  ...item, index },
//         type: ITEM_TYPE,
//         item: () => ({ ...item, index }),
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging(),
//         }),
//     });

//     const [show, setShow] = useState(false);

//     const onOpen = () => setShow(true);

//     const onClose = () => setShow(false);

//     drag(drop(ref));

//     return (
//         <Fragment>
//             <div
//                 ref={ref}
//                 style={{ opacity: isDragging ? 0 : 1 }}
//                 className="item"
//                 onClick={onOpen}
//             >
//                 <div className={"color-bar"} style={{ backgroundColor: status.Color}} />
//                 <p className={"item-title"}>{item.content}</p>
//                 <p className={"item-status"}>{status.icon}</p>
//             </div>
//                 <Window
//                     item={item}
//                     onClose={onClose}
//                     show={show}
//                 />
//             </Fragment>
//     );
// }

// export default Item;

import React, { Fragment, useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Window from './Window';
import ITEM_TYPE from '../data/types';

const Item = ({ item, index, moveItem, status }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    // item: { type: ITEM_TYPE, index },
    type: ITEM_TYPE,
    item: () => ({ ...item, index }),
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  drag(drop(ref));

  return (
    <Fragment>
      <div
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
        className="item"
        onClick={onOpen}
      >
        <div className="color-bar" style={{ backgroundColor: status.color }} />
        <p className="item-title">{item.content}</p>
        <p className="item-status">{status.icon}</p>
      </div>
      <Window item={item} onClose={onClose} show={show} />
    </Fragment>
  );
};

export default Item;
