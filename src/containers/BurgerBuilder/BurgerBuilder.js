import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Ayx from '../../huk/Ayx/Ayx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../huk/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
       this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            return sum > 0
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Ayx>
                    <Burger ingredients={ this.props.ings } />
                    <BuildControls
                        ingredientAdded={ this.props.onIngredientAdded }
                        ingredientRemove={ this.props.onIngredientRemoved }
                        disabled={ disabledInfo }
                        purchasable={ this.updatePurchaseState(this.props.ings) }
                        ordered={ this.purchaseHandler }
                        price={ this.props.price } />
                </Ayx>
            );
            orderSummary = <OrderSummary
                ingredients={ this.props.ings }
                price={ this.props.price }
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }

        
        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

        

        return (
            <Ayx>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                { burger }
            </Ayx>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));