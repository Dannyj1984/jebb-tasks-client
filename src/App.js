import React from "react";
import Tasks from "./Tasks";
import { Paper, TextField } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";
import "./App.css";

class App extends Tasks {
    state = { tasks: [], currentTask: "" };
    render() {

        var curr = new Date(); // get current date
        curr.setHours(0, 0, 0, 0);
        var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
        curr.setHours(0, 0, 0, 0);

        // ✅ Format a date to YYYY-MM-DD (or any other format)
        function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
        }

        function formatDate(date) {
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
        }

        var firstday = new Date(curr).toString().substring(0,15)


        const { tasks } = this.state;
        return (
            <div className="App flex">
                <Paper elevation={24} className="container">
                    <div className="heading">{`Jebb's weekly tasks for w/c ${firstday}`}</div>
                    <form
                        onSubmit={this.handleSubmit}
                        className="flex"
                        style={{ margin: "15px 0" }}
                    >
                        <TextField
                            variant="outlined"
                            size="small"
                            style={{ width: "80%" }}
                            value={this.state.currentTask}
                            required={true}
                            onChange={this.handleChange}
                            placeholder="Add New task"
                        />
                        <Button
                            style={{ height: "40px" }}
                            color="primary"
                            variant="outlined"
                            type="submit"
                        >
                            Add task
                        </Button>
                    </form>
                    <div>
                        {tasks.map((task) => (
                            <Paper
                                key={task._id}
                                className="flex task_container"
                            >
                                <Checkbox
                                    checked={task.completed}
                                    onClick={() => this.handleUpdate(task._id)}
                                    color="primary"
                                />
                                <div
                                    className={
                                        task.completed
                                            ? "task line_through"
                                            : "task"
                                    }
                                >
                                    {task.task}
                                </div>
                                <Button
                                    onClick={() => this.handleDelete(task._id)}
                                    color="secondary"
                                >
                                    delete
                                </Button>
                            </Paper>
                        ))}
                    </div>
                </Paper>
            </div>
        );
    }
}

export default App;
