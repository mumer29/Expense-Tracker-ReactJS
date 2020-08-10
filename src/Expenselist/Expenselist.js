import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./expenselist.css";

import { ExpenseContext } from "../context/expense-context";
// import Search from "..se/Search/search";
import Search from "../Search/search";
const ExpenseList = props => {
  console.log(props);

  const [expenses, setExpenses] = useContext(ExpenseContext);
  useEffect(() => {
    "executed";
  }, [props]);
  const removeExpense = Expid => {
    console.log(Expid);
    fetch(
      `https://expense-tracker-db-9d27a.firebaseio.com/expenses/${Expid}.json`,
      {
        method: "DELETE"
      }
    ).then(response => {
      setExpenses(prevExp => prevExp.filter(item => item.id !== Expid));
    });
  };
  const handleSingleExpense = expenseId => {
    console.log(expenseId);
  };
  let filteredCost = [];
  let TT = [];

  console.log(expenses);
  filteredCost = expenses.map(item => {
    return item.amount;
  });
  TT = filteredCost.reduce((a, b) => {
    return a + b;
  }, 0);

  console.log(TT);
  return (
    <div>
      <Search />
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Payment Status</th>
            <th>Payment Mode</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id} onClick={() => handleSingleExpense(exp.id)}>
              <td>
                <Link to={"/expenses/" + exp.id} exact>
                  {exp.item}
                </Link>
              </td>
              <td>{exp.amount}</td>
              <td>{exp.quantity}</td>
              <td>{exp.date}</td>
              <td>{exp.paymentstatus}</td>
              <td>{exp.paymentmode}</td>
              <td>{exp.note}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    removeExpense(exp.id);
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;