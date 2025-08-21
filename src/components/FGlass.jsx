import * as THREE from 'three'
import { useRef, useState, useEffect, memo } from 'react'
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import {
  useFBO,
  useGLTF,
  Scroll,
  Preload,
  Text,
  ScrollControls,
  MeshTransmissionMaterial,
} from '@react-three/drei'
import { easing } from 'maath'
import Nav from '../Nav'

export default function FGlass({
  categories, setCategories = useState([]),
  categoria, setCategoria = useState(null),
  mode = 'bar',
  lensProps = {},
  barProps = {categories, setCategories},
  cubeProps = {},
}) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens

 useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('imagens')
          .select("categoria", { distinct: true });
        if (error) throw error;
        const uniqueCategories = [...new Set(data.map(item => item.categoria))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <>
        <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }} >
          <ScrollControls damping={0.2} pages={3} distance={0.4}>
            <Wrapper>
              <Scroll>
                
                    {categories.map((table, index) => (
                        <Text
                        key={index}
                        className={`${table.toLowerCase() === ativo ? 'active' : ''} md:text-base text-sm text-white py-1.5 sm:py-3 px-2 sm:px-5 hover:[scale:1.2]`}
                        onClick={() => {
                            setCategoria(table.toLowerCase());
                            setAtivo(table);
                        }}
                        >
                        {table}
                        </Text>
                    ))}
              </Scroll>
              <Scroll html />
              <Preload />
            </Wrapper>
          </ScrollControls>
        </Canvas>
    </>
  )
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}) {
  const ref = useRef()
  const { nodes } = useGLTF(glb)
  const buffer = useFBO()
  const { viewport: vp } = useThree()
  const [scene] = useState(() => new THREE.Scene())
  const geoWidthRef = useRef(1)

  useEffect(() => {
    const geo = nodes[geometryKey]?.geometry
    geo.computeBoundingBox()
    geoWidthRef.current =
      geo.boundingBox.max.x - geo.boundingBox.min.x || 1
  }, [nodes, geometryKey])

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state
    const v = viewport.getCurrentViewport(camera, [0, 0, 15])

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
        ? (pointer.y * v.height) / 2
        : 0
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta)

    if (modeProps.scale == null) {
      const maxWorld = v.width * 0.9
      const desired = maxWorld / geoWidthRef.current
      ref.current.scale.setScalar(Math.min(0.15, desired))
    }

    gl.setRenderTarget(buffer)
    gl.render(scene, camera)
    gl.setRenderTarget(null)
  
    // Background Color
    gl.setClearColor(0xefefef, 1)
  })

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    ...extraMat
  } = modeProps

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={nodes[geometryKey]?.geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...extraMat}
        />
      </mesh>
    </>
  )
})

function Lens({ modeProps, ...p }) {
  return (
    <ModeWrapper
      glb="./src/assets/3d/lens.glb"
      geometryKey="Cylinder"
      followPointer
      modeProps={modeProps}
      {...p}
    />
  )
}

function Cube({ modeProps, ...p }) {
  return (
    <ModeWrapper
      glb="./src/assets/3d/cube.glb"
      geometryKey="Cube"
      followPointer
      modeProps={modeProps}
      {...p}
    />
  )
}

function Bar({ modeProps = {}, ...p }) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25,
  }

  return (
    <ModeWrapper
      glb="./src/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  )
}
