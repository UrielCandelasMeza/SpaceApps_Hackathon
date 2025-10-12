import React, { useState } from 'react';

const DataCard = ({ type, file }) => {
    // 1. Estado para controlar si el mouse está sobre la tarjeta
    const [isHovered, setIsHovered] = useState(false);

    // Clase base de Tailwind (mantenemos solo las clases de estructura y color)
    const baseClasses = "w-full border-2 border-white rounded-2xl p-4 text-center flex flex-col items-center justify-center space-y-1";

    return (
        <button 
            // 2. Controladores de eventos para cambiar el estado
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}

            className={`
                ${baseClasses} 
                card-base 
                ${isHovered ? 'card-hover-glow card-elevate' : ''}
            `}
        >
            <span className="text-sm font-light text-gray-300 tracking-wider">{type}</span>
            <span className="text-base font-bold text-white tracking-widest">{file}</span>
        </button>
    );
};
const InfoBox = ({ content }) => {
    const isTeamList = Array.isArray(content.text) && content.text.length > 1;
    const hasCards = Array.isArray(content.cards); 

    return (
        <div className="text-center  rounded-lg ">
            
            <h2 className="text-3xl font-bold text-white mb-4 uppercase">
                {content.title}
            </h2>
            {hasCards ? (
                <div className="flex justify-between space-x-4 text-glow-white">
                    {content.cards.map((card, index) => (
                        <DataCard 
                            key={index} 
                            type={card.type} 
                            file={card.file} 
                        />
                    ))}
                </div>
            ) :
            isTeamList ? (
                <ul className="text-sm text-gray-300 list-none p-0 space-y-1">
                    {content.text.map((member, index) => (
                        <li key={index} className="opacity-80 hover:opacity-100 transition-opacity">
                            {member}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-300">
                    {content.text}
                </p>
            )}
        </div>
    );
};
export default InfoBox;