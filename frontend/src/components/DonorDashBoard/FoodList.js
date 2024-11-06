import React, { useContext, useEffect, useState } from 'react';
import FoodItem from './FoodItem';
import './FoodItem.css'
import { FoodContext } from '../../context/FoodContext';
import { useAsyncError } from 'react-router';
const FoodList = () => {
    const { foodList } = useContext(FoodContext);

 
    return (
        <div className="row">
            {foodList.map((food, index) => (
                <FoodItem key={food.id || index} food={food} index={index} />
            ))}
        </div>
    );
};

export default FoodList;
