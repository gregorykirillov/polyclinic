import React from 'react';
import useSWR from 'swr';

function SpecialtyCard({setSpeciality}) {
    const {data, error, isValidating} = useSWR('http://localhost:3001/api/get-specialties');

    if (error) return <div>failed to load</div>;
    if (!data || isValidating) return <div>loading...</div>;

    return (
        <div className="specialty_cards">
            {data.map(({specialty, id}) => {
                return (
                    <div key={id} className="specialty_card">
                        <button onClick={() => setDoctors(specialty)}>{specialty}</button>
                    </div>
                );
            })}
        </div>
    );
}

export default SpecialtyCard;
