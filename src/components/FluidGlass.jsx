import React from 'react';

const LGContainer = ({  contentClass = '',
                         config = {},
                         children }) => {

    const defaultConfig = {
        width: 300,
        height: 500,
        radius: 50,
        bevelWidth: 0.1,
        bevelBlur: 7,
        backgroundBlur:2,
        warpAmount: 3.3,
        warpDistance: 50,
        warpDirection: -180,
        caAmount: 0,
    };

    const finalConfig = {
        ...defaultConfig,
        ...config
    };

    const id = `lgc-${Math.random() * 100}`

    const filter = () => {
        const borderX = Math.min(finalConfig.width, finalConfig.height) * (finalConfig.bevelWidth * 0.5);
        const rad = finalConfig.radius - (finalConfig.bevelWidth * 50)

        const svg = `
<svg class="displacement-image" viewBox="0 0 ${finalConfig.width} ${finalConfig.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${id}-red" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0000"/>
      <stop offset="100%" stop-color="red"/>
    </linearGradient>
    <linearGradient id="${id}-blue" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0000"/>
      <stop offset="100%" stop-color="blue"/>
    </linearGradient>
  </defs>

    <!-- backdrop -->
    <rect x="0" y="0" width="${finalConfig.width}" height="${finalConfig.height}" fill="black"></rect>

    <!-- red linear -->
    <rect x="0" y="0" width="${finalConfig.width}" height="${finalConfig.height}" rx="${finalConfig.radius}" fill="url(#${id}-red)" />

     <!-- blue linear -->
    <rect x="0" y="0" width="${finalConfig.width}" height="${finalConfig.height}" rx="${finalConfig.radius}" fill="url(#${id}-blue)" style="mix-blend-mode: difference" />

    <!-- block out distortion -->
    <rect
      x="${borderX}"
      y="${Math.min(finalConfig.width, finalConfig.height) * (finalConfig.bevelWidth * 0.5)}"
      width="${finalConfig.width - borderX * 2}"
      height="${finalConfig.height - borderX * 2}"
      rx="${rad}"
      fill="hsl(0 0% ${finalConfig.warpDistance}% / ${1 - finalConfig.warpAmount})"
      style="filter:blur(${finalConfig.bevelBlur}px)" />
    </svg>`;

        const encoded = encodeURIComponent(svg);
        const dataUri = `data:image/svg+xml,${encoded}`;

        return dataUri;
    }

    const caMask = () => {

        const borderX = Math.min(finalConfig.width, finalConfig.height) * (finalConfig.bevelWidth * 0.5)
        const rad = finalConfig.radius - (finalConfig.bevelWidth * 50)

        let svg = `
            <svg viewBox="0 0 ${finalConfig.width} ${finalConfig.height}" xmlns="http://www.w3.org/2000/svg">
                <rect x="${borderX}"
                y="${Math.min(finalConfig.width, finalConfig.height) * (finalConfig.bevelWidth * 0.5)}"
                width="${finalConfig.width - borderX * 2}"
                height="${finalConfig.height - borderX * 2}"
                rx="${rad}"
                fill="black" style="filter:blur(${finalConfig.bevelBlur}px)"/>
            </svg>`

        const encoded = encodeURIComponent(svg)
        const dataUri = `data:image/svg+xml,${encoded}`

        return dataUri
    }


    const containerStyles = {
        width: `${finalConfig.width}px`,
        height: `${finalConfig.height}px`,
        borderRadius: `${finalConfig.radius}px`,
        backdropFilter: `url(#${id}-filter) blur(${finalConfig.backgroundBlur * 0.1}px)`,
        boxShadow: `inset 0 0 2px 1px rgba(255,255,255, 0.3), inset 0 0 10px 1px rgba(255,255,255, 0.3), 0 10px 20px rgba(0,0,0, 0.2)`,
        position: `relative`,
        overflow: `hidden`,
        display: `flex`,
    };

    const filterStyles = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        touchAction: 'none',
        pointerEvents: 'none'
    }

    return (
        <div className="LGContainer" style={containerStyles}>
            <div className={contentClass}>
                {children}
            </div>


            {finalConfig.caAmount === 0 &&
            <svg className="LGFilter" style={filterStyles} xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id={`${id}-filter`} colorInterpolationFilters="RGB">
                        <feImage x="0" y="0" width="100%" height="100%" result="map" href={filter()}/>
                        <feDisplacementMap
                            in2="map"
                            in="SourceGraphic"
                            yChannelSelector="B"
                            xChannelSelector="R"
                            scale={finalConfig.warpDirection}
                        />
                    </filter>
                </defs>
            </svg>
            }


            {finalConfig.caAmount > 0 &&
                <svg className="LGFilter" style={filterStyles} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id={`${id}-filter`} colorInterpolationFilters="sRGB">
                            <feImage x="0" y="0" width="100%" height="100%" result="map" href={filter()}/>
                            <feDisplacementMap
                                in2="map"
                                in="SourceGraphic"
                                yChannelSelector="B"
                                xChannelSelector="R"
                                result="lg"
                                scale={finalConfig.warpDirection}
                            />

                            <feColorMatrix in="lg" values="1 0 0 0 0
														0 0 0 0 0
														0 0 0 0 0
														0 0 0 1 0"/>
                            <feOffset dx={finalConfig.caAmount} result="cr"/>
                            <feColorMatrix in="lg" values="0 0 0 0 0
														0 1 0 0 0
														0 0 0 0 0
														0 0 0 1 0"/>
                            <feOffset dy={finalConfig.caAmount} result="cg"/>
                            <feColorMatrix in="lg" values="0 0 0 0 0
														0 0 0 0 0
														0 0 1 0 0
														0 0 0 1 0" result="cb"/>
                            <feBlend in="cr" in2="cb" result="b1" mode="screen"/>
                            <feBlend in="cg" in2="b1" mode="screen" result="ca"/>

                            <feImage x="0" y="0" width="100%" height="100%" result="caMask" href={caMask()}/>

                            <feComponentTransfer in="caMask" result="edge-mask">
                                <feFuncA type="table" tableValues="1 0"/>
                            </feComponentTransfer>

                            <feComposite in="ca" in2="edge-mask" operator="in" result="masked-blur"/>

                            <feMerge>
                                <feMergeNode in="lg"/>
                                <feMergeNode in="masked-blur"/>
                            </feMerge>
                        </filter>
                    </defs>
                </svg>
            }
        </div>
    );
};
export { LGContainer };
export default LGContainer;