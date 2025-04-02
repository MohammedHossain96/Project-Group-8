import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Auth from '../utils/auth';
const Home = () => {
    const [steps, setSteps] = useState(0);
    const [workoutLog, setWorkoutLog] = useState('');
    const [calories, setCalories] = useState({
        goal: 2000,
        consumed: 1200,
        remaining: 800
    });
    const [showFoodForm, setShowFoodForm] = useState(false);
    const [foodItem, setFoodItem] = useState({
        name: '',
        calories: 0
    });
    const handleAddStep = () => {
        setSteps(currentSteps => currentSteps + 1);
    };
    const handleSaveLog = () => {
        if (!workoutLog.trim()) {
            alert('Please enter a workout log before saving.');
            return;
        }
        // In a real app, this would save to the database
        alert(`Workout log saved: ${workoutLog}`);
        // Clear the textarea after saving
        setWorkoutLog('');
    };
    const handleAddFood = () => {
        setShowFoodForm(true);
    };
    const handleFoodSubmit = (e) => {
        e.preventDefault();
        if (!foodItem.name || foodItem.calories <= 0) {
            alert('Please enter a valid food name and calorie amount.');
            return;
        }
        // Update calories consumed and remaining
        const newConsumed = calories.consumed + foodItem.calories;
        const newRemaining = calories.goal - newConsumed;
        setCalories({
            ...calories,
            consumed: newConsumed,
            remaining: newRemaining
        });
        // Reset form
        setFoodItem({ name: '', calories: 0 });
        setShowFoodForm(false);
        alert(`Added ${foodItem.name} (${foodItem.calories} calories)`);
    };
    const handleCancelFood = () => {
        setShowFoodForm(false);
        setFoodItem({ name: '', calories: 0 });
    };
    return (_jsxs("div", { className: "container", children: [_jsx("h1", { className: "left-align", style: { marginTop: '30px', marginBottom: '30px', width: '100%', textAlign: 'left' }, children: "Fitness Tracker" }), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col s12 m6", children: _jsx("div", { className: "card", children: _jsxs("div", { className: "card-content", children: [_jsx("span", { className: "card-title", children: "Steps Today" }), _jsx("p", { className: "flow-text", children: steps }), _jsx("button", { className: "btn", onClick: handleAddStep, children: "Add Step" })] }) }) }), _jsx("div", { className: "col s12 m6", children: _jsx("div", { className: "card", children: _jsxs("div", { className: "card-content", children: [_jsx("span", { className: "card-title", children: "Workout Log" }), _jsx("textarea", { className: "materialize-textarea", placeholder: "Log your workouts here...", value: workoutLog, onChange: (e) => setWorkoutLog(e.target.value) }), _jsx("button", { className: "btn green", onClick: handleSaveLog, children: "Save Log" })] }) }) })] }), _jsx("div", { className: "row", children: _jsx("div", { className: "col s12", children: _jsx("div", { className: "card", children: _jsxs("div", { className: "card-content", children: [_jsx("span", { className: "card-title", children: "Calorie Tracker" }), !showFoodForm ? (_jsxs("div", { className: "row", children: [_jsxs("div", { className: "col s12 m6", children: [_jsxs("p", { children: ["Daily Goal: ", calories.goal.toLocaleString(), " calories"] }), _jsxs("p", { children: ["Consumed: ", calories.consumed.toLocaleString(), " calories"] }), _jsxs("p", { children: ["Remaining: ", calories.remaining.toLocaleString(), " calories"] })] }), _jsx("div", { className: "col s12 m6", style: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }, children: _jsx("button", { className: "btn blue", onClick: handleAddFood, children: "Add Food" }) })] })) : (_jsxs("form", { onSubmit: handleFoodSubmit, children: [_jsxs("div", { className: "row", children: [_jsx("div", { className: "col s12 m6", children: _jsxs("div", { className: "input-field", children: [_jsx("label", { htmlFor: "foodName", children: "Food Name" }), _jsx("input", { type: "text", id: "foodName", value: foodItem.name, onChange: (e) => setFoodItem({ ...foodItem, name: e.target.value }), required: true })] }) }), _jsx("div", { className: "col s12 m6", children: _jsxs("div", { className: "input-field", children: [_jsx("label", { htmlFor: "foodCalories", children: "Calories" }), _jsx("input", { type: "number", id: "foodCalories", value: foodItem.calories || '', onChange: (e) => setFoodItem({ ...foodItem, calories: parseInt(e.target.value) || 0 }), required: true, min: "1" })] }) })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'flex-end', gap: '10px' }, children: [_jsx("button", { type: "button", className: "btn red", onClick: handleCancelFood, children: "Cancel" }), _jsx("button", { type: "submit", className: "btn green", children: "Add" })] })] }))] }) }) }) }), !Auth.loggedIn() && (_jsx("div", { className: "card", children: _jsxs("div", { className: "card-content", children: [_jsx("span", { className: "card-title", children: "Get More Features" }), _jsx("p", { children: "Sign up or log in to track your progress over time and access more features!" }), _jsxs("div", { children: [_jsx("a", { href: "/login", className: "btn", children: "Login" }), _jsx("a", { href: "/signup", className: "btn", style: { marginLeft: '10px' }, children: "Sign Up" })] })] }) }))] }));
};
export default Home;
