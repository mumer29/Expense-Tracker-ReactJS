import React, { useState, useEffect } from "react";

export const ExpenseContext = React.createContext();

const ExpenseProvider = props => {
  const [expenses, setExpenses] = useState([]);
  const [addUpTotal, setAddUpTotal] = useState("");
  let totalPrice;
  const loadedExpenses = [];
  useEffect(() => {
    // https://react-hooks-db-51a7d.firebaseio.com/ingredients.json
    fetch("https://expense-tracker-db-9d27a.firebaseio.com/expenses.json")
      .then(response => response.json())
      .then(responseData => {
        if (responseData) {
          for (const key in responseData) {
            loadedExpenses.push({
              id: key,
              item: responseData[key].item,
              amount: responseData[key].amount,
              quantity: responseData[key].quantity,
              note: responseData[key].note,
              date: responseData[key].date,
              paymentmode: responseData[key].paymentmode,
              paymentstatus: responseData[key].paymentstatus
            });
          }
        } else {
          return false;
        }
        setExpenses(loadedExpenses);
      })
      .then(() => {
        console.log(loadedExpenses);
        let cost = loadedExpenses.map(item => item.amount);
        console.log(cost);
        totalPrice = loadedExpenses.reduce((a, b) => {
          return a + parseInt(b.amount);
        }, 0);
        console.log("Contecxt Price" + totalPrice);
        setAddUpTotal(totalPrice);
      });
  }, [setExpenses]);
  return (
    <ExpenseContext.Provider
      value={[expenses, setExpenses, addUpTotal, setAddUpTotal]}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
