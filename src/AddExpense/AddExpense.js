import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { ExpenseContext } from "../context/expense-context";
import "./addexpense.css";

const AddExpense = props => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentstatus, setPaymentStatus] = useState("");
  const [note, setNote] = useState("");
  const [expenses, setExpenses] = useContext(ExpenseContext);
  const submitHandler = event => {
    event.preventDefault();
    const expenseData = {
      item: item,
      amount: amount,
      quantity: quantity,
      date: date,
      paymentmode: paymentMode,
      paymentstatus: paymentstatus,
      note: note
    };

    fetch("https://expense-tracker-db-9d27a.firebaseio.com/expenses.json", {
      method: "POST",
      body: JSON.stringify(expenseData),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        setExpenses(prevExp => [
          ...prevExp,
          { id: responseData.name, ...expenseData }
        ]);
      })
      .then(() => {
        setAmount("");
        setItem("");
        setNote("");
        setPaymentMode("");
        setPaymentStatus("");
        setQuantity("");
        setDate("");
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <h3>Add Expense Form</h3>
      <div className="form-fields">
        <div>
          <label for="item">Item Name:</label>
          <br />
          <input
            type="text"
            value={item}
            onChange={event => {
              setItem(event.target.value);
            }}
            required
          />
        </div>
        <div>
          <label for="amount">Amount:</label>
          <br />
          <input
            type="text"
            value={amount}
            onChange={event => {
              setAmount(event.target.value);
            }}
            required
          />
        </div>
      </div>
      <div className="form-fields">
        <div>
          <label for="quantity">Quantity:</label>
          <br />
          <input
            type="text"
            value={quantity}
            onChange={event => {
              setQuantity(event.target.value);
            }}
          />
        </div>
        <div>
          <label for="date">Date:</label>
          <br />
          <input
            type="text"
            value={date}
            onChange={event => {
              setDate(event.target.value);
            }}
            required
          />
        </div>
      </div>
      <div className="form-fields">
        <div>
          <label for="paymentstatus">Payment Status:</label>
          <br />
          <input
            type="text"
            value={paymentstatus}
            onChange={event => {
              setPaymentStatus(event.target.value);
            }}
            required
          />
        </div>
        <div>
          <label for="paymentmode">Payment Mode:</label>
          <br />
          <input
            type="text"
            value={paymentMode}
            onChange={event => {
              setPaymentMode(event.target.value);
            }}
            required
          />
        </div>
      </div>
      <div className="form-fields">
        <div>
          <label for="note">Note:</label>
          <br />
          <input
            type="text"
            value={note}
            onChange={event => {
              setNote(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-fields">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
export default AddExpense;
