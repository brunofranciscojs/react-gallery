(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Imagem.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Imagem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$image$2d$zooom$2f$lib$2f$react$2d$image$2d$zooom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-image-zooom/lib/react-image-zooom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useAuth.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function Imagem() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const imageId = params?.imageId;
    const [image, setImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [relatedImages, setRelatedImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const bgc = decodeURIComponent(searchParams.get("bgc"));
    const { logado } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const [confirmation, setConfirmation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ren, setRen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const slugify = (text)=>{
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Imagem.useEffect": ()=>{
            if (!imageId) return;
            const fetchImage = {
                "Imagem.useEffect.fetchImage": async ()=>{
                    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('imagens').select('url, nome, categoria, id, width, height').eq('id', imageId);
                    if (error) {
                        console.error('Error fetching image:', error);
                        navigate.push('/');
                        return;
                    }
                    if (!error && data && data.length > 0) {
                        const comCor = data.map({
                            "Imagem.useEffect.fetchImage.comCor": (img)=>{
                                const paletteKey = `palette-${img.url}`;
                                const cachedPalette = localStorage.getItem(paletteKey);
                                const colors = cachedPalette ? JSON.parse(cachedPalette) : [
                                    "#cccccc"
                                ];
                                return {
                                    ...img,
                                    colors
                                };
                            }
                        }["Imagem.useEffect.fetchImage.comCor"]);
                        setImage(comCor[0]);
                    }
                }
            }["Imagem.useEffect.fetchImage"];
            fetchImage();
        }
    }["Imagem.useEffect"], [
        imageId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Imagem.useEffect": ()=>{
            if (!image) return;
            const fetchRelated = {
                "Imagem.useEffect.fetchRelated": async ()=>{
                    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc("related_images_random", {
                        p_categoria: image.categoria,
                        p_exclude_nome: image.nome,
                        p_id: image.id,
                        p_limit: 6
                    });
                    if (!error && data) {
                        const enriched = data.map({
                            "Imagem.useEffect.fetchRelated.enriched": (img)=>{
                                const paletteKey = `palette-${img.url}`;
                                const cachedPalette = localStorage.getItem(paletteKey);
                                const colors = cachedPalette ? JSON.parse(cachedPalette) : [
                                    "#cccccc"
                                ];
                                return {
                                    ...img,
                                    colors
                                };
                            }
                        }["Imagem.useEffect.fetchRelated.enriched"]);
                        setRelatedImages(enriched);
                    }
                }
            }["Imagem.useEffect.fetchRelated"];
            fetchRelated();
        }
    }["Imagem.useEffect"], [
        image
    ]);
    if (!image) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-200 flex gap-5 flex-col-reverse xl:flex-row items-start justify-center relative h-full w-full mx-auto imagem z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col xl:w-[40%] w-full items-center self-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-semibold text-gray-900 mt-6 cl:mt-0 cl:text-left text-center",
                                children: image.nome
                            }, void 0, false, {
                                fileName: "[project]/components/Imagem.jsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-sm text-gray-600 cl:text-left text-center mt-1",
                                children: [
                                    "Categoria: ",
                                    image.categoria
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Imagem.jsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Imagem.jsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex gap-4 xl:max-w-[600px] max-w-full z-50 flex-wrap p-12 place-self-center",
                        children: relatedImages.map((rel)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    viewTransitionName: `figures-${rel.id.split('-')[0]}`
                                },
                                className: "bg-gray-300 w-32 cl:h-44 h-32 cursor-pointer overflow-hidden hover:[&_img]:[scale:1.05] [clip-path:url(#squircle-mask)] [-webkit-clip-path:url(#squircle-mask)]",
                                onClick: ()=>navigate.push(`/${slugify(image.categoria)}/${rel.id}?bgc=${encodeURIComponent(rel.colors[0])}`),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: rel.url,
                                    alt: rel.nome,
                                    className: "w-full h-full object-cover duration-100 object-top"
                                }, void 0, false, {
                                    fileName: "[project]/components/Imagem.jsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this)
                            }, rel.nome, false, {
                                fileName: "[project]/components/Imagem.jsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/Imagem.jsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Imagem.jsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "z-10 relative xl:w-[60%] w-full min-h-dvh [view-transition-name:figure-img]",
                "data-image": image.nome,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/${slugify(image.categoria)}`,
                        style: {
                            "--bg": bgc
                        },
                        className: `bg-[--bg] text-lg cursor-pointer text-white absolute right-[unset] cl:right-12 cl:top-12 top-[unset] cl:bottom-unset bottom-20 cl:left-[unset] left-1/2 !z-50  rounded-full text-center leading-9 h-9 w-9`,
                        children: "X"
                    }, void 0, false, {
                        fileName: "[project]/components/Imagem.jsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$image$2d$zooom$2f$lib$2f$react$2d$image$2d$zooom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        alt: image.nome,
                        src: image.url,
                        zoom: 200,
                        fullWidth: true,
                        style: {
                            "--shadow": image.colors[0] + 66
                        },
                        className: `[&_img]:mx-auto h-dvh w-full [&_img]:block [&_img]:h-dvh [&_img]:object-contain [&_img]:rounded-2xl [&_img]:!z-40 [&_img]:!w-auto [&_img]:!bg-transparent [&_img]:relative [&_img]:drop-shadow-[0_0_40px_var(--shadow)]`
                    }, void 0, false, {
                        fileName: "[project]/components/Imagem.jsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        alt: image.nome,
                        src: image.url,
                        width: image.width,
                        height: image.height,
                        style: {
                            "--shadow": image.colors[0] + 66
                        },
                        className: `mx-auto block h-dvh object-contain rounded-2xl !z-40 !w-auto !bg-transparent relative drop-shadow-[0_0_40px_var(--shadow)] cl:hidden`
                    }, void 0, false, {
                        fileName: "[project]/components/Imagem.jsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    logado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "absolute top-7 left-4 [&>svg_path]:fill-none [&>svg_path]:stroke-gray-800 duration-150 opacity-0 group-hover:opacity-100 z-50",
                                onClick: ()=>setConfirmation(true),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DeleteIcon, {}, void 0, false, {
                                    fileName: "[project]/components/Imagem.jsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Imagem.jsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "absolute top-7 right-4 [&>svg_path]:fill-none [&>svg_path]:stroke-gray-800 duration-150 opacity-0 group-hover:opacity-100 z-50",
                                onClick: ()=>{
                                    setConfirmation(true);
                                    setRen(true);
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditIcon, {}, void 0, false, {
                                    fileName: "[project]/components/Imagem.jsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Imagem.jsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    confirmation && !ren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed bg-[#00000066] w-full h-[100dvh] top-0 left-0 z-[999999] grid place-items-center prompt",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col justify-center items-center bg-gray-200/30 backdrop-blur-md rounded-xl px-10 py-5 gap-4 max-w-[300px] w-[90%] border-gray-400/60 border-2 shadow-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-semibold text-gray-50",
                                    children: "TEM CERTEZA?"
                                }, void 0, false, {
                                    fileName: "[project]/components/Imagem.jsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                handleDelete(url), setConfirmation(false);
                                            },
                                            className: "bg-black px-4 py-2 text-white text-sm rounded-lg",
                                            children: " DELETAR"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Imagem.jsx",
                                            lineNumber: 142,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setConfirmation(false),
                                            className: "bg-white px-4 py-2 text-black text-sm rounded-lg",
                                            children: "CANCELAR"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Imagem.jsx",
                                            lineNumber: 143,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Imagem.jsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Imagem.jsx",
                            lineNumber: 139,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Imagem.jsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this),
                    confirmation && ren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed bg-[#00000066] w-full h-[100dvh] top-0 left-0 z-[999999] grid place-items-center prompt",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col justify-center items-center bg-[#444a] rounded-xl px-10 py-5 gap-4 max-w-[300px] w-[90%] border-gray-400/60 border-2 shadow-2xl relative backdrop-blur-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "absolute right-2 top-0 text-white border-0 text-base z-50 cursor-pointer",
                                    onClick: ()=>setConfirmation(false),
                                    children: "x"
                                }, void 0, false, {
                                    fileName: "[project]/components/Imagem.jsx",
                                    lineNumber: 151,
                                    columnNumber: 15
                                }, this),
                                !message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            onBlur: (e)=>e.target.value.length > 0 ? handleRename(e.target.value) : console.log('nada alterado'),
                                            placeholder: 'NOVO NOME',
                                            className: "bg-white/30 px-4 py-2 text-white text-sm rounded-lg placeholder:text-gray-200"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Imagem.jsx",
                                            lineNumber: 155,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setUpWindow(true);
                                                setNova(true);
                                                localStorage.setItem('urlEditar', url);
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReplaceIcon, {}, void 0, false, {
                                                fileName: "[project]/components/Imagem.jsx",
                                                lineNumber: 165,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Imagem.jsx",
                                            lineNumber: 159,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Imagem.jsx",
                                    lineNumber: 154,
                                    columnNumber: 17
                                }, this),
                                message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Renomeado com sucesso!"
                                }, void 0, false, {
                                    fileName: "[project]/components/Imagem.jsx",
                                    lineNumber: 168,
                                    columnNumber: 27
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Imagem.jsx",
                            lineNumber: 150,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Imagem.jsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Imagem.jsx",
                lineNumber: 103,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Imagem.jsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(Imagem, "/ctpyXxp29i+Miw13p1wQGCm1Mk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = Imagem;
var _c;
__turbopack_context__.k.register(_c, "Imagem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_Imagem_jsx_6000159d._.js.map