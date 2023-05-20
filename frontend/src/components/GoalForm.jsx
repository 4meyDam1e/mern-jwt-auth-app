import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalsSlice";

function GoalForm() {
    const [text, setText] = useState("");

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(createGoal({ text }));
        setText("");
    };

    return (
        <>
            <section className="form">
                <form onSubmit={onSubmit} className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input 
                        type="text" 
                        name="text" 
                        id="text" 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} />
                    <button className="btn btn-block" type="submit">Add Goal</button>
                </form>
            </section>
        </>
    )
}

export default GoalForm