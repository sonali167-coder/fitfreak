import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaWater, FaDumbbell, FaWeight, FaCheckCircle } from "react-icons/fa";
import "react-circular-progressbar/dist/styles.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("fitfreakUser"));
  const preferences = JSON.parse(localStorage.getItem("fitfreakPrefs"));
  const [showEdit, setShowEdit] = useState(false);
  const [date, setDate] = useState(new Date());
  const [hydration, setHydration] = useState(60);
  const [workouts, setWorkouts] = useState(75);
  const [calories, setCalories] = useState(40);

  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("fitfreakTasks")) || {
      water: false,
      workout: false,
      weight: false,
    };
  });

  const [badges, setBadges] = useState(() => {
    return JSON.parse(localStorage.getItem("fitfreakBadges")) || [];
  });

  const [workoutDates, setWorkoutDates] = useState(() => {
    return JSON.parse(localStorage.getItem("fitfreakWorkoutDates")) || [];
  });

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const tips = [
    "Stay hydrated — drink at least 3L of water!",
    "Warm up for 5–10 mins before exercising.",
    "Prioritize sleep for better recovery.",
    "Track your progress weekly.",
    "Try meditation for mental clarity.",
    "Eat protein-rich meals after workouts.",
    "Don’t skip rest days — they’re crucial!",
    "Incorporate variety in your workouts.",
    "Focus on form, not just weight.",
    "Set realistic goals and celebrate small wins.",
    "Listen to your body — rest if needed.",
    "Join a community for motivation.",
  ];

  const today = new Date().getDay();
  const dailyTip = tips[today];
  const todayDate = new Date().toDateString();

  const lastVisit = localStorage.getItem("fitfreakLastVisit");
  let streak = parseInt(localStorage.getItem("fitfreakStreak")) || 0;

  if (lastVisit !== todayDate) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (new Date(lastVisit).toDateString() === yesterday.toDateString()) {
      streak += 1;
    } else {
      streak = 1;
    }
    localStorage.setItem("fitfreakStreak", streak);
    localStorage.setItem("fitfreakLastVisit", todayDate);
  }

  const handleTaskDone = (taskKey) => {
    const updated = { ...tasks, [taskKey]: true };
    setTasks(updated);
    localStorage.setItem("fitfreakTasks", JSON.stringify(updated));

    const allDone = Object.values(updated).every(Boolean);
    if (allDone && !badges.includes("Daily Streak")) {
      const updatedBadges = [...badges, "Daily Streak"];
      setBadges(updatedBadges);
      localStorage.setItem("fitfreakBadges", JSON.stringify(updatedBadges));
    }
  };

  const handleMarkWorkout = () => {
    const dateStr = date.toDateString();
    if (!workoutDates.includes(dateStr)) {
      const updated = [...workoutDates, dateStr];
      setWorkoutDates(updated);
      localStorage.setItem("fitfreakWorkoutDates", JSON.stringify(updated));
    }
  };

  const progressData = [
    { day: "Mon", weight: 70 },
    { day: "Tue", weight: 69.6 },
    { day: "Wed", weight: 69.4 },
    { day: "Thu", weight: 69.3 },
    { day: "Fri", weight: 69 },
    { day: "Sat", weight: 68.8 },
    { day: "Sun", weight: 68.7 },
  ];

  return (
    <div className="p-6 bg-black min-h-screen text-white space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-orange-400">
          Welcome back, {user?.name} 💪
        </h2>
        <button onClick={() => setShowEdit(true)} className="btn-orange">
          Edit Profile
        </button>
      </div>

      {/* Tips & Streak */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-card animate-fadeIn">
          <h3 className="text-orange-300 font-bold mb-2">💡 Daily Tip</h3>
          <p className="text-gray-300 italic">{dailyTip}</p>
        </div>
        <div className="glass-card text-center animate-fadeIn">
          <h3 className="text-orange-300 font-bold">🔥 Streak</h3>
          <p className="text-2xl mt-2">{streak}-Day Fitness Streak!</p>
        </div>
      </div>

      {/* Progress Rings */}
      <div className="flex space-x-4 justify-center">
        {[["Hydration", hydration], ["Workouts", workouts], ["Calories", calories]].map(
          ([label, value], i) => (
            <div key={i} className="ring-card">
              <CircularProgressbar
                value={value}
                text={`${value}%`}
                styles={buildStyles({
                  pathColor: "#ff6a00",
                  textColor: "#fff",
                  trailColor: "#333",
                })}
              />
              <p className="text-xs mt-2 text-orange-300">{label}</p>
            </div>
          )
        )}
      </div>

      {/* Daily Tasks */}
      <div className="glass-card mb-6 border-orange-500 animate-fadeIn">
        <h3 className="text-lg font-bold text-orange-400 mb-3">
          🗒️ Daily Tasks
        </h3>
        {[
          { key: "water", label: "Drink Water", icon: <FaWater className="text-blue-400" /> },
          { key: "workout", label: "Do Workout", icon: <FaDumbbell className="text-red-400" /> },
          { key: "weight", label: "Log Weight", icon: <FaWeight className="text-green-400" /> },
        ].map(({ key, label, icon }) => (
          <div key={key} className="flex items-center justify-between border-b border-[#333] py-2">
            <span className="flex items-center gap-2">{icon} {label}</span>
            {tasks[key] ? (
              <FaCheckCircle className="text-green-500 text-lg" />
            ) : (
              <button onClick={() => handleTaskDone(key)} className="btn-sm">
                Mark Done
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="glass-card">
        <h3 className="text-lg text-orange-300 font-bold mb-4">
          📅 Workout Calendar
        </h3>
        <Calendar
          onChange={setDate}
          value={date}
          className="bg-black text-white rounded border border-orange-500"
          tileClassName={({ date }) =>
            workoutDates.includes(date.toDateString())
              ? "bg-orange-400 text-black font-bold rounded"
              : ""
          }
        />
        <button onClick={handleMarkWorkout} className="btn-orange mt-4">
          ✅ Mark Workout for {date.toDateString()}
        </button>
      </div>

      {/* Badges */}
      <div className="glass-card">
        <h3 className="text-lg text-orange-300 font-bold mb-2">🏅 Achievements</h3>
        <div className="flex flex-wrap gap-2">
          {["Daily Streak", "10 Workouts", "Logged for 7 Days"].map((badge) => (
            <span key={badge} className={`badge ${badges.includes(badge) ? "earned" : "locked"}`}>
              {badges.includes(badge) ? "🏆" : "🔒"} {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Weight Progress */}
      <div className="glass-card">
        <h3 className="text-xl font-bold text-orange-300 mb-4">
          📈 Weight Progress
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={progressData}>
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis unit="kg" stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: "#222", borderColor: "#ff6a00", color: "#fff" }}
              labelStyle={{ color: "#ff6a00" }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#ff6a00"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {showEdit && <EditProfile user={user} onClose={() => setShowEdit(false)} />}
    </div>
  );
};

export default Dashboard;
