import React, { useState, useEffect } from "react";
import { fetchMeteors } from "./api";
import YearAutocomplete from "./components/YearAutocomplete";
import MeteorList from "./components/MeteorList";
import "./App.css";

type Meteor = {
    id: string;
    name: string;
    mass?: string;
    year?: string;
};

const App: React.FC = () => {
    const [meteors, setMeteors] = useState<Meteor[]>([]);
    const [year, setYear] = useState<string | null>(null);
    const [mass, setMass] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMeteors = async () => {
            setLoading(true);
            try {
                const response = await fetchMeteors({ year, mass });
                setMeteors(response.data.data);
            } catch (error) {
                console.error("Error fetching meteors:", error);
            } finally {
                setLoading(false);
            }
        };

        getMeteors();
    }, [year, mass]);

    return (
        <div className="container">
            <h1>Meteor Search</h1>
            <YearAutocomplete onYearSelect={(year) => setYear(year)} />
            <input
                type="number"
                placeholder="Enter minimum mass"
                onChange={(e) => setMass(Number(e.target.value) || null)}
            />
            {loading ? <p>Loading...</p> : <MeteorList meteors={meteors} />}
        </div>
    );
};

export default App;
