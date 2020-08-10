import React, { useEffect, useState, useContext } from "react";
// import PropTypes from "prop-types";
import { ExpenseContext } from "../context/expense-context";
import "../AddExpense/addexpense.css";

const EditExpense = props => {
  console.log(props.match.params.id);
  const [editItem, seteditItem] = useState("");
  const [editAmount, seteditAmount] = useState("");
  const [editQuantity, seteditQuantity] = useState("");
  const [editDate, seteditDate] = useState("");
  const [editPaymentMode, seteditPaymentMode] = useState("");
  const [editPaymentstatus, seteditPaymentStatus] = useState("");
  const [editNote, seteditNote] = useState("");
  const [expenses, setExpenses, addUpTotal, setAddUpTotal] = useContext(
    ExpenseContext
  );
  const singleExpenseId = props.match.params.id;
  let filteredArray = [];
  let filteredCost = [];
  // console.log(singleExpenseId);
  // console.log(props);
  useEffect(() => {
    if (singleExpenseId.length !== 0) {
      fetch(
        `https://expense-tracker-db-9d27a.firebaseio.com/expenses/${singleExpenseId}.json`
      )
        .then(response => response.json())
        .then(responseData => {
          seteditItem(responseData ? responseData.item : "");
          seteditAmount(responseData ? responseData.amount : "");
          seteditQuantity(responseData ? responseData.quantity : "");
          seteditDate(responseData ? responseData.date : "");
          seteditPaymentMode(responseData ? responseData.paymentmode : "");
          seteditPaymentStatus(responseData ? responseData.paymentstatus : "");
          seteditNote(responseData ? responseData.note : "");
        });
    }
  }, []);

  const editHandler = event => {
    event.preventDefault();
    const expenseData = {
      item: editItem,
      amount: editAmount,
      quantity: editQuantity,
      date: editDate,
      paymentmode: editPaymentMode,
      paymentstatus: editPaymentstatus,
      note: editNote
    };
    fetch(
      `https://expense-tracker-db-9d27a.firebaseio.com/expenses/${singleExpenseId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(expenseData),
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        filteredArray = expenses.filter(expId => expId.id != singleExpenseId);

        console.log("after filtering");
        console.log(expenseData);
        console.log(filteredArray);
        setExpenses([
          ...filteredArray,
          { id: singleExpenseId, ...expenseData }
        ]);
      })
      .then(() => {
        console.log("after editing item");
        console.log(expenses);

        props.history.push("/");
      });
  };

  return (
    <form onSubmit={editHandler}>
      <h3> Expense Form</h3>
      <div className="form-fields">
        <div>
          <label for="item">Item Name:</label>
          <br />
          <input
            type="text"
            value={editItem}
            onChange={event => {
              seteditItem(event.target.value);
            }}
            required
          />
        </div>
        <div>
          <label for="amount">Amount:</label>
          <br />
          <input
            type="text"
            value={editAmount}
            onChange={event => {
              seteditAmount(event.target.value);
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
            value={editQuantity}
            onChange={event => {
              seteditQuantity(event.target.value);
            }}
          />
        </div>
        <div>
          <label for="date">Date:</label>
          <br />
          <input
            type="text"
            value={editDate}
            onChange={event => {
              seteditDate(event.target.value);
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
            value={editPaymentstatus}
            onChange={event => {
              seteditPaymentStatus(event.target.value);
            }}
            required
          />
        </div>
        <div>
          <label for="paymentmode">Payment Mode:</label>
          <br />
          <input
            type="text"
            value={editPaymentMode}
            onChange={event => {
              seteditPaymentMode(event.target.value);
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
            value={editNote}
            onChange={event => {
              seteditNote(event.target.value);
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
export default EditExpense;