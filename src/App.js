import React, { useRef, useEffect, useState, Suspense } from "react";
import "./App.scss";
import Header from "./components/header";
import ContactForm from "./components/contactForm";
import { Section } from "./components/section";
import state from "./components/state";
import { Canvas, useFrame } from "react-three-fiber";
import { Html, useProgress, useGLTFLoader } from "drei";
import { a, useTransition } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

function Model({ url }) {
  const gltf = useGLTFLoader(url, true);
  return <primitive object={gltf.scene} dispose={null} />;
}

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.2} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        // shadow-mapSize-width={1024}
        // shadow-mapSize-height={1024}
        // shadow-camera-far={50}
        // shadow-camera-left={-10}
        // shadow-camera-right={10}
        // shadow-camera-top={10}
        // shadow-camera-bottom={-10}
      />
      {/* Spotlight Large overhead light */}
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
    </>
  );
};

const HTMLContent = ({
  domContent,
  children,
  bgColor,
  modelPath,
  position,
}) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));
  const [refItem, inView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  });
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <mesh scale={[1.8, 1.8, 1.8]} ref={ref} position={[-35, -35, 0]}>
          <Model url={modelPath} />
        </mesh>
        <Html fullscreen portal={domContent}>
          <div ref={refItem} className="container">
            <h1 className="title">{children}</h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};

const HTMLContent1 = ({
  domContent,
  children,
  bgColor,
  modelPath,
  position,
}) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y = 0.85));
  const [refItem, inView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  });
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <mesh scale={[1, 1, 1]} ref={ref} position={[-40, -100, 0]}>
          <Model url={modelPath} />
        </mesh>
        <Html fullscreen portal={domContent}>
          <div ref={refItem} className="container">
            <h1 className="title">{children}</h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};

function Loader() {
  const { active, progress } = useProgress();
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0 },
    update: { progress },
  });
  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className="loading" style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width: progress }}></a.div>
          </div>
        </a.div>
      )
  );
}

export default function App() {
  const [events] = useState();
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Header />
      {/* R3F Canvas */}
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 120], fov: 72 }}
      >
        {/* Lights Component */}
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent1
            domContent={domContent}
            bgColor="#aec2d0"
            modelPath="/app.gltf"
            position={280}
          >
            <div dir="rtl" className="row text-right">
              <div
                dir="rtl"
                className="head-line3 col-lg-6 col-md-8 col-sm-12 text-right mt-5 pushdown"
              >
                <span>תנו לנו להציג </span>
                <span>את המוצר שלכם</span>
                <span className="blue">כמו שמגיע לו</span>
              </div>
            </div>
          </HTMLContent1>
          <HTMLContent
            domContent={domContent}
            bgColor="#ebe4c2"
            modelPath="/armchairGreen.gltf"
            position={0}
          >
            <div dir="rtl" className="row text-right">
              <div dir="rtl" className="head-line3 col-6 text-right mt-5">
                <span className="yellow">תבלטו</span>
                <span>מול המתחרים.</span>
              </div>
            </div>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            bgColor="#D5CAD0"
            modelPath="/fish.gltf"
            position={-250}
          >
            <div id="contact">
              <div dir="rtl" className="row text-right">
                <div dir="rtl" className="head-line3 col-6 text-right mt-5">
                  <span></span>
                  <span>בואו נדבר...</span>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <ContactForm />
                </div>
              </div>
            </div>
          </HTMLContent>
        </Suspense>
      </Canvas>

      <Loader />
      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
        {/* <Footer /> */}
      </div>
    </>
  );
}
