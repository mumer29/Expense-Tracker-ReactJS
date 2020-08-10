import React from "react";
import Navigation from "./Navigation/navigation";

import { Route } from "react-router-dom";
// import "./App.css";
// import ExpenseList from "./Expenselist/ExpenseList";
import ExpenseList from "./Expenselist/Expenselist";
import AddExpense from "./AddExpense/AddExpense";
import ExpenseProvider from "./context/expense-context";
import EditExpense from "./EditExpense/EditExpense";

function App() {
  return (
    <ExpenseProvider>
      <div className="App">
        <Navigation />
        <main>
          <Route path="/expenses/:id" component={EditExpense} exact />
          <Route path="/" component={ExpenseList} exact />
          <Route path="/add-expense" component={AddExpense} exact />
        </main>
      </div>
    </ExpenseProvider>
  );
}

export default App;
