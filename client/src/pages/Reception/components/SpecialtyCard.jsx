import React from 'react';
import useSWR from 'swr';

function SpecialtyCard({ setDoctors }) {
    const { data, error } = useSWR('http://localhost:3001/api/get-specialties')

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <div className="specialty_cards">
            {data.map((val) => {
                return (
                    <div className="specialty_card">
                        <button onClick={() => setDoctors(val.specialty)}>{val.specialty}</button>
                    </div>
                )
            })}
        </div>
    )
}

export default SpecialtyCard