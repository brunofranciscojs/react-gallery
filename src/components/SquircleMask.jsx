export default function SquircleMask({ smoothness = 0.02 }) {
    return (
        <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
                <clipPath id="squircle-mask" clipPathUnits="objectBoundingBox">
                    <path d={`M 0.5 0 
                              C ${smoothness} 0 0 ${smoothness} 0 0.5 
                              C 0 ${1-smoothness} ${smoothness} 1 0.5 1 
                              C ${1-smoothness} 1 1 ${1-smoothness} 1 0.5 
                              C 1 ${smoothness} ${1-smoothness} 0 0.5 0 Z`} 
                    />
                </clipPath>
            </defs>
        </svg>
    );
}