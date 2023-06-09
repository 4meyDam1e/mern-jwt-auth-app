import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalsSlice";

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get and destructure the auth slice
    const { user } = useSelector((state) => state.auth);
    // Get and destructure the goals slice
    const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        }

        dispatch(getGoals());

        return () => {
            dispatch(reset());
        };
    }, [user, isError, message, navigate, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>

            <GoalForm />

            <section className="content">
                {goals.length > 0 ? (
                    <div className="goals">
                        {goals.map((goal) => (
                            <GoalItem key={goal._id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <h3>
                        You have not set any goals
                    </h3>
                )}
            </section>
        </>
    );
}

export default Dashboard;