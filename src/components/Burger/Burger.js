import React, { Component } from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const Burger = (props) => {
    let transformedIngedients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={ igKey + i } type={ igKey } />
            }); 
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
        if (transformedIngedients.length === 0) {
            transformedIngedients = <p>Please start adding ingredients!</p>
        }
    console.log(transformedIngedients);
    return (
        <div className={ classes.Burger }>
            <BurgerIngredient type="bread-top" />
            {transformedIngedients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;