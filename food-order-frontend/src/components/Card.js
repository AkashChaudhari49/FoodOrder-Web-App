import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

const Card = ({ foodItem }) => {

    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    const [qnty, setQnty] = useState(1);
    const [size, setSize] = useState("");

    let options = foodItem.options[0];
    let priceOptions = Object.keys(options)


    const handleAddToCart = async () => {
        let food = []
        console.log(foodItem._id)
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;

                break;
            }
        }

        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qnty: qnty })
                return
            } else if (food.size !== size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, img: foodItem.img, qnty: qnty, size: size })
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, img: foodItem.img, qnty: qnty, size: size })
        await console.log(data);

    }

    let finalPrice = qnty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div>
                <div className="card mt-3 mx-2" style={{ "width": "15rem", "maxHeight": "360px" }}>
                    <img src={foodItem.img} className="card-img-top" alt='...' style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{foodItem.name}</h5>
                        <div className='container w-100'>
                            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onChange={(e) => setQnty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i} value={i + 1}> {i + 1}</option>
                                    )
                                })}
                            </select>

                            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>

                            <div className='d-inline h-100 fs-5'>Rs.{finalPrice}/-</div>
                        </div>

                    </div>
                    <hr />
                    <button className='btn btn-success justify-center mx-2' onClick={handleAddToCart}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card;