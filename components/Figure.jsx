"use client";
import { useState, memo } from 'react';
import useAuth from '@/hooks/useAuth'
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';

function Figure({ url, cat, index, name, colors, setDcolor, setUpWindow, setNova, id, array, width, height }) {

    const [imageLoaded, setImageLoaded] = useState(false);

    const aspectRatio = width && height ? `${width}/${height}` : 'auto';

    const slugify = (text) => {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");
    }

    const query = new URLSearchParams({
        bgc: colors[0],
        url: url,
        name: name,
        w: width,
        h: height,
        cat: cat
    }).toString();

    const targetPath = `/${slugify(cat)}/${id}?${query}`;

    const handleMouseEnter = () => {
        const img = new window.Image();
        img.src = url.replace(/\s/g, '%20');
    };

    return (
        <Link href={targetPath}>
            <figure onMouseEnter={handleMouseEnter} style={{ "--cor": colors[0], "--bg": colors[0] + 22, "--index": index + 40 }}
                className={`item grid place-items-center group shadow-none relative group backdrop-blur-sm `}>

                <div className={`bg-[--bg] relative overflow-hidden [clip-path:url('#squircle-mask')] [-webkit-clip-path:url('#squircle-mask')] ${imageLoaded ? 'loaded' : ''}`}
                    style={{ aspectRatio }}>
                    <article className='absolute inset-0 transition-all duration-400 animate-[placehold_calc(var(--index)*0.1s)_linear_infinite_forwards] bg-size-[268px_100%] bg-[--bg] bg-[linear-gradient(to_right,#bbb_-10%,var(--bg)_18%,#bbb_53%)] blur-[15px] placeholder' />

                    <Image src={url.replace(/\s/g, '%20')} alt={name} width={width} height={height} loading="lazy" decoding="async"
                        className={`mix-blend-darken transition-all duration-500 opacity-0`}
                        onLoad={() => setTimeout(() => setImageLoaded(true), 100)}
                    />
                </div>

                <figcaption style={{ viewTransitionName: `caption-${id}` }} className='flex flex-col justify-end text-left'>
                    <fieldset>
                        <legend className="text-xs leading-none text-gray-50 ">{cat}</legend>
                        <span className='text-base text-gray-50 font-semibold !leading-[1] block text-balance'>{name}</span>
                    </fieldset>
                </figcaption>
            </figure>
        </Link>
    );
};
export default memo(Figure)
