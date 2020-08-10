import React, { useEffect, useRef, useState, useContext } from "react";

import "./search.css";
import { ExpenseContext } from "../context/expense-context";

const Search = props => {
  const expRef = useRef();
  const [search, setSearch] = useState("");
  const [expenses, setExpenses, addUpTotal, setAddUpTotal] = useContext(
    ExpenseContext
  );
  const [totalCost, setTotalCost] = useState("");
  console.log(addUpTotal);
  let totalAmount;
  const loadedExpenses = [];
  let newArray = [];
  let TC = [];

  useEffect(() => {
    newArray = expenses.map(item => item);
    TC = newArray.reduce((a, b) => {
      return a + parseInt(b.amount);
    }, 0);
    setAddUpTotal(TC);
  }, [addUpTotal]);
  totalAmount = addUpTotal;

  const onSearchHandler = query => {
    setSearch(query);
    setTimeout(() => {
      if (query.length !== 0 && query === expRef.current.value) {
        fetch(
          `https://expense-tracker-db-9d27a.firebaseio.com/expenses.json?orderBy="item"&equalTo="${query}"&orderBy="paymentstatus"&equalTo="${query}"`
        )
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
            totalAmount = loadedExpenses.reduce((a, b) => {
              return a + parseInt(b.amount);
            }, 0);
            console.log(totalAmount);
            setAddUpTotal(totalAmount);
          });
      } else if (query.length === 0) {
        console.log("else part executed");
        fetch(`https://expense-tracker-db-9d27a.firebaseio.com/expenses.json`)
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
            console.log(loadedExpenses);
          })
          .then(() => {
            console.log(loadedExpenses);
            totalAmount = loadedExpenses.reduce((a, b) => {
              return a + parseInt(b.amount);
            }, 0);
            console.log(totalAmount);
            setAddUpTotal(totalAmount);
          });
      }
    }, 500);
  };
  console.log(`last: ${totalAmount}`);
  return (
    <div className="search-wrapper">
      <input
        type="text"
        ref={expRef}
        placeholder="Search..."
        onChange={event => {
          onSearchHandler(event.target.value);
        }}
      />

      <p>Total Amount: {totalAmount ? totalAmount : "-"}</p>
    </div>
  );
};

export default Search;
